import instance from "@/utils/axios";
import {
  setCurrAdmin,
  requestStart,
  requestFail, 
} from "./slice";
import type { AppDispatch } from "@/app/redux/store";
import type { AxiosError } from "axios";
import {setAuthor} from "../admin/slice";

export const getCurrentAdmin = async (dispatch: AppDispatch) => {
  dispatch(requestStart()); 
  try {
    const response = await instance.get(`/auth/admin/getCurrAdmin`);
    console.log("Admin", response.data);
    dispatch(setCurrAdmin(response.data));
  } catch (error) {
    const e = error as AxiosError;
    console.log( "Error:-", error, "e:-", e ) 
    const response =  await instance.get(`/auth/admin/logout`);;
    console.log( "Logout response:-", response );
    dispatch(requestFail(e.message));
  }
};

// logout
export const logout = async (dispatch: AppDispatch) => {
  dispatch(requestStart());
  try {
    await instance.get(`/auth/admin/logout`);
    dispatch(setCurrAdmin({ admin: undefined }));
  } catch (error) {
    const e = error as AxiosError;
    dispatch(requestFail(e.message));
  }
};

// get author 
export const getAdminAuthor = async ( dispatch: AppDispatch, id: string ) => {
  dispatch( requestStart() );
  try {
    const response = await instance.get( `/auth/admin/get-admin/${id}` );
    console.log("response of admin author:-",response)
    dispatch( setAuthor( response.data ) ); 
  } catch ( error ) {
    const e = error as AxiosError;
    dispatch( requestFail( e.message ) );
  }
}

