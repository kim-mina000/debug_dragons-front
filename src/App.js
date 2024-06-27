import { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import Startpage from './loadingItem/Startpage';
import Loading from './loadingItem/Loading';
const GlobalStyles = createGlobalStyle`
  ${reset}
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);  
  }, []);

  return (
    <>
      <GlobalStyles />
      <div className="App">
        {isLoading ? <Loading/> : <Startpage/> }  
      </div>
    </>
  );
}

export default App;
