import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface InitialState {
  currentUser: undefined;
  author: undefined;
  loading?: boolean;
  error?: string; 
}

const initialState: InitialState = {
  currentUser: undefined,
  author: undefined,
  loading: false,
  error: "",
};

export const currentUserSlice = createSlice({
  name: "currentUserSlice",
  initialState,
  reducers: {
    setCurrentUser: ( state, action: PayloadAction<InitialState> ) => {
      state.currentUser = action.payload.currentUser;
      state.loading = false;
      state.error = "";
    },
    setAuthor: ( state, action: any ) => {
      state.author = action.payload.user;
      state.loading = false;
      state.error = ""; 
    },
    requestStart: (state) => {
      state.loading = true;
    },
    requestFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.currentUser = undefined;
      state.loading = false;
      state.error = "";
    },
    
  },
} );


export const {
  setCurrentUser,
  setAuthor,
  requestStart,
  requestFail, 
} = currentUserSlice.actions;

export default currentUserSlice.reducer;
