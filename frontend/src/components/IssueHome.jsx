import React from "react";
import { Link } from "react-router-dom";
const IssueHome = () => {
  return (
    <div>
      <Link to="/Complaint" className="text-blue-500 hover:underline mt-6">
        Complaint
      </Link>{" "}
    </div>
  );
};

export default IssueHome;
