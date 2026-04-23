# Mission 7 — Structure Outline

## 1. Component Hierarchy

### Dashboard Home (`/dashboard/page.tsx`) — **Server Component**

```
DashboardPage (Server)
├── DashboardHeader (Server — static markup)
├── StatsRow (Server — receives pre-fetched data as props)
│   ├── StatCard: "Leads this month"   (Server — big number + MoM delta)
│   ├── StatCard: "Cost per lead"      (Server — AdEmptyState: no ad data yet)
│   └── StatCard: "Total ad spend"     (Server — AdEmptyState: no ad data yet)
├── LeadsTrendSection (Server — fetches trend data, passes to chart as plain data props)
│   └── LeadsTrendChart (Client ← Recharts requires browser DOM)
└── BottomRow (Server)
    ├── RecentLeadsWidget (Client ← manages drawer open state, receives leads as props)
    │   └── LeadDrawer (Client — Sheet overlay, lazy-fetches conversations on open)
    └── KeywordRankingsStub (Server — EmptyState "Coming in Mission 12")
```

Why Server/Client split this way:
- Page and all static widgets are Server = zero JS on client for initial render
- `LeadsTrendChart` must be Client because Recharts uses `window`/`ResizeObserver`
- `RecentLeadsWidget` must be Client because it manages drawer open/close state
- `LeadDrawer` is Client because Sheet interaction is client-side

---

### Leads Screen (`/dashboard/leads/page.tsx`) — **Server Component**

```
LeadsPage (Server — reads searchParams, runs filtered query, passes results as props)
├── LeadsHeader (Server — shows filtered count)
├── LeadsSection (Client — thin wrapper that owns selectedLead state)
│   ├── LeadsFilters (Client — all filter controls, updates URL via router.replace)
│   │   ├── SearchInput (Client — debounced 400ms)
│   │   ├── DateRangeSelect (Client)
│   │   ├── StatusFilter (Client — pill multi-select)
│   │   └── SourceFilter (Client — pill multi-select)
│   ├── LeadsTable (Client — receives leads[], calls onLeadClick)
│   │   ├── Desktop: <table> with full columns
│   │   └── Mobile: card layout (stacked, no horizontal scroll)
│   ├── Pagination (Client — updates URL, page + pageSize)
│   └── LeadDrawer (Client — Sheet, opens when selectedLead != null)
│       ├── ContactInfo (static — from selected lead props)
│       ├── ConversationTimeline (fetched on drawer open via Server Action)
│       ├── StatusSelect (Client — calls updateLeadStatusAction)
│       └── AssignStub (static placeholder)
```

---

## 2. Data Fetching

**All initial data is Server-fetched.** `page.tsx` creates a single Supabase server client, runs all queries in `Promise.all`, passes results as props. RLS scopes everything to the session's `client_id` automatically.

```typescript
// Dashboard: 4 queries in parallel
const [stats, trend, recentLeads] = await Promise.all([
  getLeadsStats(supabase),
  getLeadsTrend(supabase),
  getRecentLeads(supabase, 10),
])

// Leads: 1 query + count
const { leads, total } = await getLeads(supabase, searchParams)
```

**One case for client-side fetch:** `LeadDrawer` calls `getLeadConversationsAction(leadId)` (Server Action) when it opens — deferred to avoid N+1 loading all conversations at page load. Uses `useTransition` + loading skeleton while fetching.

**Filter changes:** `router.replace(newUrl, { scroll: false })` in Client Components → Next.js re-renders the Server Component with new `searchParams`. No client-side fetch state.

---

## 3. URL State

```
/dashboard/leads
  ?q=smith              — debounced text search (name, email, phone)
  ?status=new,qualified — comma-delimited enum values
  ?dateRange=30d        — 7d | 30d | 90d | all (default: all)
  ?page=1               — 1-indexed (reset to 1 on any filter change)
  ?pageSize=25          — 25 | 50 | 100
```

Each filter component reads current params with `useSearchParams()`, builds a new `URLSearchParams`, calls `router.replace()` preserving all other params. Changing any filter resets `page` to 1.

---

## 4. Chart Library — Recharts

**Primitives used:**
```tsx
<ResponsiveContainer width="100%" height={280}>
  <LineChart data={dailyBuckets} margin={{ top: 5, right: 24, bottom: 5, left: -10 }}>
    <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" vertical={false} />
    <XAxis dataKey="date" tickLine={false} axisLine={false} tickFormatter={formatXTick}
           tick={{ fontSize: 11, fill: '#71717a' }} minTickGap={40} interval="preserveStartEnd" />
    <YAxis tickLine={false} axisLine={false} allowDecimals={false}
           tick={{ fontSize: 11, fill: '#71717a' }} />
    <Tooltip content={<CustomTooltip />} />
    <Legend iconType="circle" iconSize={8} />
    {sources.map((src, i) => (
      <Line key={src} type="monotone" dataKey={src} stroke={CHART_COLORS[i]}
            strokeWidth={2} dot={false} activeDot={{ r: 4, strokeWidth: 0 }} />
    ))}
  </LineChart>
</ResponsiveContainer>
```

**Sparse data handling:**
- Query finds `MIN(first_contact_at)` for the client as `earliest`
- If `earliest > 60 days ago`, chart X-axis starts at `earliest` — days before that simply don't appear in the data array (honest)
- A muted note renders below the chart: _"Data available from [date]. Trend will fill in as sync history grows."_
- All days between `earliest` and today with 0 leads show as `0` (that IS real data — no leads on that day is valid)
- Days before `earliest` are absent from the array entirely, not shown as fake zeros
