
import { useState } from "react";
import {
  Plus,
  Trash2,
  LayoutDashboard,
  FilePlus2,
  Files,
  UsersRound,
  Send,
} from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";
import "./CreateTeamOpportunity.css";

const sidebarItems = [
  { label: "Create Team Opportunity", to: "/team-leader/create", icon: FilePlus2 },
  { label: "My Opportunities", to: "/team-leader/opportunities", icon: Files },
  { label: "Applications Management", to: "/team-leader/applications", icon: UsersRound },
  { label: "My Team", to: "/team-leader/team", icon: UsersRound },
  { label: "Team Updates", to: "/team-leader/updates", icon: Send },
];

const initialForm = {
  title: "",
  type: "",
  deadline: "",
  description: "",
  goals: "",
};

const initialRole = {
  title: "",
  skills: "",
  experience: "",
  members: "1",
};

function CreateTeamOpportunity() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState(initialRole);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const updateForm = (event) => {
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

  const updateRole = (event) => {
    const { name, value } = event.target;

    setRole((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const validateStepOne = () => {
    const nextErrors = {};

    if (!form.title.trim()) nextErrors.title = "Title is required.";
    if (!form.type) nextErrors.type = "Opportunity type is required.";
    if (!form.deadline) nextErrors.deadline = "Application deadline is required.";
    if (!form.description.trim()) {
      nextErrors.description = "Description is required.";
    }
    if (!form.goals.trim()) nextErrors.goals = "Goals are required.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateRole = () => {
    const nextErrors = {};

    if (!role.title.trim()) nextErrors.roleTitle = "Role title is required.";
    if (!role.skills.trim()) nextErrors.roleSkills = "Required skills are required.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const continueToRoles = (event) => {
    event.preventDefault();

    if (!validateStepOne()) {
      setMessage("Please complete the required fields.");
      return;
    }

    setMessage("");
    setStep(2);
  };

  const addRole = () => {
    if (!validateRole()) return;

    setRoles((current) => [...current, role]);
    setRole(initialRole);
    setErrors({});
  };

  const removeRole = (index) => {
    setRoles((current) => current.filter((_, itemIndex) => itemIndex !== index));
  };

  const saveDraft = () => {
    const hasInformation = Object.values(form).some((value) => value.trim());

    if (!hasInformation) {
      setMessage("Please enter some information before saving the draft.");
      return;
    }

    setMessage("Draft saved successfully.");
  };
const publishOpportunity = () => {
  if (roles.length === 0) {
    setMessage("Add at least one required role before publishing.");
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  setMessage("Opportunity published successfully.");
  window.scrollTo({ top: 0, behavior: "smooth" });
};

  const cancelForm = () => {
    setForm(initialForm);
    setRoles([]);
    setRole(initialRole);
    setErrors({});
    setMessage("");
    setStep(1);
  };

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      activeArea="Manage a Team"
      studentName="[Student Name]"
    >
      <section className="team-opportunity-page">
        <header className="page-heading">
          <h1>Create Team Opportunity</h1>
          <p>
            Step {step} of 2 ·{" "}
            {step === 1 ? "Opportunity Information" : "Required Roles"}
          </p>
        </header>

        <div className="opportunity-stepper">
          <div className={`stepper-item ${step >= 1 ? "active" : ""}`}>
            <span>1</span>
            <strong>Opportunity Information</strong>
          </div>

          <div className="stepper-line" />

          <div className={`stepper-item ${step === 2 ? "active" : ""}`}>
            <span>2</span>
            <strong>Required Roles</strong>
          </div>
        </div>

        {message && <div className="form-message">{message}</div>}

        {step === 1 ? (
          <form className="opportunity-card" onSubmit={continueToRoles}>
            <div className="form-grid">
              <Field
                label="Title"
                name="title"
                value={form.title}
                onChange={updateForm}
                placeholder="Enter opportunity title"
                error={errors.title}
                required
              />

              <Field
                label="Opportunity Type"
                name="type"
                type="select"
                value={form.type}
                onChange={updateForm}
                options={[
                  "Course Project",
                  "Research Activity",
                  "Competition",
                  "Volunteer Activity",
                ]}
                error={errors.type}
                required
              />

              <Field
                label="Application Deadline"
                name="deadline"
                type="date"
                value={form.deadline}
                onChange={updateForm}
                error={errors.deadline}
                required
              />

              <Field
                label="Description"
                name="description"
                textarea
                value={form.description}
                onChange={updateForm}
                placeholder="Describe the opportunity"
                error={errors.description}
                required
              />

              <Field
                label="Goals"
                name="goals"
                textarea
                value={form.goals}
                onChange={updateForm}
                placeholder="What should the team achieve?"
                error={errors.goals}
                required
              />
            </div>

            <div className="form-actions">
              <button className="primary-button" type="submit">
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
                onClick={cancelForm}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <section className="opportunity-card">
            <div className="roles-header">
              <div>
                <h2>Required Roles</h2>
                <p>Add the roles and skills your team needs.</p>
              </div>
            </div>

            <div className="role-form">
              <Field
                label="Role Title"
                name="title"
                value={role.title}
                onChange={(event) =>
                  updateRole({
                    target: {
                      name: "title",
                      value: event.target.value,
                    },
                  })
                }
                placeholder="Example: UX Designer"
                error={errors.roleTitle}
                required
              />

              <Field
                label="Required Skills"
                name="skills"
                textarea
                value={role.skills}
                onChange={(event) =>
                  updateRole({
                    target: {
                      name: "skills",
                      value: event.target.value,
                    },
                  })
                }
                placeholder="Example: Figma, research, communication"
                error={errors.roleSkills}
                required
              />

              <Field
                label="Preferred Experience"
                name="experience"
                value={role.experience}
                onChange={updateRole}
                placeholder="Example: Previous project experience"
              />

              <Field
                label="Number of Members"
                name="members"
                type="number"
                value={role.members}
                onChange={updateRole}
                min="1"
              />

              <button className="outline-button add-role-button" type="button" onClick={addRole}>
                <Plus size={18} />
                Add Role
              </button>
            </div>

            {roles.length > 0 && (
              <div className="roles-list">
                <h3>Added Roles</h3>

                {roles.map((item, index) => (
                  <div className="role-row" key={`${item.title}-${index}`}>
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.skills}</p>
                    </div>

                    <button
                      className="delete-role-button"
                      type="button"
                      onClick={() => removeRole(index)}
                    >
                      <Trash2 size={18} />
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

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
            </div>
          </section>
        )}
      </section>
    </DashboardLayout>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  textarea = false,
  select = false,
  options = [],
  placeholder,
  error,
  required = false,
  min,
}) {
  return (
    <div className={`form-field ${error ? "has-error" : ""}`}>
      <label htmlFor={name}>
        {label} {required && <span>*</span>}
      </label>

      {textarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : select || type === "select" ? (
        <select id={name} name={name} value={value} onChange={onChange}>
          <option value="">Select opportunity type</option>
          {options.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min={min}
        />
      )}

      {error && <small>{error}</small>}
    </div>
  );
}

export default CreateTeamOpportunity;