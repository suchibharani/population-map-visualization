import { call, put, takeLatest} from 'redux-saga/effects'
// import es6promise from 'es6-promise'
import { actionTypes } from '../constants/actionTypes'

import { failure, loadDataSuccess} from '../actions/index'
import { fetchCountries} from '../api'


// es6promise.polyfill()

function* loadDataSaga() {
  try {
    const data = yield call(fetchCountries);
    yield put(loadDataSuccess(data))
  } catch (err) {
    yield put(failure(err))
  }
}

function* watchDataLoad() {
  yield takeLatest(actionTypes.LOAD_DATA, loadDataSaga)
  
}

export default watchDataLoad
