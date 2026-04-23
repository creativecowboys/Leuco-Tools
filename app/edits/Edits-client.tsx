'use client';

import React, { useState, useEffect, useCallback } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

type Role = 'client' | 'admin';
type Status = 'open' | 'in_progress' | 'done';
type Category = 'text_change' | 'image_change' | 'bug' | 'feature' | 'other';
type FilterKey = 'all' | Status;

interface EditRequest {
  id: number;
  category: Category;
  title: string;
  description: string;
  page_url: string | null;
  submitted_by: string;
  status: Status;
  admin_note: string | null;
  created_at: string;
  updated_at: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORY_LABELS: Record<Category, string> = {
  text_change: 'Text Change',
  image_change: 'Image Change',
  bug: 'Bug',
  feature: 'Feature Request',
  other: 'Other',
};

const CATEGORY_COLORS: Record<Category, string> = {
  text_change: '#3b82f6',   // blue
  image_change: '#10b981',  // green
  bug: '#ef4444',           // red
  feature: '#a9218d',       // leuco-purple
  other: '#6b7280',         // gray
};

const STATUS_LABELS: Record<Status, string> = {
  open: 'Open',
  in_progress: 'In Progress',
  done: 'Done',
};

const STATUS_COLORS: Record<Status, { bg: string; text: string }> = {
  open: { bg: '#fef3c7', text: '#92400e' },
  in_progress: { bg: '#dbeafe', text: '#1e40af' },
  done: { bg: '#d1fae5', text: '#065f46' },
};

// ─── Shared styles ────────────────────────────────────────────────────────────

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1a1a1a 0%, #2d1a2d 50%, #1a1a1a 100%)',
    fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif',
  } as React.CSSProperties,

  topBar: {
    background: 'rgba(0,0,0,0.6)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    padding: '0 2rem',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'sticky' as const,
    top: 0,
    zIndex: 50,
  },

  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '2rem 1.5rem 4rem',
  },

  card: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '1rem',
  },

  input: {
    width: '100%',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '8px',
    color: '#fff',
    padding: '10px 14px',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box' as const,
    fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif',
    transition: 'border-color 0.2s',
  },

  label: {
    display: 'block',
    fontSize: '12px',
    fontWeight: 700,
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    marginBottom: '6px',
  },

  primaryBtn: {
    background: '#a9218d',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 20px',
    fontSize: '13px',
    fontWeight: 700,
    cursor: 'pointer',
    letterSpacing: '0.04em',
    transition: 'opacity 0.2s, transform 0.1s',
  },

  ghostBtn: {
    background: 'rgba(255,255,255,0.06)',
    color: 'rgba(255,255,255,0.7)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    padding: '8px 16px',
    fontSize: '12px',
    fontWeight: 700,
    cursor: 'pointer',
    letterSpacing: '0.04em',
    transition: 'background 0.2s',
  },

  dangerBtn: {
    background: 'rgba(239,68,68,0.15)',
    color: '#fca5a5',
    border: '1px solid rgba(239,68,68,0.25)',
    borderRadius: '8px',
    padding: '6px 12px',
    fontSize: '12px',
    fontWeight: 700,
    cursor: 'pointer',
    letterSpacing: '0.04em',
    transition: 'background 0.2s',
  },
};

// ─── Login Screen ─────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: (role: Role) => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/edits/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError('Incorrect password. Please try again.');
        return;
      }
      const data = await res.json();
      onLogin(data.role);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      ...styles.page,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '16px',
        padding: '2.5rem',
        width: '100%',
        maxWidth: '400px',
        margin: '0 1rem',
        boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img src="/leuco-logo.png" alt="LEUCO" style={{ height: '40px', display: 'block', margin: '0 auto 1rem' , filter: 'brightness(0) invert(1)' }} />
          <h1 style={{ color: '#fff', fontSize: '20px', fontWeight: 800, margin: 0 }}>Edit Requests</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', marginTop: '6px', marginBottom: 0 }}>Internal dashboard — enter your access password</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={styles.label} htmlFor="edits-password">Password</label>
            <input
              id="edits-password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              style={styles.input}
              autoFocus
            />
          </div>

          {error && (
            <div style={{
              background: 'rgba(239,68,68,0.12)',
              border: '1px solid rgba(239,68,68,0.25)',
              borderRadius: '8px',
              padding: '10px 14px',
              color: '#fca5a5',
              fontSize: '13px',
              marginBottom: '1rem',
            }}>
              {error}
            </div>
          )}

          <button
            id="edits-login-submit"
            type="submit"
            disabled={loading}
            style={{ ...styles.primaryBtn, width: '100%', padding: '12px', opacity: loading ? 0.6 : 1 }}
          >
            {loading ? 'Checking…' : 'Access Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Category & Status Badges ─────────────────────────────────────────────────

function CategoryBadge({ category }: { category: Category }) {
  return (
    <span style={{
      background: CATEGORY_COLORS[category] + '22',
      color: CATEGORY_COLORS[category],
      border: `1px solid ${CATEGORY_COLORS[category]}44`,
      borderRadius: '6px',
      padding: '3px 10px',
      fontSize: '11px',
      fontWeight: 700,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
    }}>
      {CATEGORY_LABELS[category]}
    </span>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const c = STATUS_COLORS[status];
  return (
    <span style={{
      background: c.bg,
      color: c.text,
      borderRadius: '6px',
      padding: '3px 10px',
      fontSize: '11px',
      fontWeight: 700,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
    }}>
      {STATUS_LABELS[status]}
    </span>
  );
}

// ─── New Request Form ─────────────────────────────────────────────────────────

function NewRequestForm({ onCreated }: { onCreated: (req: EditRequest) => void }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    category: 'text_change' as Category,
    title: '',
    description: '',
    page_url: '',
    submitted_by: '',
  });

  const set = (k: keyof typeof form, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/edits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          page_url: form.page_url.trim() || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Failed to submit'); return; }
      onCreated(data.request);
      setForm({ category: 'text_change', title: '', description: '', page_url: '', submitted_by: '' });
      setOpen(false);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      {!open ? (
        <button
          id="edits-new-request-btn"
          onClick={() => setOpen(true)}
          style={{
            ...styles.primaryBtn,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ fontSize: '18px', lineHeight: 1 }}>+</span>
          New Request
        </button>
      ) : (
        <div style={{
          ...styles.card,
          border: '1px solid rgba(169,33,141,0.3)',
          boxShadow: '0 0 0 1px rgba(169,33,141,0.1)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ color: '#fff', fontSize: '16px', fontWeight: 800, margin: 0 }}>New Edit Request</h2>
            <button onClick={() => setOpen(false)} style={{ ...styles.ghostBtn, padding: '4px 10px' }}>✕</button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={styles.label} htmlFor="edits-category">Category *</label>
                <select
                  id="edits-category"
                  value={form.category}
                  onChange={e => set('category', e.target.value)}
                  required
                  style={{ ...styles.input, appearance: 'none' }}
                >
                  <option value="text_change">Text Change</option>
                  <option value="image_change">Image Change</option>
                  <option value="bug">Bug</option>
                  <option value="feature">Feature Request</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label style={styles.label} htmlFor="edits-submitted-by">Your Name *</label>
                <input
                  id="edits-submitted-by"
                  type="text"
                  value={form.submitted_by}
                  onChange={e => set('submitted_by', e.target.value)}
                  placeholder="e.g. Sarah"
                  maxLength={50}
                  required
                  style={styles.input}
                />
              </div>
            </div>

            <div>
              <label style={styles.label} htmlFor="edits-title">Title * <span style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>({form.title.length}/100)</span></label>
              <input
                id="edits-title"
                type="text"
                value={form.title}
                onChange={e => set('title', e.target.value)}
                placeholder="Short summary of the change needed"
                maxLength={100}
                required
                style={styles.input}
              />
            </div>

            <div>
              <label style={styles.label} htmlFor="edits-page-url">Page URL <span style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
              <input
                id="edits-page-url"
                type="text"
                value={form.page_url}
                onChange={e => set('page_url', e.target.value)}
                placeholder="e.g. https://shopleuco.com/products/..."
                style={styles.input}
              />
            </div>

            <div>
              <label style={styles.label} htmlFor="edits-description">Description * <span style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>— describe what needs to change and where. No file uploads — paste image links here if needed.</span></label>
              <textarea
                id="edits-description"
                value={form.description}
                onChange={e => set('description', e.target.value)}
                placeholder="Describe the change in as much detail as possible…"
                required
                rows={4}
                style={{ ...styles.input, resize: 'vertical', lineHeight: 1.6 }}
              />
            </div>

            {error && (
              <div style={{
                background: 'rgba(239,68,68,0.12)',
                border: '1px solid rgba(239,68,68,0.25)',
                borderRadius: '8px',
                padding: '10px 14px',
                color: '#fca5a5',
                fontSize: '13px',
              }}>
                {error}
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => setOpen(false)} style={styles.ghostBtn}>Cancel</button>
              <button
                id="edits-submit-btn"
                type="submit"
                disabled={loading}
                style={{ ...styles.primaryBtn, opacity: loading ? 0.6 : 1 }}
              >
                {loading ? 'Submitting…' : 'Submit Request'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

// ─── Request Card ─────────────────────────────────────────────────────────────

function RequestCard({
  req,
  role,
  onUpdate,
  onDelete,
}: {
  req: EditRequest;
  role: Role;
  onUpdate: (updated: EditRequest) => void;
  onDelete: (id: number) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [newStatus, setNewStatus] = useState<Status>(req.status);
  const [adminNote, setAdminNote] = useState(req.admin_note || '');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const date = new Date(req.created_at).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });

  const handleStatusSave = async () => {
    setSaving(true);
    setSaveError('');
    try {
      const res = await fetch(`/api/edits/${req.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, admin_note: adminNote || null }),
      });
      const data = await res.json();
      if (!res.ok) { setSaveError(data.error || 'Save failed'); return; }
      onUpdate(data.request);
    } catch {
      setSaveError('Something went wrong.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Delete "${req.title}"? This cannot be undone.`)) return;
    try {
      await fetch(`/api/edits/${req.id}`, { method: 'DELETE' });
      onDelete(req.id);
    } catch {
      alert('Delete failed. Please try again.');
    }
  };

  const statusChanged = newStatus !== req.status || adminNote !== (req.admin_note || '');

  return (
    <div style={{
      ...styles.card,
      transition: 'border-color 0.2s',
      borderColor: expanded ? 'rgba(169,33,141,0.3)' : 'rgba(255,255,255,0.08)',
    }}>
      {/* Card Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        {/* Left */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <CategoryBadge category={req.category} />
            <StatusBadge status={req.status} />
          </div>
          <h3 style={{
            color: '#fff',
            fontSize: '15px',
            fontWeight: 700,
            margin: '0 0 4px',
            lineHeight: 1.4,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {req.title}
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', margin: 0 }}>
            Submitted by <strong style={{ color: 'rgba(255,255,255,0.6)' }}>{req.submitted_by}</strong> · {date}
          </p>
        </div>

        {/* Toggle */}
        <button
          onClick={() => setExpanded(e => !e)}
          style={{
            ...styles.ghostBtn,
            padding: '6px 12px',
            fontSize: '12px',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
          aria-label={expanded ? 'Collapse' : 'Expand'}
        >
          {expanded ? '▲ Less' : '▼ More'}
        </button>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div style={{ marginTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.25rem' }}>
          {/* Description */}
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ ...styles.label, marginBottom: '8px' }}>Description</div>
            <p style={{
              color: 'rgba(255,255,255,0.75)',
              fontSize: '14px',
              lineHeight: 1.7,
              margin: 0,
              whiteSpace: 'pre-wrap',
            }}>
              {req.description}
            </p>
          </div>

          {/* Page URL */}
          {req.page_url && (
            <div style={{ marginBottom: '1rem' }}>
              <div style={styles.label}>Page URL</div>
              <a
                href={req.page_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#60a5fa', fontSize: '13px', wordBreak: 'break-all' }}
              >
                {req.page_url}
              </a>
            </div>
          )}

          {/* Admin note (read-only for client) */}
          {req.admin_note && role === 'client' && (
            <div style={{
              background: 'rgba(16,185,129,0.08)',
              border: '1px solid rgba(16,185,129,0.2)',
              borderRadius: '8px',
              padding: '10px 14px',
              marginBottom: '1rem',
            }}>
              <div style={{ ...styles.label, color: '#34d399', marginBottom: '4px' }}>Admin Note</div>
              <p style={{ color: '#a7f3d0', fontSize: '13px', margin: 0 }}>{req.admin_note}</p>
            </div>
          )}

          {/* Admin Controls */}
          {role === 'admin' && (
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '8px',
              padding: '1rem',
            }}>
              <div style={{ ...styles.label, marginBottom: '12px' }}>Admin Controls</div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
                <div style={{ flex: '1', minWidth: '160px' }}>
                  <label style={{ ...styles.label, marginBottom: '6px' }} htmlFor={`status-${req.id}`}>Status</label>
                  <select
                    id={`status-${req.id}`}
                    value={newStatus}
                    onChange={e => setNewStatus(e.target.value as Status)}
                    style={{ ...styles.input, appearance: 'none' }}
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>
                <div style={{ flex: '2', minWidth: '200px', display: 'flex', alignItems: 'flex-end' }}>
                  <button
                    onClick={handleDelete}
                    style={{ ...styles.dangerBtn, height: '40px', alignSelf: 'flex-end', marginTop: 'auto' }}
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>

              {/* Admin note textarea — always visible */}
              <div style={{ marginBottom: '12px' }}>
                <label style={styles.label} htmlFor={`admin-note-${req.id}`}>
                  Admin Note <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional — visible to client)</span>
                </label>
                <textarea
                  id={`admin-note-${req.id}`}
                  value={adminNote}
                  onChange={e => setAdminNote(e.target.value)}
                  placeholder='e.g. "Fixed in deploy v1.2"'
                  rows={2}
                  style={{ ...styles.input, resize: 'vertical' }}
                />
              </div>

              {saveError && (
                <div style={{ color: '#fca5a5', fontSize: '12px', marginBottom: '8px' }}>{saveError}</div>
              )}

              {statusChanged && (
                <button
                  onClick={handleStatusSave}
                  disabled={saving}
                  style={{ ...styles.primaryBtn, opacity: saving ? 0.6 : 1 }}
                >
                  {saving ? 'Saving…' : 'Save Changes'}
                </button>
              )}

              {req.admin_note && !statusChanged && (
                <div style={{ marginTop: '4px' }}>
                  <div style={{ ...styles.label, color: '#34d399' }}>Saved Note</div>
                  <p style={{ color: '#a7f3d0', fontSize: '13px', margin: 0 }}>{req.admin_note}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

function Dashboard({ role, onLogout }: { role: Role; onLogout: () => void }) {
  const [requests, setRequests] = useState<EditRequest[]>([]);
  const [filter, setFilter] = useState<FilterKey>('all');
  const [loadError, setLoadError] = useState('');

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/edits');
      if (!res.ok) { setLoadError('Failed to load requests.'); return; }
      const data = await res.json();
      setRequests(data.requests);
    } catch {
      setLoadError('Network error. Please refresh.');
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleLogout = async () => {
    await fetch('/api/edits/logout', { method: 'POST' });
    onLogout();
  };

  const handleCreated = (req: EditRequest) => setRequests(r => [req, ...r]);
  const handleUpdate = (updated: EditRequest) => setRequests(r => r.map(x => x.id === updated.id ? updated : x));
  const handleDelete = (id: number) => setRequests(r => r.filter(x => x.id !== id));

  const filtered = filter === 'all' ? requests : requests.filter(r => r.status === filter);

  const counts: Record<FilterKey, number> = {
    all: requests.length,
    open: requests.filter(r => r.status === 'open').length,
    in_progress: requests.filter(r => r.status === 'in_progress').length,
    done: requests.filter(r => r.status === 'done').length,
  };

  const filterBtns: { key: FilterKey; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'open', label: 'Open' },
    { key: 'in_progress', label: 'In Progress' },
    { key: 'done', label: 'Done' },
  ];

  return (
    <div style={styles.page}>
      {/* Top Bar */}
      <div style={styles.topBar}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/leuco-logo.png" alt="LEUCO" style={{ height: '28px', filter: 'brightness(0) invert(1)' }} />
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '18px' }}>|</span>
          <span style={{ color: '#fff', fontSize: '15px', fontWeight: 700 }}>Edit Requests</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{
            background: role === 'admin' ? 'rgba(169,33,141,0.2)' : 'rgba(255,255,255,0.08)',
            color: role === 'admin' ? '#e879f9' : 'rgba(255,255,255,0.5)',
            border: `1px solid ${role === 'admin' ? 'rgba(169,33,141,0.3)' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: '6px',
            padding: '4px 10px',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>
            {role === 'admin' ? '⚡ Admin' : '👤 Client'}
          </span>
          <button onClick={handleLogout} style={{ ...styles.ghostBtn, padding: '6px 12px', fontSize: '12px' }}>
            Log Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.container}>
        {/* New Request Form */}
        <NewRequestForm onCreated={handleCreated} />

        {/* Filter Bar */}
        <div style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: '1.25rem',
          paddingBottom: '1.25rem',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          {filterBtns.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              style={{
                background: filter === key ? '#a9218d' : 'rgba(255,255,255,0.05)',
                color: filter === key ? '#fff' : 'rgba(255,255,255,0.55)',
                border: `1px solid ${filter === key ? 'transparent' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: '8px',
                padding: '7px 14px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'background 0.2s, color 0.2s',
              }}
            >
              {label}
              <span style={{
                marginLeft: '6px',
                background: filter === key ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)',
                borderRadius: '4px',
                padding: '1px 6px',
                fontSize: '11px',
              }}>
                {counts[key]}
              </span>
            </button>
          ))}
        </div>

        {/* Error */}
        {loadError && (
          <div style={{
            background: 'rgba(239,68,68,0.12)',
            border: '1px solid rgba(239,68,68,0.25)',
            borderRadius: '8px',
            padding: '12px 16px',
            color: '#fca5a5',
            fontSize: '14px',
            marginBottom: '1rem',
          }}>
            {loadError}
          </div>
        )}

        {/* Empty State */}
        {filtered.length === 0 && !loadError && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            color: 'rgba(255,255,255,0.3)',
          }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>📋</div>
            <p style={{ fontSize: '15px', fontWeight: 600, margin: '0 0 6px' }}>No requests yet</p>
            <p style={{ fontSize: '13px', margin: 0 }}>
              {filter === 'all' ? 'Submit the first one above!' : `No ${filter.replace('_', ' ')} requests.`}
            </p>
          </div>
        )}

        {/* Request List */}
        {filtered.map(req => (
          <RequestCard
            key={req.id}
            req={req}
            role={role}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Root Export ──────────────────────────────────────────────────────────────

export default function EditsClient() {
  const [role, setRole] = useState<Role | null>(null);
  const [checking, setChecking] = useState(true);

  // On mount, hit the API — 200 means we have a valid cookie, 401 means show login
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/edits');
        if (res.ok) {
          const data = await res.json();
          setRole(data.role);
        }
      } finally {
        setChecking(false);
      }
    })();
  }, []);

  if (checking) {
    return (
      <div style={{ ...styles.page, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '14px' }}>Loading…</div>
      </div>
    );
  }

  if (!role) {
    return <LoginScreen onLogin={setRole} />;
  }

  return <Dashboard role={role} onLogout={() => setRole(null)} />;
}
