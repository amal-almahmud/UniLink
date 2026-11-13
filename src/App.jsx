import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router";

import Dashboard from "./pages/shared/Dashboard";
import Profile from "./pages/shared/Profile";
import BrowseOpportunities from "./pages/teamSeeker/BrowseOpportunities";
import FindTeams from "./pages/teamSeeker/FindTeams";
import TeamDetails from "./pages/teamSeeker/TeamDetails";
import ApplyToTeam from "./pages/teamSeeker/ApplyToTeam";
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
        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/my-profile"
          element={<Profile />}
        />

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

        <Route
          path="/my-team"
          element={<MyTeam />}
        />

        <Route
          path="/team-updates"
          element={<TeamUpdates />}
        />
         <Route
           path="/browse-opportunities"
           element={<BrowseOpportunities />}
          />
        
        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />
        <Route
          path="/find-teams"
          element={<FindTeams />}
        />
        <Route
         path="/team-details"
         element={<TeamDetails />}
       />
       <Route
        path="/apply-to-team"
        element={<ApplyToTeam />}
     />
      </Routes>
    </BrowserRouter>
  );
}

export default App;