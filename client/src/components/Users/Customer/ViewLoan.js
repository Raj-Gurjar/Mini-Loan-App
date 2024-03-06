import React, { useState, useEffect,useContext } from 'react';
import './customer.scss';

import { Outlet, useNavigate } from 'react-router-dom';

import Loader from '../../Loader/Loader';
import GlobalContext from '../../../Context/GlobalContext';

const ViewLoan = () => {

  
  const {viewLoanApi} = useContext(GlobalContext)
  const navigate = useNavigate();
  const [loans, setLoans] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const authToken = localStorage.getItem('token');
  const User = localStorage.getItem('user');
  const user = JSON.parse(User);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${viewLoanApi}${user._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });

      const data = await response.json();
   
   
      const receivedLoans = data.loans || [];
      setLoans(receivedLoans);
      console.log(receivedLoans);

      setError(null); 

      setLoading(false);
    } catch (error) {
      console.error('Error fetching customer loans:', error);
      setError('Error fetching customer loans. Please try again later.');
    }
  };
  const handlePayButtonClick = (loanId) => {
    navigate(`/cust/viewloan/payloan/${loanId}`);
  };
  return (
    <div className="view-loan-container">
        {loading && <Loader />}
      <h2 className="view-loan-heading">{user.name}'s Loans</h2>

      {error && <p className="error-message">{error}</p>}

      {loans.length === 0 ? (
        <p>No loan taken yet.</p>
      ) :
        (
          <div className="table-cntnr">
            <table className="table" data-aos="fade-right" data-dos-delay='10'>
              <thead>
                <tr>
               
                  <th>Serial No.</th>
                  <th>Amount</th>
                  <th>Term</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loans.map((loan, index) => (
                  <tr key={loan._id}>
          
                    <td>{index + 1}.</td>
                    <td>Rs. {loan.amount}</td>
                    <td>{loan.term} weeks</td>
                    <td>{(loan.state === "PENDING") &&
                      (<span className='text-blue-500'>PENDING</span>)
                    }
                      {(loan.state === "APPROVED") &&
                        (<span className='text-green-500'>APPROVED</span>)
                      }
                      {(loan.state === "REJECTED") &&
                        (<span className='text-red-500'>REJECTED</span>)
                      }
                      {(loan.state === "PAID") &&
                        (<span className='text-yellow-500'>PAID</span>)
                      }


                    </td>
                 
                    <td>

                      {loan.state === "APPROVED" && (
                        <button onClick={() => handlePayButtonClick(loan._id)}
                          className='bg-green-500 p-[3px] relative inline-flex items-center justify-start inline-block px-3 py-1 overflow-hidden font-medium transition-all rounded-full hover:bg-white group'>
                          PAY
                        </button>
                      )}

                      {loan.state === "PENDING" && (
                        <span className='bg-blue-400 p-[3px]'>WAIT</span>
                      )}
                      {loan.state === "REJECTED" && (
                        <span className='bg-red-500 p-[3px]'>REJECTED</span>
                      )}
                      {loan.state === "PAID" && (
                        <span className='text-[#36B3EB] p-[3px]'>NONE</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      }
      <Outlet/>
    </div>
  );
};

export default ViewLoan;
