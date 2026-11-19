import React from "react";
import {
  Clock,
  UserPlus,
  ClipboardList,
} from "lucide-react";

import {
  CATEGORY_META,
  STATUS_META,
  PRIORITY_META,
} from "../data/mockData";

import IconBadge from "./IconBadge";
import Pill from "./Pill";

export default function ComplaintDocket({
  c,
  onAssignClick,
  assignOpenId,
  onAssign,
  approvedTechnicians = [],
  autoAssignSuggestions,
}) {
  if (!c) return null;

  const categoryName = c.category || "Other Issues";
  const statusName = c.status || "Pending";
  const priorityName = c.priority || "Medium";

  const cat =
    CATEGORY_META[categoryName] ||
    CATEGORY_META["Other Issues"] ||
    {
      icon: ClipboardList,
      color: "#16232F",
      bg: "#EEF0EC",
    };

  const status =
    STATUS_META[statusName] ||
    STATUS_META["Pending"] ||
    {
      color: "#64748b",
      bg: "#EEF0EC",
    };

  const priority =
    PRIORITY_META[priorityName] ||
    PRIORITY_META["Medium"] ||
    {
      color: "#64748b",
      bg: "#EEF0EC",
    };

  const complaintTitle =
    c.title || c.problem || "Untitled complaint";

  const complaintDescription =
    c.desc || c.description || "No description provided.";

  const complaintLocation =
    c.location || "Location not specified";

  const complaintStudent =
    c.student ||
    (c.userId ? `User ${c.userId}` : "Student");

  const complaintDate = (() => {
    if (!c.date) return "Date unavailable";

    const date = new Date(c.date);

    if (Number.isNaN(date.getTime())) {
      return String(c.date);
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  })();

  // Find assigned technician from approved database list
  const assignedId = c.technicianId ?? c.technician;

  const tech = approvedTechnicians.find(
    (technician) =>
      String(technician.technicianId) === String(assignedId)
  );

  const isAssignOpen = assignOpenId === c.id;

  // Only approved technicians are shown
  const techChoices = [...approvedTechnicians];

  return (
    <div className="docket">

      {/* Complaint ticket stub */}
      <div className="docket-stub">
        <IconBadge
          icon={cat.icon || ClipboardList}
          color={cat.color || "#16232F"}
          bg={cat.bg || "#EEF0EC"}
        />

        <div>
          <div className="docket-id">
            {c.id != null ? `CMP-${c.id}` : "CMP-NEW"}
          </div>

          <div className="docket-category">
            {categoryName}
          </div>
        </div>
      </div>

      {/* Perforation */}
      <div className="docket-perf" />

      {/* Complaint details */}
      <div className="docket-body">
        <div className="docket-head">
          <div>
            <div className="docket-title">
              {complaintTitle}
            </div>

            <div className="docket-location">
              {complaintLocation}
            </div>
          </div>

          <div className="docket-tags">
            <Pill
              color={priority.color || "#64748b"}
              bg={priority.bg || "#EEF0EC"}
            >
              {priorityName}
            </Pill>

            <Pill
              color={status.color || "#64748b"}
              bg={status.bg || "#EEF0EC"}
            >
              {statusName}
            </Pill>
          </div>
        </div>

        <div className="docket-desc">
          {complaintDescription}
        </div>

        {/* Footer */}
        <div className="docket-footer">
          <div className="docket-meta">
            <span>
              Filed by{" "}
              <b
                style={{
                  color: "var(--ink)",
                  fontWeight: 600,
                }}
              >
                {complaintStudent}
              </b>
            </span>

            <span className="docket-meta-date">
              <Clock size={13} />
              {complaintDate}
            </span>
          </div>

          {/* Technician assignment */}
          <div style={{ position: "relative" }}>

            {tech ? (
              <span className="docket-tech">
                <span className="docket-tech-avatar">
                  {(tech.name || "T")
                    .split(" ")
                    .map((name) => name[0])
                    .join("")}
                </span>

                {tech.name}
              </span>
            ) : (
              <button
                type="button"
                className="assign-btn"
                onClick={() => onAssignClick?.(c.id)}
              >
                <UserPlus size={14} />
                Assign technician
              </button>
            )}

            {/* Dynamic technician dropdown */}
            {isAssignOpen && (
              <div className="assign-menu">

                <div className="assign-menu-title">
                  {autoAssignSuggestions
                    ? "Approved technicians"
                    : "Choose technician"}
                </div>

                {techChoices.length === 0 ? (
                  <div className="assign-menu-item">
                    No approved technicians available.
                  </div>
                ) : (
                  techChoices.map((technician) => (
                    <div
                      key={technician.technicianId}
                      className="assign-menu-item"
                      role="button"
                      tabIndex={0}
                      onClick={() =>
                        onAssign?.(
                          c.id,
                          technician.technicianId
                        )
                      }
                      onKeyDown={(event) => {
                        if (
                          event.key === "Enter" ||
                          event.key === " "
                        ) {
                          event.preventDefault();

                          onAssign?.(
                            c.id,
                            technician.technicianId
                          );
                        }
                      }}
                    >
                      <div>
                        <div className="assign-menu-item-name">
                          {technician.name}
                        </div>

                        <div className="assign-menu-item-sub">
                          {technician.email}
                        </div>

                        <div className="assign-menu-item-sub">
                          {technician.phone}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}