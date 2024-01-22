// Navbar.js
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
// import logo from '../path/to/your/logo.png'; // replace with the actual path to your logo
import './navbar.scss';

const Navbar = ({ isLoggedIn, setIsLoggedIn,setUserType }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogin = (userType) => {
        // You can perform any additional logic here before navigating to the login page
        setUserType(userType);
    };

    return (
        <nav>
            <div className="nav">
                <div className="logo">
                    {/* <img src={logo} alt="Logo" /> */}
                    Logo
                </div>
                <div className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
                <div className={`links-and-buttons ${menuOpen ? 'open' : ''}`}>
                    <div>
                        <ul>
                            <li>
                                <NavLink to='/' exact onClick={() => setMenuOpen(false)}>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to='/about' onClick={() => setMenuOpen(false)}>About</NavLink>
                            </li>
                            <li>
                                <NavLink to='/contact' onClick={() => setMenuOpen(false)}>Contact</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="auth-section">
                        {!isLoggedIn &&
                            <>
                                {!isLoggedIn &&
                                    <>
                                        <Link to='/login' onClick={() => { handleLogin('customer'); setMenuOpen(false); }}>
                                            <button>Customer</button>
                                        </Link>
                                        <Link to='/login' onClick={() => { handleLogin('admin'); setMenuOpen(false); }}>
                                            <button>Admin</button>
                                        </Link>
                                    </>
                                }
                            </>
                        }
                        {isLoggedIn &&
                            <>
                                <Link to='/' onClick={() => {
                                    setIsLoggedIn(false);
                                    toast.success('Logged Out');
                                    setMenuOpen(false);
                                }}>
                                    <button>Logout</button>
                                </Link>
                                <Link to='/dashboard' onClick={() => setMenuOpen(false)}>
                                    <button>DashBoard</button>
                                </Link>
                            </>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
