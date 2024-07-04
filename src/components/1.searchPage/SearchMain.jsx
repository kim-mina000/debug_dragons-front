import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import MainModalPlace from '../modal/MainModalPlace';
import MainModalPerson from '../modal/MainModalPerson';
import MainModalDate from '../modal/MainModalDate'; // 모달 컴포넌트 import
import buttonLabels from '../modal/MainModalPlace';


// 이미지 경로 설정
import SesrchPlace from '../../image/search_place_icon.png';
import SesrchDate from '../../image/search_date_icon.png';
import SesrchPerson from '../../image/search_person_icon.png';
import MainModalInfoWindow from '../modal/MainModalInfoWindow';


// 전체 레이아웃을 감싸는 Container. 가운데 정렬.
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentWrap = styled.div`
  width: 90%; 
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
  // const [selectedButtons, setSelectedButtons] = useState([]);

  // 선택된 값들을 관리할 상태
  const [selectedPlaceButtons, setSelectedPlaceButtons] = useState([]);
  const [selectedDateButtons, setSelectedDateButtons] = useState([]);
  const [selectedPersonButtons, setSelectedPersonButtons] = useState([]);
  const [userClickInfo, setUserClickInfo] = useState({});
  
  // 각 모달의 open/close 상태 관리
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isPlaceModalOpen, setIsPlaceModalOpen] = useState(false);
  const [isPersonModalOpen, setIsPersonModalOpen] = useState(false);
  const [isInfoWindow, setIsInfoWindow] = useState(false); 

  // MainModalPerson에서 선택된 값 저장
  const handleSavePerson = (selectedValues) => {
    setSelectedPersonButtons(selectedValues);
    setIsPersonModalOpen(false);
  };


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

// 키워드로 장소검색
      // 장소 검색 객체
      const ps = new kakao.maps.services.Places(); 
      const infowindow = new kakao.maps.InfoWindow({zIndex:1});


      // 키워드로 장소를 검색합니다
      ps.keywordSearch(`${selectedPlaceButtons} 가볼만한 곳`, placesSearchCB);
          
    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB (data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          const bounds = new kakao.maps.LatLngBounds();

          for (let i=0; i<data.length; i++) {
              displayMarker(data[i]);    
              bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }       

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          map.setBounds(bounds);
      } 
    }

    // 지도에 마커를 표시하는 함수입니다
    function displayMarker(place) {

        
      // 마커를 생성하고 지도에 표시합니다
      const marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(place.y, place.x) 
      });
      


      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'click', function() {
        
        setUserClickInfo(place);
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent(
          `
          <div style="width: 100%; padding:5px; font-size:12px; display:flex; justify-content:space-between; align-items: center;"
          onClick={${setIsInfoWindow(true)}}>
          ${place.place_name}
          </div>
          `
        );
        infowindow.open(map, marker);
      });
    }
    // var content = '<div class="wrap">' + 
    // '    <div class="info">' + 
    // '        <div class="title">' + 
    // '            카카오 스페이스닷원' + 
    // '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' + 
    // '        </div>' + 
    // '        <div class="body">' + 
    // '            <div class="img">' +
    // '                <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png" width="73" height="70">' +
    // '           </div>' + 
    // '            <div class="desc">' + 
    // '                <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>' + 
    // '                <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>' + 
    // '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' + 
    // '            </div>' + 
    // '        </div>' + 
    // '    </div>' +    
    // '</div>';
    // 이거 이런식으로 등록하래요 ,,

// 마커추가
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
  }, [selectedPlaceButtons]);

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

  // 값 저장하기
  const handleSaveDate = (selectedValues) => {
    setSelectedDateButtons(selectedValues);
    setIsDateModalOpen(false); // 모달 닫기
  };

  const handleSavePlace = (selectedValues) => {
    setSelectedPlaceButtons(selectedValues);
    setIsPlaceModalOpen(false);
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
              <SearchH2>이번 여행은 어디로 {selectedPlaceButtons.length > 0 && `: ${selectedPlaceButtons.join(', ')}`}</SearchH2>
            </div>
            <div>
              <img
                src={SesrchDate}
                alt="date icon"
                onClick={handleDateIconClick}
              />
              <SearchH2>언제 떠나볼까요? {selectedDateButtons.length > 0 && `: ${selectedDateButtons.join(', ')}`}</SearchH2>
            </div>
            <div>
            <img
                src={SesrchPerson}
                alt="person icon"
                onClick={() => setIsPersonModalOpen(true)}
              />
              <SearchH2>누구와 떠날까요? {selectedPersonButtons.adults && `: 성인 ${selectedPersonButtons.adults}명, `} 
                {selectedPersonButtons.children && `아동 ${selectedPersonButtons.children}명, `}
                {selectedPersonButtons.infants && `영아 ${selectedPersonButtons.infants}명, `}
                {selectedPersonButtons.pets && `반려동물 ${selectedPersonButtons.pets}마리`}
              </SearchH2>
            </div>
          </SearchContainer>
          <MyCourseContainer>{/* 코스 내용이 들어갈 곳 */}</MyCourseContainer>
        </LeftWrap>
        <MapContainer ref={container}>
          {/* <SaveButton>저장하기→</SaveButton> */}
          {/* 해당 컨포넌트 작업 후 다시 주석 해제할 예정 */}
        </MapContainer>
      </ContentWrap>

      {/* MainModalPlace 모달 */}
      {isPlaceModalOpen && (
        <MainModalPlace
          closeModal={() => setIsPlaceModalOpen(false)}
          selectedButtons={selectedPlaceButtons.map(place => buttonLabels.indexOf(place))}
          setSelectedButtons={handleSavePlace}
          onSave={handleSavePlace}
        />
      )}

      {/* MainModalDate 모달 */}
      {isDateModalOpen && (
        <MainModalDate
          closeModal={() => setIsDateModalOpen(false)}
          selectedButtons={selectedDateButtons}
          setSelectedButtons={handleSaveDate}
          onSave={handleSaveDate}
        />
      )}

      {/* MainModalPerson 모달 */}
      {isPersonModalOpen && (
        <MainModalPerson
          closeModal={() => setIsPersonModalOpen(false)}
          setSelectedButtons={handleSavePerson}
        />
      )}

      {/* MainModalInfoWindow 모달 */}
      {isInfoWindow && (
        <MainModalInfoWindow 
          userClickInfo={userClickInfo}
          closeModal={() => setIsInfoWindow(false)}
        />
      )}
    </Container>
  );
}

export default SearchMain;
