import React, { useEffect, useState } from 'react';
import ApplicationChart from './ApplicationChart';
import AcceptanceRateChart from './AcceptanceRateChart';
import Header from './Header';

// import ToggleButton from './ToggleButton';
import InterviewItem from './InterviewItem'; 
import './Stats.css';

const StatsPage = () => {
  const [applicationStats, setApplicationStats] = useState({});
  const [acceptanceStats, setAcceptanceStats] = useState({});
  const [interviewStats, setInterviewStats] = useState({});
  const [sidebarVisible, setSidebarVisible] = useState(true);

  useEffect(() => {
    // Fetch application, acceptance, and interview stats
    fetch('http://127.0.0.1:3000/job_statistics/acceptance_rate_per_month')
      .then(response => response.json())
      .then(data => setApplicationStats(data))
      .catch(error => console.error('Error fetching application stats:', error));

    fetch('http://127.0.0.1:3000/job_statistics/applications_per_month')
      .then(response => response.json())
      .then(data => setAcceptanceStats(data))
      .catch(error => console.error('Error fetching acceptance stats:', error));

    fetch('/interview-stats')
      .then(response => response.json())
      .then(data => setInterviewStats(data))
      .catch(error => console.error('Error fetching interview stats:', error));
  }, []);

  // Placeholder for the signed-in username
  const loggedInUsername = 'John Doe';

 
  return (
    <div className={`stats-page ${sidebarVisible ? '' : 'sidebar-hidden'}`}>
       <Header/>      
      <header className="stats-header">
        <h1 className="stats-title">Stats</h1>
        <p className="stats-message">Welcome back, {loggedInUsername}</p>
      </header>

      <section className="stats-container">
        {/* Interview Stats */}
        <div className="stats-item">
          <h2>Interview Statistics</h2>
          <p className="stats-value">Scheduled: {interviewStats.scheduled}</p>
          <p className="stats-value">Accepted: {interviewStats.accepted}</p>
          <p className="stats-value">Declined: {interviewStats.declined}</p>
          {/* Display additional interview stats here */}
        </div>
      </section>

      <section className="stats-container">
        {/* Application Stats */}
        <div className="stats-item">
          <h2>Application Statistics</h2>
          {Object.keys(applicationStats).map(month => (
            <p key={month} className="stats-value">
              {month}: {applicationStats[month]}
            </p>
          ))}
        </div>

        {/* Acceptance Stats */}
        <div className="stats-item">
          <h2>Acceptance Statistics</h2>
          {Object.keys(acceptanceStats).map(month => (
            <p key={month} className="stats-value">
              {month}: {acceptanceStats[month]}
            </p>
          ))}
        </div>
      </section>

      <section className="stats-container">
        {/* Application Chart */}
        <div className="chart">
          <ApplicationChart applicationStats={applicationStats} />
        </div>

        {/* Acceptance Rate Chart */}
        <div className="chart">
          <AcceptanceRateChart acceptanceStats={acceptanceStats} />
        </div>
      </section>

      {/* <ToggleButton onClick={handleSidebarToggle} /> */}
    </div>
  );
};

export default StatsPage;
