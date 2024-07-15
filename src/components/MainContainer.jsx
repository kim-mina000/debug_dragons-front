import styled from "styled-components";

import MenuBar from "./0.menuBar/MenuBar";
import Headers from "./0.menuBar/Header";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import LoginNeed from "./modal/LoginNeed";

const Wrap = styled.div`
  /* height: 90vh; */
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  /* overflow-x: scroll; */
`;

function MainContainer() {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoginNeed, setIsLoginNeed] = useState(false);
  const userInfoRedux = useSelector(state => state.member.userInfo);
  const navigate = useNavigate();

  const [isLoginNeedModalOpen, setIsLoginNeedModalOpen] = useState(false);

  // "마이페이지" 아이콘 클릭 핸들러
  const handleMyPageClick = () => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (!storedUserInfo) {
      setIsLoginNeedModalOpen(true); // 로그인 필요 모달 띄우기
    } else {
      navigate('/main/mypage'); // 유저 정보가 있으면 마이페이지로 이동
    }
  };
  
  useEffect(() => {
    
    setUserInfo(userInfoRedux);  // 리덕스 스토어에서 받아서 유저정보 넣어줌
    
    if (!userInfo) {  // 새로고침이 일어나면 로컬스토리지에서 받아줌
      setUserInfo(JSON.parse(localStorage.getItem('userInfo')));
    }
  }, []);
  console.log(isLoginNeed);
  
  return (
    <>    


      <Headers 
        userName={userInfo ? userInfo.nickname : "사용자"} 
        image={userInfo?.userProfileImagePath} 
        />
      <Wrap>
      <Outlet />
      
      </Wrap>
      {/* <MenuBar /> */}
      {/* <MenuBar onMyPageClick={handleMyPageClick} /> */}
      <MenuBar isLoginNeed={isLoginNeed} setIsLoginNeed={setIsLoginNeed} />
      {/* {isLoginNeedModalOpen && (
        <LoginNeed closeModal={() => setIsLoginNeedModalOpen(false)} />
      )} */}
    </>

  );
};

export default MainContainer;