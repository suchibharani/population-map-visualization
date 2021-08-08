import { all } from 'redux-saga/effects';

import mapSaga from './countriesSaga';


export default function* rootSaga() {
    yield all([
        mapSaga(),
    ]);
}