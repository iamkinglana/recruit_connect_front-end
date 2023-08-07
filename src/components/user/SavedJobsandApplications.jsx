import React, { useState } from 'react';
import SavedJobsDashboard from './SavedJobs';
import JobApplication from './JobApplication';
import AppliedJobs from './AllJobsApplied';
import './SavedJobsandApplications.css'

const ApplicationsAndSavedJobs = () => {
  const [activeTab, setActiveTab] = useState('applications');
  const [appliedJobs, setAppliedJobs] = useState([]);

  const handleJobApplicationSubmit = (jobData) => {
    setAppliedJobs([...appliedJobs, jobData]);
  };

  return (
    <div className="ApplicationsAndSavedJobs">
      <div>
        <button onClick={() => setActiveTab('applications')} className={activeTab === 'applications' ? 'active' : ''}>
          Applications
        </button>
        <button onClick={() => setActiveTab('savedJobs')} className={activeTab === 'savedJobs' ? 'active' : ''}>
          Saved Jobs
        </button>
      </div>
      <div className="content">
        {activeTab === 'applications' ? (
          <JobApplication onSubmit={handleJobApplicationSubmit} />
        ) : (
          <SavedJobsDashboard appliedJobs={appliedJobs} />
        )}
      </div>
    </div>
  );
};

export default ApplicationsAndSavedJobs;
