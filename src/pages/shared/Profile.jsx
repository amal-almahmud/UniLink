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
import "./Profile.css";

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

function Profile({ userName = "Student Name" }) {
  const [activeArea, setActiveArea] = useState("Find a Team");

  const [formData, setFormData] = useState({
    fullName: userName === "Student Name" ? "" : userName,
    email: "",
    major: "",
    skills: "",
    interests: "",
    experience: "",
  });

  const [errors, setErrors] = useState({});

  const sidebarItems = sidebarItemsByArea[activeArea];

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
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

    if (!formData.fullName.trim()) {
      validationErrors.fullName = "Full name is required.";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "University email is required.";
    } else if (!formData.email.endsWith("@kfupm.edu.sa")) {
      validationErrors.email =
        "Please enter a valid KFUPM university email.";
    }

    if (!formData.major) {
      validationErrors.major = "Please select your major.";
    }

    if (!formData.skills.trim()) {
      validationErrors.skills = "Please enter at least one skill.";
    }

    if (!formData.interests.trim()) {
      validationErrors.interests = "Please enter your interests.";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    console.log("Profile saved:", formData);
  };

  const handleCancel = () => {
    setFormData({
      fullName: userName === "Student Name" ? "" : userName,
      email: "",
      major: "",
      skills: "",
      interests: "",
      experience: "",
    });

    setErrors({});
  };

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      activeArea={activeArea}
      onAreaChange={setActiveArea}
      studentName={userName}
    >
      <section className="profile-page">
        <header className="profile-heading">
          <h1>My Profile</h1>

          <p>
            Keep your information complete so team leaders can understand
            your fit.
          </p>
        </header>

        <form className="profile-form" onSubmit={handleSubmit} noValidate>
          <div className="profile-grid">
            <Input
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              error={errors.fullName}
            />

            <Input
              label="University Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              error={errors.email}
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

            <Textarea
              label="Skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              required
              error={errors.skills}
              rows={3}
            />

            <Textarea
              label="Interests"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              required
              error={errors.interests}
              rows={4}
            />

            <Textarea
              label="Relevant Experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <p className="profile-note">
            Required field warnings appear directly below invalid inputs.
          </p>

          <div className="profile-actions">
            <Button type="submit">Save Profile</Button>

            <button
              className="profile-cancel"
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

export default Profile;