import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { handleMyTripSave, searchData } from '../../api/map/map';
import { useSelector } from 'react-redux';
import { TfiClose } from 'react-icons/tfi';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Content = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 1010;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #ccc;
  margin: 20px 0;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background: black;
  color: white;
  cursor: pointer;

  &:hover {
    background: #00ee9f;
  }
`;

const ViewImgContainer = styled.div`
  width: 100%;
  height: 400px;
`;

const SearchImg = styled.img`
  width: 100%;
  height: 100%;
`;


const MainModalInfoWindow = ({ closeModal, userClickInfo, formData, setFormData, userInfo }) => {

  const [imgUrl, setImgUrl] = useState(""); 
  const tempData = {
    "landmarkNo": 0,
    "writer": userInfo?.userId || "사용자",
    "landmarkAddress": userClickInfo.address_name,
    "landmarkName": userClickInfo.place_name || userClickInfo.address_name,
    "landmarkOrigin": true,
    "longitude": "0",
    "latitude": "0",
    "landmarkImgPath" : imgUrl,
    "landmarkDay" : 0
  }

  
  useEffect(() => {
    // 클릭한 위치를 검색해서 이미지 가져오기 함수
    searchData(userClickInfo.place_name)
    .then(res => setImgUrl(res));
  }, []);


  return (
    <>
      <Overlay onClick={() => closeModal()}>
        <Content onClick={(e) => e.stopPropagation()}>
          <Title>{userClickInfo.place_name}</Title>
          <CloseButton onClick={closeModal}><TfiClose /></CloseButton> {/* 닫기 버튼 추가 */}
          <Line />
          <ViewImgContainer> 
            {imgUrl ? <SearchImg src={imgUrl} alt="searchImg" /> : <img src='http://via.placeholder.com/640x480' />}
          </ViewImgContainer>
            <p>{userClickInfo.category_name}</p>
            <p>{userClickInfo.address_name}</p>
            <p>{userClickInfo.phone}</p>
          

          <SearchButton onClick={ async ()=>{
            const res = await handleMyTripSave(userClickInfo, userInfo?.userId, imgUrl);
            tempData.landmarkNo = res.landmarkNo;
            closeModal();
            setFormData([tempData,...formData]);
            }}>내 일정에 저장하기</SearchButton>
        </Content>
      </Overlay>
    </>
  );
};

export default MainModalInfoWindow;
