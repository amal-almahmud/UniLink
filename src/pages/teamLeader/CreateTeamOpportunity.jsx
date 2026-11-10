import { useState } from "react";
import { useNavigate } from "react-router";
import { Plus, Trash2 } from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";
import teamLeaderSidebarItems from "./teamLeaderSidebarItems";
import "./CreateTeamOpportunity.css";

const initialOpportunity = {
  title: "",
  opportunityType: "",
  deadline: "",
  description: "",
  goals: "",
};

const initialRole = {
  title: "",
  skills: "",
  experience: "",
  members: 1,
};

function CreateTeamOpportunity() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [opportunity, setOpportunity] =
    useState(initialOpportunity);
  const [role, setRole] = useState(initialRole);
  const [roles, setRoles] = useState([]);
  const [message, setMessage] = useState("");

  const updateOpportunity = (event) => {
    const { name, value } = event.target;

    setOpportunity((current) => ({
      ...current,
      [name]: value,
    }));

    setMessage("");
  };

  const updateRole = (event) => {
    const { name, value } = event.target;

    setRole((current) => ({
      ...current,
      [name]: value,
    }));

    setMessage("");
  };

  const isOpportunityValid =
    opportunity.title.trim() &&
    opportunity.opportunityType &&
    opportunity.deadline &&
    opportunity.description.trim() &&
    opportunity.goals.trim();

  const goToRoles = () => {
    if (!isOpportunityValid) {
      setMessage("Please complete all required fields.");
      return;
    }

    setMessage("");
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const saveDraft = () => {
    if (!opportunity.title.trim()) {
      setMessage("Enter an opportunity title first.");
      return;
    }

    setMessage("Draft saved successfully.");
  };

  const addRole = () => {
    if (!role.title.trim() || !role.skills.trim()) {
      setMessage(
        "Enter a role title and required skills."
      );
      return;
    }

    setRoles((current) => [
      ...current,
      {
        id: Date.now(),
        ...role,
      },
    ]);

    setRole(initialRole);
    setMessage("Role added successfully.");
  };

  const publishOpportunity = () => {
    if (roles.length === 0) {
      setMessage(
        "Add at least one role before publishing."
      );
      return;
    }

    navigate("/my-opportunities");
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
            <h1>Create Team Opportunity</h1>
            <p>
              Create an opportunity and find suitable students
              for your team.
            </p>
          </div>

          <button
            className="outline-button"
            type="button"
            onClick={saveDraft}
          >
            Save as Draft
          </button>
        </header>

        <div className="opportunity-stepper">
          <button
            type="button"
            className={step === 1 ? "step-active" : ""}
            onClick={() => setStep(1)}
          >
            <b>1</b>
            Opportunity Details
          </button>

          <button
            type="button"
            className={step === 2 ? "step-active" : ""}
            onClick={() => {
              if (isOpportunityValid) {
                setStep(2);
              } else {
                setMessage(
                  "Complete the opportunity details first."
                );
              }
            }}
          >
            <b>2</b>
            Required Roles
          </button>
        </div>

        {message && (
          <div className="form-message">{message}</div>
        )}

        {step === 1 && (
          <div className="opportunity-form-card">
            <div className="form-grid">
              <label>
                Title *
                <input
                  name="title"
                  value={opportunity.title}
                  onChange={updateOpportunity}
                  placeholder="Enter opportunity title"
                />
              </label>

              <label>
                Opportunity Type *
                <select
                  name="opportunityType"
                  value={opportunity.opportunityType}
                  onChange={updateOpportunity}
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
                  value={opportunity.deadline}
                  onChange={updateOpportunity}
                />
              </label>

              <label>
                Description *
                <textarea
                  name="description"
                  value={opportunity.description}
                  onChange={updateOpportunity}
                  placeholder="Describe the opportunity"
                  rows="5"
                />
              </label>

              <label>
                Goals *
                <textarea
                  name="goals"
                  value={opportunity.goals}
                  onChange={updateOpportunity}
                  placeholder="What should the team achieve?"
                  rows="5"
                />
              </label>
            </div>

            <div className="form-actions">
              <button
                className="primary-button"
                type="button"
                onClick={goToRoles}
              >
                Continue
              </button>

              <button
                className="outline-button"
                type="button"
                onClick={saveDraft}
              >
                Save as Draft
              </button>

              <button
                className="text-button"
                type="button"
                onClick={() =>
                  navigate("/my-opportunities")
                }
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="roles-form-card">
            <h2>Add the roles and skills your team needs.</h2>

            <div className="form-grid">
              <label>
                Role Title *
                <input
                  name="title"
                  value={role.title}
                  onChange={updateRole}
                  placeholder="e.g. UX Designer"
                />
              </label>

              <label>
                Required Skills *
                <textarea
                  name="skills"
                  value={role.skills}
                  onChange={updateRole}
                  placeholder="Figma, user research, communication"
                  rows="4"
                />
              </label>

              <label>
                Preferred Experience
                <input
                  name="experience"
                  value={role.experience}
                  onChange={updateRole}
                  placeholder="Previous project experience"
                />
              </label>

              <label>
                Number of Members
                <input
                  type="number"
                  min="1"
                  name="members"
                  value={role.members}
                  onChange={updateRole}
                />
              </label>
            </div>

            <button
              className="outline-button"
              type="button"
              onClick={addRole}
            >
              <Plus size={18} />
              Add Role
            </button>

            <div className="added-roles-list">
              {roles.map((item) => (
                <div className="added-role" key={item.id}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.skills}</p>
                    <small>
                      {item.members} member
                      {item.members > 1 ? "s" : ""}
                    </small>
                  </div>

                  <button
                    className="danger-action"
                    type="button"
                    onClick={() =>
                      setRoles((current) =>
                        current.filter(
                          (roleItem) =>
                            roleItem.id !== item.id
                        )
                      )
                    }
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="form-actions">
              <button
                className="outline-button"
                type="button"
                onClick={() => setStep(1)}
              >
                Back
              </button>

              <button
                className="primary-button"
                type="button"
                onClick={publishOpportunity}
              >
                Publish Opportunity
              </button>

              <button
                className="text-button"
                type="button"
                onClick={() =>
                  navigate("/my-opportunities")
                }
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </section>
    </DashboardLayout>
  );
}

export default CreateTeamOpportunity;