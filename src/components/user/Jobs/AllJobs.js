import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Jobs.css'; 
import { useNavigate } from 'react-router-dom';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

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
          <div className="job-item" onClick={() => {navigate(`/jobs/${job.id}`)}}>
          <li key={job.id} className="job-item">
              <p className="job-title">{job.job_title}</p>
            <p className="job-description">{job.job_description}</p>
            <p className="job-details">
              Location: {job.job_location} | Level: {job.job_level}
            </p>
          </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Jobs;
