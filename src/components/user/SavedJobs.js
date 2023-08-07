import React, { useState, useEffect } from 'react';

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [jobDetails, setJobDetails] = useState([]);

  useEffect(() => {
    const savedJobIds = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    setSavedJobs(savedJobIds);
  }, []);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const jobPromises = savedJobs.map(async (id) => {
          const response = await fetch(`/jobs/${id}`);
          const data = await response.json();
          return { ...data, id: id };
        });
        const jobDetailsData = await Promise.all(jobPromises);
        setJobDetails(jobDetailsData);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchJobDetails();
  }, [savedJobs]);

  const handleRemoveJob = (id) => {
    // Remove the job from saved jobs list in localStorage
    const updatedSavedJobs = savedJobs.filter((id) => id !== id);
    localStorage.setItem('savedJobs', JSON.stringify(updatedSavedJobs));
    setSavedJobs(updatedSavedJobs);

    // Remove the job from jobDetails state
    const updatedJobDetails = jobDetails.filter((job) => job.id !== id);
    setJobDetails(updatedJobDetails);
  };

  if (!jobDetails.length) {
    return <div>No saved jobs.</div>;
  }

  return (
    <div>
      <h2>Saved Jobs</h2>
      {jobDetails.map((job) => (
        <div key={job.id}>
          <h3>{job.job_title}</h3>
          <p>Company name: {job.employer?.name || 'Unknown Employer'}</p>
          <p>Location: {job.job_location?.job_location}</p>
          <p>Job Level: {job.job_level}</p>
          {/* Add other job details that you want to display */}
          <button onClick={() => handleRemoveJob(job.id)}>Remove</button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default SavedJobs;
