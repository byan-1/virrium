import { NextFunction, Request, Response } from "express";
import QuestionSet from "../../models/QuestionSet";
import { QSET_DNE_ERRMSG, QUESTION_DNE_ERRMSG } from "./questionAPI";

const express = require("express");
const router = express.Router();
const axios = require("axios");
import Question from "../../models/Question";

const EMPTYSET_ERRMSG = "Collection has no questions";
const N_LATEST_SCORES = 10;
const W2VPORT = 3001;

router.get(
  "/next/:qsetid",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const qset = await QuestionSet.findById(req.params.qsetid);
      if (!qset) {
        return res.status(422).send({ error: QSET_DNE_ERRMSG });
      }
      const questions = await qset.getAllQuestions();
      if (!questions) {
        return res.status(422).send({ error: EMPTYSET_ERRMSG });
      }
      const qid = await Question.getRandWeightedId(questions);
      res.send({ qid });
    } catch (err) {
      next(err);
    }
  }
);

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const question = await Question.findById(req.body.qid);
    if (!question) {
      return res.status(422).send({ error: QUESTION_DNE_ERRMSG });
    }
    const resp = await axios.post(`http://localhost:${W2VPORT}/`, {
      submitted: req.body.ans,
      actual: question.a
    });
    const similarity = await question.insertPerformance(resp.data);
    const previous = await question.getLatestScores(N_LATEST_SCORES);
    const average =
      previous.reduce(
        (sum: number, { score }: { score: number }) => sum + score,
        0
      ) / previous.length;
    await question.updateScore(average);
    res.send({ similarity });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
