import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { RiFolderAddLine, RiFolderAddFill } from "react-icons/ri";
import { MdFolder } from "react-icons/md";
import { PiHeartStraightBreak, PiHeartStraightBreakFill } from "react-icons/pi";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import MenuBar from '../0.menuBar/MenuBar';
import { readBookmark, readBookmarkByLandmarkNo } from '../../api/bookmark/bookmarkAPI';
import { useSelector } from 'react-redux';
import { getLandmarkInfo } from '../../api/myTravelList/myTravelListAPI';

// 스타일 정의
const Container = styled.div`
  width: 100%;
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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* 반응형 그리드 */
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
  transition: all 0.3s ease; /* transition 추가 */
  font-size: calc(14px + (20 - 14) * ((100vw - 300px) / (1600 - 300))); /* 폰트 크기 반응형 조정 */
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
  transition: all 0.3s ease; /* transition 추가 */
  font-size: calc(14px + (20 - 14) * ((100vw - 300px) / (1600 - 300))); /* 폰트 크기 반응형 조정 */

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
  transition: all 0.3s ease; /* transition 추가 */
  font-size: calc(14px + (20 - 14) * ((100vw - 300px) / (1600 - 300))); /* 폰트 크기 반응형 조정 */
`;

const FileThumbnail = styled.img`
  width: ${({ inFolder }) => (inFolder ? '70%' : '80%')};
  height: ${({ inFolder }) => (inFolder ? '70%' : '60%')};
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, 0);
  border: 3px solid black;
`;

const FileLabel = styled.div`
  margin-top: 10px;
  font-size: 80%; 
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${({ inFolder }) => (inFolder ? '70%' : '95%')};

  h3 {
    font-size: 1.1rem;
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
    font-size: calc(14px + (20 - 14) * ((100vw - 300px) / (1600 - 300))); /* 폰트 크기 반응형 조정 */
  }
`;

const HeartIcon = styled.div`
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
`;

const DraggableFile = ({ file, index, toggleLike, inFolder }) => {

  const [like, setLike] = useState();
  const [{ isDragging }, drag] = useDrag({
    type: 'FILE',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });



  const getLike = async (landmarkNo) => {
    const result = await readBookmarkByLandmarkNo(landmarkNo);    
    console.log(result);
    if(result){
      return result;
    } else {
      return 0;
    }

  };
  console.log(getLike(file.landmarkNo));



  return (
    <File ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <FileThumbnail src={file.landmarkImgPath} alt="썸네일 이미지" inFolder={inFolder} />
      <FileLabel inFolder={inFolder}>
        <h3>{file.landmarkName}</h3>
        <div className="file-info">
          <div className='label-info'>
            {file.liked ? (
              <PiHeartStraightBreakFill onClick={() => toggleLike(index)} />
            ) : (
              <PiHeartStraightBreak onClick={() => toggleLike(index)} />
            )}
            {/* {getLike(file.landmarkNo).then(res => res)} */}
          </div>
          <div style={{ fontSize: '0.7rem' }}>작성자 {file.writer}님</div> 
        </div>
      </FileLabel>
    </File>
  );
};

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

const FolderContentContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 80%;
  height: 80%;
  background: white;
  border: 2px solid black;
  padding: 20px;
  transform: translate(-50%, -50%);
  z-index: 100;
  overflow: auto;
`;

const FolderContent = ({ folder, onClose }) => {
  return (
    <FolderContentContainer>
      <h2>{folder.name}</h2>
      <button onClick={onClose}>닫기</button>
      <ItemContainer>
        {folder.pages.map((file, index) => (
          <DraggableFile key={index} file={file} index={index} inFolder={true} />
        ))}
      </ItemContainer>
    </FolderContentContainer>
  );
};

const Clipping = () => {
  const [files, setFiles] = useState([
    { name: "함께 가기 시작한 날", likes: 1365, author: "(김지연)", liked: false },
    { name: "처음으로 시리 밍고 만난 날", likes: 455, author: "(김민아)", liked: false },
    { name: "💙밍고랑 데이트 간 날💙", likes: 5151, author: "(김지연)", liked: false },
    { name: "대전에서 스윗데이들💛💛", likes: 985, author: "(김민아)", liked: false },
    { name: "한화가 이긴날 07.12❗", likes: 694, author: "(최현아)", liked: false },
    { name: "윤식형님이랑 드라이브", likes: 168, author: "(윤다훈)", liked: false },
    { name: "시리 밍고 마리 하루 모임", likes: 115, author: "(김민아)", liked: false },
    { name: "동강모임 성공적💥", likes: 269, author: "(최현아)", liked: false },
    { name: "다훈형이랑 드라이브", likes: 266, author: "(김윤식)", liked: false },
    { name: "지연샘 보고시품", likes: 658, author: "(지연,민아,현아 공동)", liked: false },
    { name: "플젝...성공적 07.18💨", likes: 106646, author: "(민아,윤식,지연,현아,다훈)", liked: false },
  ]);

  const [folders, setFolders] = useState([
    { id: 1, name: "강아지랑 같이 가야만...", pages: [] },
    { id: 2, name: "제목을 내게.......", pages: [] },
  ]);

  const [openFolder, setOpenFolder] = useState(null);
  const userInfo = useSelector(state => state.member.userInfo);
  
  useEffect(() => {
    const fetchData = async ()=>{
      const res = await readBookmark(userInfo.userId);
      if(res){
        const promiseList = await res.map((bookmark) => getLandmarkInfo(bookmark.landmark));
        const landmarkList = await Promise.all(promiseList);
        setFiles(landmarkList);
      }
    }
    fetchData();
  }, []);

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
    setOpenFolder(id);
  };

  const handleCloseFolder = () => {
    setOpenFolder(null);
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

  const currentFolder = folders.find(folder => folder.id === openFolder);

  return (
    <DndProvider backend={HTML5Backend}>
      <Container>
        {currentFolder ? (
          <FolderContent folder={currentFolder} onClose={handleCloseFolder} />
        ) : (
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
        )}
      </Container>
      <MenuBar />
    </DndProvider>
  );
};

export default Clipping;
