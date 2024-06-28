import React, { useState } from 'react';
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
`;

const Content = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: calc(100% - 40px);
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: ${props => (props.selected ? '#00ee9f;' : 'white')};
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

const MainModalPlace = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedButtons, setSelectedButtons] = useState([]);

  const closeModal = () => setIsModalOpen(false);

  const handleButtonClick = (buttonIndex) => {
    if (selectedButtons.includes(buttonIndex)) {
      setSelectedButtons(selectedButtons.filter(index => index !== buttonIndex));
    } else {
      if (selectedButtons.length < 3) {
        setSelectedButtons([...selectedButtons, buttonIndex]);
      } else {
        alert("최대 3개까지 선택 가능합니다.");
      }
    }
  };

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>모달 열기</button>
      {isModalOpen && (
        <Overlay onClick={closeModal}>
          <Content onClick={(e) => e.stopPropagation()}>
            <Title>아띠버스가 데려다줄게요!</Title>
            <Input type="text" placeholder="아띠버스와 같이 가고 싶은 곳 있나요?" />
            <ButtonContainer>
              {Array.from({ length: 14 }).map((_, index) => (
                <Button
                  key={index}
                  selected={selectedButtons.includes(index)}
                  onClick={() => handleButtonClick(index)}
                >
                  전체
                </Button>
              ))}
            </ButtonContainer>
            <SearchButton>검색하기</SearchButton>
          </Content>
        </Overlay>
      )}
    </>
  );
};

export default MainModalPlace;
