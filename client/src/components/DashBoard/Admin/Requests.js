// Requests.js (Admin Panel)
import React, { useState, useEffect } from 'react';
import './requests.scss';

const Requests = () => {
  const [loanRequests, setLoanRequests] = useState([]);

  // Fetch loan requests from the API
  useEffect(() => {
    // Fetch data from your API endpoint for loan requests
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/admin/loan-requests');
        const data = await response.json();
        setLoanRequests(data);
      } catch (error) {
        console.error('Error fetching loan requests:', error);
      }
    };

    fetchData();
  }, []);

  // Placeholder function to handle loan approval
  const handleApprove = (requestId) => {
    // Call your backend API to update the loan status to 'APPROVED'
    console.log(`Loan with ID ${requestId} approved`);
  };

  // Placeholder function to handle loan rejection
  const handleReject = (requestId) => {
    // Call your backend API to update the loan status to 'REJECTED'
    console.log(`Loan with ID ${requestId} rejected`);
  };

  return (
    <div className="loan-requests-container">
      <h2 className="requests-heading">Admin Panel</h2>
      <h3 className="requests-heading">Loan Requests</h3>

      <table className="requests-table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Amount</th>
            <th>Term</th>
            <th>Scheduled Repayments</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loanRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.customerName}</td>
              <td>${request.amount}</td>
              <td>{request.term} weeks</td>
              <td>{request.scheduledRepayments.join(', ')}</td>
              <td>{request.status}</td>
              <td>
                {/* Add action buttons for admin, e.g., approve/reject */}
                <button onClick={() => handleApprove(request.id)}>Approve</button>
                <button onClick={() => handleReject(request.id)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Requests;
