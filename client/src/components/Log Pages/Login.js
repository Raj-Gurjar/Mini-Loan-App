// Login.js
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import './login.scss';

export default function Login({ setIsLoggedIn, userType }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    isAdmin: userType
  });
  console.log(formData);
  async function loginHandler() {
    try {
      // Make a POST request to your backend signup endpoint
      const response = await fetch('http://localhost:4000/api/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // If signup is successful, set the user as logged in
        setIsLoggedIn(true);
        toast.success('LoggedIn Successfully 😊');
        navigate(userType ? '/admin/dashboard':'/cust/dashboard');
      } else {
        // If signup fails, handle the error
        const errorMessage = await response.json();
        toast.error(`Login failed: ${errorMessage.message}`);
      }
    } catch (error) {
      console.error('Error during Login:', error);
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
    <div className="login-container">
      <h2>Login</h2>

      <div className="login-form">
        <h4>Login as {(userType === true) ? 'Admin' : 'Customer'}</h4>

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={changeHandler}
          required
        />

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

        <h4>Not Registered Yet?</h4>

        <Link to="/signup">
          <button>SignUp as {(userType === true) ? 'Admin' : 'Customer'}</button>
        </Link>
      </div>
    </div>
  );
}
