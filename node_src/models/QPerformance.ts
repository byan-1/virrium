import { Model } from "objection";
import { RelationMappings } from "objection";

export default class QPerformance extends Model {
  score!: number;
  id!: number;
  q_id!: number;
  static get tableName(): string {
    return "qperformance";
  }

  static get relationMappings(): RelationMappings {
    const Question = require("./Question");
    return {
      questions: {
        relation: Model.BelongsToOneRelation,
        modelClass: Question,
        join: {
          from: "qperformance.q_id",
          to: "questions.id"
        }
      }
    };
  }

}
