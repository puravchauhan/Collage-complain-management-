import React from "react";

export default function TodaysJobs({ jobs = [] }) {
  return (
    <div className="ticket-panel">
      <div className="panel-head">
        <h2>Today's Jobs</h2>
        <span>{jobs.length} jobs</span>
      </div>

      {jobs.length === 0 ? (
        <div className="empty-state">
          No complaints assigned today.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Job ID</th>
                <th>Complaint</th>
                <th>Location</th>
                <th>Priority</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => (
                <tr key={job.id}>
                  <td>#{job.id}</td>
                  <td>{job.title || job.problem}</td>
                  <td>{job.location}</td>
                  <td>{job.priority}</td>
                  <td>{job.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}