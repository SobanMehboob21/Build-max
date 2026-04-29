import User from "../models/UserAuth.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";


dotenv.config();

export const UserAuthSignUp = async (req, res) => {
  try {
    const { username, email, password, youAre } = req.body;

    if (!username || !email || !password || !youAre) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Validate enum manually (optional, Mongoose also handles it)
    const allowedRoles = ["customer", "retailer", "admin"];
    if (!allowedRoles.includes(youAre)) {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }

    const createUser = await User.create({ username, email, password, youAre });

    const token = jwt.sign(
      {
        id: createUser._id,
        username: createUser.username,
        email: createUser.email,
        youAre: createUser.youAre,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      token,
      user: createUser,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};


export const UserAuthLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, existUser.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });
    }

    const token = jwt.sign(
      {
        id: existUser._id,
        username: existUser.username,
        email: existUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: existUser._id,
        username: existUser.username,
        email: existUser.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
