import axios from "axios"
import { BACK_URL } from "../config";


export const handleMyTripSave = async (data, userId, imgUrl) => {

  const postData = {
    "landmarkNo": 0,
    "writer": userId,
    "landmarkAddress": data.address_name,
    "landmarkName": data.place_name,
    "landmarkOrigin": true,
    "longitude": data.x,
    "latitude": data.y,
    "landmarkImgPath" : imgUrl
  }
  console.log(postData);

  try {
    console.log(1);
    const response = await axios.post(`${BACK_URL}/landmark/register`, postData);
    console.log(response.data);
    
  } catch (error) {
    console.error(error);
  }
  
  


}