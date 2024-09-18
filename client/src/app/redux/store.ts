import { configureStore } from "@reduxjs/toolkit";
import {adminSlice} from "./feature/admin/slice";
// import userReducer from "./feature/user/slice";
import adminReducer from "./feature/admin/slice";
import contributorReducer from "./feature/contributor/slice";
import categoryReducer from "./feature/category/slice";
import postReducer from "./feature/posts/slice";

export const store = configureStore({
  reducer: {
    // superAdmin: adminSlice.reducer, 
    superAdmin: adminReducer,
    contributor: contributorReducer,  
    category: categoryReducer,
    post : postReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
