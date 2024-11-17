import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './app/store';
import axios from 'axios';
import {handleAxiosRequest, handleAxiosReponseError} from './axiosConfig';

// Set backend url
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
// Set default request timeout
axios.defaults.timeout = 30000; // ms
// Inject id_token for authorization
axios.interceptors.request.use(
    handleAxiosRequest,
    error => Promise.reject(error)
);
// Refresh token if id token is expired
axios.interceptors.response.use(
    res => res,
    handleAxiosReponseError
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
