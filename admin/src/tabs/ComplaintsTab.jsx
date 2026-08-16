import React, { useState } from "react";
import { Filter } from "lucide-react";
import { STATUS_ORDER } from "../data/mockData";
import ComplaintDocket from "../components/ComplaintDocket";

export default function ComplaintsTab({ complaints, onAssign }) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [assignOpenId, setAssignOpenId] = useState(null);

  const filtered = complaints.filter((c) => {
    const matchesFilter = filter === "All" || c.status === filter;
    const q = search.toLowerCase();
    const matchesSearch =
      !q || c.title.toLowerCase().includes(q) || c.id.toLowerCase().includes(q) || c.student.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const counts = {
    All: complaints.length,
    Pending: complaints.filter((c) => c.status === "Pending").length,
    Assigned: complaints.filter((c) => c.status === "Assigned").length,
    "In Progress": complaints.filter((c) => c.status === "In Progress").length,
    Resolved: complaints.filter((c) => c.status === "Resolved").length,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }} onClick={() => setAssignOpenId(null)}>
      <div className="toolbar">
        <div className="filter-row">
          {["All", ...STATUS_ORDER].map((s) => (
            <button
              key={s}
              className={`filter-btn${filter === s ? " active" : ""}`}
              onClick={(e) => { e.stopPropagation(); setFilter(s); }}
            >
              {s} <span>({counts[s]})</span>
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

      <div className="docket-list">
        {filtered.length === 0 && <div className="empty-state">No complaints match this filter.</div>}
        {filtered.map((c) => (
          <div key={c.id} onClick={(e) => e.stopPropagation()}>
            <ComplaintDocket
              c={c}
              assignOpenId={assignOpenId}
              onAssignClick={(id) => setAssignOpenId(assignOpenId === id ? null : id)}
              onAssign={(id, techId) => { onAssign(id, techId); setAssignOpenId(null); }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
