import React, { useEffect, useState } from "react";
import { TECHNICIANS } from "../data/mockData";
import Pill from "../components/Pill";
import { C } from "../theme/tokens";

const API = "https://localhost:7277/api/Technician";

export default function TechniciansTab({ complaints }) {
  const [pendingTechnicians, setPendingTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Load pending technician registrations
  const fetchPendingTechnicians = async () => {
    try {
      const response = await fetch(`${API}/pending`);

      if (!response.ok) {
        throw new Error("Failed to load pending technicians.");
      }

      const data = await response.json();
      setPendingTechnicians(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingTechnicians();
  }, []);

  // Approve technician
  const handleApprove = async (id) => {
    try {
      setMessage("");

      const response = await fetch(`${API}/approve/${id}`, {
        method: "PUT"
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Approval failed.");
      }

      setPendingTechnicians((previous) =>
        previous.filter((t) => t.technicianId !== id)
      );

      setMessage("Technician approved successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Pending Technician Approvals */}
      <div className="card">
        <div className="tech-card-head">
          <div style={{ flex: 1 }}>
            <div className="tech-name">
              Pending Technician Approvals
            </div>
            <div className="tech-sub">
              Review and approve new technician registrations
            </div>
          </div>

          <Pill color={C.warning} bg={C.warningBg}>
            {pendingTechnicians.length} Pending
          </Pill>
        </div>

        {loading && <p>Loading technician requests...</p>}

        {error && (
          <p style={{ color: "red" }}>{error}</p>
        )}

        {message && (
          <p style={{ color: "green" }}>{message}</p>
        )}

        {!loading && pendingTechnicians.length === 0 && (
          <p>No pending technician registrations.</p>
        )}

        {pendingTechnicians.map((tech) => (
          <div
            key={tech.technicianId}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 20,
              padding: "15px 0",
              borderTop: "1px solid #ddd",
              flexWrap: "wrap"
            
            }}
          >
            <div>
 <div className="tech-name" style={{ fontSize: "18px", marginBottom: "12px" }}>
  {tech.name}
</div>

<div className="tech-sub" style={{ fontSize: "15px", marginBottom: "8px" }}>
  {tech.email}
</div>

<div className="tech-sub" style={{ fontSize: "15px" }}>
  {tech.phone}
</div>
</div>
            <button
              type="button"
              onClick={() => handleApprove(tech.technicianId)}
              style={{
                background: C.success,
                color: "#fff",
                border: "none",
                padding: "9px 18px",
                borderRadius: 6,
                cursor: "pointer"
              }}
            >
              Approve
            </button>
          </div>
        ))}
      </div>

      {/* Existing Technician Cards - Unchanged */}
      <div className="tech-grid">
        {TECHNICIANS.map((t) => {
          const assigned = complaints.filter(
            (c) => c.technician === t.id
          );

          const resolved = assigned.filter(
            (c) => c.status === "Resolved"
          ).length;

          return (
            <div key={t.id} className="card">
              <div className="tech-card-head">
                <div className="tech-avatar">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>

                <div style={{ flex: 1 }}>
                  <div className="tech-name">{t.name}</div>
                  <div className="tech-sub">
                    {t.specialty} specialist · {t.id}
                  </div>
                </div>

                <Pill color={C.success} bg={C.successBg}>
                  ★ {t.rating}
                </Pill>
              </div>

              <div className="tech-stats">
                <div className="tech-stat">
                  <div className="tech-stat-value">
                    {assigned.length}
                  </div>
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

    </div>
  );
}