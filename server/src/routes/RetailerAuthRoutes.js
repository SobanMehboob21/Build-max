import {
  RetailerSignup,
  RetailerLogin,
} from "../controllers/RetailerAuthControllers.js";

import express from "express";

const router = express.Router();

router.post("/signup", RetailerSignup);

router.post("/login", RetailerLogin);

export default router