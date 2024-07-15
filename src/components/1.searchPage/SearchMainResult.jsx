import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { getLandmarkResponse, handleDelete, handleSaveAll } from '../../api/map/map-result';
import { TfiClose } from "react-icons/tfi";

// 피그마에 색상 다른것처럼 표현 됬길래 팔레트임... 수정하기만 하면 됨
const colors = ['#D5ECFA','#D5ECFA', '#a4dcff', '#a4dcff', '#79ccff', '#79ccff', '#2f86ff', '#2f86ff', '#006aff', '#006aff', '#2f44ff', ];

const Container = styled.div`
  height: auto;
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: ${({ $bgColor }) => $bgColor};
  border-radius: 10px;
  width: auto;
  margin: 1.5%;
  justify-content: space-between;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
`;

const EditableField = styled.div`
  display: flex;
  align-items: center;
`;

const EditInput = styled.input`
  font-size: 18px;
  margin-right: 10px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Day = styled.div`
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
`;

const Time = styled.div`
  font-size: 16px;
  cursor: pointer;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const Description = styled.div`
  font-size: 14px;
  margin: 5px 0;
  height: 30px;
  cursor: pointer;
`;

const Details = styled.div`
  font-size: 12px;
  color: #666;
`;

// "모든 데이터 저장" 버튼 스타일 컴포넌트
const SaveButton = styled.button`
  border: none;
  background-color: #8fa4bfc4;
  font-size: 1.2rem;
  margin: 1%;
  padding: 1%;
  border-radius: 5px; 
  cursor: pointer; 
  font-family: 'MaplestoryOTFBold';
  
  &:hover {
    background-color: #7289a1; 
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 1.5%;
  `;

const SearchMainResult = ({ formData, setFormData, selectedPlaceButtons, selectedDateButtons, selectedPersonButtons }) => {
  console.log(selectedPersonButtons);
  const [editDayIndex, setEditDayIndex] = useState(null);
  const [editTimeIndex, setEditTimeIndex] = useState(null);
  const [editDay, setEditDay] = useState('');
  const [editTime, setEditTime] = useState('');
  const [editShortDescIndex, setEditShortDescIndex] = useState(null);
  const [editShortDesc, setEditShortDesc] = useState('');

  // useEffect(() => {
  //   getLandmarkResponse(userId).then(res => console.log(res));
  // }, [userId]);


  useEffect(() => {
    if (formData) {
      const sortResult = formData.sort((a, b) => {
        const dayA = (typeof a.landmarkDay === 'number') ? a.landmarkDay : Number(a.landmarkDay);
        const dayB = (typeof b.landmarkDay === 'number') ? b.landmarkDay : Number(b.landmarkDay);

        if (dayA !== dayB) {
          return dayA - dayB;
        } else {
          const timeA = (typeof a.landmarkTime === 'string') ? a.landmarkTime : String(a.landmarkTime);
          const timeB = (typeof b.landmarkTime === 'string') ? b.landmarkTime : String(b.landmarkTime);
          return timeA.localeCompare(timeB);
        }
      });
      setFormData(sortResult);
    }
  }, [formData, setFormData]);

  const handleEditDay = (index, day) => {
    setEditDayIndex(index);
    setEditDay(day);
  };

  const handleEditTime = (index, time) => {
    setEditTimeIndex(index);
    setEditTime(time);
  };

  const handleSaveDay = (index) => {
    const updatedFormData = formData.map((item, i) =>
      i === index ? { ...item, landmarkDay: editDay } : item
    );
    setFormData(updatedFormData);
    setEditDayIndex(null);
  };

  const handleSaveTime = (index) => {
    const updatedFormData = formData.map((item, i) =>
      i === index ? { ...item, landmarkTime: editTime } : item
    );
    setFormData(updatedFormData);
    setEditTimeIndex(null);
  };

  const handleSaveShortDescChange = (index) => {
    const updatedFormData = formData.map((item, i) =>
      i === index ? { ...item, landmarkShortDesc: editShortDesc } : item
    );
    setFormData(updatedFormData);
    setEditShortDescIndex(null);
  };

  const handleEditShortDesc = (index, shortDesc) => {
    setEditShortDescIndex(index);
    setEditShortDesc(shortDesc);
  };

  const handleKeyPress = (e, index, saveFunction) => {
    if (e.key === 'Enter') {
      saveFunction(index);
    }
  };

  const family = selectedPersonButtons.adults + selectedPersonButtons.children + selectedPersonButtons.infants + selectedPersonButtons.pets

  return (
    <>
      {formData.map((result, index) => (
        <Container key={index} $bgColor={colors[index % colors.length]}>
          <Info>
            {/* 일자표시 */}
            {editDayIndex === index ? (
              <EditableField>
                <EditInput 
                  type="text" 
                  value={editDay} 
                  onChange={(e) => setEditDay(e.target.value)} 
                  onBlur={() => handleSaveDay(index)} 
                  onKeyPress={(e) => handleKeyPress(e, index, handleSaveDay)} 
                  autoFocus 
                />
              </EditableField>
            ) : (
              <Day onClick={() => handleEditDay(index, result.landmarkDay)}>{result.landmarkDay} 일차</Day>
            )}
            {/* 시간별 표시 */}
            {editTimeIndex === index ? (
              <EditableField>
                <EditInput
                  type="time"
                  value={editTime}
                  onChange={(e) => setEditTime(e.target.value)}
                  onBlur={() => handleSaveTime(index)}
                  onKeyPress={(e) => handleKeyPress(e, index, handleSaveTime)}
                  autoFocus
                />
              </EditableField>
            ) : (
              <Time onClick={() => handleEditTime(index, result.landmarkTime)}>{result.landmarkTime} 일정</Time>
            )}
          </Info>

          <Content>
            {/* 제목 */}
            <Title>{result.landmarkName}</Title>
            {/* 게시물 텍스트 */}
            {editShortDescIndex === index ? (
              <EditableField>
                <EditInput 
                  type="text" 
                  value={editShortDesc} 
                  onChange={(e) => setEditShortDesc(e.target.value)} 
                  onBlur={() => handleSaveShortDescChange(index)} 
                  onKeyPress={(e) => handleKeyPress(e, index, handleSaveShortDescChange)} 
                  autoFocus 
                />
              </EditableField>
            ) : (
              <Description onClick={() => handleEditShortDesc(index, result.landmarkShortDesc)}>
                {result.landmarkShortDesc ? result.landmarkShortDesc : '간단 코멘트 작성해주세요'}
              </Description>
            )}
            {/* 인원 / 장소 / 날짜 */}
            {/* t수정중 */}
            <Details>{result.writer} : {selectedPlaceButtons}, {selectedDateButtons}, 인원: {family} </Details>
          </Content>
          <TfiClose style={{ cursor: "pointer" }} onClick={() => { handleDelete(result); setFormData(formData.filter(item => item.landmarkNo !== result.landmarkNo)); }} />
        </Container>
      ))}
      <ButtonContainer>
        <SaveButton onClick={() => { handleSaveAll(formData) }}>모든 데이터 저장</SaveButton>
      </ButtonContainer>
    </>
  );
};

export default SearchMainResult;
