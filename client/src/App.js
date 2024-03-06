import { Route, Routes } from 'react-router-dom';
import './App.scss';

import Home from './Pages/Home';
import About from './Pages/About';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Log Pages/Login';
import SignUp from './components/Log Pages/SignUp';
import AdminHome from './components/Users/Admin/Requests';
import CustHome from './components/Users/Customer/CustHome';
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

                <Route path='/cust/dashboard' element={<ProtectedRoute Component={CustHome} />} />
                <Route path='/cust/dashboard/reqloan' element={<ProtectedRoute Component={CustReq} />} />
                <Route path='/cust/dashboard/viewloan' element={<ProtectedRoute Component={CustView} />} />
                <Route path='/cust/dashboard/payloan/:id' element={<ProtectedRoute Component={PayLoan} />} />

                <Route path='*' element={<Error />} />


            </Routes>


        </div>
    );
}

export default App;
