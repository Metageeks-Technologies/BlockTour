import instance from "@/utils/axios";
import {AppDispatch} from "../../store";
import {requestFail, requestStart, setCategory} from "./slice";



export const getAllCategories = async (dispatch:AppDispatch) => {
  dispatch(requestStart()); 
    try {
        const response = await instance.get( '/category/all-categories' );
        dispatch(setCategory(response.data))
    } catch (error:any) {
        console.error( error );
    dispatch(requestFail(error.message));     }
};

export const getCategory = async (dispatch:AppDispatch, id:string) => {
  dispatch(requestStart()); 
    try {
        const response = await instance.get( `category/category/${id}` );
        dispatch(setCategory(response.data))
    } catch (error:any) {
        console.error( error );
        dispatch( requestFail( error.message ) );
    }
};

export const addCategory = async (dispatch:AppDispatch, category:any) => {
  dispatch(requestStart()); 
    try {
        const response = await instance.post( '/category/category', category );
        dispatch(setCategory(response.data))
    } catch (error:any) {
        console.error( error );
        dispatch( requestFail( error.message ) );
    }
};

export const updateCategory = async (dispatch:AppDispatch, category:any, id:string) => {
  dispatch(requestStart()); 
    try {
        const response = await instance.put( `category/category/${id}`, category );
        dispatch(setCategory(response.data))
    } catch (error:any) {
        console.error( error );
        dispatch( requestFail( error.message ) );
    }
};

export const deleteCategory = async (dispatch:AppDispatch, id:string) => {
  dispatch(requestStart()); 
    try {
        const response = await instance.delete( `category/category/${id}` );
        dispatch(setCategory(response.data))
    } catch (error:any) {
        console.error( error );
        dispatch( requestFail( error.message ) );
    }
};

