import axios from "axios";
import { BACK_URL } from "../config";

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