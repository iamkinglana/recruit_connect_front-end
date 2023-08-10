import React from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css'

const SideBar = ({ userName, onLogout }) => {
  const getCurrentGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 0 && currentHour < 12) {
      return 'Good morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  };

  return (
    <div className="sidebar">
      <div className="user-details">
        <div className="user-name">{userName}</div>
        {/* Other user details go here */}
      </div>
      <div className="greeting">
        {`${getCurrentGreeting()}, ${userName}`}
      </div>

      <ul className="sidebar-links">
        <li className="sidebar-link">
          <Link to="/stats">Stats</Link>
        </li>
        <li className="sidebar-link">
          <Link to="/all-jobs">All Jobs</Link>
        </li>
        <li className="sidebar-link">
          <Link to="/add-job">Add Job</Link>
        </li>
        <li className="sidebar-link">
          <Link to="/employer-profile">Employer Profile</Link>
        </li>
      </ul>
      <button className="logout-button" onClick={onLogout}>Logout</button>
    </div>
  );
};

export default SideBar;
