import instance from "@/utils/axios";
import {
  setCurrentUser,
  requestStart,
  requestFail,
  setAuthor, 
} from "./slice";
import type { AppDispatch } from "@/app/redux/store";
import type { AxiosError } from "axios";

export const getCurrentUser = async (dispatch: AppDispatch) => {
  dispatch(requestStart());
  try {
    const response = await instance.get(`/auth/user/getCurrUser`);
    console.log("User", response.data);
    dispatch(setCurrentUser(response.data));
  } catch (error) {
    const e = error as AxiosError;
    console.log("Error:-",error,"e:-",e)
    dispatch(requestFail(e.message));
  }
};

// logout
export const logout = async (dispatch: AppDispatch) => {
  dispatch(requestStart());
  try {
    await instance.get(`/auth/user/logout`);
    dispatch(setCurrentUser({ currentUser: undefined, author: undefined }));
  } catch (error) {
    const e = error as AxiosError;
    dispatch(requestFail(e.message));
  }
}; 


export const getAuthor = async ( dispatch: AppDispatch,id:string ) => {
  dispatch( requestStart() ); 
  try {
    const response = await instance.get( `/auth/user/${id}` );
    dispatch( setAuthor( response.data ) );
  } catch ( error ) {
    const e = error as AxiosError;
    dispatch( requestFail( e.message ) );
  } 
} 


