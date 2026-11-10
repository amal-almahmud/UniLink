import { UserRound } from "lucide-react";
import { useNavigate } from "react-router";

import DashboardLayout from "../../layouts/DashboardLayout";
import teamLeaderSidebarItems from "./teamLeaderSidebarItems";
import "./ApplicantProfile.css";

function ApplicantProfile() {
  const navigate = useNavigate();

  return (
    <DashboardLayout
      activeArea="Manage a Team"
      sidebarItems={teamLeaderSidebarItems}
    >
      <section className="applicant-profile-page">
        <div className="profile-breadcrumb">
          <button
            type="button"
            onClick={() =>
              navigate("/applications-management")
            }
          >
            Applications Management
          </button>

          <span>›</span>
          <span>Applicant Profile</span>
        </div>

        <header className="page-heading">
          <h1>Applicant Profile</h1>
          <p>
            Review only the information needed to assess team fit.
          </p>
        </header>

        <section className="applicant-profile-card">
          <div className="applicant-profile-header">
            <div className="applicant-identity">
              <div className="applicant-avatar">
                <UserRound size={32} />
              </div>

              <div>
                <h2>[Student Name]</h2>
                <p>Software Engineering · Junior</p>
              </div>
            </div>

            <span className="status-badge status-pending">
              Pending
            </span>
          </div>

          <div className="applicant-profile-divider" />

          <div className="applicant-information-grid">
            <div className="applicant-information-item">
              <h3>Skills</h3>
              <p>Figma, user research, prototyping</p>
            </div>

            <div className="applicant-information-item">
              <h3>Interests</h3>
              <p>Accessible technology, campus services</p>
            </div>

            <div className="applicant-information-item">
              <h3>Experience</h3>
              <p>Designed a course project dashboard</p>
            </div>

            <div className="applicant-information-item">
              <h3>Motivation</h3>
              <p>
                I want to make campus services easier to navigate.
              </p>
            </div>

            <div className="applicant-information-item">
              <h3>Applied role</h3>
              <p>UX Designer</p>
            </div>

            <div className="applicant-information-item">
              <h3>Application date</h3>
              <p>18 Apr 2026</p>
            </div>
          </div>

          <div className="applicant-profile-actions">
            <button
              type="button"
              className="primary-button"
            >
              Accept Applicant
            </button>

            <button
              type="button"
              className="reject-button"
            >
              Reject Applicant
            </button>

            <button
              type="button"
              className="outline-button"
              onClick={() =>
                navigate("/applications-management")
              }
            >
              Back
            </button>
          </div>
        </section>
      </section>
    </DashboardLayout>
  );
}

export default ApplicantProfile;