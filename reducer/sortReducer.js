import { actionTypes } from '../constants/actionTypes'

import {exampleInitialState}  from './initialState'

function sortReducer(state = exampleInitialState, action) {
  switch (action.type) {

    case actionTypes.SORT:
      return action.sort

    default:
      return state
  }
}

export default sortReducer
