import React, { useState } from 'react';
import styled from 'styled-components';
import { RiFolderAddLine, RiFolderAddFill } from "react-icons/ri";

const TravelListContainer = styled.div`
  width: 80%;
  padding: 20px;
  box-sizing: border-box;
  margin: 0 auto; /* 가운데 정렬 */
`;

const Categories = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Category = styled.div`
  text-align: center;
  flex: 1; /* flex-grow 설정으로 각 아이템이 동일한 비율로 공간을 차지하게 함 */
  margin: 0 10px; /* 좌우 여백 설정 */
`;

const CategoryButton = styled.button`
  width: 100%;
  height: 100%; 
  background-color: transparent; /* 백그라운드 컬러 제거 */
  display: flex;
  flex-direction: column; /* 아이콘과 텍스트를 세로로 배치 */
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  outline: none;
  position: relative;

  .add-icon {
    width: 80%;
    height: 80%;
    color: #5c5c5c; /* 아이콘 컬러 설정 */
  }

  .add-fill-icon {
    display: none;
    width: 80%;
    height: 80%;
    color: #5c5c5c; /* 아이콘 컬러 설정 */
  }

  span {
    margin-top: 5px; 
    cursor: pointer; 
    font-size: 14px;
  }

  &:hover {
    .add-icon {
      display: none;
    }

    .add-fill-icon {
      display: block;
    }
  }
`;

const IconHoverBf = styled(RiFolderAddLine)`
  width: 100%;
  height: 100%;
`;

const IconHoverAf = styled(RiFolderAddFill)`
  width: 100%;
  height: 100%;
  display: none; /* 기본적으로 숨겨둠 */
`;

const EditableCategoryName = styled.input`
  width: calc(100% - 20px); 
  padding: 5px 10px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
`;

const BoxesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin: 20px auto;
  max-height: 70vh; 
  overflow-y: auto; 
`;

const Box = styled.div`
  width: 22rem;
  height: 22rem;
  background-color: #353535;
  margin: 10px; 
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  margin: 20px 0; 
  float: right; 
`;

const DropdownButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`;

const DropdownContent = styled.div`
  display: ${({ show }) => (show ? 'block' : 'none')};
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border-radius: 5px;
  overflow: hidden;
  right: 0; 
`;

const DropdownOption = styled.div`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const MyTravelList = () => {
  const initialCategories = ['카테고리 01', '카테고리 02', '카테고리 03', '카테고리 04', '카테고리 05'];
  const [categories, setCategories] = useState(initialCategories);
  const [editingIndex, setEditingIndex] = useState(-1); // 편집 중인 카테고리 인덱스
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [sortOption, setSortOption] = useState('정렬기준');

  const handleEditCategoryName = (index) => {
    setEditingIndex(index); // 편집 상태로 전환
  };

  const handleSaveCategoryName = (index, newName) => {
    const newCategories = [...categories];
    newCategories[index] = newName;
    setCategories(newCategories);
    setEditingIndex(-1); // 편집 종료
  };

  const handleSortOption = (option) => {
    setSortOption(option);
    setDropdownVisible(false);
  };

  return (
    <TravelListContainer>
      <Categories>
        {categories.map((category, index) => (
          <Category key={index}>
            <CategoryButton>
              <IconHoverBf className="add-icon" />
              <IconHoverAf className="add-fill-icon" />
              {editingIndex === index ? (
                <EditableCategoryName
                  type="text"
                  value={category}
                  onChange={(e) => handleSaveCategoryName(index, e.target.value)}
                  onBlur={() => setEditingIndex(-1)}
                  autoFocus
                />
              ) : (
                <span onClick={() => handleEditCategoryName(index)}>{category}</span>
              )}
            </CategoryButton>
          </Category>
        ))}
      </Categories>
      <DropdownContainer>
        <DropdownButton onClick={() => setDropdownVisible(!dropdownVisible)}>
          {sortOption}
        </DropdownButton>
        <DropdownContent show={dropdownVisible}>
          <DropdownOption onClick={() => handleSortOption('최신 순')}>최신 순</DropdownOption>
          <DropdownOption onClick={() => handleSortOption('오래된 순')}>오래된 순</DropdownOption>
          <DropdownOption onClick={() => handleSortOption('가나다 순')}>가나다 순</DropdownOption>
          <DropdownOption onClick={() => handleSortOption('좋아요 순')}>좋아요 순</DropdownOption>
        </DropdownContent>
      </DropdownContainer>
      <BoxesContainer>
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
      </BoxesContainer>
    </TravelListContainer>
  );
};

export default MyTravelList;
