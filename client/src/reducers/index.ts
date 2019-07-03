import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import authReducer from './authReducer';
import questionReducer from './questionReducer';

export default combineReducers(
    {auth: authReducer, form: formReducer, question: questionReducer});
