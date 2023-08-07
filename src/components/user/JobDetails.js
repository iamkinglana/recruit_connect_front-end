// import React, { useState, useEffect } from 'react';
// import { Link, useParams } from 'react-router-dom';

// const JobDetails = () => {
//   const { id } = useParams(); // Use 'id' from the URL
//   const [jobDetails, setJobDetails] = useState(null);

//   useEffect(() => {
//     const fetchJobDetails = async () => {
//       try {
//         const response = await fetch(`/jobs/${id}`);
//         const data = await response.json();
//         setJobDetails(data);
//       } catch (error) {
//         console.error('Error fetching job details:', error);
//       }
//     };

//     fetchJobDetails();
//   }, [id]);

//   const handleSaveJob = () => {
//     try {
//       const savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];

//       const isJobSaved = savedJobs.some(savedJob => savedJob.id === id);

//       if (!isJobSaved) {
//         const updatedSavedJobs = [...savedJobs, { id: id, jobDetails }];
//         localStorage.setItem('savedJobs', JSON.stringify(updatedSavedJobs));
//         // Handle UI feedback (e.g., show a success message)
//       } else {
//         // Handle case where the job is already saved
//         // For example, show a message to the user
//       }
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
//         <Link to={`/applications/${id}`}>
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

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './JobDetails.css';

const JobDetails = () => {
  const { id } = useParams(); // Use 'id' from the URL
  const [jobDetails, setJobDetails] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false); // State to manage success message

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`/jobs/${id}`);
        const data = await response.json();
        setJobDetails(data);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleSaveJob = () => {
    try {
      const savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];

      const isJobSaved = savedJobs.some(savedJob => savedJob.id === id);

      if (!isJobSaved) {
        const updatedSavedJobs = [...savedJobs, { id: id, jobDetails }];
        localStorage.setItem('savedJobs', JSON.stringify(updatedSavedJobs));
        setSaveSuccess(true);
      } else {

        alert('This job is already saved.');
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
        <div className="job-details-container">
      <div className="job-details-header">
        <h2>Job Details</h2>
        <button className="save-button" onClick={handleSaveJob}>Save Job</button>
        {saveSuccess && <p className="success-message">Job saved successfully!</p>}
      </div>
      <div className="job-details-content">
        <div className="job-info">
          <h3>Job Title: {jobDetails.job_title}</h3>
          <p>Company name: {employerName}</p>
          <p>Job Description: {jobDetails.job_description}</p>
          <p>Job Location: {jobDetails.job_location}</p>
          <p>Job Category: {jobDetails.job_category}</p>
          <p>Job Level: {jobDetails.job_level}</p>
          <p>Skills: {jobDetails.job_skills}</p>
          <p>Qualifications: {jobDetails.job_qualifications}</p>
        </div>
        <div className="salary-info">
          <p>Highest Salary: {jobDetails.salary_highest}</p>
          <p>Lowest Salary: {jobDetails.salary_lowest}</p>
          <p>Application deadline: {jobDetails.application_deadline}</p>
        </div>
      </div>
      <div className="button-container">
        <Link to={`/applications/${id}`}>
          <button className="apply-button">Apply for Job</button>
        </Link>
      </div>
    </div>

    </React.Fragment>
  );
};

export default JobDetails;
