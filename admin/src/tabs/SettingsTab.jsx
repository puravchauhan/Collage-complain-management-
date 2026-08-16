import React, { useState } from "react";
import {
  User, Bell, Wand2, Rows3, Save, RotateCcw, CheckCircle2,
} from "lucide-react";
import { C } from "../theme/tokens";
import { DEFAULT_ADMIN, DEFAULT_SETTINGS } from "../data/adminData";
import IconBadge from "../components/IconBadge";

/**
 * Portal settings — a real, working settings page (not a placeholder).
 * Admin-account fields here share the same App-level state as the Profile
 * page, so editing a name/email/phone in either place updates both.
 * Toggles here actually change behaviour elsewhere in the app:
 *  - Email notifications  -> mirrored on the Profile "Preferences" card
 *  - Auto-assign suggestions -> Complaints tab sorts the technician picker by rating
 *  - Compact docket view  -> Complaints tab renders tighter ticket cards
 */
export default function SettingsTab({ admin, onUpdateAdmin, settings, onUpdateSettings }) {
  const [draft, setDraft] = useState(admin);
  const [saved, setSaved] = useState(false);

  const set = (key) => (e) => setDraft((f) => ({ ...f, [key]: e.target.value }));

  const saveAccount = () => {
    onUpdateAdmin(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  const resetAccount = () => {
    setDraft(DEFAULT_ADMIN);
    onUpdateAdmin(DEFAULT_ADMIN);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Admin account — shared with Profile page */}
      <div className="card">
        <div className="card-title-row">
          <div className="card-title" style={{ marginBottom: 0 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <IconBadge icon={User} color={C.gold} bg={C.goldTint} size={26} />
              Admin account
            </span>
          </div>
          {saved && (
            <span className="link-action" style={{ color: C.success }}>
              <CheckCircle2 size={14} /> Saved — updated on Profile too
            </span>
          )}
        </div>

        <div className="settings-field-grid">
          <div className="profile-field">
            <label>Full name</label>
            <input className="profile-input" value={draft.name} onChange={set("name")} />
          </div>
          <div className="profile-field">
            <label>Role</label>
            <input className="profile-input" value={draft.role} onChange={set("role")} />
          </div>
          <div className="profile-field">
            <label>Email</label>
            <input className="profile-input" value={draft.email} onChange={set("email")} />
          </div>
          <div className="profile-field">
            <label>Phone</label>
            <input className="profile-input" value={draft.phone} onChange={set("phone")} />
          </div>
          <div className="profile-field" style={{ gridColumn: "1 / -1" }}>
            <label>Department</label>
            <input className="profile-input" value={draft.department} onChange={set("department")} />
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <button className="assign-btn" onClick={saveAccount}>
            <Save size={14} /> Save account
          </button>
          <button className="filter-btn" onClick={resetAccount}>
            <RotateCcw size={13} /> Reset to default
          </button>
        </div>
      </div>

      {/* Portal preferences — actually change other modules */}
      <div className="card">
        <div className="card-title">Portal preferences</div>

        <div className="profile-setting-row">
          <div className="profile-setting-label">
            <IconBadge icon={Bell} color={C.info} bg={C.infoBg} size={30} />
            <div>
              <div className="profile-setting-title">Email notifications</div>
              <div className="profile-setting-sub">Get emailed whenever a new complaint is filed</div>
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

        <div className="profile-setting-row">
          <div className="profile-setting-label">
            <IconBadge icon={Wand2} color={C.gold} bg={C.goldTint} size={30} />
            <div>
              <div className="profile-setting-title">Auto-assign suggestions</div>
              <div className="profile-setting-sub">Sort the technician picker by rating instead of A–Z</div>
            </div>
          </div>
          <label className="profile-toggle">
            <input
              type="checkbox"
              checked={settings.autoAssignSuggestions}
              onChange={(e) => onUpdateSettings({ autoAssignSuggestions: e.target.checked })}
            />
            <span className="profile-toggle-slider" />
          </label>
        </div>

        <div className="profile-setting-row" style={{ borderBottom: "none" }}>
          <div className="profile-setting-label">
            <IconBadge icon={Rows3} color={C.slate} bg="#efe9db" size={30} />
            <div>
              <div className="profile-setting-title">Compact docket view</div>
              <div className="profile-setting-sub">Tighter spacing on the Complaints list</div>
            </div>
          </div>
          <label className="profile-toggle">
            <input
              type="checkbox"
              checked={settings.compactDocketView}
              onChange={(e) => onUpdateSettings({ compactDocketView: e.target.checked })}
            />
            <span className="profile-toggle-slider" />
          </label>
        </div>

        <div className="profile-hint">
          These change the app live — try flipping <b>Compact docket view</b> and check the Complaints tab.
        </div>
      </div>
    </div>
  );
}
