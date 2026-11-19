import React, { useState } from "react";

export default function UpdateStatus({ jobs = [], onUpdateStatus }) {
  const [updating, setUpdating] = useState(null);
  const [error, setError] = useState("");

  const update = async (job) => {
    const nextStatus =
      job.status === "Assigned" ? "In Progress" :
      job.status === "In Progress" ? "Resolved" : null;

    if (!nextStatus) return;

    try {
      setUpdating(job.id);
      setError("");

      await onUpdateStatus(job.id, nextStatus);
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdating(null);
    }
  };

  const activeJobs = jobs.filter(
    j => j.status === "Assigned" || j.status === "In Progress"
  );

  return (
    <div className="ticket-panel">
      <div className="panel-head">
        <h2>Update Status</h2>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {activeJobs.length === 0 ? (
        <div className="empty-state">
          No complaints waiting for updates.
        </div>
      ) : (
        activeJobs.map(job => (
          <div className="card p-3 mb-3" key={job.id}>
            <h5>{job.title || job.problem}</h5>
            <p>{job.location}</p>
            <p>Current Status: <strong>{job.status}</strong></p>

            <button
              className="btn btn-primary"
              disabled={updating !== null}
              onClick={() => update(job)}
            >
              {updating === job.id
                ? "Updating..."
                : job.status === "Assigned"
                  ? "Start Work"
                  : "Mark Resolved"}
            </button>
          </div>
        ))
      )}
    </div>
  );
}