// Login.js
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import './log.scss';
// import { useAuth } from '../Store/Auth';
import Loader from '../Loader/Loader';

export default function Login({ setIsLoggedIn, userType }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    isAdmin: userType,
  });
  const [isLoading, setIsLoading] = useState(false);

  // const { storeTokenInLS } = useAuth();

  async function loginHandler() {
    try {
      setIsLoading(true);

      const response = await fetch('http://localhost:4000/api/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const res_data = await response.json();
        console.log("data",res_data.user);

        
        localStorage.setItem("token", res_data.token);
        localStorage.setItem("user",  JSON.stringify(res_data.user));
       
        // localStorage.setItem("token", res_data.token);

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
    <div className="log-container">
      <h2>Login</h2>

      <div className="log-form">
        <h4>Login as {userType === true ? 'Admin' : 'Customer'}</h4>

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

        {/* Show the loader if isLoading is true */}
        {isLoading && (
          <div className="loader-container">
            <Loader />
          </div>
        )}

        <h4>Not Registered Yet?</h4>

        <Link to="/signup">
          <button>SignUp as {userType === true ? 'Admin' : 'Customer'}</button>
        </Link>
      </div>
    </div>
  );
}
