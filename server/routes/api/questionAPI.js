const express = require('express');
const QuestionSet = require('../../models/QuestionSet');
const Question = require('../../models/Question');

const router = express.Router();

//get all question sets from a user
router.get('/:uid', async (req, res, next) => {
  try {
    const qset = await QuestionSet.query()
      .where({ uid: req.params.uid })
      .select('*')
      .orderBy('id');
    res.send(qset);
  } catch (err) {
    next(err);
  }
});

//get 1 question set from a user
router.get('/:uid/:qset_id', async (req, res, next) => {});

//create a question set for the user
router.post('/:uid', async (req, res, next) => {
  const uid = req.params.uid;
  const name = req.body.title;
  if (!name || name.length > 255) {
    return res.status(422);
  }
  try {
    const existingQSet = await QuestionSet.query().findOne({ name });
    if (existingQSet) {
      return res
        .status(422)
        .send({ error: 'Another collection already has the same name' });
    }

    const qset = await QuestionSet.query()
      .insert({ name, uid })
      .returning('*');
    res.send(qset);
  } catch (err) {
    next(err);
  }
});

//update a question set for the user
router.patch('/:uid/:qset_id', (req, res, next) => {});

//delete a question set for the user
router.delete('/:uid/:qset_id', (req, res, next) => {});

module.exports = router;
