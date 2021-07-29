import React from "react";
import { Link } from "react-router-dom";

export const DashboardActions = () => {
  return (
    <div className="dashboard-btns btn-blue-gradient-div" data-aos="flip-up">
      <Link
        to="/edit-profile"
        className="btnblock btn-blue-gradient round-btn margin-adjust "
      >
        <i className="fas fa-user-circle text-primary"></i> Edit Profile
      </Link>

      <Link
        to="/add-experience"
        className="btnblock btn-blue-gradient round-btn margin-adjust"
      >
        <i className="fab fa-black-tie text-primary"></i> Add Experience
      </Link>

      <Link
        to="/add-education"
        className="btnblock btn-blue-gradient round-btn margin-adjust"
      >
        <i className="fas fa-graduation-cap text-primary"></i> Add Education
      </Link>
    </div>
  );
};

export default DashboardActions;
