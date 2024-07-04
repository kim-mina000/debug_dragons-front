import React, { useState } from 'react';
import styled from 'styled-components';
import { RiFolderAddLine, RiFolderAddFill } from "react-icons/ri";
import { MdFolder } from "react-icons/md";

const Container = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FolderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
`;

const Folder = styled.div`
  width: 100px;
  text-align: center;
  cursor: pointer;
`;

const FolderIcon = styled(MdFolder)`
  width: 100%;
  height: 100%;
`;

const AddFolderIcon = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  cursor: pointer;
  
  &:hover .add-before {
    display: none;
  }
  
  &:hover .add-after {
    display: block;
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

const Input = styled.input`
  width: 100px;
  text-align: center;
  border: none;
  background: transparent;
  border-bottom: 1px solid #ccc;
  
  &:focus {
    outline: none;
    border-bottom: 1px solid black;
  }
`;

const Clipping = () => {
  const [folders, setFolders] = useState([
    { id: 1, name: "폴더1", isEditing: false },
    { id: 2, name: "폴더2", isEditing: false },
  ]);
  
  const [files] = useState(["파일1", "파일2", "파일3"]);

  const addFolder = () => {
    const newFolder = {
      id: folders.length + 1,
      name: "폴더 이름을 입력해주세요.",
      isEditing: true,
    };
    setFolders([...folders, newFolder]);
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

  return (
    <Container>
      <FolderContainer>
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
              folder.name
            )}
          </Folder>
        ))}
        <AddFolderIcon onClick={addFolder}>
          <IconHoverBf className="add-before" />
          <IconHoverAf className="add-after" />
        </AddFolderIcon>
      </FolderContainer>
      <div>
        {files.map((file, index) => (
          <div key={index}>{file}</div>
        ))}
      </div>
    </Container>
  );
};

export default Clipping;
