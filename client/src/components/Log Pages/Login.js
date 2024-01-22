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
  });

  async function loginHandler() {
    try {
      // Make a POST request to your backend login endpoint
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userType,
        }),
      });
      console.log(response);
      

      if (response.ok) {
        // If login is successful, set the user as logged in
        setIsLoggedIn(true);
        toast.success('Logged In 😊');
        navigate('/dashboard');
      } else {
        // If login fails, handle the error
        const errorMessage = await response.text();
        toast.error(`Login failed`);

      }
    } catch (error) {
      console.error('Error during login:', error);
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
        <h4>Login as {userType}</h4>

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={changeHandler}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={changeHandler}
        />

        <button onClick={loginHandler}>Log in</button>

        <h4>Not Registered Yet?</h4>

        <Link to="/signup">
          <button>SignUp</button>
        </Link>
      </div>
    </div>
  );
}
