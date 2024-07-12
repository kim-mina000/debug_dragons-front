import React, { useState } from 'react';
import styled from 'styled-components';
import { RiFolderAddLine, RiFolderAddFill } from "react-icons/ri";
import { MdFolder } from "react-icons/md";
import { PiHeartStraightBreak, PiHeartStraightBreakFill } from "react-icons/pi";

const Container = styled.div`
  width: 100%;
  height: 80vh; /* 전체 영역의 80% */
  padding: 20px 0;
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
    flex: 1; /* 파일 이름을 왼쪽에 정렬 */
  }

  .file-info {
    width: 100%;
    margin-top: 10px; /* 여유 공간을 조절할 수 있습니다. */
    display: flex;
    justify-content: space-between; /* 좋아요 아이콘과 좋아요 수를 오른쪽으로 정렬 */
  }

  .label-info {
    display: flex;
    align-items: center; /* 아이콘과 텍스트를 수직으로 정렬 */
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
    { name: "밍고랑 같이 다녀온 강원도🐶💚", likes: 510, author: "(김지연)", liked: false },
    { name: "시리와 한번 더 대전🚅🚄", likes: 221, author: "(김민아)", liked: false },
    { name: "마리랑 하루랑 현아랑🌸🌸", likes: 309, author: "(최현아)", liked: false },
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
          ))}
        </ItemContainer>
      </Content>
    </Container>
    </>
  );
};

export default Clipping;
