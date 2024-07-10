import axios from "axios";
import { BACK_URL } from "../config";
import { v4 } from "uuid";

export const landmarkResponse = async (userId) => {
  try {
    const response = await axios.get(`${BACK_URL}/landmark/read?id=${userId}`);
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

export const handleDelete = async (data) =>{
  try {
    await axios.delete(`${BACK_URL}/landmark/modifyLandmark?id=${data.landmarkNo}`);
  } catch (error) {
    console.error(error);
  }

}

export const handleMappingSave = async (data,id) => {
  try {
    const courseId = v4().substring(0,10);

    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      const lcMapping = {
        "LCMappingNo" : 0,
        "landmarkNo": element.landmarkNo,
        "orderNumber": index,
        "isSave": true,
        "courseNo":courseId
      }
      console.log(lcMapping);
      await axios.post(`${BACK_URL}/lc/register?id=${id}`, lcMapping);


    }
  } catch (error) {
    console.error(error);
  }
}