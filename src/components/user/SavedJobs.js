import React, { useState, useEffect } from 'react';
import './SavedJobsDashboard.css';

const SavedJobsDashboard = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const response = await fetch('http://localhost:3000/saved_jobs');
        const data = await response.json();
        setSavedJobs(data);
      } catch (error) {
        // Handle error if needed
      }
    };

    fetchSavedJobs();
  }, []);

  const handleRemoveJob = async (jobId) => {
    try {
      const response = await fetch(`http://localhost:3000/saved_jobs/${jobId}`, {
        method: 'DELETE',
      });

      setSavedJobs(savedJobs.filter((job) => job.id !== jobId));
    } catch (error) {
      // Handle error if needed
    }
  };

  return (
    <div className="SavedJobsDashboard">
      <h1>Saved Jobs Dashboard</h1>
      {savedJobs.length === 0 ? (
        <p className="no-jobs-found">No saved jobs found.</p>
      ) : (
        savedJobs.map((job) => (
          <div className="job-item" key={job.id}>
            <h2>{job.title}</h2>
            <p>{job.description}</p>
            <button onClick={() => handleRemoveJob(job.id)}>Remove Job</button>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedJobsDashboard;
