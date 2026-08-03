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

async function sendEmail(data: {
  name: string; company: string; email: string; phone: string; subject: string; message: string;
}): Promise<boolean> {
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
