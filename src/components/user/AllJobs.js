import React, { useEffect, useState } from "react";

function AllJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Fetch the list of all jobs from the backend and store them in the 'jobs' state
    fetch("/jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  }, []);

  return (
    <div>
      <h2>All Available Jobs</h2>
      {jobs.map((job) => (
        <div key={job.id} className="job-item">
          <h3>{job.job_title}</h3>
          <p>{job.job_description}</p>
          <p>Location: {job.job_location}</p>
          <p>Category: {job.job_category}</p>
          <p>Salary: {job.salary_lowest} - {job.salary_highest}</p>
          <button>View Details</button>
        </div>
      ))}
    </div>
  );
}

export default AllJobs;
