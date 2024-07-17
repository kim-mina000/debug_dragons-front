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

export const findId = async (userName, userEmail) => {
  try {
    const response = await axios.post(`${BACK_URL}/member/findUserId`,{
      userName: userName,
      userEmail: userEmail
    });
    return response.data;
  } catch (error) {
    console.log('아이디찾기에러' + error);
  }
}