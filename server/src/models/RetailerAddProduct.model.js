import mongoose, { Schema } from "mongoose";

const RetailerAddProductSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    ProductName: {
      type: String,
      required: true,
    },
    ProductPrice: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["cement", "sand", "bricks", "steel", "iron", "woods"],
      required: true,
    },

    // ⭐ ADD THIS LINE
    retailerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Retailer",
      required: true,
    },
  },
  { timestamps: true }
);

const RetailerAddProduct = mongoose.model(
  "RetailerAddProduct",
  RetailerAddProductSchema
);
export default RetailerAddProduct;
