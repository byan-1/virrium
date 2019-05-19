import { Request, Response, NextFunction } from 'express';
import { QuestionRequest, QuestionQuery } from '@types';
const express = require('express');
const QuestionSet = require('../../models/QuestionSet');
const Question = require('../../models/Question');

const router = express.Router();

//get all question collections from a user
router.get(
  '/:uid',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const qset = await QuestionSet.query()
        .where({ uid: req.params.uid })
        .select('*')
        .orderBy('id');
      res.send(qset);
    } catch (err) {
      next(err);
    }
  }
);

//create a question collection for the user
router.post(
  '/:uid',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const uid = req.params.uid;
    const name = req.body.title;
    const questions = req.body.questions;
    if (!name || name.length > 255) {
      res.status(422).send({ error: 'Please enter a title' });
      return;
    }
    try {
      const existingQSet = await QuestionSet.query().findOne({ name });
      if (existingQSet) {
        res
          .status(422)
          .send({ error: 'Another collection with that name already exists' });
        return;
      }

      const qset = await QuestionSet.query()
        .insert({ name, uid })
        .returning('*');

      await Promise.all(
        questions.map(
          async ({ question, answer }: QuestionRequest): Promise<void> => {
            await Question.query().insert({
              qset_id: qset.id,
              q: question,
              a: answer
            });
          }
        )
      );

      res.send(qset);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);

//delete a question collection for the user
router.delete(
  '/qset/:qset_id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const existingQSet = await QuestionSet.query().findOne({
        id: req.params.qset_id
      });
      if (!existingQSet) {
        res.status(422).send({ error: 'Collection does not exist' });
        return;
      }
      await Question.query()
        .delete()
        .where('qset_id', '=', req.params.qset_id);
      const qset = await QuestionSet.query()
        .deleteById(req.params.qset_id)
        .returning('*');
      res.send(qset);
    } catch (err) {
      next(err);
    }
  }
);

//get all questions in a collection from a user
router.get(
  '/qset/:qset_id',
  async (req: Request, res: Response, next: NextFunction) => {
    const qset_id = req.params.qset_id;
    try {
      const existingQSet = await QuestionSet.query().findOne({
        id: req.params.qset_id
      });
      if (!existingQSet) {
        res.status(422).send({ error: 'Collection does not exist' });
        return;
      }
      const questions = await Question.query()
        .where('qset_id', '=', qset_id)
        .orderBy('id');
      const title = await QuestionSet.query()
        .select('id', 'name')
        .where('id', '=', qset_id);
      res.send({ id: title[0].id, title: title[0].name, questions });
    } catch (err) {
      next(err);
    }
  }
);

//create a question under a collection for a user
router.post(
  '/qset/:qset_id',
  async (req: Request, res: Response, next: NextFunction) => {
    const qsetid = req.body.qset_id;
    const question = req.body.question;
    const answer = req.body.answer;
    try {
      const result = await Question.query()
        .insert({ qsetid, question, answer })
        .returning('*');
      res.send(result);
    } catch (err) {
      next(err);
    }
  }
);

//edit a collection
router.patch(
  '/qset/:qset_id',
  async (req: Request, res: Response, next: NextFunction) => {
    const questions: Array<QuestionQuery> = [];
    Object.entries(req.body.questions).forEach(
      ([id, qData]: [string, QuestionRequest]) => {
        const question: QuestionQuery = {};
        if (id[0] !== 'N') {
          question.id = id;
        }
        question.q = qData.question;
        question.a = qData.answer;
        question.qset_id = req.params.qset_id;
        questions.push(question);
      }
    );
    const qsetQuery = {
      id: req.params.qset_id,
      name: req.body.title,
      question: questions
    };
    const dbResp = await QuestionSet.query().upsertGraph(qsetQuery);
    res.send(dbResp);
  }
);

module.exports = router;
