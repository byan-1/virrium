import {NextFunction, Request, Response} from 'express';

const express = require('express');
const router = express.Router();
const axios = require('axios');
const Question = require('../../models/Question');
const QPerformance = require('../../models/QPerformance');

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

router.get(
    '/next/:qsetid',
    async(req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const questions = await Question.query()
                              .where({qset_id: req.params.qsetid})
                              .select('*')
                              .orderBy('id');
        let accum = 0;
        questions.map((question: any) => {
          let weight = question.performance ?
              Math.max(100 - question.performance, 10) :
              100;
          accum += weight;
          question.accumulate = accum;
        })
        let rand = getRandomInt(accum);
        let index = 0;
        let lowerbound = -1;
        var result;
        for (const question of questions) {
          let upperbound = question.accumulate
          if (rand > lowerbound && rand <= upperbound) {
            result = question;
            break;
          }
          lowerbound = upperbound;
        }
        res.send(result);
      } catch (err) {
        next(err);
      }
    });

router.post(
    '/',
    async(req: Request, res: Response, next: NextFunction): Promise<void> => {
      const actual = await Question.query().findOne({id: req.body.qid});
      const resp = await axios.post(
          'http://localhost:3001/',
          {submitted: req.body.ans, actual: actual.a});
      const similarity = Math.round(resp.data * 100);
      await QPerformance.query().insert(
          {q_id: req.body.qid, score: similarity});
      const previous = await QPerformance.getLatest(10);
      const average =
          previous.reduce(
              (sum: number, {score}: {score: number}) => sum + score, 0) /
          previous.length;
      await Question.query().findById(req.body.qid).patch({
        performance: Math.round(average)
      });
      res.send({similarity});
    });

module.exports = router;