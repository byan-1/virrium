export interface QSet {
  id: any;
  uid: number;
  name: string;
}
export type QSetResp = QSet[];

export interface QuestionResp {
  qsetTitle: string;
  questions: Questions;
}

export type Questions = SingleQuestion[];

export interface SingleQuestion {
  qset_id: number;
  question: string;
  answer: string;
  performance: number | undefined;
  id: number;
}
