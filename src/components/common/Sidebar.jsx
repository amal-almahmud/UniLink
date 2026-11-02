import { NavLink } from "react-router";
import {
  LayoutDashboard,
  UserRound,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import "./Sidebar.css";

function Sidebar({
  items = [],
  activeArea = "Find a Team",
  onAreaChange,
  isOpen = false,
  onClose,
}) {
  const accountAreas = [
    "Find a Team",
    "Manage a Team",
    "Publish an Opportunity",
  ];

  return (
    <>
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
        />
      )}

      <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
        <div className="sidebar-logo">
          <span className="sidebar-logo-icon">U</span>
          <span>UniLink</span>

          <button
            className="sidebar-close"
            type="button"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={23} />
          </button>
        </div>

        <div className="sidebar-divider" />

        <section className="sidebar-account">
          <p className="sidebar-section-title">ACCOUNT AREA</p>

          {accountAreas.map((area) => (
            <button
              key={area}
              className={`sidebar-area-button ${
                activeArea === area
                  ? "sidebar-area-button--active"
                  : ""
              }`}
              type="button"
              onClick={() => onAreaChange?.(area)}
            >
              {area}
            </button>
          ))}
        </section>

        <div className="sidebar-divider" />

        <nav className="sidebar-navigation">
          <NavLink
            className={({ isActive }) =>
              `sidebar-link ${
                isActive ? "sidebar-link--active" : ""
              }`
            }
            to="/dashboard"
            onClick={onClose}
          >
            <LayoutDashboard size={22} />
            <span>Dashboard</span>
          </NavLink>

          {items.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                className={({ isActive }) =>
                  `sidebar-link ${
                    isActive ? "sidebar-link--active" : ""
                  }`
                }
                to={item.to}
                onClick={onClose}
              >
                {Icon && <Icon size={22} />}
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <NavLink
            className="sidebar-link"
            to="/profile"
            onClick={onClose}
          >
            <UserRound size={22} />
            <span>My Profile</span>
          </NavLink>

          <NavLink
            className="sidebar-link"
            to="/settings"
            onClick={onClose}
          >
            <Settings size={22} />
            <span>Settings</span>
          </NavLink>

          <div className="sidebar-divider" />

          <button className="sidebar-logout" type="button">
            <LogOut size={22} />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;