import styled from 'styled-components';
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, getUserInfo, updateProfileImage } from '../../features/member/memberSlice';
import { useNavigate } from 'react-router-dom';
import { BACK_URL } from '../../api/config';

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
  z-index: 1000;
`;

const Content = styled.form`
  background: white;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  z-index: 1010;
`;

const ModalHeader = styled.div`
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #000;
  font-size: 20px;
  text-align: center;
  line-height: 60px;

  .CloseButton {
    position: absolute;
    top: 15px;
    right: 15px;
    background: transparent;
    border: none;
    font-size: 30px;
    cursor: pointer;
  }
`;

const TopEdit = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  justify-content: space-between;
`;

const ProfileImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #ccc;
  background-size: cover;
  background-position: center;
  background-image: url(${props => props.image});
`;

const EditImage = styled.span`
  font-size: 14px;
  color: blue;
  cursor: pointer;
  display: block;
  text-align: center;
  margin-top: 10px;
`;

const ProfileNickname = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  padding: 0 20px;
`;

const NicknameInput = styled.input`
  width: 200px;
  height: 40px;
  border: none;
  border-radius: 5px;
  padding: 0 10px;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  background-color: #f0f0f0;
  margin-bottom: 10px;
`;

const RegistrationDate = styled.div`
  font-size: 14px;
  color: #666;
  position: absolute;
  bottom: -20px;
  right: 0;
`;

const Divider = styled.span`
  display: block;
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin: 20px 0;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`;

const InfoItem = styled.div`
  margin: 10px 0;
  width: 80%;
`;

const InfoTitle = styled.div`
  font-size: 14px;
  margin-bottom: 5px;
`;

const InfoContent = styled.input`
  width: 100%;
  height: 30px;
  font-size: 16px;
  padding: 0 10px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 5px;
`;

const BottomEdit = styled.div`
  width: 100%;
  text-align: right;
`;

const Complete = styled.button`
  width: 150px;
  height: 40px;
  background-color: #000;
  color: #fff;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
`;

function MyPageProfile(props) {
  const { closeModal, userInfo: Member, setHashtags } = props;
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUser);
  const navigate = useNavigate();

  const [name, setName] = useState(Member.userName);
  const [email, setEmail] = useState(Member.userEmail);
  const [phone, setPhone] = useState(Member.phone);
  const [birth, setBirth] = useState(Member.birth);
  const [nickName, setNickName] = useState(Member.nickname);
  const [profileImage, setProfileImage] = useState(Member.userProfileImagePath || null);
  const [ImageEdit, setImageEdit] = useState(null);

  const handleProfileChange = async () => {
    try {
      // const formData = new FormData();
      // formData.append('file', ImageEdit);
      // console.log(1);
      
      // if (ImageEdit) {
      //   console.log(Member.userId);
      //   const res = await axios.post(`${BACK_URL}/member/upload?userId=${Member.userId}`, formData);
      //   console.log(res);
      // }

      const userData = {
        userId: userInfo.userId,
        userName: name,
        userEmail: email,
        userRole: userInfo.userRole,
        userPw: userInfo.userPw,
        modDate: userInfo.modDate,
        regDate: userInfo.regDate,
        nickname: nickName,
        phone: phone,
        birth: birth,
        userProfileImagePath: profileImage
      };

      const update = await axios.post(`${BACK_URL}/member/update`, userData);

      dispatch(getUserInfo(userData));

      if (update.status === 200) { 
        closeModal();
        return navigate('/main/mypage');
      } else {
        throw new Error(`api error: ${update.status} ${update.statusText}`);
      }
    } catch (error) {
      console.error(error);
      return console.error("수정실패");
    }
  }

  const handleImageChange = async (e) => {
    // 새로입력된 이미지의 바이너리 값을 받아 바로 화면에 보여줌
    const file = e.target.files[0];
    setImageEdit(file);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageBase = reader.result;
      setProfileImage(imageBase);
    }
    
    if (file) {
      reader.readAsDataURL(file);
    }

    // 새로입력된 이미지의 url를 요청
    const formData = new FormData();
    formData.append('file', file);

    const res = await axios.post(`${BACK_URL}/member/upload?userId=${Member.userId}`, formData);
    setProfileImage(res.data);
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
          <ProfileImageContainer>
            <ProfileImage image={profileImage} />
            <EditImage onClick={() => document.getElementById('fileInput').click()}>프로필 사진 수정</EditImage>
            <input
              type="file"
              id="fileInput"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </ProfileImageContainer>
          <ProfileNickname>
            <NicknameInput
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
            />
            <RegistrationDate>가입일: {formattedDate} (D+{diffDate})</RegistrationDate>
          </ProfileNickname>
        </TopEdit>
        <Divider />
        <InfoSection>
          <InfoItem>
            <InfoTitle>아이디</InfoTitle>
            <InfoContent value={userInfo.userId} readOnly />
          </InfoItem>
          <InfoItem>
            <InfoTitle>생년월일</InfoTitle>
            <InfoContent
              value={birth}
              onChange={(e) => setBirth(e.target.value)}
            />
          </InfoItem>
          <InfoItem>
            <InfoTitle>이메일</InfoTitle>
            <InfoContent
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InfoItem>
          <InfoItem>
            <InfoTitle>연락처</InfoTitle>
            <InfoContent
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </InfoItem>
        </InfoSection>
        <Divider />
        <BottomEdit>
          <Complete type="button" onClick={handleProfileChange}>완료</Complete>
        </BottomEdit>
      </Content>
    </Overlay>
  );
}

export default MyPageProfile;
