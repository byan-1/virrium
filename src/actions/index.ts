import axios from "axios";
import { History } from "history";
import { Dispatch } from "redux";

import {
  FETCH_USER,
  SET_QUESTION,
  SET_USER,
  SIGN_OUT,
  SET_SEARCHTEXT,
} from "../config";

export const fetchUser = (): Types.AsyncAction => async (
  dispatch: Dispatch
): Promise<void> => {
  const res = await axios.get("/auth/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const setUser = (user: Types.UserState): Types.Action => {
  return { type: SET_USER, payload: user };
};

export const signOut = (history: History): Types.AsyncAction => async (
  dispatch: Dispatch
): Promise<void> => {
  await axios.post("/auth/logout");
  dispatch({ type: SIGN_OUT });
  history.push("/");
};

export const setCurQuestion = (
  cid: string,
  question: Types.QAPIResp
): Types.Action => {
  return { type: SET_QUESTION, payload: { [cid]: question } };
};

export const setSearchText = (curText: string): Types.Action => {
  return { type: SET_SEARCHTEXT, payload: curText };
};
