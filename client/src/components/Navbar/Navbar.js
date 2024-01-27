
import React, { useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import './navbar.scss';
import GlobalContext from '../../Context/GlobalContext';


const Navbar = () => {


    const {isLoggedIn, setIsLoggedIn,userType,setUserType} = useContext(GlobalContext);
    // const setIsLoggedIn = useContext(GlobalContext);


    // const userType = useContext(GlobalContext);
    // const setUserType = useContext(GlobalContext);

   console.log('log nav',isLoggedIn);
   
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav>
            <div className="nav" data-aos="zoom-in-down" data-dos-delay='20'>
                <Link to='/'>
                    <div className="logo">
                        Mini-Loans
                    </div>
                </Link>
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

                        </ul>
                    </div>
                    <div className="auth-section">

                        {!(isLoggedIn) &&
                            <>
                                <Link to='/login' onClick={() => { setUserType(false); setMenuOpen(false); }}>
                                    <button>Customer Login</button>
                                </Link>
                                <Link to='/login' onClick={() => { setUserType(true); setMenuOpen(false); }}>
                                    <button>Admin Login</button>
                                </Link>
                            </>
                        }

                        {(isLoggedIn) &&
                            <>
                                <Link to='/' onClick={() => {

                                    localStorage.removeItem("token");
                                    localStorage.removeItem("user");

                                    setIsLoggedIn(false);

                                    toast.success('Logged Out 👋');
                                    setMenuOpen(false);
                                }}>
                                    <button>Logout</button>
                                </Link>
                                <Link to={userType ? 'admin/dashboard' : 'cust/dashboard'} onClick={() => setMenuOpen(false)}>
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
