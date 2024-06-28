import { createSlice } from "@reduxjs/toolkit";

const initialState ={
  userInfo : {},
  userToken : "",
  
}

const memberSlice = createSlice({
  name:'member',
  initialState,
  reducers:{
    getUserInfo : (state,{payload})=>{
      state.userInfo = payload;
    },
    getUserToken : (state,{payload})=>{
      state.userToken = payload;
    }

  }

});

export default memberSlice.reducer;
export const {getUserInfo} = memberSlice.actions;
