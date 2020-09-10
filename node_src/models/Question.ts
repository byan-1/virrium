import { Model, RelationMappings, JsonSchema } from "objection";
import {
  MIN_PERFORMANCE,
  MAX_PERFORMANCE,
  MIN_QA_LENGTH,
  MAX_QA_LENGTH,
} from "../config/dbConstants";
import { Questions } from "../../src/common-utils/lib/QSetHelpers";
import QPerformance from "./QPerformance";
import QuestionSet from "./QuestionSet";

const MAX_WEIGHTING = 100;
const MIN_WEIGHTING = 10;
const QPERFORMANCE_RELATION = "qperformance";

interface QAccumulate {
  id: number;
  accumulate: number;
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default class Question extends Model {
  id!: number;
  qset_id!: number;
  q!: string;
  a!: string;
  performance?: number;
  static get tableName(): string {
    return "questions";
  }

  static get relationMappings(): RelationMappings {
    return {
      questionset: {
        relation: Model.BelongsToOneRelation,
        modelClass: QuestionSet,
        join: {
          from: "questions.qset_id",
          to: "qsets.id",
        },
      },
      qperformance: {
        relation: Model.HasManyRelation,
        modelClass: QPerformance,
        join: {
          from: "questions.id",
          to: "qperformance.q_id",
        },
      },
    };
  }

  static get jsonSchema(): JsonSchema {
    return {
      type: "object",
      required: ["q", "a"],

      properties: {
        q: {
          type: "string",
          minLength: MIN_QA_LENGTH,
          maxLength: MAX_QA_LENGTH,
        },
        a: {
          type: "string",
          minLength: MIN_QA_LENGTH,
          maxLength: MAX_QA_LENGTH,
        },
        performance: {
          type: "integer",
          minimum: MIN_PERFORMANCE,
          maximum: MAX_PERFORMANCE,
        },
      },
    };
  }

  public static toResp(
    question: Array<Question> | Question | undefined
  ): Questions {
    if (question instanceof Question) {
      question = [question];
    }
    return question
      ? question.reduce((accumulator: Questions, curSet: Question) => {
          accumulator.push({
            id: curSet.id,
            qset_id: curSet.qset_id,
            question: curSet.q,
            answer: curSet.a,
            performance: curSet.performance,
          });
          return accumulator;
        }, [])
      : [];
  }

  public async getPerformance(): Promise<any> {
    return await this.$relatedQuery<QPerformance>(
      QPERFORMANCE_RELATION
    ).orderBy("date_time");
  }

  public static async toPerformanceResp(
    question: Array<Question>
  ): Promise<any> {
    let accumulator = [];

    for (const curSet of question) {
      const scores = await curSet.getPerformance();
      accumulator.push({
        id: curSet.id,
        qset_id: curSet.qset_id,
        question: curSet.q,
        answer: curSet.a,
        attempts: scores,
      });
    }
    return accumulator;
  }

  static findById(id: number): Promise<Question | undefined> {
    return Question.query().findById(id);
  }

  static async getRandWeightedId(questions: Array<Question>): Promise<number> {
    let accum = 0;
    const qAccum = questions.map(
      (question: Question): QAccumulate => {
        const weight = question.performance
          ? Math.max(MAX_WEIGHTING - question.performance, MIN_WEIGHTING)
          : MAX_WEIGHTING;
        accum += weight;
        return {
          id: question.id,
          accumulate: accum,
        };
      }
    );
    const rand = getRandomInt(accum);
    let lowerbound = MIN_PERFORMANCE - 1;
    //default to first question in the collection
    var result = questions[0].id;
    for (const question of qAccum) {
      let upperbound = question.accumulate;
      if (rand > lowerbound && rand <= upperbound) {
        result = question.id;
        break;
      }
      lowerbound = upperbound;
    }
    return result;
  }

  async insertPerformance(score: number): Promise<number> {
    const similarity = Math.round(score * 100);
    await this.$relatedQuery<QPerformance>(QPERFORMANCE_RELATION).insert({
      score: similarity,
    });
    return similarity;
  }

  async getLatestScores(n: number) {
    const knex = QPerformance.knex();
    const latest = await knex.raw(`
      SELECT score
      FROM
      (
        SELECT *
        FROM qperformance
        WHERE q_id = ${this.id}
        ORDER BY date_time DESC
        LIMIT ${n}
      ) T1
      ORDER BY date_time`);
    return latest.rows;
  }

  updateScore(score: number): void {
    this.$query<Question>().patch({ performance: Math.round(score) });
  }
}
