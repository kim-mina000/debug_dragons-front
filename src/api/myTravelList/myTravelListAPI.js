import axios from "axios";
import { BACK_URL } from "../config";

// 코스랜드마크 DB
export const getMyTravelList = async (userId) => {
  try {
    const userToken = localStorage.getItem('userToken');
    const response = await axios.get(`${BACK_URL}/course/read?id=${userId}`,{
      headers:{
        Authorization : userToken
      }
    });
    return response.data;

  } catch (error) {
    console.error(error);
  }
}

// LCMapping DB
// 코스 명으로 검색
export const getMyTravelListDetail = async (courseNo) => {
  try {
    const userToken = localStorage.getItem('userToken');
    const response = await axios.get(`${BACK_URL}/lc/read?courseNo=${courseNo}`,{
      headers:{
        Authorization : userToken
      }
    })
    return response.data;

  } catch (error) {
    console.error(error);
  }
}

// LCMapping DB
// 아이디로 해당 유저가 작성한 코스 검색
export const getMyTravelListById = async (userId) => {
  try {
    const userToken = localStorage.getItem('userToken');
    const response = await axios.get(`${BACK_URL}/lc/read?id=${userId}`,{
      headers:{
        Authorization : userToken
      }
    })
    return response.data;
  } catch (error) {
    console.error(error);
  }
}


// Landmark DB
export const getLandmarkInfo = async (landmarkNo) => {

  try {
    const userToken = localStorage.getItem('userToken');
    const response = await axios.get(`${BACK_URL}/landmark/readPK?landmarkNo=${landmarkNo}`,{
      headers:{
        Authorization : userToken
      }
    })
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// 내 landmark 공유하기
export const postShareMyLandmark = async (landmarkList) => {
  try {
    const userToken = localStorage.getItem('userToken');
    const response = await axios.post(`${BACK_URL}/landmark/changeOrigin`, landmarkList, {
      headers:{
        Authorization : userToken
      }
    }
  )
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// img 업로드
// controller만들어야함
export const uploadMyImg = async (file, landmarkNo) => {

  const formData = new FormData();
  formData.append('landmarkNo', landmarkNo);
  formData.append('file', file);

  try {
    const userToken = localStorage.getItem('userToken');
    const response = await axios.post(`${BACK_URL}/landmark/upload?no=${landmarkNo}`, formData, {
      headers:{
        Authorization : userToken
      }
    }
  )
  return response.data;
  } catch (error) {
    
  }
}