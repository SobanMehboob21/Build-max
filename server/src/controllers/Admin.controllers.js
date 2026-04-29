import Retailer from "../models/RetailerAuth.model.js";

// Get all pending retailer requests
export const getPendingRequests = async (req, res) => {
  try {
    const requests = await Retailer.find({ status: "pending" });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve a retailer
export const approveRetailer = async (req, res) => {
  try {
    const { id } = req.params;
    const retailer = await Retailer.findByIdAndUpdate(
      id,
      { status: "approved" },
      { new: true }
    );
    if (!retailer) return res.status(404).json({ message: "Retailer not found" });
    res.status(200).json({ message: "Retailer approved successfully", retailer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
