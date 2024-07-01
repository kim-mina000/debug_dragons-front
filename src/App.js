import React, { useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import Loading from './components/loadingItem/Loading';
import Login from './components/loginPage/Login';

import SignUp from './components/loginPage/SignUp';
import Startpage from './components/loadingItem/Startpage';
import Header from './components/0.menuBar/Header';

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Find from './components/loginPage/Find';
import FindEnd from './components/loginPage/FindEnd';


import MainContainer from './components/MainContainer';
import SignUpComplete from './components/loginPage/SignUpComplete';


const GlobalStyles = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: 'MaplestoryOTFBold';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/MaplestoryOTFBold.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'NEXON Lv1 Gothic OTF';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON Lv1 Gothic OTF.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  body {
    background-color: #F4F9F9;
    /* background-color: #DCEEF2; */
    font-family: 'MaplestoryOTFBold', sans-serif;
  }
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState('사용자');

  const handleLogout = () => {
    setUserName(null);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <>
    <BrowserRouter>
      <GlobalStyles />  
        <Routes>
        <Route path="/" element={<Navigate to="/startpage" replace />} />
        <Route path="/startpage" element={
          isLoading ? (
            <Loading />
          ) : (
            <>
              <Header userName={userName} onLogout={handleLogout} />
              <Startpage />
            </>
          )
        } />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/thanks-for-signup' element={<SignUpComplete />} />
        <Route path="/find" element={<Find />} />
        <Route path="/FindEnd" element={<FindEnd />} />
        <Route path='/main' element={<MainContainer />} />
      </Routes>

    {/* <GlobalStyles />   */}
    {/* <SignUpComplete /> */}
    </BrowserRouter>
  </>
  );
}

export default App;
