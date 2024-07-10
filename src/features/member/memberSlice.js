import { createSlice } from "@reduxjs/toolkit";

const initialState ={
  userInfo : {},
  userToken : null,
  
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
  }
});

export const
{getUserInfo,
  getUserToken,
  logout,
  updateProfileImage,
}
= memberSlice.actions;
export const selectUser = (state) => state.member.userInfo;

export default memberSlice.reducer;