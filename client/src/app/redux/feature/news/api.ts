import instance from "@/utils/axios";
import {AppDispatch} from "../../store";
import {requestFail, requestStart, setNews} from "./slice";

export const getAllNews = async (dispatch:AppDispatch) => {
  dispatch(requestStart()); 
    try {
        const response = await instance.get( '/news' );
            dispatch(setNews(response.data))
    } catch (error:any) {
        console.error( error );
    dispatch(requestFail(error.message));     }
}; 



