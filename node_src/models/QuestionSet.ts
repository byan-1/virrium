import { Model, RelationMappings, JsonSchema } from "objection";
import {
  MIN_QSETNAME_LENGTH,
  MAX_QSETNAME_LENGTH
} from "../config/dbConstants";
import { QSetResp } from "../../src/common-utils/lib/QSetHelpers";
import Question from "./Question";
import { QuestionsReq, QuestionReq } from "../../src/@types";
import { QuestionQuery } from "@types";

const QUESTION_RELATION = "question";

export default class QuestionSet extends Model {
  id!: number;
  uid!: number;
  name!: string;

  static get tableName(): string {
    return "qsets";
  }

  static get relationMappings(): RelationMappings {
    const User = require("./User");
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "qsets.uid",
          to: "users.id"
        }
      },
      question: {
        relation: Model.HasManyRelation,
        modelClass: Question,
        join: {
          from: "qsets.id",
          to: "questions.qset_id"
        }
      }
    };
  }

  static get jsonSchema(): JsonSchema {
    return {
      type: "object",
      required: ["name"],

      properties: {
        name: {
          type: "string",
          minLength: MIN_QSETNAME_LENGTH,
          maxLength: MAX_QSETNAME_LENGTH
        }
      }
    };
  }

  static findById(id: number): Promise<QuestionSet | undefined> {
    return QuestionSet.query().findOne({
      id
    });
  }

  static async deleteById(id: number): Promise<QuestionSet | undefined> {
    const qset: Array<QuestionSet> = await QuestionSet.query()
      .deleteById(id)
      .returning("*");
    return qset[0];
  }

  static findByName(name: string): Promise<QuestionSet | undefined> {
    return QuestionSet.query().findOne({
      name
    });
  }

  insertQuestion(question: string, answer: string): Promise<Question> {
    return this.$relatedQuery<Question>(QUESTION_RELATION)
      .insert({
        q: question,
        a: answer
      })
      .returning("*");
  }

  static toResp(
    questionSets: Array<QuestionSet> | QuestionSet | undefined
  ): QSetResp {
    if (questionSets instanceof QuestionSet) {
      questionSets = [questionSets];
    }
    return questionSets
      ? questionSets.reduce((accumulator: QSetResp, curSet: QuestionSet) => {
          accumulator.push({
            id: curSet.id,
            uid: curSet.uid,
            name: curSet.name
          });
          return accumulator;
        }, [])
      : [];
  }

  getAllQuestions(): Promise<Array<Question>> {
    return this.$relatedQuery<Question>(QUESTION_RELATION).orderBy("id");
  }

  upsertQuestions(questionsReq: QuestionsReq): Promise<QuestionSet> {
    const questions: Array<QuestionQuery> = [];
    Object.entries(questionsReq).forEach(
      ([id, qData]: [string, QuestionReq]) => {
        const question: QuestionQuery = {};
        if (!qData.newQuestion) {
          question.id = id;
        }
        question.q = qData.question;
        question.a = qData.answer;
        question.qset_id = this.id;
        questions.push(question);
      }
    );
    const qsetQuery = {
      id: this.id,
      name: this.name,
      question: questions
    };
    return QuestionSet.query().upsertGraph(qsetQuery);
  }
}
