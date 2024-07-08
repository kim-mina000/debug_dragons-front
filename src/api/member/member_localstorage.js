import { json } from "react-router-dom";

export const getLocalStorages = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return userInfo;
};