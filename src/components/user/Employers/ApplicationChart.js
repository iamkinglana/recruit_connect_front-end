import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const ApplicationChart = () => {
  const [applicationStats, setApplicationStats] = useState({});

  useEffect(() => {
    // Fetch application statistics from the backend
    fetch('https://recruit-connect-vr2.onrender.com/api/application-stats')
      .then(response => response.json())
      .then(data => setApplicationStats(data))
      .catch(error => console.error('Error fetching application stats:', error));
  }, []);

  const data = {
    labels: Object.keys(applicationStats),
    datasets: [
      {
        label: 'Number of Applications',
        backgroundColor: 'rgba(75, 192, 192, 0.4)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
        hoverBorderColor: 'rgba(75, 192, 192, 1)',
        data: Object.values(applicationStats),
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return (
    <div>
      <h2>Number of Applications per Month</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ApplicationChart;
