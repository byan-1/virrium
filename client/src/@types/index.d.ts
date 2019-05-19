import { Dispatch } from 'react';
import { InjectedFormProps } from 'redux-form';

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

export interface Question {
  question: string;
  answer: string;
}

type Questions = {
  [id: string]: Question;
};

export type FormQuestion = {
  question: string;
  answer: string;
};

export type DeleteFcn = (Action: React.EventHandler<any>) => any;

export interface InjectedCollectionProps {
  questions: { questions: Questions };
  renderQuestions: () => Array<JSX.Element>;
  addQuestion: ({ question, answer }: FormQuestion) => void;
  removeQuestion: (id: string | number) => void;
  setQuestions: (questions: Questions) => void;
}

{
  id, q, a, performance;
}

export type QAPIResp = {
  id: number;
  q: string;
  a: string;
  performance: number;
};
