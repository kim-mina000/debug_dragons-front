import axios from "axios"
import { BACK_URL } from "../config"

export const getShareTravelList = async () => {

  try {
    const response = await axios.get(`${BACK_URL}//`)
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}