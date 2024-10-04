import axios from 'axios';
import { AppDispatch } from '../../store';
import { requestStart, requestSuccess, requestFail } from './slice';
import instance from '@/utils/axios';


export const addPostLike = async ( dispatch: AppDispatch, postId: string, userId: string ) => {
  console.log("postId", postId, "userId", userId)
  try {
    dispatch(requestStart());
    await instance.post(`/like/add`, { postId, userId });
    dispatch(requestSuccess());
  } catch (error: any) {
    dispatch(requestFail(error.response?.data?.message || 'Failed to add like'));
  }
};

export const removePostLike = async (dispatch: AppDispatch,postId: string, userId: string) => {
  try {
    dispatch(requestStart());
    await instance.post(`/like/remove`, { postId, userId });
    dispatch(requestSuccess());
  } catch (error: any) {
    dispatch(requestFail(error.response?.data?.message || 'Failed to remove like'));
  }
};

export const addPodcastLike = async (dispatch: AppDispatch,podcastId: string, userId: string) => {
  try {
    dispatch(requestStart());
    await instance.post(`/like/add`, { podcastId, userId });
    dispatch(requestSuccess());
  } catch (error: any) {
    dispatch(requestFail(error.response?.data?.message || 'Failed to add like'));
  }
}; 

export const removePodcastLike = async (dispatch: AppDispatch,podcastId: string, userId: string) => {
  try {
    dispatch(requestStart());
    await instance.post(`/like/remove`, { podcastId, userId });
    dispatch(requestSuccess());
  } catch (error: any) {
    dispatch(requestFail(error.response?.data?.message || 'Failed to remove like'));
  }
};

