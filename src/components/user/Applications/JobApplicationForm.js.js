import React, { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import { UserContext } from '../../../App';
import './JobApplication.css'

const JobApplicationForm = () => {
  const userContext = useContext(UserContext);
  const { user } = userContext;
  const navigate = useNavigate();
  const { id } = useParams();
  const [applicationStatus, setApplicationStatus] = useState('applied')
  const [applicationDate, setApplicationDate] = useState(new Date().toISOString().split('T')[0]); // Set to current date
  const [resumeAttachment, setResumeAttachment] = useState('');
  const [coverLetterAttachment, setCoverLetterAttachment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const applicationData = {
      job_id: id,
      application_date: applicationDate,
      resume_attachment: resumeAttachment,
      cover_letter_attachment: coverLetterAttachment,
      job_seeker_id: user.job_seeker.id,
      application_status: applicationStatus
    };

    try {
      const response = await fetch('/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      });

      if (response.ok) {
        console.log('Application submitted successfully');
      } else {
        console.error('Failed to submit application');
      }
    } catch (error) {
      console.error('Error submitting application', error);
    }
  };

  const handleCancel = () => {
    navigate(`/jobs/${id}`); 
    };

  return (
    <div className="job-application-container">
      <h2>Job Application Form</h2>
      <form onSubmit={handleSubmit}>
        <label className="form-label">Application Date:</label>
        <input type="date" value={applicationDate} readOnly className="form-control" />
        
        <label className="form-label">Resume Attachment:</label>
        <input type="file" value={resumeAttachment} onChange={(e) => setResumeAttachment(e.target.value)} className="form-control" required />
        
        <label className="form-label">Cover Letter Attachment:</label>
        <input type="file" value={coverLetterAttachment} onChange={(e) => setCoverLetterAttachment(e.target.value)} className="form-control" required />
        
        

        <div className="button-container">
          <button type="submit" className="submit-button">Submit Application</button>
          <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default JobApplicationForm;