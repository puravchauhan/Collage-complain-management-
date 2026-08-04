import React from "react";
import { Search, Bell, Menu } from "lucide-react";

/** Navy top bar: page title/subtitle, global search, notification bell. */
export default function Topbar({ search, onSearch, title, subtitle, onMenuClick }) {
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
            placeholder="Search complaints, students, tickets…"
          />
        </div>
        <div className="bell">
          <Bell size={19} color="#c7cdd9" />
          <div className="bell-dot" />
        </div>
      </div>
    </div>
  );
}
