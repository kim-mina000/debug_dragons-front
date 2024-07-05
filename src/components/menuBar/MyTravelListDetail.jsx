import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import SearchMainResult from '../1.searchPage/SearchMainResult';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  overflow: auto;
  padding: 5rem;  
`;

const BackButton = styled.button`
  position: absolute;
  top: 40px;
  left: 95px;
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
`;

const DetailsContainer = styled.div`
  flex: 1.5;
  display: flex;
  flex-direction: column;
`;

const PhotoTextContainer = styled.div`
  flex: 3;
  background-color: #f4f4f4;
  padding: 20px;
`;

const RouteContainer = styled.div`
  flex: 2;
  background-color: #e4e4e4;
  padding: 20px;
`;

const MyTravelListDetail = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <SearchContainer>
        <BackButton onClick={() => navigate('/menuBar/MyTravelList')}>
          뒤로가기
        </BackButton>
        <SearchMainResult />
      </SearchContainer>
      <DetailsContainer>
        <PhotoTextContainer>
          <div>
            사진 / 글
          </div>
        </PhotoTextContainer>
        <RouteContainer>
          <div>
            경로
          </div>
        </RouteContainer>
      </DetailsContainer>
    </Container>
  );
}

export default MyTravelListDetail;
