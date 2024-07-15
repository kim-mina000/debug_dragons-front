import Papa from "papaparse";
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { RiFolderAddLine, RiFolderAddFill } from "react-icons/ri";
import { Link } from 'react-router-dom';

import { getMyTravelList } from '../../api/myTravelList/myTravelListAPI';
import { useSelector } from 'react-redux';


const TravelListContainer = styled.div`
  width: 80%;
  box-sizing: border-box;
  margin: 0 auto; 
  padding-bottom: 5%;
  background-color: #f3fdff;
`;

const Categories = styled.div`
  font-family: 'MaplestoryOTFBold';
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
  background-color: transparent; 
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  outline: none;
  position: relative;

  .add-icon {
    width: 80%;
    height: 80%;
    color: #18188f; /* 아이콘 컬러 설정 */
  }

  .add-fill-icon {
    display: none;
    width: 80%;
    height: 80%;
    color: #010175; /* 아이콘 컬러 설정 */
  }

  span {
    margin-top: 5px; 
    cursor: pointer; 
    font-size: 14px;
    font-family: 'MaplestoryOTFBold';
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
  display: none;
`;

const EditableCategoryName = styled.input`
  width: calc(100% - 20px); 
  padding: 5px 10px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  font-family: 'MaplestoryOTFBold';
`;

const BoxesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin: 20px auto;
  max-height: 70vh; 
  overflow-y: scroll; 

  /* 스크롤바 css */
  &::-webkit-scrollbar {
    width: 8px;
    background-color: none;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(#d4f9ff00, #D4F9FF, #A5DEF0, #ffffff, #ffffff,#a5def000);
    border-radius: 20px;
  }
`;


const BoxLink = styled(Link)`
  width: 22rem;
  height: 22rem;
  background-image: url('http://via.placeholder.com/250x250');
  background-size: cover;
  background-position: center;
  margin: 10px;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 24px;
  position: relative;
  overflow: hidden;

  &:hover::after {
    content: '상세보기';
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.842);
    color: black;
    font-size: 24px;
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  margin: 20px 0; 
  float: right; 
`;

const DropdownButton = styled.button`
  background-color: #010175;
  font-family: 'MaplestoryOTFBold';
  color: white;
  padding: 10px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`;

const DropdownContent = styled.div`
  display: ${({ show }) => (show ? 'block' : 'none')};
  position: absolute;
  background-color: #b4dbff;
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
    background-color: #7da7ce;
  }
`;

const MyTravelList = () => {
  const initialCategories = ['카테고리 01', '카테고리 02', '카테고리 03', '카테고리 04', '카테고리 05'];
  const [categories, setCategories] = useState(initialCategories);
  const [editingIndex, setEditingIndex] = useState(-1); // 편집 중인 카테고리 인덱스
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [sortOption, setSortOption] = useState('정렬기준');
  // 내 리스트
  const [myList, setMyList] = useState(null);

  const userInfo = useSelector(state => state.member.userInfo);

  

  useEffect(() => {
    // myList에 CourseLandmark가 담겨있음
    getMyTravelList(userInfo.userId)
    .then(res => setMyList(res));
  }, []);
  

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
  
  // csv 파일 읽어오기
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('images.csv');
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch CSV');
  //       }
  //       const csvData = await response.text();
    
  //       // CSV를 JSON으로 파싱하기
  //       const parsedData = Papa.parse(csvData, { header: true }); // header: true는 첫 줄을 헤더로 사용함을 의미
    
  //       console.log(parsedData.data); // 파싱된 데이터 확인
    
  //       // 여기서 parsedData.data를 처리하거나 필요한 작업 수행
    
  //     } catch (error) {
  //       console.error('Error fetching or parsing CSV:', error);
  //     }
  //   };
    
  //   fetchData();
  // }, []);

  return (
    <>
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
          {myList &&
            myList.map(list => { return <BoxLink to={`/main/detail/${list.courseNo}`} key={list.courseNo}></BoxLink>})}
        </BoxesContainer>
      </TravelListContainer>
    </>
  );
};

export default MyTravelList;
