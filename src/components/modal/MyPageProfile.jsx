import styled from 'styled-components';
import { IoClose } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Overlay가 가장 위에 있도록 설정 */
`;

const Content = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 710px;
  height: 930px;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 1010; 
  /* Content가 Overlay보다 더 위에 있도록 설정 */
`;

const ModalHeader = styled.div`
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #000;
  font-size: 32px;
  text-align: center;
  line-height: 50px;

  .CloseButton {
    position: absolute;
    top: 15px;
    right: 15px;
    background: transparent;
    border: none;
    font-size: 50px;
    cursor: pointer;
  }
`
const TopEdit = styled.div`
  width: 100%;
  height: 290px;
  border-bottom: 1px solid #000;
  display: flex;
`
const TopLeft = styled.div`
  width: 350px;
  height: 290px;
`
const ProfileImage = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color:#ccc;
  margin-top: 30px;
  margin-left: 75px;
  margin-bottom: 20px;
`
const EditImage = styled.span`
  font-size: 20px;
  color: blue;
  cursor: pointer;
`
const TopRight = styled.div`
  width: 360px;
  height: 300px;
  line-height: 300px;
  .EditIcon {
    padding-left: 20px;
    cursor: pointer;
  }
`
const ProfileNickname = styled.h1`
  font-size: 44px;
  font-weight: bold;  
`
const MiddleEdit = styled.div`
  width: 100%;
  height: 480px;
  border-bottom: 1px solid #000;
  display: flex;
`
const MiddleLeft = styled.div`
  width: 370px;
  height: 460px;
  margin: 10px 0;
  border-right: 1px solid #000;
`
const TagEdit = styled.div`
  width: 365px;
  height: 240px;
  border: 1px solid #000;
`
const WithAttiBus = styled.div`
  width: 330px;
  height: 200px;
  border: 1px solid #000;
  border-radius: 35px;
  margin: 20px 0;
`
const MiddleRight = styled.div`
  width: 330px;
  height: 460px;
  margin: 10px 0 10px 10px;
`
const InforTitle = styled.div`
  font-size: 15px;
  font-family: 'NEXON Lv1 Gothic OTF', sans-serif;
  text-align: left;
  margin: 5px 0;
  `

const InforContent = styled.input`
  width: 300px;
  height: 45px;
  font-size: 24px;
  padding: 0 15px;
  background-color: #CCC;
  border: none;
  `

const LastVisit = styled.div`
  width: 300px;
  height: 150px;
  margin: 15px 0;
  text-align: left;
  line-height: 240px;
  `
const BottomEdit = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: end;
  justify-content: end;
`
const Complete = styled.button`
  width: 250px;
  height: 70px;
  background-color: #000;
  color: #fff;
  border-radius: 15px;
  font-size: 32px;
  margin-top: 15px;
  cursor: pointer;
`

function MyPageProfile(props) {
  const { closeModal } = props;

  return (
    <Overlay>
      <Content>
          <ModalHeader>
          프로필 편집
          <IoClose
            className="CloseButton"
            onClick={closeModal}
          />
        </ModalHeader>
        <TopEdit>
          <TopLeft>
            <ProfileImage/>
            <EditImage>프로필 사진 수정</EditImage>
          </TopLeft>
          <TopRight>
            <ProfileNickname>
              dahun_town
              <FaEdit className='EditIcon' />
            </ProfileNickname>  
          </TopRight>  
        </TopEdit>
        <MiddleEdit>
          <MiddleLeft>
            <TagEdit>

            </TagEdit>
            <WithAttiBus>

            </WithAttiBus>
          </MiddleLeft>
          <MiddleRight>
            <InforTitle>이름</InforTitle>
            <InforContent />
            <InforTitle>생년월일</InforTitle>
            <InforContent placeholder='0000.00.00' />
            <InforTitle>핸드폰번호</InforTitle>
            <InforContent placeholder='000-0000-0000' />
            <InforTitle>이메일주소</InforTitle>
            <InforContent placeholder='abc123@mail.com' />
            <LastVisit>
              최근방문일 : 0000-00-00
            </LastVisit>
          </MiddleRight>
        </MiddleEdit>
        <BottomEdit>
          <Complete>수정하기</Complete>
        </BottomEdit>
      </Content>
    </Overlay>
  );
};

export default MyPageProfile;