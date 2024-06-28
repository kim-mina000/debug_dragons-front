import React from 'react';
import styled from 'styled-components';
import profile_fake from '../../image/profile_fake_img.png';

// 헤더 컨테이너 스타일
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #333;
  color: white;
`;

// 왼쪽 컨테이너 스타일
const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RightContainer = styled.div``;

// 프로필 이미지 스타일
const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

// 사용자 이름 스타일
const UserName = styled.span`
  font-size: 16px;
`;

// 로그아웃 버튼 스타일
const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
`;

// 헤더 컴포넌트 정의
const Header = ({ userName, onLogout }) => {
  return (
    <HeaderContainer>
      <LeftContainer>
        <ProfileImage src={profile_fake} alt="프로필 이미지" />
        <UserName>{userName ? `${userName} 님 환영합니다` : '환영합니다'}</UserName>
      </LeftContainer >
      <RightContainer>
        <LogoutButton onClick={onLogout}>로그아웃</LogoutButton>
      </RightContainer>
    </HeaderContainer>
  );
};

export default Header;
