import React, { useState, useEffect } from 'react';
import './admin.scss';
import Loader from '../../Loader/Loader';
import toast from 'react-hot-toast';

const Request = () => {
  const [loanRequests, setLoanRequests] = useState([]);
  const [actionTaken, setActionTaken] = useState({});
  const [loading, setLoading] = useState(false);

  const authToken = localStorage.getItem('token');

  useEffect(() => {
    fetchLoanRequests();
  }, []);

  const fetchLoanRequests = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:4000/api/loan/allLoans', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });

      const data = await response.json();
      // console.log(data.loans);
      setLoanRequests(data.loans || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching loan requests:', error);
    }
  };

  const handleStatusChange = async (loanId, newStatus) => {
    // console.log(loanId, newStatus);
    try {
      setLoading(true);
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

      const data = await response.json();
      // console.log("data front ", data);
      fetchLoanRequests();
      toast.success("Loan Updated Successfully");

      setLoading(false);
    } catch (error) {
      console.error('Error updating loan status:', error);
    }
  };

  return (
    <div className="request-container">
      {loading && <Loader />}
      <h2 className="request-heading">Loan Requests</h2>

      {loanRequests.length > 0 ? (
        <div className="table-cntnr" data-aos="fade-right" data-dos-delay='10'>
          <table className="table">
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
                  <td>Rs.{request.amount}</td>
                  <td>{request.term} weeks</td>

                  <td>{(request.state === "PENDING") &&
                    (<span className='text-blue-500'>PENDING</span>)
                  }
                    {(request.state === "APPROVED") &&
                      (<span className='text-green-500'>APPROVED</span>)
                    }
                    {(request.state === "REJECTED") &&
                      (<span className='text-red-500'>REJECTED</span>)
                    }
                    {(request.state === "PAID") &&
                      (<span className='text-yellow-500'>PAID</span>)
                    }
                  </td>

                  <td>
                    {(request.state === "PENDING") ? (
                      <>
                        <button onClick={() => handleStatusChange(request._id, 'APPROVED')}
                          className='bg-green-500 p-[3px] mx-[3px] relative inline-flex items-center justify-start inline-block px-3 py-1 overflow-hidden font-medium transition-all rounded-full hover:bg-white group'>
                          Approve
                        </button>
                        <button onClick={() => handleStatusChange(request._id, 'REJECTED')}
                          className='bg-red-500 p-[3px] mx-[3px] relative inline-flex items-center justify-start inline-block px-3 py-1 overflow-hidden font-medium transition-all rounded-full hover:bg-white group'>
                          Reject
                        </button>
                      </>
                    ) : <button disabled className='text-slate-100'>Done</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-requests-message">No loan requests to show.</p>
      )}
    </div>
  );
};

export default Request;
