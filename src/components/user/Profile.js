import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [jobSeeker, setJobSeeker] = useState(null);

  useEffect(() => {
       fetch('http://localhost:3000/job_seekers')
      .then((response) => response.json())
      .then((data) => setJobSeeker(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // You can perform further actions with the selected file, such as uploading it to the server
  };

  if (!jobSeeker) {
    return <div>Loading...</div>;
  }

  const { profile_image, name, contact, saved_jobs } = jobSeeker;

  return (
    <div>
      <h1>Welcome, {name}!</h1>
      <img src={profile_image} alt="Profile" />
      <p>Contact: {contact}</p>
      <div>
        <h2>Saved Jobs</h2>
        {saved_jobs && saved_jobs.length > 0 ? (
          <ul>
            {saved_jobs.map((savedJob) => (
              <li key={savedJob.id}>
                {savedJob.job.title} - {savedJob.job.company}
              </li>
            ))}
          </ul>
        ) : (
          <p>No saved jobs found.</p>
        )}
      </div>
      <div>
        <h2>Upload Resume (PDF)</h2>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
      </div>
    </div>
  );
};

export default Profile;
