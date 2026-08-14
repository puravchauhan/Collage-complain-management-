import React from "react";

const NAV_ITEMS = [
  { icon: "bi-grid-1x2-fill", label: "Dashboard", key: "dashboard" },
  { icon: "bi-clipboard2-check-fill", label: "Assigned Jobs", key: "jobs" },
  { icon: "bi-arrow-repeat", label: "Update Status", key: "update" },
  { icon: "bi-calendar2-week-fill", label: "Today's Jobs", key: "today" },
  { icon: "bi-person-circle", label: "Profile", key: "profile" },
];

export default function Sidebar({ open, onClose, active, onNavigate }) {
  return (
    <>
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-brand">
          <div className="mark">CM</div>
          <div>
            <div className="name">Campus Maintenance</div>
            <div className="role">Technician Panel</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href="#"
              className={`nav-link ${active === item.key ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.key);
                onClose();
              }}
            >
              <i className={`bi ${item.icon}`}></i>
              <span>{item.label}</span>
            </a>
          ))}

          <a
            href="#"
            className="nav-link"
            onClick={(e) => e.preventDefault()}
          >
            <i className="bi bi-box-arrow-right"></i>
            <span>Logout</span>
          </a>
        </nav>

        <div className="sidebar-foot">
          Work Order System v1.0
          <br />
          &copy; College Maintenance Portal
        </div>
      </aside>

      {/* backdrop for mobile */}
      <div
        className={`sidebar-backdrop ${open ? "show" : ""}`}
        onClick={onClose}
      ></div>
    </>
  );
}
