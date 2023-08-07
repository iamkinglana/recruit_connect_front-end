import React, { useEffect, useState } from 'react';
import './Profile.css';
import SavedJobs from './SavedJobs'; // Import the updated SavedJobs component

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
  const { profile_image, name, contact } = jobSeeker;

  return (
    <div>
      <h1 className="profile-heading">Welcome, {name}!</h1>
      {profile_image && <img src={profile_image} alt="Profile" className="profile-image" />}
      <p className="profile-contact">Contact: {contact}</p>
      <SavedJobs /> {/* Render the updated SavedJobs component */}
      <div>
        <h2 className="resume-heading">Upload Resume (PDF)</h2>
        <input type="file" accept=".pdf" className="resume-input" onChange={handleFileChange} />
      </div>
    </div>
  );
};

export default Profile;
