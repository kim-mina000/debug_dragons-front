import styled from "styled-components";
import MenuBar from "../0.menuBar/MenuBar";
import { MdOutlineEdit } from "react-icons/md";
import { HiStar } from "react-icons/hi2";
import Header from "../0.menuBar/Header";
import { useState } from "react";
import MyPageProfile from "../modal/MyPageProfile";
import { getUserInfo, selectUser } from "../../features/member/memberSlice";
import { useSelector } from "react-redux";


const TopDiv = styled.div`
  width: 1200px;
  display: flex;
  margin: 70px auto 0;
`
const ProfileDiv = styled.div`
  width: 280px;
  height: 280px;
  margin-left: 135px;
  .UserId {
    font-size: 16px;
  }
`
const ProfileImage = styled.div`
  width: 225px;
  height: 225px;
  border-radius: 50%;
  background-color:#ccc;
  position: relative;
  margin-bottom: 10px;
`

const ProfileEdit = styled.div`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  border: 3px solid #ffffff;
  background-color:#ccc;
  position: absolute;
  bottom: 0;
  right: 0;

  .EditIcon {
    width: 45px;
    height: 45px;
    position: absolute;
    left: 10px;
    top: 10px;
    cursor: pointer;
  }
`

const HashScrap = styled.div`
  width: 700px;
  height: 275px;
  margin-left: 140px;
`

const HashTagBox = styled.div`
  width: 100%;
  height: 220px;
  font-size: 60px;
  .Tag {
    padding-bottom: 15px;
  }
`
const ScrapBox = styled.div`
  width: 640px;
  height: 25px;
  background-color: #CCC;
  font-size: 20px;  
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  padding: 15px 30px 0;
  font-family: 'NEXON Lv1 Gothic OTF', sans-serif;  
`

const BottomDiv = styled.div`
  width: 1200px;
  height: 450px;
  margin: 0 auto 10px;
  display: flex;
`

const UserInfo = styled.div`
  width: 700px;
  height: 420px;
  margin-right: 50px;
  `

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  font-family: 'NEXON Lv1 Gothic OTF', sans-serif;  
  `
const InfoContent = styled.div`
  width: 660px;
  height: 60px;
  padding: 0 20px;
  line-height: 60px;
  margin: 5px auto;
  font-size: 20px;
  background-color: #CCC;
`
const CollectionBox = styled.div`
  width: 450px;
  height: 420px;
  `
const PointDiv = styled.div`
  width: 390px;
  height: 60px;
  padding: 0 30px;
  margin: 10px 0;
  background-color: #CCC;
  font-size: 20px;
  line-height: 60px;
  display: flex;
  justify-content: space-between;

  :hover {
    cursor: pointer;
    color: #4e4e4e;
  }
`
const MyCollection = styled.div`
  width: 450px;
  height: 290px;
  margin-top: 10px;
  background-color: #CCC;

`

const CustomerServiceBox = styled.div`
  width: 1200px;
  height: 50px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  .CustomerService {
    margin: 0 75px;
  } 

  .CsDiv {
    :hover {
      cursor: pointer;
      color: #4e4e4e;
    }
  }
  
  .Information {
    :hover {
      cursor: pointer;
      color: #4e4e4e;
    }
  }
`


function MyPage() {
  const Member = useSelector(selectUser);
  console.log(Member);
  const [isProfileEditModalOpen, setIsProfileEditModalOpen] = useState(false);

  // 프로필 편집 모달 열기 핸들러
  const handleProfileEditClick = () => {
    setIsProfileEditModalOpen(true);
  };

  return (
    <>
      <Header />

      <TopDiv>
        <ProfileDiv>
          <ProfileImage>
            <ProfileEdit>
              <MdOutlineEdit
                className="EditIcon"
                onClick={handleProfileEditClick}
              />  
            </ProfileEdit>
          </ProfileImage>
          <span className="UserId"><HiStar color="#95D7FC" />{Member.userName} 님의 계정입니다</span>
        </ProfileDiv>
      <MenuBar/>

        <HashScrap>
          <HashTagBox>
            <div className="Tag">#애견동반</div>
            <div className="Tag">#드라이브여행</div>
            <div className="Tag">#풀빌라가있는 숙소</div>
          </HashTagBox>
          <ScrapBox>
            <span>스크랩 수 000</span>
            <span>내가 만든 코스 수 000</span>
            <span>내 트로피 수 001</span>
          </ScrapBox>
        </HashScrap>
      </TopDiv>
      <BottomDiv>
        <UserInfo>
          <Title>Course Follower</Title>
          <InfoContent>총 2148명이 함께 걷고 있어요!!</InfoContent>
          <Title>Event</Title>
          <InfoContent>2024 SUMMER 나랑 계곡 갈 사람?!</InfoContent>
          <Title>Share</Title>
          <InfoContent>친구 초대하고 트로피 받기!</InfoContent>
          <Title>Version</Title>
          <InfoContent>업데이트 1.0.0 ver</InfoContent>
        </UserInfo>
        <CollectionBox>
          <PointDiv>
            <div>💰 2190P</div>
            <div>내 포인트 내역 보기</div>
          </PointDiv>
          <Title>MyCollection</Title>
          <MyCollection></MyCollection>
        </CollectionBox>
      </BottomDiv>
        <CustomerServiceBox>
          <div className="CsDiv">
            <span className="CustomerService">자주 묻는 질문</span>
            <span className="CustomerService">1:1 카카오 문의</span>
            <span className="CustomerService">고객센터 연결</span>
          </div>
          <div className="Information">
            <span>이용약관/개인정보</span>
          </div>
        </CustomerServiceBox>

        {/* MyPageProfile 모달 */}
        {isProfileEditModalOpen && (
          <MyPageProfile
            closeModal={() => setIsProfileEditModalOpen(false)}
            Member = {Member}
          />
        )}
    </>
  );
};

export default MyPage;