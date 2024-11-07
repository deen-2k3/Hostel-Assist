import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/user/checkAuth",
          { withCredentials: true }
        );

        console.log("Auth response:", response.data);

        if (response.data.isAuthenticated) {
          setIsLoggedIn(true);
          setUserName(response.data.userName);
          setRole(response.data.role);
        }
      } catch (error) {
        console.error("Error checking auth status", error);
        setError("Unable to verify authentication. Please try again.");
        setIsLoggedIn(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8000/api/v1/user/logout", {
        withCredentials: true,
      });

      setIsLoggedIn(false);
      setUserName("");
      setRole("");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out", error);
      setError("Failed to log out. Please try again.");
    }
  };

  const isDashboard =
    location.pathname === "/warden-dashboard" ||
    location.pathname === "/user-dashboard";

  return (
    <div className="shadow-md">
      <div className="w-full h-16 bg-blue-600 flex flex-col md:flex-row justify-between items-center px-4 py-2">
        {/* Logo */}
        <div className="text-white font-bold text-lg">
          <p>Logo</p>
        </div>

        {/* Error message */}
        {error && <p className="text-red-500 mt-2">{error}</p>}

        {/* Navigation Links */}
        <nav className="flex gap-6 items-center text-white">
          {isLoggedIn ? (
            <>
              {isDashboard ? (
                <Link to="/">
                  <button className="px-4 py-2 bg-blue-500 hover:bg-blue-400 rounded-md transition-colors">
                    Home
                  </button>
                </Link>
              ) : role === "warden" ? (
                <Link to="/warden-dashboard">
                  <button className="px-4 py-2 bg-blue-500 hover:bg-blue-400 rounded-md transition-colors">
                    Warden Dashboard
                  </button>
                </Link>
              ) : (
                <Link to="/user-dashboard">
                  <button className="px-4 py-2 bg-blue-500 hover:bg-blue-400 rounded-md transition-colors">
                    User Dashboard
                  </button>
                </Link>
              )}
              <p className="mr-4 text-sm">Welcome, {userName || "User"}!</p>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-400 text-white rounded-md transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="px-4 py-2 bg-green-500 hover:bg-green-400 rounded-md transition-colors">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 rounded-md transition-colors">
                  SignUp
                </button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
