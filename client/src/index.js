import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
// import AuthState, { AuthProvider } from './components/GlobalContext/AuthState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  // <AuthState>
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  // </AuthState>
);

