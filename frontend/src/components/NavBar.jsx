import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <div className="w-full h-16 bg-gray-200 flex flex-col md:flex-row justify-between items-center px-4">
        {/* Logo */}
        <div className="w-full md:w-auto flex justify-center md:justify-start items-center">
          <p>logo</p>
        </div>

        {/* Links */}
        <div className="w-full md:w-auto flex flex-col md:flex-row gap-4 md:gap-16 items-center">
          <a href="" className="hover:underline">
            Home
          </a>
          <a href="" className="hover:underline">
            About
          </a>
          <a href="" className="hover:underline">
            Contact
          </a>
        </div>

        {/* Login and Signup */}
        <div className="w-full md:w-auto flex flex-col md:flex-row gap-4 md:gap-10 items-center mt-4 md:mt-0">
          <Link to="/login">
            <button>Login</button>
          </Link>

          <Link to="/register">
            <button>SignUp</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
