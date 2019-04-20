import { FETCH_USER, SET_USER, SIGN_OUT } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    case SET_USER:
      return action.payload;
    case SIGN_OUT:
      return false;
    default:
      return state;
  }
}
