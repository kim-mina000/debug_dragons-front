import styled from "styled-components";
import SearchMain from "./1.searchPage/SearchMain";
import MenuBar from "./0.menuBar/MenuBar";
import Headers from "./0.menuBar/Header";

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  
`;


function MainContainer() {
  return (
    <Wrap>
      <Headers />
        <SearchMain />
      <MenuBar />
    </Wrap>
  );
};

export default MainContainer;