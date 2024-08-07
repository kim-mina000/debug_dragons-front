import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Header from '../0.menuBar/Header';
import MenuBar from '../0.menuBar/MenuBar';
import TitleLogo from './TitleLogo';
import { findId } from '../../api/member/member';

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
  font-size: 20px;

  &::placeholder {
    font-size: 18px;
    color: #888;
    padding-left: 10px;
  }
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

const SubmitButton = styled(Button)`
  width: 100%;
  margin: 20px 0;
  padding: 15px;
`;

const Find = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const id = await findId(userName, userEmail);
    if (id) {
      navigate('/findend', { state: { id } });
    } else {
      alert('아이디를 찾을 수 없어요');
    }
  };

  return (
    <>
      <TitleLogo />
      <StyledTabs>
        <StyledTabList>
          <StyledTab>아이디 찾기</StyledTab>
          <StyledTab>비밀번호 찾기</StyledTab>
        </StyledTabList>

        <TabPanel>
          <TabContent>
            <h2>아이디 찾기</h2>
            <FormField>
              <Label>이름을 입력해주세요:</Label>
              <Input
                type="text"
                placeholder="이름을 입력해주세요."
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </FormField>
            <FormField>
              <Label>이메일을 입력해주세요:</Label>
              <Input
                type="text"
                placeholder="abc123@email.com"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </FormField>
            <SubmitButton type="button" onClick={handleSubmit}>
              아이디 찾기
            </SubmitButton>
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
              />
            </FormField>
            <FormField>
              <Label>이름을 입력해주세요:</Label>
              <Input
                type="text"
                placeholder="이름을 입력해주세요."
              />
            </FormField>
            <FormField>
              <Label>이메일을 입력해주세요:</Label>
              <Input
                type="text"
                placeholder="abc123@email.com"
              />
            </FormField>
            <SubmitButton type="button">
              비밀번호 찾기
            </SubmitButton>
          </TabContent>
        </TabPanel>
      </StyledTabs>
      <MenuBar />
    </>
  );
};

export default Find;
