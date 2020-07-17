export type UserType = {
  id: number;
};

export type Info = {
  message: string;
};

export type Done = (err: Error | null, user?: any, message?: object) => void;

export type OAuth = {
  id: string;
  displayName: string;
  name: { familyName: string; givenName: string };
  provider: string;
  [key: string]: any;
};

export interface QuestionRequest {
  question: string;
  answer: string;
}

export interface QuestionQuery {
  id?: string;
  q?: string;
  a?: string;
  qset_id?: number;
}

export interface QSetDbResp {
  id: number;
  uid: number;
  name: string;
}

// export interface QSetRequest {
//   uid: number;
//   name:
// }
