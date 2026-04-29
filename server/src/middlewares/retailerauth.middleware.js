// middlewares/retailerauth.middleware.js
import jwt from "jsonwebtoken";
import Retailer from "../models/RetailerAuth.model.js";

export const retailerAuth = async (req, res, next) => {
  try {
    console.log("=== RETAILER AUTH MIDDLEWARE ===");
    console.log("Headers:", req.headers);

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Token:", token);

    if (!process.env.JWT_SECRET) {
      console.log("JWT_SECRET IS MISSING!");
      return res.status(500).json({ message: "Server misconfigured" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("DECODED JWT:", decoded);

    // CRITICAL: Use decoded.id (not decoded._id)
    const retailer = await Retailer.findById(decoded.id);
    if (!retailer) {
      return res.status(401).json({ message: "User not found" });
    }

    console.log("Retailer found:", retailer.email, "Status:", retailer.status);

    if (retailer.status !== "approved") {
      return res.status(403).json({ message: "Account not approved" });
    }

    req.retailer = retailer;
    next();
  } catch (err) {
    console.log("JWT VERIFY FAILED:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};