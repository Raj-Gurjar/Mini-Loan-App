import React from 'react';
import { Link,Outlet } from 'react-router-dom';
import './customer.scss';


const CustHome = () => {
  return (
    <div className="customer-dashboard">

      <h2 className="dashboard-heading" data-aos="zoom-in" data-dos-delay='0'>
        Customer Dashboard</h2>

      <div className="cust-btn-cntnr" data-aos="fade-right" data-dos-delay='10'>

        <Link to="/cust/reqloan">
          <button className="dashboard-button">Apply for New Loan</button>
        </Link>

        <Link to="/cust/viewloan">
          <button className="dashboard-button">View All Loans</button>
        </Link>
      </div>

      <div className="terms-and-conditions">
        <h3 className="terms-heading" data-aos="fade-left" data-dos-delay='10'>Terms and Conditions</h3>
        <p className="terms-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod metus a libero
          venenatis ultricies. Phasellus ut nulla vitae turpis ultrices accumsan.
        </p>
      </div>
   
    </div>
  );
};

export default CustHome;
