import { useState } from "react";
import {
  Compass,
  Bookmark,
  Search,
  FileText,
  Plus,
  UserSearch,
  Send,
  UsersRound,
  ChevronRight,
} from "lucide-react";
import DashboardLayout from "../../layouts/DashboardLayout";
import "./Notifications.css";

const sidebarItemsByArea = {
  "Find a Team": [
    {
      label: "Browse Opportunities",
      to: "/opportunities",
      icon: Compass,
    },
    {
      label: "Saved Opportunities",
      to: "/saved-opportunities",
      icon: Bookmark,
    },
    {
      label: "Find a Team",
      to: "/find-team",
      icon: UsersRound,
    },
    {
      label: "Looking for a Team",
      to: "/looking-for-team",
      icon: Search,
    },
    {
      label: "My Applications and Invitations",
      to: "/applications",
      icon: FileText,
    },
  ],

  "Manage a Team": [
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
      icon: UsersRound,
    },
    {
      label: "My Team",
      to: "/my-team",
      icon: UserSearch,
    },
    {
      label: "Team Updates",
      to: "/team-updates",
      icon: Send,
    },
  ],

  "Publish an Opportunity": [
    {
      label: "Browse Opportunities",
      to: "/opportunities",
      icon: Compass,
    },
    {
      label: "Check Existing Opportunities",
      to: "/existing-opportunities",
      icon: Search,
    },
    {
      label: "Post University Opportunity",
      to: "/publish-opportunity",
      icon: Plus,
    },
    {
      label: "My Posted Opportunities",
      to: "/posted-opportunities",
      icon: FileText,
    },
  ],
};

const filters = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Applications",
    value: "application",
  },
  {
    label: "Team Updates",
    value: "team",
  },
  {
    label: "Opportunities",
    value: "opportunity",
  },
];

const initialNotifications = [
  {
    id: 1,
    category: "application",
    title: "Application accepted",
    message: "Your application to Green AI Team was accepted.",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 2,
    category: "application",
    title: "Application rejected",
    message: "Your application to Data for Good was not selected.",
    time: "2 days ago",
    unread: false,
  },
  {
    id: 3,
    category: "team",
    title: "New team update",
    message: "Campus Innovators posted a progress update.",
    time: "3 days ago",
    unread: true,
  },
  {
    id: 4,
    category: "opportunity",
    title: "Upcoming deadline",
    message: "Smart Campus applications close in 8 days.",
    time: "4 days ago",
    unread: false,
  },
  {
    id: 5,
    category: "team",
    title: "Team member removed",
    message: "Your team membership was updated.",
    time: "5 days ago",
    unread: false,
  },
  {
    id: 6,
    category: "opportunity",
    title: "Opportunity published",
    message: "Your university opportunity is now visible.",
    time: "6 days ago",
    unread: false,
  },
  {
    id: 7,
    category: "opportunity",
    title: "Opportunity withdrawn",
    message: "The public listing has been removed.",
    time: "7 days ago",
    unread: false,
  },
  {
    id: 8,
    category: "application",
    title: "Invitation received",
    message: "Student Success Lab invited you as Data Analyst.",
    time: "8 days ago",
    unread: true,
  },
];

function getNotificationIcon(category) {
  if (category === "application") {
    return FileText;
  }

  if (category === "team") {
    return UsersRound;
  }

  return Compass;
}

function Notifications({ userName = "Student Name" }) {
  const [activeArea, setActiveArea] = useState("Find a Team");
  const [activeFilter, setActiveFilter] = useState("all");
  const [notifications, setNotifications] =
    useState(initialNotifications);

  const sidebarItems = sidebarItemsByArea[activeArea];

  const visibleNotifications =
    activeFilter === "all"
      ? notifications
      : notifications.filter(
          (notification) =>
            notification.category === activeFilter
        );

  function markAsRead(id) {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              unread: false,
            }
          : notification
      )
    );
  }

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      activeArea={activeArea}
      onAreaChange={setActiveArea}
      studentName={userName}
    >
      <section className="notifications-page">
        <header className="notifications-heading">
          <h1>Notifications</h1>

          <p>
            Stay informed about applications, teams, and
            opportunities.
          </p>
        </header>

        <div
          className="notifications-tabs"
          role="tablist"
          aria-label="Notification categories"
        >
          {filters.map((filter) => (
            <button
              key={filter.value}
              className={`notifications-tab ${
                activeFilter === filter.value
                  ? "notifications-tab--active"
                  : ""
              }`}
              type="button"
              role="tab"
              aria-selected={activeFilter === filter.value}
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <section className="notifications-list">
          {visibleNotifications.map((notification) => {
            const Icon = getNotificationIcon(
              notification.category
            );

            return (
              <button
                className={`notification-row ${
                  notification.unread
                    ? "notification-row--unread"
                    : ""
                }`}
                type="button"
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
              >
                <span className="notification-row-icon">
                  <Icon size={22} />
                </span>

                <span className="notification-row-content">
                  <strong>{notification.title}</strong>

                  <span className="notification-row-message">
                    {notification.message}
                  </span>

                  <span className="notification-row-time">
                    {notification.time}
                  </span>
                </span>

                <ChevronRight
                  className="notification-row-arrow"
                  size={22}
                />
              </button>
            );
          })}

          {visibleNotifications.length === 0 && (
            <div className="notifications-empty">
              <h2>No notifications</h2>
              <p>
                There are no notifications in this category.
              </p>
            </div>
          )}
        </section>
      </section>
    </DashboardLayout>
  );
}

export default Notifications;