import {NextFunction, Request, Response} from 'express';

const express = require('express')
const router = express.Router();
const axios = require('axios');

router.post(
    '/',
    async(req: Request, res: Response, next: NextFunction): Promise<void> => {
      
      const resp = await axios.post('http://localhost:3001/', {
        submitted: req.body.ans,
        actual: 'i am a very annoyed person right now'
      })
      console.log(resp.data)
      res.send({similarity: resp.data});
    })

module.exports = router

    // todo:
    // get correct answer from database and send to server
    // setup python server to correctly return score
    // save score in database
    // get frontend practice page to show score
    // get frontend practice page to cycle through questions