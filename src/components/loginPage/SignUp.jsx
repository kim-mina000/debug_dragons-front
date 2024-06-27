import styled from "styled-components";
import TitleLogo from "./TitleLogo";

// 컨테이너 틀
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

function SignUp() {
  return (
    <Container>
      <TitleLogo />
    </Container>
  );
};

export default SignUp;