import express from "express";
import {
  addRetailerProduct,
  getRetailerProducts,
  deleteRetailerProduct,
  editRetailerProduct,
  getAllProducts,
} from "../controllers/RetailerAddProduct.controllers.js";
import { retailerAuth } from "../middlewares/retailerauth.middleware.js";

import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/add", retailerAuth, upload.single("image"), addRetailerProduct);
router.get("/my-products", retailerAuth, getRetailerProducts);
router.delete("/:id", retailerAuth, deleteRetailerProduct);
router.put("/:id", retailerAuth, upload.single("image"), editRetailerProduct);
// routes/retailerProductRoutes.js
router.get("/all", getAllProducts); // <-- NEW

export default router;
