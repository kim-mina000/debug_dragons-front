import axios from "axios";

// 백서버로 데이터 전송
export const addUserData = async (user) => {
  try {
    const response = await axios.post("http://localhost:8080/member/register",
    {
      "userId": `${user.id}`,
      "userPw": `${user}`,
      "userName": `${user.properties.nickname}`,
      "userProfileImagePath": `${user.properties.profile_image}`,
      "userRole": false
    });
    
    if (response.status === 201) { // 응답 코드가 200 OK 일때만 결과를 리턴
      return response.data;
    } else {
      throw new Error(`api error: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);     
  }
};
