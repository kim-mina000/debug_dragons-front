import axios from "axios"
import { BACK_URL } from "../config"


// 공유랜드마크 2번 보여줭
export const getShareTravelList = async () => {

  try {
    const response = await axios.get(`${BACK_URL}/landmark/lookaround`)
    return response.data;
  } catch (error) {
    console.error(error);
  }
}