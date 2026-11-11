import { useState } from "react";
import { useNavigate } from "react-router";

import DashboardLayout from "../../layouts/DashboardLayout";
import teamLeaderSidebarItems from "./teamLeaderSidebarItems";
import "./CreateTeamOpportunity.css";

const initialOpportunity = {
  title: "AI-Based Smart Campus Assistant",
  opportunityType: "Course Project",
  deadline: "2026-04-30",
  description:
    "Design an intelligent assistant that helps KFUPM students navigate campus services and academic resources.",
  goals:
    "Build a useful prototype that improves access to campus services.",
};

function EditOpportunity() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialOpportunity);
  const [message, setMessage] = useState("");

  const updateForm = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setMessage("");
  };

  const saveChanges = (event) => {
    event.preventDefault();

    if (
      !form.title.trim() ||
      !form.opportunityType ||
      !form.deadline ||
      !form.description.trim() ||
      !form.goals.trim()
    ) {
      setMessage("Please complete all required fields.");
      return;
    }

    setMessage("Opportunity updated successfully.");
  };

  return (
    <DashboardLayout
      sidebarItems={teamLeaderSidebarItems}
      activeArea="Manage a Team"
      studentName="[Student Name]"
    >
      <section className="team-opportunity-page">
        <header className="opportunity-page-heading">
          <div>
            <h1>Edit Opportunity</h1>
            <p>
              Update the details of your team opportunity.
            </p>
          </div>
        </header>

        {message && (
          <div className="form-message">{message}</div>
        )}

        <form
          className="opportunity-form-card"
          onSubmit={saveChanges}
        >
          <div className="form-grid">
            <label>
              Title *
              <input
                name="title"
                value={form.title}
                onChange={updateForm}
              />
            </label>

            <label>
              Opportunity Type *
              <select
                name="opportunityType"
                value={form.opportunityType}
                onChange={updateForm}
              >
                <option value="">
                  Select opportunity type
                </option>
                <option value="Course Project">
                  Course Project
                </option>
                <option value="Research Activity">
                  Research Activity
                </option>
                <option value="Competition">
                  Competition
                </option>
                <option value="Hackathon">
                  Hackathon
                </option>
                <option value="University Initiative">
                  University Initiative
                </option>
              </select>
            </label>

            <label>
              Application Deadline *
              <input
                type="date"
                name="deadline"
                value={form.deadline}
                onChange={updateForm}
              />
            </label>

            <label>
              Description *
              <textarea
                name="description"
                value={form.description}
                onChange={updateForm}
                rows="6"
              />
            </label>

            <label>
              Goals *
              <textarea
                name="goals"
                value={form.goals}
                onChange={updateForm}
                rows="6"
              />
            </label>
          </div>

          <div className="form-actions">
            <button
              className="primary-button"
              type="submit"
            >
              Save Changes
            </button>

            <button
              className="outline-button"
              type="button"
              onClick={() =>
                navigate("/my-opportunities")
              }
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </DashboardLayout>
  );
}

export default EditOpportunity;