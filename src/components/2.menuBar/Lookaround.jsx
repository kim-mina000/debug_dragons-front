import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 2% 0 0 10%;
  margin-bottom: 8%;
`;

const Container = styled.div`
  display: flex;
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

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  position: fixed;
  width: 56%;
  bottom: 9%;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  background-color: #d0d0d0;
  border-radius: 20px;
  padding: 10px 20px;
  width: 80%;
`;

const SearchInput = styled.input`
  border: none;
  background: transparent;
  outline: none;
  font-size: 16px;
  flex: 1;
  margin-left: 10px;
`;

const Lookaround = () => {
  // 예시 데이터
  const contents = [
    {
      title: '대전 대청호 호수뷰 브런치맛집',
      description:
        '인원 / 여행지 / 날짜 (고정값) \nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to...',
      likes: '♡100',
      author: 'ooo',
    },
    {
      title: '서울 강남역 맛집 투어',
      description:
        '인원 / 여행지 / 날짜 (고정값) \nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to...',
      likes: '♡80',
      author: 'ppp',
    },
    {
      title: '부산 해운대 해수욕장',
      description:
        '인원 / 여행지 / 날짜 (고정값) \nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to...',
      likes: '♡120',
      author: 'qqq',
    },
    {
      title: '제주도 바닷가 산책로',
      description:
        '인원 / 여행지 / 날짜 (고정값) \nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to...',
      likes: '♡150',
      author: 'rrr',
    },
    {
      title: '경주 역사유적지 탐방',
      description:
        '인원 / 여행지 / 날짜 (고정값) \nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to...',
      likes: '♡90',
      author: 'sss',
    },
  ];

  // 검색어 상태 관리
  const [searchTerm, setSearchTerm] = useState('');

  // 검색어 입력 핸들러
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // 필터링된 컨텐츠를 반환하는 함수 (여기서는 단순 예시로 제목에 포함된 검색어로 필터링)
  const filteredContents = contents.filter((content) =>
    content.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Wrapper>
        {filteredContents.map((content, index) => (
          <Container key={index}>
            <LeftContainer>
              <ImageContainer />
              <TextContainer>
                <Title>{content.title}</Title>
                <Description>{content.description}</Description>
                <Footer>
                  <div>{content.likes}</div>
                  <div>작성자 {content.author} 님</div>
                </Footer>
              </TextContainer>
            </LeftContainer>
            <RightEmptyContainer />
          </Container>
        ))}
        
        {/* 검색 입력란 */}
        <SearchContainer>
          <SearchBox>
            <SearchInput
              placeholder="떠나고 싶은 지역을 검색해 보세요🔍"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </SearchBox>
        </SearchContainer>
      </Wrapper>
    </>
  );
};

export default Lookaround;
