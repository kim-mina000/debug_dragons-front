import { createSlice } from "@reduxjs/toolkit";

const initialState ={
  userInfo : {},
  userToken : null,
  isloginNeed : false
  
}

const memberSlice = createSlice({
  name:'member',
  initialState,
  reducers:{
    getUserInfo : (state,{payload: userInfo})=>{
      state.userInfo = userInfo;
    },
    getUserToken : (state,{payload})=>{
      state.userToken = payload;
    },
    logout : (state)=>{
      state.userToken = null;
      state.userInfo = null;
      localStorage.removeItem('member')
    },
    updateProfileImage: (state, { payload: profileImage }) => {
      state.userInfo.userProfileImagePath = profileImage;
    },
    isLoginNeedTrue:(state) => {
      state.isloginNeed = true;
    },
    isloginNeedFalse:(state) => {
      state.isloginNeed = false;
    }
  }
});

export const
{
  getUserInfo,
  getUserToken,
  logout,
  updateProfileImage,
  isLoginNeedTrue, isloginNeedFalse
}
= memberSlice.actions;
export const selectUser = (state) => state.member.userInfo;

export default memberSlice.reducer;