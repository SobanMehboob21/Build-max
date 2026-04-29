import Retailer from "../models/RetailerAuth.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

export const RetailerSignup = async (req, res) => {
  try {
    const { name, companyName, email, password, text } = req.body;

    // if (!name || !companyName || !email || !password || !text) {
    //   return res.status(400).json({ message: "All fields are required" });
    // }

    const existingRetailer = await Retailer.findOne({ email });
    if (existingRetailer) {
      return res
        .status(409)
        .json({ message: "Retailer with this email already exists" });
    }

    const createRetailer = await Retailer.create({
      name,
      companyName,
      email,
      password,
      text,
    });

    const token = jwt.sign(
      {
        id: createRetailer._id,
        name: createRetailer.name,
        companyName: createRetailer.companyName,
        email: createRetailer.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7h" }
    );

    return res.status(201).json({
      success: true,
      message: "Retailer created successfully",
      token,
      retailer: createRetailer,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// controllers/RetailerAuthControllers.js - RetailerLogin
export const RetailerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const retailer = await Retailer.findOne({ email });
    if (!retailer) return res.status(404).json({ message: "No such user" });

    if (retailer.status !== "approved")
      return res.status(403).json({ message: "Account not approved yet" });

    const isMatch = await retailer.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // Use consistent payload
    // RetailerLogin.js
    const token = jwt.sign(
      { id: retailer._id, email: retailer.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      retailer: {
        id: retailer._id,
        name: retailer.name,
        companyName: retailer.companyName,
        email: retailer.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
