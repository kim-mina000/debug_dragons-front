import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
<<<<<<< HEAD
import SignUpComplete from './components/loginPage/SignUpComplete';
=======
import { Provider } from 'react-redux';
import { store } from './store/store';
>>>>>>> 60e02946965a5ad2d3c7e3ee7951a1653fe9b217


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<<<<<<< HEAD
    <App />
=======
    <Provider store={store}>
        <App />  
    </Provider>
>>>>>>> 60e02946965a5ad2d3c7e3ee7951a1653fe9b217
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
