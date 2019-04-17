import { FETCH_USER, SET_USER } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    case SET_USER:
      return action.payload;
    default:
      return state;
  }
}
