import { actionTypes } from '../constants/actionTypes'

import {exampleInitialState}  from './initialState'

function paginationReducer(state = exampleInitialState, action) {
  switch (action.type) {

    case actionTypes.UPDATE_PAGINATION:
      return {
        ...state,
        last : action.after
      }

    default:
      return state
  }
}

export default paginationReducer
