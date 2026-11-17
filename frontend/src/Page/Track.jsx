import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Css/Track.css";
import Footer from "../Component/Footer";

function Track() {
  const [complaintId, setComplaintId] = useState("");
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "https://localhost:7277/api/Complaint";

  // SEARCH COMPLAINT FROM BACKEND
  const trackComplaint = async (searchId = complaintId) => {
    const id = searchId.trim().toUpperCase();

    if (!id) {
      setComplaint(null);
      setError("Please enter a complaint ID.");
      return;
    }

    setComplaintId(id);
    setComplaint(null);
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/track/${encodeURIComponent(id)}`
      );

      const responseText = await response.text();
      const data = responseText ? JSON.parse(responseText) : {};

      if (!response.ok || !data.success || !data.complaint) {
        throw new Error(
          data.message ||
            "No complaint found with that ID. Double-check the ticket number and try again."
        );
      }

      const item = data.complaint;

      // STATUS AND PROGRESS
      const status = item.status || "Pending";

      const statusAliases = {
        Open: "Pending",
        "Work In Progress": "In Progress",
        Completed: "Resolved",
      };

      const normalizedStatus = statusAliases[status] || status;

      const statusSteps = [
        "Pending",
        "Under Review",
        "Assigned",
        "In Progress",
        "Resolved",
      ];

      const currentStep = statusSteps.indexOf(normalizedStatus);

      const progressValues = [10, 25, 40, 65, 100];

      const progress =
        currentStep >= 0 ? progressValues[currentStep] : 10;

      const statusClass =
        normalizedStatus === "Resolved"
          ? "resolved"
          : normalizedStatus === "In Progress"
          ? "progress"
          : normalizedStatus === "Pending"
          ? "open"
          : "progress";

      // DATE FORMAT
      const createdDate = item.createdAt
        ? new Date(item.createdAt)
        : null;

      const formattedDate =
        createdDate && !isNaN(createdDate.getTime())
          ? createdDate.toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "Not available";

      const formattedTime =
        createdDate && !isNaN(createdDate.getTime())
          ? createdDate.toLocaleString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "Not available";

      // STATUS TIMELINE
      const timelineLabels = [
        "Complaint Submitted",
        "Under Review",
        "Assigned to Technician",
        "Work In Progress",
        "Resolved",
      ];

      const timeline = timelineLabels.map((label, index) => {
        let state = "pending";

        if (currentStep >= 0 && index < currentStep) {
          state = "done";
        } else if (currentStep >= 0 && index === currentStep) {
          state = "current";
        }

        if (normalizedStatus === "Resolved") {
          state = "done";
        }

        return {
          label,
          time: index === 0 ? formattedTime : "—",
          note:
            index === 0
              ? "Complaint submitted successfully."
              : "",
          state,
        };
      });

      // COMPLAINT IMAGE
      const photos = item.imagePath
        ? [
            {
              url: item.imagePath.startsWith("http")
                ? item.imagePath
                : `https://localhost:7277${item.imagePath}`,
              caption: "Complaint image",
            },
          ]
        : [];

      // MAP BACKEND DATA TO EXISTING UI
      const complaintData = {
        title: item.title || item.problem || "Complaint",
        location: item.location || "Not available",
        category: item.category || "Not available",
        priority: item.priority || "Low",
        status: normalizedStatus,
        statusClass,
        date: formattedDate,
        technician: "Unassigned",
        progress,
        eta: "Not available",
        reporter: "Not available",
        contact: "Not available",
        description: item.description || "No description available.",
        photos,
        remarks: [],
        timeline,
        activity: [
          {
            time: formattedTime,
            text: "Complaint submitted successfully.",
          },
        ],
      };

      setComplaint(complaintData);
      setComplaintId(item.complaintId || id);

      setTimeout(() => {
        document.getElementById("result")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    } catch (err) {
      console.error("TRACK COMPLAINT ERROR:", err);

      setComplaint(null);
      setError(
        err.message ||
          "Unable to track complaint. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // SAMPLE BUTTON - USES THE SAME BACKEND SEARCH
  const fillAndTrack = (id) => {
    setComplaintId(id);
    trackComplaint(id);
  };

  // PRIORITY CLASS
  const priorityClass = (priority) => {
    if (priority === "High") return "priority-high";
    if (priority === "Medium") return "priority-medium";
    return "priority-low";
  };

  return (
    <div className="track-page">
      {/* MAIN */}
      <main className="container track-container">
        {/* PAGE HEADER */}
        <section className="page-head text-center">
          <div className="eyebrow mb-3">Live Status Lookup</div>

          <h1 className="mb-2">Track Your Complaint</h1>

          <p className="mx-auto">
            Enter your ticket ID to see exactly where it stands — no login
            required.
          </p>
        </section>

        {/* SEARCH */}
        <section className="search-card p-4 mb-4">
          <div className="row g-2">
            <div className="col-md-9">
              <input
                type="text"
                className="form-control cf-input"
                placeholder="e.g. CMP-2026-007"
                maxLength="14"
                value={complaintId}
                onChange={(e) => setComplaintId(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    trackComplaint();
                  }
                }}
              />
            </div>

            <div className="col-md-3">
              <button
                className="cf-btn cf-btn-primary w-100 h-100"
                onClick={() => trackComplaint()}
                disabled={loading}
              >
                {loading ? "Searching..." : "Track →"}
              </button>
            </div>
          </div>

          {/* SAMPLE IDS */}
          <div className="search-hint mt-2">
            Try a sample:
            <button
              className="sample-btn"
              onClick={() => fillAndTrack("CMP-2026-007")}
            >
              CMP-2026-007
            </button>
            ,
            <button
              className="sample-btn"
              onClick={() => fillAndTrack("CMP-2026-008")}
            >
              CMP-2026-008
            </button>
            or
            <button
              className="sample-btn"
              onClick={() => fillAndTrack("CMP-2026-009")}
            >
              CMP-2026-009
            </button>
          </div>

          {/* ERROR */}
          {error && <div className="search-error mt-3">{error}</div>}
        </section>

        {/* RESULT */}
        {complaint && (
          <div id="result">
            {/* RESULT CARD */}
            <section className="result-card mb-4">
              {/* TOP */}
              <div className="result-top p-4 d-flex justify-content-between align-items-start gap-3">
                <div>
                  <div className="result-id">{complaintId}</div>

                  <h2 className="result-title mb-1">
                    {complaint.title}
                  </h2>

                  <div className="result-location">
                    {complaint.location}
                  </div>
                </div>

                {/* STATUS */}
                <div className={`status-stamp ${complaint.statusClass}`}>
                  {complaint.status}
                </div>
              </div>

              {/* BASIC INFO */}
              <div className="result-meta-row row g-0">
                <Meta label="Category" value={complaint.category} />

                <Meta
                  label="Priority"
                  value={complaint.priority}
                  valueClass={priorityClass(complaint.priority)}
                />

                <Meta label="Filed On" value={complaint.date} />

                <Meta
                  label="Assigned To"
                  value={complaint.technician}
                />
              </div>

              {/* DESCRIPTION */}
              <div className="result-description p-4">
                <strong>Description:</strong> {complaint.description}
              </div>

              {/* EXTRA INFO */}
              <div className="result-meta-row row g-0">
                <Meta
                  label="Complaint ID Ref"
                  value={complaintId}
                />

                <Meta
                  label="Est. Resolution"
                  value={complaint.eta}
                />

                <Meta
                  label="Reported By"
                  value={complaint.reporter}
                />

                <Meta
                  label="Contact"
                  value={complaint.contact}
                />
              </div>

              {/* PROGRESS */}
              <div className="p-4">
                <div className="progress-labels d-flex justify-content-between mb-2">
                  <span>Progress</span>
                  <span>{complaint.progress}%</span>
                </div>

                <div className="cf-progress">
                  <div
                    className="cf-progress-bar"
                    style={{
                      width: `${complaint.progress}%`,
                    }}
                  />
                </div>
              </div>
            </section>

            {/* PHOTO EVIDENCE */}
            <SectionTitle title="Photo Evidence" />

            <div className="d-flex flex-wrap gap-3 mb-4">
              {complaint.photos.length > 0 ? (
                complaint.photos.map((photo, index) => (
                  <div className="photo-thumb" key={index}>
                    <img src={photo.url} alt={photo.caption} />

                    <div className="photo-caption">
                      {photo.caption}
                    </div>
                  </div>
                ))
              ) : (
                <div className="photo-empty">
                  No photos have been attached to this complaint yet.
                </div>
              )}
            </div>

            {/* TECHNICIAN REMARKS */}
            <SectionTitle title="Technician Remarks" />

            <div className="remarks-box p-3 mb-4">
              {complaint.remarks.length > 0 ? (
                complaint.remarks.map((remark, index) => (
                  <div className="remark-item py-3" key={index}>
                    <div className="d-flex justify-content-between gap-2 mb-1">
                      <span className="search-hint">
                        <strong>{remark.author}</strong>

                        {" · "}

                        {remark.role}
                      </span>

                      <span className="search-hint">
                        {remark.time}
                      </span>
                    </div>

                    <div className="remark-text">{remark.text}</div>
                  </div>
                ))
              ) : (
                <div className="remarks-empty">
                  No technician remarks yet — this ticket hasn't been picked up.
                </div>
              )}
            </div>

            {/* STATUS TIMELINE */}
            <SectionTitle title="Status Timeline" />

            <div className="timeline ps-4 mb-4">
              {complaint.timeline.map((item, index) => (
                <div
                  className={`timeline-item ${item.state} pb-4`}
                  key={index}
                >
                  <div className="timeline-dot">
                    {item.state === "done" && "✓"}

                    {item.state === "current" && "•"}
                  </div>

                  <div>
                    <div className="d-flex justify-content-between align-items-baseline gap-2">
                      <h4 className="mb-0">{item.label}</h4>

                      <span className="search-hint">{item.time}</span>
                    </div>

                    {item.note && (
                      <p className="mb-0 mt-1">{item.note}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* SLA */}
            <SectionTitle title="Priority & SLA Info" />

            <div className="sla-card px-3 mb-4">
              <SLA
                type="high"
                title="High priority"
                text="target first response within 4 hours, resolution within 24 hours. Safety or usability-blocking issues such as electrical faults, water leakage and broken locks."
              />

              <SLA
                type="medium"
                title="Medium priority"
                text="target first response within 12 hours, resolution within 3 days. Standard maintenance issues affecting comfort or convenience."
              />

              <SLA
                type="low"
                title="Low priority"
                text="target first response within 24 hours, resolution within 7 days. Cosmetic or non-urgent issues."
              />
            </div>

            {/* ACTIVITY */}
            <SectionTitle title="Activity Log" />

            <div className="activity-list mb-4">
              {complaint.activity.map((activity, index) => (
                <div className="activity-row p-3" key={index}>
                  <div className="activity-time">{activity.time}</div>

                  <div className="activity-text">{activity.text}</div>
                </div>
              ))}
            </div>

            {/* ACTION BUTTONS */}
            <div className="result-actions d-flex flex-wrap gap-2 mb-5">
              <a href="/login" className="cf-btn cf-btn-ghost">
                Log In to Add a Comment
              </a>

              <a href="/report" className="cf-btn cf-btn-ghost">
                Report a Similar Issue
              </a>

              <button
                className="cf-btn cf-btn-ghost"
                onClick={() => window.print()}
              >
                Print / Save as PDF
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

/* ================= META COMPONENT ================= */

function Meta({ label, value, valueClass = "" }) {
  return (
    <div className="result-meta col-12 col-md-6 col-lg-3 p-3">
      <div className="meta-label">{label}</div>

      <div className={`meta-value ${valueClass}`}>{value}</div>
    </div>
  );
}

/* ================= SECTION TITLE ================= */

function SectionTitle({ title }) {
  return (
    <div className="section-title d-flex align-items-center gap-2 mb-3">
      {title}

      <span className="flex-grow-1" />
    </div>
  );
}

/* ================= SLA COMPONENT ================= */

function SLA({ type, title, text }) {
  return (
    <div className="sla-item d-flex gap-3 py-3">
      <div className={`sla-dot ${type} mt-1`} />

      <div>
        <strong>{title}</strong> — {text}
      </div>
    </div>
  );
}

export default Track;
