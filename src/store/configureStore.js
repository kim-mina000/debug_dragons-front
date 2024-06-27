import { configureStore } from "@reduxjs/toolkit";
import memberSlice from "../features/member/memberSlice";


export const store = configureStore({

  reducer:{
    member: memberSlice,

  }

});