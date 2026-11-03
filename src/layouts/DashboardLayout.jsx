import { useState } from "react";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import "./DashboardLayout.css";

function DashboardLayout({
  children,
  sidebarItems = [],
  activeArea = "Find a Team",
  onAreaChange,
  studentName = "Student Name",
}) {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
    <div className="dashboard-layout">
      <Sidebar
        items={sidebarItems}
        activeArea={activeArea}
        onAreaChange={onAreaChange}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

     <div className="dashboard-main">
        <Navbar
          studentName={studentName}
          studentRole="KFUPM Student"
          hasNotifications
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="dashboard-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
   