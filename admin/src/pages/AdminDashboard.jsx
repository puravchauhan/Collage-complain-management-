import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFonts } from "../theme/tokens";
import { INITIAL_COMPLAINTS } from "../data/mockData";
import { DEFAULT_ADMIN, DEFAULT_SETTINGS } from "../data/adminData";
import { useAuth } from "../context/AuthContext";
import Sidebar, { NAV_ITEMS } from "../components/Sidebar";
import Topbar from "../components/Topbar";
import OverviewTab from "../tabs/OverviewTab";
import ComplaintsTab from "../tabs/ComplaintsTab";
import TechniciansTab from "../tabs/TechniciansTab";
import PlaceholderTab from "../tabs/PlaceholderTab";
import ProfileTab from "../tabs/ProfileTab";
import SettingsTab from "../tabs/SettingsTab";

const TAB_META = {
  overview: { title: "Dashboard overview", subtitle: "Campus maintenance at a glance" },
  complaints: { title: "All complaints", subtitle: "Review, assign, and track resolution" },
  technicians: { title: "Technicians", subtitle: "Workload and performance" },
  students: { title: "Students", subtitle: "Registered portal users" },
  reports: { title: "Reports", subtitle: "Monthly maintenance summary" },
  settings: { title: "Settings", subtitle: "Portal configuration" },
  profile: { title: "My profile", subtitle: "Account details and preferences" },
};

// Tabs the global search bar can jump to (profile included so "profile" also works).
export const SEARCHABLE_TABS = [
  ...NAV_ITEMS.map((n) => ({ key: n.key, label: n.label })),
  { key: "profile", label: "Profile" },
];

/** /admin/dashboard — the existing admin console, unchanged aside from
 *  being moved here and gaining a real logout (previously decorative). */
export default function AdminDashboard() {
  useFonts();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [tab, setTab] = useState("overview");
  const [topSearch, setTopSearch] = useState("");
  const [complaints, setComplaints] = useState(INITIAL_COMPLAINTS);
  const [menuOpen, setMenuOpen] = useState(false);
  const [prevTab, setPrevTab] = useState("overview");
  const [admin, setAdmin] = useState(DEFAULT_ADMIN);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  const navigateTo = (key) => {
    setPrevTab(tab === "profile" ? prevTab : tab);
    setTab(key);
    setTopSearch("");
    setMenuOpen(false);
  };

  const goToProfile = () => navigateTo("profile");

  const handleAssign = (complaintId, techId) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === complaintId ? { ...c, technician: techId, status: "Assigned" } : c))
    );
  };

  // Merge a partial update into the admin profile — used by both the Profile
  // page and the Settings page so an edit in either place shows up in both,
  // plus anywhere else admin.name / admin.* is displayed (sidebar, topbar).
  const updateAdmin = (patch) => setAdmin((prev) => ({ ...prev, ...patch }));
  const updateSettings = (patch) => setSettings((prev) => ({ ...prev, ...patch }));

  const handleLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  const meta = TAB_META[tab];

  return (
    <div className="app">
      <Sidebar
        active={tab}
        onSelect={navigateTo}
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onProfileClick={goToProfile}
        admin={admin}
        onLogout={handleLogout}
      />
      <div className={`app-backdrop${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(false)} />

      <div className="app-main">
        <Topbar
          search={topSearch}
          onSearch={setTopSearch}
          title={meta.title}
          subtitle={meta.subtitle}
          onMenuClick={() => setMenuOpen(true)}
          onProfileClick={goToProfile}
          profileActive={tab === "profile"}
          admin={admin}
          onNavigate={navigateTo}
        />
        <div className="app-content">
          {tab === "overview" && <OverviewTab complaints={complaints} admin={admin} />}
          {tab === "complaints" && (
            <ComplaintsTab complaints={complaints} onAssign={handleAssign} settings={settings} />
          )}
          {tab === "technicians" && <TechniciansTab complaints={complaints} />}
          {tab === "students" && (
            <PlaceholderTab label="Student directory" note="Registered student accounts, complaint history, and contact details will appear here." />
          )}
          {tab === "reports" && (
            <PlaceholderTab label="Reports & analytics" note="Downloadable monthly maintenance reports and resolution-time trends will appear here." />
          )}
          {tab === "settings" && (
            <SettingsTab admin={admin} onUpdateAdmin={updateAdmin} settings={settings} onUpdateSettings={updateSettings} />
          )}
          {tab === "profile" && (
            <ProfileTab
              complaints={complaints}
              onBack={() => setTab(prevTab)}
              admin={admin}
              onUpdateAdmin={updateAdmin}
              settings={settings}
              onUpdateSettings={updateSettings}
              onLogout={handleLogout}
            />
          )}
        </div>
      </div>
    </div>
  );
}
