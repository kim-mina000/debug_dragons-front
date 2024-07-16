import React, { useState } from 'react';
import styled from 'styled-components';
import route_back_img from '../../image/route_back_img.png'
import { searchData } from '../../api/map/map';

const Wrap = styled.div`
  width: 100%;
  height: 66%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background-image: url(${route_back_img});
  background-repeat: no-repeat;
  background-size: cover;
  `;

const LineContainer = styled.div`
  width: 70%;
  flex: 1;
  
  position: absolute;
  display: flex;
  justify-content: space-around;
  align-items: center;

  `;


const StyledCircle = styled.div`
  width: 30px;
  height: 30px;
  background-color: pink;
  border-radius: 50%;
  cursor: pointer;
  
  & span {
    position: absolute;
    top: 2rem;
    width: 100px;
    max-height: 2.1rem;

    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
    /* 근데이거 왜 단어단위로 안내려감.,, 짱나 */
  }
  `;

// const MyTravelListCourseModal = (landmark)=>{
//   const fetchImgUrl = async (landmark)=>{
//     const img_url = await searchData(landmark.landmarkName);
//     console.log(img_url);
//     return img_url;
//   }

//   const img_url = fetchImgUrl(landmark);
  
//   return (
//     <>
//       <img src={img_url} />
//     </>
//   );
// }




const MyTravelListCourse = ({courseList}) => {

  // const [handleOpenModal, setHandleOpenModal] = useState(true);

  if (!courseList || courseList.length === 0) {
    return <div>Loading...</div>;
  }

  const firstLine = [];
  const secondLine = [];
  const thirdLine = [];
  
  const listLength = Math.floor(courseList.length / 2);
  const remainder = courseList.length % 2;

  for (let index = 0; index < courseList.length; index++) {
    if (index >= 0 && index < listLength) {
      firstLine.push(courseList[index]);

    } else if (index >= listLength && index < listLength*2){
      secondLine.unshift(courseList[index]);

    } else {
      thirdLine.push(courseList[index]);
    }
  }


  return (
      <Wrap>
      <LineContainer 
      style={{
        top:0,
        left:0
      }}
      >
        {thirdLine.map(location =>
        <StyledCircle
          key={location.landmarkNo}
          // onMouseEnter={()=>{setHandleOpenModal(true)}}
          // onMouseLeave={()=>{setHandleOpenModal(false)}}
          >
          {/* {handleOpenModal && <MyTravelListCourseModal />} */}
          <span>{location.landmarkName}</span>
        </StyledCircle>)}

      </LineContainer>
      <LineContainer
        style={{

        }}
      >
        {secondLine.map(location => 
        <StyledCircle 
        key={location.landmarkNo}
        // onMouseEnter={()=>{setHandleOpenModal(true)}}
        // onMouseLeave={()=>{setHandleOpenModal(false)}}
        >
          {/* {handleOpenModal && <MyTravelListCourseModal />} */}
          <span>{location.landmarkName}</span>
        </StyledCircle>)}
      </LineContainer>
      <LineContainer
        style={{
          bottom:0,
          right:0
        }}
      >
        {firstLine.map(location => 
        <StyledCircle 
          key={location.landmarkNo}
          // onMouseEnter={()=>{console.log(location);}}
          // onMouseLeave={()=>{setHandleOpenModal(false)}}
        >
          {/* {handleOpenModal && <MyTravelListCourseModal />} */}
          <span>{location.landmarkName}</span>
        </StyledCircle>)}
      </LineContainer>
    
    </Wrap>
  );
}

export default MyTravelListCourse;
