import React, { useState ,useContext} from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './log.scss';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import GlobalContext from '../../Context/GlobalContext';

export default function SignUp() {

  const { setIsLoggedIn, userType,signUpApi } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isAdmin: userType,
  });
  const [isLoading, setIsLoading] = useState(false);

  async function signUpHandler(event) {
    event.preventDefault();

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters long.');
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch( `${signUpApi}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const res_data = await response.json();
        console.log("res from server", res_data);


        toast.success('Account Created Successfully 😊');
        setIsLoggedIn(true);
        localStorage.setItem("token", res_data.token);
        localStorage.setItem("user", JSON.stringify(res_data.user));

        navigate('/login');
      } else {
        const errorMessage = await response.json();
        toast.error(`Signup failed: ${errorMessage.message}`);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    } finally {
      setIsLoading(false);
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
    <div className="log-container" data-aos="fade-right" data-dos-delay='10'>
      <h2 className='log-heading'>Sign Up</h2>

      <form className="log-form" onSubmit={signUpHandler}>
        <h4>Sign Up as {(userType === true) ? 'Admin' : 'Customer'}</h4>

        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="name"
          value={formData.name}
          onChange={changeHandler}
          required
        />

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

        <button type="submit">Sign Up</button>


        {isLoading && (
          <div className="loader-container">
            <Loader />
          </div>
        )}

        <div>
          <h5>Already Signed Up?</h5>
          <Link to='/login'><btn className='btn'>Login as {userType ? 'Admin' : 'Customer'}</btn></Link>
        </div>
      </form>
    </div>
  );
}
