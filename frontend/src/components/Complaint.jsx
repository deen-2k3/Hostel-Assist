import React from "react";
import NavBar from "./NavBar";

const Complaint = () => {
  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-center items-center text-center mt-36 space-y-4">
        <label
          htmlFor="issueInput"
        >
        
        </label>
        <input
          type="text"
          id="issueInput"
          className="w-1/3 h-12 px-3 border rounded outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe the issue"
        />
        <button className="w-24 h-10 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200">
          Send
        </button>
      </div>
    </>
  );
};

export default Complaint;
