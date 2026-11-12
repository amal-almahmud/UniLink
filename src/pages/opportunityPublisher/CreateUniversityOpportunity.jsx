import { useState } from "react";
import Input from "../../components/common/Input";
import Textarea from "../../components/common/Textarea";
import Select from "../../components/common/Select";

import DashboardLayout from "../../layouts/DashboardLayout";
import opportunityPublisherSidebarItems from "./opportunityPublisherSidebarItems";

function CreateUniversityOpportunity() {
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
      });
    
    const handleChange = (event) => {
       const { name, value } = event.target;
    
        setFormData((previous) => ({
          ...previous,
          [name]: value,
        }));
      };
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

        <Input
        label="Opportunity Title"
        name="title"
        type="text"
        placeholder="Enter opportunity title"
        value={formData.title}
        onChange={handleChange}
        required
        />

        <Textarea
        label="Description"
        name="description"
        placeholder="Describe the university opportunity"
        value={formData.description}
        onChange={handleChange}
        rows={5}
        required
        />

        <Select
        label="Category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
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
        />

        <Input
        label="Registration Link"
        name="registrationLink"
        type="url"
        placeholder="https://example.com/register"
        value={formData.registrationLink}
        onChange={handleChange}
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
        />
        <Input
        label="Event Location"
        name="eventLocation"
        type="text"
        placeholder="Enter event location"
        value={formData.eventLocation}
        onChange={handleChange}
        required
        />

        <Input
        label="Registration Deadline"
        name="registrationDeadline"
        type="date"
        value={formData.registrationDeadline}
        onChange={handleChange}
        required
        />
      </section>
    </DashboardLayout>
  );
}

export default CreateUniversityOpportunity;
