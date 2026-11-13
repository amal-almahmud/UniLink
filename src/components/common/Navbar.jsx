import { useNavigate } from "react-router";
import {
  Search,
  Bell,
  UserRound,
  ChevronRight,
  Menu,
} from "lucide-react";
import "./Navbar.css";

function Navbar({
  studentName = "Student Name",
  studentRole = "KFUPM Student",
  hasNotifications = false,
  onMenuClick,
}) {
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <button
        className="navbar-menu"
        type="button"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>

      <div className="navbar-search">
        <Search size={22} />

        <input
          type="search"
          placeholder="Search opportunities, teams, or skills"
          aria-label="Search"
        />
      </div>

      <button
        className="navbar-notification"
        type="button"
        aria-label="Notifications"
        onClick={() => navigate("/notifications")}
      >
        <Bell size={24} />

        {hasNotifications && (
          <span className="navbar-notification-dot" />
        )}
      </button>

      <button
        className="navbar-profile"
        type="button"
      >
        <span className="navbar-avatar">
          <UserRound size={25} />
        </span>

        <span className="navbar-profile-text">
          <strong>{studentName}</strong>
          <small>{studentRole}</small>
        </span>

        <ChevronRight size={22} />
      </button>
    </header>
  );
}

export default Navbar;