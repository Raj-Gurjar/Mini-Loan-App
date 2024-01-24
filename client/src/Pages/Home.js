// HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './pages.scss'

const HomePage = ({ user }) => {
  console.log("home", user);

  return (
    <div className="main-container">
      <div className="header">
        <h3 className='text-xl m-3' data-aos="fade-right" data-aos-delay="0">Welcome to the</h3>
        <h1 className='text-6xl m-6 font-bold tracking-wider' data-aos="zoom-in">Mini-Loan<span className='text-[30px]' data-aos="fade-up"
          data-aos-duration="1500">s</span></h1>

        <p className='text-[#36B3EB] text-xl m-4' data-aos="fade-left" data-aos-delay="0">"Your Financial Bridge to Instant Solutions!"</p>
        <p >Apply Easy loans and manage your Installments.</p>
      </div>

      <div className="btn-cntnr" data-aos="zoom-in" data-dos-delay='10'>

        <Link to='/about'>
          <button class="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-[#36B3EB] transition duration-300 ease-out border-2 border-[#36B3EB] rounded-full shadow-md group">
            <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#36B3EB] group-hover:translate-x-0 ease">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
            <span class="absolute flex items-center justify-center w-full h-full text-[#36B3EB] transition-all duration-300 transform group-hover:translate-x-full ease">Know More</span>
            <span class="relative invisible">Button Text</span>
          </button>
          {/* Know More</button> */}
        </Link>
      </div >
    </div>

  );
};

export default HomePage;
