import React from "react";

export default function Profile({ technician }) {
  return (
    <div className="ticket-panel">
      <div className="panel-head">
        <h2>My Profile</h2>
      </div>

      <div className="card p-4" style={{ maxWidth: "600px" }}>
        <div className="text-center mb-4">
          <i className="bi bi-person-circle"
            style={{ fontSize: "65px" }}></i>

          <h4>{technician?.name || "Technician"}</h4>
          <span className="badge bg-success">Approved</span>
        </div>

        <hr />

        <p><strong>Technician ID:</strong> {technician?.technicianId}</p>
        <p><strong>Name:</strong> {technician?.name}</p>
        <p><strong>Email:</strong> {technician?.email}</p>
        <p><strong>Phone:</strong> {technician?.phone}</p>
      </div>
    </div>
  );
}