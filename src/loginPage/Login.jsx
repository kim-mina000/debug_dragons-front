import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Title = styled.h1`
  font-size: 80px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 700px;
  height: 70px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 30px;

  &::placeholder {
    font-size: 30px;
  }

`;

const Button = styled.button`
  width: 720px;
  height: 70px;
  padding: 10px;
  margin: 10px 0;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 25px;
  cursor: pointer;
  &:hover {
    background-color: #555;
  }
`;

const Links = styled.div`
  margin-top: 20px;
  a {
    font-size: 25px;
    color: #555;
    margin: 0 10px;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 50%;
  position: absolute;
  bottom: 20px;
  background-color: #f0f0f0;
  padding: 10px 0; 
  border-top: 1px solid #ccc;
`;

const Icon = styled.div`
  width: 70px;
  height: 70px;
  font-size: 30px;
  background-color: #eee;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (id && password) {
      console.log('로그인 성공');
    } else {
      console.log('아이디와 비밀번호를 입력하세요');
    }
  };

  return (
    <Container>
      <Title>아띠버스</Title>
      <Input
        type="text"
        placeholder="아이디를 입력해주세요."
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <Input
        type="password"
        placeholder="비밀번호를 입력해주세요."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin}>로그인 하기</Button>
      <Links>
        <a href="#">아이디 찾기</a> | <a href="#">비밀번호 찾기</a> | <a href="#">회원가입하기</a>
      </Links>
      <IconContainer>
        <Icon>🏠</Icon>
        <Icon>🔍</Icon>
        <Icon>📁</Icon>
        <Icon>📞</Icon>
        <Icon>👤</Icon>
      </IconContainer>
    </Container>
  );
};

export default Login;
