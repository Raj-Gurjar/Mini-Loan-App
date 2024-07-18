// Import necessary React and styling modules
import React, { useState, useEffect ,useContext} from 'react';
import './customer.scss'; // Import your SCSS file
// import { Routes } from 'react-router-dom';
import { useParams } from "react-router-dom";
import toast from 'react-hot-toast';
import Loader from '../../Loader/Loader'
import GlobalContext from '../../../Context/GlobalContext';


export default function PayLoan() {


    const {viewPaymentApi,payLoanApi} = useContext(GlobalContext)
    const params = useParams();
    const loanId = params.id;
    // console.log(params);

    const [loanRequests, setLoanRequests] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [paymentAmount, setPaymentAmount] = useState("");
    const [repayments, setRepayments] = useState([]);
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const dd = String(date.getDate()).padStart(2, "0");
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const yy = String(date.getFullYear()).slice(-2);
        return `${dd}/${mm}/${yy}`;
    };

    useEffect(() => {
        fetchPaymentStatus();
    }, []);

    const hasPendingRepayments = repayments.some(
        (repayment) => repayment.status === "PENDING"
    );

    const openModal = () => {
        if (hasPendingRepayments) {
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setPaymentAmount();
    };

    const authToken = localStorage.getItem('token');



    const fetchPaymentStatus = async () => {
        setLoading(true);
        try {


            const response = await fetch(`${viewPaymentApi}${loanId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
            });

            const data = await response.json();
            console.log(data);


            setLoanRequests(data.payments || []);
        } catch (error) {
            console.error('Error fetching loan requests:', error);
        }
        finally {
            setLoading(false);
        }
    };


    const handleStatusChange = async (loanId, amount) => {

        try {
            setLoading(true);
            if (parseFloat(amount) > parseFloat(paymentAmount)) {
                toast.error("Repayment amount should be greater than or equal to the required amount.");
                return;
            }

            closeModal();

            const response = await fetch(`${payLoanApi}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify({
                    amount: paymentAmount,
                    loanId: loanId,
                }),
            });

        
            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }

          

            toast.success("Payment Successful");
            fetchPaymentStatus();
        } catch (error) {
            console.error('Error updating loan status:', error);
        }
        finally {
            setLoading(false);
        }
    };





    function payHandler(amount) {
        setIsModalOpen(true)
        setAmount(amount);
    }

    return (
        <>
            {loading && <Loader />}

            <div className='payloan' data-aos="fade-right" data-dos-delay='10'>
                <h1>Pay Loan</h1>

                <div className="table-cntnr">


                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Installment Amount</th>
                                <th>Remaining Amount</th>
                                <th>Deadline</th>
                                <th>Status</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {loanRequests.map((payment) => (
                                <tr key={payment.id}>

                                    <td>{payment.totalAmount}</td>
                                    <td>{payment.amount}</td>
                                    <td>{formatDate(payment.date)}</td>
                                    <td>{(payment.status === "PAID") ?
                                        (<span className='text-green-500'>PAID</span>) : 
                                        (<span className='text-red-500'>NOT PAID</span>)}
                                    </td>
                                    <td>{
                                        (payment.status === "PENDING") ?
                                            <button onClick={() => payHandler(payment.amount)} className='bg-green-500 hover:bg-green-700 round px-1 py-3'>
                                                Pay Now
                                            </button> :
                                            <button disabled className='bg-slate-500 cursor-default' >
                                                Paid
                                            </button>}

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>

            {isModalOpen && (
                <div className="repayment-modal" data-aos="zoom-in" data-dos-delay='5'>
                    <div className="overlay"></div>
                    <div className="modal-container">
                        <h2>Make Payment of Rs.{amount}</h2>
                        <label>
                            Payment Amount
                        </label>
                        <input
                            type="number"
                            value={paymentAmount}
                            placeholder='Enter Amount'
                            onChange={(e) => setPaymentAmount(e.target.value)}
                        />
                        <button
                            className="repay-button"
                            onClick={() => handleStatusChange(loanId, amount)}
                        >
                            Do Repay
                        </button>
                        <span className="cancel" onClick={closeModal}>
                            Cancel
                        </span>
                    </div>
                </div>
            )}
        </>
    );
}
