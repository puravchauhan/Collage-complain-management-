import React from "react";
import IconBadge from "./IconBadge";

/** Summary metric card with a left accent stripe (Total, Pending, etc). */
export default function StatCard({ label, value, sub, icon, accent }) {
  return (
    <div className="stat-card">
      <div className="stat-card-accent" style={{ background: accent }} />
      <div className="stat-card-head">
        <span className="stat-card-label">{label}</span>
        <IconBadge icon={icon} color={accent} bg={accent + "1a"} size={30} />
      </div>
      <div className="stat-card-value">{value}</div>
      {sub && <div className="stat-card-sub">{sub}</div>}
    </div>
  );
}
