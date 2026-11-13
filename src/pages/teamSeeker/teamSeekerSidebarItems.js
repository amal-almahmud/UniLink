import {
  Compass,
  Users,
  Search,
  FileText,
  Mail,
} from "lucide-react";

const teamSeekerSidebarItems = [
  {
    label: "Browse Opportunities",
    to: "/browse-opportunities",
    icon: Compass,
  },
  {
    label: "Find a Team",
    to: "/find-teams",
    icon: Users,
  },
  {
    label: "Looking for a Team",
    to: "/publish-team-request",
    icon: Search,
  },
  {
    label: "My Applications",
    to: "/my-applications",
    icon: FileText,
  },
  {
    label: "Invitations",
    to: "/invitations",
    icon: Mail,
  },
];

export default teamSeekerSidebarItems;