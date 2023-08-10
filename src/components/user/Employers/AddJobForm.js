// import React, { useState } from 'react';
// import './AddJobForm.css';

// const AddJobForm = () => {
//   const [formData, setFormData] = useState({
//     jobTitle: '',
//     description: '',
//     location: '',
//     category: '',
//     jobType: '',
//     qualifications: '',
//     salaryRange: '',
//     applicationDeadline: '',
//   });

//   const jobTypes = ['Remote', 'Physical', 'Part Time', 'Full Time', 'Internship']; // Job types

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };


//   const handleSubmit = (e) => {
//     e.preventDefault();

//     fetch('http://127.0.0.1:3000/jobs', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData),
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log('Job added successfully:', data);
//       })
//       .catch(error => {
//         console.error('Error adding job:', error);
//       });
//   };

//   return (
//     <form className="add-job-form" onSubmit={handleSubmit}>
//       <div className="form-group">
//         <label>Job Title:</label>
//         <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} />
//       </div>
//       <div className="form-group">
//         <label>Description:</label>
//         <textarea name="description" value={formData.description} onChange={handleChange} />
//       </div>
//       <div className="form-group">
//         <label>Location:</label>
//         <select name="location" value={formData.location} onChange={handleChange}>
//           <option value="">Select Location</option>
//           <option value="Nairobi">Nairobi</option>
//           <option value="Kiambu">Kiambu</option>
//           <option value="Mombasa">Mombasa</option>
//           <option value="Nakuru">Nakuru</option>
//           <option value="Kisumu">Kisumu</option>
//           <option value="Machakos">Machakos</option>
//           <option value="Uasin Gishu">Uasin Gishu</option>
//         </select>
//       </div>
//       <div className="form-group">
//         <label>Category:</label>
//         <input type="text" name="category" value={formData.category} onChange={handleChange} />
//       </div>
//       <div className="form-group">
//         <label>Job Type:</label>
//         <select name="jobType" value={formData.jobType} onChange={handleChange}>
//           <option value="">Select Job Type</option>
//           {jobTypes.map((type, index) => (
//             <option key={index} value={type}>
//               {type}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div className="form-group">
//         <label>Qualifications:</label>
//         <textarea name="qualifications" value={formData.qualifications} onChange={handleChange} />
//       </div>
//       <div className="form-group">
//         <label>Salary Range:</label>
//         <input type="text" name="salaryRange" value={formData.salaryRange} onChange={handleChange} />
//       </div>
//       <div className="form-group">
//         <label>Application Deadline:</label>
//         <input type="date" name="applicationDeadline" value={formData.applicationDeadline} onChange={handleChange} />
//       </div>
//       <button className="btn btn-primary" type="submit">Add Job</button>
//     </form>
//   );
// };

// export default AddJobForm;
// import React, { useState, useEffect } from 'react';

// const AddJobForm = () => {
//   const [formData, setFormData] = useState({
//     job_title: '',
//     job_description: '',
//     job_location: '',
//     job_category: '',
//     job_level: '',
//     job_qualifications: '',
//     job_skills: '',
//     salary_highest: 0,
//     salary_lowest: 0,
//     application_deadline: '',
//   });
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const userData = JSON.parse(localStorage.getItem('user'));
//     console.log('User data from localStorage:', userData); // Debug logging
//     setUser(userData);
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://localhost:3000/jobs', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
//         },
//         body: JSON.stringify({
//           ...formData,
//           employer_id: user.id,
//         }),
//       });

//       if (response.ok) {
//         console.log('Job created successfully');
//         setFormData({
//           job_title: '',
//           job_description: '',
//           job_location: '',
//           job_category: '',
//           job_level: '',
//           job_qualifications: '',
//           job_skills: '',
//           salary_highest: 0,
//           salary_lowest: 0,
//           application_deadline: '',
//         });
//       } else {
//         const errorData = await response.json();
//         console.error('Error creating job:', errorData);
//       }
//     } catch (error) {
//       console.error('Error creating job:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Job Title:</label>
//         <input type="text" name="job_title" value={formData.job_title} onChange={handleChange} />
//       </div>
//       <div>
//         <label>Job Description:</label>
//         <input type="text" name="job_description" value={formData.job_description} onChange={handleChange} />
//       </div>
//       <div>
//         <label>Job Location:</label>
//         <input type="text" name="job_location" value={formData.job_location} onChange={handleChange} />
//       </div>
//       <div>
//         <label>Job Category:</label>
//         <input type="text" name="job_category" value={formData.job_category} onChange={handleChange} />
//       </div>
//       <div>
//         <label>Job Level:</label>
//         <input type="text" name="job_level" value={formData.job_level} onChange={handleChange} />
//       </div>
//       <div>
//         <label>Job Qualifications:</label>
//         <input type="text" name="job_qualifications" value={formData.job_qualifications} onChange={handleChange} />
//       </div>
//       <div>
//         <label>Job Skills:</label>
//         <input type="text" name="job_skills" value={formData.job_skills} onChange={handleChange} />
//       </div>
//        <div>
//         <label>Highest Salary:</label>
//         <input
//           type="number"
//           name="salary_highest"
//           value={formData.salary_highest !== null ? formData.salary_highest : ''}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label>Lowest Salary:</label>
//         <input
//           type="number"
//           name="salary_lowest"
//           value={formData.salary_lowest !== null ? formData.salary_lowest : ''}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <label>Application Deadline:</label>
//         <input
//           type="datetime-local"
//           name="application_deadline"
//           value={formData.application_deadline}
//           onChange={handleChange}
//         />
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default AddJobForm;




import React, { useState } from 'react';

function AddJobForm() {
  const [jobData, setJobData] = useState({
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ job: jobData }),
      });

      if (response.ok) {
        const responseData = await response.json();
        alert('Job submitted successfully!');
        console.log(responseData);
      } else {
        const errorData = await response.json();
        alert('Job submission failed.');
        console.error(errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

   return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Job Title:</label>
        <input type="text" name="job_title" value={jobData.job_title} onChange={handleChange} />
      </div>
      <div>
        <label>Job Description:</label>
        <input type="text" name="job_description" value={jobData.job_description} onChange={handleChange} />
      </div>
      <div>
        <label>Job Location:</label>
        <input type="text" name="job_location" value={jobData.job_location} onChange={handleChange} />
      </div>
      <div>
        <label>Job Category:</label>
        <input type="text" name="job_category" value={jobData.job_category} onChange={handleChange} />
      </div>
      <div>
        <label>Job Level:</label>
        <input type="text" name="job_level" value={jobData.job_level} onChange={handleChange} />
      </div>
      <div>
        <label>Job Qualifications:</label>
        <input type="text" name="job_qualifications" value={jobData.job_qualifications} onChange={handleChange} />
      </div>
      <div>
        <label>Job Skills:</label>
        <input type="text" name="job_skills" value={jobData.job_skills} onChange={handleChange} />
      </div>
       <div>
        <label>Highest Salary:</label>
        <input
          type="number"
          name="salary_highest"
          value={jobData.salary_highest !== null ? jobData.salary_highest : ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Lowest Salary:</label>
        <input
          type="number"
          name="salary_lowest"
          value={jobData.salary_lowest !== null ? jobData.salary_lowest : ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Application Deadline:</label>
        <input
          type="datetime-local"
          name="application_deadline"
          value={jobData.application_deadline}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddJobForm;
