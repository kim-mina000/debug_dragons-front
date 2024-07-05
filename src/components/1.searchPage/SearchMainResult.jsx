import React from 'react';
import styled from 'styled-components';

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
  const results = [
    { day: '1일차', time: 'AM 08:00', title: '공항 도착', description: '출발지에서 인천 공항 도착.', details: '인원 / 인천 구월동 / 2024.07 (고정값)' },
    
    { day: '1일차', time: 'AM 10:00', title: '비행기 탑승', description: '여행지로 출발.', details: '인원 / 인천 구월동 / 2024.07 (고정값)' },

    { day: '1일차', time: 'PM 12:00', title: '호텔 체크인', description: '호텔에 도착하여 체크인.', details: '인원 / 인천 구월동 / 2024.07 (고정값)' },

    { day: '1일차', time: 'PM 01:00', title: '점심 식사', description: '현지 맛집에서 점심 식사.', details: '인원 / 인천 구월동 / 2024.07 (고정값)' },

    { day: '1일차', time: 'PM 03:00', title: '관광 명소 방문', description: '주변 관광 명소 방문 및 사진 촬영.', details: '인원 / 인천 구월동 / 2024.07 (고정값)' },

    { day: '1일차', time: 'PM 06:00', title: '저녁 식사', description: '현지 레스토랑에서 저녁 식사.', details: '인원 / 인천 구월동 / 2024.07 (고정값)' },

    { day: '1일차', time: 'PM 08:00', title: '야경 구경', description: '도시 야경 감상.', details: '인원 / 인천 구월동 / 2024.07 (고정값)' },

    { day: '1일차', time: 'PM 10:00', title: '호텔 휴식', description: '호텔로 돌아와 휴식.', details: '인원 / 인천 구월동 / 2024.07 (고정값)' },

    { day: '2일차', time: 'AM 08:00', title: '아침 식사', description: '호텔에서 아침 식사.', details: '인원 / 인천 구월동 / 2024.07 (고정값)' },

    { day: '2일차', time: 'AM 10:00', title: '해변 방문', description: '해변에서 여유로운 시간.', details: '인원 / 인천 구월동 / 2024.07 (고정값)' },

    { day: '2일차', time: 'PM 12:00', title: '점심 식사', description: '해변 근처 레스토랑에서 점심.', details: '인원 / 인천 구월동 / 2024.07 (고정값)' },

    { day: '2일차', time: 'PM 02:00', title: '수상 스포츠', description: '해양 스포츠 체험.', details: '인원 / 인천 구월동 / 2024.07 (고정값)' },

    { day: '2일차', time: 'PM 06:00', title: '저녁 식사', description: '현지 음식점에서 저녁.', details: '인원 / 인천 구월동 / 2024.07 (고정값)' },

    { day: '2일차', time: 'PM 08:00', title: '밤 시장 탐방', description: '현지 밤 시장 구경.', details: '인원 / 인천 구월동 / 2024.07 (고정값)' },

    { day: '2일차', time: 'PM 10:00', title: '호텔 휴식', description: '호텔로 돌아와 휴식.', details: '인원 / 인천 구월동 / 2024.07 (고정값)' },

    { day: '3일차', time: 'AM 08:00', title: '아침 식사', description: '호텔에서 아침 식사.', details: '인원 / 인천 구월동 / 2024.07 (고정값)' },

    { day: '3일차', time: 'AM 10:00', title: '현지 마을 탐방', description: '현지 마을에서 문화 체험.', details: '인원 / 인천 구월동 / 2024.07 (고정값)' },

    { day: '3일차', time: 'PM 12:00', title: '점심 식사', description: '마을 식당에서 점심.', details: '인원 / 인천 구월동 / 2024.07 (고정값)' },

    { day: '3일차', time: 'PM 02:00', title: '자연 경관 탐험', description: '주변 자연 경관 탐험.', details: '인원 / 인천 구월동 / 2024.07 (고정값)' },

    { day: '3일차', time: 'PM 06:00', title: '저녁 식사', description: '현지 식당에서 저녁.', details: '인원 / 인천 구월동 / 2024.07 (고정값)' },

    { day: '3일차', time: 'PM 08:00', title: '문화 공연 관람', description: '현지 문화 공연 관람.', details: '인원 / 인천 구월동 / 2024.07 (고정값)' },

    { day: '3일차', time: 'PM 10:00', title: '호텔 휴식', description: '호텔로 돌아와 휴식.', details: '인원 / 인천 구월동 / 2024.07 (고정값)' },

    { day: '4일차', time: 'AM 08:00', title: '아침 식사', description: '호텔에서 아침 식사.', details: '인원 / 인천 구월동 / 2024.07 (고정값)' },

    { day: '4일차', time: 'AM 10:00', title: '기념품 쇼핑', description: '현지 기념품 쇼핑.', details: '인원 / 인천 구월동 / 2024.07 (고정값)' },

    { day: '4일차', time: 'PM 12:00', title: '점심 식사', description: '현지 레스토랑에서 점심.', details: '인원 / 인천 구월동 / 2024.07 (고정값)' },

    { day: '4일차', time: 'PM 02:00', title: '체크아웃 및 공항 이동', description: '호텔 체크아웃 후 공항 이동.', details: '인원 / 인천 구월동 / 2024.07 (고정값)' },

    { day: '4일차', time: 'PM 05:00', title: '비행기 탑승', description: '출발지로 돌아가는 비행기 탑승.', details: '인원 / 인천 구월동 / 2024.07 (고정값)' },

    { day: '4일차', time: 'PM 07:00', title: '귀가', description: '출발지 도착 및 귀가.', details: '인원 / 인천 구월동 / 2024.07 (고정값)' }

  ];

  return (
    <>
      {results.map((result, index) => (
        <Container key={index} bgColor={colors[index % colors.length]}>
          <Info>
            {/* 일자표시 */}
            <Day>{result.day}</Day>
            {/* 시간별 표시 */}
            <Time>{result.time}</Time>
          </Info>

          <Content>
            {/* 제목 */}
            <Title>{result.title}</Title>
            {/* 게시물 텍스트 */}
            <Description>{result.description}</Description>
            {/* 인원 / 장소 / 날짜 << 고장값 설정 */}
            <Details>{result.details}</Details>
          </Content>
        </Container>
      ))}
    </>
  );
};

export default SearchMainResult;
