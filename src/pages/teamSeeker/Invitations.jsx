import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  CalendarDays,
  Check,
  Mail,
  UserRound,
  Users,
  X,
} from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";
import teamSeekerSidebarItems from "./teamSeekerSidebarItems";
import "./Invitations.css";

const initialInvitations = [
  {
    id: 1,
    teamId: 3,
    team: "Green Campus Team",
    opportunity: "Sustainable Campus Innovation Challenge",
    leader: "Layan Alharbi",
    role: "Product Designer",
    receivedOn: "20 Apr 2026",
    expiresOn: "27 Apr 2026",
    status: "Pending",
    message:
      "Your profile and design experience match the role we need. We would be happy to have you join our team.",
  },
  {
    id: 2,
    teamId: 2,
    team: "Data Explorers",
    opportunity: "Machine Learning for Student Success",
    leader: "Fahad Alotaibi",
    role: "Data Analyst",
    receivedOn: "15 Apr 2026",
    expiresOn: "22 Apr 2026",
    status: "Accepted",
    message:
      "We reviewed your profile and believe your data-analysis skills would be a strong addition to the team.",
  },
  {
    id: 3,
    teamId: 4,
    team: "Secure Minds",
    opportunity: "Cybersecurity Awareness Platform",
    leader: "Abdullah Alzahrani",
    role: "Content Writer",
    receivedOn: "10 Apr 2026",
    expiresOn: "17 Apr 2026",
    status: "Declined",
    message:
      "We are looking for someone interested in cybersecurity education and technical writing.",
  },
];

const tabs = ["All", "Pending", "Accepted", "Declined"];

export default function Invitations() {
  const navigate = useNavigate();

  const [invitations, setInvitations] =
    useState(initialInvitations);
  const [activeTab, setActiveTab] = useState("All");
  const [selectedInvitation, setSelectedInvitation] =
    useState(null);
  const [decision, setDecision] = useState("");
  const [feedback, setFeedback] = useState("");

  const filteredInvitations = useMemo(() => {
    if (activeTab === "All") return invitations;

    return invitations.filter(
      (invitation) => invitation.status === activeTab,
    );
  }, [activeTab, invitations]);

  const openDecisionModal = (invitation, nextDecision) => {
    setSelectedInvitation(invitation);
    setDecision(nextDecision);
  };

  const closeDecisionModal = () => {
    setSelectedInvitation(null);
    setDecision("");
  };

  const confirmDecision = () => {
    const nextStatus =
      decision === "accept" ? "Accepted" : "Declined";

    setInvitations((currentInvitations) =>
      currentInvitations.map((invitation) =>
        invitation.id === selectedInvitation.id
          ? { ...invitation, status: nextStatus }
          : invitation,
      ),
    );

    setFeedback(
      decision === "accept"
        ? `Invitation from ${selectedInvitation.team} accepted.`
        : `Invitation from ${selectedInvitation.team} declined.`,
    );

    closeDecisionModal();
  };

  return (
    <DashboardLayout
      activeArea="Find a Team"
      sidebarItems={teamSeekerSidebarItems}
    >
      <section className="invitations-page">
        <header className="invitations-heading">
          <h1>Invitations</h1>
          <p>
            Review invitations from team leaders and respond before
            they expire.
          </p>
        </header>

        {feedback && (
          <div className="invitation-feedback" role="status">
            <Check size={18} />
            <span>{feedback}</span>

            <button
              type="button"
              aria-label="Dismiss notification"
              onClick={() => setFeedback("")}
            >
              ×
            </button>
          </div>
        )}

        <div className="invitation-tabs">
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

        <div className="invitation-list">
          {filteredInvitations.map((invitation) => (
            <article
              className="invitation-card"
              key={invitation.id}
            >
              <div className="invitation-card-main">
                <div className="invitation-icon">
                  <Mail size={23} />
                </div>

                <div className="invitation-content">
                  <div className="invitation-title-row">
                    <h2>{invitation.team}</h2>

                    <span
                      className={`invitation-status invitation-${invitation.status.toLowerCase()}`}
                    >
                      {invitation.status}
                    </span>
                  </div>

                  <p className="invitation-opportunity">
                    {invitation.opportunity}
                  </p>

                  <p className="invitation-message">
                    “{invitation.message}”
                  </p>

                  <div className="invitation-meta">
                    <span>
                      <UserRound size={16} />
                      Invited by {invitation.leader}
                    </span>

                    <span>
                      <Users size={16} />
                      Role: {invitation.role}
                    </span>

                    <span>
                      <CalendarDays size={16} />
                      Expires {invitation.expiresOn}
                    </span>
                  </div>
                </div>
              </div>

              <div className="invitation-actions">
                <button
                  type="button"
                  className="view-invited-team-button"
                  onClick={() =>
                    navigate(
                      `/team-details?id=${invitation.teamId}`,
                    )
                  }
                >
                  View Team
                </button>

                {invitation.status === "Pending" && (
                  <>
                    <button
                      type="button"
                      className="decline-invitation-button"
                      onClick={() =>
                        openDecisionModal(invitation, "decline")
                      }
                    >
                      <X size={17} />
                      Decline
                    </button>

                    <button
                      type="button"
                      className="accept-invitation-button"
                      onClick={() =>
                        openDecisionModal(invitation, "accept")
                      }
                    >
                      <Check size={17} />
                      Accept
                    </button>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>

        {filteredInvitations.length === 0 && (
          <div className="invitation-empty-state">
            <Mail size={34} />
            <h2>No invitations found</h2>
            <p>
              You do not have any invitations with this status.
            </p>
          </div>
        )}
      </section>

      {selectedInvitation && decision && (
        <div
          className="invitation-modal-backdrop"
          onClick={closeDecisionModal}
        >
          <div
            className="invitation-modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="invitation-decision-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="invitation-decision-title">
              {decision === "accept"
                ? "Accept Invitation?"
                : "Decline Invitation?"}
            </h2>

            <p>
              {decision === "accept"
                ? `You will join ${selectedInvitation.team} as ${selectedInvitation.role}.`
                : `The invitation from ${selectedInvitation.team} will be marked as declined.`}
            </p>

            <div className="invitation-modal-actions">
              <button
                type="button"
                className="invitation-cancel-button"
                onClick={closeDecisionModal}
              >
                Cancel
              </button>

              <button
                type="button"
                className={
                  decision === "accept"
                    ? "confirm-accept-button"
                    : "confirm-decline-button"
                }
                onClick={confirmDecision}
              >
                {decision === "accept"
                  ? "Accept Invitation"
                  : "Decline Invitation"}
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}