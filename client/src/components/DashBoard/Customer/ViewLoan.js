import React, { useState, useEffect } from 'react';
import './dashboard.scss';

const ViewLoan = () => {
  const [loans, setLoans] = useState([]);

  // Fetch customer's old loans from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/customer/loans');
        const data = await response.json();
        setLoans(data);
      } catch (error) {
        console.error('Error fetching customer loans:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="view-loan-container">
      <h2 className="view-loan-heading">Your Old Loans</h2>
      <table className="view-loan-table">
        <thead>
          <tr>
            <th>Loan ID</th>
            <th>Amount</th>
            <th>Term</th>
            <th>Status</th>
            <th>Remaining Installments</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan.id}>
              <td>{loan.id}</td>
              <td>${loan.amount}</td>
              <td>{loan.term} weeks</td>
              <td>{loan.status}</td>
              <td>{loan.remainingInstallments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewLoan;
