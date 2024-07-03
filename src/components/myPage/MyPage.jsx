import styled from "styled-components";
import MenuBar from "../0.menuBar/MenuBar";
import { MdOutlineEdit } from "react-icons/md";
import { HiStar } from "react-icons/hi2";
import Header from "../0.menuBar/Header";


const TopDiv = styled.div`
  width: 1200px;
  display: flex;
  margin: 70px auto 0;
  border: 3px solid #CCC;
`
const ProfileDiv = styled.div`
  width: 280px;
  height: 280px;
  border: 3px solid #CCC;

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
  border: 3px solid #CCC;
`

const HashTagBox = styled.div`
  width: 100%;
  height: 220px;
  font-size: 60px;
  .Tag {
    padding-bottom: 10px;
  }
`
const ScrapBox = styled.div`
  width: 640px;
  height: 25px;
  font-size: 20px;  
  margin-top: 10px;
  background-color: #CCC;
  display: flex;
  justify-content: space-between;
  padding: 15px 30px 0;
  font-family: 'NEXON Lv1 Gothic OTF', sans-serif;  
`

const BottomDiv = styled.div`
  width: 1200px;
  height: 450px;
  border: 3px solid #CCC;
  margin: 0 auto;
  display: flex;
`

const UserInfo = styled.div`
  width: 700px;
  height: 420px;
  margin-right: 44px;
  border: 3px solid #CCC;
`

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  font-family: 'NEXON Lv1 Gothic OTF', sans-serif;  
`
const InfoContent = styled.div`
  width: 700px;
  height: 70px;
  line-height: 70px;
  font-size: 20px;
`
const CollectionBox = styled.div`
  width: 450px;
  height: 420px;
  border: 3px solid #CCC;
`
const PointDiv = styled.div`
  width: 450px;
  height: 70px;
  border: 3px solid #CCC;
  margin-bottom: 10px;
`
const MyCollection = styled.div`
  width: 450px;
  height: 280px;
  border: 3px solid #CCC;
  margin-top: 10px;
`

const CustomerService = styled.div`
  width: 1200px;
  height: 70px;
  margin: 0 auto;
  border: 3px solid #CCC;
`

function MyPage() {
  return (
    <>
      <Header />

      <TopDiv>
        <ProfileDiv>
          <ProfileImage>
            <ProfileEdit>
              <MdOutlineEdit className="EditIcon"/>  
            </ProfileEdit>
          </ProfileImage>
          <span><HiStar color="#95D7FC" />dahun_town 님의 계정입니다</span>
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
          <InfoContent>업데이트 1.0.0 ver.</InfoContent>
        </UserInfo>
        <CollectionBox>
          <PointDiv></PointDiv>
          <Title>MyCollection</Title>
          <MyCollection></MyCollection>
        </CollectionBox>
      </BottomDiv>
        <CustomerService></CustomerService>
    </>
  );
};

export default MyPage;