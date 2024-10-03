import React from "react";
import NavBar from "../components/NavBar.jsx";
import GetApplications from "./GetApplications.jsx";

const WardenDashboard = () => {
  return (
    <>
      <NavBar />
      <div className="p-6">
        {/* Dashboard Header */}
        <h1 className="text-2xl font-bold mb-4">Warden Dashboard</h1>

        {/* Main Content: Get Applications Table */}
        <GetApplications />
      </div>
    </>
  );
};

export default WardenDashboard;
