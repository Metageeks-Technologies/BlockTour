import { createSlice } from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

export interface InitialState {
  news: [];
  loading?: boolean;
  error?: string; 
}

const initialState: InitialState = {
  news: [],
  loading: false,
  error: "",
};

export const newsSlice = createSlice({
    name: "newsSlice",
  initialState,
  reducers: {
    setNews: ( state, action: PayloadAction<InitialState> ) => {
      state.news = action.payload.news;
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

export const {setNews, requestStart, requestFail} = newsSlice.actions;

export default newsSlice.reducer;
