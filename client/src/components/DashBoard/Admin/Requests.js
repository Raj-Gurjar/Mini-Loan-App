import React, { useState, useEffect } from 'react';
import './requests.scss';

const Request = () => {
  const [loanRequests, setLoanRequests] = useState([]);
  const [actionTaken, setActionTaken] = useState({});

  const authToken = localStorage.getItem('token');

  useEffect(() => {
    fetchLoanRequests();
  }, []);

  const fetchLoanRequests = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/loan/allLoans', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });

      const data = await response.json();
      console.log(data.loans);
      setLoanRequests(data.loans || []);
    } catch (error) {
      console.error('Error fetching loan requests:', error);
    }
  };

  const handleStatusChange = async (loanId, newStatus) => {
    console.log(loanId, newStatus);
    try {
      const response = await fetch('http://localhost:4000/api/loan/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ loanId, state: newStatus }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      // Assuming the API sends back updated loan requests after status change
      const data = await response.json();
      console.log("data front ", data);
      fetchLoanRequests();


    } catch (error) {
      console.error('Error updating loan status:', error);
    }
  };

  return (
    <div className="request-container">
      <h2 className="request-heading">Loan Requests</h2>

      <table className="request-table">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Email</th>
            <th>Loan Amount</th>
            <th>Term</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loanRequests.map((request) => (
            <tr key={request._id}>
              <td>{request.userId.name}</td>
              <td>{request.userId.email}</td>
              <td>${request.amount}</td>
              <td>{request.term} weeks</td>
              <td>{actionTaken[request._id] || request.state}</td>
              <td>
                {(request.state === "PENDING") ? (
                  <>
                    <button onClick={() => handleStatusChange(request._id, 'APPROVED')}>
                      Approve
                    </button>
                    <button onClick={() => handleStatusChange(request._id, 'REJECTED')}>
                      Reject
                    </button>
                  </>
                ) : <button disabled>Done</button>}

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Request;
