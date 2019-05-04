import axios from 'axios';
import { FETCH_USER, SET_USER, SIGN_OUT } from './types';
import { Dispatch } from 'redux';
import { History } from 'history';

export const fetchUser = (): Function => async (
  dispatch: Dispatch
): Promise<void> => {
  const res = await axios.get('/auth/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const setUser = (user: Types.UserState): Types.Action => {
  return { type: SET_USER, payload: user };
};

export const signOut = (history: History): Function => async (
  dispatch: Dispatch
): Promise<void> => {
  await axios.post('/auth/logout');
  dispatch({ type: SIGN_OUT });
  history.push('/');
};
