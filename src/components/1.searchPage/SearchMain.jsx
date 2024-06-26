import styled from "styled-components";
import {getCodeParam, Kakao} from "../loginPage/login_kakao.js";

// 해보는중,, 

const Container = styled.div`
  width: 1200px;
  height: 800px;
  position: relative;
  display: flex;
`;

const SearchH2 = styled.p`
  font-size:24px;
  &+& {
    margin-top: 30px;
  }
`;

const LeftWrap = styled.div`
  width: 575px;
  height: 100%;
`;

const SearchContainer = styled.div`
  width: 100%;
  height: 200px;
  background-color: #666 ;
  text-align: center;
`;

const MyCourseContainer = styled.div`
  width: 100%;
  height: 600px;
  background-color: #333 ;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-left: 50px;
  background-color: #888 ;
  position: relative;
`;

const SaveButton = styled.button`
  width: 250px;
  height: 70px;
  border-radius: 15px;
  position: absolute;
  bottom: 25px;
  right: 120px;
  background-color: black;
  outline: none;
  color: white;
  font-size: 24px;
`;

function SearchMain() {

  const token = getCodeParam();
  // Kakao.Auth.setAccessToken(token);
  return (
    <Container>
      <LeftWrap>
        <SearchContainer>
          <SearchH2>이번 여행은             으로</SearchH2>
          <SearchH2>꽃이 만개한              월에</SearchH2>
          <SearchH2>내게 소중한              과</SearchH2>
        </SearchContainer>
        <MyCourseContainer>
          
        </MyCourseContainer>
      </LeftWrap>
      <MapContainer>
        <SaveButton>저장하기→</SaveButton>
      </MapContainer>
    </Container>
  );
};

export default SearchMain;