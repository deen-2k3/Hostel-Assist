import React, { useEffect, useState } from "react";
import { apiConnector } from "../services/apiConnector"; // Importing the apiConnector utility
import { userDetailsCardUrl } from "../services/apis"; // URL of the API to fetch user details
import { Link } from "react-router-dom";

const UserDetailsCard = () => {
  const [data, setData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    fatherName: "",
    hostel: "",
    roomNo: "",
    profilePhoto:""
  });

  useEffect(() => {
    // Function to fetch user details from the API
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token"); // Replace with your method of storing the JWT
        const response = await apiConnector("GET", userDetailsCardUrl, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        });
        setData(response.data); // Set the fetched user data
      } catch (error) {
        console.log(
          "Error fetching user details:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchUserDetails();
  }, []); // Run effect only once when the component mounts

  return (
    <div className="p-4 bg-[#E7717D] shadow-md rounded-lg h-screen">
      <div className="flex flex-col items-center space-x-4 mt-10">
        <img
          src={data.profilePhoto.url} // Display default if no image
          alt="profile"
          className="w-40 h-40 rounded-full shadow-lg"
        />
        <Link to="/UserDetails" className="text-blue-500 hover:underline mt-6">
          Update Contact Information
        </Link>
      </div>
      <hr className="w-full h-[2px] text-gray-200 mt-2" />
      <div className="mt-4 flex flex-col items-center">
        <div className="mb-8 w-full h-4">
          <p className="font-semibold">
            Name: <span className="font-normal">{data.fullname || "N/A"}</span>
          </p>
        </div>
        <div className="mb-8 w-full h-4">
          <p className="font-semibold">
            Email: <span className="font-normal">{data.email || "N/A"}</span>
          </p>
        </div>
        <div className="mb-8 w-full h-4">
          <p className="font-semibold">
            Phone Number:{" "}
            <span className="font-normal">{data.phoneNumber || "N/A"}</span>
          </p>
        </div>
        <div className="mb-8 w-full h-4">
          <p className="font-semibold">
            Father's Name:{" "}
            <span className="font-normal">{data.fatherName || "N/A"}</span>
          </p>
        </div>
        <div className="mb-8 w-full h-4">
          <p className="font-semibold">
            Hostel: <span className="font-normal">{data.hostel || "N/A"}</span>
          </p>
        </div>
        <div className="mb-8 w-full h-4">
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
