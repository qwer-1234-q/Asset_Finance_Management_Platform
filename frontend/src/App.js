/*
  Author: Sylvia Huang
  Email: sylvialalalahw@gmail.com
  Date: 9 Nov 2024

  This file is for Setting Up Routing in the Asset Finance Management Platform.
*/
import React, { useState } from 'react';
import NavigationBar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ApplicationForm from './components/ApplicationForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  const [applicationId, setApplicationId] = useState(null); // Track application ID

  return (
    <Router>
      {/* Pass the applicationId state to the Navbar */}
      <NavigationBar applicationId={applicationId} />
      <div className="container mt-4">
        <Routes>
          <Route 
            path="/dashboard" 
            element={<Dashboard />} 
          />
          <Route 
            path="/application" 
            element={<ApplicationForm setApplicationId={setApplicationId} />} 
          />
          <Route 
            path="/" 
            element={<Dashboard />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
