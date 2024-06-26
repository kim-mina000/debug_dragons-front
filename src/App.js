import { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import Loading from './components/loadingItem/Loading';
import Login from './components/loginPage/Login';
import SearchMain from './components/1.searchPage/SearchMain';
import { Route, Routes } from 'react-router-dom';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'MaplestoryOTFBold';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/MaplestoryOTFBold.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

  ${reset}

  body {

    // 백그라운드컬러 후보1
    /* background-color: #FFFFD2; */

    // 백그라운드컬러 후보2
    background-color: #DCEEF2; 
  }
`;

function App() {
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 3000);
  // }, []);

  return (
    <>
      <GlobalStyles />  
      <Routes>
        <Route path='/*' element={<Login />} />
        <Route path='/search-main' element={<SearchMain />} />
      </Routes>
      {/* <SearchMain /> */}


      {/* <div className="App">
        {isLoading ? <Loading /> : <h1>메인페이지</h1>}
      </div> */}
    </>
  );
}

export default App;
