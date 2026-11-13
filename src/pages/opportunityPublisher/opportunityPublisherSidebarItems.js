import { Plus, FileText } from "lucide-react";

const opportunityPublisherSidebarItems = [
  {
    label: "Post Opportunity",
    to: "/create-university-opportunity",
    icon: Plus,
  },
  {
    label: "My Posted Opportunities",
    to: "/my-published-opportunities",
    icon: FileText,
  },
];

export default opportunityPublisherSidebarItems;