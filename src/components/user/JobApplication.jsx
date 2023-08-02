
import { useState } from 'react';

const JobApplication = ({ jobId }) => {
  const [name, setName] = useState('');
  const [resume, setResume] = useState(null);

  const handleApply = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('resume', resume);

    try {
      const response = await fetch(`http://localhost:3000/applications/${jobId}`, {
        method: 'POST',
        body: formData,
      });


    } catch (error) {

    }
  };

  return (
    <div>
      <h2>Job Application</h2>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Resume:
        <input type="file" onChange={(e) => setResume(e.target.files[0])} />
      </label>
      <button onClick={handleApply}>Submit Application</button>
    </div>
  );
};

export default JobApplication;
