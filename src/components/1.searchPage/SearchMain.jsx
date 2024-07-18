import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import MainModalPlace from '../modal/MainModalPlace';
import MainModalPerson from '../modal/MainModalPerson';
import MainModalDate from '../modal/MainModalDate'; // 모달 컴포넌트 import
import { buttonLabels } from '../modal/MainModalPlace';


// 이미지 경로 설정
import SesrchPlace from '../../image/search_place_icon.png';
import SesrchDate from '../../image/search_date_icon.png';
import SesrchPerson from '../../image/search_person_icon.png';
import MainModalInfoWindow from '../modal/MainModalInfoWindow';

import { addEventHandle, searchLandmark, xyToAddress } from '../../api/map/map';

import SearchMainResult from './SearchMainResult';
import { MARKER_IMG_URL } from '../../api/config';
import { handleMappingSave } from '../../api/map/map-result';

import { IoIosArrowRoundForward } from 'react-icons/io';
import MainOrMylist from '../modal/MainOrMylist';
import LoginNeed from '../modal/LoginNeed';
import { useDispatch } from 'react-redux';




// 전체 레이아웃을 감싸는 Container. 가운데 정렬.
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
`;

const ContentWrap = styled.div`
  width: 90%; 
  display: flex;
  margin: 1% 0;
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
  border: 5px #93a2f1 solid;
  box-sizing: border-box;
  overflow-y: hidden;
`;

// 검색 영역의 스타일
const SearchContainer = styled.div`
  width: 100%;
  height: 200px;
  background-color: #b1e9ff3d;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  border-bottom: 7px solid #79777763;
  padding-left: 30px;

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
  height: 583px;
  background-color: #8bdcfc63;
  // 리스트 길어질 수록 바디 영역이 길어져서 스크롤 넣어놓음
  overflow-y: auto;
`;

// 지도를 표시하는 MapContainer. 왼쪽 여백 제거.
const MapContainer = styled.div`
  flex: 1;
  height: 100%;
  background-color: #888;
  position: relative;
  display: flex;
  justify-content: center;
`;

// 지도 위에 카테고리 표시 ul
const MapCategory = styled.ul`
  position: absolute;
  /* flex: 2; */
  z-index: 8;
  display: flex;
  cursor: pointer;

  & li {
    padding: 10px 15px;
  }

  & li:hover{
    opacity: 50%;
  }

`;

const SaveButton = styled.button`
  width: 170px;
  height: 50px;
  border-radius: 15px;
  position: absolute;
  bottom: 5%;
  right: 1.5%;
  background-color: black;
  outline: none;
  border: 0px;
  color: white;

  cursor: pointer;
  &:hover {
    background-color: #8fa4bf;
  }

  font-size: 20px;
  z-index: 7;

`;

function SearchMain({userInfo}) {
  const { kakao } = window;
  const container = useRef(null);
  
  // 선택된 값들을 관리할 상태
  const [selectedPlaceButtons, setSelectedPlaceButtons] = useState([]);
  const [selectedDateButtons, setSelectedDateButtons] = useState([]);
  const [selectedPersonButtons, setSelectedPersonButtons] = useState([null]);
  const selectedInformation = {
    place: selectedPlaceButtons,
    date: selectedDateButtons,
    person: selectedPersonButtons
  }

  const [userClickInfo, setUserClickInfo] = useState({});
  const [categoryIndex, setCategoryIndex] = useState("가볼만한 곳");
  
  const [formData, setFormData] = useState([]);
  
  // 각 모달의 open/close 상태 관리
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isPlaceModalOpen, setIsPlaceModalOpen] = useState(false);
  const [isPersonModalOpen, setIsPersonModalOpen] = useState(false);
  const [isInfoWindow, setIsInfoWindow] = useState(false); 
  const [isWhereIgo, setIsWhereIgo] = useState(false);
  const [isNeedLogin, setIsNeedLogin] = useState(false);
  
  
  // MainModalPerson에서 선택된 값 저장
  const handleSavePerson = (selectedValues) => {
  // 0 값을 null로 변환합니다
  const sanitizedValues = {
    adults: selectedValues.adults === 0 ? null : selectedValues.adults,
    children: selectedValues.children === 0 ? null : selectedValues.children,
    infants: selectedValues.infants === 0 ? null : selectedValues.infants,
    pets: selectedValues.pets === 0 ? null : selectedValues.pets,
  };

  setSelectedPersonButtons(sanitizedValues);
  setIsPersonModalOpen(false);
  };

  
  const handleSaveFormData = (key, selectedInformation)=>{
    if (!key) {
      setIsNeedLogin(true);
    } else {
      handleMappingSave(formData,userInfo.userId, selectedInformation)
      setFormData([]);
      setIsWhereIgo(true);
    }
  }
  
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
    console.log(selectedValues);
    setIsDateModalOpen(false); // 모달 닫기
  };

  const handleSavePlace = (selectedValues) => {
    setSelectedPlaceButtons(selectedValues);
    console.log(selectedValues);
    setIsPlaceModalOpen(false);
  };
  
  useEffect(() => {
    
    
  }, []);
  
    const markers = []; // 지도에 표시된 마커 객체를 가지고 있을 배열
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
      const ps = new kakao.maps.services.Places(); // 장소 검색 객체
      const infowindow = new kakao.maps.InfoWindow({zIndex:1});
      const geocoder = new kakao.maps.services.Geocoder(); // 주소-좌표 변환 객체를 생성합니다
  
      // ps.keywordSearch(`${selectedPlaceButtons} 가볼만한 곳`, placesSearchCB);  // 키워드로 장소를 검색합니다
      ps.keywordSearch(`${categoryIndex},${selectedPlaceButtons}`, placesSearchCB);
  
      function placesSearchCB (data, status, pagination) { // 키워드 검색 완료 시 호출되는 콜백함수 입니다
        if (status === kakao.maps.services.Status.OK) {
  
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            const bounds = new kakao.maps.LatLngBounds();
            
            for (let i=0; i<data.length; i++) {
              displayMarker(data[i]);    
              bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            }       
            // displayPlaces(data);
            
            map.setBounds(bounds); // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        } 
      }
  
      function displayMarker(place) {    // 지도에 마커를 표시하는 함수입니다
  
        const marker = new kakao.maps.Marker({ // 마커를 생성하고 지도에 표시합니다
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x) 
        });
  
        kakao.maps.event.addListener(marker, 'click', function() {
          setUserClickInfo(place);
          setIsInfoWindow(true);
        });
  
        kakao.maps.event.addListener(marker, 'mouseover', function() { // 마커에 호버이벤트를 등록합니다
          infowindow.setContent( // 마커를 호버하면 장소명이 인포윈도우에 표출됩니다
            `<div style="width: 100%; padding:5px; font-size:12px; display:flex; justify-content:space-between; align-items: center;">
            ${place.place_name}
            </div>
            `
          );
          infowindow.open(map, marker);
        });
  
        kakao.maps.event.addListener(marker, "mouseout", function () {
          infowindow.close(map, marker);
        });
      }
  
  
  // 마커추가
      // 지도를 클릭했을때 클릭한 위치에 마커를 추가하도록 지도에 클릭이벤트를 등록
      kakao.maps.event.addListener(map, 'click', async (mouseEvent) => {
        try {
          const data = await searchLandmark(mouseEvent.latLng);
          if (data.meta.total_count > 15) {
            for(let i = 0; i < 15; i++){
              displayMarker(data.documents[i]);
            }
          } else {
            for(let i = 0; i < data.meta.total_count; i++){
              displayMarker(data.documents[i]);
            }
          }
          
          addMarker(mouseEvent.latLng); // 클릭한 위치에 마커를 표시
          
        } catch (error) {
          console.error(error);
        }
      });
      
      async function addMarker(position) { // 마커를 생성하고 지도위에 표시하는 함수
        const imageSrc = MARKER_IMG_URL;  // 마커 이미지의 이미지 주소
        const imageSize = new kakao.maps.Size(24, 35);  // 마커 이미지의 이미지 크기
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);  // 마커 이미지를 생성
        const data = await xyToAddress(position.La, position.Ma);
      
  
        const marker = new kakao.maps.Marker({ // 마커를 생성
          map: map,
          position: position,
          image: markerImage // 마커 이미지   
        });
  
        marker.setMap(map);  // 마커가 지도 위에 표시되도록 설정
        markers.push(marker); // 생성된 마커를 배열에 추가
  
        await kakao.maps.event.addListener(marker, 'mouseover', function() { // 마커에 호버이벤트를 등록합니다
          try {
            
            infowindow.setContent( // 마커를 호버하면 장소명이 인포윈도우에 표출됩니다
              `<div style="width: 100%; padding:5px; font-size:12px; display:flex; justify-content:space-between; align-items: center;">
              ${data.documents[0].address.address_name}
              </div>
              `
            );
            infowindow.open(map, marker);
  
          } catch (error) {
            
          }
        });
  
        await kakao.maps.event.addListener(marker, "mouseout", function () {
          infowindow.close(map, marker);
        });
  
        await kakao.maps.event.addListener(marker, 'click', function() {
          setUserClickInfo(data.documents[0]?.address);
          setIsInfoWindow(true);
        });
  
  
      }
  
  
  // 카테고리 마커 추가
      // 마커를 클릭했을 때 해당 장소의 상세정보를 보여줄 커스텀오버레이입니다
      const placeOverlay = new kakao.maps.CustomOverlay({zIndex:1}), 
      contentNode = document.createElement('div') // 커스텀 오버레이의 컨텐츠 엘리먼트 입니다 
      // markers = [], // 마커를 담을 배열입니다
      let currCategory = '';
  
      kakao.maps.event.addListener(map, 'idle', searchPlaces);
  
      contentNode.className = 'placeinfo_wrap';
  
      addEventHandle(contentNode, 'mousedown', kakao.maps.event.preventMap);
      addEventHandle(contentNode, 'touchstart', kakao.maps.event.preventMap);
      placeOverlay.setContent(contentNode);  
  
      function searchPlaces() {
        if (!currCategory) {
            return;
        }
  
        placeOverlay.setMap(null); // 커스텀 오버레이를 숨깁니다 
        removeMarker(); // 지도에 표시되고 있는 마커를 제거합니다
        ps.categorySearch(currCategory, placesSearchCB, {useMapBounds:true}); 
      }
    
      function removeMarker() {
        for ( let i = 0; i < markers.length; i++ ) {
            markers[i].setMap(null);
        }   
        markers = [];
      }
  })},[selectedPlaceButtons,categoryIndex]);
  

  return (
    <Container>
      <ContentWrap>
        <LeftWrap>
          <SearchContainer>
          이번 여행은 
          <div>
              <img
                src={SesrchPlace}
                alt="place icon"
                onClick={handlePlaceIconClick}
              />
              <SearchH2>어디로? {selectedPlaceButtons.length > 0 && `: ${selectedPlaceButtons}`}</SearchH2>
            </div>
            <div>
              <img
                src={SesrchDate}
                alt="date icon"
                onClick={handleDateIconClick}
              />
              <SearchH2>언제? {selectedDateButtons.length > 0 && `: ${selectedDateButtons}`}</SearchH2>
            </div>
            <div>
            <img
                src={SesrchPerson}
                alt="person icon"
                onClick={() => setIsPersonModalOpen(true)}
              />
              <SearchH2>누구와?
                {selectedPersonButtons.adults && `: 성인 ${selectedPersonButtons.adults} `} 
                {selectedPersonButtons.children && `아동 ${selectedPersonButtons.children} `}
                {selectedPersonButtons.infants && `영아 ${selectedPersonButtons.infants} `}
                {selectedPersonButtons.pets && `반려동물 ${selectedPersonButtons.pets}`}
              </SearchH2>
            </div>
          </SearchContainer>
          {/* 검색결과나오는곳 현재는 하드코딩으로 작업해놓음 */}
          <MyCourseContainer>
            <SearchMainResult
              formData={formData}
              setFormData={setFormData}
              selectedPlaceButtons = {selectedPlaceButtons}
              selectedDateButtons = {selectedDateButtons}
              selectedPersonButtons = {selectedPersonButtons}
              userInfo={userInfo}
            />
          </MyCourseContainer>
        </LeftWrap>
        <MapContainer ref={container} id='map'>
          <MapCategory id='category'>

            <li id="BK9" onClick={()=>{setCategoryIndex("은행")}}> 
                은행
            </li>       
            <li id="MT1" onClick={()=>{setCategoryIndex("마트")}}> 
                마트
            </li>  
            <li id="PM9" onClick={()=>{setCategoryIndex("약국")}}> 
                약국
            </li>  
            <li id="OL7" onClick={()=>{setCategoryIndex("주유소")}}> 
                주유소
            </li>  
            <li id="CE7" onClick={()=>{setCategoryIndex("카페")}}> 
                카페
            </li>  
            <li id="CS2" onClick={()=>{setCategoryIndex("편의점")}}> 
                편의점
            </li>      
            <li id="CS2" onClick={()=>{setCategoryIndex("관광지")}}> 
                관광지
            </li>   
          </MapCategory>

          <SaveButton 
            // disabled = {!formData.length}
            onClick = {()=>{handleSaveFormData(userInfo, selectedInformation)}}>저장하기<IoIosArrowRoundForward /></SaveButton>

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
          formData={formData}
          setFormData={setFormData}
          userInfo={userInfo}
        />
      )}

      {isWhereIgo && (
        <MainOrMylist
          setIsWhereIgo={setIsWhereIgo}
        />
      )}

      {isNeedLogin && (
        <LoginNeed 
          closeModal={()=> setIsNeedLogin(false)}
        />
      )}
    </Container>

    
  );
}

export default SearchMain;
