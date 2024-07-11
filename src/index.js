import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import SignUpComplete from './components/loginPage/SignUpComplete';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { getUserInfo, getUserToken } from './features/member/memberSlice';


const root = ReactDOM.createRoot(document.getElementById('root'));

(() => {
    // 로그인 정보를 로컬 스토리지에서 가져옴
    const user = JSON.parse(localStorage.getItem('userInfo', 'userToken'));
    if (!user) return; // 로그인 정보가 없다면 여기서 멈춤
    store.dispatch(getUserInfo(user));
    store.dispatch(getUserToken(user));
})();

root.render(
    <Provider store={store}>
        <App />  
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
