import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import DashboardLayout from "../../layouts/DashboardLayout";
import teamLeaderSidebarItems from "./teamLeaderSidebarItems";
import "./MyOpportunities.css";

const opportunities = [
  {
    id: 1,
    title: "AI-Based Smart Campus Assistant",
    type: "Course Project",
    deadline: "30 Apr 2026",
    applications: 4,
    status: "Open",
    description:
      "Design an intelligent assistant that helps KFUPM students navigate campus services and academic resources.",
    goals:
      "Investigate a real campus challenge using responsible AI and build a clear working concept.",
  },
  {
    id: 2,
    title: "AI Interface Research Group",
    type: "Research Activity",
    deadline: "12 May 2026",
    applications: 0,
    status: "Draft",
    description:
      "Explore responsible machine learning models that identify patterns in student learning and engagement.",
    goals:
      "Study student success patterns and communicate research findings.",
  },
  {
    id: 3,
    title: "Campus Service Redesign",
    type: "Competition",
    deadline: "10 Mar 2026",
    applications: 8,
    status: "Completed",
    description:
      "Redesign a campus service experience and present an improved student-centered solution.",
    goals:
      "Improve usability, accessibility, and student satisfaction.",
  },
];

const tabs = [
  "All",
  "Drafts",
  "Open",
  "Closed",
  "Completed",
  "Withdrawn",
];

export default function MyOpportunities() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("All");
  const [rows, setRows] = useState(opportunities);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const filteredRows = useMemo(() => {
    if (activeTab === "All") {
      return rows;
    }

    const status = activeTab.replace("s", "");

    return rows.filter(
      (opportunity) =>
        opportunity.status.toLowerCase() === status.toLowerCase(),
    );
  }, [activeTab, rows]);

  const openModal = (type, opportunity) => {
    setModalType(type);
    setSelectedOpportunity(opportunity);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedOpportunity(null);
    setNewStatus("");
  };

  const confirmWithdraw = () => {
    setRows((currentRows) =>
      currentRows.map((opportunity) =>
        opportunity.id === selectedOpportunity.id
          ? { ...opportunity, status: "Withdrawn" }
          : opportunity,
      ),
    );

    closeModal();
  };

  const confirmStatusChange = () => {
    if (!newStatus) return;

    setRows((currentRows) =>
      currentRows.map((opportunity) =>
        opportunity.id === selectedOpportunity.id
          ? { ...opportunity, status: newStatus }
          : opportunity,
      ),
    );

    closeModal();
  };

  return (
    <DashboardLayout
      activeArea="Manage a Team"
      sidebarItems={teamLeaderSidebarItems}
    >
      <section className="my-opportunities-page">
        <header className="opportunities-heading">
          <div>
            <h1>My Opportunities</h1>
            <p>
              Create, update, and manage your team opportunities.
            </p>
          </div>

          <button
            type="button"
            className="primary-button"
            onClick={() => navigate("/create-team-opportunity")}
          >
            Create Opportunity
          </button>
        </header>

        <div className="opportunity-tabs">
          {tabs.map((tab) => (
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

        <div className="opportunities-table-wrapper">
          <table className="opportunities-table">
            <thead>
              <tr>
                <th>Opportunity Title</th>
                <th>Type</th>
                <th>Deadline</th>
                <th>Applications</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredRows.map((opportunity) => (
                <tr key={opportunity.id}>
                  <td className="title-cell">
                    {opportunity.title}
                  </td>

                  <td>{opportunity.type}</td>
                  <td>{opportunity.deadline}</td>
                  <td>{opportunity.applications}</td>

                  <td>
                    <span
                      className={`status-badge status-${opportunity.status.toLowerCase()}`}
                    >
                      {opportunity.status}
                    </span>
                  </td>

                  <td>
                    <div className="opportunity-actions">
                      <button
                        type="button"
                        onClick={() =>
                          openModal("view", opportunity)
                        }
                      >
                        View
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/edit-opportunity?id=${opportunity.id}`,
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/applications-management?opportunity=${opportunity.id}`,
                          )
                        }
                      >
                        Manage Applications
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          openModal("status", opportunity)
                        }
                      >
                        Change Status
                      </button>

                      <button
                        type="button"
                        className="danger-action"
                        onClick={() =>
                          openModal("withdraw", opportunity)
                        }
                      >
                        Withdraw
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredRows.length === 0 && (
                <tr>
                  <td colSpan="6" className="empty-row">
                    No opportunities in this category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="page-note">
          View opens the opportunity details. Other actions open their
          related pages or dialogs.
        </p>
      </section>

      {selectedOpportunity && modalType === "view" && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div
            className="modal-card opportunity-details-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              onClick={closeModal}
            >
              ×
            </button>

            <h2>{selectedOpportunity.title}</h2>

            <p>
              <strong>Type:</strong>{" "}
              {selectedOpportunity.type}
            </p>

            <p>
              <strong>Deadline:</strong>{" "}
              {selectedOpportunity.deadline}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {selectedOpportunity.status}
            </p>

            <p>
              <strong>Description:</strong>{" "}
              {selectedOpportunity.description}
            </p>

            <p>
              <strong>Goals:</strong>{" "}
              {selectedOpportunity.goals}
            </p>

            <p>
              <strong>Applications:</strong>{" "}
              {selectedOpportunity.applications}
            </p>

            <div className="owner-warning">
              You manage this opportunity, so applications are not
              available in owner view.
            </div>
          </div>
        </div>
      )}

      {selectedOpportunity && modalType === "status" && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div
            className="modal-card"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              onClick={closeModal}
            >
              ×
            </button>

            <h2>Change Opportunity Status</h2>

            <select
              value={newStatus}
              onChange={(event) => setNewStatus(event.target.value)}
            >
              <option value="">Select new status</option>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
              <option value="Completed">Completed</option>
            </select>

            <div className="modal-actions">
              <button
                type="button"
                className="primary-button"
                onClick={confirmStatusChange}
              >
                Confirm
              </button>

              <button
                type="button"
                className="outline-button"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedOpportunity && modalType === "withdraw" && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div
            className="modal-card"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              onClick={closeModal}
            >
              ×
            </button>

            <h2>Withdraw opportunity?</h2>

            <p>
              This opportunity will be removed from the active public
              directory. This action can be reviewed later.
            </p>

            <div className="modal-actions">
              <button
                type="button"
                className="danger-button"
                onClick={confirmWithdraw}
              >
                Confirm Withdrawal
              </button>

              <button
                type="button"
                className="outline-button"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}