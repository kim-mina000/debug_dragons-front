import { useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import Loading from './components/loadingItem/Loading';
import Login from './components/loginPage/Login';

import SignUp from './components/loginPage/SignUp';
import { BrowserRouter, Route, Routes, Navigate  } from 'react-router-dom';
import Startpage from './components/loadingItem/Startpage';
import Header from './components/menuBar/Header';
import MainContainer from './components/MainContainer';


const GlobalStyles = createGlobalStyle`
${reset}

  @font-face {
    font-family: 'MaplestoryOTFBold';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/MaplestoryOTFBold.woff') format('woff');
    font-weight: normal;
    font-style: normal;

    @font-face {
    font-family: 'NEXON Lv1 Gothic OTF';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON Lv1 Gothic OTF.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

}

  body {

    // 백그라운드컬러 후보1
    // 수정중입니다.
    /* background-color: #FFFFD2; */

    // 백그라운드컬러 후보2
    background-color: #DCEEF2; 

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
    <BrowserRouter>
      <GlobalStyles />  
        <Routes>

<<<<<<< HEAD
          <Route path='/startpage' element={
            <>
              <Header userName={userName} onLogout={handleLogout} />
                {isLoading ? <Loading /> : <Startpage />}
              </>
          } />
            
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/main' element={<MainContainer />} />
          
        </Routes>
=======
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
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />

      </Routes>
>>>>>>> 39795dfc33c3c950e2ea0e90e4bdfbe8394ac341
    </BrowserRouter>

  );
}

export default App;
