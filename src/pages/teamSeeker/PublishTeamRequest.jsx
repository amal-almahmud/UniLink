import { useState } from "react";
import { useNavigate } from "react-router";
import {
  CheckCircle2,
  Send,
} from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";
import teamSeekerSidebarItems from "./teamSeekerSidebarItems";
import "./PublishTeamRequest.css";

const initialFormData = {
  title: "",
  opportunity: "",
  description: "",
  skills: "",
  preferredRole: "",
  availability: "",
};

export default function PublishTeamRequest() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const updateField = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const nextErrors = {};

    if (formData.title.trim().length < 5) {
      nextErrors.title =
        "Enter a title containing at least 5 characters.";
    }

    if (!formData.opportunity) {
      nextErrors.opportunity = "Select an opportunity.";
    }

    if (formData.description.trim().length < 30) {
      nextErrors.description =
        "Write at least 30 characters about yourself and your goals.";
    }

    if (!formData.skills.trim()) {
      nextErrors.skills = "Enter at least one skill.";
    }

    if (!formData.preferredRole.trim()) {
      nextErrors.preferredRole =
        "Enter the role you want to contribute in.";
    }

    if (!formData.availability.trim()) {
      nextErrors.availability =
        "Enter your general availability.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    setSubmitted(true);
  };

  const handleCreateAnother = () => {
    setFormData(initialFormData);
    setErrors({});
    setSubmitted(false);
  };

  return (
    <DashboardLayout
      activeArea="Find a Team"
      sidebarItems={teamSeekerSidebarItems}
    >
      <section className="publish-request-page">
        <header className="publish-request-heading">
          <h1>Post a Team Request</h1>
          <p>
            Introduce yourself to other students and explain what
            kind of team or opportunity you are looking for.
          </p>
        </header>

        <form
          className="publish-request-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="request-form-content">
            <h2>Request Details</h2>

            <label className="request-field">
              <span>
                Request Title <b>*</b>
              </span>

              <input
                type="text"
                name="title"
                maxLength="80"
                value={formData.title}
                className={errors.title ? "request-field-error" : ""}
                placeholder="For example: Looking for an AI project team"
                onChange={updateField}
              />

              {errors.title && (
                <small className="request-error-message">
                  {errors.title}
                </small>
              )}
            </label>

            <label className="request-field">
              <span>
                Related Opportunity <b>*</b>
              </span>

              <select
                name="opportunity"
                value={formData.opportunity}
                className={
                  errors.opportunity ? "request-field-error" : ""
                }
                onChange={updateField}
              >
                <option value="">Select an opportunity</option>
                <option value="AI-Based Smart Campus Assistant">
                  AI-Based Smart Campus Assistant
                </option>
                <option value="Machine Learning for Student Success">
                  Machine Learning for Student Success
                </option>
                <option value="Sustainable Campus Innovation Challenge">
                  Sustainable Campus Innovation Challenge
                </option>
                <option value="Cybersecurity Awareness Platform">
                  Cybersecurity Awareness Platform
                </option>
              </select>

              {errors.opportunity && (
                <small className="request-error-message">
                  {errors.opportunity}
                </small>
              )}
            </label>

            <label className="request-field">
              <span>
                About You and Your Goal <b>*</b>
              </span>

              <textarea
                name="description"
                rows="5"
                maxLength="500"
                value={formData.description}
                className={
                  errors.description ? "request-field-error" : ""
                }
                placeholder="Describe your interests, goals, and the kind of teammates you want to work with."
                onChange={updateField}
              />

              <div className="request-helper-row">
                {errors.description ? (
                  <small className="request-error-message">
                    {errors.description}
                  </small>
                ) : (
                  <small>Minimum 30 characters</small>
                )}

                <small>{formData.description.length}/500</small>
              </div>
            </label>

            <div className="request-two-column">
              <label className="request-field">
                <span>
                  Your Skills <b>*</b>
                </span>

                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  className={
                    errors.skills ? "request-field-error" : ""
                  }
                  placeholder="React, Python, UI/UX"
                  onChange={updateField}
                />

                {errors.skills && (
                  <small className="request-error-message">
                    {errors.skills}
                  </small>
                )}
              </label>

              <label className="request-field">
                <span>
                  Preferred Role <b>*</b>
                </span>

                <input
                  type="text"
                  name="preferredRole"
                  value={formData.preferredRole}
                  className={
                    errors.preferredRole
                      ? "request-field-error"
                      : ""
                  }
                  placeholder="Frontend Developer"
                  onChange={updateField}
                />

                {errors.preferredRole && (
                  <small className="request-error-message">
                    {errors.preferredRole}
                  </small>
                )}
              </label>
            </div>

            <label className="request-field">
              <span>
                Availability <b>*</b>
              </span>

              <input
                type="text"
                name="availability"
                value={formData.availability}
                className={
                  errors.availability ? "request-field-error" : ""
                }
                placeholder="For example: Sunday and Tuesday evenings"
                onChange={updateField}
              />

              {errors.availability && (
                <small className="request-error-message">
                  {errors.availability}
                </small>
              )}
            </label>
          </div>

          <div className="request-form-actions">
            <button
              type="button"
              className="request-cancel-button"
              onClick={() => navigate("/find-teams")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="request-submit-button"
            >
              <Send size={18} />
              Publish Request
            </button>
          </div>
        </form>
      </section>

      {submitted && (
        <div className="request-success-backdrop">
          <div
            className="request-success-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="request-success-title"
          >
            <CheckCircle2 size={52} />

            <h2 id="request-success-title">
              Request Published
            </h2>

            <p>
              Your team request was published successfully and is now
              visible to other students.
            </p>

            <div className="request-success-actions">
              <button
                type="button"
                className="request-secondary-button"
                onClick={handleCreateAnother}
              >
                Create Another
              </button>

              <button
                type="button"
                onClick={() => navigate("/find-teams")}
              >
                View Teams
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}