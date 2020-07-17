import { Request, Response, NextFunction } from "express";
import { UserType, Info } from "../@types";
const express = require("express");
const passport = require("passport");
const User = require("../models/User");
const EmailAuth = require("../models/EmailAuth");

const router = express.Router();

const EMAILPWMISSING_ERRMSG = "You must provide an email and password";
const EMAILUSED_ERRMSG = "Email in use";

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/dashboard",
    failureRedirect: "/signin"
  })
);

router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/dashboard",
    failureRedirect: "/signin"
  })
);

router.post(
  "/email",
  (req: Request, res: Response, next: NextFunction): void => {
    passport.authenticate("local", (err: Error, user: UserType, info: Info) => {
      if (err) {
        next(err);
        return;
      }
      //overwrite passport's default missing credentials error message
      if (info && info.message) {
        res.status(401).send({ error: EMAILPWMISSING_ERRMSG });
        return;
      }
      if (info) {
        res.status(401).send(info);
        return;
      }
      req.logIn(user, err => {
        if (err) {
          next(err);
          return;
        }
        res.send(user);
      });
    })(req, res, next);
  }
);

router.post(
  "/signup",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      res.status(422).send({ error: EMAILPWMISSING_ERRMSG });
      return;
    }
    try {
      const existingUser = await EmailAuth.query().findOne({ email });
      if (existingUser) {
        res.status(422).send({ error: EMAILUSED_ERRMSG });
        return;
      }

      const hashedPassword = await EmailAuth.hashPassword(password);

      const user = await User.query()
        .insert({})
        .returning("*");

      await user
        .$relatedQuery("eauth")
        .insert({ email, password: hashedPassword });

      req.login({ id: user.id }, (err: Error): void => {
        if (err) {
          return next(err);
        }
        res.send({ id: user.id });
        return;
      });
    } catch (err) {
      next(err);
    }
  }
);

router.get("/current_user", (req: Request, res: Response): void => {
  res.send(req.user ? { id: req.user.id } : null);
});

router.post("/logout", (req: Request, res: Response): void => {
  req.logout();
  res.end();
});

module.exports = router;
