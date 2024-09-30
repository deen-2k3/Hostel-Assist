import React from "react";
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import UserDetailsCard from "../components/UserDetailsCard.jsx";
import IssueHome from "../components/IssueHome.jsx";

const Home = () => {
  return (
    <div>
      <NavBar />
        <div className="flex">
      <div className="w-1/3 h-full">
        <UserDetailsCard />
      </div>
      <div className="w-2/3">
        <IssueHome/>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
