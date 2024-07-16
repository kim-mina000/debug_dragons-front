import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
  width: 100%;
  height: 66%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
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
  `;




const MyTravelListCourse = ({courseList}) => {
  console.log(courseList);
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
        <StyledCircle key={location.courseNo}
          onMouseEnter={()=>{console.log(1)}}
          onMouseLeave={()=>{console.log(2)}}
        >
          <span>{location.landmarkName}</span>
        </StyledCircle>)}

      </LineContainer>
      <LineContainer
        style={{

        }}
      >
        {secondLine.map(location => <StyledCircle key={location.courseNo}><span>{location.landmarkName}</span></StyledCircle>)}
      </LineContainer>
      <LineContainer
        style={{
          bottom:0,
          right:0
        }}
      >
        {firstLine.map(location => <StyledCircle key={location.courseNo}><span>{location.landmarkName}</span></StyledCircle>)}
      </LineContainer>
    
    </Wrap>
  );
}

export default MyTravelListCourse;
