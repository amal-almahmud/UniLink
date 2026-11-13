import { useMemo, useState } from "react";
import {
  CalendarDays,
  Eye,
  Users,
  XCircle,
} from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";
import teamSeekerSidebarItems from "./teamSeekerSidebarItems";
import "./MyApplications.css";

const initialApplications = [
  {
    id: 1,
    team: "Smart Campus Innovators",
    opportunity: "AI-Based Smart Campus Assistant",
    role: "Frontend Developer",
    appliedOn: "18 Apr 2026",
    status: "Pending",
    message:
      "I want to contribute my React experience and improve my teamwork skills.",
  },
  {
    id: 2,
    team: "Data Explorers",
    opportunity: "Machine Learning for Student Success",
    role: "Data Analyst",
    appliedOn: "12 Apr 2026",
    status: "Accepted",
    message:
      "I have completed data analysis coursework and worked with Python and visualization tools.",
  },
  {
    id: 3,
    team: "Secure Minds",
    opportunity: "Cybersecurity Awareness Platform",
    role: "Content Writer",
    appliedOn: "8 Apr 2026",
    status: "Rejected",
    message:
      "I am interested in cybersecurity awareness and technical content writing.",
  },
];

const tabs = [
  "All",
  "Pending",
  "Accepted",
  "Rejected",
  "Withdrawn",
];

export default function MyApplications() {
  const [applications, setApplications] =
    useState(initialApplications);
  const [activeTab, setActiveTab] = useState("All");
  const [selectedApplication, setSelectedApplication] =
    useState(null);
  const [modalType, setModalType] = useState(null);

  const filteredApplications = useMemo(() => {
    if (activeTab === "All") return applications;

    return applications.filter(
      (application) => application.status === activeTab,
    );
  }, [activeTab, applications]);

  const openModal = (type, application) => {
    setModalType(type);
    setSelectedApplication(application);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedApplication(null);
  };

  const confirmWithdrawal = () => {
    setApplications((currentApplications) =>
      currentApplications.map((application) =>
        application.id === selectedApplication.id
          ? { ...application, status: "Withdrawn" }
          : application,
      ),
    );

    closeModal();
  };

  return (
    <DashboardLayout
      activeArea="Find a Team"
      sidebarItems={teamSeekerSidebarItems}
    >
      <section className="my-applications-page">
        <header className="my-applications-heading">
          <h1>My Applications</h1>
          <p>
            Track the status of your team applications and review
            your submitted information.
          </p>
        </header>

        <div className="application-tabs">
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="applications-list">
          {filteredApplications.map((application) => (
            <article
              className="application-list-card"
              key={application.id}
            >
              <div className="application-list-main">
                <div className="application-team-icon">
                  <Users size={22} />
                </div>

                <div>
                  <div className="application-title-row">
                    <h2>{application.team}</h2>

                    <span
                      className={`application-status status-${application.status.toLowerCase()}`}
                    >
                      {application.status}
                    </span>
                  </div>

                  <p className="application-opportunity">
                    {application.opportunity}
                  </p>

                  <div className="application-list-meta">
                    <span>
                      Role: <strong>{application.role}</strong>
                    </span>

                    <span>
                      <CalendarDays size={16} />
                      Applied on {application.appliedOn}
                    </span>
                  </div>
                </div>
              </div>

              <div className="application-list-actions">
                <button
                  type="button"
                  className="application-view-button"
                  onClick={() => openModal("view", application)}
                >
                  <Eye size={17} />
                  View
                </button>

                {application.status === "Pending" && (
                  <button
                    type="button"
                    className="application-withdraw-button"
                    onClick={() =>
                      openModal("withdraw", application)
                    }
                  >
                    <XCircle size={17} />
                    Withdraw
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>

        {filteredApplications.length === 0 && (
          <div className="applications-empty-state">
            <Users size={34} />
            <h2>No applications found</h2>
            <p>
              You do not have any applications with this status.
            </p>
          </div>
        )}
      </section>

      {selectedApplication && modalType === "view" && (
        <div
          className="applications-modal-backdrop"
          onClick={closeModal}
        >
          <div
            className="applications-modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="application-details-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="applications-modal-close"
              aria-label="Close application details"
              onClick={closeModal}
            >
              ×
            </button>

            <h2 id="application-details-title">
              Application Details
            </h2>

            <div className="application-detail-row">
              <strong>Team</strong>
              <span>{selectedApplication.team}</span>
            </div>

            <div className="application-detail-row">
              <strong>Opportunity</strong>
              <span>{selectedApplication.opportunity}</span>
            </div>

            <div className="application-detail-row">
              <strong>Role</strong>
              <span>{selectedApplication.role}</span>
            </div>

            <div className="application-detail-row">
              <strong>Status</strong>
              <span>{selectedApplication.status}</span>
            </div>

            <div className="application-detail-message">
              <strong>Submitted Message</strong>
              <p>{selectedApplication.message}</p>
            </div>
          </div>
        </div>
      )}

      {selectedApplication && modalType === "withdraw" && (
        <div
          className="applications-modal-backdrop"
          onClick={closeModal}
        >
          <div
            className="applications-modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="withdraw-application-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="withdraw-application-title">
              Withdraw Application?
            </h2>

            <p className="withdraw-warning">
              Your application to {selectedApplication.team} will be
              marked as withdrawn. This action cannot be reversed in
              the prototype.
            </p>

            <div className="applications-modal-actions">
              <button
                type="button"
                className="keep-application-button"
                onClick={closeModal}
              >
                Keep Application
              </button>

              <button
                type="button"
                className="confirm-withdraw-button"
                onClick={confirmWithdrawal}
              >
                Withdraw Application
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}