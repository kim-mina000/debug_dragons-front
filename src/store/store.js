import { configureStore } from "@reduxjs/toolkit";
import memberReducer from "../features/member/memberSlice";


export const store = configureStore({
  // 전역 스토어에 리듀서 함수들 등록
  reducer: {
    member: memberReducer,
  }
});