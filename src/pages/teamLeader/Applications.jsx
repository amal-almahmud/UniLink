import { useMemo, useState } from "react";
import { useNavigate } from "react-router";

import DashboardLayout from "../../layouts/DashboardLayout";
import teamLeaderSidebarItems from "./teamLeaderSidebarItems";
import "./Applications.css";

const initialApplications = [
  {
    id: 1,
    name: "[Student Name]",
    major: "Software Engineering",
    level: "Junior",
    role: "UX Designer",
    date: "18 Apr 2026",
    status: "Pending",
  },
];

export default function Applications() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState(
    initialApplications,
  );

  const [activeTab, setActiveTab] = useState("Pending");

  const filteredApplications = useMemo(() => {
    return applications.filter(
      (application) => application.status === activeTab,
    );
  }, [applications, activeTab]);

  const updateStatus = (id, status) => {
    setApplications((currentApplications) =>
      currentApplications.map((application) =>
        application.id === id
          ? { ...application, status }
          : application,
      ),
    );
  };

  return (
    <DashboardLayout
      activeArea="Manage a Team"
      sidebarItems={teamLeaderSidebarItems}
    >
      <section className="applications-page">
        <header className="applications-heading">
          <h1>Applications Management</h1>
          <p>
            Review students who applied to your team opportunities.
          </p>
        </header>

        <div className="application-field">
          <label htmlFor="opportunity">Opportunity</label>

          <select id="opportunity" defaultValue="smart-campus">
            <option value="smart-campus">
              AI-Based Smart Campus Assistant
            </option>
          </select>
        </div>

        <div className="application-tabs">
          {["Pending", "Accepted", "Rejected"].map((tab) => (
            <button
              key={tab}
              type="button"
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="applications-table-wrapper">
          <table className="applications-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Major</th>
                <th>Academic Level</th>
                <th>Applied Role</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredApplications.map((application) => (
                <tr key={application.id}>
                  <td>{application.name}</td>
                  <td>{application.major}</td>
                  <td>{application.level}</td>
                  <td>{application.role}</td>
                  <td>{application.date}</td>

                  <td>
                    <span
                      className={`application-status application-status-${application.status.toLowerCase()}`}
                    >
                      {application.status}
                    </span>
                  </td>

                  <td>
                    <div className="application-actions">
                      <button
                        type="button"
                        onClick={() =>
                          navigate("/applicant-profile")
                        }
                      >
                        View Profile
                      </button>

                      {application.status === "Pending" && (
                        <>
                          <button
                            type="button"
                            className="accept-button"
                            onClick={() =>
                              updateStatus(
                                application.id,
                                "Accepted",
                              )
                            }
                          >
                            Accept Applicant
                          </button>

                          <button
                            type="button"
                            className="reject-button"
                            onClick={() =>
                              updateStatus(
                                application.id,
                                "Rejected",
                              )
                            }
                          >
                            Reject Applicant
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {filteredApplications.length === 0 && (
                <tr>
                  <td colSpan="7" className="empty-applications">
                    No {activeTab.toLowerCase()} applications.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </DashboardLayout>
  );
}