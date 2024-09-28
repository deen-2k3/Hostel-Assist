import React from "react";
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import UserDetailsCard from "../components/UserDetailsCard.jsx";

const Home = () => {
  return (
    <div>
      <NavBar />

      <div className="w-1/2 h-full">
        <UserDetailsCard />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
