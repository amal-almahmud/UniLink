
import DashboardLayout from "../../layouts/DashboardLayout";
import opportunityPublisherSidebarItems from "./opportunityPublisherSidebarItems";

function CreateUniversityOpportunity() {
  return (
    <DashboardLayout
      sidebarItems={opportunityPublisherSidebarItems}
      activeArea="Publish an Opportunity"
    >
      <section>
        <h1>Post University Opportunity</h1>
        <p>
          Share an official university opportunity
          with KFUPM students.
        </p>
      </section>
    </DashboardLayout>
  );
}

export default CreateUniversityOpportunity;
