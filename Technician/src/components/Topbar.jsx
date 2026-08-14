import React from "react";

export default function Topbar({ onMenuClick, technicianName = "Ramesh Patel" }) {
  const initials = technicianName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="topbar">
      <div className="d-flex align-items-center gap-3">
        <button className="mobile-toggle" onClick={onMenuClick} aria-label="Open menu">
          <i className="bi bi-list fs-5"></i>
        </button>
        <div>
          <p className="page-title mb-0">Technician Dashboard</p>
          <span className="page-sub">TODAY · {new Date().toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short" })}</span>
        </div>
      </div>

      <div className="d-flex align-items-center gap-2 gap-md-3">
        <button className="icon-btn" aria-label="Notifications">
          <i className="bi bi-bell-fill"></i>
          <span className="dot"></span>
        </button>
        <div className="d-none d-sm-flex flex-column text-end me-1">
          <span className="fw-semibold" style={{ fontSize: "0.85rem" }}>
            {technicianName}
          </span>
          <span className="text-secondary" style={{ fontSize: "0.72rem" }}>
            Electrical &amp; Network
          </span>
        </div>
        <div className="avatar">{initials}</div>
      </div>
    </header>
  );
}
