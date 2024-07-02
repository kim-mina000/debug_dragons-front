import styled from "styled-components";
import TitleLogo from "./TitleLogo";
import MenuBar from "../0.menuBar/MenuBar";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';


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
  // FileReader API 로 추가함
  overflow: hidden;
  position: relative;
  background-color: #f0f0f0;
`;

// FileReader API 로 추가함
const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
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

  // 모달 스타일
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function SignUp() {

  const nevigate = useNavigate();

  // 중복값 알림 모달
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [userInfo, setUserInfo] = useState({
    userId: null,
    userPw: null,
    userName: null,
    userEmail: null,
    profile: null,
    userRole: false,
    userProfileImagePath: false,
  });

  const openModal = (message) => {
    setModalMessage(message);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const checkDuplicate = async (field, value) => {
    try {
      const response = await axios.post(`http://localhost:8080/member/check-duplicate`, { field, value });
      return response.data.isDuplicate;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  // ID 유효성 검사
  const handleID = async (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z0-9]*$/.test(value)) {
      const isDuplicate = await checkDuplicate('userId', value);
      if (isDuplicate) {
        openModal("이미 다른 사람이 사용중이에요😥");
      } else {
        setUserInfo({ ...userInfo, userId: value });
      }
    } else {
      alert("영문 대/소문자,숫자 조합으로 입력해주세요.");
    }
  };

  // PASSWORD 유효성 검사
  const handlePassword = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z0-9]*$/.test(value)) {
      setUserInfo({ ...userInfo, userPw: value });
    } else {
      alert("영문 대/소문자,숫자 조합으로 입력해주세요.");
    }
  };

  // USERNAME 핸들러 (특별한 유효성 검사 없음)
  const handleUsername = (e) => {
    setUserInfo({ ...userInfo, userName: e.target.value });
  };

  // EMAIL 유효성 검사
  const handleEmail = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z0-9@.]*$/.test(value)) {
      setUserInfo({ ...userInfo, userEmail: value });
    } else {
      alert("영문 대/소문자,숫자 조합으로 입력해주세요.");
    }
  };

  // const handleProfileImage = (e) => {
  //   setUserInfo({ ...userInfo, 'userProfileImagePath': e.target.value })
  // }

  // FileReader사용
  const handleProfileImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUserInfo({ ...userInfo, userProfileImagePath: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

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
          <label htmlFor="profileImageUpload">
            <ImageBox>
              {userInfo.userProfileImagePath ? (
                <ImagePreview src={userInfo.userProfileImagePath} alt="Profile" />
              ) : (
                "본인을 표현할 수 있는 이미지를 추가해보세요!"
              )}
            </ImageBox>
          </label>
          <input
            type="file"
            id="profileImageUpload"
            style={{ display: 'none' }}
            onChange={handleProfileImage}
          />
        </div>
      </SignUpBox>
      <DoSign onClick={handleSignUp}>회원 가입 하기 ➡</DoSign>
      <MenuBar />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Notification"
      >
        <h2>{modalMessage}</h2>
        <button onClick={closeModal}>닫기</button>
      </Modal>
    </Container>
  );
};
export default SignUp;