import styled from "styled-components";
import MenuBar from "../0.menuBar/MenuBar";

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
  background-color: #8fa4bf;
  margin-top: 180px;
  cursor: pointer;
  &:hover {
    background-color: #b4c3d9;
  }
`;

function SignUpComplete() {
  return (
    <Container>
      <Title>아띠버스 가입을 축하드립니다!</Title>
      <Content>회원가입이 완료되었습니다!</Content>
      <Content>당신의 즐거운 여행을 아띠버스가 함께 할께요!</Content>
      <StartWeb>다양한 길잡이 확인하러 가기 ➡</StartWeb>
      <MenuBar />
    </Container>  
  );
};

export default SignUpComplete;