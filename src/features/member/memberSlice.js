import { createSlice } from "@reduxjs/toolkit";

const initialState ={
  userInfo : null,
  

}

const memberSlice = createSlice({
  name:'member',
  initialState,
  reducers:{
    getUserInfo : (state,{payload})=>{
      state.userInfo = payload;
    },

  }

});

export default memberSlice.reducer;
