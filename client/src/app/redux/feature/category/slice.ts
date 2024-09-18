import { createSlice } from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

export interface InitialState {
  categories: [];
  loading?: boolean;
  error?: string; 
}

const initialState: InitialState = {
  categories: [],
  loading: false,
  error: "",
};

export const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {
    setCategory: ( state, action: PayloadAction<InitialState> ) => {
      state.categories = action.payload.categories;
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
  },
} );

export const {setCategory, requestStart, requestFail} = categorySlice.actions;

export default categorySlice.reducer;
