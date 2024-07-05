import React, { useState } from 'react';
import styled from 'styled-components';
import { RiFolderAddLine, RiFolderAddFill } from "react-icons/ri";
import { MdFolder } from "react-icons/md";
import { PiHeartStraightBreak, PiHeartStraightBreakFill } from "react-icons/pi";
import Header from '../0.menuBar/Header';
import MenuBar from '../0.menuBar/MenuBar';

const Container = styled.div`
  width: 100%;
  height: 80vh; /* 전체 영역의 80% */
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  width: 80%;
  flex: 1; /* 남은 공간을 차지하도록 설정 */
  display: flex;
  flex-direction: column;
`;

const ItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3개의 열 */
  grid-gap: 20px; /* 그리드 항목 간의 간격 */
  flex: 1;
  width: 100%;
  margin-bottom: 20px;
  padding-bottom: 10%;
`;

const Folder = styled.div`
  width: 100%;
  padding-top: 100%; /* 정사각형을 유지하기 위해 100% 패딩 */
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FolderIcon = styled(MdFolder)`
  width: 50%;
  height: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const AddFolderIcon = styled.div`
  width: 100%;
  padding-top: 100%; /* 정사각형을 유지하기 위해 100% 패딩 */
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #ccc;
  border-radius: 5px;

  &:hover .add-before {
    display: none;
  }
  
  &:hover .add-after {
    display: block;
  }
`;

const IconHoverBf = styled(RiFolderAddLine)`
  width: 50%;
  height: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const IconHoverAf = styled(RiFolderAddFill)`
  width: 50%;
  height: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: none; /* 기본적으로 숨겨둠 */
`;

const Input = styled.input`
  width: 90%;
  text-align: center;
  border: none;
  background: transparent;
  border-bottom: 1px solid #ccc;
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  
  &:focus {
    outline: none;
    border-bottom: 1px solid black;
  }
`;

const File = styled.div`
  width: 100%;
  padding-top: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ddd;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
`;

const FileThumbnail = styled.img`
  width: 80%;
  height: 60%;
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, 0);
`;

const FileLabel = styled.div`
  margin-top: 10px;
  font-size: 14px;
  text-align: center;

  h3 {
    font-size: 30px;
    margin-bottom: 5px;
  }

  p {
    margin-bottom: 5px;
    font-size: 15px;
  }
`;

const HeartIcon = styled.div`
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
`;

const Clipping = () => {
  const [folders, setFolders] = useState([
    { id: 1, name: "강아지랑 같이 가야만...", pages: 0 },
    { id: 2, name: "제목을 내게.......", pages: 100, author: "(ooo)" },
  ]);

  const [files, setFiles] = useState([
    { name: "윤다훈이 제목입니다01", likes: 103, author: "(ooo)", liked: false },
    { name: "윤다훈이 제목입니다02", likes: 107, author: "(ooo)", liked: false },
    { name: "윤다훈이 제목입니다03", likes: 124, author: "(ooo)", liked: false },
  ]);

  const addFolder = () => {
    const newFolder = {
      id: folders.length + 1,
      name: "폴더 이름을 입력해주세요.",
      isEditing: true,
      pages: 0
    };
    setFolders([newFolder, ...folders]); // 맨 앞에 새로운 폴더 추가
  };

  const handleInputChange = (e, id) => {
    const updatedFolders = folders.map(folder =>
      folder.id === id ? { ...folder, name: e.target.value } : folder
    );
    setFolders(updatedFolders);
  };

  const handleInputBlur = (id) => {
    const updatedFolders = folders.map(folder =>
      folder.id === id ? { ...folder, isEditing: false } : folder
    );
    setFolders(updatedFolders);
  };

  const handleFolderClick = (id) => {
    const updatedFolders = folders.map(folder =>
      folder.id === id ? { ...folder, isEditing: true } : folder
    );
    setFolders(updatedFolders);
  };

  const toggleLike = (index) => {
    const updatedFiles = [...files];
    updatedFiles[index].liked = !updatedFiles[index].liked;
    setFiles(updatedFiles);
  };

  return (
    <>
    <Header/>
    <Container>
      <Content>
        <ItemContainer>
          <AddFolderIcon onClick={addFolder}>
            <IconHoverBf className="add-before" />
            <IconHoverAf className="add-after" />
          </AddFolderIcon>
          {folders.map(folder => (
            <Folder key={folder.id} onClick={() => handleFolderClick(folder.id)}>
              <FolderIcon />
              {folder.isEditing ? (
                <Input
                  autoFocus
                  value={folder.name}
                  onChange={(e) => handleInputChange(e, folder.id)}
                  onBlur={() => handleInputBlur(folder.id)}
                />
              ) : (
                <>
                  <div>{folder.name}</div>
                  <div>저장된 페이지 수: {folder.pages}개</div>
                </>
              )}
            </Folder>
          ))}
          {files.map((file, index) => (
            <File key={index}>
              <FileThumbnail src="http://via.placeholder.com/250x250" alt="썸네일 이미지" />
              <FileLabel>
                <h3>{file.name}</h3>
                <p>
                  {file.liked ? (
                    <PiHeartStraightBreakFill onClick={() => toggleLike(index)} />
                  ) : (
                    <PiHeartStraightBreak onClick={() => toggleLike(index)} />
                  )}
                  {file.likes}
                </p>
                <p>작성자 {file.author}님</p>
              </FileLabel>
            </File>
          ))}
        </ItemContainer>
      </Content>
    </Container>
    <MenuBar/>
    </>
  );
};

export default Clipping;
