import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getShareTravelList } from '../../api/lookaround/lookaround';
import Comments from '../subpage/Comments';
import LikeLandmark from '../subpage/LikeLandmark';
import { useSelector } from 'react-redux';
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';
import { deleteBookmark, readBookmark, registerBookmark, toggleBookmark } from '../../api/bookmark/bookmarkAPI';

const Wrapper = styled.div`
  width: 100vw;
  margin: 2% 0 0 10%;
  margin-bottom: 8%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const Container = styled.div`
  display: flex;
  width: 90%;
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
  background-image: url(${props => props.img});
  background-repeat: no-repeat;
  background-size: cover;
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
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  margin-top: 10px;
  /* color: #999; */
`;

const RightEmptyContainer = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  background-color: #e4e4e4;
  /* position: absolute;
  right: 0; */
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

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  `;

const StyledBookmarkContainer = styled.div`
  font-size: 30px;
  cursor: pointer;
  padding: 5px;
`;

const Lookaround = () => {

  // 쉐어랜드마크오리진2번가져오기스테이트
  const [shareTravelList, setShareTravelList] = useState([]);
  const userInfo = useSelector(state => state.member.userInfo);
  const [clickBookmark, setClickBookmark] = useState([]);
  const [bookmarkList, setBookmarkList] = useState([]);


  // 검색어 상태 관리
  const [searchTerm, setSearchTerm] = useState('');

  // 검색어 입력 핸들러
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // 필터링된 컨텐츠를 반환하는 함수 (여기서는 단순 예시로 제목에 포함된 검색어로 필터링)
  const filteredContents = shareTravelList.filter((content) =>
    content.landmarkName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    content.landmarkAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
    content.landmarkShortDesc?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    content.landmarkDesc?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchShareTravelList = async () => {
      try {
        const response = await getShareTravelList();
        if (response) {
          setShareTravelList(response);
        }

        const response2 = await readBookmark(userInfo.userId);
        if (response2) {
          console.log(response2);
          const LandmarkList = response2.map(bookmark => bookmark.bookmarkNo);
          console.log(LandmarkList);
          setBookmarkList(LandmarkList); // 동작함
        }
      } catch (error) {
        console.error('랜드마크오리진2데이타에러' + error);
      }
    };
    fetchShareTravelList();
  }, []) // 배열안에 값만 넣어주면 update됨~!

  const hadBookmark = (landmark, myBookmarkList) => {
    for (let index = 0; index < myBookmarkList.length; index++) {
      if (landmark.landmarkNo === myBookmarkList[index]) {
        return true;
      } else {
        return false;
      }
    }
  }


  return (
    <>
      <Wrapper>
        {filteredContents.map((content, index) => (
          <Container key={index}>
            <LeftContainer>
              <ImageContainer img={content.landmarkImgPath} />
              <TextContainer>
                <TitleContainer>
                  <Title>{content.landmarkName}</Title>
                  <StyledBookmarkContainer>
                    {hadBookmark(content, bookmarkList) ?
                      <IoBookmark onClick={() => { deleteBookmark(content.landmarkNo, userInfo.userId) }} />
                      :
                      <IoBookmarkOutline onClick={() => { registerBookmark(content.landmarkNo, userInfo.userId) }} />}
                  </StyledBookmarkContainer>
                </TitleContainer>
                <p>{content.landmarkAddress}</p>
                <Description>{content.landmarkShortDesc}</Description>
                <hr />
                <Footer>
                  <LikeLandmark landmark={content} userId={userInfo?.userId} />
                  <div style={{ color: '#999' }}>작성자 {content.writer} 님</div>
                </Footer>
              </TextContainer>
            </LeftContainer>
            <RightEmptyContainer>
              <Comments landmark={content} />
            </RightEmptyContainer>
          </Container>
        ))}

        {/* 검색 입력란 */}
      </Wrapper>
      <SearchContainer>
        <SearchBox>
          <SearchInput
            placeholder="떠나고 싶은 지역을 검색해 보세요🔍"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </SearchBox>
      </SearchContainer>
    </>
  );
};

export default Lookaround;
