import React from "react";
import {
  LayoutDashboard, ClipboardList, Wrench, Users, BarChart3, Settings,
  TicketCheck, LogOut, X,
} from "lucide-react";

export const NAV_ITEMS = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "complaints", label: "Complaints", icon: ClipboardList },
  { key: "technicians", label: "Technicians", icon: Wrench },
  { key: "students", label: "Students", icon: Users },
  { key: "reports", label: "Reports", icon: BarChart3 },
  { key: "settings", label: "Settings", icon: Settings },
];

/** Navy sidebar. Slides in as an overlay drawer on mobile via the "open" class. */
export default function Sidebar({ active, onSelect, isOpen, onClose }) {
  return (
    <div className={`sidebar${isOpen ? " open" : ""}`}>
      <div className="sidebar-brand">
        <div className="sidebar-logo">
          <TicketCheck size={19} color="#0f1620" strokeWidth={2.3} />
        </div>
        <div>
          <div className="sidebar-title">CCMP</div>
          <div className="sidebar-subtitle">ADMIN CONSOLE</div>
        </div>
        <button className="sidebar-close" onClick={onClose} aria-label="Close menu">
          <X size={20} />
        </button>
      </div>

      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.key}
            className={`nav-item${active === item.key ? " active" : ""}`}
            onClick={() => {
              onSelect(item.key);
              onClose();
            }}
          >
            <Icon size={17} strokeWidth={2} />
            <span>{item.label}</span>
          </div>
        );
      })}

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="avatar">AD</div>
          <div>
            <div className="sidebar-user-name">Admin Desai</div>
            <div className="sidebar-user-role">Super Admin</div>
          </div>
          <LogOut size={15} color="#8b93a5" style={{ marginLeft: "auto" }} />
        </div>
      </div>
    </div>
  );
}
