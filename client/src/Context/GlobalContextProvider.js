import React from 'react'
import { useState, useEffect } from 'react';
import GlobalContext from './GlobalContext';
import AOS from 'aos';
import 'aos/dist/aos.css';


const GlobalContextProvider = ({ children }) => {

    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    }, []);


    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState(false);

    const PORT = 4000
    const PORT_add = `http://localhost:${PORT}/api`

    const logInApi = `${PORT_add}/user/signin`
    const signUpApi = `${PORT_add}/user/signup`

    const allLoansApi = `${PORT_add}/loan/allLoans`
    const updateLoansApi = `${PORT_add}/loan/update`

    const createLoanApi = `${PORT_add}/loan/createLoan`
    const viewPaymentApi = `${PORT_add}/loan/payments/`
    const payLoanApi = `${PORT_add}/loan/doPayment`
    const viewLoanApi = `${PORT_add}/loan/loans/`



    return (
        <GlobalContext.Provider value={{
            isLoggedIn, setIsLoggedIn,
            userType, setUserType,
            logInApi, signUpApi,

            allLoansApi, updateLoansApi,
            createLoanApi,viewLoanApi,viewPaymentApi,payLoanApi,

        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContextProvider;