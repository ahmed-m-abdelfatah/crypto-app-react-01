import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import App from './App';

ReactDOM.render(
  <BrowserRouter basename='/crypto-app-react-01'>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
