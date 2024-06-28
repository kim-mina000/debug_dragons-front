import React, { useState } from 'react';
import styled from 'styled-components';
import MenuBar from '../0.menuBar/MenuBar';
import TitleLogo from './TitleLogo';
import { Link } from 'react-router-dom';
import { REDIRECT_URI } from './login_kakao';


// 컨테이너 틀
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
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

const Image = styled.div`
  img {
    width: 200px;
    height: 50px;
    cursor: pointer;
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

  const {Kakao} = window;
  const kakaoLoginHandler = ()=>{
    Kakao.Auth.authorize({
      redirectUri: `${REDIRECT_URI}`,
    })
  }

  return (
    <Container>
      <TitleLogo/>

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

      <LineContainer>간편 로그인 하기</LineContainer>

        <Image>
          <img src='/btnG_완성형.png' style={{ marginRight: '50px'}} />
          <img src="/kakao_login_medium_narrow.png" onClick={kakaoLoginHandler}/>
        </Image>


        <Links>
          <Link to="/find">아이디 찾기 / 비밀번호 찾기</Link>
        </Links>



      <Links>
        <Link to={"/signup"}>회원가입</Link>
      </Links>

      <MenuBar/>
    </Container>
  );
};

export default Login;
