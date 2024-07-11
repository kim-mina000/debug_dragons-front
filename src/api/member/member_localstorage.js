import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from '../../features/member/memberSlice';


export const getLocalStorages = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return userInfo;
};

// export const handleLogout = async () => {
//   const token = localStorage.getItem('userToken');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   await axios.get(`${BACK_URL}/logout`, {headers:{
//     Authorization: token,
//   }});

//   dispatch(logout());
  
//   localStorage.removeItem('userToken');
//   localStorage.removeItem('userInfo');
//   navigate('/');
// }