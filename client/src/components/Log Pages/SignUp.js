// SignUp.js
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './signup.scss';

export default function SignUp({ setIsLoggedIn, userType }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    isAdmin: false,
  });

  async function signUpHandler() {
    try {
      // Make a POST request to your backend signup endpoint
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // If signup is successful, set the user as logged in
        setIsLoggedIn(true);
        toast.success('Account Created Successfully 😊');
        navigate('/dashboard');
      } 
      else {
        // If signup fails, handle the error
        const errorMessage = await response.json();
        toast.error(`Signup failed: ${errorMessage.message}`);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  }

  function changeHandler(event) {
    const { name, value, checked, type } = event.target;

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  }

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>

      <form className="signup-form" onSubmit={signUpHandler}>
        <h4>Sign Up as {userType}</h4>

        <label>
          <input
            type="radio"
            value="customer"
            name="userType"
            checked={!formData.isAdmin}
            onChange={() => setFormData((prev) => ({ ...prev, isAdmin: false }))}
          />
          Customer
        </label>
        <label>
          <input
            type="radio"
            value="admin"
            name="userType"
            checked={formData.isAdmin}
            onChange={() => setFormData((prev) => ({ ...prev, isAdmin: true }))}
          />
          Admin
        </label>

        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={changeHandler}
        />

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

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
