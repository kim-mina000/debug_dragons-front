import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Message = styled.p`
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
`;

const GoBackButton = styled.button`
  cursor: pointer;
  background-color: #333;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  outline: none;
  transition: background 0.3s, color 0.3s;

  &:hover {
    background-color: #555;
  }
`;

const CustomerService = () => {
  const navigate = useNavigate();

  const goBackToMyPage = () => {
    console.log('뒤로가기: 마이페이지로 돌아갑니다.');
    navigate('/mypage'); // '/mypage' 경로로 이동
  };

  return (
    <CenteredContainer>
      <Message>아직 고객센터가 될 만한 인기는 아니에요 😥😥😥</Message>
      <GoBackButton onClick={goBackToMyPage}>마이페이지로 돌아가기</GoBackButton>
    </CenteredContainer>
  );
};

export default CustomerService;
