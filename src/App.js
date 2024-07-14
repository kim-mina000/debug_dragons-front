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
import MenuBar from './components/0.menuBar/MenuBar';
import MyTravelList from './components/menuBar/MyTravelList'
import MyPage from './components/myPage/MyPage';
import Clipping from './components/menuBar/Clipping';
import MyTravelListDetail from './components/menuBar/MyTravelListDetail';
import Lookaround from './components/menuBar/Lookaround';

import Comments from './components/subpage/Comments';

import MainOrMylist from './components/modal/MainOrMylist';
import TermsPrivacy from './components/other/TermsPrivacy';
import CustomerService from './components/other/CustomerService';
import LikeTest from './api/lanmarkLike/LikeTest';




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
    background-color: #f3fdff;
    /* background-color: #DCEEF2; */
    font-family: 'MaplestoryOTFBold', sans-serif;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none

  }

    /* 스크롤바 css */
    ::-webkit-scrollbar {
    width: 8px;
    background-color: none;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(#d4f9ff00, #D4F9FF, #A5DEF0, #ffffff, #ffffff,#a5def000);
    border-radius: 20px;
  }

  /* ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(transparent, #010175, transparent);
  } */

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
                <Startpage />
              </>
            )
          } />

          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/thanks-for-signup' element={<SignUpComplete />} />
          <Route path='/find' element={<Find />} />
          <Route path='/FindEnd' element={<FindEnd />} />
          <Route path='/main' element={<MainContainer />} />

          <Route path="/menuBar/MyTravelList" element={<MyTravelList />} />
          <Route path="/detail" element={<MyTravelListDetail />} />
          <Route path="/menuBar" element={<MenuBar />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/scrap" element={<Clipping />} />
          <Route path="/around" element={<Lookaround />} />

          <Route path="/terms-privacy" element={<TermsPrivacy />} />
          <Route path="/customerservice" element={<CustomerService />} />


          {/* 임시라우터 */}
          <Route path="/landmarkcomment/:landmarkNo" element={<Comments />} />
          {/* 임시라우터2 */}
          <Route path='liketest' element={<LikeTest />} />

          <Route path='/whereIgo' element={<MainOrMylist />} />

        </Routes>

        {/* <GlobalStyles />  
    <MyPage /> */}
        {/* <SignUpComplete /> */}
        {/* <GlobalStyles />  
    <SignUpComplete /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
