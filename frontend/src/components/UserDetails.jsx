import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import Cookies to manage cookies
import { apiConnector } from "../services/apiConnector";
import { updateUser } from "../services/apis";

const UserDetails = () => {
  const [data, setData] = useState({
    fatherName: "",
    phoneNumber: "",
    hostel: "",
    roomNo: "",
    profilePhoto: null,
  });

  const navigate = useNavigate();

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the userId from cookies
    const userId = Cookies.get("userId");

    // Replace :userId in the URL
    const updateUserUrl = updateUser.replace(":userId", userId);

    // Creating a FormData object to handle the file upload
    const formData = new FormData();
    formData.append("fatherName", data.fatherName);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("hostel", data.hostel);
    formData.append("roomNo", data.roomNo);
    if (data.profilePhoto) {
      formData.append("profilePhoto", data.profilePhoto);
    }

    try {
      const res = await apiConnector("PUT", updateUserUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res);
      if (res) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle text input changes
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    setData({
      ...data,
      profilePhoto: e.target.files[0], // Storing the file object
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Update your Details
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="fatherName"
            className="block text-gray-700 font-medium mb-2"
          >
            Father Name
          </label>
          <input
            type="text"
            name="fatherName"
            value={data.fatherName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block text-gray-700 font-medium mb-2"
          >
            Phone Number
          </label>
          <input
            type="text"
            name="phoneNumber"
            value={data.phoneNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="hostel"
            className="block text-gray-700 font-medium mb-2"
          >
            Hostel Name
          </label>
          <input
            type="text"
            name="hostel"
            value={data.hostel}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="roomNo"
            className="block text-gray-700 font-medium mb-2"
          >
            Room No.
          </label>
          <input
            type="text"
            name="roomNo"
            value={data.roomNo}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="profilePhoto"
            className="block text-gray-700 font-medium mb-2"
          >
            Profile Photo
          </label>
          <input
            type="file"
            name="profilePhoto"
            accept="image/*"
            onChange={handleFileChange} // Separate handler for file input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UserDetails;
