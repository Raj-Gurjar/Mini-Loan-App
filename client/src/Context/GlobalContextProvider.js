import React from "react";
import { useState, useEffect } from "react";
import GlobalContext from "./GlobalContext";
import AOS from "aos";
import "aos/dist/aos.css";

const GlobalContextProvider = ({ children }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(false);

  // const PORT = 4000
  const PORT_Url = `https://mini-loan-app-bkd.vercel.app/api`;
  // const PORT_Url = `http://localhost:${PORT}/api`

  const logInApi = `${PORT_Url}/user/signin`;
  const signUpApi = `${PORT_Url}/user/signup`;

  const allLoansApi = `${PORT_Url}/loan/allLoans`;
  const updateLoansApi = `${PORT_Url}/loan/update`;

  const createLoanApi = `${PORT_Url}/loan/createLoan`;
  const viewPaymentApi = `${PORT_Url}/loan/payments/`;
  const payLoanApi = `${PORT_Url}/loan/doPayment`;
  const viewLoanApi = `${PORT_Url}/loan/loans/`;

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userType,
        setUserType,
        logInApi,
        signUpApi,

        allLoansApi,
        updateLoansApi,
        createLoanApi,
        viewLoanApi,
        viewPaymentApi,
        payLoanApi,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
