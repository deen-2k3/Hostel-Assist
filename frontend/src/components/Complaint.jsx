import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Cookies from "js-cookie"; // Import Cookies to manage cookies
import { apiConnector } from "../services/apiConnector";
import { complaintofUser } from "../services/apis";

const Complaint = () => {
  const [data, setData] = useState({
    issue: "",
  });
  const [error, setError] = useState(null); // For error messages
  const [success, setSuccess] = useState(false); // For success messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setSuccess(false); // Reset success status

    // Simple form validation
    if (data.issue.trim() === "") {
      setError("Please describe the issue.");
      return;
    }

    try {
      const res = await apiConnector("POST", complaintofUser, data);
      if (res) {
        const userId = Cookies.get("userId");
        console.log("Complaint Submitted by User ID:", userId);
        setSuccess(true); // Set success message

        // After 2 seconds, redirect to another page (e.g., homepage)
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.log("Error during submission:", error);
      setError("An error occurred while submitting your complaint.");
    }
  };

  const onChangeHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-center items-center text-center mt-36 space-y-4">
        <form onSubmit={handleSubmit} className="w-1/3 space-y-4">
          {/* Error and Success Messages */}
          {error && <p className="text-red-500">{error}</p>}
          {success && (
            <p className="text-green-500">Complaint submitted successfully!</p>
          )}

          {/* Input Field for Complaint */}
          <label
            htmlFor="issueInput"
            className="block text-left text-lg font-semibold"
          >
            Describe the issue
          </label>
          <input
            type="text"
            id="issueInput"
            name="issue"
            value={data.issue}
            onChange={onChangeHandler}
            className="w-full h-12 px-3 border rounded outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your issue"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-10 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200"
            disabled={success || !data.issue.trim()} // Disable if success or issue is empty
          >
            {success ? "Sent" : "Send"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Complaint;
