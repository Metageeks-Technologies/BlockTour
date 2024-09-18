import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Post {
    _id: string;
    title: string;
    permaLink: string;
    description: string;
    publishedDate?: Date; 
    visibility?: string; 
    status: string;
    category?: string[]; 
    tags?: string[]; 
    postSliderImageUrl?: string; 
    postSettingImageUrl?: string; 
    previewImageUrl?: string; 
    authorName?: string;
    postType?: string; 
}

interface PostState {
    posts: Post[];
    currentPost: Post | null;
    loading: boolean;
    error: string | null;
}

const initialState: PostState = {
    posts: [],
    currentPost: null,
    loading: false,
    error: null,
};

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        fetchPostsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchPostsSuccess(state, action: PayloadAction<Post[]>) {
            state.posts = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchCurrentPost ( state, action: PayloadAction<Post> ) {
            state.currentPost = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchPostsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchPostsStart, fetchPostsSuccess,fetchCurrentPost, fetchPostsFailure } = postSlice.actions;

export default postSlice.reducer;