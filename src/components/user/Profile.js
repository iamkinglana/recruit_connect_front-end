import React, { useEffect, useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [jobSeeker, setJobSeeker] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/job_seekers')
      .then((response) => response.json())
      .then((data) => {
        setJobSeeker(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);

  const handleFileChange = async (e) => {
    // ... (unchanged)
  };

  return (
    <div className="profile-container">
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        jobSeeker && <ProfileContent jobSeeker={jobSeeker} handleFileChange={handleFileChange} />
      )}
    </div>
  );
};

const ProfileContent = ({ jobSeeker, handleFileChange }) => {
  const { profile_image, name, contact, saved_jobs } = jobSeeker;

  return (
    <div>
      <h1 className="profile-heading">Welcome, {name}!</h1>
      {profile_image && <img src={profile_image} alt="Profile" className="profile-image" />}
      <p className="profile-contact">Contact: {contact}</p>
      <SavedJobs savedJobs={saved_jobs} />
      <div>
        <h2 className="resume-heading">Upload Resume (PDF)</h2>
        <input type="file" accept=".pdf" className="resume-input" onChange={handleFileChange} />
      </div>
    </div>
  );
};

const SavedJobs = ({ savedJobs }) => (
  <div>
    <h2 className="saved-jobs-heading">Saved Jobs</h2>
    {savedJobs && savedJobs.length > 0 ? (
      <ul className="saved-jobs-list">
        {savedJobs.map((savedJob) => (
          <li key={savedJob.id} className="saved-jobs-list-item">
            {savedJob.job.title} - {savedJob.job.company}
          </li>
        ))}
      </ul>
    ) : (
      <p>No saved jobs found.</p>
    )}
  </div>
);

export default Profile;
