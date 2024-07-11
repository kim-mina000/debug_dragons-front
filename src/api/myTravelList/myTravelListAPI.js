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