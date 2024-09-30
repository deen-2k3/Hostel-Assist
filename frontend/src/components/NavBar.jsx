import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <div className=" relative w-full h-16 bg-[#8EACCD] flex flex-col md:flex-row justify-between items-center">
        {/* Logo */}
        <div className="w-full md:w-auto flex justify-center md:justify-start items-center">
          <p>logo</p>
        </div>

        {/* Links */}
        <div className="w-full md:w-auto flex flex-col md:flex-row gap-4 md:gap-16 items-center">
          <Link to="/">
            <button>Home</button>
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <Link to="/contact" href="" className="hover:underline">
            Contact
          </Link>
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
