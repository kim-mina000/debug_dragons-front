import axios from 'axios';

export const {Kakao} = window;

// 내 어플리케이션의 자바스크립트 키 입력
Kakao.init('02a031fabfd172ce7cd288e0d8cd83a9');
Kakao.isInitialized();

// 로그인 과정 예시
function loginWithKakao() {
    Kakao.Auth.authorize({
      redirectUri: 'https://developers.kakao.com/tool/demo/oauth',
    });
}

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

const getToken = async code => {
  const grant_type = 'authorization_code';
  // const client_id = '02a031fabfd172ce7cd288e0d8cd83a9'; JS키
  const client_id = '9d4de3df4c7c5e0199e412627381f00a';
  const REDIRECT_URI = 'http://localhost:3001/search-main';
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

  const token = await res.data.access_token;
  console.log(token);
  return token;

}


  export function getCodeParam() {
    const params = new URL(document.location.toString()).searchParams;
    const code = params.get('code');

    if (code) {
      const token = getToken(code);
      return token;

    } else {
      console.error("토큰을 발행할수 없습니다");
      return ;
    }
  };

//   const getKaKaoUserData = async token => {
//     const kakaoUser = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//     })
    
//     return await kakaoUser.data
// }
  
// getKaKaoUserData(token);

