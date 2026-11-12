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

      </section>
    </DashboardLayout>
  );
}

export default CreateUniversityOpportunity;
