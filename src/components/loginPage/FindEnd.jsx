import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import MenuBar from "../0.menuBar/MenuBar";

import styled from 'styled-components';
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

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
  font-size: 20px;
  text-align: center;
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

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px 0;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-size: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
`;

function FindEnd() {
  const location = useLocation();
  const { id } = location.state || {};
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handlePasswordChange = (e) => {
    setPassword1(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setPassword2(e.target.value);
  };

  const handleSubmit = () => {
    if (password1 !== password2) {
      setErrorMessage('비밀번호가 일치하지 않습니다. 동일한 값을 입력해주세요.');
    } else {
      setErrorMessage('');
      window.location.href = '/login'; 
    }
  };

  return (
    <>
      <StyledTabs>
        <StyledTabList>
          <StyledTab>아이디 찾기</StyledTab>
          <StyledTab>비밀번호 찾기</StyledTab>
        </StyledTabList>
        <TabPanel>
          <TabContent>
            {id ? (
              <>
                <h2>아이디 찾기 완료</h2>
                <p>아이디 찾기가 완료되었습니다.</p>
                <p>회원님의 아이디는 {id} 입니다.</p>
                <Button onClick={() => window.location.href = '/login'}>로그인하러가기</Button>
              </>
            ) : (
              <>
                <h2>아이디 찾기 실패</h2>
                <p>입력하신 정보로 회원님의 아이디를 찾을 수 없습니다.</p>
                <Button onClick={() => window.location.href = '/find'}>다시 시도하기</Button>
              </>
            )}
          </TabContent>
        </TabPanel>
        <TabPanel>
          <TabContent>
            <h2>새로운 비밀번호 설정</h2>
            <FormField>
              <Label>새로운 비밀번호:</Label>
              <Input
                type="password"
                value={password1}
                onChange={handlePasswordChange}
              />
            </FormField>
            <FormField>
              <Label>비밀번호 확인:</Label>
              <Input
                type="password"
                value={password2}
                onChange={handleConfirmPasswordChange}
              />
            </FormField>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <Button onClick={handleSubmit}>로그인하러가기</Button>
          </TabContent>
        </TabPanel>
      </StyledTabs>
      <MenuBar />
    </>
  );
}

export default FindEnd;
