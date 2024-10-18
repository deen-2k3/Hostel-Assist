import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in by calling the /check-auth route
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/user/checkAuth",
          { withCredentials: true }
        );
        if (response.data.isAuthenticated) {
          setIsLoggedIn(true);
          setUserName(response.data.userName); // Update with user's name from token
        }
      } catch (error) {
        console.error("Error checking auth status", error);
        setIsLoggedIn(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    try {
      // Call the backend logout route to clear the cookie
      await axios.get("http://localhost:8000/api/v1/user/logout", {
        withCredentials: true,
      });

      // After logout, reset state and redirect to login
      setIsLoggedIn(false);
      setUserName("");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  return (
    <div>
      <div className="relative w-full h-16 bg-[#8EACCD] flex flex-col md:flex-row justify-between items-center">
        {/* Logo */}
        <div className="w-full md:w-auto flex justify-center md:justify-start items-center">
          <p>logo</p>
        </div>

        {/* User Greeting or Login/SignUp */}
        <div className="w-full md:w-auto flex flex-col md:flex-row gap-4 md:gap-10 items-center mt-4 md:mt-0">
          {isLoggedIn ? (
            <>
              <p className="mr-4">Welcome, {userName || "User"}!</p>{" "}
              {/* Greet the user */}
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button>Login</button>
              </Link>

              <Link to="/register">
                <button>SignUp</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
