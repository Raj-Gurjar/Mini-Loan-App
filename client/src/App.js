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




function App() {




    return (

        <div className="App">
           
            <Navbar />

            <Routes>


                <Route index element={<Home />} />

                <Route path='/about' element={<About />} />

                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />

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
