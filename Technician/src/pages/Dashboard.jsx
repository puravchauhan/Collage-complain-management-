import React, { useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatsCards from "../components/StatsCards";
import ComplaintsTable from "../components/ComplaintsTable";

const JOBS = [
  { id: 101, title: "Wi-Fi Down", location: "Block A · 2nd Floor Lab", category: "Network", priority: "High", status: "Pending" },
  { id: 102, title: "Water Leakage", location: "Hostel Wing C · Washroom 4", category: "Plumbing", priority: "Medium", status: "In Progress" },
  { id: 103, title: "Broken Fan", location: "Room 214 · Main Building", category: "Electrical", priority: "Low", status: "Assigned" },
  { id: 104, title: "Projector Not Working", location: "Seminar Hall 1", category: "Equipment", priority: "High", status: "Pending" },
  { id: 105, title: "Chair Repair Needed", location: "Library · Reading Room", category: "Furniture", priority: "Low", status: "Done" },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("dashboard");

  const counts = useMemo(() => {
    return {
      pending: JOBS.filter((j) => j.status === "Pending").length,
      working: JOBS.filter((j) => j.status === "In Progress").length,
      done: JOBS.filter((j) => j.status === "Done").length,
      total: JOBS.length,
    };
  }, []);

  return (
    <div className="app-shell">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        active={activeNav}
        onNavigate={setActiveNav}
      />

      <div className="main-col">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="content">
          <div className="blueprint-hero">
            <div className="eyebrow">Work Order Console</div>
            <h1>Welcome back, Ramesh 👋</h1>
            <p>
              You have {counts.pending} pending and {counts.working} in-progress
              jobs today. Keep the campus running smoothly.
            </p>
          </div>

          <StatsCards counts={counts} />

          <ComplaintsTable initialJobs={JOBS} />
        </main>
      </div>
    </div>
  );
}
