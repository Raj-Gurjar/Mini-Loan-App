import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import GlobalContextProvider from './Context/GlobalContextProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(


  <BrowserRouter>
    <GlobalContextProvider>
      <App />
      <Toaster />
    </GlobalContextProvider >
  </BrowserRouter >



);

