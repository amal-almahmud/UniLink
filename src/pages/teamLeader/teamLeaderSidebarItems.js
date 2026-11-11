import {
  Plus,
  FileText,
  Users,
  Send,
} from "lucide-react";

const teamLeaderSidebarItems = [
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
    icon: Users,
  },
  {
    label: "My Team",
    to: "/my-team",
    icon: Users,
  },
  {
    label: "Team Updates",
    to: "/team-updates",
    icon: Send,
  },
];

export default teamLeaderSidebarItems;