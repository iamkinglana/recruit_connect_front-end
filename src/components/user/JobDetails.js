
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const JobDetails = ({ jobId }) => {
  const [jobDetails, setJobDetails] = useState(null);
  const [isJobSaved, setIsJobSaved] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`/jobs/${jobId}`);
        const data = await response.json();
        setJobDetails(data);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  useEffect(() => {
    // Check if the job is saved in localStorage when the component mounts
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    setIsJobSaved(savedJobs.includes(jobId));
  }, [jobId]);

  const handleSaveJob = () => {
    try {
      const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');

      if (savedJobs.includes(jobId)) {
        const updatedJobs = savedJobs.filter((id) => id !== jobId);
        localStorage.setItem('savedJobs', JSON.stringify(updatedJobs));
        setIsJobSaved(false);
      } else {
        savedJobs.push(jobId);
        localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
        setIsJobSaved(true);
      }
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  if (!jobDetails) {
    return <div>Loading...</div>;
  }

  const employerName = jobDetails.employer ? jobDetails.employer.name : 'Unknown Employer';

  return (
    <React.Fragment>
      <div>
        <p>
          <button onClick={handleSaveJob}>
            {isJobSaved ? 'Unsave Job' : 'Save Job'}
          </button>
        </p>
        <Link to={`/applications/${jobId}`}>
          <button>Apply for Job</button>
        </Link>
      </div>

      <div>
      <h2>Job Title: {jobDetails.job_title}</h2>
         <p>Company name: {employerName}</p>
         <p>Job Description: {jobDetails.job_description}</p>
         <p>Job Location: {jobDetails.job_location}</p>
         <p>Job Category: {jobDetails.job_category}</p>
         <p>Job Level: {jobDetails.job_level}</p>
         <p>Skills: {jobDetails.job_skills}</p>
         <p>Qualifications: {jobDetails.job_qualifications}</p>
         <p>Highest Salary: {jobDetails.salary_highest}</p>
         <p>Lowest Salary: {jobDetails.salary_lowest}</p>
         <p>Application deadline: {jobDetails.application_deadline}</p>

      </div>
    </React.Fragment>
  );
};

export default JobDetails;







// import React from 'react';
// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// const JobDetails = ({ jobId }) => {
//   const [jobDetails, setJobDetails] = useState(null);

//   useEffect(() => {
//     const fetchJobDetails = async () => {
//       try {
//         const response = await fetch(`/jobs/${jobId}`);
//         const data = await response.json();
//         setJobDetails(data);
//       } catch (error) {
//         console.error('Error fetching job details:', error);
//       }
//     };

//     fetchJobDetails();
//   }, [jobId]);

//   const handleSaveJob = async () => {
//     try {
//       const response = await fetch('/saved_jobs', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ jobId }),
//       });
//       // Handle the response here (e.g., show a success message).
//     } catch (error) {
//       console.error('Error saving job:', error);
//     }
//   };

//   if (!jobDetails) {
//     return <div>Loading...</div>;
//   }

//   const employerName = jobDetails.employer ? jobDetails.employer.name : 'Unknown Employer';

//   return (
//     <React.Fragment>
//       <div>
//         <p><button onClick={handleSaveJob}>Save Job</button></p>
//         <Link to={`/apply_job/${jobId}`}>
//           <button>Apply for Job</button>
//         </Link>
//       </div>

//       <div>
//         <h2>Job Title: {jobDetails.job_title}</h2>
//         <p>Company name: {employerName}</p>
//         <p>Job Description: {jobDetails.job_description}</p>
//         <p>Job Location: {jobDetails.job_location}</p>
//         <p>Job Category: {jobDetails.job_category}</p>
//         <p>Job Level: {jobDetails.job_level}</p>
//         <p>Skills: {jobDetails.job_skills}</p>
//         <p>Qualifications: {jobDetails.job_qualifications}</p>
//         <p>Highest Salary: {jobDetails.salary_highest}</p>
//         <p>Lowest Salary: {jobDetails.salary_lowest}</p>
//         <p>Application deadline: {jobDetails.application_deadline}</p>
//       </div>
//     </React.Fragment>
//   );
// };

// export default JobDetails;
