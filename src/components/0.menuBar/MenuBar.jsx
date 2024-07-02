import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

// 하단 메뉴탭 컨테이너
const IconContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 15px 0;
  border-top: 1px solid #ccc;
  background-color: #fff;
  z-index: 1000; /* 메뉴바를 다른 요소들 위로 올리기 위해 z-index 설정 */
`;

// 하단 메뉴탭
const Icon = styled.div`
  width: 100px;
  height: 70px;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: opacity 0.3s ease;
`;

// 메뉴바 애니메이션
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

function MenuBar() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleHomeHover = () => {
    setIsExpanded(true);
  };

  const handleHomeLeave = () => {
    setIsExpanded(false);
  };

  return (
    <IconContainer>

      {/* 나의 여행 리스트 가기 */}
      <Link to="/menuBar/MyTravelList">
      <Icon isVisible={isExpanded}
        onMouseEnter={handleHomeHover} 
        onMouseLeave={handleHomeLeave}
      >
      <img src='/리스트.png' alt="리스트"/></Icon>      
      </Link>
      
      <Icon isVisible={isExpanded}><img src='/둘러보기.png' alt="둘러보기"/></Icon>

      {/* 스타트 페이지 이동 */}
      <Link to="/Startpage">
        <Icon isVisible={true}
          onMouseEnter={handleHomeHover} 
          onMouseLeave={handleHomeLeave}
        >
          <img src='/홈.png' alt="홈"/>
        </Icon>
      </Link>
      <Icon isVisible={isExpanded}><img src='/스크랩.png' alt="스크랩"/></Icon>
      <Icon isVisible={isExpanded}><img src='/마이페이지.png' alt="마이페이지"/></Icon>
    </IconContainer>
  );
}

export default MenuBar;
