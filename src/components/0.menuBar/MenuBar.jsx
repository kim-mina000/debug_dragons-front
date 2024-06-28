import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// 하단 메뉴탭 컨테이너
const IconContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  position: absolute;
  bottom: 20px;
  padding: 15px 0; 
  border-top: 1px solid #ccc; 
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

  const handleHomeClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <IconContainer>
      {isExpanded && <Icon isVisible={isExpanded}><img src='/리스트.png' alt="리스트"/></Icon>}
      {isExpanded && <Icon isVisible={isExpanded}><img src='/둘러보기.png' alt="둘러보기"/></Icon>}
      <Icon onClick={handleHomeClick}><img src='/홈.png' alt="홈"/></Icon>
      {isExpanded && <Icon isVisible={isExpanded}><img src='/스크랩.png' alt="스크랩"/></Icon>}
      {isExpanded && <Icon isVisible={isExpanded}><img src='/마이페이지.png' alt="마이페이지"/></Icon>}
    </IconContainer>
  );
};

export default MenuBar;