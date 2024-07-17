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
export const postShareMyLandmark = async () => {
  try {
    const userToken = localStorage.getItem('userToken');
    const response = await axios.get(`${BACK_URL}/landmark/readPK?landmarkNo`,{
      headers:{
        Authorization : userToken
      }
    })
    return response.data;
  } catch (error) {
    console.error(error);
  }
}