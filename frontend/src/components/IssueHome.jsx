import React from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

const IssueHome = () => {
  return (
    <div className=" flex-col justify-center items-center h-screen bg-[#FEF9D9] ">
      <div className="h-20 border-2 border-white flex justify-center items-center bg-[#D2E0FB] ">
        <input
          type="search"
          placeholder="search"
          className="h-10 w-64 p-2 border border-gray-300 "
        />
        <button className="h-10 w-10 flex justify-center items-center border border-gray-300 rounded-r-md bg-white hover:bg-gray-100">
          <CiSearch className="text-blue-500" />
        </button>
      </div>
      <div className="flex justify-center items-center mt-72">
        <Link
          to="/Complaint"
          className="text-blue-500 hover:underline font-semibold text-lg w-56 h-12 rounded border flex justify-center items-center bg-white"
        >
          Complaint
        </Link>
      </div>
    </div>
  );
};

export default IssueHome;
