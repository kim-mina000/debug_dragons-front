import styled from "styled-components";

// 하단 메뉴탭 컨테이너
const IconContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 50%;
  position: absolute;
  bottom: 20px;
  padding: 15px 0; 
  border-top: 1px solid #ccc; 
`;

// 하단 메뉴탭
const Icon = styled.div`
  width: 70px;
  height: 70px;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;  
`;  

function MenuBar() {
  return (
  <IconContainer>
    <Icon><img src='/리스트.png'/></Icon>
    <Icon><img src='/둘러보기.png'/></Icon>
    <Icon><img src='/홈.png'/></Icon>
    <Icon><img src='/스크랩.png'/></Icon>
    <Icon><img src='/마이페이지.png'/></Icon>
  </IconContainer>
  );
};

export default MenuBar;