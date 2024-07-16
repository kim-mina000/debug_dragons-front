import axios from "axios"
import { BACK_URL } from "../config"

export const getShareTravelList = async () => {
  const response = await axios.get(`${BACK_URL}//`)
}