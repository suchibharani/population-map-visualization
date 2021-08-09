// Set up your root reducer here...
import { combineReducers } from 'redux';

import countries from './countriesReducer';
import dataToVisualize from './mapReducer';
import error from './errorReducer';
import isLoading from './loadingReducer';



const rootReducer = combineReducers({
    countries,
    dataToVisualize,
    error,
    isLoading
})

export default rootReducer
