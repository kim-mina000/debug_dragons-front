import axios from "axios"
import { BACK_URL } from "../config";

export const registerBookmark = async (landmarkNo, userId) => {
  const userToken = localStorage.getItem('userToken');
  const bookmark = {
    'bookmarkNo' : 0,
    'member': userId,
    'landmark': landmarkNo
  };
  try {
    await axios.post(`${BACK_URL}/bookmark/register`,bookmark,{
      headers:{
        Authorization: userToken
      }
    })
  } catch (error) {
    console.error(error);
  }
}

export const readBookmark = async (userId) => {
  const userToken = localStorage.getItem('userToken');
  try {
    const response = await axios.get(`${BACK_URL}/bookmark/read?id=${userId}`,{
      headers:{
        Authorization: userToken
      }
    });
    return response.data;

  } catch (error) {
    console.error(error);
  }
}

export const readBookmarkByLandmarkNo = async (landmarkNo)=>{
  const userToken = localStorage.getItem('userToken');
  try {
    const response = await axios.get(`${BACK_URL}/bookmark/readByNo?no=${landmarkNo}`,{
      headers:{
        Authorization: userToken
      }
    });
    console.log(response.data);
    return response.data;

  } catch (error) {
    console.error(error);
  }
}

export const deleteBookmark = async (landmarkNo, userId) => {
  console.log(landmarkNo);
  try {
    const userToken = localStorage.getItem('userToken');
    await axios.get(`${BACK_URL}/bookmark/delete?no=${landmarkNo}`,{
      headers:{
        Authorization: userToken
      }
    })
  } catch (error) {
    console.error(error);
  }
}

export const toggleBookmark = async (landmarkNo, userId) => {
  const userToken = localStorage.getItem('userToken');
  try {
    await axios.get(`${BACK_URL}/bookmark/toggle?id=${userId}&no=${landmarkNo}`,{
      headers:{
        Authorization: userToken
      }
    });

  } catch (error) {
    console.error(error);
  }
}