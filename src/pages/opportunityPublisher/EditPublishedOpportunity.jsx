import "./CreateUniversityOpportunity.css";
import "./PublishedOpportunityDetails.css";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import DashboardLayout from "../../layouts/DashboardLayout";
import opportunityPublisherSidebarItems from "./opportunityPublisherSidebarItems";
import Input from "../../components/common/Input";
import Textarea from "../../components/common/Textarea";
import Select from "../../components/common/Select";
import { undergraduateMajors, mxPrograms, phdPrograms } from "./kfupmPrograms";
import Button from "../../components/common/Button";

import { getPublisherOpportunities , updatePublisherOpportunity } from "./opportunityStorage";

function EditPublishedOpportunity() {
  const { id } = useParams();
  const navigate = useNavigate();
  const opportunities = getPublisherOpportunities();
  const opportunity = opportunities.find(
    (item) => item.id === id
  );
  const [formData, setFormData] = useState({
    title: opportunity?.title || "",
    description: opportunity?.description || "",
    category: opportunity?.category || "",
    opportunityType: opportunity?.opportunityType || "",
  
    officialSource: opportunity?.officialSource || "",
    registrationLink: opportunity?.registrationLink || "",
    registrationInstructions: opportunity?.registrationInstructions || "",
  
    eventDate: opportunity?.eventDate || "",
    eventLocation: opportunity?.eventLocation || "",
    registrationDeadline: opportunity?.registrationDeadline || "",
  
    academicLevel: opportunity?.academicLevel || "",
    studentYears: opportunity?.studentYears || [],
    eligibleMajors: opportunity?.eligibleMajors || [],
    majorsScope: opportunity?.majorsScope || "all",
  
    requiredSkills: opportunity?.requiredSkills || [],
    otherRequirements: opportunity?.otherRequirements || "",
  });
  
  const [selectedStatus, setSelectedStatus] = useState(
    opportunity?.status || "draft"
  );
  
  const [errors, setErrors] = useState({});
  const [majorSearch, setMajorSearch] = useState("");
  const [selectedCollege, setSelectedCollege] = useState(
    "College of Computing and Mathematics"
    );

  const [formMessage, setFormMessage] = useState("");
  const handleChange = (event) => {
    const { name, value } = event.target;
  
    if (name === "academicLevel") {
      setFormData((previous) => ({
        ...previous,
        academicLevel: value,
        studentYears: [],
        eligibleMajors: [],
      }));
  
      setMajorSearch("");
  
      setSelectedCollege(
        value === "Graduate"
          ? "MX Master's Programs"
          : "College of Computing and Mathematics"
      );
  
      return;
    }
  
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };
  
  const handleCheckboxChange = (event) => {
    const { name, value, checked } = event.target;
  
    setFormData((previous) => ({
      ...previous,
      [name]: checked
        ? [...previous[name], value]
        : previous[name].filter((item) => item !== value),
    }));
  };
  
  const mxGroup = "MX Master's Programs";
  const phdGroup = "PhD Programs";
  const colleges = Object.keys(undergraduateMajors);

  let availableGroups = [];

  if (formData.academicLevel === "Undergraduate") {
    availableGroups = colleges;
  } else if (formData.academicLevel === "Graduate") {
    availableGroups = [mxGroup, phdGroup];
  } else if (formData.academicLevel === "Both") {
    availableGroups = [...colleges, mxGroup, phdGroup];
  }

  const currentGroup = availableGroups.includes(selectedCollege)
    ? selectedCollege
    : availableGroups[0] || "";

  const currentMajors =
    currentGroup === mxGroup
      ? mxPrograms
      : currentGroup === phdGroup
        ? phdPrograms
        : undergraduateMajors[currentGroup] || [];

  const programPrefix =
    currentGroup === mxGroup
      ? "MX"
      : currentGroup === phdGroup
        ? "PHD"
        : "UG";

  const filteredMajors = currentMajors.filter((major) =>
    major.toLowerCase().includes(majorSearch.toLowerCase())
  );

  const validateForm = () => {
    const newErrors = {};
  
    const requiredFields = [
      "title",
      "description",
      "category",
      "opportunityType",
      "officialSource",
      "eventDate",
      "eventLocation",
      "registrationDeadline",
      "academicLevel",
    ];
  
    requiredFields.forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = "This field is required.";
      }
    });
  
    if (
      (formData.academicLevel === "Undergraduate" ||
        formData.academicLevel === "Both") &&
      formData.studentYears.length === 0
    ) {
      newErrors.studentYears = "Select at least one student year.";
    }
  
    if (
      formData.majorsScope === "specific" &&
      formData.eligibleMajors.length === 0
    ) {
      newErrors.eligibleMajors = "Select at least one major.";
    }
  
    const isValidUrl = (value) => {
      try {
        const url = new URL(value);
        return url.protocol === "http:" || url.protocol === "https:";
      } catch {
        return false;
      }
    };
  
    if (
      formData.officialSource.trim() &&
      !isValidUrl(formData.officialSource.trim())
    ) {
      newErrors.officialSource = "Please enter a valid official source URL.";
    }
  
    if (
      formData.registrationLink.trim() &&
      !isValidUrl(formData.registrationLink.trim())
    ) {
      newErrors.registrationLink = "Please enter a valid registration URL.";
    }
  
    if (
      formData.eventDate &&
      formData.registrationDeadline &&
      formData.registrationDeadline > formData.eventDate
    ) {
      newErrors.registrationDeadline =
        "Registration deadline cannot be after the event date.";
    }
  
    setErrors(newErrors);
  
    return Object.keys(newErrors).length === 0;
  };
  
  
  const handleSaveChanges = () => {
    
    if (!opportunity || opportunity.status === "withdrawn") {
        setFormMessage("Withdrawn opportunities cannot be edited.");
        return;
    }
  
    if (selectedStatus === "published") {
      const isValid = validateForm();
  
      if (!isValid) {
        setFormMessage("Please correct the highlighted fields.");
        return;
      }
    } else {
      setErrors({});
    }
  
    try {
      updatePublisherOpportunity(id, {
        ...formData,
        status: selectedStatus,
      });
  
      setFormMessage("Changes saved successfully!");
    } catch (error) {
      console.error("Error updating opportunity:", error);
  
      setFormMessage("Unable to save changes. Please try again.");
    }
  };  
  
    const handleWithdraw = () => {
    if (!opportunity || opportunity.status !== "published") {
      return;
    }
  
    const confirmed = window.confirm(
      "Are you sure you want to withdraw this opportunity? You will not be able to edit or restore it afterward."
    );
  
    if (!confirmed) {
      return;
    }
  
    try {
      updatePublisherOpportunity(id, {
        status: "withdrawn",
      });
  
      navigate("/my-published-opportunities");
    } catch (error) {
      console.error("Error withdrawing opportunity:", error);
  
      setFormMessage(
        "Unable to withdraw opportunity. Please try again."
      );
    }
  };
  
  return (
    <DashboardLayout
      sidebarItems={opportunityPublisherSidebarItems}
      activeArea="My Posted Opportunities"
    >
      <section>
        <Link
            to="/my-published-opportunities"
            className="details-back-link"
        >
            ← Back to My Posted Opportunities
        </Link>
        {opportunity ? (
          <>
            <h1>Edit Opportunity</h1>
            <p>Update your university opportunity information.</p>

            <Select
            label="Opportunity Status"
            name="status"
            value={selectedStatus}
            onChange={(event) => setSelectedStatus(event.target.value)}
            >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            </Select>

            <Input
              label="Opportunity Title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              required
              error={errors.title}
            />

            <Textarea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              required
              error={errors.description}
            />

            <Select
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            error={errors.category}
            >
            <option value="">Select a category</option>
            <option value="Academic">Academic</option>
            <option value="Technology">Technology</option>
            <option value="Student Activities">Student Activities</option>
            <option value="Career Development">Career Development</option>
            </Select>

            <Select
            label="Opportunity Type"
            name="opportunityType"
            value={formData.opportunityType}
            onChange={handleChange}
            required
            error={errors.opportunityType}
            >
            <option value="">Select an opportunity type</option>
            <option value="Hackathon">Hackathon</option>
            <option value="Competition">Competition</option>
            <option value="Workshop">Workshop</option>
            <option value="Club Activity">Club Activity</option>
            </Select>

            <Input
            label="Official Source"
            name="officialSource"
            type="url"
            placeholder="https://example.com"
            value={formData.officialSource}
            onChange={handleChange}
            required
            error={errors.officialSource}
            />

            <Input
            label="Registration Link"
            name="registrationLink"
            type="url"
            placeholder="https://example.com/register"
            value={formData.registrationLink}
            onChange={handleChange}
            error={errors.registrationLink}
            />

            <Textarea
            label="Registration Instructions"
            name="registrationInstructions"
            placeholder="Explain how students can register"
            value={formData.registrationInstructions}
            onChange={handleChange}
            rows={4}
            />

            <Input
            label="Event Date"
            name="eventDate"
            type="date"
            value={formData.eventDate}
            onChange={handleChange}
            required
            error={errors.eventDate}
            />

            <Input
            label="Event Location"
            name="eventLocation"
            type="text"
            placeholder="Enter event location"
            value={formData.eventLocation}
            onChange={handleChange}
            required
            error={errors.eventLocation}
            />

            <Input
            label="Registration Deadline"
            name="registrationDeadline"
            type="date"
            value={formData.registrationDeadline}
            onChange={handleChange}
            required
            error={errors.registrationDeadline}
            />

            <section className="audience-section">
            <h2>Target Audience</h2>

            <div className="audience-fields">
                <Select
                label="Academic Level"
                name="academicLevel"
                value={formData.academicLevel}
                onChange={handleChange}
                required
                error={errors.academicLevel}
                >
                <option value="">Select academic level</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Graduate">Graduate</option>
                <option value="Both">Both</option>
                </Select>

                {(formData.academicLevel === "Undergraduate" ||
                formData.academicLevel === "Both") && (
                <fieldset className="audience-group">
                    <legend>Eligible Student Years *</legend>

                    <div className="audience-options">
                    {[
                        "Orientation Year",
                        "Freshman",
                        "Sophomore",
                        "Junior",
                        "Senior",
                    ].map((year) => (
                        <label key={year} className="audience-option">
                        <input
                            type="checkbox"
                            name="studentYears"
                            value={year}
                            checked={formData.studentYears.includes(year)}
                            onChange={handleCheckboxChange}
                        />
                        {year}
                        </label>
                    ))}
                    </div>
                {errors.studentYears && (
                <p className="audience-error">
                    {errors.studentYears}
                </p>
                )}
                </fieldset>
                )}

                <fieldset className="audience-group">
                <legend>Eligible Majors / Programs *</legend>

                <div className="majors-scope">
                    <label className="majors-radio-option">
                    <input
                        type="radio"
                        name="majorsScope"
                        value="all"
                        checked={formData.majorsScope === "all"}
                        onChange={(event) =>
                        setFormData((previous) => ({
                            ...previous,
                            majorsScope: event.target.value,
                            eligibleMajors: [],
                        }))
                        }
                    />
                    All Majors
                    </label>

                    <label className="majors-radio-option">
                    <input
                        type="radio"
                        name="majorsScope"
                        value="specific"
                        checked={formData.majorsScope === "specific"}
                        onChange={(event) =>
                        setFormData((previous) => ({
                            ...previous,
                            majorsScope: event.target.value,
                            eligibleMajors: [],
                        }))
                        }
                    />
                    Specific Majors
                    </label>
                </div>

                {formData.majorsScope === "specific" &&
                    formData.academicLevel && (
                    <div className="majors-picker">
                        <Select
                        label="College / Program Group"
                        value={currentGroup}
                        onChange={(event) => {
                            setSelectedCollege(event.target.value);
                            setMajorSearch("");
                        }}
                        >
                        {availableGroups.map((group) => (
                            <option key={group} value={group}>
                            {group}
                            </option>
                        ))}
                        </Select>

                        <Input
                        label="Search Majors"
                        type="search"
                        placeholder="Search for a major or program"
                        value={majorSearch}
                        onChange={(event) =>
                            setMajorSearch(event.target.value)
                        }
                        />

                        <div className="majors-options">
                        {filteredMajors.map((major) => (
                            <label
                            key={`${currentGroup}-${major}`}
                            className="audience-option"
                            >
                            <input
                                type="checkbox"
                                name="eligibleMajors"
                                value={`${programPrefix}:${major}`}
                                checked={formData.eligibleMajors.includes(
                                `${programPrefix}:${major}`
                                )}
                                onChange={handleCheckboxChange}
                            />
                            {major}
                            </label>
                        ))}

                        {filteredMajors.length === 0 && (
                            <p>No matching programs found.</p>
                        )}
                        </div>

                        <p className="majors-feedback">
                        {formData.eligibleMajors.length} selected
                        </p>
                    </div>
                    )}

                    {errors.eligibleMajors && (
                    <p className="audience-error">
                        {errors.eligibleMajors}
                    </p>
                    )}

                </fieldset>
            </div>
            </section>

            <fieldset className="audience-group">
                <legend>Required Skills</legend>

                <div className="audience-options">
                    {[
                    "Technical",
                    "Communication",
                    "Teamwork",
                    "Leadership",
                    ].map((skill) => (
                    <label key={skill} className="audience-option">
                        <input
                        type="checkbox"
                        name="requiredSkills"
                        value={skill}
                        checked={formData.requiredSkills.includes(skill)}
                        onChange={handleCheckboxChange}
                        />
                        {skill}
                    </label>
                    ))}
                </div>
                </fieldset>

                <Textarea
                label="Other Requirements"
                name="otherRequirements"
                placeholder="Enter additional eligibility requirements or specific skills"
                value={formData.otherRequirements}
                onChange={handleChange}
                rows={4}
                />

                {formMessage && (
                <p role="status">{formMessage}</p>
                )}

                <div className="opportunity-actions">
                <Button type="button" onClick={handleSaveChanges}>
                    Save Changes
                </Button>

                {opportunity.status === "published" && (
                    <Button
                    type="button"
                    variant="secondary"
                    onClick={handleWithdraw}
                    >
                    Withdraw Opportunity
                    </Button>
                )}
                </div>

          </>
        ) : (
          <p>Opportunity not found.</p>
        )}
      </section>
    </DashboardLayout>
  );
}

export default EditPublishedOpportunity;
