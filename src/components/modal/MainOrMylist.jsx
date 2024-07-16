import { IoIosArrowRoundForward, IoIosReturnLeft } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(255,255,192,0.1);
  backdrop-filter: blur(10px);
  position: fixed;
  top:0;
  z-index: 8;
  display: flex;
  align-items: center;
  flex-direction: column;
  `;

const SaveButton = styled.button`
  position: relative;
  top: 30%;
  width: 350px;
  height: 50px;
  border-radius: 15px;
  background-color: black;
  outline: none;
  border: 0px;
  color: white;

  cursor: pointer;

  &:hover {
    background-color: #8fa4bf;
  }
  &+&{
    margin-top: 35px;
  }
  

  font-size: 20px;
  z-index: 50;

`;

function MainOrMylist({setIsWhereIgo}) {
  const navigate = useNavigate();
  return (
    <Wrap>

      <SaveButton onClick={()=>{setIsWhereIgo(false)}}>더많은 코스 만들기 <IoIosReturnLeft /></SaveButton>
      <SaveButton onClick={()=>{navigate('/main/MyTravelList')}}>저장된 리스트 보러가기 <IoIosArrowRoundForward /></SaveButton>

    </Wrap>
  );
};

export default MainOrMylist;