import Lottie from "react-lottie";
import LoadingAnimation from "../lottie/Animation - 1718980687326.json";
import styled from "styled-components";

const Container = styled.div`
@font-face {
    font-family: 'MaplestoryOTFBold';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/MaplestoryOTFBold.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  align-items: center;
  background-color: #4ca8ff;
  /* width: 100vh; //삭제요망 */
  `
const Text = styled.p`
  font-size: 20px;
  font-family: 'MaplestoryOTFBold';
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
        <Text>잠시만 기다려주세요!! <br/>
              아띠버스가 user님을 태우러 가고 있어요!</Text>
        <Lottie options={defaultOptions} height={400} width={400} />
      </Container>
    </>
  );
}

export default Loading;