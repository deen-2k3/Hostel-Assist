import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie"; // Import js-cookie to handle cookies
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import Forgot from "./pages/Forgot.jsx";
import UserDetails from "./components/UserDetails.jsx";
import Complaint from "./components/Complaint.jsx";
import WardenDashboard from "./pages/WardenDashboard.jsx";
import UserDashboard from "./pages/UserDashboard.jsx"; // Assuming you have UserDashboard

function App() {
  const navigate = useNavigate(); // React Router hook for navigation
  const role = Cookies.get("role"); // Get the role from the cookie

  useEffect(() => {
    if (role) {
      // Redirect to the appropriate dashboard based on the role
      if (role === "warden") {
        navigate("/warden-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    }
  }, [role, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/userDetails" element={<UserDetails />} />
      <Route path="/Complaint" element={<Complaint />} />
      <Route path="/warden-dashboard" element={<WardenDashboard />} />
      <Route path="/user-dashboard" element={<UserDashboard />} />
    </Routes>
  );
}

export default App;
