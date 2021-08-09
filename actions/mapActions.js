import { actionTypes } from '../constants/actionTypes';

/*  subreddit */
export function failure(error) {
  return {
    type: actionTypes.FAILURE,
    error,
  }
}
export function loadData() {
  return { type: actionTypes.LOAD_DATA }
}

export function loadDataSuccess(data) {
  return {
    type: actionTypes.LOAD_DATA_SUCCESS,
    data,
  }
}
export function updateData(data) {
  return {
    type: actionTypes.UPDATE_DATA,
    data,
  }
}
