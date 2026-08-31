# College Complaint & Maintenance Portal — Admin Dashboard

A responsive React admin dashboard for the College Complaint & Maintenance
Portal abstract (ASP.NET + SQL Server backend concept). Same design and
colors as before — now with simpler, class-based CSS and full mobile support.

## What changed in this version

- **Simpler code**: components now use plain CSS classes (`src/index.css`)
  instead of large inline `style={{...}}` objects. Same look, much less JSX.
- **Responsive**: 
  - Sidebar becomes a slide-in drawer (with a hamburger button + backdrop) below 860px.
  - Stat card grid: 4 → 2 → 1 columns as the screen narrows.
  - Overview charts stack vertically below 900px.
  - Technician cards: 2 → 1 columns below 700px.
  - The complaint "docket" ticket stacks vertically (stub on top, body below) below 640px instead of overflowing.

## Color scheme

| Area              | Color     |
|-------------------|-----------|
| Navbar / sidebar   | `#182235` |
| Buttons / accents  | `#d89d2a` |
| Body background    | `#f4efe3` |

All colors are defined once, as CSS variables, at the top of `src/index.css`.

## Folder structure

```
college-complaint-portal/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                # React entry point
    ├── App.jsx                 # Root component — wires sidebar + topbar + tabs
    ├── index.css                # All design tokens + component styles + media queries
    ├── theme/
    │   └── tokens.js           # JS color/font constants (used by recharts + per-row data colors)
    ├── data/
    │   └── mockData.js         # Complaints, technicians, category/status/priority metadata
    ├── components/
    │   ├── Sidebar.jsx         # Navy left nav (slides in as a drawer on mobile)
    │   ├── Topbar.jsx          # Navy top bar with search + hamburger (mobile)
    │   ├── StatCard.jsx        # Overview summary metric card
    │   ├── IconBadge.jsx       # Rounded icon chip
    │   ├── Pill.jsx            # Status/priority badge
    │   └── ComplaintDocket.jsx # Signature "work-order ticket" complaint card
    └── tabs/
        ├── OverviewTab.jsx     # Stat cards + charts + recent activity
        ├── ComplaintsTab.jsx   # Filterable/searchable complaint list + assign flow
        ├── TechniciansTab.jsx  # Technician workload cards
        └── PlaceholderTab.jsx  # Reused for Students / Reports / Settings
```

## Run it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`), and
try resizing the window (or open dev tools' device toolbar) to see the
responsive behavior.

## Connecting to your ASP.NET / SQL Server backend

Replace the mock data in `src/data/mockData.js` with `fetch()` calls to your
ASP.NET Web API endpoints (e.g. `GET /api/complaints`, `POST /api/complaints/{id}/assign`),
and move the `complaints` state in `App.jsx` into a data-fetching hook
(e.g. `useEffect` + `useState`, or React Query) once your API is ready.
