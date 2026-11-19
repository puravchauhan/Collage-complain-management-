import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatsCards from "../components/StatsCards";
import ComplaintsTable from "../components/ComplaintsTable";

const API = "https://localhost:7277/api/Complaint";

export default function Dashboard({ technician, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("dashboard");

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const technicianId = technician?.technicianId;

  // Load complaints assigned to logged-in technician
  const fetchJobs = useCallback(async () => {
    if (!technicianId) {
      setJobs([]);
      setError("Technician ID not found. Please login again.");
      setLoading(false);
      return;
    }

    try {
      setError("");

      const response = await fetch(
        `${API}/technician/${technicianId}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to load assigned complaints."
        );
      }

      if (!Array.isArray(data)) {
        throw new Error("Invalid complaints response.");
      }

      const formattedJobs = data.map((c) => ({
        id: c.id,
        title: c.title || c.problem || "Untitled complaint",
        location: c.location || "Not specified",
        category: c.category || "Other Issues",
        priority: c.priority || "Medium",
        status: c.status || "Assigned",
        description: c.description || "",
        createdAt: c.createdAt,
        assignedAt: c.assignedAt,
      }));

      setJobs(formattedJobs);
    } catch (err) {
      console.error(err);
      setError(err.message || "Unable to load complaints.");
    } finally {
      setLoading(false);
    }
  }, [technicianId]);

  useEffect(() => {
    setLoading(true);
    fetchJobs();
  }, [fetchJobs]);

  // Update complaint status in database
  const updateStatus = async (id, status) => {
    try {
      if (
        status !== "In Progress" &&
        status !== "Resolved"
      ) {
        throw new Error("Invalid complaint status.");
      }

      const response = await fetch(`${API}/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          technicianId: Number(technicianId),
          status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Complaint status update failed."
        );
      }

      alert("Complaint status updated successfully!");

      await fetchJobs();
    } catch (err) {
      console.error(err);
      alert(err.message || "Unable to update complaint status.");
      throw err;
    }
  };

  // Dashboard statistics
  const counts = useMemo(
    () => ({
      pending: jobs.filter(
        (j) =>
          j.status === "Pending" ||
          j.status === "Assigned"
      ).length,

      working: jobs.filter(
        (j) => j.status === "In Progress"
      ).length,

      done: jobs.filter(
        (j) => j.status === "Resolved"
      ).length,

      total: jobs.length,
    }),
    [jobs]
  );

  // Today's assigned jobs
  const todaysJobs = useMemo(() => {
    const today = new Date().toDateString();

    return jobs.filter((job) => {
      if (!job.assignedAt) return false;

      return (
        new Date(job.assignedAt).toDateString() === today
      );
    });
  }, [jobs]);

  // Change page from sidebar
  const handleNavigate = (page) => {
    setActiveNav(page);
    setSidebarOpen(false);
  };

  // Page heading
  const pageTitles = {
    dashboard: "Dashboard",
    jobs: "Assigned Jobs",
    update: "Update Status",
    today: "Today's Jobs",
    profile: "My Profile",
  };

  // Display selected page
  const renderPage = () => {
    if (loading) {
      return <p>Loading your assigned complaints...</p>;
    }

    if (error) {
      return (
        <div>
          <p style={{ color: "red" }}>{error}</p>
          <button
            type="button"
            onClick={() => {
              setLoading(true);
              fetchJobs();
            }}
          >
            Try Again
          </button>
        </div>
      );
    }

    switch (activeNav) {
      case "dashboard":
        return (
          <>
            <div className="blueprint-hero">
              <div className="eyebrow">
                Work Order Console
              </div>

              <h1>
                Welcome back, {technician?.name || "Technician"} 👋
              </h1>

              <p>
                You have {counts.pending} pending and{" "}
                {counts.working} in-progress jobs.
                Keep the campus running smoothly.
              </p>
            </div>

            <StatsCards counts={counts} />

            <ComplaintsTable
              jobs={jobs}
              onUpdateStatus={updateStatus}
            />
          </>
        );

      case "jobs":
        return (
          <ComplaintsTable
            jobs={jobs}
            onUpdateStatus={updateStatus}
          />
        );

      case "update":
        return (
          <ComplaintsTable
            jobs={jobs.filter(
              (job) =>
                job.status === "Assigned" ||
                job.status === "In Progress"
            )}
            onUpdateStatus={updateStatus}
          />
        );

      case "today":
        return (
          <div className="ticket-panel">
            <div className="panel-head">
              <h2>Today's Jobs</h2>
              <span>{todaysJobs.length} work orders</span>
            </div>

            <ComplaintsTable
              jobs={todaysJobs}
              onUpdateStatus={updateStatus}
            />
          </div>
        );

      case "profile":
        return (
          <div className="ticket-panel">
            <div className="panel-head">
              <h2>Technician Profile</h2>
            </div>

            <div className="card p-4">
              <div className="text-center mb-4">
                <i
                  className="bi bi-person-circle"
                  style={{ fontSize: "65px" }}
                ></i>
                <h3>{technician?.name || "Technician"}</h3>
                <span className="badge bg-success">
                  Approved Technician
                </span>
              </div>

              <hr />

              <p>
                <strong>Technician ID:</strong>{" "}
                {technician?.technicianId || "N/A"}
              </p>

              <p>
                <strong>Name:</strong>{" "}
                {technician?.name || "N/A"}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {technician?.email || "N/A"}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {technician?.phone || "N/A"}
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="app-shell">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        active={activeNav}
        onNavigate={handleNavigate}
        onLogout={onLogout}
      />

      <div className="main-col">
        <Topbar
  onMenuClick={() => setSidebarOpen(true)}
  technicianName={technician?.name || "Technician"}
/>

        <main className="content">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>{pageTitles[activeNav]}</h2>

            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => {
                setLoading(true);
                fetchJobs();
              }}
            >
              <i className="bi bi-arrow-clockwise me-1"></i>
              Refresh
            </button>
          </div>

          {renderPage()}
        </main>
      </div>
    </div>
  );
}