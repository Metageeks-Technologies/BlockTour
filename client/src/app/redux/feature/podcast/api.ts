import instance from "@/utils/axios";
import {AppDispatch} from "../../store";
import {fetchCurrentPodcast, fetchPodcastsFailure, fetchPodcastsStart, fetchPodcastsSuccess} from "./slice";


export const getAllPodcasts = async (dispatch:AppDispatch) => {
  dispatch(fetchPodcastsStart()); 
    try {
        const response = await instance.get( '/podcast/all-podcasts' );
        dispatch(fetchPodcastsSuccess(response.data.posts))
    } catch (error:any) {
        console.error( error );
    dispatch(fetchPodcastsFailure(error.message));     }
};

export const getPodcastById = async (dispatch:AppDispatch, id:string) => {
  dispatch(fetchPodcastsStart()); 
    try {
        const response = await instance.get( `podcast/podcast/${id}` );
        console.log(response)
        dispatch(fetchCurrentPodcast(response.data.post.filter((post:any)=>post.status.toLowerCase()==="published")))
    } catch (error:any) {
        console.error( error );
        dispatch( fetchPodcastsFailure( error.message ) );
    }
};
