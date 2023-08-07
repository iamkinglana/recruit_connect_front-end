import { useState } from "react";
import "./JobApplication.css";

const JobApplication = ({ jobId }) => {
  const [name, setName] = useState("");
  const [resume_attachment, setResume] = useState(null);
  const [application_status, setApplicationStatus] = useState("Applied"); // Default value is 'Applied'
  const [cover_letter_attachment, setCoverLetter] = useState(null);

  const handleApply = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("resume_attachment", resume_attachment);
    formData.append("application_status", application_status);
    formData.append("cover_letter_attachment", cover_letter_attachment);
    formData.append("cover_letter_attachment", cover_letter_attachment); // Add cover letter attachment

    try {
      const response = await fetch(
        `http://localhost:3000/applications/${jobId}`,
        {
          method: "POST",
          body: formData
        }
      );
      // Handle response here
    } catch (error) {
      // Handle error here
    }
  };

  return (
    <div className="JobApplication">
      <h2>Job Application</h2>
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
