import instance from "@/utils/axios";
import {AppDispatch} from "../../store";
import {fetchCurrentPost, fetchPostsFailure, fetchPostsStart, fetchPostsSuccess} from "./slice"; 

export const getAllPosts = async (dispatch:AppDispatch) => {
  dispatch(fetchPostsStart()); 
    try {
        const response = await instance.get( '/post/all-posts' );
        console.log("response:-",response)
        dispatch(fetchPostsSuccess(response.data.posts.filter((post:any)=>post.status.toLowerCase()==="published")))
    } catch (error:any) {
        console.error( error );
    dispatch(fetchPostsFailure(error.message));     }
};

export const getPostById = async (dispatch:AppDispatch, id:string) => {
  dispatch(fetchPostsStart()); 
    try {
        const response = await instance.get( `post/post/${id}` );
        console.log(response)
        dispatch(fetchCurrentPost(response.data.post))
    } catch (error:any) {
        console.error( error );
        dispatch( fetchPostsFailure( error.message ) );
    }
};
