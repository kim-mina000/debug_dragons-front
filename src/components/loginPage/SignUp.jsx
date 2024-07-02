import styled from "styled-components";
import TitleLogo from "./TitleLogo";
import MenuBar from "../0.menuBar/MenuBar";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


// 컨테이너 틀
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

// 회원가입 툴박스
const SignUpBox = styled.div`
  width: 840px;
  height: 355px;
  display:flex;
`;

const SignUpBoxWrap = styled.div`
  margin-right: 30px;
`;

// 이미지 첨부
const ImageBox = styled.div`
  width: 400px;
  height: 330px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 5px solid #CCC;
  border-radius: 15px;
  margin-top: 10px;
`;

// 아이디 패스워드 이름 이매일
const Input = styled.input`
  width: 400px;
  height: 45px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 20px;
  align-items: start;

  &::placeholder {
    font-size: 15px;
  }
`;

// 인풋 제목들
const Text = styled.h4`
  width: 400px;
  align-items: start;
`;

// 버튼
const DoSign = styled.button`
  width: 840px;
  height: 70px;
  border-radius: 15px;
  font-size: 20px;
  font-family:'MaplestoryOTFBold', sans-serif;
  background-color: #8fa4bf;
  margin-top: 30px;
  cursor: pointer;
  &:hover {
    background-color: #b4c3d9;
  }
  `;

function SignUp() {

  const nevigate = useNavigate();

  const [userInfo, setUserInfo] = useState({ 'userId': null, 'userPw': null, 'userName': null, 'userEmail': null, 'profile': null, 'userRole': false, 'userProfileImagePath': false });

  const handleID = (e) => {
    setUserInfo({ ...userInfo, 'userId': e.target.value })
  }
  const handlePassword = (e) => {
    setUserInfo({ ...userInfo, 'userPw': e.target.value })
  }
  const handleUsername = (e) => {
    setUserInfo({ ...userInfo, 'userName': e.target.value })
  }
  const handleEmail = (e) => {
    setUserInfo({ ...userInfo, 'userEmail': e.target.value })
  }
  const handleProfileImage = (e) => {
    setUserInfo({ ...userInfo, 'userProfileImagePath': e.target.value })
  }

  const handleSignUp = async () => {

    try {
      const response = await axios.post('http://localhost:8080/member/register', userInfo);

      if (response.status === 201) { // 응답 코드가 200 OK 일때만 결과를 리턴
        return nevigate('/thanks-for-signup');

      } else {
        throw new Error(`api error: ${response.status} ${response.statusText}`);
      }

    } catch (error) {
      console.error(error);
    }
  }


  return (
    <Container>
      <TitleLogo />
      <SignUpBox>
        <SignUpBoxWrap>
          <Text>ID</Text>
          <Input
            type="text"
            value={userInfo.id}
            onChange={handleID}
          />
          <Text>PASSWORD</Text>
          <Input
            type="password"
            placeholder="6~15자의 영문 대/소문자,숫자 조합으로 입력해주세요."
            value={userInfo.password}
            onChange={handlePassword}
          />
          <Text>NAME</Text>
          <Input type="text"
            value={userInfo.userName}
            onChange={handleUsername}
          />
          <Text>E-MAIL</Text>
          <Input type="text"
            placeholder="e-mail@naver.com"
            value={userInfo.email}
            onChange={handleEmail}
          />
        </SignUpBoxWrap>
        <div>
          <Text>ProFile</Text>
          <label htmlFor="profileImageUpload">
            <ImageBox>본인을 표현할 수 있는 이미지를 추가해보세요!</ImageBox>
          </label>
          <input
            type="file"
            id="profileImageUpload"
            style={{ display: 'none' }}
            onChange={handleProfileImage}
          />
          {userInfo.userProfileImagePath && <img src={userInfo.userProfileImagePath} alt="Profile" />}
        </div>
      </SignUpBox>
      <DoSign onClick={handleSignUp}>회원 가입 하기 ➡</DoSign>
      <MenuBar />
    </Container>
  );
};
export default SignUp;