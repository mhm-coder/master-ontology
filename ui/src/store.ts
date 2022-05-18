import {configureStore} from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { conceptSlice } from "./slices/conceptSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    concept: conceptSlice.reducer
  }
})
debugger
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch