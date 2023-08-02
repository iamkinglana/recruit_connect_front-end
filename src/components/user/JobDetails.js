
import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const JobDetails = ({ jobId }) => {
  const [jobDetails, setJobDetails] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`/jobs/${jobId}`);
        const data = await response.json();
        setJobDetails(data);
      } catch (error) {

      }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleSaveJob = async () => {
    try {
      const response = await fetch('/saved_jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobId }),
      });


    } catch (error) {
    }
  };

  if (!jobDetails) {
    return <div>Loading...</div>;
  }

    return (
        <React.Fragment>
          <div>
            <p><button onClick={handleSaveJob}>Save Job</button></p>
            <Link to={`/apply_job/${jobId}`}>
              <button>Apply for Job</button>
            </Link>
          </div>

          <div>
            <h2>Job Title: {jobDetails.job_title}</h2>
            <p>Company name:{jobDetails.employer.name} </p>

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

