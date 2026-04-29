import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from './routes/UserAuthRoutes.js';
import retailerAuth from './routes/RetailerAuthRoutes.js'
import retailerProductRoutes from './routes/retailerProductRoutes.js';
import adminRoutes from "./routes/AdminRoutes.js";

import ordersRouter from "./routes/orderRoutes.js";


dotenv.config();

const app = express();


app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoute);
app.use("/api/retailer-auth",retailerAuth);
app.use("/api/retailer-products", retailerProductRoutes);


app.use("/api/admin", adminRoutes);


app.use("/api/orders", ordersRouter);


export default app;
