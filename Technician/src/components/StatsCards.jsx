import React from "react";

const STATS = [
  {
    key: "pending",
    label: "Pending",
    icon: "bi-hourglass-split",
    bg: "#fdf0e3",
    fg: "#e0762f",
    trendIcon: "bi-arrow-up-short",
    trend: "+2 today",
  },
  {
    key: "working",
    label: "In Progress",
    icon: "bi-tools",
    bg: "#fef3da",
    fg: "#d98f1f",
    trendIcon: "bi-dash",
    trend: "steady",
  },
  {
    key: "done",
    label: "Completed",
    icon: "bi-check2-circle",
    bg: "#e4f5ee",
    fg: "#2f9e77",
    trendIcon: "bi-arrow-up-short",
    trend: "+5 this week",
  },
  {
    key: "total",
    label: "Total Assigned",
    icon: "bi-clipboard2-data-fill",
    bg: "#e7edf7",
    fg: "#24507f",
    trendIcon: "bi-graph-up",
    trend: "this month",
  },
];

export default function StatsCards({ counts }) {
  return (
    <div className="row g-3 mb-4">
      {STATS.map((s) => (
        <div className="col-6 col-lg-3" key={s.key}>
          <div className="stat-card">
            <span
              className="stat-icon"
              style={{ background: s.bg, color: s.fg }}
            >
              <i className={`bi ${s.icon}`}></i>
            </span>
            <div>
              <div className="stat-value">{counts[s.key]}</div>
              <div className="stat-label">{s.label}</div>
            </div>
            <div className="stat-trend" style={{ color: s.fg }}>
              <i className={`bi ${s.trendIcon}`}></i> {s.trend}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
