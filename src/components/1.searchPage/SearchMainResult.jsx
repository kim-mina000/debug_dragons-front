import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { handleDelete, handleSaveAll, landmarkResponse } from '../../api/map/map-result';
import { TfiClose } from "react-icons/tfi";

// 피그마에 색상 다른것처럼 표현 됬길래 팔레트임... 수정하기만 하면 됨
const colors = ['#B98CFF', '#8B7FE8', '#98A7FF', '#7FAAE8', '#8CD9FF'];

const Container = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  padding: 10px 15px 10px;
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

const Day = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const Time = styled.div`
  font-size: 16px;
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
`;

const Details = styled.div`
  font-size: 12px;
  color: #666;
`;


const SearchMainResult = ({formData, setFormData}) => {

  const [editDayIndex, setEditDayIndex] = useState(null);
  const [editTimeIndex, setEditTimeIndex] = useState(null);
  const [editDay, setEditDay] = useState('');
  const [editTime, setEditTime] = useState('');

  
  const userInfo = useSelector(state => state.member.userInfo);
  const userId = userInfo?.userId || "사용자";

  // const results = formData;

  useEffect(() => {

    landmarkResponse(userId)
    .then(res => setFormData(res));

  }, []);

  const sortResult = formData?.sort((a, b) => {
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

  const formatTime = (time) => {
    if (!time) {
      return ''; // 예외 처리: time이 null 또는 undefined인 경우 빈 문자열 반환
    }
    const [hours, minutes] = time.split(':').map(Number);
    return new Date(2024, 7, 8, hours, minutes).toLocaleTimeString('ko-KR', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  const handleDayChange = (e) => {
    setEditDay(e.target.value);
  };

  const handleTimeChange = (e) => {
    setEditTime(e.target.value);
  };

  const [editShortDescIndex, setEditShortDescIndex] = useState(null);
  const [editShortDesc, setEditShortDesc] = useState('');

  const handleShortDescChange = (e)=>{
    setEditShortDesc(e.target.value);
  };

  const handleSaveShortDescChange = (index) => {
    const updatedFormData = formData.map((item, i) =>
      i === index ? { ...item, landmarkShortDesc: editShortDesc } : item
    );
    setFormData(updatedFormData);
    setEditShortDescIndex(null);  //수정 완료 후 인덱스초기화
  };

  const handleEditShortDesc = (index, shotDesc) => {
    setEditShortDescIndex(index);
    setEditTime(shotDesc);
  };

  return (
    <>
      {formData?.map((result, index) => (
        <Container key={index} $bgColor={colors[index % colors.length]}>
          <Info>
            {/* 일자표시 */}
            {editDayIndex === index ? (
              <>
                <input type="text" value={editDay} onChange={handleDayChange} />
                <button type="button" onClick={() => handleSaveDay(index)}>저장</button>
              </>
            ) : (
              <Day onClick={() => handleEditDay(index, result.landmarkDay)}>{result.landmarkDay} 일차</Day>
            )}
            {/* 시간별 표시 */}
            {editTimeIndex === index ? (
              <>
                <input
                  type="time"
                  value={editTime}
                  onChange={handleTimeChange}
                />
                <button onClick={() => handleSaveTime(index)}>저장</button>
              </>
            ) : (
              <Time onClick={() => handleEditTime(index, result.landmarkTime)}>{result.landmarkTime}일정</Time>
            )}
          </Info>

          <Content>
            {/* 제목 */}
            <Title>{result.landmarkName}</Title>
            {/* 게시물 텍스트 */}
            {editShortDescIndex === index ?(
              <>
                <input type="text" value={editShortDesc} onChange={handleShortDescChange} />
                <button type="button" onClick={() => handleSaveShortDescChange(index)}>저장</button>
              </>
            ) :(
              <Description onClick={() => {handleEditShortDesc(index, result.landmarkShortDesc)}}>{result.landmarkShortDesc? result.landmarkShortDesc : '간단코멘트작성해주세요'}</Description>
            ) }
            {/* <Description>{result.landmarkShortDesc}</Description> */}
             {/* 인원 / 장소 / 날짜 << 고장값 설정 */}
            <Details>{result.writer}</Details>
          </Content>
          <TfiClose style={{cursor:"pointer"}} onClick={()=>{ handleDelete(result); setFormData(formData.filter(item => item.landmarkNo !== result.landmarkNo)); }} />
      </Container>
      ))}
      <button onClick={()=>{handleSaveAll(formData)}}>모든 데이터 저장</button>
    </>
  );
};

export default SearchMainResult;
