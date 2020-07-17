import { QuestionQuery, QuestionRequest } from "@types";
import { NextFunction, Request, Response } from "express";
import Question from "../../models/Question";
import User from "../../models/User";
import express from "express";
import QuestionSet from "../../models/QuestionSet";
import { QuestionResp } from "../../../src/common-utils/lib/QSetHelpers";
import { QuestionReq, QuestionsReq } from "../../../src/@types";

const router = express.Router();

export const USER_DNE_ERRMSG = "User does not exist";
export const QSET_DNE_ERRMSG = "Colection does not exist";
export const QSET_EXISTS_ERRMSG =
  "Another collection with that name already exists";
export const QUESTION_DNE_ERRMSG = "Question does not exist";

// get all question collections from a user
router.get("/:uid", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: User | undefined = await User.findById(req.params.uid);
    if (!user) {
      return res.status(422).send({ error: USER_DNE_ERRMSG });
    }
    res.send(QuestionSet.toResp(await user.getAllQsets()));
  } catch (err) {
    next(err);
  }
});

// create a question collection for the user
router.post(
  "/:uid",
  async (req: Request, res: Response, next: NextFunction) => {
    const qsetTitle: string = req.body.title;
    const questions: Array<QuestionRequest> = req.body.questions;
    try {
      const user: User | undefined = await User.findById(req.params.uid);
      if (!user) {
        return res.status(422).send({ error: USER_DNE_ERRMSG });
      }
      if (await QuestionSet.findByName(qsetTitle)) {
        return res.status(422).send({ error: QSET_EXISTS_ERRMSG });
      }
      res.send(QuestionSet.toResp(await user.insertQset(qsetTitle, questions)));
    } catch (err) {
      next(err);
    }
  }
);

// delete a question collection for the user
router.delete(
  "/qset/:qset_id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const qsetId: number = req.params.qset_id;
      if (!(await QuestionSet.findById(qsetId))) {
        return res.status(422).send({ error: QSET_DNE_ERRMSG });
      }
      res.send(QuestionSet.toResp(await QuestionSet.deleteById(qsetId)));
    } catch (err) {
      next(err);
    }
  }
);

// get all questions in a collection from a user
router.get(
  "/qset/:qset_id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const qset: QuestionSet | undefined = await QuestionSet.findById(
        req.params.qset_id
      );
      if (!qset) {
        return res.status(422).send({ error: QSET_DNE_ERRMSG });
      }

      const resp: QuestionResp = {
        qsetTitle: qset.name,
        questions: Question.toResp(await qset.getAllQuestions())
      };
      res.send(resp);
    } catch (err) {
      next(err);
    }
  }
);

// get a question from a collection
router.get(
  "/qset/:qset_id/:q_id",
  async (req: Request, res: Response, next: NextFunction) => {
    const question: Question | undefined = await Question.findById(
      req.params.q_id
    );
    if (!question) {
      return res.status(422).send({ error: QUESTION_DNE_ERRMSG });
    }
    res.send(Question.toResp(question)[0]);
  }
);

// create a question under a collection for a user
router.post(
  "/qset/:qset_id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const qset: QuestionSet | undefined = await QuestionSet.findById(
        req.body.qset_id
      );
      if (!qset) {
        res.status(422).send({ error: QSET_DNE_ERRMSG });
      }
      const question: Question = await qset!.insertQuestion(
        req.body.question,
        req.body.answer
      );
      res.send(Question.toResp(question));
    } catch (err) {
      next(err);
    }
  }
);

// edit a collection
router.patch(
  "/qset/:qset_id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const qset: QuestionSet | undefined = await QuestionSet.findById(
        req.params.qset_id
      );
      if (!qset) {
        res.status(422).send({ error: QSET_DNE_ERRMSG });
      }
      res.send(
        QuestionSet.toResp(await qset!.upsertQuestions(req.body.questions))
      );
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
