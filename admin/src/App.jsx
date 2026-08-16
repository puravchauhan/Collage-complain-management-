import React, { useState } from "react";
import { useFonts } from "./theme/tokens";
import { INITIAL_COMPLAINTS } from "./data/mockData";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import OverviewTab from "./tabs/OverviewTab";
import ComplaintsTab from "./tabs/ComplaintsTab";
import TechniciansTab from "./tabs/TechniciansTab";
import PlaceholderTab from "./tabs/PlaceholderTab";

const TAB_META = {
  overview: { title: "Dashboard overview", subtitle: "Campus maintenance at a glance" },
  complaints: { title: "All complaints", subtitle: "Review, assign, and track resolution" },
  technicians: { title: "Technicians", subtitle: "Workload and performance" },
  students: { title: "Students", subtitle: "Registered portal users" },
  reports: { title: "Reports", subtitle: "Monthly maintenance summary" },
  settings: { title: "Settings", subtitle: "Portal configuration" },
};

export default function App() {
  useFonts();
  const [tab, setTab] = useState("overview");
  const [topSearch, setTopSearch] = useState("");
  const [complaints, setComplaints] = useState(INITIAL_COMPLAINTS);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleAssign = (complaintId, techId) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === complaintId ? { ...c, technician: techId, status: "Assigned" } : c))
    );
  };

  const meta = TAB_META[tab];

  return (
    <div className="app">
      <Sidebar active={tab} onSelect={setTab} isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className={`app-backdrop${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(false)} />

      <div className="app-main">
        <Topbar
          search={topSearch}
          onSearch={setTopSearch}
          title={meta.title}
          subtitle={meta.subtitle}
          onMenuClick={() => setMenuOpen(true)}
        />
        <div className="app-content">
          {tab === "overview" && <OverviewTab complaints={complaints} />}
          {tab === "complaints" && <ComplaintsTab complaints={complaints} onAssign={handleAssign} />}
          {tab === "technicians" && <TechniciansTab complaints={complaints} />}
          {tab === "students" && (
            <PlaceholderTab label="Student directory" note="Registered student accounts, complaint history, and contact details will appear here." />
          )}
          {tab === "reports" && (
            <PlaceholderTab label="Reports & analytics" note="Downloadable monthly maintenance reports and resolution-time trends will appear here." />
          )}
          {tab === "settings" && (
            <PlaceholderTab label="Portal settings" note="Manage categories, priority rules, and notification preferences here." />
          )}
        </div>
      </div>
    </div>
  );
}
