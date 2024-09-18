import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface InitialState {
  admin: undefined;
  loading?: boolean;
  error?: string; 
}

const initialState: InitialState = {
  admin: undefined,
  loading: false,
  error: "",
};

export const adminSlice = createSlice({
  name: "adminSlice",
  initialState,
  reducers: {
    setCurrAdmin: ( state, action: PayloadAction<InitialState> ) => {
      state.admin = action.payload.admin;
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
      state.admin = undefined;
      state.loading = false;
      state.error = "";
    },
    
  },
} );


export const {
  setCurrAdmin,
  requestStart,
  requestFail, 
} = adminSlice.actions;

export default adminSlice.reducer;
