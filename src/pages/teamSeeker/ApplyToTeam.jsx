import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import {
  ArrowLeft,
  CheckCircle2,
  Send,
} from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";
import teamSeekerSidebarItems from "./teamSeekerSidebarItems";
import "./ApplyToTeam.css";

const teams = {
  1: {
    name: "Smart Campus Innovators",
    roles: ["Frontend Developer", "UI/UX Designer"],
  },
  2: {
    name: "Data Explorers",
    roles: ["Machine Learning Developer", "Data Analyst"],
  },
  3: {
    name: "Green Campus Team",
    roles: ["Product Designer", "Presentation Specialist"],
  },
  4: {
    name: "Secure Minds",
    roles: ["Frontend Developer", "Content Writer"],
  },
};

export default function ApplyToTeam() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const teamId = searchParams.get("team") || "1";
  const team = teams[teamId] || teams[1];

  const [formData, setFormData] = useState({
    role: "",
    motivation: "",
    experience: "",
    weeklyHours: "",
    agreement: false,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const updateField = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.role) {
      nextErrors.role = "Please select the role you want.";
    }

    if (formData.motivation.trim().length < 30) {
      nextErrors.motivation =
        "Please write at least 30 characters about your motivation.";
    }

    if (!formData.experience.trim()) {
      nextErrors.experience =
        "Please describe your relevant skills or experience.";
    }

    if (
      !formData.weeklyHours ||
      Number(formData.weeklyHours) < 1 ||
      Number(formData.weeklyHours) > 40
    ) {
      nextErrors.weeklyHours =
        "Enter a number between 1 and 40 hours.";
    }

    if (!formData.agreement) {
      nextErrors.agreement =
        "You must confirm that the information is accurate.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    setSubmitted(true);
  };

  return (
    <DashboardLayout
      activeArea="Find a Team"
      sidebarItems={teamSeekerSidebarItems}
    >
      <section className="apply-to-team-page">
        <button
          type="button"
          className="application-back-button"
          onClick={() => navigate(`/team-details?id=${teamId}`)}
        >
          <ArrowLeft size={18} />
          Back to Team Details
        </button>

        <header className="application-heading">
          <h1>Apply to Join a Team</h1>
          <p>
            Submit your application to join{" "}
            <strong>{team.name}</strong>.
          </p>
        </header>

        <form
          className="team-application-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="application-form-section">
            <h2>Application Information</h2>

            <label className="application-field">
              <span>
                Preferred Role <b>*</b>
              </span>

              <select
                name="role"
                value={formData.role}
                className={errors.role ? "field-error" : ""}
                onChange={updateField}
              >
                <option value="">Select a role</option>

                {team.roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>

              {errors.role && (
                <small className="application-error">
                  {errors.role}
                </small>
              )}
            </label>

            <label className="application-field">
              <span>
                Why do you want to join this team? <b>*</b>
              </span>

              <textarea
                name="motivation"
                rows="5"
                maxLength="500"
                value={formData.motivation}
                className={errors.motivation ? "field-error" : ""}
                placeholder="Explain your interest in the opportunity and what you hope to contribute."
                onChange={updateField}
              />

              <div className="field-helper-row">
                {errors.motivation ? (
                  <small className="application-error">
                    {errors.motivation}
                  </small>
                ) : (
                  <small>Minimum 30 characters</small>
                )}

                <small>
                  {formData.motivation.length}/500
                </small>
              </div>
            </label>

            <label className="application-field">
              <span>
                Relevant Skills or Experience <b>*</b>
              </span>

              <textarea
                name="experience"
                rows="4"
                maxLength="400"
                value={formData.experience}
                className={errors.experience ? "field-error" : ""}
                placeholder="Describe relevant courses, projects, technical skills, or teamwork experience."
                onChange={updateField}
              />

              {errors.experience && (
                <small className="application-error">
                  {errors.experience}
                </small>
              )}
            </label>

            <label className="application-field">
              <span>
                Available Hours Per Week <b>*</b>
              </span>

              <input
                type="number"
                name="weeklyHours"
                min="1"
                max="40"
                value={formData.weeklyHours}
                className={errors.weeklyHours ? "field-error" : ""}
                placeholder="For example: 6"
                onChange={updateField}
              />

              {errors.weeklyHours && (
                <small className="application-error">
                  {errors.weeklyHours}
                </small>
              )}
            </label>

            <label className="application-agreement">
              <input
                type="checkbox"
                name="agreement"
                checked={formData.agreement}
                onChange={updateField}
              />

              <span>
                I confirm that the information in this application is
                accurate and that I can commit to the team.
              </span>
            </label>

            {errors.agreement && (
              <small className="application-error">
                {errors.agreement}
              </small>
            )}
          </div>

          <div className="application-form-actions">
            <button
              type="button"
              className="cancel-application-button"
              onClick={() => navigate(`/team-details?id=${teamId}`)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="submit-application-button"
            >
              <Send size={18} />
              Submit Application
            </button>
          </div>
        </form>
      </section>

      {submitted && (
        <div className="application-success-backdrop">
          <div
            className="application-success-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="application-success-title"
          >
            <CheckCircle2 size={52} />

            <h2 id="application-success-title">
              Application Submitted
            </h2>

            <p>
              Your application to join {team.name} was submitted
              successfully. You can track its status from My
              Applications.
            </p>

            <button
              type="button"
              onClick={() => navigate("/my-applications")}
            >
              View My Applications
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}