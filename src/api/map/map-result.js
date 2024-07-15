import axios from "axios";
import { BACK_URL } from "../config";
import { v4 } from "uuid";

// 아이디로 랜드마크 데이터 가져오기
export const getLandmarkResponse = async (userId) => {
  try {
    const response = await axios.get(`${BACK_URL}/landmark/read?id=${userId}`);
    const result = await response.data?.filter(item => item.landmarkOrigin === false);

    return result;
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
      await axios.post(`${BACK_URL}/lc/register?id=${id}`, lcMapping);
    }
  } catch (error) {
    console.error(error);
  }
}