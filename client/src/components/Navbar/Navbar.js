// Navbar.js
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
// import logo from '../path/to/your/logo.png'; // replace with the actual path to your logo
import './navbar.scss';

const Navbar = ({ isLoggedIn, setIsLoggedIn,setUserType,userType }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
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
                                <NavLink to='/' onClick={() => setMenuOpen(false)}>Home</NavLink>
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
                                        <Link to='/login' onClick={() => { setUserType(false); setMenuOpen(false); }}>
                                            <button>Customer Login</button>
                                        </Link>
                                        <Link to='/login' onClick={() => { setUserType(true); setMenuOpen(false); }}>
                                            <button>Admin Login</button>
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
                                <Link to={userType ?'admin/dashboard' : 'cust/dashboard'} onClick={() => setMenuOpen(false)}>
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
