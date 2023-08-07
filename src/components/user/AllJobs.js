import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Jobs.css'; // Import your custom CSS file for styling

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch('/jobs');
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="jobs-container">
      <h2 className="jobs-title">Job List</h2>
      <ul className="jobs-list">
        {jobs.map((job) => (
          <li key={job.id} className="job-item">
            <Link to={`/jobs/${job.id}`} className="job-link">
              <p className="job-title">{job.job_title}</p>
            </Link>
            <p className="job-description">{job.job_description}</p>
            <p className="job-details">
              Location: {job.job_location} | Level: {job.job_level}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Jobs;
