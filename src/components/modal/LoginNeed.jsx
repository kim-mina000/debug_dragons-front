import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #bdbbbb69;
`;

const Modal = styled.div`
  background: white;
  border-radius: 10px;
  padding: 40px;
  width: 80%;
  height: 70%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;


const Message = styled.div`
  font-size: 50px;
  margin-bottom: 20px;
  text-align: center;
  line-height: 4rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const Button = styled.button`
  background: #ddd;
  border: none;
  border-radius: 5px;
  padding: 10px 0;
  font-size: 16px;
  cursor: pointer;
  width: 200px;
  &:hover {
    background: #ccc;
  }
`;

const LoginNeed = () => {
  return (
    <Background>
      <Modal>
        <Message>
          로그인이 필요한 메뉴입니다.<br />
          로그인 하시겠습니까?
        </Message>
        <ButtonContainer>
          <Button>회원가입 하러 가기 →</Button>
          <Button>로그인 하러 가기 →</Button>
        </ButtonContainer>
      </Modal>
    </Background>
  );
};

export default LoginNeed;
