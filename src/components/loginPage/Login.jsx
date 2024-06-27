import React, { useState } from 'react';
import styled from 'styled-components';


// 컨테이너 틀
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

// "아띠버스" 제목
const Title = styled.h1`
  font-size: 80px;
  margin-bottom: 20px;
`;

// 아이디 비밀번호 input
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

// "로그인하기" 버튼
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

// 간편 로그인하기
const LineContainer = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 15px;
  padding: 25px 0;
  width: 720px;

  &::before {
    content: '';
    flex: 1;
    border-bottom: 1px solid #000;
    margin-right: 10px;
  }
  
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #000;
    margin-left: 10px;
  }  
`;

// 아이디, 비밀번호 찾기 + 회원가입하기
const Links = styled.div`
  margin-top: 20px;
  padding-left: 25px;
  a {
    font-size: 20px;
    font-family: 'NEXON Lv1 Gothic OTF', sans-serif;
    color: #555;
    margin: 0 10px;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

// 하단 메뉴탭 컨테이너
const IconContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 50%;
  position: absolute;
  bottom: 20px;
  padding: 15px 0; 
  border-top: 1px solid #ccc; 
`;

// 하단 메뉴탭
const Icon = styled.div`
  width: 70px;
  height: 70px;
  font-size: 30px;
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
      <Button onClick={handleLogin}>시작하기</Button>
      <LineContainer>
        간편 로그인 하기
      </LineContainer>
      <div className='image'>
        <a href="#">
          <img src='/btnG_완성형.png' style={{width: '200px', height: '50px', marginRight: '50px'}} />
        </a>
        <a href="#">
          <img src="/kakao_login_medium_narrow.png" style={{width: '200px', height: '50px'}}/>
        </a> 
      </div>
      <Links>
        <a href="#">아이디 찾기</a> | <a href="#">비밀번호 찾기</a>
      </Links>
      <Links><a href="#">회원가입하기</a></Links>
      <IconContainer>
        <Icon><img src='/리스트.png'/></Icon>
        <Icon><img src='/둘러보기.png'/></Icon>
        <Icon><img src='/홈.png'/></Icon>
        <Icon><img src='/스크랩.png'/></Icon>
        <Icon><img src='/마이페이지.png'/></Icon>
      </IconContainer>
    </Container>
  );
};

export default Login;
