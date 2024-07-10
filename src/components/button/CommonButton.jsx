import styled from "styled-components";

const SaveButton = styled.button`
  width: 170px;
  height: 50px;
  border-radius: 15px;
  position: absolute;
  bottom: 5%;
  right: 1.5%;
  background-color: black;
  outline: none;
  border: 0px;
  color: white;

  cursor: pointer;

  &:hover {
    background-color: #8fa4bf;
  }

  font-size: 20px;
  z-index: 50;

`;

function CommonButton({content}) {
  return (
    <SaveButton>
      {content}
    </SaveButton>
  );
};

export default CommonButton;