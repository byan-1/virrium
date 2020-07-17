import express from "express";
const authRoutes = require("./authRoutes");
const questionAPI = require("./api/questionAPI");
const scoreQuestion = require("./api/scoreQuestion");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/api/question", questionAPI);
router.use("/api/score", scoreQuestion);

export default router;
