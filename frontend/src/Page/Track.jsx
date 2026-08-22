import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Css/Track.css";
import Footer from "../Component/Footer";

function Track() {
  const [complaintId, setComplaintId] = useState("");
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState("");

  const complaints = {
    "WO-1049": {
      title: "Ceiling fan not working",
      location: "Block C, Room 214",
      category: "Electrical",
      priority: "High",
      status: "Open",
      statusClass: "open",
      date: "Aug 12, 2026",
      technician: "Unassigned",
      progress: 10,
      eta: "Aug 13, 2026 (target)",
      reporter: "Student (22CS1042)",
      contact: "Maintenance Desk: ext. 204",

      description:
        "Fan makes a grinding noise and stopped spinning yesterday evening. Reported as high priority due to ongoing heat.",

      photos: [],
      remarks: [],

      timeline: [
        {
          label: "Complaint Submitted",
          time: "Aug 12, 9:14 AM",
          note: "Filed by student — category: Electrical, priority: High.",
          state: "done",
        },
        {
          label: "Under Review",
          time: "Aug 12, 11:40 AM",
          note: "Awaiting assignment to a technician.",
          state: "current",
        },
        {
          label: "Assigned to Technician",
          time: "—",
          note: "",
          state: "pending",
        },
        {
          label: "Work In Progress",
          time: "—",
          note: "",
          state: "pending",
        },
        {
          label: "Resolved",
          time: "—",
          note: "",
          state: "pending",
        },
      ],

      activity: [
        {
          time: "Aug 12, 9:14 AM",
          text: "Priya S. submitted this complaint.",
        },
        {
          time: "Aug 12, 11:40 AM",
          text: "Admin marked priority as High and flagged for urgent review.",
        },
      ],
    },

    "WO-1046": {
      title: "Wi-Fi keeps dropping",
      location: "Library, 2nd Floor",
      category: "Wi-Fi / Network",
      priority: "Medium",
      status: "In Progress",
      statusClass: "progress",
      date: "Aug 9, 2026",
      technician: "R. Nair (Network Team)",
      progress: 55,
      eta: "Aug 12, 2026 (target)",
      reporter: "Student (21IT0987)",
      contact: "R. Nair: ext. 118",

      description:
        "Connection drops every 10–15 minutes near the reading area, affecting multiple students during peak hours.",

      photos: [
        {
          url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=300&h=225&fit=crop",
          caption: "Router — submitted",
        },
      ],

      remarks: [
        {
          author: "R. Nair",
          role: "Network Technician",
          time: "Aug 11, 10:30 AM",
          text: "Checked signal logs — access point AP-L204 is dropping connections under load. Ordered a replacement unit; expected to arrive tomorrow.",
        },
        {
          author: "R. Nair",
          role: "Network Technician",
          time: "Aug 10, 9:20 AM",
          text: "Visited the site and confirmed the issue is isolated to the reading area, not the whole library.",
        },
      ],

      timeline: [
        {
          label: "Complaint Submitted",
          time: "Aug 9, 2:02 PM",
          note: "Filed by student — category: Wi-Fi / Network, priority: Medium.",
          state: "done",
        },
        {
          label: "Under Review",
          time: "Aug 9, 4:15 PM",
          note: "Reviewed by admin and confirmed as a recurring issue.",
          state: "done",
        },
        {
          label: "Assigned to Technician",
          time: "Aug 10, 9:00 AM",
          note: "Assigned to R. Nair, Network Team.",
          state: "done",
        },
        {
          label: "Work In Progress",
          time: "Aug 11, 10:30 AM",
          note: "Access point in the reading area identified as faulty; replacement ordered.",
          state: "current",
        },
        {
          label: "Resolved",
          time: "—",
          note: "",
          state: "pending",
        },
      ],

      activity: [
        {
          time: "Aug 9, 2:02 PM",
          text: "Arjun M. submitted this complaint.",
        },
        {
          time: "Aug 9, 4:15 PM",
          text: "Admin confirmed this as a recurring issue and set priority to Medium.",
        },
        {
          time: "Aug 10, 9:00 AM",
          text: "Admin assigned this ticket to R. Nair (Network Team).",
        },
        {
          time: "Aug 10, 9:20 AM",
          text: "R. Nair added a remark after site visit.",
        },
        {
          time: "Aug 11, 10:30 AM",
          text: "R. Nair updated progress to 55% — replacement part ordered.",
        },
      ],
    },

    "WO-1038": {
      title: "Leaking tap in washroom",
      location: "Block C, 2nd Floor",
      category: "Plumbing",
      priority: "Medium",
      status: "Resolved",
      statusClass: "resolved",
      date: "Aug 3, 2026",
      technician: "S. Verma (Maintenance)",
      progress: 100,
      eta: "Resolved on Aug 5, 2026",
      reporter: "Student (23ME1120)",
      contact: "S. Verma: ext. 132",

      description:
        "Tap was replaced and tested — no further leakage observed after 48 hours of monitoring.",

      photos: [
        {
          url: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=300&h=225&fit=crop",
          caption: "Before repair",
        },
        {
          url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&h=225&fit=crop",
          caption: "After repair",
        },
      ],

      remarks: [
        {
          author: "S. Verma",
          role: "Plumbing Technician",
          time: "Aug 5, 5:30 PM",
          text: "Replaced the tap washer and fitting. Ran a 48-hour leak test — no issues found. Marking as resolved.",
        },
        {
          author: "S. Verma",
          role: "Plumbing Technician",
          time: "Aug 4, 9:15 AM",
          text: "Inspected the tap — worn washer confirmed as the cause. Replacement part fitted same day.",
        },
      ],

      timeline: [
        {
          label: "Complaint Submitted",
          time: "Aug 3, 8:20 AM",
          note: "Filed by student — category: Plumbing, priority: Medium.",
          state: "done",
        },
        {
          label: "Under Review",
          time: "Aug 3, 10:05 AM",
          note: "Reviewed and approved for assignment.",
          state: "done",
        },
        {
          label: "Assigned to Technician",
          time: "Aug 3, 1:00 PM",
          note: "Assigned to S. Verma, Maintenance.",
          state: "done",
        },
        {
          label: "Work In Progress",
          time: "Aug 4, 9:15 AM",
          note: "Tap replaced; leak test in progress.",
          state: "done",
        },
        {
          label: "Resolved",
          time: "Aug 5, 5:30 PM",
          note: "Confirmed fixed. Awaiting student feedback.",
          state: "done",
        },
      ],

      activity: [
        {
          time: "Aug 3, 8:20 AM",
          text: "Neha K. submitted this complaint.",
        },
        {
          time: "Aug 3, 10:05 AM",
          text: "Admin reviewed and approved for assignment.",
        },
        {
          time: "Aug 3, 1:00 PM",
          text: "Admin assigned this ticket to S. Verma (Maintenance).",
        },
        {
          time: "Aug 4, 9:15 AM",
          text: "S. Verma inspected the site and began repair.",
        },
        {
          time: "Aug 5, 5:30 PM",
          text: "S. Verma marked this complaint as Resolved.",
        },
      ],
    },
  };

  // SEARCH COMPLAINT
  const trackComplaint = () => {
    const id = complaintId.trim().toUpperCase();

    if (!id) {
      setComplaint(null);
      setError("Please enter a complaint ID.");
      return;
    }

    if (complaints[id]) {
      setComplaint(complaints[id]);
      setComplaintId(id);
      setError("");

      setTimeout(() => {
        document.getElementById("result")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    } else {
      setComplaint(null);
      setError(
        "No complaint found with that ID. Double-check the ticket number and try again.",
      );
    }
  };

  // SAMPLE COMPLAINT
  const fillAndTrack = (id) => {
    setComplaintId(id);
    setComplaint(complaints[id]);
    setError("");

    setTimeout(() => {
      document.getElementById("result")?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
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
                placeholder="e.g. WO-1049"
                maxLength="12"
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
                onClick={trackComplaint}
              >
                Track →
              </button>
            </div>
          </div>

          {/* SAMPLE IDS */}
          <div className="search-hint mt-2">
            Try a sample:
            <button
              className="sample-btn"
              onClick={() => fillAndTrack("WO-1049")}
            >
              WO-1049
            </button>
            ,
            <button
              className="sample-btn"
              onClick={() => fillAndTrack("WO-1046")}
            >
              WO-1046
            </button>
            or
            <button
              className="sample-btn"
              onClick={() => fillAndTrack("WO-1038")}
            >
              WO-1038
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

                  <h2 className="result-title mb-1">{complaint.title}</h2>

                  <div className="result-location">{complaint.location}</div>
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

                <Meta label="Assigned To" value={complaint.technician} />
              </div>

              {/* DESCRIPTION */}
              <div className="result-description p-4">
                <strong>Description:</strong> {complaint.description}
              </div>

              {/* EXTRA INFO */}
              <div className="result-meta-row row g-0">
                <Meta label="Complaint ID Ref" value={`${complaintId}-2026`} />

                <Meta label="Est. Resolution" value={complaint.eta} />

                <Meta label="Reported By" value={complaint.reporter} />

                <Meta label="Contact" value={complaint.contact} />
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

                    <div className="photo-caption">{photo.caption}</div>
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

                      <span className="search-hint">{remark.time}</span>
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

            <div className="timeline ps-4 mb-4 ">
              {complaint.timeline.map((item, index) => (
                <div className={`timeline-item ${item.state} pb-4`} key={index}>
                  <div className="timeline-dot">
                    {item.state === "done" && "✓"}

                    {item.state === "current" && "•"}
                  </div>

                  <div>
                    <div className="d-flex justify-content-between align-items-baseline gap-2">
                      <h4 className="mb-0">{item.label}</h4>

                      <span className="search-hint">{item.time}</span>
                    </div>

                    {item.note && <p className="mb-0 mt-1">{item.note}</p>}
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
