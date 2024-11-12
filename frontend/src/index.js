/*
  Author: Sylvia Huang
  Email: sylvialalalahw@gmail.com
  Date: 9 Nov 2024

*/
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'; // React Router for navigation
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap styling
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

reportWebVitals(console.log);

reportWebVitals((metric) => {
  // Send metric to your analytics service
  fetch('/api/performance-metrics', {
    method: 'POST',
    body: JSON.stringify(metric),
    headers: {
      'Content-Type': 'application/json',
    },
  });
});
