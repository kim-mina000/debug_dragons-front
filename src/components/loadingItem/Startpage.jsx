import React from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../image/메인로고.png';
import backgroundimg from '../../image/backgrond_img.jpg';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'MaplestoryOTFBold';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/MaplestoryOTFBold.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'MaplestoryOTFBold', sans-serif;
  }
`;

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${backgroundimg});
  background-size: cover;
  background-position: center;
  opacity: 0;
  animation: ${fadeIn} 3s ease-in-out forwards;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: rgba(243, 253, 255, 0.466);
  position: relative;
`;

const Logo = styled.img`
  width: 50%;
  height: auto;
  margin-bottom: 20px;
  animation: ${fadeIn} 2s ease-in-out 3s forwards;
  opacity: 0;

  @media (max-width: 768px) {
    width: 80%; /* 모바일 화면에서 로고 크기 조정 */
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column; /* 버튼 세로 정렬 */
  width: 100%;
  max-width: 600px; /* 최대 너비 설정 */
  margin-top: 20px;
  align-items: center; /* 가운데 정렬 */

  @media (max-width: 768px) {
    padding: 0 20px; /* 좁은 화면에서 좀 더 가까운 여백 */
  }
`;

const Button = styled.button`
  width: 100%; /* 버튼 너비 100% */
  height: 90px;
  background-color: transparent; /* 배경 없앰 */
  border: none;
  font-size: 24px; /* 텍스트 크기 줄임 */
  font-family: 'MaplestoryOTFBold';
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 10px; /* 버튼 간격 설정 */
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(165, 222, 240, 0.5); /* hover 시 배경색 변경 */
  }

  @media (max-width: 768px) {
    height: 70px;
    font-size: 18px; /* 모바일 화면에서 더 작은 텍스트 크기 */
  }
`;

const StyledLink = styled(Link)`
  width: 100%; /* 링크 너비 100% */
  display: flex;
  align-items: center;
  height: 90px;
  background-color: transparent; /* 배경 없앰 */
  border: none;
  font-size: 24px; /* 텍스트 크기 줄임 */
  font-family: 'MaplestoryOTFBold';
  cursor: pointer;
  text-decoration: none;
  color: black;
  transition: background-color 0.3s;
  margin-bottom: 10px; /* 링크 간격 설정 */
  justify-content: center;

  &:hover {
    background-color: rgba(165, 222, 240, 0.5); /* hover 시 배경색 변경 */
    border-radius: 5px;
  }

  @media (max-width: 768px) {
    height: 70px;
    font-size: 18px; /* 모바일 화면에서 더 작은 텍스트 크기 */
  }
`;

function Startpage() {
  const navigate = useNavigate();
  return (
    <>
      <GlobalStyle />
      <Background />
      <Container>
        <Logo src={logo} alt="메인 로고" />
        <ButtonContainer className="start_btn">
          <StyledLink to="/login" className="load-login">로그인하기</StyledLink>
          <Button type="button" className="load-around" onClick={() => { navigate('/main') }}>둘러보기</Button>
        </ButtonContainer>
      </Container>
    </>
  );
}

export default Startpage;
