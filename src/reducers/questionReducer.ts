import {SET_QUESTION} from '../config';

export default function(state: any = {}, action: Types.Action) {
  switch (action.type) {
    case SET_QUESTION:
      return action.payload;
    default:
      return state;
  }
}
