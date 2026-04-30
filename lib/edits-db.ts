import { sql } from '@vercel/postgres';

export type RequestCategory = 'text_change' | 'image_change' | 'bug' | 'feature' | 'other';
export type RequestStatus = 'open' | 'in_progress' | 'done';

export interface EditRequest {
  id: number;
  category: RequestCategory;
  title: string;
  description: string;
  page_url: string | null;
  submitted_by: string;
  status: RequestStatus;
  admin_note: string | null;
  attachments: string | null; // JSON array of Blob URLs
  created_at: string;
  updated_at: string;
}

// Initialize the table. Safe to call repeatedly — uses IF NOT EXISTS.
export async function initEditsTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS edit_requests (
      id SERIAL PRIMARY KEY,
      category VARCHAR(32) NOT NULL,
      title VARCHAR(100) NOT NULL,
      description TEXT NOT NULL,
      page_url TEXT,
      submitted_by VARCHAR(50) NOT NULL,
      status VARCHAR(16) NOT NULL DEFAULT 'open',
      admin_note TEXT,
      attachments TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  // Non-destructive: add the column only if the table already existed without it
  await sql`ALTER TABLE edit_requests ADD COLUMN IF NOT EXISTS attachments TEXT`;
  await sql`CREATE INDEX IF NOT EXISTS idx_edit_requests_status ON edit_requests(status)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_edit_requests_created ON edit_requests(created_at DESC)`;
}

export async function getAllRequests(): Promise<EditRequest[]> {
  const { rows } = await sql<EditRequest>`
    SELECT * FROM edit_requests ORDER BY created_at DESC
  `;
  return rows;
}

export async function createRequest(input: {
  category: RequestCategory;
  title: string;
  description: string;
  page_url: string | null;
  submitted_by: string;
  attachments: string | null; // JSON-serialized string[]
}): Promise<EditRequest> {
  const { rows } = await sql<EditRequest>`
    INSERT INTO edit_requests (category, title, description, page_url, submitted_by, attachments)
    VALUES (${input.category}, ${input.title}, ${input.description}, ${input.page_url}, ${input.submitted_by}, ${input.attachments})
    RETURNING *
  `;
  return rows[0];
}

export async function updateRequestStatus(
  id: number,
  status: RequestStatus,
  adminNote: string | null
): Promise<EditRequest | null> {
  const { rows } = await sql<EditRequest>`
    UPDATE edit_requests
    SET status = ${status}, admin_note = ${adminNote}, updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0] || null;
}

export async function deleteRequest(id: number): Promise<boolean> {
  const result = await sql`DELETE FROM edit_requests WHERE id = ${id}`;
  return (result.rowCount ?? 0) > 0;
}

export async function addAttachmentsToRequest(
  id: number,
  newUrls: string[]
): Promise<EditRequest | null> {
  // Fetch current attachments, merge, then save back atomically
  const { rows: existing } = await sql<{ attachments: string | null }>`
    SELECT attachments FROM edit_requests WHERE id = ${id}
  `;
  if (!existing[0]) return null;

  const current: string[] = [];
  try {
    if (existing[0].attachments) {
      current.push(...JSON.parse(existing[0].attachments));
    }
  } catch { /* ignore malformed JSON */ }

  const merged = JSON.stringify([...current, ...newUrls]);

  const { rows } = await sql<EditRequest>`
    UPDATE edit_requests
    SET attachments = ${merged}, updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0] || null;
}

export async function removeAttachmentFromRequest(
  id: number,
  urlToRemove: string
): Promise<EditRequest | null> {
  const { rows: existing } = await sql<{ attachments: string | null }>`
    SELECT attachments FROM edit_requests WHERE id = ${id}
  `;
  if (!existing[0]) return null;

  const current: string[] = [];
  try {
    if (existing[0].attachments) {
      current.push(...JSON.parse(existing[0].attachments));
    }
  } catch { /* ignore malformed JSON */ }

  const filtered = current.filter(u => u !== urlToRemove);
  const newVal = filtered.length > 0 ? JSON.stringify(filtered) : null;

  const { rows } = await sql<EditRequest>`
    UPDATE edit_requests
    SET attachments = ${newVal}, updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0] || null;
}
