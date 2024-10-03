import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LikeState {
  loading: boolean;
  error: string | null;
}

const initialState: LikeState = {
  loading: false,
  error: null,
};

export const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    requestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    requestSuccess: (state) => {
      state.loading = false;
    },
    requestFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { requestStart, requestSuccess, requestFail } = likeSlice.actions;

export default likeSlice.reducer;