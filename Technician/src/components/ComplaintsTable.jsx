import React, { useState } from "react";

const CATEGORY_ICON = {
  Network: "bi-wifi",
  Plumbing: "bi-droplet-fill",
  Electrical: "bi-lightning-charge-fill",
  Furniture: "bi-tools",
  Equipment: "bi-cpu-fill",
};

const STATUS_CLASS = {
  Pending: "pending",
  "In Progress": "progress",
  Assigned: "assigned",
  Done: "done",
};

const PRIORITY_CLASS = {
  High: "priority-high",
  Medium: "priority-medium",
  Low: "priority-low",
};

const STATUS_CYCLE = ["Assigned", "Pending", "In Progress", "Done"];

export default function ComplaintsTable({ initialJobs }) {
  const [jobs, setJobs] = useState(initialJobs);

  const advanceStatus = (id) => {
    setJobs((prev) =>
      prev.map((job) => {
        if (job.id !== id) return job;
        const idx = STATUS_CYCLE.indexOf(job.status);
        const next = STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length];
        return { ...job, status: next };
      })
    );
  };

  return (
    <div className="ticket-panel">
      <div className="panel-head">
        <h2>Assigned Complaints</h2>
        <span className="text-secondary" style={{ fontSize: "0.8rem" }}>
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

      {jobs.map((job) => (
        <React.Fragment key={job.id}>
          {/* Desktop row */}
          <div className="ticket-row">
            <div className={`stripe ${PRIORITY_CLASS[job.priority]}`}></div>
            <div className="cell job-id">#{job.id}</div>
            <div className="cell">
              <div className="job-title">{job.title}</div>
              <div className="job-meta">{job.location}</div>
            </div>
            <div className="cell">
              <span className="badge-cat">
                <i className={`bi ${CATEGORY_ICON[job.category] || "bi-tag-fill"}`}></i>
                {job.category}
              </span>
            </div>
            <div className="cell">
              <span style={{ color: priorityColor(job.priority), fontWeight: 600, fontSize: "0.82rem" }}>
                {job.priority}
              </span>
            </div>
            <div className="cell">
              <span className={`badge-status ${STATUS_CLASS[job.status]}`}>
                <i className="bi bi-circle-fill" style={{ fontSize: "0.5rem" }}></i>
                {job.status}
              </span>
            </div>
            <div className="cell">
              <button className="btn-ticket" onClick={() => advanceStatus(job.id)}>
                <i className="bi bi-arrow-clockwise me-1"></i>
                Update
              </button>
            </div>
          </div>

          {/* Mobile card */}
          <div className={`ticket-card ${PRIORITY_CLASS[job.priority]}`}>
            <div className="d-flex justify-content-between align-items-start mb-1">
              <span className="job-id">#{job.id}</span>
              <span className={`badge-status ${STATUS_CLASS[job.status]}`}>{job.status}</span>
            </div>
            <div className="job-title">{job.title}</div>
            <div className="job-meta mb-2">{job.location}</div>
            <div className="d-flex justify-content-between align-items-center">
              <span className="badge-cat">
                <i className={`bi ${CATEGORY_ICON[job.category] || "bi-tag-fill"}`}></i>
                {job.category}
              </span>
              <button className="btn-ticket" onClick={() => advanceStatus(job.id)}>
                <i className="bi bi-arrow-clockwise me-1"></i>
                Update
              </button>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

function priorityColor(priority) {
  if (priority === "High") return "#e0762f";
  if (priority === "Medium") return "#d98f1f";
  return "#2f9e77";
}
