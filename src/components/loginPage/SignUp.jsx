import styled from "styled-components";
import TitleLogo from "./TitleLogo";
import MenuBar from "../0.menuBar/MenuBar";

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

const Text = styled.h4`
  width: 400px;
  align-items: start;
`;

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
  return (
    <Container>
      <TitleLogo />
      <SignUpBox>
        <SignUpBoxWrap>
          <Text>ID</Text>
          <Input type="text"/>

          <Text>PASSWORD</Text>
          <Input
            type="password" placeholder="6~15자의 영문 대/소문자,숫자 조합으로 입력해주세요."
          />
      
          <Text>NAME</Text>
          <Input type="text"/>

          <Text>E-MAIL</Text>
          <Input type="text" placeholder="e-mail@naver.com"/>
        </SignUpBoxWrap>
        <div>
          <Text>ProFile</Text>  
          <ImageBox>본인을 표현할 수 있는 이미지를 추가해보세요!</ImageBox>
        </div>
      </SignUpBox>

      <DoSign>회원 가입 하기 ➡</DoSign>

      <MenuBar />
    </Container>
  );
};

export default SignUp;