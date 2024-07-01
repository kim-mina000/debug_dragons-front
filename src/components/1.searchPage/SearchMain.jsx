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

      // 지도를 생성합니다
      const map = new kakao.maps.Map(container.current, options);

      // 지도를 클릭한 위치에 표출할 마커입니다
      const marker = new kakao.maps.Marker({
        // 지도 중심좌표에 마커를 생성합니다
        position: map.getCenter()
      });

      // 지도에 마커 표시하기
      marker.setMap(map);

      // 지도 클릭 이벤트 추가
      kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
        const latlng = mouseEvent.latLng;
        marker.setPosition(latlng);
      });

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

      // 마커 이미지의 이미지 주소
      const imageSrc =
        'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

      for (let i = 0; i < positions.length; i++) {
        // 마커 이미지의 이미지 크기
        const imageSize = new kakao.maps.Size(24, 35);

        // 마커 이미지를 생성합니다
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        // 마커를 생성합니다
        const marker2 = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: positions[i].latlng, // 마커를 표시할 위치
          title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image: markerImage // 마커 이미지
        });
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
