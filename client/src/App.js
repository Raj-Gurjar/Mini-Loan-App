import { Route, Routes, Outlet } from 'react-router-dom';
import './App.scss';

import Home from './Pages/Home';
import About from './Pages/About';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Log Pages/Login';
import SignUp from './components/Log Pages/SignUp';
import AdminHome from './components/Users/Admin/Requests';
import CustDashBoard from './components/Users/Customer/CustDashBoard';
import CustReq from './components/Users/Customer/ReqLoan'
import CustView from './components/Users/Customer/ViewLoan';
import PayLoan from './components/Users/Customer/PayLoan';
import Error from './components/Error';
import ProtectedRoute from './components/ProtectedRoute';
import GlobalContext from './Context/GlobalContext';
import { useContext } from 'react';

function App() {

    const { isLoggedIn, setIsLoggedIn, userType, setUserType } = useContext(GlobalContext);

    return (

        <div className="App">

            <Navbar />

            <Routes>

                <Route index element={<Home />} />

                <Route path='/about' element={<About />} />

                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />


                <Route path='/admin/dashboard' element={<ProtectedRoute Component={AdminHome} />} />

                <Route path='/cust' element={<ProtectedRoute Component={Outlet} />} >
                    <Route index path='dashboard' element={<CustDashBoard />} />
                    <Route path='reqloan' element={<CustReq />} />
                    <Route path='viewloan' element={<CustView />} />
                    <Route path='viewloan/payloan/:id' element={<PayLoan />} />
                </Route>

                <Route path='*' element={<Error />} />


            </Routes>


        </div>
    );
}

export default App;
