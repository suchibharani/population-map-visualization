import { actionTypes } from '../constants/actionTypes'

import {exampleInitialState}  from './initialState'

function loadingReducer(state = exampleInitialState, action) {
  switch (action.type) {

    case actionTypes.LOADING:
      return !state

    default:
      return state
  }
}

export default loadingReducer
