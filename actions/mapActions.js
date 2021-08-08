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
/* Pagination */
export function updatePagination(after) {
  return { type: actionTypes.UPDATE_PAGINATION,after }
}

export function loadMore() {
  return { type: actionTypes.LOAD_MORE }
}

export function loadMoreSuccess(data) {
  return {
    type: actionTypes.LOAD_MORE_SUCCESS,
    data,
  }
}
/* voting */
export function upVote(id) {
  return { type: actionTypes.UPVOTE,id }
}

export function downVote(id) {
  return { type: actionTypes.DOWNVOTE,id }
}

/* single post  */
export function loadPost(id) {
  return { 
    type: actionTypes.LOAD_POST,
    id 
  }
}

export function loadPostSuccess(data) {
  return {
    type: actionTypes.LOAD_POST_SUCCESS,
    data,
  }
}
/* sort */

export function sortAction(sort) {
  return { 
    type: actionTypes.SORT,
    sort 
  }
}
/* loader */

export function isLoading() {
  return { 
    type: actionTypes.LOADING
  }
}
