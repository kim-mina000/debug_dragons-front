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
    kakao.maps.load(() => {

      // center와 level값은 고정
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        level: 3 //지도의 레벨(확대, 축소 정도)
      };

      kakao.maps.load(function () {
        const map = new window.kakao.maps.Map(container.current, options);

        // 지도를 클릭한 위치에 표출할 마커입니다
        const marker = new kakao.maps.Marker({

          // 지도 중심좌표에 마커를 생성합니다
          position: map.getCenter()
        });

        // 지도에 마커 표시하기
        marker.setMap(map);

        kakao.maps.event.addListener(map, 'click', function (mouseEvent) {

          const latlng = mouseEvent.latLng;

          marker.setPosition(latlng);
        })
      });

      const kakaoMap = new kakao.maps.Map(container.current, options);

      // 마커를 표시할 위치와 title 객체 배열 (임시) 
      const positions = [
        {
          title: '카카오',
          latlng: new kakao.maps.LatLng(33.450705, 126.570677)
        },
        {
          title: '생태연못',
          latlng: new kakao.maps.LatLng(33.450936, 126.569477)
        },
        {
          title: '텃밭',
          latlng: new kakao.maps.LatLng(33.450879, 126.569940)
        },
        {
          title: '근린공원',
          latlng: new kakao.maps.LatLng(33.451393, 126.570738)
        }
      ];

      // 마커 이미지의 이미지 주소입니다
      const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

      for (let i = 0; i < positions.length; i++) {

        // 마커 이미지의 이미지 크기 입니다
        const imageSize = new kakao.maps.Size(24, 35);

        // 마커 이미지를 생성합니다    
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        // 마커를 생성합니다
        const marker2 = new kakao.maps.Marker({
          map: kakaoMap, // 마커를 표시할 지도
          position: positions[i].latlng, // 마커를 표시할 위치
          title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image: markerImage // 마커 이미지 
        });
      }
    });

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