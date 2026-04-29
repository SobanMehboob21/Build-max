import Order from "../models/order.model.js"; 

export const placeOrder = async (req, res) => {
  try {
    const { items, totalPrice, paymentMethod, cardDetails, address } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    const order = new Order({
      items,
      totalPrice,
      paymentMethod,
      cardDetails: paymentMethod === "card" ? cardDetails : null,
      address,
      status: "pending",
      createdAt: new Date(),
    });

    await order.save();

    res.status(201).json({ success: true, message: "Order placed successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
