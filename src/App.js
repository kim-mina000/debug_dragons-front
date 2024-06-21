import logo from './logo.svg';
import styled, {createGlobalStyle} from 'styled-components';
import reset from 'styled-reset';

  const GlobalStyles = createGlobalStyle`
  ${reset}
`;

function App() {
  return (
    <>
      <GlobalStyles />
    </>
  );
}

export default App;
