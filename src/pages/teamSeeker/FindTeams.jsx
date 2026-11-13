import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowRight,
  Plus,
  Search,
  UserRound,
  Users,
} from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";
import teamSeekerSidebarItems from "./teamSeekerSidebarItems";
import "./FindTeams.css";

const teams = [
  {
    id: 1,
    name: "Smart Campus Innovators",
    opportunity: "AI-Based Smart Campus Assistant",
    leader: "Noura Alqahtani",
    description:
      "We are building a student-focused AI assistant and need members interested in frontend development and user experience.",
    members: 3,
    capacity: 5,
    skills: ["React", "UI/UX", "Python"],
  },
  {
    id: 2,
    name: "Data Explorers",
    opportunity: "Machine Learning for Student Success",
    leader: "Fahad Alotaibi",
    description:
      "Our research team is analyzing student-learning data and looking for someone interested in machine learning and visualization.",
    members: 2,
    capacity: 4,
    skills: ["Machine Learning", "Data Analysis", "Python"],
  },
  {
    id: 3,
    name: "Green Campus Team",
    opportunity: "Sustainable Campus Innovation Challenge",
    leader: "Layan Alharbi",
    description:
      "A multidisciplinary team developing a practical sustainability solution for the KFUPM campus.",
    members: 4,
    capacity: 6,
    skills: ["Problem Solving", "Presentation", "Design"],
  },
  {
    id: 4,
    name: "Secure Minds",
    opportunity: "Cybersecurity Awareness Platform",
    leader: "Abdullah Alzahrani",
    description:
      "We are creating an interactive cybersecurity awareness platform and need help with content and frontend development.",
    members: 2,
    capacity: 5,
    skills: ["Cybersecurity", "JavaScript", "Content Writing"],
  },
];

const skillOptions = [
  "All Skills",
  "React",
  "UI/UX",
  "Python",
  "Machine Learning",
  "Data Analysis",
  "Problem Solving",
  "Presentation",
  "Design",
  "Cybersecurity",
  "JavaScript",
  "Content Writing",
];

export default function FindTeams() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("All Skills");

  const filteredTeams = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return teams.filter((team) => {
      const matchesSearch =
        team.name.toLowerCase().includes(normalizedSearch) ||
        team.opportunity.toLowerCase().includes(normalizedSearch) ||
        team.leader.toLowerCase().includes(normalizedSearch);

      const matchesSkill =
        selectedSkill === "All Skills" ||
        team.skills.includes(selectedSkill);

      return matchesSearch && matchesSkill;
    });
  }, [searchTerm, selectedSkill]);

  return (
    <DashboardLayout
      activeArea="Find a Team"
      sidebarItems={teamSeekerSidebarItems}
    >
      <section className="find-teams-page">
        <header className="find-teams-heading">
          <div>
            <h1>Find a Team</h1>
            <p>
              Browse open student teams and find one that matches
              your interests and skills.
            </p>
          </div>

          <button
            type="button"
            className="post-request-button"
            onClick={() => navigate("/publish-team-request")}
          >
            <Plus size={19} />
            Post Team Request
          </button>
        </header>

        <div className="team-filters">
          <label className="team-search-field">
            <Search size={20} aria-hidden="true" />

            <input
              type="search"
              value={searchTerm}
              placeholder="Search by team, opportunity, or leader"
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </label>

          <select
            value={selectedSkill}
            aria-label="Filter teams by required skill"
            onChange={(event) => setSelectedSkill(event.target.value)}
          >
            {skillOptions.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </div>

        <p className="team-results-summary">
          {filteredTeams.length} open teams found
        </p>

        <div className="team-card-grid">
          {filteredTeams.map((team) => (
            <article className="team-card" key={team.id}>
              <div className="team-card-header">
                <div className="team-icon">
                  <Users size={23} />
                </div>

                <span className="open-team-badge">Open</span>
              </div>

              <h2>{team.name}</h2>
              <p className="team-opportunity">{team.opportunity}</p>
              <p className="team-description">{team.description}</p>

              <div className="team-information">
                <span>
                  <UserRound size={17} />
                  Led by {team.leader}
                </span>

                <span>
                  <Users size={17} />
                  {team.members} of {team.capacity} members
                </span>
              </div>

              <div className="team-skill-list">
                {team.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>

              <button
                type="button"
                className="view-team-button"
                onClick={() =>
                  navigate(`/team-details?id=${team.id}`)
                }
              >
                View Team
                <ArrowRight size={18} />
              </button>
            </article>
          ))}
        </div>

        {filteredTeams.length === 0 && (
          <div className="team-empty-state">
            <Search size={34} />
            <h2>No teams found</h2>
            <p>
              Try using a different search term or skill filter.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setSelectedSkill("All Skills");
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </DashboardLayout>
  );
}