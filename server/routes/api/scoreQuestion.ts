import { NextFunction, Request, Response } from 'express';

const express = require('express');
const router = express.Router();
const axios = require('axios');
const Question = require('../../models/Question');
const QPerformance = require('../../models/QPerformance');

router.post(
  '/',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const actual = await Question.query().findOne({
      id: req.body.qid
    });
    const resp = await axios.post('http://localhost:3001/', {
      submitted: req.body.ans,
      actual: actual.a
    });
    const similarity = Math.round(resp.data * 100);
    await QPerformance.query().insert({
      q_id: req.body.qid,
      score: similarity
    });
    const previous = await QPerformance.getLatest(10);
    const average =
      previous.reduce(
        (sum: number, { score }: { score: number }) => sum + score,
        0
      ) / previous.length;
    await Question.query()
      .findById(req.body.qid)
      .patch({ performance: Math.round(average) });
    res.send({ similarity });
  }
);

module.exports = router;

// todo:
// get frontend practice page to show score
// get frontend practice page to cycle through questions
