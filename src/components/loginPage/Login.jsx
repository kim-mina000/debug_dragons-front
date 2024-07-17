import React, { useState } from 'react';
import styled from 'styled-components';
import MenuBar from '../0.menuBar/MenuBar';
import TitleLogo from './TitleLogo';
import { Link, useNavigate } from 'react-router-dom';
import { REDIRECT_URI } from './login_kakao';
import { useDispatch } from 'react-redux';
import { getUserInfo, getUserToken } from '../../features/member/memberSlice';
import axios from 'axios';
import { BACK_URL } from '../../api/config';

// 컨테이너 틀
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f3fdff;
  padding: 20px;
`;

// 아이디 비밀번호 input
const Input = styled.input`
  width: 700px;
  height: 65px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 30px;

  &::placeholder {
    font-size: 25px;
  }

  &:focus {
    border-color: #007BFF;
    outline: none;
  }

  @media (max-width: 768px) {
    width: 80%;
    font-size: 24px;

    &::placeholder {
      font-size: 20px;
    }
  }

  @media (max-width: 480px) {
    width: 90%;
    height: 50px;
    font-size: 18px;

    &::placeholder {
      font-size: 16px;
    }
  }
`;

// "로그인하기" 버튼
const Button = styled.button`
  width: 720px;
  height: 70px;
  padding: 10px;
  margin: 10px 0;
  background-color: #D5ECFA;
  color: black;
  border: none;
  border-radius: 4px;
  font-size: 25px;
  cursor: pointer;

  &:hover {
    background-color: #c2d6e2;
  }

  @media (max-width: 768px) {
    width: 80%;
    font-size: 20px;
    height: 60px;
  }

  @media (max-width: 480px) {
    width: 90%;
    font-size: 16px;
    height: 50px;
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

  @media (max-width: 768px) {
    width: 80%;
    margin: 0; 
  }

  @media (max-width: 480px) {
    width: 90%;
  }
`;

const Image = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;

  img {
    width: 200px;
    height: 50px;
    cursor: pointer;
    margin-right: 20px;
  }

  @media (max-width: 768px) {
    flex-direction: column;

    img {
      width: 150px;
      height: 40px;
      margin-right: 0;
      margin-bottom: 10px;
    }
  }

  @media (max-width: 480px) {
    img {
      width: 120px;
      height: 30px;
    }
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

    @media (max-width: 768px) {
      font-size: 18px;
    }

    @media (max-width: 480px) {
      font-size: 16px;
    }
  }
`;

function Login() {
  const [loginForm, setLoginForm] = useState({
    id: '',
    password: ''
  });

  const handleChangeLoginForm = (e) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value
    });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.get(`${BACK_URL}/login?userId=${loginForm.id}&userPw=${loginForm.password}`);
      localStorage.setItem('userToken', response.data.token);
      localStorage.setItem('userInfo', JSON.stringify(response.data.user));
      dispatch(getUserToken(response.data.token));
      dispatch(getUserInfo(response.data.user));
      console.log(response.data.user);
      navigate('/main');
      return console.log("로그인성공");
    } catch (error) {
      console.error(error);
      return console.error("로그인실패");
    }
  };

  // Enter 키가 눌렸을 때 로그인 함수 호출
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const { Kakao } = window;
  const kakaoLoginHandler = () => {
    Kakao.Auth.authorize({
      redirectUri: `${REDIRECT_URI}`,
    })
  }

  return (
    <Container>
      <TitleLogo />
      <Input
        type="text"
        placeholder="아이디를 입력해주세요."
        name="id"
        value={loginForm.id}
        onChange={handleChangeLoginForm}
        onKeyPress={handleKeyPress} // Enter 키 이벤트 핸들러 추가
      />
      <Input
        type="password"
        name="password"
        placeholder="비밀번호를 입력해주세요."
        value={loginForm.password}
        onChange={handleChangeLoginForm}
        onKeyPress={handleKeyPress} // Enter 키 이벤트 핸들러 추가
      />
      <Button onClick={handleLogin}>시작하기</Button>
      <LineContainer>간편 로그인 하기</LineContainer>
      <Image>
        <img src="/btnG_완성형.png" style={{ marginRight: '50px' }} />
        <img src="/kakao_login_medium_narrow.png" onClick={kakaoLoginHandler} />
      </Image>
      <Links>
        <Link to="/find">아이디 찾기 / 비밀번호 찾기</Link>
      </Links>
      <Links>
        <Link to="/signup">회원가입</Link>
      </Links>
      <MenuBar />
    </Container>
  );
}

export default Login;
