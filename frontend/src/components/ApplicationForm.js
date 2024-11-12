/*
  Author: Sylvia Huang
  Email: sylvialalalahw@gmail.com
  Date: 9 Nov 2024

*/
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const ApplicationForm = ({ setApplicationId }) => {
  // State to handle submission success or error
  const [submitStatus, setSubmitStatus] = useState(null);

  // Initialize the React Hook Form
  const { register, handleSubmit, formState: { errors } } = useForm();

  // useNavigate hook for redirecting after successful form submission
  const navigate = useNavigate();  // Use useNavigate instead of useHistory

  // Form submission handler
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/applications`, data);
      if (response.status === 201) {
        setSubmitStatus('success');
        setApplicationId(response.data.id);  // Set the application ID
        setTimeout(() => {
          navigate('/dashboard');  // Use navigate for redirection
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitStatus('error');
    }
  };

  return (
    <div className="container">
      <h2>Finance Application Form</h2>

      {submitStatus && (
        <div className={`alert alert-${submitStatus === 'success' ? 'success' : 'danger'}`} role="alert">
          {submitStatus === 'success' ? 'Application submitted successfully!' : 'An error occurred. Please try again.'}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Personal Details */}
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            type="text"
            className="form-control"
            {...register('fullName', { required: 'Full Name is required' })}
          />
          {errors.fullName && <span className="text-danger">{errors.fullName.message}</span>}
        </div>

        {/* Income */}
        <div className="form-group">
          <label htmlFor="income">Income</label>
          <input
            id="income"
            type="number"
            className="form-control"
            {...register('income', { required: 'Income is required', valueAsNumber: true })}
          />
          {errors.income && <span className="text-danger">{errors.income.message}</span>}
        </div>

        {/* Expenses */}
        <div className="form-group">
          <label htmlFor="expenses">Expenses</label>
          <input
            id="expenses"
            type="number"
            className="form-control"
            {...register('expenses', { required: 'Expenses are required', valueAsNumber: true })}
          />
          {errors.expenses && <span className="text-danger">{errors.expenses.message}</span>}
        </div>

        {/* Assets */}
        <div className="form-group">
          <label htmlFor="assets">Assets</label>
          <input
            id="assets"
            type="number"
            className="form-control"
            {...register('assets', { required: 'Assets value is required', valueAsNumber: true })}
          />
          {errors.assets && <span className="text-danger">{errors.assets.message}</span>}
        </div>

        {/* Liabilities */}
        <div className="form-group">
          <label htmlFor="liabilities">Liabilities</label>
          <input
            id="liabilities"
            type="number"
            className="form-control"
            {...register('liabilities', { required: 'Liabilities value is required', valueAsNumber: true })}
          />
          {errors.liabilities && <span className="text-danger">{errors.liabilities.message}</span>}
        </div>

        <button type="submit" className="btn btn-primary mt-3">Submit Application</button>
      </form>
    </div>
  );
};

export default ApplicationForm;
