import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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
  max-width: 500px;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 1010; 
  /* Content가 Overlay보다 더 위에 있도록 설정 */
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #ccc;
  margin: 20px 0;
`;

const SelectedSeasons = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  border: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
`;

const SingleButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: ${props => (props.selected ? '#00ee9f' : 'white')};
  cursor: pointer;

  &:hover {
    background: #00ee9f;
  }
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background: black;
  color: white;
  cursor: pointer;

  &:hover {
    background: #00ee9f;
  }
`;

/* 닫기 버튼 스타일 */
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

function MainModalDate({ closeModal, selectedButtons, setSelectedButtons, onSave }) {
  const [tempSelectedButtons, setTempSelectedButtons] = useState([...selectedButtons]);

  useEffect(() => {
    setTempSelectedButtons([...selectedButtons]);
  }, [selectedButtons]);

  const handleButtonClick = (buttonIndex) => {
    if (tempSelectedButtons.includes(buttonIndex)) {
      setTempSelectedButtons(tempSelectedButtons.filter(index => index !== buttonIndex));
    } else {
      if (tempSelectedButtons.length < 3) {
        setTempSelectedButtons([...tempSelectedButtons, buttonIndex]);
      } else {
        alert("최대 3개까지 선택 가능합니다.");
      }
    }
  };

  const handleSave = () => {
    const selectedValues = tempSelectedButtons.map(index => buttonLabels[index]);
    setSelectedButtons(tempSelectedButtons);
    onSave(selectedValues); // 선택된 값을 저장하는 콜백 호출
    closeModal();
  };

  const buttonLabels = [
    "전체", "봄", "여름", "가을", "겨울",
    "벚꽃", "단풍", "눈", "온천", "계곡",
    "계절", "계절", "계절"
  ];

  return (
    <Overlay onClick={closeModal}>
      <Content onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={closeModal}>X</CloseButton> {/* 닫기 버튼 추가 */}
        <Title>언제 떠나볼까요?</Title>
        <Line />
        <SelectedSeasons>
          {tempSelectedButtons.map(index => buttonLabels[index]).join(', ')}
        </SelectedSeasons>
        <Line />
        <SingleButtonContainer>
          <Button
            selected={tempSelectedButtons.includes(0)}
            onClick={() => handleButtonClick(0)}
          >
            {buttonLabels[0]}
          </Button>
        </SingleButtonContainer>
        <ButtonContainer>
          {buttonLabels.slice(1).map((label, index) => (
            <Button
              key={index + 1}
              selected={tempSelectedButtons.includes(index + 1)}
              onClick={() => handleButtonClick(index + 1)}
            >
              {label}
            </Button>
          ))}
        </ButtonContainer>
        <Line />
        <SearchButton onClick={handleSave}>SEARCH</SearchButton> {/* 저장 버튼 클릭 핸들러 */}
      </Content>
    </Overlay>
  );
}

export default MainModalDate;
