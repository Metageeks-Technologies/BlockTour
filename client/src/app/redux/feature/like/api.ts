import axios from 'axios';
import { AppDispatch } from '../../store';
import { requestStart, requestSuccess, requestFail } from './slice';
import instance from '@/utils/axios';


export const addPostLike = (postId: string, userId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(requestStart());
    await instance.post(`/like/add`, { postId, userId });
    dispatch(requestSuccess());
  } catch (error: any) {
    dispatch(requestFail(error.response?.data?.message || 'Failed to add like'));
  }
};

export const removePostLike = (postId: string, userId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(requestStart());
    await instance.post(`/like/remove`, { postId, userId });
    dispatch(requestSuccess());
  } catch (error: any) {
    dispatch(requestFail(error.response?.data?.message || 'Failed to remove like'));
  }
};

export const addPodcastLike = (podcastId: string, userId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(requestStart());
    await instance.post(`/like/add`, { podcastId, userId });
    dispatch(requestSuccess());
  } catch (error: any) {
    dispatch(requestFail(error.response?.data?.message || 'Failed to add like'));
  }
}; 

export const removePodcastLike = (podcastId: string, userId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(requestStart());
    await instance.post(`/like/remove`, { podcastId, userId });
    dispatch(requestSuccess());
  } catch (error: any) {
    dispatch(requestFail(error.response?.data?.message || 'Failed to remove like'));
  }
};

