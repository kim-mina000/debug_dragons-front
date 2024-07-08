import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from "axios";

// 피그마에 색상 다른것처럼 표현 됬길래 팔레트임... 수정하기만 하면 됨
const colors = ['#B98CFF', '#8B7FE8', '#98A7FF', '#7FAAE8', '#8CD9FF'];

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 10px;
  width: auto;
  margin: 1.5%;
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
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const Description = styled.div`
  font-size: 14px;
  margin: 5px 0;
`;

const Details = styled.div`
  font-size: 12px;
  color: #666;
`;


const SearchMainResult = () => {

  const [formData, setFormData] = useState([{}]);

  useEffect(() => {
    const landmarkResponse = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/landmark/read`, formData);
        console.log(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error('error', error);
      }
    };
    landmarkResponse();
  }, []);

  // const results = [
  //   { day: '1일차', time: 'AM 00:00', title: formData[0].landmarkName, description: '', details: '인원 / 인천 구월동 / 2024.07 (고정값)' }
  // ];
  const results = formData;


  const sortResult = results.sort((a, b) => {
    if (a.day !== b.day) {
      return a.day.localeCompare(b.day);
    } else {
      return a.time.localeCompare(b.time);
    }
  });

  const [editDayIndex, setEditDayIndex] = useState(null);
  const [editTimeIndex, setEditTimeIndex] = useState(null);
  const [editDay, setEditDay] = useState('');
  const [editTime, setEditTime] = useState('');

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
      i === index ? { ...item, day: editDay } : item
    );
    setFormData(updatedFormData);
    setEditDayIndex(null);
  };

  const handleSaveTime = (index) => {
    const updatedFormData = formData.map((item, i) =>
      i === index ? { ...item, time: editTime } : item
    );
    setFormData(updatedFormData);
    setEditTimeIndex(null);
  };

  const handleDayChange = (e) => {
    setEditDay(e.target.value);
  };

  const handleTimeChange = (e) => {
    setEditTime(e.target.value);
  };

  return (
    <>
      {sortResult.map((result, index) => (
        <Container key={index} bgColor={colors[index % colors.length]}>
          <Info>
            {/* 일자표시 */}
            {/* <Day>{result.day}</Day> */}
            {editDayIndex === index ? (
              <>
                <input type="text" value={editDay} onChange={handleDayChange} />
                <button type="button" onClick={() => handleSaveDay(index)}>저장</button>
              </>
            ) : (
              <Day onClick={() => handleEditDay(index, result.day)}>{result.day} 일차</Day>
            )}
            {/* 시간별 표시 */}
            {/* <Time>{result.time}</Time> */}
            {editTimeIndex === index ? (
              <>
                <input
                  type="text"
                  value={editTime}
                  onChange={handleTimeChange}
                />
                <button onClick={() => handleSaveTime(index)}>저장</button>
              </>
            ) : (
              <Time onClick={() => handleEditTime(index, result.time)}>{result.time}일정</Time>
            )}
          </Info>

          <Content>
            {/* 제목 */}
            <Title>{result.landmarkName}</Title>
            {/* 게시물 텍스트 */}
            <Description>{result.description}</Description>
            {/* 인원 / 장소 / 날짜 << 고장값 설정 */}
            <Details>{result.writer}</Details>
          </Content>
        </Container>
      ))}
    </>
  );
};

export default SearchMainResult;
