import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import About from './components/About';
import Contact from './components/Contact';
import Navbar from './components/Navbar/Navbar';

import Login from './components/Log Pages/Login';
import SignUp from './components/Log Pages/SignUp';

import AdminHome from './components/DashBoard/Admin/Requests';
import CustHome from './components/DashBoard/Customer/CustHome';
// import CustHome from './components/DashBoard/Customer/CustHome';
import CustReq from './components/DashBoard/Customer/ReqLoan'
import CustView from './components/DashBoard/Customer/ViewLoan';
import PayLoan from './components/DashBoard/Customer/PayLoan';

import { useState } from 'react';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState(false);


    return (

        <div className="App">

            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserType={setUserType} userType={userType} />

            <Routes>


                <Route index element={<Home />} />

                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} userType={userType} />} />
                <Route path='/signup' element={<SignUp setIsLoggedIn={setIsLoggedIn} userType={userType}/>} />

                <Route path='/admin/dashboard' element={<AdminHome/>} />
                <Route path='/cust/dashboard' element={<CustHome/>} />
                <Route path='/cust/dashboard/reqloan' element={<CustReq/>} />
                <Route path='/cust/dashboard/viewloan' element={<CustView/>} />
                <Route path='/cust/dashboard/payloan' element={<PayLoan/>} />

                <Route path='*' element={<div>404 Site Not found</div>} />
                {/* //! This is the wildcard route that matches any path that hasn't been matched by the previous routes. */}


            </Routes>


        </div>
    );
}

export default App;
