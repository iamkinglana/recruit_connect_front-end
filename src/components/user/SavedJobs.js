import React, { useState, useEffect } from 'react';

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    // Retrieve the saved jobs from localStorage
    const savedJobIds = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    setSavedJobs(savedJobIds);
  }, []);

  const [jobDetails, setJobDetails] = useState({});

  useEffect(() => {
    const fetchJobDetails = async () => {
      // Fetch details of each saved job from the backend
      try {
        const jobPromises = savedJobs.map(async (jobId) => {
          const response = await fetch(`/jobs/${jobId}`);
          const data = await response.json();
          return { ...data, id: jobId };
        });
        const jobDetailsData = await Promise.all(jobPromises);
        setJobDetails(jobDetailsData);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchJobDetails();
  }, [savedJobs]);

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
          {/* Add other job details that you want to display */}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default SavedJobs;






// import React, { useState, useEffect } from 'react';
// import './SavedJobsDashboard.css';

// const SavedJobsDashboard = () => {
//   const [savedJobs, setSavedJobs] = useState([]);

//   useEffect(() => {
//     const fetchSavedJobs = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/saved_jobs');
//         const data = await response.json();
//         setSavedJobs(data);
//       } catch (error) {
//         // Handle error if needed
//       }
//     };

//     fetchSavedJobs();
//   }, []);

//   const handleRemoveJob = async (jobId) => {
//     try {
//       const response = await fetch(`http://localhost:3000/saved_jobs/${jobId}`, {
//         method: 'DELETE',
//       });

//       setSavedJobs(savedJobs.filter((job) => job.id !== jobId));
//     } catch (error) {
//       // Handle error if needed
//     }
//   };

//   return (
//     <div className="SavedJobsDashboard">
//       <h1>Saved Jobs Dashboard</h1>
//       {savedJobs.length === 0 ? (
//         <p className="no-jobs-found">No saved jobs found.</p>
//       ) : (
//         savedJobs.map((job) => (
//           <div className="job-item" key={job.id}>
//             <h2>{job.title}</h2>
//             <p>{job.description}</p>
//             <button onClick={() => handleRemoveJob(job.id)}>Remove Job</button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default SavedJobsDashboard;
