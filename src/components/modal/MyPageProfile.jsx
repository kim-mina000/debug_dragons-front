import styled from 'styled-components';
import { IoClose } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, getUserInfo, updateProfileImage, selectToken } from '../../features/member/memberSlice';
import { getLocalStorages } from '../../api/member/member_localstorage';
import { useNavigate } from 'react-router-dom';

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

const Content = styled.form`
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
  background-size: cover;
  background-position: center;
  background-image: url(${props => props.image});
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
`
const ProfileNickname = styled.input`
  width: 350px;
  height: 60px;
  border: none;
  border-radius: 5px;
  padding: 0 10px;
  font-Size: 45px;
  font-Weight:bold;
  text-align: center;
  cursor: pointer;
  background-color: #CCC;
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
  width: 350px;
  height: 200px;
  border: 1px solid #000;
  border-radius: 35px;
  margin: 20px 0;
  line-height: 60px;
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
  margin-bottom: 10px;
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
  const { closeModal, Member } = props;
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUser);
  const navigate = useNavigate();

  console.log(getLocalStorages());  
  const member = JSON.stringify(localStorage.getItem("userInfo"));


  const [name, setName] = useState(Member.userName);
  const [email, setEmail] = useState(Member.userEmail);
  const [phone, setPhone] = useState(Member.phone);
  const [birth, setBirth] = useState(Member.birth);
  const [nickName, setNickName] = useState(Member.nickname);
  const [profileImage, setProfileImage] = useState(Member.userProfileImagePath || null);
  const [ImageEdit, setImageEdit] = useState();

  const handleProfileChange = async() => {
    try {
      const formData = new FormData();
      formData.append('file', ImageEdit);

      const update = await axios.post(`http://localhost:8080/member/update`,  {
        userId: userInfo.userId,
        userName: name,
        userEmail: email,
        userRole:userInfo.userRole,
        userPw:userInfo.userPw,
        modDate:userInfo.modDate,
        regDate:userInfo.regDate,
        nickname:nickName,
        phone:phone,
        birth:birth,
        userProfileImagePath: profileImage
      });
      console.log(update.data);

      
      dispatch(getUserInfo({
        userId: userInfo.userId,
        userName: name,
        userEmail: email,
        userRole:userInfo.userRole,
        userPw:userInfo.userPw,
        modDate:userInfo.modDate,
        regDate:userInfo.regDate,
        nickname:nickName,
        phone:phone,
        birth:birth,
        userProfileImagePath: profileImage
      }));

      if (ImageEdit) {
        await axios.post('http://localhost:8080/member/upload', formData);
        console.log(ImageEdit);
      }

      if (update.status === 201) { // 응답 코드가 200 OK 일때만 결과를 리턴
        return navigate('/mypage');

      } else {
        throw new Error(`api error: ${update.status} ${update.statusText}`);
      }
    } catch (error) {
      console.error(error);
      return console.error("수정실패");
    }
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImageEdit(file);

    const reader = new FileReader();

    reader.onloadend = () => {
      const imageBase = reader.result;
      setProfileImage(imageBase);
      dispatch(updateProfileImage(imageBase));
    }

    if (file) {
      reader.readAsDataURL(file);
    }
  };


  const regDate = new Date(Member.regDate);
  const year = regDate.getFullYear();
  const month = String(regDate.getMonth() + 1).padStart(2, '0');
  const day = String(regDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  const today = new Date();
  const diffTime = today.getTime() - regDate.getTime();

  const diffDate = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

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
            <ProfileImage image={profileImage} />
            <EditImage onClick={() => document.getElementById('fileInput').click()}>프로필 사진 수정</EditImage>
            <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            onChange={handleImageChange}
            />
          </TopLeft>
          <TopRight>
            <ProfileNickname
              value={nickName}
              onChange={(e)=>setNickName(e.target.value)}
            />
          </TopRight>  
        </TopEdit>
        <MiddleEdit>
          <MiddleLeft>
            <TagEdit>

            </TagEdit>
            <WithAttiBus>
            <p>회원가입일 : {formattedDate}</p>
            <p style={{fontSize: '45px'}}> <span style={{fontSize: '25px'}}>with</span> 아띠버스</p>
            <p style={{fontSize: '40px', color: '#94d7f2'}}>D + {diffDate}</p>
            </WithAttiBus>
          </MiddleLeft>
          <MiddleRight>
            <InforTitle>아이디</InforTitle>
            <InforContent
              value={userInfo.userId}
            />
            <InforTitle>이름</InforTitle>
            <InforContent
              value={name}
              onChange={(e)=> setName(e.target.value)}
            />
            <InforTitle>생년월일</InforTitle>
            <InforContent
              value={birth}
              onChange={(e)=> setBirth(e.target.value)}
            />
            <InforTitle>핸드폰번호</InforTitle>
            <InforContent
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <InforTitle>이메일주소</InforTitle>
            <InforContent
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
            />
          </MiddleRight>
        </MiddleEdit>
        <BottomEdit>
          <Complete type='button' onClick={handleProfileChange}>수정하기</Complete>
        </BottomEdit>
      </Content>
    </Overlay>
  );
};

export default MyPageProfile;