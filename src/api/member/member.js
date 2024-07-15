import axios from "axios";
import { BACK_URL } from "../config";

export const checkDuplicate = async (value) => {
  try {
    const response = await axios.post(`${BACK_URL}/member/check-duplicate`, value);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getLocalStorages = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return userInfo;
};

export const handleImageChange2 = async (uploadFile, userId) => {

  const formData = new FormData();

  formData.append('userId', userId);
  formData.append('file', uploadFile);

  const response = await axios.post(`${BACK_URL}/member/upload`, formData);

  return response.data;
};
