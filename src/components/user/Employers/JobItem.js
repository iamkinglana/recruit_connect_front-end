import React, { useState, useEffect } from 'react';
import './JobItem.css';
import { Link } from 'react-router-dom';

const JobItem = ({ job }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [jobDetails, setJobDetails] = useState(null);

  useEffect(() => {
    if (showDetails && !jobDetails) {
      // Fetch job details
      fetch(`https://recruit-connect-vr2.onrender.com/jobs/${job.id}`) // Update URL
        .then(response => response.json())
        .then(data => setJobDetails(data))
        .catch(error => console.error('Error fetching job details:', error));
    }
  }, [showDetails, job.id, jobDetails]);

  return (
    <div className="job-item">
      <h3>{job.jobTitle}</h3>
      <p>Salary: {job.salaryRange}</p>
      <p>Application Deadline: {job.applicationDeadline}</p>
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      {showDetails && (
        <div className="job-details">
          <p>Location: {job.location}</p>
          <p>Category: {job.category}</p>
          {jobDetails && (
            <div>
              <p>Company: {jobDetails.company}</p>
              <p>Description: {jobDetails.description}</p>
              {/* Include other job details as needed */}
            </div>
          )}
          <Link to={`/job/${job.id}`}>View More Details</Link>
        </div>
      )}
    </div>
  );
};

export default JobItem;
