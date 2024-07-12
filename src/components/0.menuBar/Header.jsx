import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import profile_fake from '../../image/profile_fake_img.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { logout } from '../../features/member/memberSlice';
import { BACK_URL } from '../../api/config';

// 헤더 컨테이너 스타일
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #333;
  color: white;

  position: sticky;
  top: 0;
  z-index: 9;

  overflow: hidden; /* 스크롤 방지 */

  /* 헤더 숨기기 애니메이션 적용 */
  transition: transform 0.3s ease;
  transform: translateY(0); /* 초기 위치 */
  &.hidden {
    transform: translateY(-100%); /* 숨길 때 위치 */
  }
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
  background-color: white;

  background-size: cover;
  background-position: center;
  background-image: url(${props => props?.image});
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
const Header = ({ userName, image }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos === 0);
      setPrevScrollPos(currentScrollPos);

    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  const handleLogout = async () => {
    const token = localStorage.getItem('userToken');
  

    await axios.get(`${BACK_URL}/logout`, {headers:{
      Authorization: token,
    }});

  
    dispatch(logout());
    localStorage.removeItem('userToken');
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  return (
    <HeaderContainer className={!visible ? 'hidden' : ''}>
      <LeftContainer>
        <ProfileImage image={image} alt="프로필 이미지" />
        <UserName>{userName ? `${userName} 님 환영합니다` : '환영합니다'}</UserName>
      </LeftContainer>
      <RightContainer>
        {userName === "사용자" || userName === undefined ?
          <LogoutButton onClick={() => { navigate('/login') }}>로그인</LogoutButton>
          :
          <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
        }
      </RightContainer>
    </HeaderContainer>
  );
};

export default Header;
