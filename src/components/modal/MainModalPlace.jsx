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
  z-index: 1000;
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

const SelectedPlaces = styled.div`
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

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

function MainModalPlace({ closeModal, selectedButtons, setSelectedButtons, onSave }) {
  const [tempSelectedButtons, setTempSelectedButtons] = useState([...selectedButtons]);

  useEffect(() => {
    setTempSelectedButtons([...selectedButtons]);
  }, [selectedButtons]);

  const handleButtonClick = (buttonIndex) => {
    if (tempSelectedButtons.includes(buttonIndex)) {
      setTempSelectedButtons(tempSelectedButtons.filter(index => index !== buttonIndex));
    } else {
      if (tempSelectedButtons.length < 1) {
        setTempSelectedButtons([...tempSelectedButtons, buttonIndex]);
      } else {
        alert("하나만 선택 가능합니다.");
      }
    }
  };

  const handleSave = () => {
    const selectedValues = tempSelectedButtons.map(index => buttonLabels[index]);
    setSelectedButtons(tempSelectedButtons);
    onSave(selectedValues); // 선택된 값을 저장하는 콜백 호출
    closeModal();
  };

  const handleClose = () => {
    setTempSelectedButtons([]);
    closeModal();
  };

  const buttonLabels = [
    "전체", "경기", "경상", "전라",
    "제주", "서울", "강원", "부산", "인천",
    "광주", "대전", "대구", "울산"
  ];

  return (
    <Overlay onClick={handleClose}>
      <Content onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={handleClose}>X</CloseButton>
        <Title>이번 여행은 어디로?</Title>
        <Line />
        <SelectedPlaces>
          {tempSelectedButtons.map(index => buttonLabels[index]).join(', ')}
        </SelectedPlaces>
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
        <SearchButton onClick={handleSave}>SEARCH</SearchButton>
      </Content>
    </Overlay>
  );
}

export default MainModalPlace;
