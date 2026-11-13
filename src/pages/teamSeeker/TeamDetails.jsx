import { useNavigate, useSearchParams } from "react-router";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock,
  UserRound,
  Users,
} from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";
import teamSeekerSidebarItems from "./teamSeekerSidebarItems";
import "./TeamDetails.css";

const teamDetails = {
  1: {
    id: 1,
    name: "Smart Campus Innovators",
    opportunity: "AI-Based Smart Campus Assistant",
    leader: "Noura Alqahtani",
    description:
      "We are developing an intelligent campus assistant that helps KFUPM students find services, academic resources, and important university information.",
    members: ["Noura Alqahtani", "Omar Alshehri", "Reem Almutairi"],
    capacity: 5,
    roles: ["Frontend Developer", "UI/UX Designer"],
    skills: ["React", "UI/UX", "Python"],
    meeting: "Sunday and Tuesday, 6:00 PM",
    deadline: "30 Apr 2026",
  },
  2: {
    id: 2,
    name: "Data Explorers",
    opportunity: "Machine Learning for Student Success",
    leader: "Fahad Alotaibi",
    description:
      "Our research team is studying student-learning patterns and presenting insights through responsible machine learning and data visualization.",
    members: ["Fahad Alotaibi", "Maha Alqahtani"],
    capacity: 4,
    roles: ["Machine Learning Developer", "Data Analyst"],
    skills: ["Machine Learning", "Data Analysis", "Python"],
    meeting: "Monday and Wednesday, 5:30 PM",
    deadline: "12 May 2026",
  },
  3: {
    id: 3,
    name: "Green Campus Team",
    opportunity: "Sustainable Campus Innovation Challenge",
    leader: "Layan Alharbi",
    description:
      "We are creating a practical sustainability solution to improve student life and reduce environmental impact across the campus.",
    members: [
      "Layan Alharbi",
      "Sara Alotaibi",
      "Khalid Alshammari",
      "Rana Alzahrani",
    ],
    capacity: 6,
    roles: ["Product Designer", "Presentation Specialist"],
    skills: ["Problem Solving", "Presentation", "Design"],
    meeting: "Saturday and Tuesday, 7:00 PM",
    deadline: "18 May 2026",
  },
  4: {
    id: 4,
    name: "Secure Minds",
    opportunity: "Cybersecurity Awareness Platform",
    leader: "Abdullah Alzahrani",
    description:
      "We are building an interactive platform that teaches students how to recognize and avoid common cybersecurity threats.",
    members: ["Abdullah Alzahrani", "Yousef Alharbi"],
    capacity: 5,
    roles: ["Frontend Developer", "Content Writer"],
    skills: ["Cybersecurity", "JavaScript", "Content Writing"],
    meeting: "Sunday and Thursday, 6:30 PM",
    deadline: "25 May 2026",
  },
};

export default function TeamDetails() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const teamId = searchParams.get("id") || "1";
  const team = teamDetails[teamId] || teamDetails[1];
  const availablePositions = team.capacity - team.members.length;

  return (
    <DashboardLayout
      activeArea="Find a Team"
      sidebarItems={teamSeekerSidebarItems}
    >
      <section className="team-details-page">
        <button
          type="button"
          className="back-to-teams-button"
          onClick={() => navigate("/find-teams")}
        >
          <ArrowLeft size={18} />
          Back to Teams
        </button>

        <header className="team-details-header">
          <div>
            <div className="team-title-row">
              <h1>{team.name}</h1>
              <span>Open</span>
            </div>

            <p className="details-opportunity-name">
              {team.opportunity}
            </p>
          </div>

          <button
            type="button"
            className="apply-team-button"
            onClick={() =>
              navigate(`/apply-to-team?team=${team.id}`)
            }
          >
            Apply to Join
          </button>
        </header>

        <div className="team-summary-grid">
          <article className="team-summary-card">
            <Users size={22} />
            <div>
              <strong>
                {team.members.length} of {team.capacity}
              </strong>
              <span>Current members</span>
            </div>
          </article>

          <article className="team-summary-card">
            <UserRound size={22} />
            <div>
              <strong>{team.leader}</strong>
              <span>Team leader</span>
            </div>
          </article>

          <article className="team-summary-card">
            <CheckCircle2 size={22} />
            <div>
              <strong>{availablePositions}</strong>
              <span>Available positions</span>
            </div>
          </article>
        </div>

        <div className="team-details-layout">
          <div className="team-details-main">
            <article className="details-content-card">
              <h2>About the Team</h2>
              <p>{team.description}</p>
            </article>

            <article className="details-content-card">
              <h2>Open Roles</h2>

              <div className="open-role-list">
                {team.roles.map((role) => (
                  <div className="open-role-item" key={role}>
                    <CheckCircle2 size={19} />
                    <div>
                      <strong>{role}</strong>
                      <span>
                        The team is currently accepting applications
                        for this role.
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="details-content-card">
              <h2>Current Members</h2>

              <div className="current-member-list">
                {team.members.map((member, index) => (
                  <div className="current-member" key={member}>
                    <span className="member-avatar">
                      {member
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)}
                    </span>

                    <div>
                      <strong>{member}</strong>
                      <span>
                        {index === 0 ? "Team Leader" : "Team Member"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <aside className="team-details-sidebar">
            <article className="details-content-card">
              <h2>Team Information</h2>

              <div className="team-detail-item">
                <CalendarDays size={19} />
                <div>
                  <strong>Opportunity Deadline</strong>
                  <span>{team.deadline}</span>
                </div>
              </div>

              <div className="team-detail-item">
                <Clock size={19} />
                <div>
                  <strong>Meeting Schedule</strong>
                  <span>{team.meeting}</span>
                </div>
              </div>
            </article>

            <article className="details-content-card">
              <h2>Preferred Skills</h2>

              <div className="details-skill-list">
                {team.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </article>
          </aside>
        </div>
      </section>
    </DashboardLayout>
  );
}