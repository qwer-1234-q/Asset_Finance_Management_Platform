/*
  Author: Sylvia Huang
  Email: sylvialalalahw@gmail.com
  Date: 9 Nov 2024

*/
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ applicationId }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Asset Finance Management</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/application">Apply for Finance</Link>
            </li>
          </ul>
        </div>
      </div>
      {applicationId && (
        <div className="navbar-text ml-auto">
          Application ID: {applicationId}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
