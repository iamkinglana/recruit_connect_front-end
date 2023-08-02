import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function JobDetails() {
  const [job, setJobs] = useState({});
  const [savedJobs, setSavedJobs] = useState([]);
  const [favClicked, setFavClicked] = useState(false);
  const { id } = useParams();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetch(`/jobs/${id}`)
      .then((res) => res.json())
      .then((rest) => {
        setJobs(rest);
      });
  }, [id]);

  useEffect(() => {
   
    fetchCurrentUser().then((user) => {
      setCurrentUser(user);
    });
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await fetch("/user");
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
           return null;
      }
    } catch (error) {

      return null;
    }
  };

  const handleSavedJob = () => {
    if (!currentUser) {

      return;
    }

    fetch("/saved_jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        saved_job: true,
        job_id: job.id,
        user_id: currentUser.id
      })
    })
      .then((res) => res.json())
      .then((data) => {
        setSavedJobs([...savedJobs, data]);
        setFavClicked(true);
      });
  };

  return (
    <div>
      <div className="rest-details">
        <div className="rest-details-left">
          <p className="rest-details-header">{job.job_title}</p>

          {job.description}
          <button className="rest-details-btn" onClick={handleSavedJob}>
            {currentUser &&
            savedJobs.some((savedJob) => savedJob.job_id === job.id)
              ? "Added!"
              : "Add to Saved Jobs"}
          </button>
          <div>
            <p className="pTag">Job Title</p>
            <div>{job.job_title}</div>

            <p className="pTag">Job Description</p>
            <div>{job.job_description}</div>

            <p className="pTag">Job Location</p>
            <div>{job.job_location}</div>

            <p className="pTag">Job Category</p>
            <div>{job.job_category}</div>

            <p className="pTag">Job Level</p>
            <div>{job.job_level}</div>

            <p className="pTag">Job Skills</p>
            <div>{job.job_skills}</div>

            <p className="pTag">Job Qualifications</p>
            <div>{job.job_qualifications}</div>

            <p className="pTag">Salary Range</p>
            <div>
              {job.salary_lowest} - {job.salary_highest}
            </div>

            <p className="pTag">Application Deadline</p>
            <div>{job.application_deadline}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
