import { useState } from "react";
import {
  Bookmark,
  Compass,
  FileText,
  Plus,
  Search,
  Send,
  UserSearch,
  UsersRound,
} from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import Textarea from "../../components/common/Textarea";
import Button from "../../components/common/Button";
import "./Settings.css";

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

const majorOptions = [
  { value: "software-engineering", label: "Software Engineering" },
  { value: "computer-science", label: "Computer Science" },
  { value: "computer-engineering", label: "Computer Engineering" },
  { value: "information-systems", label: "Information Systems" },
  { value: "electrical-engineering", label: "Electrical Engineering" },
  { value: "mechanical-engineering", label: "Mechanical Engineering" },
  { value: "chemical-engineering", label: "Chemical Engineering" },
  { value: "civil-engineering", label: "Civil Engineering" },
  { value: "aerospace-engineering", label: "Aerospace Engineering" },
  { value: "industrial-engineering", label: "Industrial Engineering" },
  { value: "petroleum-engineering", label: "Petroleum Engineering" },
  { value: "architecture", label: "Architecture" },
  { value: "accounting", label: "Accounting" },
  { value: "finance", label: "Finance" },
  { value: "management", label: "Management" },
  { value: "marketing", label: "Marketing" },
];

const academicLevelOptions = [
  { value: "freshman", label: "Freshman" },
  { value: "sophomore", label: "Sophomore" },
  { value: "junior", label: "Junior" },
  { value: "senior", label: "Senior" },
  { value: "graduate", label: "Graduate Student" },
];

const initialFormData = {
  profileInformation: "",
  major: "",
  academicLevel: "",
  skills: "",
  interests: "",
  currentPassword: "",
  newPassword: "",
  applicationUpdates: false,
  teamUpdates: false,
  profileVisible: false,
};

function Settings({ userName = "Student Name" }) {
  const [activeArea, setActiveArea] = useState("Find a Team");
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const sidebarItems = sidebarItemsByArea[activeArea];

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((previousErrors) => ({
        ...previousErrors,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const validationErrors = {};

    if (!formData.profileInformation.trim()) {
      validationErrors.profileInformation =
        "Profile information is required.";
    }

    if (!formData.major) {
      validationErrors.major = "Please select your major.";
    }

    if (!formData.academicLevel) {
      validationErrors.academicLevel =
        "Please select your academic level.";
    }

    if (!formData.skills.trim()) {
      validationErrors.skills = "Please enter at least one skill.";
    }

    if (!formData.interests.trim()) {
      validationErrors.interests = "Please enter your interests.";
    }

    if (
      formData.newPassword &&
      formData.newPassword.length < 2
    ) {
      validationErrors.newPassword =
        "Password must contain at least 2 characters.";
    }

    if (formData.newPassword && !formData.currentPassword) {
      validationErrors.currentPassword =
        "Enter your current password before changing it.";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    console.log("Settings saved:", formData);
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      activeArea={activeArea}
      onAreaChange={setActiveArea}
      studentName={userName}
    >
      <section className="settings-page">
        <header className="settings-heading">
          <h1>Settings</h1>

          <p>
            Manage your account information, security, and preferences.
          </p>
        </header>

        <form
          className="settings-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="settings-grid">
            <Input
              label="Profile information"
              name="profileInformation"
              value={formData.profileInformation}
              onChange={handleChange}
              required
              error={errors.profileInformation}
            />

            <Select
              label="Major"
              name="major"
              value={formData.major}
              onChange={handleChange}
              options={majorOptions}
              placeholder="Select major"
              required
              error={errors.major}
            />

            <Select
              label="Academic level"
              name="academicLevel"
              value={formData.academicLevel}
              onChange={handleChange}
              options={academicLevelOptions}
              placeholder="Select academic level"
              required
              error={errors.academicLevel}
            />

            <Textarea
              label="Skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              rows={3}
              required
              error={errors.skills}
            />

            <Textarea
              label="Interests"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              rows={3}
              required
              error={errors.interests}
            />

            <Input
              label="Current Password"
              name="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={handleChange}
              error={errors.currentPassword}
            />

            <Input
              label="New Password"
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
              error={errors.newPassword}
            />
          </div>

          <section className="settings-section">
            <h2>Notification preferences</h2>

            <label className="settings-checkbox">
              <input
                name="applicationUpdates"
                type="checkbox"
                checked={formData.applicationUpdates}
                onChange={handleChange}
              />

              <span>Application updates</span>
            </label>

            <label className="settings-checkbox">
              <input
                name="teamUpdates"
                type="checkbox"
                checked={formData.teamUpdates}
                onChange={handleChange}
              />

              <span>Team updates and deadlines</span>
            </label>
          </section>

          <section className="settings-section settings-privacy">
            <h2>Privacy settings</h2>

            <label className="settings-checkbox">
              <input
                name="profileVisible"
                type="checkbox"
                checked={formData.profileVisible}
                onChange={handleChange}
              />

              <span>Show my profile to team leaders when I apply</span>
            </label>
          </section>

          <p className="settings-note">
            Required field warnings appear directly below invalid inputs.
          </p>

          <div className="settings-actions">
            <Button type="submit">Save Changes</Button>

            <button
              className="settings-cancel"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </DashboardLayout>
  );
}

export default Settings;