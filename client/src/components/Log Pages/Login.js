
import React, { useState, useContext } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import './log.scss';

import Loader from '../Loader/Loader';
import GlobalContext from '../../Context/GlobalContext';


export default function Login() {


  const {setIsLoggedIn,userType,logInApi} = useContext(GlobalContext);
  
  console.log("log",setIsLoggedIn)
  console.log("log",userType);
  
  
  // const {userType} = useContext(GlobalContext);
  // const setUserType = useContext(GlobalContext);

  

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    isAdmin: userType,
  });

  const [isLoading, setIsLoading] = useState(false);


  async function loginHandler() {
    try {
      setIsLoading(true);

      const response = await fetch(`${logInApi}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const res_data = await response.json();

        localStorage.setItem("token", res_data.token);
        localStorage.setItem("user", JSON.stringify(res_data.user));

        setIsLoggedIn(true);

        toast.success('Logged In Successfully 😊');

        navigate(userType ? '/admin/dashboard' : '/cust/dashboard');

      } else {
        const errorMessage = await response.json();
        toast.error(`Login failed: ${errorMessage.message}`);
      }
    } catch (error) {
      console.error('Error during Login:', error);
    } finally {
      setIsLoading(false);
    }
  }

  function changeHandler(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  return (
    <div className="log-container" data-aos="fade-right" data-dos-delay='10'>
      <h2 className='log-heading'>Login</h2>

      <div className="log-form">
        <h4 className='log-type'>Login as {userType === true ? 'Admin' : 'Customer'}</h4>

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={changeHandler} required />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={changeHandler}
          required
        />

        <button onClick={loginHandler}>Log in</button>

        {isLoading && (
          <div className="loader-container">
            <Loader />
          </div>
        )}

        <h5>Not Registered Yet?</h5>
        <Link to="/signup">
          <btn className='btn'>SignUp As {userType === true ? 'Admin' : 'Customer'}</btn>
        </Link>
      </div>
    </div>
  );
}
