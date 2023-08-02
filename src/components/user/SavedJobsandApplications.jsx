import { useState } from 'react';
import SavedJobsDashboard from './SavedJobs';
import JobApplication from './JobApplication';

const ApplicationsAndSavedJobs = () => {
  const [activeTab, setActiveTab] = useState('applications');

  return (
    <div>
      <div>
        <button onClick={() => setActiveTab('applications')} className={activeTab === 'applications' ? 'active' : ''}>
          Applications
        </button>
        <button onClick={() => setActiveTab('savedJobs')} className={activeTab === 'savedJobs' ? 'active' : ''}>
          Saved Jobs
        </button>
      </div>
      <div>
        {activeTab === 'applications' ? (
          <JobApplication />
        ) : (
          <SavedJobsDashboard />
        )}
      </div>
    </div>
  );
};

export default ApplicationsAndSavedJobs;
