import axios from 'axios';

const {Kakao} = window;

// 내 어플리케이션의 자바스크립트 키 입력
Kakao.init('02a031fabfd172ce7cd288e0d8cd83a9'); // 자바 키
Kakao.isInitialized();

const client_id = '9d4de3df4c7c5e0199e412627381f00a'; // REST API 키
export const REDIRECT_URI = 'http://localhost:3001/main';


  // 아래는 데모를 위한 UI 코드입니다.
export function displayToken() {
    var token = getCookie('authorize-access-token');

  if(token) {
    Kakao.Auth.setAccessToken(token);
    Kakao.Auth.getStatusInfo()
      .then(function(res) {
        console.log(res);
        if (res.status === 'connected') {
          document.getElementById('token-result').innerText
            = 'login success, token: ' + Kakao.Auth.getAccessToken();
        }
      })
      .catch(function(err) {
        Kakao.Auth.setAccessToken(null);
        console.error(err);
      });
    }
}

function getCookie(name) {
  var parts = document.cookie.split(name + '=');
  if (parts.length === 2) { return parts[1].split(';')[0]; }
}

const getToken = async (code) => {
  const grant_type = 'authorization_code';
  const AUTHORIZE_CODE = code;
  
  const res = await axios.post(
    // post 요청을 보낼 url
    `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${REDIRECT_URI}&code=${AUTHORIZE_CODE}`,
    // 보낼 내용
    {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    },
  ).catch((err)=>{
    console.error(err);
  });

  const token = res.data.access_token;
  console.log(token);
  return await token;
}


export const getUserData = async () => {
  // 코드에서 파람을 추출하여 토큰 발급 -> 유저데이터 반환
  const params = new URL(document.location.toString()).searchParams;
  const code = params.get('code');

  if (code) {
    const token = await getToken(code);
    console.log("getCodeParam token:: "+token);
    const kakaoUser = await axios.get('https://kapi.kakao.com/v2/user/me', { headers :{Authorization: `Bearer ${token}`} });  
    console.log("getCodeParam kakaoUser:: "+kakaoUser.data);
    return kakaoUser.data;

  } else {
    console.error("토큰을 발행할수 없습니다");
    return ;
  }
};
