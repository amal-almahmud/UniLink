import {
  Search,
  Users,
  Send,
  FileText,
  Bookmark,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router";
import DashboardLayout from "../../layouts/DashboardLayout";
import "./Dashboard.css";

function Dashboard({
  sidebarItems = [],
  activeArea = "",
  studentName = "[Student Name]",
}) {
  const navigate = useNavigate();

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      activeArea={activeArea}
      studentName={studentName}
    >
      <section className="dashboard-page">
        <header className="dashboard-heading">
          <h1>Welcome, {studentName}</h1>

          <p>
            Here is what is happening across your UniLink
            account.
          </p>
        </header>

        <div className="dashboard-quick-links">
          <button
            className="dashboard-quick-card"
            type="button"
            onClick={() => navigate("/my-team")}
          >
            <Users size={28} />

            <div>
              <h2>Manage a Team</h2>
              <p>Lead opportunities and members</p>
            </div>

            <ArrowRight size={22} />
          </button>

          <button
            className="dashboard-quick-card"
            type="button"
            onClick={() =>
              navigate("/create-team-opportunity")
            }
          >
            <Send size={28} />

            <div>
              <h2>Publish an Opportunity</h2>
              <p>Share an opportunity with students</p>
            </div>

            <ArrowRight size={22} />
          </button>

          <button
            className="dashboard-quick-card"
            type="button"
            onClick={() =>
              navigate("/applications-management")
            }
          >
            <Search size={28} />

            <div>
              <h2>Applications Management</h2>
              <p>Review student applications</p>
            </div>

            <ArrowRight size={22} />
          </button>
        </div>

        <div className="dashboard-statistics">
          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">
              <FileText size={24} />
            </div>

            <div className="dashboard-stat-content">
              <strong>2</strong>
              <span>Active applications</span>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">
              <Bookmark size={24} />
            </div>

            <div className="dashboard-stat-content">
              <strong>2</strong>
              <span>Saved opportunities</span>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">
              <Users size={24} />
            </div>

            <div className="dashboard-stat-content">
              <strong>2</strong>
              <span>Open team opportunities</span>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">
              <Send size={24} />
            </div>

            <div className="dashboard-stat-content">
              <strong>1</strong>
              <span>Published opportunity</span>
            </div>
          </div>
        </div>

        <div className="dashboard-columns">
          <section className="dashboard-section">
            <div className="dashboard-section-heading">
              <h2>Recommended Opportunities</h2>

              <button
                type="button"
                onClick={() =>
                  navigate("/my-opportunities")
                }
              >
                View all
              </button>
            </div>

            <div className="dashboard-opportunity-list">
              <button
                className="dashboard-opportunity-card"
                type="button"
                onClick={() =>
                  navigate("/my-opportunities")
                }
              >
                <div className="dashboard-opportunity-icon">
                  <Search size={24} />
                </div>

                <div className="dashboard-opportunity-content">
                  <span className="dashboard-opportunity-type">
                    Course Project
                  </span>

                  <h3>
                    AI-Based Smart Campus Assistant
                  </h3>

                  <p>
                    Design an intelligent assistant that
                    helps KFUPM students navigate campus
                    services and academic resources.
                  </p>

                  <span className="dashboard-deadline">
                    <CalendarDays size={17} />
                    Deadline 30 Apr 2026
                  </span>
                </div>

                <ArrowRight size={22} />
              </button>

              <button
                className="dashboard-opportunity-card"
                type="button"
                onClick={() =>
                  navigate("/my-opportunities")
                }
              >
                <div className="dashboard-opportunity-icon">
                  <Search size={24} />
                </div>

                <div className="dashboard-opportunity-content">
                  <span className="dashboard-opportunity-type">
                    Research Activity
                  </span>

                  <h3>
                    Machine Learning for Student Success
                  </h3>

                  <p>
                    Explore responsible machine learning
                    models that identify patterns in
                    student learning and engagement.
                  </p>

                  <span className="dashboard-deadline">
                    <CalendarDays size={17} />
                    Deadline 12 May 2026
                  </span>
                </div>

                <ArrowRight size={22} />
              </button>
            </div>
          </section>

          <section className="dashboard-section dashboard-deadlines">
            <h2>Upcoming Deadlines</h2>

            <div className="dashboard-deadline-item">
              <strong>30</strong>
              <span>APR</span>

              <div>
                <h3>Smart Campus application</h3>
                <small>8 days remaining</small>
              </div>
            </div>

            <div className="dashboard-deadline-item">
              <strong>12</strong>
              <span>MAY</span>

              <div>
                <h3>Research registration</h3>
                <small>20 days remaining</small>
              </div>
            </div>
          </section>
        </div>
      </section>
    </DashboardLayout>
  );
}

export default Dashboard;