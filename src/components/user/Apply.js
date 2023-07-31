import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Apply = () => {
  

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    resume_attachment: null
  });

  const handleNot = () => {
    alert("You applied successfully");
  };

  const handleChange = (e) => {
    const newData = { ...formData };
    newData[e.target.id] = e.target.value;
    setFormData(newData);
  };

  const handleFileChange = (e) => {
     const newData = { ...formData };
    newData[e.target.id] = e.target.files[0];
    setFormData(newData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);
      formDataObj.append("phone", formData.contact);
      formDataObj.append("resume", formData.resume_attachment);

      const response = await fetch("/job_seekers", {
        method: "POST",
        body: formDataObj
      });

      const data = await response.json();
      console.log(data);


    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="mainDiv">
        <p className="pTag">Full Name</p>
        <input
          type="text"
          className="inputTag"
          placeholder="Enter your name"
          value={formData.name}
          id="name"
          onChange={handleChange}
        />

        <p className="pTag">Phone Number</p>
        <input
          type="text"
          value={formData.contact}
          id="contact"
          className="inputTag"
          placeholder="Enter Phone number"
          onChange={handleChange}
        />

        <p className="pTag">Resume Uploads</p>
        <input
          type="file"
          className="inputTag"
          id="resume_attachment"
          onChange={handleFileChange}
        />

        <button type="submit" className="btn" onClick={handleNot}>
          Apply
        </button>
      </div>
    </form>
  );
};

export default Apply;
