import axios from "axios";
import {BACK_URL} from "../config";


/* 해당 Landmark게시글 하나에 적용(LandmarkNo로 구분)
: 좋아요 추가, 제거는 true, false값으로 구분 */
const token = localStorage.getItem('userToken');
const toggleLike = async (landmarkNo, userId)=>{
  try {
    const response = await axios.post(`${BACK_URL}/landmarkLike/isLike`,{
      landmrkNo: landmarkNo,
      userId : userId
    },{
      headers:{
        Authorization:token
      }
    });
    return response.data;   //성공하면 서버에서 반환한 데이터
  } catch (error) {
    console.log('좋아요에러' +error );
  };
};


// 해당 Landmark게시글의 true갯수 헤아림(좋아요 갯수)
const LikeCount = async()=>{
  try {
    const response = await axios.get(`${BACK_URL}/landmarkLike/${landmarkNo}/likes`);
    return response.data;
  } catch (error) {
    console.log('좋아요갯수에러' + error);
  };
};



