import React, { useState, useEffect } from 'react';
import './dashboard.scss';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ViewLoan = () => {

  const navigate = useNavigate();
  const [loans, setLoans] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);
  const authToken = localStorage.getItem('token');

  const User = localStorage.getItem('user'); // Retrieve the authentication token from storage
  //  console.log(authToken);
  const user = JSON.parse(User);
  console.log(user);

  

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/loan/loans/${user._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },

      });

      const data = await response.json();
      const receivedLoans = data.loans || [];
      setLoans(receivedLoans);
      console.log(data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching customer loans:', error);
      setError('Error fetching customer loans. Please try again later.');
    }
  };
  let serial = 1;

  return (
    <div className="view-loan-container">
      <h2 className="view-loan-heading">{user.name}'s Loans</h2>

      {error && <p className="error-message">{error}</p>}

      <table className="view-loan-table">
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>Amount</th>
            <th>Term</th>
            <th>Status</th>
            <th>Remaining Installments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>

          {loans.map((loan, serial) => (
            <tr key={loan._id}> {/* Assuming each loan has a unique '_id' */}
              <td>{serial + 1}.</td>
              <td>${loan.amount}</td>
              <td>{loan.term} weeks</td>
              <td>{loan.state}</td>
              <td>{loan.remainingInstallments}</td>
              <td>
                {loan.state === "APPROVED" && (
                  <button onClick={() => navigate('/cust/dashboard/payloan')}>
                    Pay
                  </button>
                )}
                {loan.state === "PENDING" && (
                  <span>WAIT</span>
                )}
                {loan.state === "REJECTED" && (
                  <span>MOYE MOYE</span>
                )}

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewLoan;
