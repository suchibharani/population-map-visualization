import { actionTypes } from '../constants/actionTypes'

import {exampleInitialState}  from './initialState'

function postReducer(state = exampleInitialState, action) {
  switch (action.type) {

    case actionTypes.LOAD_POST_SUCCESS:
      return [
        ...state,
        ...action.data,
      ]

    default:
      return state
  }
}

export default postReducer
