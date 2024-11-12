/*
  Author: Sylvia Huang
  Email: sylvialalalahw@gmail.com
  Date: 9 Nov 2024
*/
import axios from 'axios';

// Set up Axios instance with base URL
const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,  // Base URL from the environment variable
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get all finance applications
export const getApplications = async () => {
  try {
    const response = await api.get('/applications');
    return response.data;
  } catch (error) {
    console.error('Error fetching applications:', error);
    throw error;  // You can also throw or handle errors here
  }
};

// Function to get a single finance application by ID
export const getApplicationById = async (id) => {
  try {
    const response = await api.get(`/applications/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching application with ID ${id}:`, error);
    throw error;
  }
};

// Function to create a new finance application
export const createApplication = async (data) => {
  try {
    const response = await api.post('/applications', data);
    return response.data;
  } catch (error) {
    console.error('Error creating application:', error);
    throw error;
  }
};

// Function to update an existing finance application
export const updateApplication = async (id, data) => {
  try {
    const response = await api.put(`/applications/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating application with ID ${id}:`, error);
    throw error;
  }
};

// Function to delete a finance application
export const deleteApplication = async (id) => {
  try {
    const response = await api.delete(`/applications/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting application with ID ${id}:`, error);
    throw error;
  }
};

// Default export for the Axios instance
export default api;
