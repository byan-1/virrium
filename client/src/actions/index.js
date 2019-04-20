import axios from 'axios';
import { FETCH_USER, SET_USER, SIGN_OUT } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/auth/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const setUser = user => {
  return { type: SET_USER, payload: user };
};

export const signOut = history => async dispatch => {
  await axios.post('/auth/logout');
  history.push('/');
  dispatch({ type: SIGN_OUT });
};
