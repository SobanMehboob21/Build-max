import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  items: Array,
  totalPrice: Number,
  paymentMethod: String,
  cardDetails: Object,
  address: String,
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
