import { useState } from "react";
import { useNavigate } from "react-router";

import DashboardLayout from "../../layouts/DashboardLayout";
import teamLeaderSidebarItems from "./teamLeaderSidebarItems";
import "./MyTeam.css";

const initialMembers = [
  {
    id: 1,
    name: "[Student Name]",
    major: "Software Engineering",
    role: "Team Leader",
    joinDate: "02 Apr 2026",
    status: "Active",
  },
  {
    id: 2,
    name: "[Current User]",
    major: "Computer Science",
    role: "Developer",
    joinDate: "08 Apr 2026",
    status: "Active",
  },
  {
    id: 3,
    name: "[Student Name]",
    major: "Integrated Design",
    role: "UX Designer",
    joinDate: "12 Apr 2026",
    status: "Active",
  },
];

export default function MyTeam() {
  const navigate = useNavigate();

  const [members, setMembers] = useState(initialMembers);
  const [selectedMember, setSelectedMember] = useState(null);
  const [role, setRole] = useState("");

  const openRoleModal = (member) => {
    setSelectedMember(member);
    setRole(member.role);
  };

  const closeRoleModal = () => {
    setSelectedMember(null);
    setRole("");
  };

  const confirmRoleChange = () => {
    setMembers((currentMembers) =>
      currentMembers.map((member) =>
        member.id === selectedMember.id
          ? { ...member, role }
          : member,
      ),
    );

    closeRoleModal();
  };

  return (
    <DashboardLayout
      activeArea="Manage a Team"
      sidebarItems={teamLeaderSidebarItems}
    >
      <section className="my-team-page">
        <header className="my-team-heading">
          <h1>My Team</h1>
          <p>Manage your team members, roles, and team progress.</p>
        </header>

        <div className="team-select-wrapper">
          <label htmlFor="team-select">Team</label>

          <select id="team-select" defaultValue="campus-innovators">
            <option value="campus-innovators">
              Campus Innovators
            </option>
          </select>
        </div>

        <section className="team-overview-card">
          <div className="team-overview-item">
            <span>Team name</span>
            <strong>Campus Innovators</strong>
          </div>

          <div className="team-overview-item">
            <span>Project title</span>
            <strong>AI-Based Smart Campus Assistant</strong>
          </div>

          <div className="team-overview-item">
            <span>Course</span>
            <strong>SWE 363 · Section 02</strong>
          </div>

          <div className="team-overview-item">
            <span>Members</span>
            <strong>3 of 5</strong>
          </div>

          <div className="team-overview-item team-progress-item">
            <span>Team progress</span>
            <strong>45%</strong>

            <div className="progress-track">
              <div className="progress-value" />
            </div>
          </div>
        </section>

        <div className="team-table-wrapper">
          <table className="team-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Major</th>
                <th>Assigned Role</th>
                <th>Join Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {members.map((member) => (
                <tr key={member.id}>
                  <td>{member.name}</td>
                  <td>{member.major}</td>
                  <td>{member.role}</td>
                  <td>{member.joinDate}</td>

                  <td>
                    <span className="member-status">
                      {member.status}
                    </span>
                  </td>

                  <td>
                    <div className="team-actions">
                      <button
                        type="button"
                        onClick={() =>
                          navigate("/applicant-profile")
                        }
                      >
                        View Profile
                      </button>

                      <button
                        type="button"
                        onClick={() => openRoleModal(member)}
                      >
                        Change Role
                      </button>

                      <button
                        type="button"
                        className="remove-member-button"
                      >
                        Remove Member
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          type="button"
          className="open-updates-button"
          onClick={() => navigate("/team-updates")}
        >
          Open Team Updates
        </button>
      </section>

      {selectedMember && (
        <div className="role-modal-overlay" onClick={closeRoleModal}>
          <div
            className="role-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="role-modal-close"
              onClick={closeRoleModal}
            >
              ×
            </button>

            <h2>Change member role</h2>

            <label htmlFor="assigned-role">Assigned Role</label>

            <input
              id="assigned-role"
              type="text"
              value={role}
              onChange={(event) => setRole(event.target.value)}
            />

            <div className="role-modal-actions">
              <button
                type="button"
                className="role-confirm-button"
                onClick={confirmRoleChange}
              >
                Confirm
              </button>

              <button
                type="button"
                className="role-cancel-button"
                onClick={closeRoleModal}
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