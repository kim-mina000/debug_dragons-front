import Lottie from "react-lottie";
import LoadingAnimation from "../lottie/Animation - 1718980687326.json";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  align-items: center;
  background-color: #D5ECFA;
  `
const Text = styled.p`
  font-size: 20px;
`;

function Loading() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <>
      <Container>
        <Text>아띠버스가 달려가는 중이에요!</Text>
        <Lottie options={defaultOptions} height={400} width={400} />
      </Container>
    </>
  );
}

export default Loading;