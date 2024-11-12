/*
  Author: Sylvia Huang
  Email: sylvialalalahw@gmail.com
  Date: 9 Nov 2024

*/
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'; // useParams to get the ID from URL, useHistory for redirection
import axios from 'axios';

const ApplicationDetails = () => {
  const { id } = useParams(); // Get the ID of the application from the URL
  const history = useHistory(); // For navigation after update or delete
  const [application, setApplication] = useState(null); // To store the application details

  // Fetch the application details when the component mounts
  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/applications/${id}`);
        setApplication(response.data);
      } catch (error) {
        console.error('Error fetching application details:', error);
      }
    };

    fetchApplication();
  }, [id]); // Re-fetch the data if the ID changes

  // Handle deletion of the application
  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/applications/${id}`);
      history.push('/dashboard'); // Redirect to the dashboard after deletion
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  // Handle updating the application (optional)
  const handleEdit = () => {
    history.push(`/application/edit/${id}`); // Redirect to the edit form (create this page if needed)
  };

  if (!application) return <div>Loading...</div>; // Loading state while fetching data

  return (
    <div>
      <h1>Application Details</h1>
      <div>
        <h2>{application.name}</h2>
        <p><strong>Income:</strong> {application.income}</p>
        <p><strong>Expenses:</strong> {application.expenses}</p>
        <p><strong>Assets:</strong> {application.assets}</p>
        <p><strong>Liabilities:</strong> {application.liabilities}</p>
      </div>

      {/* Buttons for editing and deleting */}
      <button onClick={handleEdit} className="btn btn-primary">Edit</button>
      <button onClick={handleDelete} className="btn btn-danger">Delete</button>
    </div>
  );
};

export default ApplicationDetails;