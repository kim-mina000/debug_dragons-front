import styled from "styled-components";
import MenuBar from "../0.menuBar/MenuBar";
import { BsCheck2Circle } from "react-icons/bs";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 64px;
  margin-bottom: 30px;
`;

const Content = styled.h4`
  font-size: 36px;
  text-align: center;
  font-family: 'NEXON Lv1 Gothic OTF', sans-serif;
  margin-top: 20px;
`
const StartWeb= styled.button`
  width: 840px;
  height: 70px;
  border-radius: 15px;
  font-size: 20px;
  font-family:'MaplestoryOTFBold', sans-serif;
  background-color: #CCF2F4;
  margin-top: 100px;
  cursor: pointer;
  &:hover {
    background-color: #F4F9F9;
  }
`;

function SignUpComplete() {
  return (
    <Container>
      <BsCheck2Circle style={{marginBottom: "50px", fontSize: "180px", color: "#A4EBF3"}} />
      <Title>아띠버스 가입을 축하드립니다!</Title>
      <Content>회원가입이 완료되었습니다!</Content>
      <Content>당신의 즐거운 여행을 아띠버스가 함께 할께요!</Content>
      <StartWeb>로그인 하러 가기 ➡</StartWeb>
      <MenuBar />
    </Container>  
  );
};

export default SignUpComplete;