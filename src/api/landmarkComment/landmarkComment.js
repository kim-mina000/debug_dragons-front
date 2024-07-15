import axios from "axios";
import { BACK_URL } from "../config";


// 댓글목록 가져오기
export const fetchLandmarkComment = async (landmarkNo) => {
  try {
    const response = await axios.get(`${BACK_URL}/landmarkComment/list?landmarkNo=${landmarkNo}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  };
};

// const token = localStorage.getItem('userToken');
const token = localStorage.getItem('userToken');

// 댓글등록
export const registerLandmarkComment = async (newComment) => {
  try {
    const response = await axios.post(`${BACK_URL}/landmarkComment/register`, newComment, {
      headers: {
        Authorization: token
      }
    });
    return response.data.writer;
    // 댓글등록(post시는 리턴 데이터 할필요 없었나나요?)
  } catch (error) {
    console.log(error);
  }
};

// 댓글삭제
export const deleteComment = async (commentNo) => {
  try {
    const response = await axios.delete(`${BACK_URL}/landmarkComment/remove?landmarkcommentNo=${commentNo}`, {
      headers: {
        Authorization: token
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
