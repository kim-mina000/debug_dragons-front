import styled from "styled-components";
import { useEffect, useRef } from "react";

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
  const { kakao } = window;
  const container = useRef(null);

  // 화면이 처음 렌더링 될때 지도를 가져옴!
  useEffect(() => {
    // 지도가 전부 렌더링 된 후에 실행~!
    kakao.maps.load(()=>{
    
      // center와 level값은 고정
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        level: 3 //지도의 레벨(확대, 축소 정도)
      };

      kakao.maps.load(function() {
        const  map = new window.kakao.maps.Map(container.current, options);
    });

      const kakaoMap = new kakao.maps.Map(container.current, options);
    })

  }, []);

  //  지도 초기 생성 옵션

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
      <MapContainer ref={container}>
        <SaveButton>저장하기→</SaveButton>
      </MapContainer>
    </Container>
  );
};

export default SearchMain;