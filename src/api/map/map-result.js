import axios from "axios";
import { BACK_URL } from "../config";
import { v4 } from "uuid";

// 아이디로 랜드마크 데이터 가져오기
export const getLandmarkResponse = async (userId) => {
  try {
    const response = await axios.get(`${BACK_URL}/landmark/read?id=${userId}`);
    
    if(response.data){
      const result = await response.data.filter(item => item.landmarkOrigin === false);
      return result;
    } else {
      return [];
    }

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

export const handleMappingSave = async (data,id, selectedInformation) => {
  try {
    const {place, date, person} = selectedInformation;
    const information = place[0]+' #'+date.join(' #')+' '+ (person.adults+person.children+person.infants+person.pets) +'명';
    // 여기 information 백으로 보내주기 아님 selectedInformation 보내줘도될듯 ★

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