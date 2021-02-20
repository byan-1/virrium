const { Model } = require("objection");
import { RelationMappings, JSONSchema } from "objection";
import QuestionSet from "./QuestionSet";
import { QSetResp, QSet } from "../../src/common-utils/lib/QSetHelpers";
import { QuestionRequest } from "@types";

type Auth = {
  id: string;
  type: AuthTypes;
};

const QSET_RELATION = "questionset";

type AuthTypes = "googleauth" | "facebookauth";

class User extends Model {
  id!: number;
  static get tableName(): string {
    return "users";
  }

  static get jsonSchema(): JSONSchema {
    return {
      type: "object",
      properties: {
        id: { type: "integer" },
      },
    };
  }

  static get relationMappings(): RelationMappings {
    const GAuth = require("./GAuth");
    const FBAuth = require("./FBAuth");
    const EmailAuth = require("./EmailAuth");
    return {
      googleauth: {
        relation: Model.HasOneRelation,
        modelClass: GAuth,
        join: {
          from: "users.id",
          to: "gauth.uid",
        },
      },
      facebookauth: {
        relation: Model.HasOneRelation,
        modelClass: FBAuth,
        join: {
          from: "users.id",
          to: "fbauth.uid",
        },
      },
      emailauth: {
        relation: Model.HasOneRelation,
        modelClass: EmailAuth,
        join: {
          from: "users.id",
          to: "emailauth.uid",
        },
      },
      questionset: {
        relation: Model.HasManyRelation,
        modelClass: QuestionSet,
        join: {
          from: "users.id",
          to: "qsets.uid",
        },
      },
    };
  }

  getAllQsets(): Promise<Array<QuestionSet>> {
    return this.$relatedQuery(QSET_RELATION);
  }

  static findById(id: number): Promise<User | undefined> {
    return User.query().findById(id);
  }

  static async insertUser(auth?: Auth) {
    const GAuth = require("./GAuth");
    const FBAuth = require("./FBAuth");
    const user = await User.query().insert({}).returning("*");
    if (auth) {
      console.log(auth);
      //await user.$relatedQuery(auth.type);
      if (auth.type === "googleauth")
        await GAuth.query().insert({ uid: user.id, googleid: auth.id });
      if (auth.type === "facebookauth")
        await FBAuth.query().insert({ uid: user.id, fbid: auth.id });
    }
    return user;
  }

  async insertQset(
    title: string,
    questions: Array<QuestionRequest> = []
  ): Promise<QuestionSet> {
    const qset: QuestionSet = await this.$relatedQuery(QSET_RELATION)
      .insert({ name: title })
      .returning("*");
    await Promise.all(
      questions.map(
        async ({ question, answer }: QuestionRequest): Promise<void> => {
          await qset.insertQuestion(question, answer);
        }
      )
    );

    return qset;
  }
}

module.exports = User;
