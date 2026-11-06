import { useState } from "react";
import {
  LayoutDashboard,
  Plus,
  FileText,
  UsersRound,
  Send,
} from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";
import "./CreateTeamOpportunity.css";

const sidebarItems = [
  { label: "Create Team Opportunity", to: "/team-leader/create", icon: Plus },
  { label: "My Opportunities", to: "/team-leader/opportunities", icon: FileText },
  { label: "Applications Management", to: "/team-leader/applications", icon: UsersRound },
  { label: "My Team", to: "/team-leader/team", icon: UsersRound },
  { label: "Team Updates", to: "/team-leader/updates", icon: Send },
];

const emptyForm = {
  title: "",
  description: "",
  type: "",
  goals: "",
  deadline: "",
  courseName: "",
  courseSection: "",
};

function CreateTeamOpportunity() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(emptyForm);
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState({
    title: "",
    skills: "",
    experience: "",
    members: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const updateForm = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    setMessage("");
  };

  const updateRole = (event) => {
    const { name, value } = event.target;
    setRole((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
    setMessage("");
  };

  const validateStepOne = () => {
    const nextErrors = {};

    if (!form.title.trim()) nextErrors.title = "Title is required.";
    if (!form.description.trim()) {
      nextErrors.description = "Description is required.";
    }
    if (!form.type) nextErrors.type = "Opportunity type is required.";
    if (!form.goals.trim()) nextErrors.goals = "Goals are required.";
    if (!form.deadline) nextErrors.deadline = "Application deadline is required.";

    if (form.type === "Course Project") {
      if (!form.courseName.trim()) {
        nextErrors.courseName = "Course name is required.";
      }
      if (!form.courseSection.trim()) {
        nextErrors.courseSection = "Course section is required.";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateRole = () => {
    const nextErrors = {};

    if (!role.title.trim()) nextErrors.roleTitle = "Role title is required.";
    if (!role.skills.trim()) nextErrors.skills = "Required skills are required.";
    if (!role.experience.trim()) {
      nextErrors.experience = "Preferred experience is required.";
    }
    if (!role.members) {
      nextErrors.members = "Number of members is required.";
    } else if (Number(role.members) <= 0) {
      nextErrors.members = "Enter a valid number greater than 0.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const addRole = () => {
    if (!validateRole()) return;

    setRoles((current) => [...current, role]);
    setRole({
      title: "",
      skills: "",
      experience: "",
      members: "",
    });
    setErrors({});
  };

  const removeRole = (index) => {
    setRoles((current) => current.filter((_, roleIndex) => roleIndex !== index));
  };

  const saveDraft = () => {
    const hasInformation =
      Object.values(form).some((value) => value.trim()) ||
      roles.length > 0 ||
      Object.values(role).some((value) => value.trim());

    setMessage(
      hasInformation
        ? "Draft saved successfully."
        : "Please enter some information before saving the draft.",
    );
  };

  const publishOpportunity = () => {
    const validForm = validateStepOne();

    if (!validForm || roles.length === 0) {
      setMessage("Please complete all required fields before publishing.");
      return;
    }

    setShowConfirm(true);
  };

  const confirmPublish = () => {
    setShowConfirm(false);
    setMessage("Opportunity published successfully.");
  };

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      activeArea="Manage a Team"
      studentName="[Student Name]"
    >
      <div className="team-opportunity-page">
        <div className="page-heading">
          <div>
            <h1>Create Team Opportunity</h1>
            <p>Create an opportunity and find suitable students for your team.</p>
          </div>

          <button className="outline-button" type="button" onClick={saveDraft}>
            Save as Draft
          </button>
        </div>

        <div className="form-steps">
          <span className={step === 1 ? "step active" : "step"}>1 Opportunity Details</span>
          <span className={step === 2 ? "step active" : "step"}>2 Required Roles</span>
        </div>

        {message && <div className="form-message">{message}</div>}

        {step === 1 && (
          <section className="opportunity-card">
            <div className="form-grid">
              <Field
                label="Title"
                name="title"
                value={form.title}
                onChange={updateForm}
                error={errors.title}
                placeholder="Enter opportunity title"
              />

              <Field
                label="Opportunity Type"
                name="type"
                value={form.type}
                onChange={updateForm}
                error={errors.type}
                select
                options={["Course Project", "Research Activity", "Competition"]}
              />

              <Field
                label="Description"
                name="description"
                value={form.description}
                onChange={updateForm}
                error={errors.description}
                textarea
                placeholder="Describe the opportunity"
              />

              <Field
                label="Goals"
                name="goals"
                value={form.goals}
                onChange={updateForm}
                error={errors.goals}
                textarea
                placeholder="What should the team achieve?"
              />

              <Field
                label="Application Deadline"
                name="deadline"
                value={form.deadline}
                onChange={updateForm}
                error={errors.deadline}
                type="date"
              />

              {form.type === "Course Project" && (
                <>
                  <Field
                    label="Course Name"
                    name="courseName"
                    value={form.courseName}
                    onChange={updateForm}
                    error={errors.courseName}
                    placeholder="Example: SWE 363"
                  />

                  <Field
                    label="Course Section"
                    name="courseSection"
                    value={form.courseSection}
                    onChange={updateForm}
                    error={errors.courseSection}
                    placeholder="Example: 02"
                  />
                </>
              )}
            </div>

            <div className="form-actions">
              <button
                className="primary-button"
                type="button"
                onClick={() => validateStepOne() && setStep(2)}
              >
                Continue to Required Roles
              </button>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="opportunity-card">
            <div className="role-form">
              <h2>Required Roles</h2>
              <p>Add the roles and number of members needed for your opportunity.</p>

              <div className="form-grid">
                <Field
                  label="Role Title"
                  name="title"
                  value={role.title}
                  onChange={(event) =>
                    updateRole({
                      target: { name: "title", value: event.target.value },
                    })
                  }
                  error={errors.roleTitle}
                  placeholder="Example: UI/UX Designer"
                />

                <Field
                  label="Number of Members"
                  name="members"
                  value={role.members}
                  onChange={updateRole}
                  error={errors.members}
                  type="number"
                  placeholder="Example: 2"
                />

                <Field
                  label="Required Skills"
                  name="skills"
                  value={role.skills}
                  onChange={updateRole}
                  error={errors.skills}
                  textarea
                  placeholder="Example: Figma, communication"
                />

                <Field
                  label="Preferred Experience"
                  name="experience"
                  value={role.experience}
                  onChange={updateRole}
                  error={errors.experience}
                  textarea
                  placeholder="Describe preferred experience"
                />
              </div>

              <button className="secondary-button" type="button" onClick={addRole}>
                <Plus size={18} />
                Add Required Role
              </button>
            </div>

            {roles.length > 0 && (
              <div className="roles-list">
                <h2>Added Roles</h2>

                {roles.map((item, index) => (
                  <div className="role-item" key={`${item.title}-${index}`}>
                    <div>
                      <strong>{item.title}</strong>
                      <span>{item.members} position(s)</span>
                      <small>{item.skills}</small>
                    </div>

                    <button type="button" onClick={() => removeRole(index)}>
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="form-actions between">
              <button className="back-button" type="button" onClick={() => setStep(1)}>
                Back
              </button>

              <button className="primary-button" type="button" onClick={publishOpportunity}>
                Publish Opportunity
              </button>
            </div>
          </section>
        )}

        {showConfirm && (
          <div className="modal-backdrop">
            <div className="confirm-modal">
              <h2>Publish opportunity?</h2>
              <p>
                Your opportunity will become visible to eligible students.
              </p>

              <div className="modal-actions">
                <button className="primary-button" type="button" onClick={confirmPublish}>
                  Confirm
                </button>
                <button
                  className="outline-button"
                  type="button"
                  onClick={() => setShowConfirm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  textarea = false,
  select = false,
  options = [],
  type = "text",
}) {
  return (
    <label className="form-field">
      <span>
        {label} <b>*</b>
      </span>

      {textarea ? (
        <textarea name={name} value={value} onChange={onChange} placeholder={placeholder} />
      ) : select ? (
        <select name={name} value={value} onChange={onChange}>
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}

      {error && <small className="field-error">{error}</small>}
    </label>
  );
}

export default CreateTeamOpportunity;