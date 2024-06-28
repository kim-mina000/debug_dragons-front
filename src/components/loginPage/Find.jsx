import React, { useState } from 'react';
import styled from 'styled-components';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Header from '../0.menuBar/Header';
import MenuBar from '../0.menuBar/MenuBar';

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
  padding: 5%;
  margin: 0 auto;
  width: 70%;
  text-align: center;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px 0;
  width: 90%;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
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

const Find = () => {
  const [id, setId] = useState('');
  const [birthday, setBirthday] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <>
      <Header userName="저장된 데이터" onLogout={() => console.log('로그아웃')} />
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
              <Label>생년월일을 입력해주세요:</Label>
              <Input
                type="text"
                placeholder="생년월일을 입력해주세요."
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </FormField>
            <FormField>
              <Label>전화번호를 입력해주세요:</Label>
              <Input
                type="text"
                placeholder="010-0000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </FormField>
            <Button type="button">아이디 찾기</Button>
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
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </FormField>
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
              <Label>생년월일을 입력해주세요:</Label>
              <Input
                type="text"
                placeholder="생년월일을 입력해주세요."
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </FormField>
            <FormField>
              <Label>전화번호를 입력해주세요:</Label>
              <Input
                type="text"
                placeholder="010-0000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </FormField>
            <Button type="button">비밀번호 찾기</Button>
          </TabContent>
        </TabPanel>
      </StyledTabs>
      <MenuBar />
    </>
  );
};

export default Find;
