import React from 'react';
import Header from "../0.menuBar/Header";
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

function FindEnd() {
  return (
    <>
      <Header />
      <StyledTabs>
        <StyledTabList>
          <StyledTab>아이디 찾기</StyledTab>
          <StyledTab>비밀번호 찾기</StyledTab>
        </StyledTabList>
        <TabPanel>
          <TabContent>
            <h2>아이디 찾기 완료</h2>
            <p>아이디 찾기가 완료되었습니다.</p>
          </TabContent>
        </TabPanel>
        <TabPanel>
          <TabContent>
            <h2>비밀번호 찾기 완료</h2>
            <p>비밀번호 찾기가 완료되었습니다.</p>
          </TabContent>
        </TabPanel>
      </StyledTabs>
      <MenuBar />
    </>
  );
}

export default FindEnd;
