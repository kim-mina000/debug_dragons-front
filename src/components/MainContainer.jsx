import styled from "styled-components";
import SearchMain from "./1.searchPage/SearchMain";
import MenuBar from "./0.menuBar/MenuBar";
import Headers from "./0.menuBar/Header";
import { useSelector } from "react-redux";

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const FixedMenubar = styled(MenuBar)`
  position: fixed;
  bottom: 0;
`;

function MainContainer() {
  const userInfo = useSelector(state => state.member.userInfo);


  return (
    <>    
      <Headers userName={userInfo ? userInfo.userName : "사용자"} />
      <Wrap>
      
        <SearchMain />
        {/* 헤더, 메뉴바 고정시켜놓고 */}
        {/* 다른거 이케이케하면 좋을것같아요 */}
      
      <MenuBar />
      </Wrap>
    </>

  );
};

export default MainContainer;