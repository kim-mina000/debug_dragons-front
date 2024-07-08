import axios from "axios"
import { BACK_URL, KAKAO_RESTKEY } from "../config";


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

export function addEventHandle(target, type, callback) {
  if (target.addEventListener) {
      target.addEventListener(type, callback);
  } else {
      target.attachEvent('on' + type, callback);
  }
}



// function removeMarker() {
//   for ( var i = 0; i < markers.length; i++ ) {
//       markers[i].setMap(null);
//   }   
//   markers = [];
// }

export const searchLandmark = async (address) => {
  try {
    // 대형마트 편의점 주차장 주유소 지하철역 은행 문화시설 공공기관 관광명소 숙박 음식점 카페 검색
    // https://developers.kakao.com/docs/latest/ko/local/dev-guide#search-by-category-request-category-group-code
    const response = await axios.get(`https://dapi.kakao.com/v2/local/search/category.json?category_group_code=MT1,CS2,PK6,OL7,SW8,CT1,AT4,AD5,FD6,CE7&x=${address.La}&y=${address.Ma}&radius=100`,{
      headers :{
        Authorization: `KakaoAK ${KAKAO_RESTKEY}`
      }
    })
    return await response.data;
  } catch (error) {
    console.error(error);
  }
}

export const xyToAddress = async (x,y) => {
  try {
    const response = await axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${x}&y=${y}`,{
      headers:{
        Authorization : `KakaoAK ${KAKAO_RESTKEY}`
      }
    })
    return await response.data;
  } catch (error) {
    console.error(error);
  }
}