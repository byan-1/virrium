import { SET_SEARCHTEXT } from "../config";

export default function (state: string = "", action: Types.Action): string {
  switch (action.type) {
    case SET_SEARCHTEXT:
      return action.payload;
    default:
      return state;
  }
}
