
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Podcast {
   _id: string;
   title: string;
   permaLink: string;
   embededCode: string;
   publishedDate?: Date; 
   visibility?: string; 
   status: string;
   category?: string[]; 
   tags?: string[]; 
}

interface PodcastState {
    podcasts: Podcast[];
    currentPodcast: Podcast | null;
    loading: boolean;
    error: string | null;
}

const initialState: PodcastState = {
    podcasts: [],
    currentPodcast: null,
    loading: false,
    error: null,
};

const postSlice = createSlice({
    name: 'podcast',
    initialState,
    reducers: {
        fetchPodcastsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchPodcastsSuccess(state, action: PayloadAction<Podcast[]>) {
            state.podcasts = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchCurrentPodcast ( state, action: PayloadAction<Podcast> ) {
            state.currentPodcast = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchPodcastsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {fetchPodcastsStart, fetchPodcastsSuccess, fetchCurrentPodcast, fetchPodcastsFailure} = postSlice.actions;
export default postSlice.reducer;