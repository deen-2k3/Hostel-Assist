import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const UserDetails = () => {
  const [data, setData] = useState({
    fatherName: "",
    PhoneNumber: "",
    Hostel: "",
    roomNo: "",
    profilePhoto: null,
  });
  const navigate = useNavigate();

  // Handle input change
  const handleChange = async(e) => {
    const { name, value, files } = e.target;
    if (name === "profilePhoto") {
      // Handle file input
      setData({ ...data, [name]: files[0] });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data: ", data);
    navigate("/");
    // You can add form submission logic here (e.g., send data to API)
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
            onChange={handleChange}
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
