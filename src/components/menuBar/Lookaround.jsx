import React from 'react';
import styled from 'styled-components';
import Header from '../0.menuBar/Header';
import MenuBar from '../0.menuBar/MenuBar';

const Container = styled.div`
  display: flex;
  margin: 2% 0 0 10%;
  height: 50vh;
  box-sizing: border-box;
  margin-bottom: 20px; 
`;

const LeftContainer = styled.div`
  flex: 2;
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  flex: 3;
  background-color: #4a4a4a;
  margin-bottom: 20px;
`;

const TextContainer = styled.div`
  flex: 1;
  background-color: #ffffff;
  padding: 10px;
`;

const Description = styled.div`
  color: #777;
  font-size: 14px;
  margin-bottom: 10px;
`;

const Title = styled.div`
  color: #333;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
`;

const RightEmptyContainer = styled.div`
  flex: 1;
  background-color: #e4e4e4;
`;

const Lookaround = () => {
  return (
    <>
    <Header/>
      <Container>
        <LeftContainer>
          <ImageContainer />
          <TextContainer>
            <Title>대전 대청호 호수뷰 브런치맛집</Title>
            <Description>
              인원 / 여행지 / 날짜 (고정값)
              <br />
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to...
            </Description>
            <Footer>
              <div>♡100</div>
              <div>작성자 {`{ooo}`} 님</div>
            </Footer>
          </TextContainer>
        </LeftContainer>
        <RightEmptyContainer />
      </Container>

      <Container>
        <LeftContainer>
          <ImageContainer />
          <TextContainer>
            <Title>서울 강남역 맛집 투어</Title>
            <Description>
              인원 / 여행지 / 날짜 (고정값)
              <br />
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to...
            </Description>
            <Footer>
              <div>♡80</div>
              <div>작성자 {`{ppp}`} 님</div>
            </Footer>
          </TextContainer>
        </LeftContainer>
        <RightEmptyContainer />
      </Container>

      <Container>
        <LeftContainer>
          <ImageContainer />
          <TextContainer>
            <Title>부산 해운대 해수욕장</Title>
            <Description>
              인원 / 여행지 / 날짜 (고정값)
              <br />
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to...
            </Description>
            <Footer>
              <div>♡120</div>
              <div>작성자 {`{qqq}`} 님</div>
            </Footer>
          </TextContainer>
        </LeftContainer>
        <RightEmptyContainer />
      </Container>

      <Container>
        <LeftContainer>
          <ImageContainer />
          <TextContainer>
            <Title>제주도 바닷가 산책로</Title>
            <Description>
              인원 / 여행지 / 날짜 (고정값)
              <br />
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to...
            </Description>
            <Footer>
              <div>♡150</div>
              <div>작성자 {`{rrr}`} 님</div>
            </Footer>
          </TextContainer>
        </LeftContainer>
        <RightEmptyContainer />
      </Container>

      <Container>
        <LeftContainer>
          <ImageContainer />
          <TextContainer>
            <Title>경주 역사유적지 탐방</Title>
            <Description>
              인원 / 여행지 / 날짜 (고정값)
              <br />
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to...
            </Description>
            <Footer>
              <div>♡90</div>
              <div>작성자 {`{sss}`} 님</div>
            </Footer>
          </TextContainer>
        </LeftContainer>
        <RightEmptyContainer />
      </Container>
      <MenuBar/>
    </>
  );
};

export default Lookaround;
