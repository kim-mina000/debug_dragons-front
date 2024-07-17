import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import SearchMainResult from '../1.searchPage/SearchMainResult';
import { getLandmarkInfo, getMyTravelListDetail, postShareMyLandmark, uploadMyImg } from '../../api/myTravelList/myTravelListAPI';
import MyTravelListCourse from './MyTravelListCourse';
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from 'react-icons/io';

const WrapContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  ${props => props.handleShare &&
    css`
    background: rgba(0, 0, 0, 0.5);
    z-index: 5;
  `
  }
`;

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
  /* position: absolute;
  top: 40px;
  left: 95px; */
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  z-index: 8;
`;

const ImgContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1050px;
  max-height: 500px;
  background-image: url(${props => props.img});
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  cursor: pointer;
  `;

const Img = styled.div`
  backdrop-filter: blur(10px);
  width: 100%;
  height: 100%;
  max-width: 1050px;
  max-height: 500px;
  background-image: url(${props => props.img});
  background-repeat: no-repeat;
  background-size: contain;
  position: absolute;
  text-align: center;
`;

const DetailsContainer = styled.div`
  flex: 1.5;
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
`;

const PhotoTextContainer = styled.div`

  flex: 3;
  background-color: #f4f4f4;
  padding: 20px;
`;

const RouteContainer = styled.div`
  flex: 2;
  /* background-color: #e4e4e4; */
  padding: 20px;
`;

const SaveButton = styled.button`
  z-index: 8;
  flex:1;
  border: none;
  background-color: #8fa4bfc4;
  padding: 10px 20px;
  font-size: 1.2rem;
  margin: 1%;
  border-radius: 5px; 
  cursor: pointer; 
  font-family: 'MaplestoryOTFBold';
  
  &:hover {
    background-color: #7289a1; 
  }
`;

const MyTravelListDetail = () => {
  const navigate = useNavigate();
  const { no } = useParams();
  // 코스-매핑 리스트 LCMappingList
  const [courseList, setCourseList] = useState(null);
  const [handleShare, setHandleShare] = useState(false);
  const [selectedShareLandmark, setSelectedShareLandmark] = useState([]);


  const [showClickedLandmark, setShowClickedLandmark] = useState({});
  const [imgClicked, setImgClicked] = useState(false);
  const [newImg, setNewImg] = useState(null);
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const myCourseList = await getMyTravelListDetail(no);
        if (!myCourseList) {
          return;
        }
        const promises = await myCourseList.map(landmark => getLandmarkInfo(landmark.landmarkNo));
        const landmarkList = await Promise.all(promises);
        setCourseList(landmarkList);
        console.log(landmarkList);
        setSelectedShareLandmark(landmarkList.filter(landmark => landmark.landmarkOrigin === 2));
      } catch (error) {
        console.error(error);
      };
    };
    fetchData();
    return () => {
      setHandleShare(false);
    }


  }, [showClickedLandmark]);

  const handleShareClick = () => {
    postShareMyLandmark(selectedShareLandmark);
    setHandleShare(false);
    alert('공유되었습니다\n좋은 여행지 추천 감사해요!');
  }

  const handleImgClicked = async (e,landmarkNo) => {

    const file = e.target.files[0];
    setImgClicked(file);

    const reader = new FileReader();

    reader.onloadend = () => {
      setShowClickedLandmark({...showClickedLandmark,'landmarkImgPath': reader.result})
    };

    if (file) {
      reader.readAsDataURL(file);

    }
    
    const img_url = uploadMyImg(file,landmarkNo);
    setShowClickedLandmark({...showClickedLandmark,'landmarkImgPath': img_url})      
    
  };


  return (
    <Container >
      <WrapContainer handleShare={handleShare} />
      <SearchContainer>
        <ButtonContainer>
          <BackButton onClick={() => (handleShare ? handleShareClick() : navigate('/main/MyTravelList'))}>
            {handleShare ? '공유하기' : '뒤로가기'}
          </BackButton>
          <SaveButton onClick={() => { setHandleShare(!handleShare) }}>{handleShare ? '공유하지 않기' : '내 여행지 공유하기'}</SaveButton>
        </ButtonContainer>
        {courseList ? <SearchMainResult

        handleShare={handleShare} formData={courseList} setFormData={setCourseList} 
        selectedShareLandmark={selectedShareLandmark}
        setSelectedShareLandmark={setSelectedShareLandmark}
        setShowClickedLandmark={setShowClickedLandmark}

        /> : <p>Loading...</p>}
      </SearchContainer>

      <DetailsContainer>
        <PhotoTextContainer>
          <IoIosArrowRoundBack />
          <div>
            사진 / 글
          </div>

          <>
          <label htmlFor="profileImageUpload">
          <ImgContainer img={showClickedLandmark.landmarkImgPath}>
          {imgClicked ? (
            <Img src={imgClicked} alt="Profile" />
            ) : (
            "클릭해서 내 사진으로 바꾸기"
          )}
          <Img img={showClickedLandmark.landmarkImgPath}/>
          </ImgContainer>
          </label>
          <input
            type="file"
            id="profileImageUpload"
            style={{ display: 'none' }}
            onChange={handleImgClicked}
            />
          </>

          <IoIosArrowRoundForward />
        </PhotoTextContainer>
        <RouteContainer>
          <p>경로</p>
          <MyTravelListCourse courseList={courseList} />
        </RouteContainer>
      </DetailsContainer>
    </Container>
  );
}

export default MyTravelListDetail;
