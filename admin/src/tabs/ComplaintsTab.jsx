import React, { useEffect, useState } from "react";
import { Filter } from "lucide-react";
import { STATUS_ORDER } from "../data/mockData";
import ComplaintDocket from "../components/ComplaintDocket";

const API = "https://localhost:7277/api/Technician";

export default function ComplaintsTab({
  complaints,
  onAssign,
  settings
}) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [assignOpenId, setAssignOpenId] = useState(null);

  // Approved technician states
  const [approvedTechnicians, setApprovedTechnicians] = useState([]);
  const [loadingTechnicians, setLoadingTechnicians] = useState(true);
  const [technicianError, setTechnicianError] = useState("");

  // Fetch approved technicians from database
  useEffect(() => {
    const fetchApprovedTechnicians = async () => {
      try {
        const response = await fetch(`${API}/approved`);

        if (!response.ok) {
          throw new Error("Failed to load approved technicians.");
        }

        const data = await response.json();

        setApprovedTechnicians(data);
        setTechnicianError("");
      } catch (error) {
        setTechnicianError(error.message);
      } finally {
        setLoadingTechnicians(false);
      }
    };

    fetchApprovedTechnicians();
  }, []);

  // Filter complaints
  const filtered = complaints.filter((c) => {
    const matchesFilter =
      filter === "All" || c.status === filter;

    const q = search.toLowerCase();

    const matchesSearch =
      !q ||
      (c.title || c.problem || "").toLowerCase().includes(q) ||
      String(c.id || "").toLowerCase().includes(q) ||
      (c.student || "").toLowerCase().includes(q);

    return matchesFilter && matchesSearch;
  });

  // Complaint counts
  const counts = {
    All: complaints.length,
    Pending: complaints.filter((c) => c.status === "Pending").length,
    Assigned: complaints.filter((c) => c.status === "Assigned").length,
    "In Progress": complaints.filter((c) => c.status === "In Progress").length,
    Resolved: complaints.filter((c) => c.status === "Resolved").length,
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16
      }}
      onClick={() => setAssignOpenId(null)}
    >

      {/* Filter and Search */}
      <div className="toolbar">

        <div className="filter-row">
          {["All", ...STATUS_ORDER].map((s) => (
            <button
              key={s}
              className={`filter-btn${filter === s ? " active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                setFilter(s);
              }}
            >
              {s} <span>({counts[s] ?? 0})</span>
            </button>
          ))}
        </div>

        <div className="list-search">
          <Filter size={14} color="var(--slate-light)" />

          <input
            value={search}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter this list…"
          />
        </div>

      </div>

      {/* Technician loading and error messages */}
      {loadingTechnicians && (
        <div className="empty-state">
          Loading approved technicians...
        </div>
      )}

      {technicianError && (
        <div style={{ color: "red" }}>
          {technicianError}
        </div>
      )}

      {/* Complaint List */}
      <div
        className={`docket-list${
          settings?.compactDocketView ? " compact" : ""
        }`}
      >

        {filtered.length === 0 && (
          <div className="empty-state">
            No complaints match this filter.
          </div>
        )}

        {filtered.map((c) => (
          <div
            key={c.id}
            onClick={(e) => e.stopPropagation()}
          >
            <ComplaintDocket
              c={c}

              assignOpenId={assignOpenId}

              onAssignClick={(id) => {
                setAssignOpenId(
                  assignOpenId === id ? null : id
                );
              }}

              onAssign={(id, techId) => {
                onAssign(id, techId);
                setAssignOpenId(null);
              }}

              approvedTechnicians={approvedTechnicians}

              autoAssignSuggestions={
                settings?.autoAssignSuggestions
              }
            />
          </div>
        ))}

      </div>
    </div>
  );
}