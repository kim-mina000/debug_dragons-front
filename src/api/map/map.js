import axios from "axios"
import { BACK_URL, KAKAO_RESTKEY } from "../config";


export const handleMyTripSave = async (data, userId, imgUrl) => {

  const xy = await addressToXY(data.address_name);
  const postData = {
    "landmarkNo": 0,
    "writer": userId || "사용자",
    "landmarkAddress": data.address_name,
    "landmarkName": data.place_name || data.address_name,
    "landmarkOrigin": true,
    "longitude": data.x || xy.x,
    "latitude": data.y || xy.y,
    "landmarkImgPath" : imgUrl
  }

  try {
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

// 이미지검색
export const searchData = async (keyword)=>{
  try {
    const response = await axios.get(`https://dapi.kakao.com/v2/search/image?query=${keyword}&size=1`,{
      headers:{
        Authorization : `KakaoAK ${KAKAO_RESTKEY}`
      }
    });
    console.log(response.data.documents[0].image_url);
    return await response.data.documents[0].image_url;
  } catch (error) {
    console.error(error);
    return null
  }
}

// 주소로 좌표 찾기
export const addressToXY = async (address)=>{
  try {
    const response = await axios.get(`https://dapi.kakao.com/v2/local/search/address.json?query=${address}`,{
      headers:{
        Authorization : `KakaoAK ${KAKAO_RESTKEY}`
      }
    })
    return await response.data.documents[0].address;
  } catch (error) {
    console.error(error);
  }

}