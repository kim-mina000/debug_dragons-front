import styled from "styled-components";
import SearchMain from "./1.searchPage/SearchMain";
import MenuBar from "./0.menuBar/MenuBar";
import Headers from "./0.menuBar/Header";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Wrap = styled.div`
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow-x: scroll;
`;

function MainContainer() {
  const [userInfo, setUserInfo] = useState(null);
  const userInfoRedux = useSelector(state => state.member.userInfo);

  useEffect(() => {
  
    setUserInfo(userInfoRedux);  // 리덕스 스토어에서 받아서 유저정보 넣어줌

    if (!userInfo) {  // 새로고침이 일어나면 로컬스토리지에서 받아줌
      setUserInfo(JSON.parse(localStorage.getItem('userInfo')));
    }
  }, []);


  return (
    <>    
      <Headers userName={userInfo ? userInfo.nickname : "사용자"} />
      <Wrap>
      
        <SearchMain userInfo={userInfo} />
        {/* 헤더, 메뉴바 고정시켜놓고 */}
        {/* 다른거 이케이케하면 좋을것같아요 */}
      
      </Wrap>
      <MenuBar />
    </>

  );
};

export default MainContainer;