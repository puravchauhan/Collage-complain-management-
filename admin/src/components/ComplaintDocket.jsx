import React from "react";
import { Clock, UserPlus } from "lucide-react";
import { CATEGORY_META, STATUS_META, PRIORITY_META, TECHNICIANS } from "../data/mockData";
import IconBadge from "./IconBadge";
import Pill from "./Pill";

/**
 * Signature element: renders a complaint as a work-order "docket" - a ticket
 * stub with a dashed perforation, echoing a physical maintenance slip.
 * On small screens the perforation is hidden and the stub/body stack instead.
 */
export default function ComplaintDocket({ c, onAssignClick, assignOpenId, onAssign }) {
  const cat = CATEGORY_META[c.category];
  const status = STATUS_META[c.status];
  const priority = PRIORITY_META[c.priority];
  const tech = TECHNICIANS.find((t) => t.id === c.technician);
  const isAssignOpen = assignOpenId === c.id;

  return (
    <div className="docket">
      <div className="docket-stub">
        <IconBadge icon={cat.icon} color={cat.color} bg={cat.bg} />
        <div>
          <div className="docket-id">{c.id}</div>
          <div className="docket-category">{c.category}</div>
        </div>
      </div>

      <div className="docket-perf" />

      <div className="docket-body">
        <div className="docket-head">
          <div>
            <div className="docket-title">{c.title}</div>
            <div className="docket-location">{c.location}</div>
          </div>
          <div className="docket-tags">
            <Pill color={priority.color} bg={priority.bg}>{c.priority}</Pill>
            <Pill color={status.color} bg={status.bg}>{c.status}</Pill>
          </div>
        </div>

        <div className="docket-desc">{c.desc}</div>

        <div className="docket-footer">
          <div className="docket-meta">
            <span>Filed by <b style={{ color: "var(--ink)", fontWeight: 600 }}>{c.student}</b></span>
            <span className="docket-meta-date"><Clock size={13} /> {c.date}</span>
          </div>

          <div style={{ position: "relative" }}>
            {tech ? (
              <span className="docket-tech">
                <span className="docket-tech-avatar">
                  {tech.name.split(" ").map((n) => n[0]).join("")}
                </span>
                {tech.name}
              </span>
            ) : (
              <button className="assign-btn" onClick={() => onAssignClick(c.id)}>
                <UserPlus size={14} /> Assign technician
              </button>
            )}

            {isAssignOpen && (
              <div className="assign-menu">
                <div className="assign-menu-title">Choose technician</div>
                {TECHNICIANS.map((t) => (
                  <div key={t.id} className="assign-menu-item" onClick={() => onAssign(c.id, t.id)}>
                    <div>
                      <div className="assign-menu-item-name">{t.name}</div>
                      <div className="assign-menu-item-sub">{t.specialty} · {t.active} active</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
