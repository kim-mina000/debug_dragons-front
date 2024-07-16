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
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedThemes, setSelectedThemes] = useState([]);

  useEffect(() => {
    setSelectedSeason(selectedButtons.find(index => index >= 0 && index <= 3));
    setSelectedThemes(selectedButtons.filter(index => index >= 4 && index <= 14));
  }, [selectedButtons]);

  
  

  const handleSeasonButtonClick = (buttonIndex) => {
    if (selectedSeason === buttonIndex) {
      setSelectedSeason(null); // 이미 선택된 계절을 다시 클릭하면 선택 해제
    } else {
      setSelectedSeason(buttonIndex); // 계절을 선택
    }
  };

  const handleThemeButtonClick = (buttonIndex) => {
    let newSelectedThemes = [...selectedThemes];

    if (newSelectedThemes.includes(buttonIndex)) {
      // 이미 선택된 테마 버튼을 다시 클릭하면 선택 해제
      newSelectedThemes = newSelectedThemes.filter(index => index !== buttonIndex);
    } else {
      // 새로운 테마 버튼을 선택한 경우 기존 선택 해제 후 새로 선택
      newSelectedThemes.push(buttonIndex);
    }

    // 최대 선택 개수 제한 (테마는 최대 2개까지 선택 가능)
    if (newSelectedThemes.length > 2) {
      newSelectedThemes.shift(); // 가장 처음 선택한 것부터 제거
    }

    setSelectedThemes(newSelectedThemes);
  };

  const handleSave = () => {
    const selectedButtons = [];
    if (selectedSeason !== null) {
      selectedButtons.push(buttonLabelsWeather[selectedSeason]);
    }
    selectedThemes.forEach(themeIndex => {
      selectedButtons.push(buttonLabelsTheme[themeIndex]); // 인덱스를 실제 값으로 변환
    });
    console.log(selectedButtons);

    setSelectedButtons(selectedButtons);
    console.log(selectedButtons);
    onSave(selectedButtons);
    closeModal();
  };

  


  const buttonLabelsWeather = [
    "봄", "여름", "가을", "겨울"
  ];
  const buttonLabelsTheme = [
    "벚꽃", "단풍", "눈", "온천", "계곡",
    "바다", "산", "도시", "가족", "커플", "우정", "드라이브"
  ];

  return (
    <Overlay onClick={closeModal}>
      <Content onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={closeModal}>X</CloseButton>
        <Title>언제 떠나볼까요?</Title>
        <Line />
        <SelectedSeasons>
          {selectedSeason !== null &&
            <span>{buttonLabelsWeather[selectedSeason]}</span>
          }
          {' '}
          {selectedThemes.length > 0 && ', '}
          {selectedThemes.slice(0, 2).map(index => (
            <span key={index}>{buttonLabelsTheme[index] + " "}</span>
          ))}
          {selectedSeason !== null || selectedThemes.length > 0 ? ' ' : '선택된 내용이 없습니다.'}
        </SelectedSeasons>
        <Line />

        <ButtonContainer>
          {buttonLabelsWeather.map((label, index) => (
            <Button
              key={index}
              selected={selectedSeason === index}
              onClick={() => handleSeasonButtonClick(index)}
            >
              {label}
            </Button>
          ))}
        </ButtonContainer>

        <Line />

        <ButtonContainer>
          {buttonLabelsTheme.map((label, index) => (
            <Button
              key={index}
              selected={selectedThemes.includes(index)}
              onClick={() => handleThemeButtonClick(index)}
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

export default MainModalDate;
