import React, { useEffect, useState } from "react";
import { apiConnector } from "../services/apiConnector"; // Assuming you have an apiConnector utility
import { userDetailsUrl } from "../services/apis"; // URL of the API to fetch user details
import {Link} from "react-router-dom";

const UserDetailsCard = () => {
  const [data, setData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    fatherName: "",
    hostel: "",
    roomNo: "",
  });

  useEffect(() => {
    // Function to fetch user details from the API
    const fetchUserDetails = async () => {
      try {
        const response = await apiConnector("GET", userDetailsUrl); // Adjust the request method and URL
        setData(response.data); // Assuming response contains the user data
      } catch (error) {
        console.log("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="flex items-center space-x-4">
        <img
          src={data.profileImage || "/default-profile.png"} // Display default if no image
          alt="profile"
          className="w-16 h-16 rounded-full"
        />
        <Link to="UserDetails" className="text-blue-500 hover:underline">
          Update Contact Information
        </Link>
      </div>
      <div className="mt-4">
        <div className="mb-2">
          <p className="font-semibold">
            Name: <span className="font-normal">{data.fullname || "N/A"}</span>
          </p>
        </div>
        <div className="mb-2">
          <p className="font-semibold">
            Email: <span className="font-normal">{data.email || "N/A"}</span>
          </p>
        </div>
        <div className="mb-2">
          <p className="font-semibold">
            Phone Number:{" "}
            <span className="font-normal">{data.phoneNumber || "N/A"}</span>
          </p>
        </div>
        <div className="mb-2">
          <p className="font-semibold">
            Father's Name:{" "}
            <span className="font-normal">{data.fatherName || "N/A"}</span>
          </p>
        </div>
        <div className="mb-2">
          <p className="font-semibold">
            Hostel: <span className="font-normal">{data.hostel || "N/A"}</span>
          </p>
        </div>
        <div className="mb-2">
          <p className="font-semibold">
            Room No.:{" "}
            <span className="font-normal">{data.roomNo || "N/A"}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsCard;
