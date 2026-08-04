import React, { useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";
import { ClipboardList, AlertTriangle, Wrench, CheckCircle2, ArrowUpRight } from "lucide-react";
import { C, F } from "../theme/tokens";
import { CATEGORY_META, STATUS_META, STATUS_ORDER } from "../data/mockData";
import StatCard from "../components/StatCard";
import IconBadge from "../components/IconBadge";
import Pill from "../components/Pill";

export default function OverviewTab({ complaints }) {
  const total = complaints.length;
  const pending = complaints.filter((c) => c.status === "Pending").length;
  const inProgress = complaints.filter((c) => c.status === "In Progress").length;
  const resolved = complaints.filter((c) => c.status === "Resolved").length;

  const byCategory = useMemo(() => {
    const map = {};
    complaints.forEach((c) => { map[c.category] = (map[c.category] || 0) + 1; });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [complaints]);

  const byStatus = useMemo(
    () => STATUS_ORDER.map((s) => ({
      name: s,
      value: complaints.filter((c) => c.status === s).length,
      color: STATUS_META[s].color,
    })),
    [complaints]
  );

  const recent = [...complaints].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 5);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div className="stat-grid">
        <StatCard label="Total complaints" value={total} sub="Since Aug 1, 2026" icon={ClipboardList} accent={C.navy} />
        <StatCard label="Pending" value={pending} sub="Awaiting assignment" icon={AlertTriangle} accent={C.warn} />
        <StatCard label="In progress" value={inProgress} sub="Being worked on" icon={Wrench} accent={C.gold} />
        <StatCard label="Resolved" value={resolved} sub="Closed this month" icon={CheckCircle2} accent={C.success} />
      </div>

      <div className="overview-charts">
        <div className="card">
          <div className="card-title">Complaints by category</div>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={byCategory} margin={{ left: -18, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
              <XAxis dataKey="name" tick={{ fontFamily: F.body, fontSize: 11, fill: C.slate }} interval={0} angle={-14} textAnchor="end" height={55} />
              <YAxis tick={{ fontFamily: F.body, fontSize: 11, fill: C.slate }} allowDecimals={false} />
              <Tooltip contentStyle={{ fontFamily: F.body, fontSize: 12.5, borderRadius: 8, border: `1px solid ${C.border}` }} cursor={{ fill: C.cream }} />
              <Bar dataKey="value" fill={C.gold} radius={[5, 5, 0, 0]} maxBarSize={38} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div className="card-title">Status distribution</div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={byStatus} dataKey="value" nameKey="name" innerRadius={48} outerRadius={78} paddingAngle={3}>
                {byStatus.map((entry, idx) => <Cell key={idx} fill={entry.color} stroke="none" />)}
              </Pie>
              <Tooltip contentStyle={{ fontFamily: F.body, fontSize: 12.5, borderRadius: 8, border: `1px solid ${C.border}` }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 4 }}>
            {byStatus.map((s) => (
              <div key={s.name} className="legend-row">
                <div className="legend-dot" style={{ background: s.color }} />
                {s.name} <span className="legend-value">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title-row">
          <div className="card-title" style={{ marginBottom: 0 }}>Recently filed</div>
          <span className="link-action">View all complaints <ArrowUpRight size={14} /></span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {recent.map((c) => {
            const cat = CATEGORY_META[c.category];
            const status = STATUS_META[c.status];
            return (
              <div key={c.id} className="recent-row">
                <IconBadge icon={cat.icon} color={cat.color} bg={cat.bg} size={30} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="recent-title">{c.title}</div>
                  <div className="recent-meta">{c.location} · {c.student}</div>
                </div>
                <span className="recent-date">{c.date}</span>
                <Pill color={status.color} bg={status.bg}>{c.status}</Pill>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
