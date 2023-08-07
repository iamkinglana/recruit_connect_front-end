
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
    <div>
      <h2>Job List</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            <Link to={`/jobs/${job.id}`}>
              <p>{job.job_title}</p>
            </Link>
            <p>{job.job_description}</p>
            <p>{job.job_location}</p>
            <p>{job.job_level}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Jobs;
