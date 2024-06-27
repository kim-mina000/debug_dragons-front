import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import logo from '../image/메인로고.png';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'MaplestoryOTFBold';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/MaplestoryOTFBold.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #dcdcff;
`;

const Logo = styled.img`
  width: 50%; 
  height: auto;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
`;

const Button = styled.button`
  flex: 1; 
  height: 90px;
  background-color: white;
  border: none;
  font-size: 30px;
  font-family: 'MaplestoryOTFBold';
  cursor: pointer;
  transition: background-color 0.3s;
  padding: 0 100px; 

  &:hover {
    background-color: lightgray;
  }
  
  &.load-login {
    text-align: right; 
    direction: rtl; 
  }

  &.load-around {
    text-align: left;
    direction: ltr; 
  }
`;

function Startpage() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Logo src={logo} alt="메인 로고" />
        <ButtonContainer className="start_btn">
          <Button type="button" className="load-login">로그인하기</Button>
          <Button type="button" className="load-around">둘러보기</Button>
        </ButtonContainer>
      </Container>
    </>
  );
}

export default Startpage;