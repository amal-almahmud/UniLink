import "./CreateUniversityOpportunity.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router";

import Input from "../../components/common/Input";
import Textarea from "../../components/common/Textarea";
import Select from "../../components/common/Select";
import Button from "../../components/common/Button";
import DashboardLayout from "../../layouts/DashboardLayout";

import opportunityPublisherSidebarItems from "./opportunityPublisherSidebarItems";
import {
  undergraduateMajors,
  mxPrograms,
  phdPrograms,
} from "./kfupmPrograms";

import {
  getPublisherOpportunities,
  savePublisherOpportunity,
} from "./opportunityStorage";

function CreateUniversityOpportunity() {
  const navigate = useNavigate();
  const location = useLocation();
  const page =
        location.pathname === "/check-existing-opportunities"
        ? "check"
        : "post";
  const [searchTitle, setSearchTitle] = useState("");
  const [searchKeywords, setSearchKeywords] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState("");

  const resetSearch = () => {
    setSearchResults([]);
    setHasSearched(false);
    setSearchError("");
  };

  const handleSearch = (event) => {
    event.preventDefault();

    const title = searchTitle.trim().toLowerCase();

    const keywords = searchKeywords
      .trim()
      .toLowerCase()
      .split(/[\s,]+/)
      .filter(Boolean);

    if (!title && keywords.length === 0 && !searchType) {
      setSearchError(
        "Enter a title, keywords, or opportunity type to search."
      );
      setHasSearched(false);
      return;
    }

    const opportunities = getPublisherOpportunities();

    const matches = opportunities.filter((opportunity) => {
      if (opportunity.status !== "published") {
        return false;
      }

      const opportunityTitle = (
        opportunity.title || ""
      ).toLowerCase();

      const opportunityText = [
        opportunity.title,
        opportunity.description,
        opportunity.category,
        opportunity.opportunityType,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const titleMatches =
        !title || opportunityTitle.includes(title);

      const keywordsMatch = keywords.every((keyword) =>
        opportunityText.includes(keyword)
      );

      const typeMatches =
        !searchType ||
        opportunity.opportunityType === searchType;

      return titleMatches && keywordsMatch && typeMatches;
    });

    setSearchResults(matches);
    setHasSearched(true);
    setSearchError("");
  };

  const continueToPost = () => {
    if (!hasSearched || searchResults.length > 0) {
      return;
    }

    setFormData((previous) => ({
      ...previous,
      title: previous.title || searchTitle.trim(),
      opportunityType:
        previous.opportunityType || searchType,
    }));

    navigate("/create-university-opportunity");

  };

  // Existing Post University Opportunity form
  const [majorSearch, setMajorSearch] = useState("");

  const [selectedCollege, setSelectedCollege] = useState(
    "College of Computing and Mathematics"
  );

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    opportunityType: "",
    officialSource: "",
    registrationLink: "",
    registrationInstructions: "",
    eventDate: "",
    eventLocation: "",
    registrationDeadline: "",
    academicLevel: "",
    studentYears: [],
    eligibleMajors: [],
    majorsScope: "all",
    requiredSkills: [],
    otherRequirements: "",
  });

  const [errors, setErrors] = useState({});
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

  const isValidUrl = (value) => {
    try {
      const url = new URL(value);

      return (
        url.protocol === "http:" ||
        url.protocol === "https:"
      );
    } catch {
      return false;
    }
  };

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
      newErrors.studentYears =
        "Select at least one student year.";
    }

    if (
      formData.majorsScope === "specific" &&
      formData.eligibleMajors.length === 0
    ) {
      newErrors.eligibleMajors =
        "Select at least one major.";
    }

    if (
      formData.officialSource.trim() &&
      !isValidUrl(formData.officialSource.trim())
    ) {
      newErrors.officialSource =
        "Please enter a valid official source URL.";
    }

    if (
      formData.registrationLink.trim() &&
      !isValidUrl(formData.registrationLink.trim())
    ) {
      newErrors.registrationLink =
        "Please enter a valid registration URL.";
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

  const handleSubmit = () => {
    const isValid = validateForm();

    if (!isValid) {
      setFormMessage(
        "Please correct the errors in the form."
      );
      return;
    }

    try {
      const newOpportunity = savePublisherOpportunity(
        formData,
        "published"
      );

      navigate(
        `/published-opportunity/${newOpportunity.id}`
      );
    } catch (error) {
      console.error(
        "Error publishing opportunity:",
        error
      );

      setFormMessage(
        "Unable to publish opportunity. Please try again."
      );
    }
  };

  const handleSaveDraft = () => {
    try {
      const newOpportunity = savePublisherOpportunity(
        formData,
        "draft"
      );

      navigate(
        `/published-opportunity/${newOpportunity.id}`
      );
    } catch (error) {
      console.error("Error saving draft:", error);

      setFormMessage(
        "Unable to save draft. Please try again."
      );
    }
  };

  // Majors and programs
  const mxGroup = "MX Master's Programs";
  const phdGroup = "PhD Programs";

  const colleges = Object.keys(undergraduateMajors);

  let availableGroups = [];

  if (formData.academicLevel === "Undergraduate") {
    availableGroups = colleges;
  } else if (formData.academicLevel === "Graduate") {
    availableGroups = [mxGroup, phdGroup];
  } else if (formData.academicLevel === "Both") {
    availableGroups = [
      ...colleges,
      mxGroup,
      phdGroup,
    ];
  }

  const currentGroup = availableGroups.includes(
    selectedCollege
  )
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
    major
      .toLowerCase()
      .includes(majorSearch.toLowerCase())
  );

  return (
    <DashboardLayout
      sidebarItems={opportunityPublisherSidebarItems}
      activeArea="Publish an Opportunity"
    >
      {page === "check" ? (
        <section className="publisher-check">
          <h1>Check Existing Opportunities</h1>

          <p className="publisher-check-description">
            Search before publishing to avoid duplicate
            university announcements.
          </p>

          <form
            className="publisher-check-card"
            onSubmit={handleSearch}
          >
            <div className="publisher-check-fields">
              <div className="publisher-check-field">
                <label htmlFor="search-title">
                  Search
                </label>

                <input
                  id="search-title"
                  type="search"
                  placeholder="Opportunity title"
                  value={searchTitle}
                  onChange={(event) => {
                    setSearchTitle(event.target.value);
                    resetSearch();
                  }}
                />
              </div>

              <div className="publisher-check-field">
                <label htmlFor="search-keywords">
                  Keywords
                </label>

                <input
                  id="search-keywords"
                  type="search"
                  placeholder="AI, sustainability, workshop"
                  value={searchKeywords}
                  onChange={(event) => {
                    setSearchKeywords(event.target.value);
                    resetSearch();
                  }}
                />
              </div>

              <div className="publisher-check-field">
                <label htmlFor="search-type">
                  Opportunity Type
                </label>

                <select
                  id="search-type"
                  value={searchType}
                  onChange={(event) => {
                    setSearchType(event.target.value);
                    resetSearch();
                  }}
                >
                  <option value="">
                    Select opportunity type
                  </option>
                  <option value="Hackathon">
                    Hackathon
                  </option>
                  <option value="Competition">
                    Competition
                  </option>
                  <option value="Workshop">
                    Workshop
                  </option>
                  <option value="Club Activity">
                    Club Activity
                  </option>
                </select>
              </div>
            </div>

            <div className="publisher-check-actions">
              <button
                type="submit"
                className="publisher-check-button publisher-search-button"
              >
                Search
              </button>

              <button
                type="button"
                className="publisher-check-button publisher-continue-button"
                onClick={continueToPost}
                disabled={
                  !hasSearched ||
                  searchResults.length > 0
                }
              >
                Continue to Post Opportunity
              </button>
            </div>

            {searchError && (
              <p
                className="publisher-check-error"
                role="alert"
              >
                {searchError}
              </p>
            )}

            {hasSearched && (
              <div
                className="publisher-check-results"
                role="status"
              >
                {searchResults.length === 0 ? (
                  <p>
                    No matching published opportunities
                    found in this browser. You can
                    continue to post your opportunity.
                  </p>
                ) : (
                  <>
                    <p>
                      <strong>
                        {searchResults.length} possible
                        matching opportunity found.
                      </strong>
                    </p>

                    {searchResults.map((opportunity) => (
                      <div
                        key={opportunity.id}
                        className="publisher-check-result"
                      >
                        <h3>{opportunity.title}</h3>

                        <p>
                          {opportunity.opportunityType ||
                            "Opportunity"}
                        </p>

                        <button
                          type="button"
                          className="publisher-check-link"
                          onClick={() =>
                            navigate(
                              `/published-opportunity/${opportunity.id}`
                            )
                          }
                        >
                          View Details
                        </button>
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
          </form>
        </section>
      ) : (
        <section>
          <button
            type="button"
            className="publisher-check-back"
            onClick={() => navigate("/check-existing-opportunities")}
          >
            ← Back to Check Existing Opportunities
          </button>

          <h1>Post University Opportunity</h1>

          <p>
            Share an official university opportunity
            with KFUPM students.
          </p>

          <Input
            label="Opportunity Title"
            name="title"
            type="text"
            placeholder="Enter opportunity title"
            value={formData.title}
            onChange={handleChange}
            required
            error={errors.title}
          />

          <Textarea
            label="Description"
            name="description"
            placeholder="Describe the university opportunity"
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
            <option value="">
              Select a category
            </option>
            <option value="Academic">
              Academic
            </option>
            <option value="Technology">
              Technology
            </option>
            <option value="Student Activities">
              Student Activities
            </option>
            <option value="Career Development">
              Career Development
            </option>
          </Select>

          <Select
            label="Opportunity Type"
            name="opportunityType"
            value={formData.opportunityType}
            onChange={handleChange}
            required
            error={errors.opportunityType}
          >
            <option value="">
              Select an opportunity type
            </option>
            <option value="Hackathon">
              Hackathon
            </option>
            <option value="Competition">
              Competition
            </option>
            <option value="Workshop">
              Workshop
            </option>
            <option value="Club Activity">
              Club Activity
            </option>
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
            placeholder="Explain how students can register for this opportunity"
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
                <option value="">
                  Select academic level
                </option>
                <option value="Undergraduate">
                  Undergraduate
                </option>
                <option value="Graduate">
                  Graduate
                </option>
                <option value="Both">
                  Both
                </option>
              </Select>

              {(formData.academicLevel ===
                "Undergraduate" ||
                formData.academicLevel ===
                  "Both") && (
                <>
                  <fieldset className="audience-group">
                    <legend>
                      Eligible Student Years *
                    </legend>

                    <div className="audience-options">
                      {[
                        "Orientation Year",
                        "Freshman",
                        "Sophomore",
                        "Junior",
                        "Senior",
                      ].map((year) => (
                        <label
                          key={year}
                          className="audience-option"
                        >
                          <input
                            type="checkbox"
                            name="studentYears"
                            value={year}
                            checked={formData.studentYears.includes(
                              year
                            )}
                            onChange={
                              handleCheckboxChange
                            }
                          />
                          {year}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  {errors.studentYears && (
                    <p className="audience-error">
                      {errors.studentYears}
                    </p>
                  )}
                </>
              )}

              <fieldset className="audience-group">
                <legend>
                  Eligible Majors / Programs *
                </legend>

                <div className="majors-scope">
                  <label className="majors-radio-option">
                    <input
                      type="radio"
                      name="majorsScope"
                      value="all"
                      checked={
                        formData.majorsScope === "all"
                      }
                      onChange={(event) =>
                        setFormData((previous) => ({
                          ...previous,
                          majorsScope:
                            event.target.value,
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
                      checked={
                        formData.majorsScope ===
                        "specific"
                      }
                      onChange={(event) =>
                        setFormData((previous) => ({
                          ...previous,
                          majorsScope:
                            event.target.value,
                          eligibleMajors: [],
                        }))
                      }
                    />
                    Specific Majors
                  </label>
                </div>

                {formData.majorsScope ===
                  "specific" &&
                  formData.academicLevel && (
                    <div className="majors-picker">
                      <Select
                        label="College / Program Group"
                        value={currentGroup}
                        onChange={(event) => {
                          setSelectedCollege(
                            event.target.value
                          );
                          setMajorSearch("");
                        }}
                      >
                        {availableGroups.map(
                          (group) => (
                            <option
                              key={group}
                              value={group}
                            >
                              {group}
                            </option>
                          )
                        )}
                      </Select>

                      <Input
                        label="Search Majors"
                        type="search"
                        placeholder="Search for a major or program"
                        value={majorSearch}
                        onChange={(event) =>
                          setMajorSearch(
                            event.target.value
                          )
                        }
                      />

                      <div className="majors-options">
                        {filteredMajors.map(
                          (major) => (
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
                                onChange={
                                  handleCheckboxChange
                                }
                              />
                              {major}
                            </label>
                          )
                        )}

                        {filteredMajors.length ===
                          0 && (
                          <p>
                            No matching programs
                            found.
                          </p>
                        )}
                      </div>

                      <p className="majors-feedback">
                        {
                          formData.eligibleMajors
                            .length
                        }{" "}
                        selected
                      </p>
                    </div>
                  )}
              </fieldset>

              {errors.eligibleMajors && (
                <p className="audience-error">
                  {errors.eligibleMajors}
                </p>
              )}

              <fieldset className="audience-group">
                <legend>Required Skills</legend>

                <div className="audience-options">
                  {[
                    "Technical",
                    "Communication",
                    "Teamwork",
                    "Leadership",
                  ].map((skill) => (
                    <label
                      key={skill}
                      className="audience-option"
                    >
                      <input
                        type="checkbox"
                        name="requiredSkills"
                        value={skill}
                        checked={formData.requiredSkills.includes(
                          skill
                        )}
                        onChange={
                          handleCheckboxChange
                        }
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
            </div>
          </section>

          {formMessage && (
            <p role="status">{formMessage}</p>
          )}

          <div className="opportunity-actions">
            <Button
              type="button"
              variant="secondary"
              onClick={handleSaveDraft}
            >
              Save as Draft
            </Button>

            <Button
              type="button"
              onClick={handleSubmit}
            >
              Submit Opportunity
            </Button>
          </div>
        </section>
      )}
    </DashboardLayout>
  );
}

export default CreateUniversityOpportunity;