import React, { useState, useEffect } from 'react';
import './EmployerProfile.css';
import SideBar from './EmployerBar';


const EmployerProfile = () => {
  const [employerDetails, setEmployerDetails] = useState({
    companyName: '',
    jobsOffered: [],
    companyEmail: '',
    companyLocation: '',
    companySlogan: '',
    companyLogoUrl: '',
  });

  useEffect(() => {
    // Fetch employer profile data from the backend
    fetch('/employers')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setEmployerDetails(data))
      .catch(error => console.error('Error fetching employer profile:', error));
  }, []);

  return (
    <div>
      {/* <SideBar/> */}
      <h2>Employer Profile</h2>
      <div>
        <label>Company Name:</label>
        <span>{employerDetails.employername}</span>
      </div>
      <div>
        <label>Company Logo:</label>
        <img src={employerDetails.companyLogoUrl} alt="Company Logo" />
      </div>
      <div>
        <label>Company Slogan:</label>
        <span>{employerDetails.companySlogan}</span>
      </div>
      <div>
        <label>Jobs Offered:</label>
        <ul>
        {employerDetails.jobsOffered && employerDetails.jobsOffered.map((job) => (
          <li key={job}>{job}</li>
        ))}
        </ul>
      </div>
      <div>
        <label>Company Email:</label>
        <span>{employerDetails.companyEmail}</span>
      </div>
      <div>
        <label>Company Location:</label>
        <span>{employerDetails.companyLocation}</span>
      </div>
    </div>
  );
};

export default EmployerProfile;
