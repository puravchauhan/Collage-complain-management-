import React, { useState } from "react";
import {
  ArrowLeft, Mail, Phone, ShieldCheck, Building2, CalendarDays,
  ClipboardList, CheckCircle2, Clock3, Pencil, Save, KeyRound, Bell, LogOut,
} from "lucide-react";
import { C } from "../theme/tokens";
import { initialsOf } from "../data/adminData";
import IconBadge from "../components/IconBadge";

/**
 * Admin profile page — reached via the topbar / sidebar profile icon.
 * `admin` and `settings` are lifted into App state, so any edit made here
 * (via onUpdateAdmin / onUpdateSettings) is immediately visible in the
 * sidebar, the topbar, the Overview greeting, and the Settings page too.
 */
export default function ProfileTab({ complaints, onBack, admin, onUpdateAdmin, settings, onUpdateSettings, onLogout }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(admin);

  const total = complaints.length;
  const resolved = complaints.filter((c) => c.status === "Resolved").length;
  const pending = complaints.filter((c) => c.status !== "Resolved").length;

  const startEdit = () => {
    setDraft(admin);
    setEditing(true);
  };

  const save = () => {
    onUpdateAdmin(draft);
    setEditing(false);
  };

  const set = (key) => (e) => setDraft((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div className="link-action" onClick={onBack} style={{ width: "fit-content" }}>
        <ArrowLeft size={14} />
        Back
      </div>

      {/* Header / identity card */}
      <div className="card profile-hero">
        <div className="profile-hero-avatar">{initialsOf(admin.name)}</div>
        <div className="profile-hero-info">
          <div className="profile-hero-name">{admin.name}</div>
          <div className="profile-hero-role">
            <ShieldCheck size={14} color={C.gold} />
            {admin.role}
          </div>
          <div className="profile-hero-meta">
            <span><Building2 size={13} /> {admin.department}</span>
            <span><CalendarDays size={13} /> Joined Jan 2023</span>
          </div>
        </div>
        {editing ? (
          <button className="assign-btn" onClick={save}>
            <Save size={14} /> Save changes
          </button>
        ) : (
          <button className="assign-btn" onClick={startEdit}>
            <Pencil size={14} /> Edit profile
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="stat-grid">
        <StatMini icon={ClipboardList} label="Total complaints" value={total} accent={C.info} />
        <StatMini icon={CheckCircle2} label="Resolved" value={resolved} accent={C.success} />
        <StatMini icon={Clock3} label="Open / in progress" value={pending} accent={C.warn} />
      </div>

      <div className="profile-grid">
        {/* Contact / account details */}
        <div className="card">
          <div className="card-title">Account details</div>
          <div className="profile-field">
            <label>Full name</label>
            {editing ? (
              <input className="profile-input" value={draft.name} onChange={set("name")} />
            ) : (
              <div className="profile-value">{admin.name}</div>
            )}
          </div>
          <div className="profile-field">
            <label>Email</label>
            {editing ? (
              <input className="profile-input" value={draft.email} onChange={set("email")} />
            ) : (
              <div className="profile-value"><Mail size={14} color={C.slateLight} /> {admin.email}</div>
            )}
          </div>
          <div className="profile-field">
            <label>Phone</label>
            {editing ? (
              <input className="profile-input" value={draft.phone} onChange={set("phone")} />
            ) : (
              <div className="profile-value"><Phone size={14} color={C.slateLight} /> {admin.phone}</div>
            )}
          </div>
          <div className="profile-field">
            <label>Department</label>
            {editing ? (
              <input className="profile-input" value={draft.department} onChange={set("department")} />
            ) : (
              <div className="profile-value"><Building2 size={14} color={C.slateLight} /> {admin.department}</div>
            )}
          </div>
          {editing && (
            <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
              <button className="assign-btn" onClick={save}>
                <Save size={14} /> Save changes
              </button>
              <button
                className="filter-btn"
                onClick={() => { setDraft(admin); setEditing(false); }}
              >
                Cancel
              </button>
            </div>
          )}
          <div className="profile-hint">
            Also editable from <b>Settings → Admin account</b> — changes made there show up here too.
          </div>
        </div>

        {/* Quick settings — same state as the Settings page */}
        <div className="card">
          <div className="card-title">Preferences</div>
          <div className="profile-setting-row">
            <div className="profile-setting-label">
              <IconBadge icon={KeyRound} color={C.gold} bg={C.goldTint} size={30} />
              <div>
                <div className="profile-setting-title">Change password</div>
                <div className="profile-setting-sub">Update your login credentials</div>
              </div>
            </div>
            <span className="link-action">Update</span>
          </div>
          <div className="profile-setting-row">
            <div className="profile-setting-label">
              <IconBadge icon={Bell} color={C.info} bg={C.infoBg} size={30} />
              <div>
                <div className="profile-setting-title">Email notifications</div>
                <div className="profile-setting-sub">Alerts for new complaints</div>
              </div>
            </div>
            <label className="profile-toggle">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => onUpdateSettings({ emailNotifications: e.target.checked })}
              />
              <span className="profile-toggle-slider" />
            </label>
          </div>
          <div className="profile-setting-row" style={{ borderBottom: "none" }}>
            <div className="profile-setting-label">
              <IconBadge icon={LogOut} color={C.danger} bg={C.dangerBg} size={30} />
              <div>
                <div className="profile-setting-title">Log out</div>
                <div className="profile-setting-sub">End your current session</div>
              </div>
            </div>
            <span
              className="link-action"
              style={{ color: C.danger, cursor: "pointer" }}
              onClick={onLogout}
              role="button"
              tabIndex={0}
            >
              Log out
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatMini({ icon, label, value, accent }) {
  return (
    <div className="stat-card">
      <div className="stat-card-accent" style={{ background: accent }} />
      <div className="stat-card-head">
        <span className="stat-card-label">{label}</span>
        <IconBadge icon={icon} color={accent} bg={accent + "1a"} size={30} />
      </div>
      <div className="stat-card-value">{value}</div>
    </div>
  );
}
