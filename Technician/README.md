# Technician Dashboard — College Complaint & Maintenance Portal

A responsive Technician Dashboard built with **React**, **Bootstrap 5**, and **Bootstrap Icons**.

## Folder Structure

```
technician-dashboard/
├── public/
│   └── index.html          # HTML shell (loads Google fonts)
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx         # Left nav (collapsible on mobile)
│   │   ├── Topbar.jsx          # Header: title, notifications, profile
│   │   ├── StatsCards.jsx      # Pending / Working / Done / Total cards
│   │   └── ComplaintsTable.jsx # Ticket-style complaints table
│   ├── pages/
│   │   └── Dashboard.jsx       # Composes layout + sample job data
│   ├── App.jsx
│   ├── index.js                # Entry point, imports Bootstrap CSS
│   └── index.css               # Design tokens + custom styling
├── package.json
└── README.md
```

## Run it locally

```bash
cd technician-dashboard
npm install
npm start
```

Opens at `http://localhost:3000`.

## Build for production

```bash
npm run build
```

## Design notes

- **Colors**: deep navy (`#16283F`) sidebar/hero, amber (`#F2A93B`) as the primary
  accent, with clay-orange / amber / teal used consistently for
  High / Medium / Low priority.
- **Typography**: Inter for UI text, JetBrains Mono for job IDs and data —
  gives the console a technical, work-order feel.
- **Signature detail**: each complaint row is styled like a physical work-order
  ticket, with a colored left-edge stripe indicating priority, and the hero
  banner uses a subtle blueprint grid background to nod to facilities/maintenance.
- **Responsive**: sidebar collapses into a slide-over drawer below 992px; the
  complaints table becomes a stacked card list below 768px.

## Swap in real data

Replace the `JOBS` array in `src/pages/Dashboard.jsx` with an API call (e.g. to
your ASP.NET backend's `/api/technician/{id}/complaints` endpoint), and pass
the result into `<ComplaintsTable initialJobs={data} />`.
