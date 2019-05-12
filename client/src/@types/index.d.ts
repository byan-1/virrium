import { Dispatch } from 'react';

export as namespace Types;

export type UserState =
  | {
      id: number;
    }
  | false;

export type State = {
  auth: UserState;
  form: object;
};

export type AuthState = {
  auth: UserState;
};

interface Action {
  type: string;
  payload: any;
}

export type EmailProps = {
  email: string;
  password: string;
};

export type NewCollection = {
  title: string;
};

export type AsyncAction = (dispatch: Dispatch) => Promise<void>;

export interface Questions {
  id: string;
  question: string;
  answer: string;
}
