import React, { useState } from 'react';
import './JobForm.css';

const JobForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    description: '',
    location: '',
    category: '',
    jobLevel: '',
    qualifications: '',
    salaryRange: '',
    applicationDeadline: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Perform form submission and API call to store the job data in the backend
    fetch('https://recruit-connect-vr2.onrender.com/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Handle success response here, e.g., show a success message
        console.log('Job added successfully:', data);
      })
      .catch(error => {
        // Handle error here, e.g., show an error message
        console.error('Error adding job:', error);
      });
  };

  return (
    <div>
      <h2>Add Job</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Job Title:</label>
          <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} />
        </div>
        {/* Add other form fields */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default JobForm;
