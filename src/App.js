import { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import Loading from './loadingItem/Loading';

const GlobalStyles = createGlobalStyle`
  ${reset}
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      <GlobalStyles />
      <div className="App">
        {isLoading ? <Loading /> : <h1>메인페이지</h1>}
      </div>
    </>
  );
}

export default App;
