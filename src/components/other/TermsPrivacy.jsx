import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; 

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Roboto', sans-serif;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: flex-start;
  border-bottom: 1px solid #ccc;
`;

const Tab = styled.button`
  padding: 10px 20px;
  cursor: pointer;
  background: ${({ active }) => (active ? '#333' : '#fff')};
  color: ${({ active }) => (active ? '#fff' : '#333')};
  border: 1px solid #333;
  border-bottom: ${({ active }) => (active ? 'none' : '1px solid #333')};
  font-size: 16px;
  outline: none;
  margin-bottom: -1px;
  transition: background 0.3s, color 0.3s;

  &:hover {
    background: ${({ active }) => (active ? '#333' : '#f3f3f3')};
  }
`;

const Content = styled.div`
  padding: 20px;
  border: 1px solid #333;
  border-top: none;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Paragraph = styled.p`
  margin-bottom: 20px;
  line-height: 1.6;
`;

const List = styled.ul`
  margin-bottom: 20px;
  line-height: 1.6;
`;

const BackButton = styled.button`
  cursor: pointer;
  background-color: #333;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  outline: none;
  margin-bottom: 20px;
  transition: background 0.3s, color 0.3s;
  position: fixed;
  top: 20px;
  left: 20px;

  &:hover {
    background-color: #555;
  }
`;

const TermsPrivacy = () => {
  const [activeTab, setActiveTab] = useState('terms');
  const navigate = useNavigate(); // useHistory 대신 useNavigate 사용

  const renderContent = () => {
    if (activeTab === 'terms') {
      return (
        <Content>
          <Paragraph>안녕하세요, [아띠버스]에 오신 것을 환영합니다! 이 이용약관(이하 "약관")은 귀하가 저희 웹사이트 및 서비스를 이용함에 있어 필요한 규정을 담고 있습니다. 귀하가 본 웹사이트를 이용함으로써, 귀하는 본 약관에 동의하는 것으로 간주됩니다.</Paragraph>
          <SectionTitle>서비스 내용</SectionTitle>
          <Paragraph>저희 아띠버스는 사용자가 여행 경로를 설정하고 관리할 수 있는 플랫폼을 제공합니다. 사용자는 여행 경로를 계획하고, 저장하며, 다른 사용자와 공유할 수 있습니다.</Paragraph>
          <SectionTitle>회원가입</SectionTitle>
          <Paragraph>서비스를 이용하기 위해서는 회원가입이 필요합니다. 회원가입 시, 귀하는 정확하고 최신의 정보를 제공해야 합니다. 허위 정보를 제공할 경우, 서비스 이용이 제한될 수 있습니다.</Paragraph>
          <SectionTitle>개인정보 보호</SectionTitle>
          <Paragraph>귀하의 개인정보는 관련 법령에 따라 보호됩니다. 자세한 내용은 [사이트 이름]의 개인정보처리방침을 참조하시기 바랍니다.</Paragraph>
          <SectionTitle>사용자의 의무</SectionTitle>
          <List>
            <li>귀하는 본 서비스를 불법적인 목적으로 이용해서는 안 됩니다.</li>
            <li>타인의 권리를 침해하거나, 불쾌감을 주는 행위를 하지 않아야 합니다.</li>
            <li>서비스의 안정적인 운영을 방해하는 행위를 하지 않아야 합니다.</li>
          </List>
          <SectionTitle>서비스 변경 및 종료</SectionTitle>
          <Paragraph>[아띠버스]은(는) 서비스의 내용을 변경하거나 종료할 권리를 보유합니다. 이러한 경우, 사전에 공지하도록 하겠습니다.</Paragraph>
          <SectionTitle>면책 조항</SectionTitle>
          <Paragraph>[아띠버스]은(는) 서비스 이용과 관련하여 발생한 직간접적인 손해에 대해 책임을 지지 않습니다. 다만, 고의 또는 중대한 과실로 인한 손해는 예외로 합니다.</Paragraph>
          <SectionTitle>준거법 및 관할</SectionTitle>
          <Paragraph>본 약관은 대한민국 법령에 따라 해석되고 적용됩니다. 서비스 이용과 관련하여 발생한 분쟁에 대해서는 대한민국의 법원을 전속적 관할 법원으로 합니다.</Paragraph>
        </Content>
      );
    } else {
      return (
        <Content>
          <SectionTitle>수집하는 개인정보의 항목</SectionTitle>
          <Paragraph>저희는 다음과 같은 개인정보를 수집합니다:</Paragraph>
          <List>
            <li>이름</li>
            <li>핸드폰번호</li>
            <li>이메일 주소</li>
          </List>
          <SectionTitle>개인정보의 수집 및 이용 목적</SectionTitle>
          <Paragraph>수집한 개인정보는 다음의 목적을 위해 사용됩니다:</Paragraph>
          <List>
            <li>회원 관리: 회원제 서비스 이용에 따른 본인 확인, 개인 식별</li>
            <li>서비스 제공: 여행 경로 설정 및 관리 서비스 제공</li>
            <li>고객 지원: 고객 문의에 대한 응답</li>
          </List>
          <SectionTitle>개인정보의 보유 및 이용 기간</SectionTitle>
          <Paragraph>귀하의 개인정보는 회원 탈퇴 시까지 보유하며, 탈퇴 후에는 지체 없이 파기합니다. 단, 관련 법령에 따라 일정 기간 보관이 필요한 경우에는 해당 기간 동안 보관합니다.</Paragraph>
          <SectionTitle>개인정보의 제3자 제공</SectionTitle>
          <Paragraph>저희는 귀하의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 법령에 따라 요청이 있을 경우에는 예외로 합니다.</Paragraph>
          <SectionTitle>개인정보의 파기 절차 및 방법</SectionTitle>
          <Paragraph>저희는 개인정보의 보유 기간이 경과하거나 처리 목적이 달성된 경우, 해당 개인정보를 지체 없이 파기합니다. 전자적 파일 형태의 정보는 복구 및 재생이 불가능한 방법으로 삭제하며, 종이 문서 형태의 정보는 분쇄기로 파기합니다.</Paragraph>
          <SectionTitle>이용자의 권리</SectionTitle>
          <Paragraph>귀하는 언제든지 개인정보의 열람, 수정, 삭제, 처리 정지 등을 요청할 수 있습니다. 이를 위해 개인정보 보호 책임자에게 연락하시면 지체 없이 조치하겠습니다.</Paragraph>
          <SectionTitle>개인정보 보호를 위한 기술적/관리적 대책</SectionTitle>
          <Paragraph>저희는 개인정보의 안전성을 확보하기 위해 다음과 같은 조치를 취하고 있습니다:</Paragraph>
          <List>
            <li>개인정보의 암호화</li>
            <li>해킹 등에 대비한 기술적 대책</li>
            <li>개인정보 접근 제한</li>
          </List>
          <Paragraph>본 개인정보처리방침은 2024년 07월 18일부터 적용됩니다.</Paragraph>
        </Content>
      );
    }
  };

  const goBackToMyPage = () => {
    navigate('/mypage'); 
  };

  return (
    <Container>
      <BackButton onClick={goBackToMyPage}>뒤로가기</BackButton>
      <Tabs>
        <Tab active={activeTab === 'terms'} onClick={() => setActiveTab('terms')}>
          이용약관
        </Tab>
        <Tab active={activeTab === 'privacy'} onClick={() => setActiveTab('privacy')}>
          개인정보 보호정책
        </Tab>
      </Tabs>
      {renderContent()}
    </Container>
  );
};

export default TermsPrivacy;
