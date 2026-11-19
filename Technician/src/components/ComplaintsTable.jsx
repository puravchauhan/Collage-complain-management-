import React, { useState } from "react";

const CATEGORY_ICON = {
  Network: "bi-wifi",
  Plumbing: "bi-droplet-fill",
  Electrical: "bi-lightning-charge-fill",
  Furniture: "bi-tools",
  Equipment: "bi-cpu-fill",
  "Wi-Fi & Internet": "bi-wifi",
  "Water & Plumbing": "bi-droplet-fill",
  Electricity: "bi-lightning-charge-fill",
};

const STATUS_CLASS = {
  Pending: "pending",
  "In Progress": "progress",
  Assigned: "assigned",
  Resolved: "done",
  Done: "done",
};

const PRIORITY_CLASS = {
  High: "priority-high",
  Medium: "priority-medium",
  Low: "priority-low",
};

export default function ComplaintsTable({
  jobs = [],
  onUpdateStatus,
}) {
  const [updatingId, setUpdatingId] = useState(null);

  const getNextStatus = (status) => {
    if (status === "Assigned") return "In Progress";
    if (status === "In Progress") return "Resolved";
    return null;
  };

  const handleUpdate = async (job) => {
    const nextStatus = getNextStatus(job.status);

    if (!nextStatus || updatingId !== null) return;

    try {
      setUpdatingId(job.id);

      await onUpdateStatus(job.id, nextStatus);
    } finally {
      setUpdatingId(null);
    }
  };

  const getButtonText = (status) => {
    if (status === "Assigned") return "Start Work";
    if (status === "In Progress") return "Mark Resolved";
    if (status === "Resolved") return "Completed";
    return "Waiting";
  };

  return (
    <div className="ticket-panel">
      <div className="panel-head">
        <h2>Assigned Complaints</h2>

        <span
          className="text-secondary"
          style={{ fontSize: "0.8rem" }}
        >
          {jobs.length} work orders
        </span>
      </div>

      {/* Desktop / tablet table header */}
      <div className="ticket-head-row">
        <div className="cell"></div>
        <div className="cell">Job ID</div>
        <div className="cell">Complaint</div>
        <div className="cell">Category</div>
        <div className="cell">Priority</div>
        <div className="cell">Status</div>
        <div className="cell">Action</div>
      </div>

      {jobs.length === 0 && (
        <div className="empty-state">
          No complaints assigned to you yet.
        </div>
      )}

      {jobs.map((job) => {
        const nextStatus = getNextStatus(job.status);
        const isUpdating = updatingId === job.id;

        return (
          <React.Fragment key={job.id}>
            {/* Desktop row */}
            <div className="ticket-row">
              <div
                className={`stripe ${
                  PRIORITY_CLASS[job.priority] || ""
                }`}
              ></div>

              <div className="cell job-id">
                #{job.id}
              </div>

              <div className="cell">
                <div className="job-title">
                  {job.title}
                </div>

                <div className="job-meta">
                  {job.location}
                </div>
              </div>

              <div className="cell">
                <span className="badge-cat">
                  <i
                    className={`bi ${
                      CATEGORY_ICON[job.category] || "bi-tag-fill"
                    }`}
                  ></i>
                  {job.category}
                </span>
              </div>

              <div className="cell">
                <span
                  style={{
                    color: priorityColor(job.priority),
                    fontWeight: 600,
                    fontSize: "0.82rem",
                  }}
                >
                  {job.priority}
                </span>
              </div>

              <div className="cell">
                <span
                  className={`badge-status ${
                    STATUS_CLASS[job.status] || "pending"
                  }`}
                >
                  <i
                    className="bi bi-circle-fill"
                    style={{ fontSize: "0.5rem" }}
                  ></i>
                  {job.status}
                </span>
              </div>

              <div className="cell">
                <button
                  type="button"
                  className="btn-ticket"
                  disabled={!nextStatus || isUpdating || updatingId !== null}
                  onClick={() => handleUpdate(job)}
                >
                  <i className="bi bi-arrow-clockwise me-1"></i>
                  {isUpdating
                    ? "Updating..."
                    : getButtonText(job.status)}
                </button>
              </div>
            </div>

            {/* Mobile card */}
            <div
              className={`ticket-card ${
                PRIORITY_CLASS[job.priority] || ""
              }`}
            >
              <div className="d-flex justify-content-between align-items-start mb-1">
                <span className="job-id">
                  #{job.id}
                </span>

                <span
                  className={`badge-status ${
                    STATUS_CLASS[job.status] || "pending"
                  }`}
                >
                  {job.status}
                </span>
              </div>

              <div className="job-title">
                {job.title}
              </div>

              <div className="job-meta mb-2">
                {job.location}
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <span className="badge-cat">
                  <i
                    className={`bi ${
                      CATEGORY_ICON[job.category] || "bi-tag-fill"
                    }`}
                  ></i>
                  {job.category}
                </span>

                <button
                  type="button"
                  className="btn-ticket"
                  disabled={!nextStatus || isUpdating || updatingId !== null}
                  onClick={() => handleUpdate(job)}
                >
                  <i className="bi bi-arrow-clockwise me-1"></i>
                  {isUpdating
                    ? "Updating..."
                    : getButtonText(job.status)}
                </button>
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

function priorityColor(priority) {
  if (priority === "High") return "#e0762f";
  if (priority === "Medium") return "#d98f1f";
  return "#2f9e77";
}