import React from 'react';
import { Link } from 'react-router-dom';
import './dashboard.scss';

const CustHome = () => {
  return (
    <div className="customer-dashboard">
      <h2 className="dashboard-heading">Customer Dashboard</h2>

      <Link to="/cust/dashboard/reqloan">
        <button className="dashboard-button">Apply for New Loan</button>
      </Link>

      <Link to="/cust/dashboard/viewloan">
        <button className="dashboard-button">View All Loans</button>
      </Link>

      <div className="terms-and-conditions">
        <h3 className="terms-heading">Terms and Conditions</h3>
        <p className="terms-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod metus a libero
          venenatis ultricies. Phasellus ut nulla vitae turpis ultrices accumsan.
        </p>
        {/* Add more terms and conditions as needed */}
      </div>
    </div>
  );
};

export default CustHome;
