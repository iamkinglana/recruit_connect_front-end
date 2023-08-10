import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import JobDetails from './JobDetails';
import JobItem from './JobItem'; // Import the JobItem component
import './AllJobs.css';

const EmployerAllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    // Fetch all jobs from the backend when the component mounts
    fetch('https://http://127.0.0.1:3000/jobs') // Replace with your actual API endpoint
      .then(response => response.json())
      .then(data => setJobs(data))
      .catch(error => console.error('Error fetching jobs:', error));
  }, []);

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const handleDeleteJob = (jobId) => {
    // Perform delete operation and update jobs list
    fetch(`http://127.0.0.1:3000/jobs/${jobId}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(() => {
        // Remove the deleted job from the list
        setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
        setSelectedJob(null); // Clear selected job details
      })
      .catch(error => console.error('Error deleting job:', error));
  };

  return (
    <div>
      <h2>All Jobs</h2>
      {jobs.map((job) => (
        <div key={job.id} className="job-item">
          <JobItem job={job} onClick={() => handleJobClick(job)} onDelete={() => handleDeleteJob(job.id)} />
          {selectedJob && selectedJob.id === job.id && (
            <JobDetails
              job={selectedJob}
              isEditable={false}
              onSave={() => {}}
              interviewData={{ status: 'Scheduled' }} // Replace with actual interview data
              applicationCount={10} // Replace with actual application count
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default EmployerAllJobs;
