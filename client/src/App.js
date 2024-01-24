import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from './Pages/Home';
import About from './Pages/About';
import Navbar from './components/Navbar/Navbar';

import Login from './components/Log Pages/Login';
import SignUp from './components/Log Pages/SignUp';

import AdminHome from './components/DashBoard/Admin/Requests';
import CustHome from './components/DashBoard/Customer/CustHome';
// import CustHome from './components/DashBoard/Customer/CustHome';
import CustReq from './components/DashBoard/Customer/ReqLoan'
import CustView from './components/DashBoard/Customer/ViewLoan';
import PayLoan from './components/DashBoard/Customer/PayLoan';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { useState,useEffect } from 'react';

function App() {



    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState(false);

    


    useEffect(() => {
        AOS.init({
            duration: 1000, 
            // easing: 'ease-in-sine',
        });
    }, []);


    return (

        <div className="App">

            <Navbar setUserType={setUserType} userType={userType} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

            <Routes>


                <Route index element={<Home/>} />

                <Route path='/about' element={<About />} />

                <Route path='/login' element={<Login userType={userType} setIsLoggedIn={setIsLoggedIn} />} />
                <Route path='/signup' element={<SignUp userType={userType} setIsLoggedIn={setIsLoggedIn}/>} />

                <Route path='/admin/dashboard' element={<AdminHome />} />
                <Route path='/cust/dashboard' element={<CustHome />} />
                <Route path='/cust/dashboard/reqloan' element={<CustReq />} />
                <Route path='/cust/dashboard/viewloan' element={<CustView />} />
                <Route path='/cust/dashboard/payloan/:id' element={<PayLoan />} />

                <Route path='*' element={<div className='text-2xl'>404 Site Not found</div>} />
               

            </Routes>


        </div>
    );
}

export default App;
