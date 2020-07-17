import { Dispatch } from "react";

export as namespace Types;

export type UserState =
  | {
      id: number | null;
    }
  | false;

export type QuestionState = {
  [cid: string]: QAPIResp;
};

export type State = {
  auth: UserState;
  form: object;
  question: QuestionState;
  search: string;
};

export interface AuthState {
  auth: UserState;
}

export interface SearchState {
  search: string;
}

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

export interface QuestionReq {
  question: string;
  answer: string;
  newQuestion?: boolean;
}

type QuestionsReq = {
  [id: string]: QuestionReq;
};

export type FormQuestion = {
  question: string;
  answer: string;
  newQuestion: boolean;
};

export type DeleteFcn = (Action: React.EventHandler<any>) => any;

export interface InjectedCollectionProps {
  questions: { questions: QuestionsReq };
  renderQuestions: () => Array<JSX.Element>;
  addQuestion: ({ question, answer }: FormQuestion) => void;
  removeQuestion: (id: string | number) => void;
  setQuestions: (questions: QuestionsReq) => void;
}

export type QAPIResp = {
  id: number;
  q: string;
  a: string;
  performance: number;
};
