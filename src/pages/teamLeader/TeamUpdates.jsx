import { useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";
import teamLeaderSidebarItems from "./teamLeaderSidebarItems";
import "./TeamUpdates.css";

const initialForm = {
  title: "",
  type: "",
  message: "",
  deadline: "",
};

const initialUpdates = [
  {
    id: 1,
    type: "Progress Update",
    title: "Research phase complete",
    message:
      "We completed five student interviews and grouped the key campus-service needs.",
    date: "20 Apr 2026",
  },
  {
    id: 2,
    type: "Deadline",
    title: "Prototype review on Thursday",
    message:
      "Please add your work to the shared prototype before the review session.",
    date: "18 Apr 2026",
  },
];

function TeamUpdates() {
  const [team, setTeam] = useState("Campus Innovators");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [updates, setUpdates] = useState(initialUpdates);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.title.trim()) {
      nextErrors.title = "Update title is required.";
    }

    if (!form.type) {
      nextErrors.type = "Update type is required.";
    }

    if (!form.message.trim()) {
      nextErrors.message = "Update message is required.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const submitUpdate = (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const newUpdate = {
      id: Date.now(),
      type: form.type,
      title: form.title.trim(),
      message: form.message.trim(),
      date: form.deadline || "06 Nov 2026",
    };

    setUpdates((current) => [
      newUpdate,
      ...current,
    ]);

    setForm(initialForm);
    setErrors({});
    setShowForm(false);
  };

  const closeForm = () => {
    setForm(initialForm);
    setErrors({});
    setShowForm(false);
  };

  return (
    <DashboardLayout
      sidebarItems={teamLeaderSidebarItems}
      activeArea="Manage a Team"
      studentName="[Student Name]"
    >
      <section className="team-updates-page">
        <header className="team-updates-header">
          <div>
            <h1>Team Updates</h1>
            <p>
              Share announcements, progress, and important
              deadlines with your team.
            </p>
          </div>

          <button
            className="primary-button"
            type="button"
            onClick={() =>
              setShowForm((current) => !current)
            }
          >
            {showForm ? "Close Form" : "Create Update"}
          </button>
        </header>

        <div className="team-select-wrapper">
          <label htmlFor="team-select">Team</label>

          <select
            id="team-select"
            value={team}
            onChange={(event) =>
              setTeam(event.target.value)
            }
          >
            <option value="Campus Innovators">
              Campus Innovators
            </option>

            <option value="Green AI Team">
              Green AI Team
            </option>
          </select>
        </div>

        {showForm && (
          <form
            className="team-update-form"
            onSubmit={submitUpdate}
            noValidate
          >
            <h2>Create team update</h2>

            <div className="team-update-form-grid">
              <div className="form-field">
                <label htmlFor="update-title">
                  Update title <span>*</span>
                </label>

                <input
                  id="update-title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className={
                    errors.title ? "input-error" : ""
                  }
                  placeholder="Enter update title"
                />

                {errors.title && (
                  <small className="field-error">
                    {errors.title}
                  </small>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="update-type">
                  Update Type <span>*</span>
                </label>

                <select
                  id="update-type"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className={
                    errors.type ? "input-error" : ""
                  }
                >
                  <option value="">
                    Select update type
                  </option>
                  <option value="Announcement">
                    Announcement
                  </option>
                  <option value="Deadline">
                    Deadline
                  </option>
                  <option value="Progress Update">
                    Progress Update
                  </option>
                </select>

                {errors.type && (
                  <small className="field-error">
                    {errors.type}
                  </small>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="update-message">
                  Message <span>*</span>
                </label>

                <textarea
                  id="update-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className={
                    errors.message ? "input-error" : ""
                  }
                  placeholder="Write your update"
                  rows="5"
                />

                {errors.message && (
                  <small className="field-error">
                    {errors.message}
                  </small>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="update-deadline">
                  Related Deadline
                </label>

                <input
                  id="update-deadline"
                  name="deadline"
                  type="date"
                  value={form.deadline}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="team-update-actions">
              <button
                className="primary-button"
                type="submit"
              >
                Post
              </button>

              <button
                className="text-button"
                type="button"
                onClick={closeForm}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <section className="team-updates-timeline">
          {updates.map((update) => (
            <article
              className="team-update-item"
              key={update.id}
            >
              <div className="team-update-dot">
                <span />
              </div>

              <div className="team-update-card">
                <span
                  className={`team-update-tag team-update-tag--${update.type
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                >
                  {update.type}
                </span>

                <h2>{update.title}</h2>
                <p>{update.message}</p>

                <small>
                  Posted by [Student Name] · {update.date}
                </small>
              </div>
            </article>
          ))}
        </section>
      </section>
    </DashboardLayout>
  );
}

export default TeamUpdates;