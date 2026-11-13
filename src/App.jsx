import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router";

// Authentication pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// Shared pages
import Dashboard from "./pages/shared/Dashboard";
import Notifications from "./pages/shared/Notifications";
import Profile from "./pages/shared/Profile";
import Settings from "./pages/shared/Settings";

// Team seeker pages
import BrowseOpportunities from "./pages/teamSeeker/BrowseOpportunities";
import FindTeams from "./pages/teamSeeker/FindTeams";
import TeamDetails from "./pages/teamSeeker/TeamDetails";
import ApplyToTeam from "./pages/teamSeeker/ApplyToTeam";
import PublishTeamRequest from "./pages/teamSeeker/PublishTeamRequest";
import MyApplications from "./pages/teamSeeker/MyApplications";
import Invitations from "./pages/teamSeeker/Invitations";

// Team leader pages
import Applications from "./pages/teamLeader/Applications";
import ApplicantProfile from "./pages/teamLeader/ApplicantProfile";
import CreateTeamOpportunity from "./pages/teamLeader/CreateTeamOpportunity";
import EditOpportunity from "./pages/teamLeader/EditOpportunity";
import MyOpportunities from "./pages/teamLeader/MyOpportunities";
import MyTeam from "./pages/teamLeader/MyTeam";
import TeamUpdates from "./pages/teamLeader/TeamUpdates";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* Authentication routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        {/* Shared routes */}
        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="/notifications"
          element={<Notifications />}
        />

        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />

        {/* Team seeker routes */}
        <Route
          path="/browse-opportunities"
          element={<BrowseOpportunities />}
        />

        <Route path="/find-teams" element={<FindTeams />} />

        <Route
          path="/team-details"
          element={<TeamDetails />}
        />

        <Route
          path="/apply-to-team"
          element={<ApplyToTeam />}
        />

        <Route
          path="/publish-team-request"
          element={<PublishTeamRequest />}
        />

        <Route
          path="/my-applications"
          element={<MyApplications />}
        />

        <Route
          path="/invitations"
          element={<Invitations />}
        />

        {/* Team leader routes */}
        <Route
          path="/my-opportunities"
          element={<MyOpportunities />}
        />

        <Route
          path="/create-team-opportunity"
          element={<CreateTeamOpportunity />}
        />

        <Route
          path="/edit-opportunity"
          element={<EditOpportunity />}
        />

        <Route
          path="/applications-management"
          element={<Applications />}
        />

        <Route
          path="/applicant-profile"
          element={<ApplicantProfile />}
        />

        <Route path="/my-team" element={<MyTeam />} />

        <Route
          path="/team-updates"
          element={<TeamUpdates />}
        />

        {/* Unknown routes */}
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;