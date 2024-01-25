import React from 'react'
import './pages.scss'

export default function About() {
   
    return (
        <div className='main-container'>
            <h2 className='text-3xl font-bold m-3'>About</h2>
            <div className="features" data-aos="fade-right" data-dos-delay='10'>
                <div className="feature">
                    <h2>Apply for a Loan</h2>
                    <p>Customers can submit a loan request with the desired amount and term.</p>
                </div>
                <div className="feature">
                    <h2>Admin Approval</h2>
                    <p>Admins can approve or reject pending loans to make them active.</p>
                </div>
                <div className="feature">
                    <h2>View Your Loans</h2>
                    <p>Customers can view their own loan details.</p>
                </div>
                <div className="feature">
                    <h2>Repayments</h2>
                    <p>Customers can pay the Installments and track your loan status.</p>
                </div>
            </div>
           
        </div>
    )
}
