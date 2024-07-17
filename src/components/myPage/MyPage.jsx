import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { MdOutlineEdit } from "react-icons/md";
import { HiStar } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Tagify from '@yaireo/tagify';
import '@yaireo/tagify/dist/tagify.css';
import MyPageProfile from "../modal/MyPageProfile"; 
import { USER_IMG, WISH_LIST } from "../../api/config";
import { getMyTravelListById } from "../../api/myTravelList/myTravelListAPI";

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

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
    margin: 20px auto;
  }
`;

const ProfileDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 20px;
  }
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
  border: solid 1px gray;
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
    font-size: 1.2rem; 
    border: none;
  }
`;

const BottomDiv = styled.div`
  width: 80%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  margin: 20px auto 10px;
  padding: 0 20px; 
  overflow-x: hidden;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 88%;
    flex-direction: column;
    align-items: center;
    margin: 10px auto;
    overflow-y: hidden;
  }
`;

const UserInfo = styled.div`
  width: 65%; /* Adjust the width as needed */

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  font-family: 'NEXON Lv1 Gothic OTF', sans-serif;
  margin-bottom: 10px;
`;

const CollectionBox = styled.div`
  width: 30%; /* Adjust the width as needed */

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 20px;
  }
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

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
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

  .tagify__tag {
    font-size: 14px; /* 크게 수정된 해시태그 크기 */
    padding: 5px 10px;
    margin: 3px;
    background-color: #93beff;
    color: white;
    border-radius: 5px;
    cursor: pointer;
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
  padding: 10px 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ScrapAndCourseItem = styled.div`
  width: 19%;
  height: 100px;
  background-color: gray;

  @media (max-width: 768px) {
    width: 80%;
    margin-bottom: 10px;
  }
`;

function MyPage() {
  const userInfo = useSelector(state => state.member.userInfo);

  const [isProfileEditModalOpen, setIsProfileEditModalOpen] = useState(false);
  const [myCourse, setMyCourse] = useState([]);
  const [hashtags, setHashtags] = useState(['자신만의', '태그들을', '입력해주세요']);
  const navigate = useNavigate();
  const tagifyRef = useRef();

  const handleProfileEditClick = () => {
    setIsProfileEditModalOpen(true);
  };

  // 고객센터 연결 클릭 핸들러
  const handleCustomerServiceClick = () => {
    navigate('/customerservice');
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getMyTravelListById(userInfo.userId);
      setMyCourse(response);
    }
    fetchData();
    if (tagifyRef.current) {
      const tagifyInstance = new Tagify(tagifyRef.current, {
        enforceWhitelist: true,
        whitelist: WISH_LIST,
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
          <ProfileImageBox image={userInfo ? userInfo.userProfileImagePath : USER_IMG}>
            <ProfileImage />
            <ProfileEdit>
              <EditIcon onClick={handleProfileEditClick} />
            </ProfileEdit>
          </ProfileImageBox>
          <span className="UserId"><HiStar color="#95D7FC" />{userInfo?.nickname} 님의 계정입니다</span>
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
            </ScrapAndCourseHeader>
            <ScrapAndCourseItems>
            </ScrapAndCourseItems>
          </ScrapAndCourseContainer>
          <ScrapAndCourseContainer>
            <ScrapAndCourseHeader>
              <span>내 코스 수</span>
            </ScrapAndCourseHeader>
            <ScrapAndCourseItems>
              {myCourse?.map(course => <ScrapAndCourseItem />)}
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

      {/* MyPageProfile 모달 */}
      {isProfileEditModalOpen && (
        <MyPageProfile
          closeModal={() => setIsProfileEditModalOpen(false)}
          userInfo={userInfo}
          setHashtags={setHashtags}
        />
      )}
    </Wrap>
  );
}

export default MyPage;
