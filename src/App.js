import { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import Loading from './components/loadingItem/Loading';
import Login from './components/loginPage/Login';
import Startpage from './components/loadingItem/Startpage';
import Header from './components/menuBar/Header';

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
    <>
      <GlobalStyles />
      <div className="App">
        {isLoading ? <Loading/> : <Startpage/> }  
        <Header userName={userName} onLogout={handleLogout} />
      </div>
    </>
  );
}

export default App;
