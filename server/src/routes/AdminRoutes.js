import express from "express";
import { getPendingRequests, approveRetailer } from "../controllers/Admin.controllers.js";

const router = express.Router();

router.get("/requests", getPendingRequests);
router.put("/approve/:id", approveRetailer);

export default router;
