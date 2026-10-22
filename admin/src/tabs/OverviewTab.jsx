
import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  ClipboardList,
  AlertTriangle,
  Wrench,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

import { C, F } from "../theme/tokens";
import { CATEGORY_META, STATUS_META, STATUS_ORDER } from "../data/mockData";
import StatCard from "../components/StatCard";
import IconBadge from "../components/IconBadge";
import Pill from "../components/Pill";

export default function OverviewTab({ complaints = [], admin }) {
  // Complaint statistics
  const total = complaints.length;

  const pending = complaints.filter(
    (c) => c.status === "Pending"
  ).length;

  const inProgress = complaints.filter(
    (c) => c.status === "In Progress"
  ).length;

  const resolved = complaints.filter(
    (c) => c.status === "Resolved"
  ).length;

  // Complaints grouped by category
  const byCategory = useMemo(() => {
    const categoryMap = {};

    complaints.forEach((complaint) => {
      const category = complaint.category || "Other Issues";

      categoryMap[category] = (categoryMap[category] || 0) + 1;
    });

    return Object.entries(categoryMap).map(([name, value]) => ({
      name,
      value,
    }));
  }, [complaints]);

  // Complaints grouped by status
  const byStatus = useMemo(() => {
    const statuses = [
      ...new Set([
        ...STATUS_ORDER,
        ...complaints.map((c) => c.status || "Pending"),
      ]),
    ];

    return statuses.map((statusName) => ({
      name: statusName,
      value: complaints.filter(
        (c) => (c.status || "Pending") === statusName
      ).length,
      color:
        STATUS_META[statusName]?.color ||
        C.slate ||
        "#64748b",
    }));
  }, [complaints]);

  // Latest five complaints
  const recent = useMemo(() => {
    return [...complaints]
      .sort((a, b) => {
        const dateA = new Date(a.date || 0).getTime();
        const dateB = new Date(b.date || 0).getTime();

        return dateB - dateA;
      })
      .slice(0, 5);
  }, [complaints]);

  // Format date received from the .NET API
  const formatDate = (dateValue) => {
    if (!dateValue) return "Date unavailable";

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return String(dateValue);
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 22,
      }}
    >
      {/* Welcome message */}
      {admin && (
        <div className="overview-welcome">
          Welcome back,{" "}
          <b>{admin.name?.split(" ")[0] || "Admin"}</b> — here's
          what's happening across campus today.
        </div>
      )}

      {/* Statistics cards */}
      <div className="stat-grid">
        <StatCard
          label="Total complaints"
          value={total}
          sub="All submitted complaints"
          icon={ClipboardList}
          accent={C.navy}
        />

        <StatCard
          label="Pending"
          value={pending}
          sub="Awaiting assignment"
          icon={AlertTriangle}
          accent={C.warn}
        />

        <StatCard
          label="In progress"
          value={inProgress}
          sub="Being worked on"
          icon={Wrench}
          accent={C.gold}
        />

        <StatCard
          label="Resolved"
          value={resolved}
          sub="Successfully resolved"
          icon={CheckCircle2}
          accent={C.success}
        />
      </div>

      {/* Charts */}
      <div className="overview-charts">
        {/* Category chart */}
        <div className="card">
          <div className="card-title">
            Complaints by category
          </div>

          {byCategory.length === 0 ? (
            <p style={{ padding: 20, color: C.slate }}>
              No complaints available yet.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={230}>
              <BarChart
                data={byCategory}
                margin={{ left: -18, right: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={C.border}
                  vertical={false}
                />

                <XAxis
                  dataKey="name"
                  tick={{
                    fontFamily: F.body,
                    fontSize: 11,
                    fill: C.slate,
                  }}
                  interval={0}
                  angle={-14}
                  textAnchor="end"
                  height={55}
                />

                <YAxis
                  tick={{
                    fontFamily: F.body,
                    fontSize: 11,
                    fill: C.slate,
                  }}
                  allowDecimals={false}
                />

                <Tooltip
                  contentStyle={{
                    fontFamily: F.body,
                    fontSize: 12.5,
                    borderRadius: 8,
                    border: `1px solid ${C.border}`,
                  }}
                  cursor={{ fill: C.cream }}
                />

                <Bar
                  dataKey="value"
                  fill={C.gold}
                  radius={[5, 5, 0, 0]}
                  maxBarSize={38}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Status chart */}
        <div className="card">
          <div className="card-title">
            Status distribution
          </div>

          {total === 0 ? (
            <p style={{ padding: 20, color: C.slate }}>
              No complaints available yet.
            </p>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={byStatus}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={48}
                    outerRadius={78}
                    paddingAngle={3}
                  >
                    {byStatus.map((entry, index) => (
                      <Cell
                        key={`${entry.name}-${index}`}
                        fill={entry.color}
                        stroke="none"
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    contentStyle={{
                      fontFamily: F.body,
                      fontSize: 12.5,
                      borderRadius: 8,
                      border: `1px solid ${C.border}`,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 4,
                }}
              >
                {byStatus.map((status) => (
                  <div
                    key={status.name}
                    className="legend-row"
                  >
                    <div
                      className="legend-dot"
                      style={{
                        background: status.color,
                      }}
                    />

                    {status.name}

                    <span className="legend-value">
                      {status.value}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Recently filed complaints */}
      <div className="card">
        <div className="card-title-row">
          <div
            className="card-title"
            style={{ marginBottom: 0 }}
          >
            Recently filed
          </div>

          <span className="link-action">
            Latest complaints{" "}
            <ArrowUpRight size={14} />
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {recent.length === 0 ? (
            <p style={{ color: C.slate, padding: "12px 0" }}>
              No complaints have been submitted yet.
            </p>
          ) : (
            recent.map((complaint) => {
              const category =
                CATEGORY_META[complaint.category] ||
                CATEGORY_META["Other Issues"] ||
                {
                  icon: ClipboardList,
                  color: C.navy,
                  bg: C.cream,
                };

              const status =
                STATUS_META[complaint.status] ||
                STATUS_META["Pending"] ||
                {
                  color: C.slate,
                  bg: C.cream,
                };

              return (
                <div
                  key={complaint.id}
                  className="recent-row"
                >
                  <IconBadge
                    icon={category.icon}
                    color={category.color}
                    bg={category.bg}
                    size={30}
                  />

                  <div
                    style={{
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    <div className="recent-title">
                      {complaint.title ||
                        complaint.problem ||
                        "Untitled complaint"}
                    </div>

                    <div className="recent-meta">
                      {complaint.location || "Location not specified"}
                      {" · "}
                      {complaint.student ||
                        (complaint.userId
                          ? `User ${complaint.userId}`
                          : "Student")}
                    </div>
                  </div>

                  <span className="recent-date">
                    {formatDate(complaint.date)}
                  </span>

                  <Pill
                    color={status.color}
                    bg={status.bg}
                  >
                    {complaint.status || "Pending"}
                  </Pill>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
