import "./PublishedOpportunityDetails.css";
import { Link, useParams } from "react-router";
import DashboardLayout from "../../layouts/DashboardLayout";
import opportunityPublisherSidebarItems from "./opportunityPublisherSidebarItems";
import { getPublisherOpportunities } from "./opportunityStorage";

function PublishedOpportunityDetails() {
  const { id } = useParams();

  const opportunities = getPublisherOpportunities();

  const opportunity = opportunities.find(
    (item) => item.id === id
  );

  const isValidWebLink = (value) => {
    try {
      const url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
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
            <h1>{opportunity.title || "Untitled Opportunity"}</h1>

            <p>Status: {opportunity.status}</p>
            <div className="details-card">
                <h2>Description</h2>
                <p>{opportunity.description || "Not specified"}</p>
            </div>
            <div className="details-card">
                <h2>Opportunity Information</h2>
                <p>Category: {opportunity.category || "Not specified"}</p>
                <p>Type: {opportunity.opportunityType || "Not specified"}</p>
                <p>Event Date: {opportunity.eventDate || "Not specified"}</p>
                <p>Location: {opportunity.eventLocation || "Not specified"}</p>
                <p>
                Registration Deadline: {opportunity.registrationDeadline || "Not specified"}
                </p>
            </div>
            <div className="details-card">
                <h2>Registration Information</h2>
                
                <p>
                Official Source:{" "}
                {isValidWebLink(opportunity.officialSource) ? (
                    <a
                    href={opportunity.officialSource}
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    {opportunity.officialSource}
                    </a>
                ) : (
                    opportunity.officialSource || "Not specified"
                )}
                </p>

                <p>
                Registration Link:{" "}
                {isValidWebLink(opportunity.registrationLink) ? (
                    <a
                    href={opportunity.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    {opportunity.registrationLink}
                    </a>
                ) : (
                    opportunity.registrationLink || "Not provided"
                )}
                </p>

                <p>
                Registration Instructions: {opportunity.registrationInstructions || "Not provided"}
                </p>
            </div> 

            <div className="details-card">
                <h2>Target Audience</h2>
                <p>
                Academic Level: {opportunity.academicLevel || "Not specified"}
                </p>
                <p>
                Eligible Student Years:{" "}
                {opportunity.studentYears?.length
                    ? opportunity.studentYears.join(", ")
                    : "Not specified"}
                </p>
                <p>
                Eligible Majors:{" "}
                {opportunity.majorsScope === "all"
                    ? "All Majors"
                    : opportunity.eligibleMajors?.length
                    ? opportunity.eligibleMajors.join(", ")
                    : "Not specified"}
                </p>
            </div>

            <div className="details-card">  
                <h2>Requirements</h2>
                <p>
                Required Skills:{" "}
                {opportunity.requiredSkills?.length
                    ? opportunity.requiredSkills.join(", ")
                    : "Not specified"}
                </p>
                <p>
                Other Requirements: {opportunity.otherRequirements || "Not provided"}
                </p>
            </div>
          </>
        ) : (
          <p>Opportunity not found.</p>
        )}
      </section>
    </DashboardLayout>
  );
}

export default PublishedOpportunityDetails;
