
import React, { useCallback, useEffect, useState } from "react";
import {
  RefreshCw,
  Trash2,
  Users,
  ClipboardList,
  ShieldCheck,
  Search,
  X,
} from "lucide-react";

const API_URL = "https://localhost:7277/api/AdminManagement";

export default function PlaceholderTab() {
  const [activeSection, setActiveSection] = useState("users");
  const [users, setUsers] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [deleting, setDeleting] = useState("");
  const [search, setSearch] = useState("");

  const colors = {
    navy: "#16232F",
    teal: "#2F6F6D",
    gold: "#F4B400",
    orange: "#C1440E",
    bg: "#EEF0EC",
    border: "#E1E6E1",
    muted: "#66736F",
    white: "#FFFFFF",
  };

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [ur, cr, ar] = await Promise.all([
        fetch(`${API_URL}/users`),
        fetch(`${API_URL}/complaints`),
        fetch(`${API_URL}/admins`),
      ]);

      if (!ur.ok || !cr.ok || !ar.ok) {
        throw new Error(
          "Unable to load records. Check your backend API."
        );
      }

      const [u, c, a] = await Promise.all([
        ur.json(),
        cr.json(),
        ar.json(),
      ]);

      if (!Array.isArray(u) || !Array.isArray(c) || !Array.isArray(a)) {
        throw new Error("The backend returned an unexpected response.");
      }

      setUsers(u);
      setComplaints(c);
      setAdmins(a);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load database records.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const deleteRecord = async (type, id, description) => {
    const confirmed = window.confirm(
      `Permanently delete ${description}? This action cannot be undone.`
    );

    if (!confirmed) return;

    setDeleting(`${type}-${id}`);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/${type}/${id}`, {
        method: "DELETE",
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Delete failed.");
      }

      setMessage(data.message || "Record deleted successfully.");
      await loadData();
    } catch (err) {
      setError(err.message || "Unable to delete record.");
    } finally {
      setDeleting("");
    }
  };

  const formatDate = (value) => {
    if (!value) return "—";
    const date = new Date(value);
    return Number.isNaN(date.getTime())
      ? "—"
      : date.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
  };

  const buttonStyle = (active = false) => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "10px 15px",
    borderRadius: 8,
    border: `1px solid ${active ? colors.navy : colors.border}`,
    background: active ? colors.navy : colors.white,
    color: active ? colors.white : colors.navy,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    whiteSpace: "nowrap",
  });

  const deleteButton = (type, item, description) => {
    const key = `${type}-${item.id}`;

    return (
      <button
        type="button"
        disabled={deleting !== ""}
        onClick={() => deleteRecord(type, item.id, description)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          padding: "7px 10px",
          borderRadius: 7,
          border: "1px solid #F0D0C9",
          background: "#FFF4F1",
          color: colors.orange,
          fontSize: 12,
          fontWeight: 700,
          cursor: deleting ? "wait" : "pointer",
          opacity: deleting && deleting !== key ? 0.5 : 1,
          whiteSpace: "nowrap",
        }}
      >
        <Trash2 size={14} />
        {deleting === key ? "Deleting..." : "Delete"}
      </button>
    );
  };

  const badge = (value, type = "status") => {
    const text = String(value || (type === "status" ? "Pending" : "—"));
    const normalized = text.toLowerCase();

    let background = "#EEF0EC";
    let color = colors.navy;

    if (type === "status") {
      if (normalized === "resolved") {
        background = "#E5F5E9";
        color = "#247443";
      } else if (normalized === "in progress" || normalized === "assigned") {
        background = "#E8F1FC";
        color = "#245B99";
      } else if (normalized === "pending") {
        background = "#FFF3D5";
        color = "#8B6100";
      }
    } else {
      if (normalized === "high") {
        background = "#FFF0EC";
        color = "#B93825";
      } else if (normalized === "medium") {
        background = "#FFF3D5";
        color = "#8B6100";
      } else if (normalized === "low") {
        background = "#E5F5E9";
        color = "#247443";
      }
    }

    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          padding: "5px 9px",
          borderRadius: 20,
          background,
          color,
          fontSize: 11,
          fontWeight: 700,
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </span>
    );
  };

  const thStyle = {
    padding: "14px 16px",
    textAlign: "left",
    fontSize: 11,
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: colors.muted,
    background: "#F6F7F4",
    borderBottom: `1px solid ${colors.border}`,
    whiteSpace: "nowrap",
  };

  const tdStyle = {
    padding: "15px 16px",
    textAlign: "left",
    verticalAlign: "middle",
    borderBottom: `1px solid ${colors.border}`,
    color: colors.navy,
    fontSize: 13,
  };

  const idStyle = {
    color: colors.teal,
    fontWeight: 800,
    fontVariantNumeric: "tabular-nums",
    whiteSpace: "nowrap",
  };

  const cellText = (primary, secondary = "") => (
    <div style={{ minWidth: 100 }}>
      <div style={{ fontWeight: 650, overflowWrap: "anywhere" }}>
        {primary || "—"}
      </div>
      {secondary && (
        <div
          style={{
            color: colors.muted,
            fontSize: 12,
            marginTop: 4,
            lineHeight: 1.5,
            overflowWrap: "anywhere",
          }}
        >
          {secondary}
        </div>
      )}
    </div>
  );

  const filtered = (items, values) => {
    const query = search.trim().toLowerCase();
    if (!query) return items;

    return items.filter((item) =>
      values(item).some((value) =>
        String(value ?? "").toLowerCase().includes(query)
      )
    );
  };

  const sections = [
    {
      id: "users",
      label: "Registered Users",
      icon: Users,
      count: users.length,
    },
    {
      id: "complaints",
      label: "Complaints",
      icon: ClipboardList,
      count: complaints.length,
    },
    {
      id: "admins",
      label: "Admins",
      icon: ShieldCheck,
      count: admins.length,
    },
  ];

  const table = (headers, rows, emptyText, minWidth = 750) => (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          minWidth,
          borderCollapse: "separate",
          borderSpacing: 0,
          tableLayout: "auto",
        }}
      >
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} style={thStyle}>
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={headers.length}
                style={{
                  ...tdStyle,
                  textAlign: "center",
                  padding: 38,
                  color: colors.muted,
                }}
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr
                key={row.key}
                style={{
                  background: index % 2 === 0 ? colors.white : "#FAFBF9",
                }}
              >
                {row.cells.map((cell, i) => (
                  <td key={i} style={tdStyle}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  let tableContent;

  if (activeSection === "users") {
    const rows = filtered(users, (u) => [
      u.id,
      u.name,
      u.fullName,
      u.email,
    ]).map((user) => ({
      key: user.id,
      cells: [
        <span style={idStyle}>USR-{user.id}</span>,
        cellText(user.name || user.fullName || "Name not available"),
        cellText(user.email),
        deleteButton(
          "users",
          user,
          `user ${user.name || user.fullName || user.email || user.id} and their complaints`
        ),
      ],
    }));

    tableContent = table(
      ["User ID", "Full Name", "Email Address", "Action"],
      rows,
      "No registered users found.",
      700
    );
  } else if (activeSection === "complaints") {
    const rows = filtered(complaints, (c) => [
      c.id,
      c.userId,
      c.category,
      c.problem,
      c.location,
      c.priority,
      c.status,
      c.description,
    ]).map((complaint) => ({
      key: complaint.id,
      cells: [
        <span style={idStyle}>CMP-{complaint.id}</span>,
        cellText(`User #${complaint.userId}`),
        cellText(
          complaint.category || "Other Issues",
          complaint.problem || "No problem title"
        ),
        badge(complaint.priority, "priority"),
        badge(complaint.status, "status"),
        cellText(
          formatDate(complaint.createdAt),
          complaint.location || ""
        ),
        deleteButton(
          "complaints",
          complaint,
          `complaint CMP-${complaint.id}`
        ),
      ],
    }));

    tableContent = table(
      [
        "Complaint ID",
        "Submitted By",
        "Complaint Details",
        "Priority",
        "Status",
        "Date / Location",
        "Action",
      ],
      rows,
      "No complaints found.",
      1100
    );
  } else {
    const rows = filtered(admins, (a) => [
      a.id,
      a.name,
      a.email,
      a.role,
    ]).map((admin) => ({
      key: admin.id,
      cells: [
        <span style={idStyle}>ADM-{admin.id}</span>,
        cellText(admin.name),
        cellText(admin.email),
        badge(admin.role || "Admin", "role"),
        deleteButton(
          "admins",
          admin,
          `admin ${admin.name || admin.email || admin.id}`
        ),
      ],
    }));

    tableContent = table(
      ["Admin ID", "Name", "Email Address", "Role", "Action"],
      rows,
      "No admin accounts found.",
      850
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        color: colors.navy,
        width: "100%",
        minWidth: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800 }}>
            Admin Management
          </h2>
          <p style={{ margin: "7px 0 0", color: colors.muted, fontSize: 13 }}>
            Manage registered accounts and college complaints.
          </p>
        </div>

        <button
          type="button"
          style={buttonStyle()}
          onClick={loadData}
          disabled={loading}
        >
          <RefreshCw size={15} />
          {loading ? "Loading..." : "Refresh data"}
        </button>
      </div>

      {error && (
        <div
          role="alert"
          style={{
            padding: 14,
            background: "#FFF0EC",
            border: "1px solid #F0D0C9",
            borderRadius: 9,
            color: "#B93825",
            fontSize: 13,
          }}
        >
          {error}
        </div>
      )}

      {message && (
        <div
          role="status"
          style={{
            padding: 14,
            background: "#E5F5E9",
            border: "1px solid #BFE4C9",
            borderRadius: 9,
            color: "#247443",
            fontSize: 13,
          }}
        >
          {message}
          <button
            type="button"
            onClick={() => setMessage("")}
            aria-label="Dismiss message"
            style={{
              float: "right",
              border: 0,
              background: "transparent",
              cursor: "pointer",
              color: "inherit",
            }}
          >
            <X size={15} />
          </button>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
          gap: 12,
        }}
      >
        {sections.map((section) => {
          const Icon = section.icon;
          const selected = activeSection === section.id;

          return (
            <button
              type="button"
              key={section.id}
              onClick={() => {
                setActiveSection(section.id);
                setSearch("");
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                textAlign: "left",
                padding: 16,
                borderRadius: 11,
                border: `1px solid ${selected ? colors.teal : colors.border}`,
                background: selected ? "#F0F7F5" : colors.white,
                boxShadow: selected
                  ? "0 0 0 1px #2F6F6D inset"
                  : "0 1px 3px rgba(22,35,47,0.03)",
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  display: "grid",
                  placeItems: "center",
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  background: selected ? colors.teal : colors.bg,
                  color: selected ? colors.white : colors.navy,
                  flexShrink: 0,
                }}
              >
                <Icon size={20} />
              </span>

              <span style={{ minWidth: 0 }}>
                <span
                  style={{
                    display: "block",
                    fontSize: 12,
                    color: colors.muted,
                  }}
                >
                  {section.label}
                </span>
                <span
                  style={{
                    display: "block",
                    fontSize: 23,
                    fontWeight: 800,
                    color: colors.navy,
                    marginTop: 3,
                  }}
                >
                  {section.count}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div
        style={{
          background: colors.white,
          border: `1px solid ${colors.border}`,
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(22,35,47,0.035)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 14,
            flexWrap: "wrap",
            padding: "18px 20px",
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          <div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>
              {sections.find((s) => s.id === activeSection)?.label}
            </h3>
            <p style={{ margin: "5px 0 0", fontSize: 12, color: colors.muted }}>
              {sections.find((s) => s.id === activeSection)?.count} records
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "0 11px",
              width: "min(100%, 270px)",
              height: 39,
              border: `1px solid ${colors.border}`,
              borderRadius: 8,
              background: "#FFFFFF",
            }}
          >
            <Search size={16} color={colors.muted} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search records..."
              aria-label="Search records"
              style={{
                border: 0,
                outline: 0,
                width: "100%",
                minWidth: 0,
                fontSize: 13,
                background: "transparent",
                color: colors.navy,
              }}
            />
            {search && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setSearch("")}
                style={{
                  display: "grid",
                  placeItems: "center",
                  border: 0,
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div style={{ padding: 42, textAlign: "center", color: colors.muted }}>
            Loading database records...
          </div>
        ) : (
          tableContent
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
            padding: "12px 18px",
            borderTop: `1px solid ${colors.border}`,
            color: colors.muted,
            fontSize: 11,
          }}
        >
      
        </div>
      </div>
    </div>
  );
}
