import React from 'react';
import { useState, useEffect } from 'react';

const SavedJobsDashboard = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const response = await fetch('http://localhost:3000/saved_jobs');
        const data = await response.json();
        setSavedJobs(data);
      } catch (error) {

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

    }
  };

  return (
    <div>
      <h1>Saved Jobs Dashboard</h1>
      {savedJobs.length === 0 ? (
        <p>No saved jobs found.</p>
      ) : (
        savedJobs.map((job) => (
          <div key={job.id}>
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
