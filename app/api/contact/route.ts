import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

// Contact form submissions: always stored in Postgres, and emailed to
// CONTACT_TO_EMAIL when RESEND_API_KEY is configured. Storage is the source
// of truth — email is best-effort so a mail outage never loses a lead.

const CONTACT_TO = process.env.CONTACT_TO_EMAIL || 'sales@shopleuco.com';
const CONTACT_FROM = process.env.CONTACT_FROM_EMAIL || 'LEUCO Website <noreply@shopleuco.com>';

async function initTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id SERIAL PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      company VARCHAR(120),
      email VARCHAR(254) NOT NULL,
      phone VARCHAR(40),
      subject VARCHAR(60),
      message TEXT NOT NULL,
      emailed BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
}

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

type ContactData = {
  name: string; company: string; email: string; phone: string; subject: string; message: string;
};

function emailHtml(data: ContactData): string {
  const submitted = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium', timeStyle: 'short', timeZone: 'America/New_York',
  }).format(new Date());
  const firstName = esc(data.name.split(/\s+/)[0]);
  const row = (label: string, value: string) =>
    `<tr>
      <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:11px;font-weight:800;letter-spacing:1.5px;color:#9ca3af;width:110px;vertical-align:top;">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:14px;font-weight:600;color:#1A1A1A;">${value}</td>
    </tr>`;
  const rows = [
    row('NAME', esc(data.name)),
    data.company && row('COMPANY', esc(data.company)),
    row('EMAIL', `<a href="mailto:${esc(data.email)}" style="color:#a9218d;text-decoration:none;">${esc(data.email)}</a>`),
    data.phone && row('PHONE', `<a href="tel:${esc(data.phone.replace(/[^+\d]/g, ''))}" style="color:#a9218d;text-decoration:none;">${esc(data.phone)}</a>`),
    data.subject && row('SUBJECT', esc(data.subject)),
  ].filter(Boolean).join('');
  return `<div style="background:#f5f5f5;padding:32px 16px;font-family:Helvetica,Arial,sans-serif;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;margin:0 auto;background:#ffffff;border-collapse:collapse;">
      <tr>
        <td style="background:#1A1A1A;padding:28px 32px;border-bottom:4px solid #a9218d;">
          <img src="https://shopleuco.com/leuco-logo.png" alt="LEUCO" width="150" style="display:block;" />
        </td>
      </tr>
      <tr>
        <td style="padding:32px 32px 0;">
          <span style="display:inline-block;background:#a9218d;color:#ffffff;font-size:11px;font-weight:800;letter-spacing:2px;padding:4px 10px;">WEBSITE CONTACT</span>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 32px 8px;">
          <h1 style="margin:0;font-size:26px;font-weight:800;color:#1A1A1A;letter-spacing:-0.5px;">New message from ${esc(data.name)}</h1>
          <p style="margin:6px 0 0;font-size:14px;color:#6b7280;font-weight:500;">${esc(data.subject || 'General Inquiry')} &middot; submitted ${submitted} ET</p>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 32px 0;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">${rows}</table>
        </td>
      </tr>
      <tr>
        <td style="padding:20px 32px 8px;">
          <div style="font-size:11px;font-weight:800;letter-spacing:1.5px;color:#9ca3af;margin-bottom:8px;">MESSAGE</div>
          <div style="background:#f9f9f9;border-left:4px solid #a9218d;padding:18px 20px;font-size:15px;line-height:1.6;color:#374151;white-space:pre-wrap;">${esc(data.message)}</div>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 32px 32px;">
          <a href="mailto:${esc(data.email)}" style="display:inline-block;background:#a9218d;color:#ffffff;font-size:13px;font-weight:800;letter-spacing:1px;padding:14px 28px;text-decoration:none;">REPLY TO ${firstName.toUpperCase()} &rarr;</a>
        </td>
      </tr>
      <tr>
        <td style="background:#1A1A1A;padding:20px 32px;">
          <p style="margin:0;font-size:12px;color:#9ca3af;font-weight:500;">Sent from the contact form at <a href="https://shopleuco.com" style="color:#ff7ae6;text-decoration:none;">shopleuco.com</a> &middot; replying to this email goes directly to the customer</p>
        </td>
      </tr>
    </table>
  </div>`;
}

async function sendEmail(data: ContactData): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  const lines = [
    `Name: ${data.name}`,
    data.company && `Company: ${data.company}`,
    `Email: ${data.email}`,
    data.phone && `Phone: ${data.phone}`,
    data.subject && `Subject: ${data.subject}`,
    '',
    data.message,
  ].filter(Boolean);
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: CONTACT_FROM,
      to: [CONTACT_TO],
      reply_to: data.email,
      subject: `[Website Contact] ${data.subject || 'General Inquiry'} — ${data.name}`,
      text: lines.join('\n'),
      html: emailHtml(data),
    }),
  });
  if (!res.ok) {
    console.error('contact: Resend send failed', res.status, await res.text());
    return false;
  }
  return true;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const field = (k: string, max: number) =>
    typeof body[k] === 'string' ? (body[k] as string).trim().slice(0, max) : '';

  const data = {
    name: field('name', 120),
    company: field('company', 120),
    email: field('email', 254),
    phone: field('phone', 40),
    subject: field('subject', 60),
    message: field('message', 5000),
  };

  // Honeypot: real users never fill this hidden field
  if (field('website', 10)) return NextResponse.json({ ok: true });

  if (!data.name || !data.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return NextResponse.json({ error: 'Please fill in name, a valid email, and a message.' }, { status: 400 });
  }

  try {
    await initTable();
    const emailed = await sendEmail(data).catch((e) => {
      console.error('contact: email error', e);
      return false;
    });
    await sql`
      INSERT INTO contact_submissions (name, company, email, phone, subject, message, emailed)
      VALUES (${data.name}, ${data.company || null}, ${data.email}, ${data.phone || null},
              ${data.subject || null}, ${data.message}, ${emailed})
    `;
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('contact: store failed', e);
    return NextResponse.json({ error: 'Something went wrong. Please try again or email us directly.' }, { status: 500 });
  }
}
