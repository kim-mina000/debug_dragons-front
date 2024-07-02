import React, { useState } from 'react';
import styled from 'styled-components';
import { RiFolderAddLine, RiFolderAddFill } from "react-icons/ri";

const TravelListContainer = styled.div`
  width: 70%;
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
  height: 100%; /* CategoryButton의 높이를 아이콘과 맞추기 위해 100%로 설정 */
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
    margin-top: 5px; /* 아이콘과 텍스트 사이의 간격 설정 */
    cursor: pointer; /* 마우스 포인터를 변경하여 클릭 가능한 상태로 변경 */
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
  width: calc(100% - 20px); /* 왼쪽에 여백 고려해서 너비 계산 */
  padding: 5px 10px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
`;

const MyTravelList = () => {
  const initialCategories = ['카테고리 01', '카테고리 02', '카테고리 03', '카테고리 04', '카테고리 05'];
  const [categories, setCategories] = useState(initialCategories);
  const [editingIndex, setEditingIndex] = useState(-1); // 편집 중인 카테고리 인덱스

  const handleAddCategory = () => {
    const newCategoryName = prompt('추가할 카테고리 이름을 입력하세요.');
    if (newCategoryName) {
      setCategories([...categories, newCategoryName]);
    }
  };

  const handleEditCategoryName = (index) => {
    setEditingIndex(index); // 편집 상태로 전환
  };

  const handleSaveCategoryName = (index, newName) => {
    const newCategories = [...categories];
    newCategories[index] = newName;
    setCategories(newCategories);
    setEditingIndex(-1); // 편집 종료
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
        <Category>
          <CategoryButton onClick={handleAddCategory}>
            <IconHoverBf className="add-icon" />
            <IconHoverAf className="add-fill-icon" />
            <span>추가</span>
          </CategoryButton>
        </Category>
      </Categories>
    </TravelListContainer>
  );
};

export default MyTravelList;
