import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const AcceptanceRateChart = () => {
  const [acceptanceStats, setAcceptanceStats] = useState({});

  useEffect(() => {
    // Fetch acceptance rate stats from the backend
    fetch('/acceptance-stats') // Replace with your API endpoint
      .then(response => response.json())
      .then(data => setAcceptanceStats(data))
      .catch(error => console.error('Error fetching acceptance rate stats:', error));
  }, []);

  const data = {
    labels: Object.keys(acceptanceStats),
    datasets: [
      {
        label: 'Acceptance Rate',
        backgroundColor: 'rgba(255, 99, 132, 0.4)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255, 99, 132, 0.8)',
        hoverBorderColor: 'rgba(255, 99, 132, 1)',
        data: Object.values(acceptanceStats),
      },
    ],
  };

  return (
    <div>
      <h2>Acceptance Rate per Month</h2>
      <Bar data={data} />
    </div>
  );
};

export default AcceptanceRateChart;
