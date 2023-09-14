import React, { useState, useEffect } from 'react';
import { UserContext } from '../../../App';
import { useContext } from 'react';
import './AddJobForm.css';



const AddJobForm = () => {
  const userContext = useContext(UserContext)
  const { user, setUser } = useContext(UserContext);
  console.log(user)

  const [formData, setFormData] = useState({
    job_title: '',
    job_description: '',
    job_location: '',
    job_category: '',
    job_level: '',
    job_qualifications: '',
    job_skills: '',
    salary_highest: 0,
    salary_lowest: 0,
    application_deadline: '',
  });


  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    console.log('User data from localStorage:', userData);
    setUser(userData);
    console.log(userData);
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({
          ...formData,
          employer_id: user.id,
        }),
      });

      if (response.ok) {
        console.log('Job created successfully');
        setFormData({
          job_title: '',
          job_description: '',
          job_location: '',
          job_category: '',
          job_level: '',
          job_qualifications: '',
          job_skills: '',
          salary_highest: 0,
          salary_lowest: 0,
          application_deadline: '',
        });
      } else {
        const errorData = await response.json();
        console.error('Error creating job:', errorData);
      }
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  return (
    <form className='job-form' onSubmit={handleSubmit}>
      <div >
        <label>Job Title:</label>
        <input type="text" name="job_title" value={formData.job_title} onChange={handleChange} placeholder='Software Developer..'/>
      </div>
      <div>
        <label>Job Description:</label>
        <input type="text" name="job_description" value={formData.job_description} onChange={handleChange} placeholder='Team lead..'/>
      </div>
      <div>
        <label>Job Location:</label>
        <input type="text" name="job_location" value={formData.job_location} onChange={handleChange} placeholder='Nairobi..'/>
      </div>
      <div>
        <label>Job Category:</label>
        <input type="text" name="job_category" value={formData.job_category} onChange={handleChange} placeholder='Technology..'/>
      </div>
      <div>
        <label>Job Level:</label>
        <input type="text" name="job_level" value={formData.job_level} onChange={handleChange} placeholder='Intern..' />
      </div>
      <div>
        <label>Job Qualifications:</label>
        <input type="text" name="job_qualifications" value={formData.job_qualifications} onChange={handleChange} placeholder='1yr Experience..' />
      </div>
      <div>
        <label>Job Skills:</label>
        <input type="text" name="job_skills" value={formData.job_skills} onChange={handleChange} placeholder='Java,Reactjs..' />
      </div>
       <div>
        <label>Highest Salary:</label>
        <input
          type="number"
          name="salary_highest"
          value={formData.salary_highest !== null ? formData.salary_highest : ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Lowest Salary:</label>
        <input
          type="number"
          name="salary_lowest"
          value={formData.salary_lowest !== null ? formData.salary_lowest : ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Application Deadline:</label>
        <input
          type="datetime-local"
          name="application_deadline"
          value={formData.application_deadline}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddJobForm;
