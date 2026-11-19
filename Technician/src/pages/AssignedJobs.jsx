import React from "react";

export default function AssignedJobs({ jobs = [] }) {
  return (
    <div className="ticket-panel">
      <div className="panel-head">
        <h2>Assigned Jobs</h2>
        <span>{jobs.length} work orders</span>
      </div>

      {jobs.length === 0 ? (
        <div className="empty-state">
          No complaints assigned to you yet.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Job ID</th>
                <th>Complaint</th>
                <th>Category</th>
                <th>Location</th>
                <th>Priority</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {jobs.map(job => (
                <tr key={job.id}>
                  <td>{job.id}</td>
                  <td>{job.title || job.problem}</td>
                  <td>{job.category}</td>
                  <td>{job.location}</td>
                  <td>{job.priority}</td>
                  <td>
                    <span className="badge bg-secondary">
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}