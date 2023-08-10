import React, { useState, useEffect } from 'react';
import './JobDetails.css';
import InterviewItem from './InterviewItem';

const JobDetails = ({ job, isEditable, onSave, interviewData }) => {
  const [formData, setFormData] = useState({ ...job });
  const [applicationCount, setApplicationCount] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Fetch application count
    fetch(`/api/job/${job.id}/applications`)
      .then(response => response.json())
      .then(data => setApplicationCount(data.count))
      .catch(error => console.error('Error fetching application count:', error));
  }, [job.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSave = async () => {
    onSave(formData);

    try {
      const response = await fetch(`/api/job/${job.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle success
        console.log('Job details updated successfully');
      } else {
        // Handle error
        console.error('Failed to save job details:', response.statusText);
      }
    } catch (error) {
      // Handle fetch error
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="jobTitle">Job Title:</label>
        {isEditable ? (
          <input type="text" name="jobTitle" value={formData.jobTitle || ''} onChange={handleChange} />
        ) : (
          <span>{job && job.jobTitle}</span>
        )}
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        {isEditable ? (
          <textarea name="description" value={formData.description || ''} onChange={handleChange} />
        ) : (
          <span>{job && job.description}</span>
        )}
      </div>
      {/* Render other job details in the same way */}

      {isEditable && <button onClick={handleSave}>Save</button>}

      {/* Display interview data */}
      {interviewData && <InterviewItem status={interviewData.status} />}

      {/* Display application count */}
      <p>Applications: {applicationCount}</p>

      {showDetails ? (
        <button onClick={() => setShowDetails(false)}>Hide Details</button>
      ) : (
        <button onClick={() => setShowDetails(true)}>Show Details</button>
      )}
    </div>
  );
};

export default JobDetails;
