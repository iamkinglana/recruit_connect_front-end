import React, { useState, useEffect } from 'react';
import './JobItem.css';
import { Link } from 'react-router-dom';

const JobItem = ({ job }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [jobDetails, setJobDetails] = useState(null);

  useEffect(() => {
    if (showDetails && !jobDetails) {
      fetch(`/jobs/${job.id}`)
        .then(response => response.json())
        .then(data => setJobDetails(data))
        .catch(error => console.error('Error fetching job details:', error));
    }
  }, [showDetails, job.id, jobDetails]);

  return (
    <div className="job-item">
      <h3>{job.job_title}</h3>
      <p>Salary: {job.salary_highest}</p>
      <p>Application Deadline: {job.applicationDeadline}</p>
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      {showDetails && (
        <div className="job-details">
          <p>Location: {job.job_location}</p>
          <p>Category: {job.job_category}</p>
          {jobDetails && (
            <div>
              <p>Company: {job.employer.name}</p>
            </div>
          )}
          <Link to={`/job/${job.id}`}>View More Details</Link>
        </div>
      )}
    </div>
  );
};

export default JobItem;
