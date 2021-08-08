// Set up your root reducer here...
import { combineReducers } from 'redux';

import countries from './countriesReducer';
import selectedPost from './postReducer';
import sort from './sortReducer';
import pagination from './paginationReducer';
import error from './errorReducer';
import isLoading from './loadingReducer';



const rootReducer = combineReducers({
    countries,
    selectedPost,
    error,
    sort,
    pagination,
    isLoading
})

export default rootReducer
