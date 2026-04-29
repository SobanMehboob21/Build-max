// models/RetailerAuth.model.js
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const retailerSchema = new Schema(
  {
    name: { type: String, required: true },
    companyName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    text: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

retailerSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

retailerSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Retailer = mongoose.model("Retailer", retailerSchema);
export default Retailer;
