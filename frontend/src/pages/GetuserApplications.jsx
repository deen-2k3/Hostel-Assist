import React, { useEffect, useState } from "react";
import { apiConnector } from "../services/apiConnector";
import Cookies from "js-cookie";

const GetuserApplications = () => {
  const [getApplication, setGetApplication] = useState([]);
  const [error, setError] = useState(null);

  const userId = Cookies.get("userId");
  console.log(userId);

  useEffect(() => {
    const fetchApplicationstatus = async () => {
      if (!userId) {
        setError("User ID is required.");
        return;
      }

      try {
        const response = await apiConnector(
          "GET",
          `http://localhost:8000/api/v1/app/applications/${userId}`
        );

        if (response.data && response.data.success) {
          setGetApplication(response.data.applications);
        } else {
          setError("Failed to fetch applications.");
        }
      } catch (error) {
        const errorMessage = error.response
          ? error.response.data.message
          : error.message || "An unknown error occurred";
        setError(errorMessage);
        console.error("Error fetching applications:", errorMessage);
      }
    };
    fetchApplicationstatus();
  }, [userId]);

  return (
    <div className="container mx-auto p-4">
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {getApplication.length > 0 ? (
        <div className="overflow-x-auto">
          <h2 className="text-2xl font-semibold mb-4">Your Applications</h2>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200 text-left font-medium text-gray-700">
                  Issue
                </th>
                <th className="py-2 px-4 border-b border-gray-200 text-left font-medium text-gray-700">
                  Status
                </th>
                <th className="py-2 px-4 border-b border-gray-200 text-left font-medium text-gray-700">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {getApplication.map((application) => (
                <tr key={application._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b border-gray-200">
                    {application.complaint?.issue || "N/A"}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {application.status}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {new Date(application.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600 mt-4">No applications found.</p>
      )}
    </div>
  );
};

export default GetuserApplications;
