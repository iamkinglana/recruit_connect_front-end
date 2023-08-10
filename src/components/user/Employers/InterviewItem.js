import React from 'react';

const InterviewItem = ({ interview, jobTitle }) => {
  return (
    <div className="interview-item">
      <h3>Interview Status for {jobTitle}</h3>
      <p>Scheduled: {interview.scheduled}</p>
      <p>Accepted: {interview.accepted}</p>
      <p>Declined: {interview.declined}</p>
    </div>
  );
};

export default InterviewItem;
