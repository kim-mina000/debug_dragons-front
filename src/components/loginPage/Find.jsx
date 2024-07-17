import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Header from '../0.menuBar/Header';
import MenuBar from '../0.menuBar/MenuBar';
import TitleLogo from './TitleLogo';

const StyledTabs = styled(Tabs)`
  font-family: 'MaplestoryOTFBold';
  font-size: 16px;
  margin-top: 1%;
`;

const StyledTabList = styled(TabList)`
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0;
  list-style: none;
  width: 100%;
`;

const StyledTab = styled(Tab)`
  padding: 30px 20px;
  cursor: pointer;
  width: 50%;
  font-size: 25px;
  text-align: center;
  &.react-tabs__tab--selected {
    background-color: #333;
    color: white;
    width: 50%;
  }
`;

const TabContent = styled.div`
  padding: 1.5%;
  margin: 0 auto;
  width: 70%;
  font-size: 30px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px 0;
  width: 100%;
`;

const Label = styled.label`
  margin: 20px 0 5px 0;
  font-size: 25px;
`;

const Input = styled.input`
  width: 100%;
  padding: 20px 0;
  border: 1px solid #ccc;
  font-size: 20px; /* 입력 필드의 기본 폰트 크기 */

  &::placeholder {
    font-size: 18px; /* 플레이스홀더의 폰트 크기 */
    color: #888; /* 플레이스홀더의 색상 */
    padding-left: 10px; /* 플레이스홀더의 왼쪽 패딩 */
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;

const PhoneInput = styled(Input)`
  flex-grow: 1;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 20px 0;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #555;
  }
`;

const VerifyButton = styled(Button)`
  width: 120px;
  margin-left: 10px;
  margin-top: 0;
  padding: 10px;
  margin-bottom: 0;
`;

const SubmitButton = styled(Button)`
  width: 100%;
  margin: 20px 0;
  padding: 15px;
`;

const Find = () => {
  const [id, setId] = useState('');
  const [birthday, setBirthday] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState(''); // 이름 상태 추가
  const [pwName, setPwName] = useState(''); // 비밀번호 찾기용 이름 상태 추가
  const [pwId, setPwId] = useState(''); // 비밀번호 찾기용 아이디 상태 추가
  const [email, setEmail] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log(id);
    const foundId = id; 
    navigate('/findend', { state: { id: foundId } });
  };

  return (
    <>
      <TitleLogo/>
      <StyledTabs>
        <StyledTabList>
          <StyledTab>아이디 찾기</StyledTab>
          <StyledTab>비밀번호 찾기</StyledTab>
        </StyledTabList>

        <TabPanel>
          <TabContent>
            {/* 아이디 찾기 내용 */}
            <h2>아이디 찾기</h2>
            <FormField>
              <Label>이름을 입력해주세요:</Label>
              <Input
                type="text"
                placeholder="이름을 입력해주세요."
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </FormField>
            <FormField>
              <Label>이메일을 입력해주세요:</Label>
              <Input
                type="text"
                placeholder="abc123@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormField>
            <SubmitButton type="button" onClick={handleSubmit}>아이디 찾기</SubmitButton>
          </TabContent>
        </TabPanel>
        <TabPanel>
          <TabContent>
            {/* 비밀번호 찾기 내용 */}
            <h2>비밀번호 찾기</h2>
            <FormField>
              <Label>아이디를 입력해주세요:</Label>
              <Input
                type="text"
                placeholder="아이디를 입력해주세요."
                value={pwId}
                onChange={(e) => setPwId(e.target.value)}
              />
            </FormField>
            <FormField>
              <Label>이름을 입력해주세요:</Label>
              <Input
                type="text"
                placeholder="이름을 입력해주세요."
                value={pwName}
                onChange={(e) => setPwName(e.target.value)}
              />
            </FormField>
            <FormField>
              <Label>이메일을 입력해주세요:</Label>
              <Input
                type="text"
                placeholder="abc123@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormField>
            <SubmitButton type="button" onClick={handleSubmit}>비밀번호 찾기</SubmitButton>
          </TabContent>
        </TabPanel>
      </StyledTabs>
      <MenuBar />
    </>
  );
};

export default Find;
