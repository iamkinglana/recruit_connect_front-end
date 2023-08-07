import React, { useState } from "react";
import "./JobApplication.css";

const JobApplication = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [resume_attachment, setResume] = useState(null);
  const [application_status, setApplicationStatus] = useState("Applied");
  const [cover_letter_attachment, setCoverLetter] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleApply = async () => {
    const formData = new FormData();
    formData.append("application[name]", name);
    formData.append("application[application_status]", application_status);
    formData.append("application[resume_attachment]", resume_attachment);
    formData.append("application[cover_letter_attachment]", cover_letter_attachment);

    try {
      const response = await fetch(
        `/applications`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const jobData = await response.json();
        onSubmit(jobData);
        setSuccessMessage("Application submitted successfully!");
        setError(null);
      } else {
        setSuccessMessage(null);
        setError("Failed to submit application. Please try again later.");
      }
    } catch (error) {
      setError("An error occurred while submitting the application.");
    }
  };

  return (
    <div className="JobApplication">
      <h2>Job Application</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Resume:
        <input type="file" onChange={(e) => setResume(e.target.files[0])} />
      </label>
      <label>
        Cover Letter:
        <input
          type="file"
          onChange={(e) => setCoverLetter(e.target.files[0])}
        />
      </label>
      <label>
        Application Status:
        <select
          value={application_status}
          onChange={(e) => setApplicationStatus(e.target.value)}
        >
          <option value="Applied">Applied</option>
          <option value="Stalled">Stalled</option>
        </select>
      </label>
      <button onClick={handleApply}>Submit Application</button>
    </div>
  );
};

export default JobApplication;
