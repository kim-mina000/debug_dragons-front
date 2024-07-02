import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import MainModalPlace from '../modal/MainModalPlace';
import MainModalPerson from '../modal/MainModalPerson';
import MainModalDate from '../modal/MainModalDate'; // 모달 컴포넌트 import

// 이미지 경로 설정
import SesrchPlace from '../../image/search_place_icon.png';
import SesrchDate from '../../image/search_date_icon.png';
import SesrchPerson from '../../image/search_person_icon.png';

// 전체 레이아웃을 감싸는 Container. 가운데 정렬.
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentWrap = styled.div`
  width: 90%; // 이게 최선....입니다...
  height: 800px;
  display: flex;
`;

const SearchH2 = styled.p`
  font-size: 24px;
  & + & {
    margin-top: 30px;
  }
`;

// 왼쪽 영역을 감싸는 LeftWrap
const LeftWrap = styled.div`
  width: 575px;
  height: 100%;
  margin-right: 1%;
`;

// 검색 영역의 스타일
const SearchContainer = styled.div`
  width: 100%;
  height: 200px;
  background-color: #666;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  div {
    display: flex;
    align-items: center;
    margin: 10px 0;
  }

  img {
    margin-right: 10px;
    width: 30px;
    height: 30px;
    cursor: pointer; /* 아이콘에 커서를 변경하여 클릭 가능하도록 설정 */
  }
`;

// 나의 코스 영역의 스타일
const MyCourseContainer = styled.div`
  width: 100%;
  height: 600px;
  background-color: #333;
`;

// 지도를 표시하는 MapContainer. 왼쪽 여백 제거.
const MapContainer = styled.div`
  flex: 1;
  height: 100%;
  background-color: #888;
  position: relative;
`;

// 저장하기 버튼의 스타일
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
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false); // 날짜 모달 열기 상태 추가
  const [isPlaceModalOpen, setIsPlaceModalOpen] = useState(false); // 장소 모달 열기 상태 추가
  const [isPersonModalOpen, setIsPersonModalOpen] = useState(false); // 인원 모달 열기 상태 추가

  // 화면이 처음 렌더링 될 때 지도를 가져옴.
  useEffect(() => {
    kakao.maps.load(() => {
      // 지도 초기 생성 옵션
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표.
        level: 3 // 지도의 레벨(확대, 축소 정도)
      };

      // 지도 생성
      const map = new kakao.maps.Map(container.current, options);

      // 지도를 클릭했을때 클릭한 위치에 마커를 추가하도록 지도에 클릭이벤트를 등록
      kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
        // 클릭한 위치에 마커를 표시 
        addMarker(mouseEvent.latLng);
      });

      // 지도에 표시된 마커 객체를 가지고 있을 배열
      const markers = [];

      // 마커를 생성하고 지도위에 표시하는 함수
      function addMarker(position) {

        // 마커 이미지의 이미지 주소
        const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"

        // 마커 이미지의 이미지 크기
        const imageSize = new kakao.maps.Size(24, 35);

        // 마커 이미지를 생성
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        // 마커를 생성
        const marker = new kakao.maps.Marker({
          map: map,
          position: position,
          image: markerImage // 마커 이미지 
        });

        // 마커가 지도 위에 표시되도록 설정
        marker.setMap(map);
        // 생성된 마커를 배열에 추가
        markers.push(marker);
      }
    });
  }, []);

  // 장소 모달 열기 핸들러
  const handlePlaceIconClick = () => {
    setIsPlaceModalOpen(true);
  };

  // 날짜 모달 열기 핸들러
  const handleDateIconClick = () => {
    setIsDateModalOpen(true);
  };

  // 인원 모달 열기 핸들러
  const handlePersonIconClick = () => {
    setIsPersonModalOpen(true);
  };

  return (
    <Container>
      <ContentWrap>
        <LeftWrap>
          <SearchContainer>
            <div>
              <img
                src={SesrchPlace}
                alt="place icon"
                onClick={handlePlaceIconClick}
              />
              <SearchH2>이번 여행은 어디로</SearchH2>
            </div>
            <div>
              <img
                src={SesrchDate}
                alt="date icon"
                onClick={handleDateIconClick}
              />
              <SearchH2>언제 떠나볼까요?</SearchH2>
            </div>
            <div>
              <img
                src={SesrchPerson}
                alt="person icon"
                onClick={handlePersonIconClick}
              />
              <SearchH2>누구와 떠날까요?</SearchH2>
            </div>
          </SearchContainer>
          <MyCourseContainer>{/* 코스 내용이 들어갈 곳 */}</MyCourseContainer>
        </LeftWrap>
        <MapContainer ref={container}>
          <SaveButton>저장하기→</SaveButton>
        </MapContainer>
      </ContentWrap>

      {/* MainModalPlace 모달 */}
      {isPlaceModalOpen && (
        <MainModalPlace
          closeModal={() => setIsPlaceModalOpen(false)}
          selectedButtons={selectedButtons}
          setSelectedButtons={setSelectedButtons}
        />
      )}

      {/* MainModalDate 모달 */}
      {isDateModalOpen && (
        <MainModalDate
          closeModal={() => setIsDateModalOpen(false)}
          selectedButtons={selectedButtons}
          setSelectedButtons={setSelectedButtons}
        />
      )}

      {/* MainModalPerson 모달 */}
      {isPersonModalOpen && (
        <MainModalPerson
          closeModal={() => setIsPersonModalOpen(false)}
          selectedButtons={selectedButtons}
          setSelectedButtons={setSelectedButtons}
        />
      )}
    </Container>
  );
}

export default SearchMain;
