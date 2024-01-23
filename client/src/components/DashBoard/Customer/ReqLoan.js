import React, { useState } from 'react';
import './dashboard.scss';
import toast from 'react-hot-toast';

const ReqLoan = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [term, setTerm] = useState('');
  const [installments, setInstallments] = useState([]);
  const [showPayments, setShowPayments] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const calculateInstallments = () => {
    if (!loanAmount || !term) {
      setErrorMessage('Please enter loan amount and term.');
      return;
    }

    const loanAmountFloat = parseFloat(loanAmount);
    const termInt = parseInt(term);

    if (termInt > loanAmountFloat) {
      setErrorMessage('Number of installments cannot be greater than the loan amount.');
      return;
    }

    const weeklyInstallment = Math.floor(loanAmountFloat / termInt);
    const remainingAmount = loanAmountFloat - weeklyInstallment * termInt;
    const currentDate = new Date();
    const installmentsData = [];

    for (let i = 1; i <= termInt; i++) {
      const installment = {
        date: new Date(currentDate.getTime() + i * 7 * 24 * 60 * 60 * 1000),
        amount: (weeklyInstallment + (i <= remainingAmount ? 1 : 0)).toFixed(2),
      };
      installmentsData.push(installment);
    }

    setInstallments(installmentsData);
    setShowPayments(true);
    setErrorMessage('');
  };

  const sendLoanApplication = async () => {
    if (!loanAmount || !term || installments.length === 0) {
      setErrorMessage('Please calculate installments before applying.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/loan/createLoan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // userId:user._id
          amount: loanAmount,
          term,
          payments: installments,
          
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setErrorMessage('');
        // You can handle success here, e.g., show a success message
        console.log('Loan application submitted successfully:', data);
        toast.success('Loan Request Has submitted Successfully');
      } else {
        setErrorMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error submitting loan application:', error);
      setErrorMessage('An error occurred while submitting the loan application.');
    }
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2);

    return `${day}/${month}/${year}`;
  };

  return (
    <div className="loan-container">
      <div className="loan-form">
        <label htmlFor="loanAmount">Loan Amount</label>
        <input
          type="number"
          id="loanAmount"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
        />

        <label htmlFor="term">Term (in weeks)</label>
        <input
          type="number"
          id="term"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />

        <div className='btn-cntrn'>
          <button onClick={calculateInstallments}>View Installments</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button className="apply-btn" onClick={sendLoanApplication}>
            Apply
          </button>
        </div>
      </div>

      <div className="payments-container">
        <h2>Scheduled Payments</h2>
        {showPayments ? (
          <div className="installments-list">
            <ul>
              {installments.map((installment, index) => (
                <li key={index}>
                  {`Week ${index + 1}: ${formatDate(installment.date)} - ₹${installment.amount}`}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No payments scheduled yet.</p>
        )}
      </div>
    </div>
  );
};

export default ReqLoan;
