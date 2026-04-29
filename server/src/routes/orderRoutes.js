// routes/orderRoutes.ts
import express from "express";
import Order from "../models/order.model.js";
const router = express.Router();

// Create order
router.post("/", async (req, res) => {
  try {
    const { items, totalPrice, paymentMethod, cardDetails, address } = req.body;
    const newOrder = await Order.create({
      items,
      totalPrice,
      paymentMethod,
      cardDetails,
      address,
      status: "pending",
    });
    res.status(201).json({ success: true, order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to place order" });
  }
});

// Get all orders
export const getRetailerOrders = async (req, res) => {
  try {
    const retailerId = req.user.id; // assuming JWT middleware sets req.user

    // Find orders where at least one item belongs to this retailer
    const orders = await Order.find({
      "items.retailerId": retailerId
    });

    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};
// ✅ Update order status
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // expected: "accepted" or "rejected"

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    order.status = status;
    await order.save();

    res.json({ success: true, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to update order" });
  }
});



export default router;
