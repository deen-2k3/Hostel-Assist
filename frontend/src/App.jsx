import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import Forgot from "./pages/Forgot.jsx";
import UserDetails from "./components/UserDetails.jsx";
import Complaint from "./components/Complaint.jsx";
import WardenDashboard from "./pages/WardenDashboard.jsx";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/userDetails" element={<UserDetails />} />
        <Route path="/Complaint" element={<Complaint />} />
        <Route path="/warden-dashboard" element={<WardenDashboard />} />
      </Routes>
    </>
  );
}

export default App;
