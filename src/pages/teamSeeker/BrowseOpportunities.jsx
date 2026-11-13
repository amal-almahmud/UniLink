import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  Bookmark,
  BookmarkCheck,
  Building2,
  CalendarDays,
  Search,
} from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";
import teamSeekerSidebarItems from "./teamSeekerSidebarItems";
import "./BrowseOpportunities.css";

const opportunities = [
  {
    id: 1,
    title: "AI-Based Smart Campus Assistant",
    category: "Course Project",
    organizer: "ICS Department",
    deadline: "30 Apr 2026",
    description:
      "Design an intelligent assistant that helps KFUPM students navigate campus services and academic resources.",
    skills: ["React", "Python", "UI/UX"],
  },
  {
    id: 2,
    title: "Machine Learning for Student Success",
    category: "Research Activity",
    organizer: "Information and Computer Science",
    deadline: "12 May 2026",
    description:
      "Explore responsible machine learning models that identify patterns in student learning and engagement.",
    skills: ["Machine Learning", "Data Analysis", "Python"],
  },
  {
    id: 3,
    title: "Sustainable Campus Innovation Challenge",
    category: "Competition",
    organizer: "KFUPM Innovation Center",
    deadline: "18 May 2026",
    description:
      "Develop a practical solution that improves sustainability and student life across the university campus.",
    skills: ["Problem Solving", "Presentation", "Design"],
  },
  {
    id: 4,
    title: "Cybersecurity Awareness Platform",
    category: "Course Project",
    organizer: "Computer Engineering Department",
    deadline: "25 May 2026",
    description:
      "Build an interactive platform that teaches students how to recognize and avoid common cybersecurity threats.",
    skills: ["Cybersecurity", "JavaScript", "Content Writing"],
  },
  {
    id: 5,
    title: "Student Entrepreneurship Bootcamp",
    category: "Extracurricular",
    organizer: "KFUPM Entrepreneurship Institute",
    deadline: "2 Jun 2026",
    description:
      "Join a multidisciplinary team to develop and present a technology-focused startup concept.",
    skills: ["Business", "Communication", "Product Design"],
  },
  {
    id: 6,
    title: "Campus Service Redesign",
    category: "Competition",
    organizer: "Student Affairs",
    deadline: "10 Jun 2026",
    description:
      "Redesign an existing campus service to improve usability, accessibility, and student satisfaction.",
    skills: ["UI/UX", "Research", "Prototyping"],
  },
];

const categories = [
  "All Categories",
  "Course Project",
  "Research Activity",
  "Competition",
  "Extracurricular",
];

export default function BrowseOpportunities() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [activeTab, setActiveTab] = useState("All");
  const [savedIds, setSavedIds] = useState([2]);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  const filteredOpportunities = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return opportunities.filter((opportunity) => {
      const matchesSearch =
        opportunity.title.toLowerCase().includes(normalizedSearch) ||
        opportunity.organizer.toLowerCase().includes(normalizedSearch) ||
        opportunity.skills.some((skill) =>
          skill.toLowerCase().includes(normalizedSearch),
        );

      const matchesCategory =
        category === "All Categories" ||
        opportunity.category === category;

      const matchesTab =
        activeTab === "All" || savedIds.includes(opportunity.id);

      return matchesSearch && matchesCategory && matchesTab;
    });
  }, [searchTerm, category, activeTab, savedIds]);

  const toggleSaved = (opportunityId) => {
    setSavedIds((currentIds) =>
      currentIds.includes(opportunityId)
        ? currentIds.filter((id) => id !== opportunityId)
        : [...currentIds, opportunityId],
    );
  };

  return (
    <DashboardLayout
      activeArea="Find a Team"
      sidebarItems={teamSeekerSidebarItems}
    >
      <section className="browse-opportunities-page">
        <header className="browse-heading">
          <div>
            <h1>Browse Opportunities</h1>
            <p>
              Explore university projects, research activities,
              competitions, and extracurricular opportunities.
            </p>
          </div>
        </header>

        <div className="browse-tabs">
          <button
            type="button"
            className={activeTab === "All" ? "active" : ""}
            onClick={() => setActiveTab("All")}
          >
            All Opportunities
          </button>

          <button
            type="button"
            className={activeTab === "Saved" ? "active" : ""}
            onClick={() => setActiveTab("Saved")}
          >
            Saved Opportunities ({savedIds.length})
          </button>
        </div>

        <div className="opportunity-filters">
          <label className="opportunity-search">
            <Search size={20} aria-hidden="true" />
            <input
              type="search"
              value={searchTerm}
              placeholder="Search by title, organizer, or skill"
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </label>

          <select
            value={category}
            aria-label="Filter opportunities by category"
            onChange={(event) => setCategory(event.target.value)}
          >
            {categories.map((categoryOption) => (
              <option key={categoryOption} value={categoryOption}>
                {categoryOption}
              </option>
            ))}
          </select>
        </div>

        <p className="results-summary">
          {filteredOpportunities.length} opportunities found
        </p>

        <div className="opportunity-card-grid">
          {filteredOpportunities.map((opportunity) => {
            const isSaved = savedIds.includes(opportunity.id);

            return (
              <article
                className="seeker-opportunity-card"
                key={opportunity.id}
              >
                <div className="opportunity-card-top">
                  <span className="category-badge">
                    {opportunity.category}
                  </span>

                  <button
                    type="button"
                    className={`save-opportunity-button ${
                      isSaved ? "saved" : ""
                    }`}
                    aria-label={
                      isSaved
                        ? `Remove ${opportunity.title} from saved opportunities`
                        : `Save ${opportunity.title}`
                    }
                    onClick={() => toggleSaved(opportunity.id)}
                  >
                    {isSaved ? (
                      <BookmarkCheck size={21} />
                    ) : (
                      <Bookmark size={21} />
                    )}
                  </button>
                </div>

                <h2>{opportunity.title}</h2>
                <p className="opportunity-description">
                  {opportunity.description}
                </p>

                <div className="opportunity-meta">
                  <span>
                    <Building2 size={17} />
                    {opportunity.organizer}
                  </span>

                  <span>
                    <CalendarDays size={17} />
                    Deadline: {opportunity.deadline}
                  </span>
                </div>

                <div className="opportunity-skills">
                  {opportunity.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>

                <button
                  type="button"
                  className="view-opportunity-button"
                  onClick={() => setSelectedOpportunity(opportunity)}
                >
                  View Details
                </button>
              </article>
            );
          })}
        </div>

        {filteredOpportunities.length === 0 && (
          <div className="opportunity-empty-state">
            <Search size={34} />
            <h2>No opportunities found</h2>
            <p>Try changing your search term or selected category.</p>

            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setCategory("All Categories");
                setActiveTab("All");
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {selectedOpportunity && (
        <div
          className="seeker-modal-backdrop"
          onClick={() => setSelectedOpportunity(null)}
        >
          <div
            className="seeker-modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="opportunity-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="seeker-modal-close"
              aria-label="Close opportunity details"
              onClick={() => setSelectedOpportunity(null)}
            >
              ×
            </button>

            <span className="category-badge">
              {selectedOpportunity.category}
            </span>

            <h2 id="opportunity-modal-title">
              {selectedOpportunity.title}
            </h2>

            <p>{selectedOpportunity.description}</p>

            <div className="modal-detail-row">
              <strong>Organizer:</strong>
              <span>{selectedOpportunity.organizer}</span>
            </div>

            <div className="modal-detail-row">
              <strong>Deadline:</strong>
              <span>{selectedOpportunity.deadline}</span>
            </div>

            <div className="modal-detail-row">
              <strong>Required skills:</strong>
              <span>{selectedOpportunity.skills.join(", ")}</span>
            </div>

            <div className="seeker-modal-actions">
              <button
                type="button"
                className="secondary-action-button"
                onClick={() => toggleSaved(selectedOpportunity.id)}
              >
                {savedIds.includes(selectedOpportunity.id)
                  ? "Remove from Saved"
                  : "Save Opportunity"}
              </button>

              <button
                type="button"
                className="primary-action-button"
                onClick={() =>
                  navigate(
                    `/find-teams?opportunity=${selectedOpportunity.id}`,
                  )
                }
              >
                Find a Team
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}