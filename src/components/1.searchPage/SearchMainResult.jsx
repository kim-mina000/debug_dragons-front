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
    { day: '1일차', time: 'AM 00:00', title: '밥먹기', description: '하루 종일...', details: '인원 / 인천 구월동 / 2024.07 (고정값)' },
    
    { day: '1일차', time: 'AM 00:00', title: '놀기', description: '하루 종일...', details: '인원 / 인천 구월동 / 2024.06 (고정값)' },

    { day: '1일차', time: 'AM 00:00', title: '잠자기', description: '하루 종일...', details: '인원 / 인천 구월동 / 2024.04 (고정값)' },

    { day: '1일차', time: 'AM 00:00', title: '잠자기2', description: '하루 종일...', details: '인원 / 인천 남동구 / 2024.03 (고정값)' },

    { day: '1일차', time: 'AM 00:00', title: '집에,,,,보내줘....잘못했어요', description: '하루 종일...', details: '인원 / 인천 남동구 / 2023.09 (고정값)' },

    { day: '1일차', time: 'AM 00:00', title: '놀기', description: '하루 종일...', details: '인원 / 인천 구월동 / 2024.06 (고정값)' },

    { day: '1일차', time: 'AM 00:00', title: '잠자기', description: '하루 종일...', details: '인원 / 인천 구월동 / 2024.04 (고정값)' },

    { day: '1일차', time: 'AM 00:00', title: '잠자기2', description: '하루 종일...', details: '인원 / 인천 남동구 / 2024.03 (고정값)' },

    { day: '1일차', time: 'AM 00:00', title: '집에,,,,보내줘....잘못했어요', description: '하루 종일...', details: '인원 / 인천 남동구 / 2023.09 (고정값)' },

    { day: '1일차', time: 'AM 00:00', title: '살려주세요...', description: '하루 종일...', details: '인원 / 인천 부평구 / 2023.05 (고정값)' }
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
