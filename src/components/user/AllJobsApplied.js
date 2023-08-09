import React from "react";

const AppliedJobs = ({ appliedJobs }) => {
  return (
    <div className="AppliedJobsComponent">
      <ul>
        {appliedJobs.map((job, index) => (
          <li key={index}>
            <div>Name: {job.name}</div>
            <div>Application Status: {job.application_status}</div>
            {/* Display more job details here if needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppliedJobs;
