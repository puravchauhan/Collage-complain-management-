import React from "react";
import { TECHNICIANS } from "../data/mockData";
import Pill from "../components/Pill";
import { C } from "../theme/tokens";

export default function TechniciansTab({ complaints }) {
  return (
    <div className="tech-grid">
      {TECHNICIANS.map((t) => {
        const assigned = complaints.filter((c) => c.technician === t.id);
        const resolved = assigned.filter((c) => c.status === "Resolved").length;
        return (
          <div key={t.id} className="card">
            <div className="tech-card-head">
              <div className="tech-avatar">{t.name.split(" ").map((n) => n[0]).join("")}</div>
              <div style={{ flex: 1 }}>
                <div className="tech-name">{t.name}</div>
                <div className="tech-sub">{t.specialty} specialist · {t.id}</div>
              </div>
              <Pill color={C.success} bg={C.successBg}>★ {t.rating}</Pill>
            </div>
            <div className="tech-stats">
              <div className="tech-stat">
                <div className="tech-stat-value">{assigned.length}</div>
                <div className="tech-stat-label">Assigned</div>
              </div>
              <div className="tech-stat">
                <div className="tech-stat-value">{t.active}</div>
                <div className="tech-stat-label">Active</div>
              </div>
              <div className="tech-stat">
                <div className="tech-stat-value">{resolved}</div>
                <div className="tech-stat-label">Resolved</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
