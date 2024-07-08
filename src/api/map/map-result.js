import axios from "axios";
import { BACK_URL } from "../config";

export const landmarkResponse = async (formData) => {
  try {
    const response = await axios.get(`${BACK_URL}/landmark/read`, formData);
    return await response.data;
  } catch (error) {

    console.error('error', error);
  }
};

export const handleSaveAll = async (formData) =>{
  try {
    await axios.post(`${BACK_URL}/landmark/modifyLandmark`, formData);
    console.log('수정데이터 기기');
  } catch (error) {
    console.error(error);
  }
};