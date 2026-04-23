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
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
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
}): Promise<EditRequest> {
  const { rows } = await sql<EditRequest>`
    INSERT INTO edit_requests (category, title, description, page_url, submitted_by)
    VALUES (${input.category}, ${input.title}, ${input.description}, ${input.page_url}, ${input.submitted_by})
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
