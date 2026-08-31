import React, { useMemo, useState } from "react";
import { Search, Bell, Menu, User } from "lucide-react";
import { NAV_ITEMS } from "./Sidebar";

const SEARCHABLE = [...NAV_ITEMS.map((n) => ({ key: n.key, label: n.label })), { key: "profile", label: "Profile" }];

/** Navy top bar: page title/subtitle, global nav search, notification bell, profile icon. */
export default function Topbar({ search, onSearch, title, subtitle, onMenuClick, onProfileClick, profileActive, admin, onNavigate }) {
  const [focused, setFocused] = useState(false);

  const matches = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];
    return SEARCHABLE.filter((item) => item.label.toLowerCase().includes(q) || item.key.includes(q));
  }, [search]);

  const showDropdown = focused && search.trim().length > 0;

  const go = (key) => {
    onNavigate?.(key);
    setFocused(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && matches.length > 0) {
      go(matches[0].key);
    } else if (e.key === "Escape") {
      setFocused(false);
    }
  };

  return (
    <div className="topbar">
      <button className="topbar-menu-btn" onClick={onMenuClick} aria-label="Open menu">
        <Menu size={22} />
      </button>

      <div className="topbar-title-group">
        <div>
          <div className="topbar-title">{title}</div>
          <div className="topbar-subtitle">{subtitle}</div>
        </div>
      </div>

      <div className="topbar-actions">
        <div className="search-box">
          <Search size={15} color="#8b93a5" />
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 120)}
            onKeyDown={handleKeyDown}
            placeholder="Go to Overview, Complaints, Settings…"
          />
          {showDropdown && (
            <div className="search-dropdown">
              {matches.length === 0 && (
                <div className="search-dropdown-empty">No matching page. Try “Overview”, “Complaints”…</div>
              )}
              {matches.map((m) => (
                <div key={m.key} className="search-dropdown-item" onMouseDown={() => go(m.key)}>
                  {m.label}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="bell">
          <Bell size={19} color="#c7cdd9" />
          <div className="bell-dot" />
        </div>
        <button
          className={`topbar-profile-btn${profileActive ? " active" : ""}`}
          onClick={onProfileClick}
          aria-label="Open profile"
          title={admin?.name || "Profile"}
        >
          <User size={17} strokeWidth={2.3} />
        </button>
      </div>
    </div>
  );
}
