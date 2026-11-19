import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFonts } from "../theme/tokens";
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

const API = "https://localhost:7277/api/Complaint";

const TAB_META = {
  overview: {
    title: "Dashboard overview",
    subtitle: "Campus maintenance at a glance",
  },
  complaints: {
    title: "All complaints",
    subtitle: "Review, assign, and track resolution",
  },
  technicians: {
    title: "Technicians",
    subtitle: "Workload and performance",
  },
  students: {
    title: "Students",
    subtitle: "Registered portal users",
  },
  reports: {
    title: "Reports",
    subtitle: "Monthly maintenance summary",
  },
  settings: {
    title: "Settings",
    subtitle: "Portal configuration",
  },
  profile: {
    title: "My profile",
    subtitle: "Account details and preferences",
  },
};

// Tabs the global search bar can jump to.
export const SEARCHABLE_TABS = [
  ...NAV_ITEMS.map((n) => ({
    key: n.key,
    label: n.label,
  })),
  { key: "profile", label: "Profile" },
];

export default function AdminDashboard() {
  useFonts();

  const navigate = useNavigate();

  const { user, updateUser, logout } = useAuth();

  const [tab, setTab] = useState("overview");
  const [topSearch, setTopSearch] = useState("");

  const [complaints, setComplaints] = useState([]);
  const [loadingComplaints, setLoadingComplaints] = useState(true);
  const [complaintError, setComplaintError] = useState("");

  const [menuOpen, setMenuOpen] = useState(false);
  const [prevTab, setPrevTab] = useState("overview");

  const [admin, setAdmin] = useState(DEFAULT_ADMIN);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  // Navigate between dashboard tabs.
  const navigateTo = (key) => {
    setPrevTab(tab === "profile" ? prevTab : tab);
    setTab(key);
    setTopSearch("");
    setMenuOpen(false);
  };

  // Load all complaints from the backend database.
  const loadComplaints = async () => {
    try {
      setLoadingComplaints(true);
      setComplaintError("");

      const response = await fetch(`${API}/all`);

      if (!response.ok) {
        throw new Error(
          `Unable to load complaints. HTTP ${response.status}`
        );
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error(
          "The API did not return a complaints list."
        );
      }

      const formattedComplaints = data.map((c) => ({
        id: c.id,
        category: c.category || "Other Issues",
        title: c.title || "Untitled complaint",
        priority: c.priority || "Medium",
        location: c.location || "Not specified",
        description: c.description || "",
        status: c.status || "Pending",
        date: c.date,
        student: `User ${c.userId}`,
        technicianId: c.technicianId ?? null,
        imagePath: c.imagePath || null,
      }));

      setComplaints(formattedComplaints);
    } catch (error) {
      console.error("Loading complaints failed:", error);

      setComplaintError(
        error.message || "Failed to load complaints."
      );
    } finally {
      setLoadingComplaints(false);
    }
  };

  // Load complaints when the dashboard opens.
  useEffect(() => {
    loadComplaints();
  }, []);

  // Open admin profile.
  const goToProfile = () => {
    navigateTo("profile");
  };

  // Assign an approved technician to a complaint.
  const handleAssign = async (complaintId, techId) => {
    try {
      if (!complaintId || !techId) {
        throw new Error("Complaint ID and technician ID are required.");
      }

      const response = await fetch(
        `${API}/${complaintId}/assign`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            technicianId: Number(techId),
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to assign technician."
        );
      }



      // Reload updated complaints from SQL Server.
      await loadComplaints();

    } catch (error) {
      console.error("Technician assignment failed:", error);

      alert(
        error.message || "Unable to assign technician."
      );
    }
  };

  // Update admin profile.
  const updateAdmin = (patch) => {
    setAdmin((prev) => ({
      ...prev,
      ...patch,
    }));
  };

  // Update portal settings.
  const updateSettings = (patch) => {
    setSettings((prev) => ({
      ...prev,
      ...patch,
    }));
  };

  // Logout admin.
  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
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

      <div
        className={`app-backdrop${menuOpen ? " open" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

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

          {/* OVERVIEW TAB */}
          {tab === "overview" && (
            <div>
              {loadingComplaints && (
                <p>Loading complaints from database...</p>
              )}

              {complaintError && (
                <div className="error-message">
                  <p>{complaintError}</p>

                  <button
                    type="button"
                    onClick={loadComplaints}
                  >
                    Try Again
                  </button>
                </div>
              )}

              {!loadingComplaints && !complaintError && (
                <OverviewTab
                  complaints={complaints}
                  admin={admin}
                />
              )}
            </div>
          )}

          {/* COMPLAINTS TAB */}
          {tab === "complaints" && (
            <div>
              {loadingComplaints && (
                <p>Loading complaints from database...</p>
              )}

              {complaintError && (
                <div className="error-message">
                  <p>{complaintError}</p>

                  <button
                    type="button"
                    onClick={loadComplaints}
                  >
                    Try Again
                  </button>
                </div>
              )}

              {!loadingComplaints && !complaintError && (
                <ComplaintsTab
                  complaints={complaints}
                  onAssign={handleAssign}
                  settings={settings}
                />
              )}
            </div>
          )}

          {/* TECHNICIANS TAB */}
          {tab === "technicians" && (
            <TechniciansTab
              complaints={complaints}
            />
          )}

          {/* STUDENTS TAB */}
          {tab === "students" && (
            <PlaceholderTab
              label="Student directory"
              note="Registered student accounts, complaint history, and contact details will appear here."
            />
          )}

          {/* REPORTS TAB */}
          {tab === "reports" && (
            <PlaceholderTab
              label="Reports & analytics"
              note="Downloadable monthly maintenance reports and resolution-time trends will appear here."
            />
          )}

          {/* SETTINGS TAB */}
          {tab === "settings" && (
            <SettingsTab
              admin={admin}
              onUpdateAdmin={updateAdmin}
              settings={settings}
              onUpdateSettings={updateSettings}
            />
          )}

          {/* PROFILE TAB */}
          {tab === "profile" && (
            <ProfileTab
              admin={user}
              onUpdateAdmin={updateUser}
              onLogout={logout}
              complaints={complaints}
              settings={settings}
              onUpdateSettings={setSettings}
              onBack={() => navigateTo("overview")}
            />
          )}

        </div>
      </div>
    </div>
  );
}