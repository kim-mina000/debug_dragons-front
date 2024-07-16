import React from 'react';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import MenuBar from './MenuBar'; // MenuBar 컴포넌트 경로에 맞게 수정하세요

const ReactionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #f0f0f0;
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const DesktopContainer = styled(ReactionContainer)`
  @media (max-width: 1280px) {
    padding: 15px;
  }
  @media (max-width: 1024px) {
    padding: 20px;
  }
`;

const TabletMobileContainer = styled(ReactionContainer)`
  justify-content: space-around;
  @media (max-width: 768px) {
    padding: 25px;
  }
  @media (max-width: 480px) {
    padding: 30px;
  }
`;

const ReactionType = () => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 992 });
  const isTabletOrMobile = useMediaQuery({ maxWidth: 991 });

  return (
    <>
      {isDesktopOrLaptop && (
        <DesktopContainer>
          <MenuBar />
        </DesktopContainer>
      )}
      {isTabletOrMobile && (
        <TabletMobileContainer>
          <MenuBar />
        </TabletMobileContainer>
      )}
    </>
  );
};

export default ReactionType;
