import DashboardLayout from "../../layouts/DashboardLayout";
import teamLeaderSidebarItems from "../teamLeader/teamLeaderSidebarItems";

export default function Profile() {
  return (
    <DashboardLayout
      activeArea="Manage a Team"
      sidebarItems={teamLeaderSidebarItems}
    >
      <section className="profile-page">
        <h1>My Profile</h1>

        <p>
          Keep your information complete so team leaders can
          understand your fit.
        </p>

        <form>
          <label>
            Full Name *
            <input type="text" required />
          </label>

          <label>
            University Email *
            <input type="email" required />
          </label>

          <label>
            Major *
            <select defaultValue="" required>
              <option value="">Select major</option>
              <option value="Software Engineering">
                Software Engineering
              </option>
              <option value="Computer Science">
                Computer Science
              </option>
              <option value="Information Technology">
                Information Technology
              </option>
            </select>
          </label>

          <label>
            Skills *
            <textarea required />
          </label>

          <label>
            Interests *
            <textarea required />
          </label>

          <label>
            Relevant Experience
            <textarea />
          </label>

          <button type="submit">Save Profile</button>
        </form>
      </section>
    </DashboardLayout>
  );
}