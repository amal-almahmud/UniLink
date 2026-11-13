import { Link } from "react-router";
import { useState } from "react";
import "./MyPublishedOpportunities.css";
import DashboardLayout from "../../layouts/DashboardLayout";
import opportunityPublisherSidebarItems from "./opportunityPublisherSidebarItems";
import { getPublisherOpportunities } from "./opportunityStorage";

function MyPublishedOpportunities() {
  const opportunities = getPublisherOpportunities();

  const [statusFilter, setStatusFilter] = useState("all");
  const filteredOpportunities = opportunities.filter((opportunity) => {
    if (statusFilter === "all") {
      return true;
    }
    return opportunity.status === statusFilter;
  });
  
  return (
    <DashboardLayout
      sidebarItems={opportunityPublisherSidebarItems}
      activeArea="My Posted Opportunities"
    >
      <section className="publisher-opportunities-page">
        <h1>My Posted Opportunities</h1>
        <p>Manage your university announcements and drafts.</p>

        <p>Total Opportunities: {opportunities.length}</p>

        <div className="opportunities-filters">
        <button
            type="button"
            className={statusFilter === "all" ? "active" : ""}
            onClick={() => setStatusFilter("all")}
        >
            All
        </button>

        <button
            type="button"
            className={statusFilter === "published" ? "active" : ""}
            onClick={() => setStatusFilter("published")}
        >
            Published
        </button>

        <button
            type="button"
            className={statusFilter === "draft" ? "active" : ""}
            onClick={() => setStatusFilter("draft")}
        >
            Drafts
        </button>

        <button
        type="button"
        className={statusFilter === "withdrawn" ? "active" : ""}
        onClick={() => setStatusFilter("withdrawn")}
        >
        Withdrawn
        </button>

        </div>

        <div className="opportunities-list">
        {filteredOpportunities.length === 0 ? (
            <p>No opportunities found. Create your first opportunity!</p>
        ) : (
            filteredOpportunities.map((opportunity) => (
            <div className="opportunity-card" key={opportunity.id}>
                <h3>{opportunity.title || "Untitled Opportunity"}</h3>

                <p>Category: {opportunity.category || "Not specified"}</p>

                <p>Event Date: {opportunity.eventDate || "Not specified"}</p>

                <p>Status: {opportunity.status}</p>
                <div className="opportunity-card-actions">
                    <Link to={`/published-opportunity/${opportunity.id}`}>
                    View Details
                    </Link>
                    {opportunity.status !== "withdrawn" && (
                    <Link to={`/edit-published-opportunity/${opportunity.id}`}>
                        Edit
                    </Link>
                    )}
                </div>
            </div>
            ))
        )}
        </div>
      </section>
    </DashboardLayout>
  );
}

export default MyPublishedOpportunities;
