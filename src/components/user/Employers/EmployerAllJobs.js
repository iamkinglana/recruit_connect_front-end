import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import JobDetails from './JobDetails';
import JobItem from './JobItem';
import './AllJobs.css';
import { UserContext } from '../../../App';
import { useContext } from 'react';


const EmployerAllJobs = () => {
  const userContext = useContext(UserContext)
  const { user, setUser } = useContext(UserContext);
  console.log(user)

  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {

   const userData = fetch(`/jobs`)
      .then(response => response.json())
      .then(data => setJobs(data))
      .catch(error => console.error('Error fetching jobs:', error));
      setUser(userData);
  }, []);

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const handleDeleteJob = (jobId) => {

    fetch(`http://127.0.0.1:3000/jobs/${jobId}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(() => {
        setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
        setSelectedJob(null);
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
              interviewData={{ status: 'Scheduled' }}
              applicationCount={10}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default EmployerAllJobs;
