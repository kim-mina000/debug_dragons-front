import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Link } from 'react-router-dom';

const StyledFooter = styled.footer`
  position: sticky;
  bottom: 0;
  z-index: 10;
`;

// 하단 메뉴탭 컨테이너
const IconContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  border-top: 1px solid #ccc;
  background-color: #fff;
  z-index: 1000;
  height: 70px; /* 고정 높이 */
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

// 하단 메뉴탭
const Icon = styled.div`
  width: 100px;
  height: 70px;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: ${props => (props.isVisible ? 1 : 0)}; /* 보임 여부에 따른 투명도 조절 */
  transition: opacity 0.3s ease;
  ${props => props.isVisible && css`
    animation: ${fadeIn} 0.3s forwards; /* 보일 때 애니메이션 적용 */
  `}
  &:hover {
    opacity: 1;
  }
`;

function MenuBar() {
  const [isExpanded, setIsExpanded] = useState(false);

  // 메뉴 컨테이너에 마우스가 들어올 때 호출되는 함수
  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  // 메뉴 컨테이너에서 마우스가 떠날 때 호출되는 함수
  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  return (
    <StyledFooter>
      <IconContainer
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div />
        <div />
        {/* 나의 여행 리스트 가기 */}
        <Link to="/menuBar/MyTravelList">
          <Icon isVisible={isExpanded}>
            <img src='/리스트.png' alt="리스트" />
          </Icon>
        </Link>
        
        <Link to="/around">
          <Icon isVisible={isExpanded}>
            <img src='/둘러보기.png' alt="둘러보기" />
          </Icon>
        </Link>
        
        {/* 스타트 페이지 이동 */}
        <Link to="/main">
          <Icon isVisible={true}>
            <img src='/홈.png' alt="홈" />
          </Icon>
        </Link>

        <Link to="/scrap">
          <Icon isVisible={isExpanded}>
            <img src='/스크랩.png' alt="스크랩" />
          </Icon>
        </Link>
        
        <Link to="/mypage">
          <Icon isVisible={isExpanded}>
            <img src='/마이페이지.png' alt="마이페이지" />
          </Icon>
        </Link>
        <div />
        <div />
      </IconContainer>
    </StyledFooter>
  );
}

export default MenuBar;
