import {
  Compass,
  Search,
  Plus,
  FileText,
} from "lucide-react";

const opportunityPublisherSidebarItems = [
  {
    label: "Browse Opportunities",
   to: "/publisher-browse-opportunities",
    icon: Compass,
  },
  {
    label: "Check Existing Opportunities",
   to: "/check-existing-opportunities",
    icon: Search,
  },
  {
    label: "Post University Opportunity",
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