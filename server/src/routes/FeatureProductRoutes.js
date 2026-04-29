// import express from "express";
// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../config/cloudinary.js";
// import {
//   addProduct,
//   getAllProducts,
// } from "../controllers/FeatureProductControllers.js";

// const router = express.Router();

// // Configure Cloudinary storage for multer
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "construction-products", // cloud folder name
//     allowed_formats: ["jpg", "png", "jpeg"],
//   },
// });

// const upload = multer({ storage });

// router.post("/add", upload.single("image"), addProduct);
// router.get("/", getAllProducts);

// export default router;
