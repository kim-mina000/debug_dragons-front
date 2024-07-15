import styled from "styled-components";
import { MdOutlineEdit } from "react-icons/md";
import { HiStar } from "react-icons/hi2";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Tagify from '@yaireo/tagify';
import '@yaireo/tagify/dist/tagify.css';

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

const TopDiv = styled.div`
  width: 1200px;
  display: flex;
  justify-content: space-between;
  margin: 30px auto 0;
`;

const ProfileDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
  .UserId {
    font-size: 16px;
  }
`;

const ProfileImageBox = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  position: relative;
  margin-bottom: 10px;
  background-size: cover;
  background-position: center;
  background-image: url(${props => props.image});
`;

const ProfileImage = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-image: url(${props => props.image});
  background-size: cover;
`;

const ProfileEdit = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #ffffff;
  background-color: #ccc;
  position: absolute;
  bottom: 0;
  right: 0;
`;

const EditIcon = styled(MdOutlineEdit)`
  width: 24px;
  height: 24px;
  position: absolute;
  left: 8px;
  top: 8px;
  cursor: pointer;
`;

const HashScrap = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

const HashTagBox = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .tagify {
    width: 100%;
    max-width: 700px;
    font-size: 1.6rem;
    border: none;
  }
`;

const BottomDiv = styled.div`
  width: 1200px;
  display: flex;
  justify-content: space-between;
  margin: 20px auto 10px;
`;

const UserInfo = styled.div`
  width: 65%; /* Adjust the width as needed */
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  font-family: 'NEXON Lv1 Gothic OTF', sans-serif;
  margin-bottom: 10px;
`;

const CollectionBox = styled.div`
  width: 30%; /* Adjust the width as needed */
`;

const MyCollection = styled.div`
  width: 100%;
  height: 290px;
  margin-top: 10px;
  background-color: #f0f0f0;
  border-radius: 10px;
`;

const CustomerServiceBox = styled.div`
  width: 100%;
  margin: 3% auto 20px;
  display: flex;
  justify-content: center;
  gap: 10rem;
  align-items: center;
  font-size: 14px;
  text-align: center;

  .CustomerService,
  .Information {
    padding: 10px;
    border-radius: 5px;
    :hover {
      cursor: pointer;
    }
  }
`;

const VersionText = styled.span`
  color: #4e4e4e;
  font-size: 14px;
  font-weight: bold;
`;

const TagifyStyled = styled.input.attrs({ className: 'tagify' })`
  &.tagify {
    width: 100%;
    max-width: 700px;
  }

  .tags-look .tagify__dropdown__item {
    display: inline-block;
    border-radius: 3px;
    padding: .3em .5em;
    border: 1px solid #CCC;
    background: #F3F3F3;
    margin: .2em;
    font-size: .85em;
    color: black;
    transition: 0s;
  }

  .tags-look .tagify__dropdown__item--active {
    color: black;
  }

  .tags-look .tagify__dropdown__item:hover {
    background: lightyellow;
    border-color: gold;
  }
`;

const ScrapAndCourseContainer = styled.div`
  width: 100%;
  background-color: #93beff;
  border-radius: 10px;
  margin: 10px 0;
  padding: 10px;
`;

const ScrapAndCourseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  padding: 10px 20px;
`;

const ScrapAndCourseItems = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
`;

const ScrapAndCourseItem = styled.div`
  width: 19%;
  height: 100px;
  background-color: gray;
`;

function MyPage() {
  const userInfo = useSelector(state => state.member.userInfo);
  const [isProfileEditModalOpen, setIsProfileEditModalOpen] = useState(false);
  const [hashtags, setHashtags] = useState(['자신만의', '태그들을', '입력해주세요']);
  const navigate = useNavigate();
  const tagifyRef = useRef();

  const handleProfileEditClick = () => {
    setIsProfileEditModalOpen(true);
  };

  const handleCustomerServiceClick = () => {
    navigate('/customerservice');
  };

  useEffect(() => {
    if (tagifyRef.current) {
      const tagifyInstance = new Tagify(tagifyRef.current, {
        enforceWhitelist: true,
        whitelist: [
          "반려견",
          "반려견 동반",
          "물또라이",
          "수영장",
          "수영",
          "물놀이",
          "물좋아",
          "물",
          "자기자동차있음",
          "여행",
          "강아지",
          "대형견",
          "소형견",
          "밍고",
          "시리",
          "마리",
          "하루",
          "현아",
          "지연",
          "민아",
          "여행",
          "트레킹",
          "캠핑",
          "백패킹",
          "국내여행",
          "해외여행",
          "호캉스",
          "바캉스",
          "허니문",
          "해수욕",
          "스노클링",
          "다이빙",
          "서핑",
          "스키",
          "스노우보드",
          "낚시",
          "하이킹",
          "등산",
          "산행",
          "클라이밍",
          "카약",
          "라프팅",
          "보트",
          "크루즈",
          "자전거",
          "모터사이클",
          "드라이브",
          "트래킹",
          "워킹홀리데이",
          "숙박",
          "호텔",
          "리조트",
          "펜션",
          "에어비앤비",
          "유스호스텔",
          "캠핑카",
          "텐트",
          "글램핑",
          "무술년"
        ],
        maxTags: 10,
        dropdown: {
          maxItems: 20,
          classname: "tags-look",
          enabled: 0,
          closeOnSelect: false
        }
      });

      tagifyInstance.on('add', (e) => {
        setHashtags(tagifyInstance.value.map(tagData => tagData.value));
      });
      tagifyInstance.on('remove', (e) => {
        setHashtags(tagifyInstance.value.map(tagData => tagData.value));
      });
    }
  }, []);

  return (
    <Wrap>
      <TopDiv>
        <ProfileDiv>
          <ProfileImageBox image={userInfo.userProfileImagePath}>
            <ProfileImage />
            <ProfileEdit>
              <EditIcon onClick={handleProfileEditClick} />
            </ProfileEdit>
          </ProfileImageBox>
          <span className="UserId"><HiStar color="#95D7FC" />{userInfo.nickname} 님의 계정입니다</span>
        </ProfileDiv>

        <HashScrap>
          <HashTagBox>
            <TagifyStyled
              name='tags'
              placeholder='자신만의 태그를 입력해보세요!!!'
              value={hashtags.join(', ')}
              ref={tagifyRef}
            />
          </HashTagBox>
        </HashScrap>
      </TopDiv>

      <BottomDiv>
        <UserInfo>
          <ScrapAndCourseContainer>
            <ScrapAndCourseHeader>
              <span>내 스크랩 수</span>
              <span>00</span>
            </ScrapAndCourseHeader>
            <ScrapAndCourseItems>
              <ScrapAndCourseItem />
              <ScrapAndCourseItem />
              <ScrapAndCourseItem />
              <ScrapAndCourseItem />
              <ScrapAndCourseItem />
            </ScrapAndCourseItems>
          </ScrapAndCourseContainer>
          <ScrapAndCourseContainer>
            <ScrapAndCourseHeader>
              <span>내 코스 수</span>
              <span>00</span>
            </ScrapAndCourseHeader>
            <ScrapAndCourseItems>
              <ScrapAndCourseItem />
              <ScrapAndCourseItem />
              <ScrapAndCourseItem />
              <ScrapAndCourseItem />
              <ScrapAndCourseItem />
            </ScrapAndCourseItems>
          </ScrapAndCourseContainer>
        </UserInfo>

        <CollectionBox>
          <Title>My Collection</Title>
          <MyCollection />
        </CollectionBox>
      </BottomDiv>

      <CustomerServiceBox>
        <span className="CustomerService">
          자주 묻는 질문
        </span>
        <span className="CustomerService">
          1:1 카카오 문의
        </span>
        <span className="CustomerService" onClick={handleCustomerServiceClick}>
          고객센터 연결
        </span>
        <span className="Information" onClick={() => navigate('/terms-privacy')}>
          이용약관/개인정보
        </span>
        <span className="CustomerService">
          업데이트 <VersionText>1.0.0 ver</VersionText>
        </span>
      </CustomerServiceBox>
    </Wrap>
  );
}

export default MyPage;
