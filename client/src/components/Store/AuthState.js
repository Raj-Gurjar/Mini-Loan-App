
import { useState } from "react";
import GlobalContext from "./Context";

const AuthState = ({ children }) => {
  const [user, setUser] = useState(null);

  const url = "http://localhost:4000/api";

  const apiRequest = async (endpoint, method, data) => {
    const token = getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const requestOptions = {
      method,
      headers,
    };

    if (data && (method === "POST" || method === "PUT")) {
      requestOptions.headers["Content-Type"] = "application/json";
      requestOptions.body = JSON.stringify(data);
    }

    const response = await fetch(`${url}/${endpoint}`, requestOptions);

    const result = await response.json();

    return result;
  };

  const storeUser = (userData) =>
    localStorage.setItem("user", JSON.stringify(userData));

  const storeToken = (token) => localStorage.setItem("token", token);

  const getToken = () => localStorage.getItem("token");

  const signUpAdmin = async (data) => apiRequest("user/signup", "POST", data);

  const signInAdmin = async (data) => {
    const result = await apiRequest("user/signin", "POST", data);
    setUser(result.user);
    storeToken(result.token);
    storeAdmin(result.user);
    return result;
  };

  const logOutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
  };

  const signUpUser = async (data) => apiRequest("user/signup", "POST", data);

  const signInUser = async (data) => {
    const result = await apiRequest("user/signin", "POST", data);
    setUser(result.user);
    storeToken(result.token);
    storeUser(result.user);
    return result;
  };

  const storeAdmin = (userData) =>
    localStorage.setItem("admin", JSON.stringify(userData));

  const createLoan = async (data) =>
    apiRequest("loan/createLoan", "POST", data);

  const updateLoanState = async (data) =>
    apiRequest("loan/update", "PUT", data);

  const doPayment = async (data) => apiRequest("loan/doPayment", "POST", data);

  const getAllLoans = async () => {
    const result = await apiRequest("loan/allLoans", "get", null);
    return result.loans;
  };

  const getLoansById = async (userId) => {
    const result = await apiRequest(`loan/loans/${userId}`, "get", null);
    return result.loans;
  };

  const getPaymentsById = async (loanId) => {
    const result = await apiRequest(`loan/payments/${loanId}`, "get", null);
    return result.payments;
  };

  return (
    <GlobalContext.Provider
      value={{
        user,
        signUpAdmin,
        signInAdmin,
        logOutUser,
        signUpUser,
        signInUser,
        createLoan,
        getAllLoans,
        updateLoanState,
        getLoansById,
        getPaymentsById,
        doPayment,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default AuthState;
