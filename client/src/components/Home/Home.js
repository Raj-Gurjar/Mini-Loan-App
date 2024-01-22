// HomePage.js
import React from 'react';
import './home.scss';

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="header">
        <h1>Welcome to the Mini-Loan App</h1>
        <p>Authenticated users can apply for loans and manage repayments.</p>
      </div>
      <div className="features">
        <div className="feature">
          <h2>Apply for a Loan</h2>
          <p>Submit a loan request with the desired amount and term.</p>
        </div>
        <div className="feature">
          <h2>Admin Approval</h2>
          <p>Admins can approve pending loans to make them active.</p>
        </div>
        <div className="feature">
          <h2>View Your Loans</h2>
          <p>Customers can view their own loan details.</p>
        </div>
        <div className="feature">
          <h2>Repayments</h2>
          <p>Add repayments and track your loan status.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
