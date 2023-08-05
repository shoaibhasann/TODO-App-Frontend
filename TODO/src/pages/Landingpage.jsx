import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom"; // Import Navigate
import { Context } from "../main";
import Logo from '../assets/illus.svg'
import '../styles/Landingpage.css';

function Landingpage() {
  const { isAuthenticated } = useContext(Context);

  if (isAuthenticated) {
    return <Navigate to="/home" />; // Redirect to home if authenticated
  } else

  return (
    <div className="landing-page">
      <div className="landing-content">
          <h1>Welcome to TaskNinja</h1>
          <p>Your Ultimate Task Management Solution</p>
          <h2>Organize Your Tasks Effortlessly</h2>
          <p>
            Stay on top of your tasks and never miss a deadline. TaskNinja makes
            it easy to manage your tasks, whether it's work projects, personal
            to-dos, or anything in between.
          </p>
          <Link to="/register" className="button-55">
            Get Started
          </Link>
      </div>
      <div className="landing-logo">
        <img src={Logo} alt="illustration" />
      </div>
    </div>
  );
}

export default Landingpage;
