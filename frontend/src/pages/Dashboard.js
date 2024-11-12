/*
  Author: Sylvia Huang
  Email: sylvialalalahw@gmail.com
  Date: 9 Nov 2024

*/
import React, { useState, useEffect } from 'react';
import { getApplications } from '../services/api'; // Corrected import

const Dashboard = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getApplications();  // Use getApplications here
        setApplications(data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };
    
    fetchApplications();
  }, []);

  return (
    <div>
      <h2>Applications Dashboard</h2>
      <ul>
        {applications.map((application) => (
          <li key={application.id}>{application.fullName}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
