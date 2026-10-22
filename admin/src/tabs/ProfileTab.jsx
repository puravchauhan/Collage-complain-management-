
import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Mail,
  Phone,
  ShieldCheck,
  Building2,
  CalendarDays,
  ClipboardList,
  CheckCircle2,
  Clock3,
  Pencil,
  Save,
  Bell,
  LogOut,
  RefreshCw,
} from "lucide-react";

import { C } from "../theme/tokens";
import { initialsOf } from "../data/adminData";
import IconBadge from "../components/IconBadge";

const API_URL = "https://localhost:7277/api/Admin";

export default function ProfileTab({
  complaints = [],
  onBack,
  admin,
  onUpdateAdmin,
  settings = {},
  onUpdateSettings,
  onLogout,
}) {
  const [profile, setProfile] = useState(admin || {});
  const [draft, setDraft] = useState(admin || {});
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch the latest admin information from SQL Server.
  const loadProfile = async () => {
    if (!admin?.id) {
      setError("Admin ID is missing. Please log out and log in again.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await fetch(
        `${API_URL}/profile/${admin.id}`
      );

      const data = await response.json();

      if (!response.ok || !data.success || !data.user) {
        throw new Error(
          data.message || "Could not load the admin profile."
        );
      }

      setProfile(data.user);
      setDraft(data.user);

      // Keep the latest database profile in shared application state.
      if (typeof onUpdateAdmin === "function") {
        onUpdateAdmin(data.user);
      }
    } catch (err) {
      console.error("Profile loading error:", err);
      setError(
        err.message ||
          "Could not connect to the backend. Check that it is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
    // Fetch again when the authenticated admin changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [admin?.id]);

  const total = complaints.length;

  const resolved = complaints.filter(
    (c) => c.status === "Resolved"
  ).length;

  const open = complaints.filter(
    (c) => c.status !== "Resolved"
  ).length;

  const startEdit = () => {
    setDraft({ ...profile });
    setEditing(true);
    setError("");
    setSuccess("");
  };

  const saveProfile = () => {
    // This backend model currently supports Name, Email, and Role.
    // Editing here does not save to SQL Server until a PUT endpoint
    // for updating the profile has been implemented.
    setError(
      "Profile editing is not connected to a database update API yet. Your database email is displayed above."
    );
  };

  const cancelEdit = () => {
    setDraft({ ...profile });
    setEditing(false);
    setError("");
  };

  const changeField = (key, value) => {
    setDraft((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
    >
      <button
        type="button"
        className="link-action"
        onClick={onBack}
        style={{
          width: "fit-content",
          border: "none",
          background: "transparent",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <ArrowLeft size={14} />
        Back
      </button>

      {/* Loading and error messages */}
      {loading && (
        <p>Loading admin profile from the database...</p>
      )}

      {error && (
        <div
          role="alert"
          style={{
            padding: 12,
            background: "#fff0ee",
            color: C.danger || "#C1440E",
            borderRadius: 8,
          }}
        >
          {error}
        </div>
      )}

      {success && (
        <div
          role="status"
          style={{
            padding: 12,
            background: "#eaf7ee",
            color: "#216e39",
            borderRadius: 8,
          }}
        >
          {success}
        </div>
      )}

      {/* Profile header */}
      <div className="card profile-hero">
        <div className="profile-hero-avatar">
          {initialsOf(profile.name || "Admin")}
        </div>

        <div className="profile-hero-info">
          <div className="profile-hero-name">
            {profile.name || "Administrator"}
          </div>

          <div className="profile-hero-role">
            <ShieldCheck size={14} color={C.gold} />
            {profile.role || "Admin"}
          </div>

          <div className="profile-hero-meta">
            <span>
              <Mail size={13} />
              {profile.email || "Email not available"}
            </span>

            <span>
              <CalendarDays size={13} />
              Database profile
            </span>
          </div>
        </div>

        <button
          type="button"
          className="assign-btn"
          onClick={loadProfile}
          disabled={loading}
        >
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {/* Complaint statistics */}
      <div className="stat-grid">
        <StatMini
          icon={ClipboardList}
          label="Total complaints"
          value={total}
          accent={C.info}
        />

        <StatMini
          icon={CheckCircle2}
          label="Resolved"
          value={resolved}
          accent={C.success}
        />

        <StatMini
          icon={Clock3}
          label="Open complaints"
          value={open}
          accent={C.warn}
        />
      </div>

      <div className="profile-grid">
        {/* Account details */}
        <div className="card">
          <div className="card-title">Account details</div>

          <div className="profile-field">
            <label htmlFor="admin-name">Full name</label>

            {editing ? (
              <input
                id="admin-name"
                className="profile-input"
                value={draft.name || ""}
                onChange={(e) =>
                  changeField("name", e.target.value)
                }
              />
            ) : (
              <div className="profile-value">
                {profile.name || "Not available"}
              </div>
            )}
          </div>

          <div className="profile-field">
            <label htmlFor="admin-email">Email</label>

            <div className="profile-value">
              <Mail size={14} color={C.slateLight} />
              {profile.email || "Email not available"}
            </div>
          </div>

          

         

          {editing && (
            <div
              style={{
                display: "flex",
                gap: 8,
                marginTop: 12,
              }}
            >
              <button
                type="button"
                className="assign-btn"
                onClick={saveProfile}
              >
                <Save size={14} />
                Save changes
              </button>

              <button
                type="button"
                className="filter-btn"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            </div>
          )}

          {!editing && (
            <button
              type="button"
              className="assign-btn"
              onClick={startEdit}
              style={{ marginTop: 12 }}
            >
              <Pencil size={14} />
              Edit profile
            </button>
          )}

          <div className="profile-hint">
            The email above is fetched from the Admin database
            record. Profile edits require a backend update endpoint.
          </div>
        </div>

        {/* Preferences */}
        <div className="card">
          <div className="card-title">Preferences</div>

          <div className="profile-setting-row">
            <div className="profile-setting-label">
              <IconBadge
                icon={Bell}
                color={C.info}
                bg={C.infoBg}
                size={30}
              />

              <div>
                <div className="profile-setting-title">
                  Email notifications
                </div>

                <div className="profile-setting-sub">
                  Complaint notification preference
                </div>
              </div>
            </div>

            <label className="profile-toggle">
              <input
                type="checkbox"
                checked={settings.emailNotifications ?? true}
                onChange={(e) =>
                  onUpdateSettings?.({
                    emailNotifications: e.target.checked,
                  })
                }
              />

              <span className="profile-toggle-slider" />
            </label>
          </div>

          <div
            className="profile-setting-row"
            style={{ borderBottom: "none" }}
          >
            <div className="profile-setting-label">
              <IconBadge
                icon={LogOut}
                color={C.danger}
                bg={C.dangerBg}
                size={30}
              />

              <div>
                <div className="profile-setting-title">
                  Log out
                </div>

                <div className="profile-setting-sub">
                  End your current session
                </div>
              </div>
            </div>

            <button
              type="button"
              className="link-action"
              style={{
                color: C.danger,
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
              onClick={onLogout}
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatMini({ icon, label, value, accent }) {
  return (
    <div className="stat-card">
      <div
        className="stat-card-accent"
        style={{ background: accent }}
      />

      <div className="stat-card-head">
        <span className="stat-card-label">{label}</span>

        <IconBadge
          icon={icon}
          color={accent}
          bg={`${accent}1a`}
          size={30}
        />
      </div>

      <div className="stat-card-value">{value}</div>
    </div>
  );
}
