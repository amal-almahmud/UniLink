import { useState } from "react";
import {
  Search,
  UsersRound,
  Send,
  FileText,
  Bookmark,
  Compass,
  UserSearch,
  Plus,
  CalendarDays,
  ChevronRight,
} from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";
import "./Dashboard.css";

const sidebarItemsByArea = {
  "Find a Team": [
    {
      label: "Browse Opportunities",
      to: "/opportunities",
      icon: Compass,
    },
    {
      label: "Saved Opportunities",
      to: "/saved-opportunities",
      icon: Bookmark,
    },
    {
      label: "Find a Team",
      to: "/find-team",
      icon: UsersRound,
    },
    {
      label: "Looking for a Team",
      to: "/looking-for-team",
      icon: Search,
    },
    {
      label: "My Applications and Invitations",
      to: "/applications",
      icon: FileText,
    },
  ],

  "Manage a Team": [
    {
      label: "Create Team Opportunity",
      to: "/create-team-opportunity",
      icon: Plus,
    },
    {
      label: "My Opportunities",
      to: "/my-opportunities",
      icon: FileText,
    },
    {
      label: "Applications Management",
      to: "/applications-management",
      icon: UsersRound,
    },
    {
      label: "My Team",
      to: "/my-team",
      icon: UserSearch,
    },
    {
      label: "Team Updates",
      to: "/team-updates",
      icon: Send,
    },
  ],

  "Publish an Opportunity": [
    {
      label: "Browse Opportunities",
      to: "/opportunities",
      icon: Compass,
    },
    {
      label: "Check Existing Opportunities",
      to: "/existing-opportunities",
      icon: Search,
    },
    {
      label: "Post University Opportunity",
      to: "/publish-opportunity",
      icon: Plus,
    },
    {
      label: "My Posted Opportunities",
      to: "/posted-opportunities",
      icon: FileText,
    },
  ],
};

const actionCards = [
  {
    title: "Find a Team",
    description: "Browse open student teams",
    icon: Search,
  },
  {
    title: "Manage a Team",
    description: "Lead opportunities and members",
    icon: UsersRound,
  },
  {
    title: "Publish an Opportunity",
    description: "Share an official announcement",
    icon: Send,
  },
];

const statCards = [
  {
    value: 2,
    label: "Active applications",
    icon: FileText,
  },
  {
    value: 2,
    label: "Saved opportunities",
    icon: Bookmark,
  },
  {
    value: 2,
    label: "Open team opportunities",
    icon: UsersRound,
  },
  {
    value: 1,
    label: "Published opportunity",
    icon: Send,
  },
];

const opportunities = [
  {
    type: "Course Project",
    title: "AI-Based Smart Campus Assistant",
    description:
      "Design an intelligent assistant that helps KFUPM students navigate campus services and academic resources.",
    deadline: "30 Apr 2026",
  },
  {
    type: "Research Activity",
    title: "Machine Learning for Student Success",
    description:
      "Explore responsible machine learning models that identify patterns in student learning and engagement.",
    deadline: "12 May 2026",
  },
];

function Dashboard({ userName = "Student Name" }) {
  const [activeArea, setActiveArea] = useState("Find a Team");
  const firstName = userName.split(" ")[0];

  const sidebarItems = sidebarItemsByArea[activeArea];

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      activeArea={activeArea}
      onAreaChange={setActiveArea}
      studentName={userName}
    >
      <section className="dashboard-page">
        <header className="dashboard-heading">
          <h1>Welcome, {firstName}</h1>
          <p>
            Here is what is happening across your UniLink account.
          </p>
        </header>

        <section className="dashboard-actions">
          {actionCards.map((action) => {
            const Icon = action.icon;

            return (
              <button
                key={action.title}
                className="dashboard-action-card"
                type="button"
                onClick={() => setActiveArea(action.title)}
              >
                <Icon className="dashboard-action-icon" size={25} />

                <span className="dashboard-action-text">
                  <strong>{action.title}</strong>
                  <small>{action.description}</small>
                </span>

                <ChevronRight size={22} />
              </button>
            );
          })}
        </section>

        <section className="dashboard-stats">
          {statCards.map((stat) => {
            const Icon = stat.icon;

            return (
              <article className="dashboard-stat-card" key={stat.label}>
                <span className="dashboard-stat-icon">
                  <Icon size={23} />
                </span>

                <div>
                  <strong>{stat.value}</strong>
                  <p>{stat.label}</p>
                </div>

                {stat.label === "Saved opportunities" && (
                  <ChevronRight
                    className="dashboard-stat-arrow"
                    size={20}
                  />
                )}
              </article>
            );
          })}
        </section>

        <p className="dashboard-note">
          Saved count opens Saved Opportunities.
        </p>

        <section className="dashboard-main-grid">
          <article className="dashboard-panel">
            <div className="dashboard-panel-heading">
              <h2>Recommended Opportunities</h2>
              <a href="/opportunities">View all</a>
            </div>

            <div className="dashboard-opportunities">
              {opportunities.map((opportunity) => (
                <a
                  className="dashboard-opportunity"
                  href="/opportunity-details"
                  key={opportunity.title}
                >
                  <span className="dashboard-opportunity-icon">
                    <Compass size={22} />
                  </span>

                  <div className="dashboard-opportunity-content">
                    <span className="dashboard-tag">
                      {opportunity.type}
                    </span>

                    <h3>{opportunity.title}</h3>
                    <p>{opportunity.description}</p>

                    <span className="dashboard-deadline-text">
                      <CalendarDays size={18} />
                      Deadline {opportunity.deadline}
                    </span>
                  </div>

                  <ChevronRight
                    className="dashboard-opportunity-arrow"
                    size={21}
                  />
                </a>
              ))}
            </div>

            <p className="dashboard-note dashboard-panel-note">
              Clickable card opens opportunity details.
            </p>
          </article>

          <article className="dashboard-panel">
            <div className="dashboard-panel-heading">
              <h2>Upcoming Deadlines</h2>
            </div>

            <div className="dashboard-deadlines">
              <div className="dashboard-deadline">
                <div className="dashboard-date">
                  <strong>30</strong>
                  <span>APR</span>
                </div>

                <div>
                  <h3>Smart Campus application</h3>
                  <p>8 days remaining</p>
                </div>
              </div>

              <div className="dashboard-deadline">
                <div className="dashboard-date">
                  <strong>12</strong>
                  <span>MAY</span>
                </div>

                <div>
                  <h3>Research registration</h3>
                  <p>20 days remaining</p>
                </div>
              </div>
            </div>
          </article>

          <article className="dashboard-panel">
            <div className="dashboard-panel-heading">
              <h2>Recent Applications</h2>
              <a href="/applications">View all</a>
            </div>

            <div className="dashboard-list-row">
              <div>
                <h3>Campus Innovators</h3>
                <p>UX Designer · 18 Apr</p>
              </div>

              <span className="dashboard-status dashboard-status--pending">
                Pending
              </span>
            </div>

            <div className="dashboard-list-row">
              <div>
                <h3>Green AI Team</h3>
                <p>Researcher · 14 Apr</p>
              </div>

              <span className="dashboard-status dashboard-status--accepted">
                Accepted
              </span>
            </div>
          </article>

          <article className="dashboard-panel">
            <div className="dashboard-panel-heading">
              <h2>Recent Notifications</h2>
              <a href="/notifications">View all</a>
            </div>

            <div className="dashboard-notification">
              <span className="dashboard-notification-dot dashboard-notification-dot--new" />

              <div>
                <h3>Your application was accepted</h3>
                <p>Green AI Team · 2 hours ago</p>
              </div>
            </div>

            <div className="dashboard-notification">
              <span className="dashboard-notification-dot" />

              <div>
                <h3>New team progress update</h3>
                <p>Campus Innovators · Yesterday</p>
              </div>
            </div>
          </article>
        </section>
      </section>
    </DashboardLayout>
  );
}

export default Dashboard;