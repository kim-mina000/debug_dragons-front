import React, { useState } from 'react';
import styled from 'styled-components';
import { RiFolderAddLine, RiFolderAddFill } from "react-icons/ri";
import { MdFolder } from "react-icons/md";
import { PiHeartStraightBreak, PiHeartStraightBreakFill } from "react-icons/pi";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Header from '../0.menuBar/Header';
import MenuBar from '../0.menuBar/MenuBar';

// 스타일 정의
const Container = styled.div`
  width: 100%;
  height: 80vh;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  width: 80%;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ItemContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  flex: 1;
  width: 100%;
  margin: 0 auto 20px;
  padding-bottom: 10%;
`;

const Folder = styled.div`
  width: 100%;
  padding-top: 100%;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed #ccc;
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
  padding-top: 100%;
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
  display: none;
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
  background-color: #fff;
  border: 2px solid #000;
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
  border: 3px solid black;
`;

const FileLabel = styled.div`
  margin-top: 10px;
  font-size: 14px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;

  h3 {
    font-size: 35px;
    margin-bottom: 5%;
    flex: 1;
  }

  .file-info {
    width: 100%;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .label-info {
    display: flex;
    align-items: center;
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

// 드래그 가능한 파일 컴포넌트
const DraggableFile = ({ file, index, toggleLike }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'FILE',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <File ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <FileThumbnail src="http://via.placeholder.com/250x250" alt="썸네일 이미지" />
      <FileLabel>
        <h3>{file.name}</h3>
        <div className="file-info">
          <div className='label-info'>
            {file.liked ? (
              <PiHeartStraightBreakFill onClick={() => toggleLike(index)} />
            ) : (
              <PiHeartStraightBreak onClick={() => toggleLike(index)} />
            )}
            {file.likes}
          </div>
          <div>작성자 {file.author}님</div>
        </div>
      </FileLabel>
    </File>
  );
};

// 드롭 가능한 폴더 컴포넌트
const DroppableFolder = ({ folder, onDrop, handleFolderClick, handleInputChange, handleInputBlur }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'FILE',
    drop: (item) => onDrop(item.index, folder.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <Folder ref={drop} style={{ backgroundColor: isOver ? 'lightgray' : 'white' }} onClick={() => handleFolderClick(folder.id)}>
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
          <div>저장된 페이지 수: {folder.pages.length}개</div>
        </>
      )}
    </Folder>
  );
};

const Clipping = () => {
  const [folders, setFolders] = useState([
    { id: 1, name: "강아지랑 같이 가야만...", pages: [] },
    { id: 2, name: "제목을 내게.......", pages: [], author: "(ooo)" },
  ]);

  const [files, setFiles] = useState([
    { name: "밍고랑 같이 다녀온 강원도🐶💚", likes: 510, author: "(김지연)", liked: false },
    { name: "시리와 한번 더 대전🚅🚄", likes: 221, author: "(김민아)", liked: false },
    { name: "마리랑 하루랑 현아랑🌸🌸", likes: 309, author: "(최현아)", liked: false },
  ]);

  const addFolder = () => {
    const newFolder = {
      id: folders.length + 1,
      name: "폴더 이름을 입력해주세요.",
      isEditing: true,
      pages: []
    };
    setFolders([newFolder, ...folders]);
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

  const handleDrop = (fileIndex, folderId) => {
    const file = files[fileIndex];
    const updatedFolders = folders.map(folder =>
      folder.id === folderId ? { ...folder, pages: [...folder.pages, file] } : folder
    );
    setFolders(updatedFolders);

    const updatedFiles = files.filter((_, index) => index !== fileIndex);
    setFiles(updatedFiles);
  };

  const toggleLike = (index) => {
    const updatedFiles = [...files];
    updatedFiles[index].liked = !updatedFiles[index].liked;
    setFiles(updatedFiles);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Header />
      <Container>
        <Content>
          <ItemContainer>
            <AddFolderIcon onClick={addFolder}>
              <IconHoverBf className="add-before" />
              <IconHoverAf className="add-after" />
            </AddFolderIcon>
            {folders.map(folder => (
              <DroppableFolder
                key={folder.id}
                folder={folder}
                onDrop={handleDrop}
                handleFolderClick={handleFolderClick}
                handleInputChange={handleInputChange}
                handleInputBlur={handleInputBlur}
              />
            ))}
            {files.map((file, index) => (
              <DraggableFile key={index} file={file} index={index} toggleLike={toggleLike} />
            ))}
          </ItemContainer>
        </Content>
      </Container>
      <MenuBar />
    </DndProvider>
  );
};

export default Clipping;
