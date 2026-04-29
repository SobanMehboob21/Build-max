import RetailerAddProduct from "../models/RetailerAddProduct.model.js";
import cloudinary from "../../cloudinary.js";

// Add a new product
export const addRetailerProduct = async (req, res) => {
  try {
    const { companyName, ProductName, ProductPrice, category } = req.body;

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    // Upload image to Cloudinary
    const upload = await cloudinary.uploader.upload(req.file.path);

    const newProduct = new RetailerAddProduct({
      companyName,
      ProductName,
      ProductPrice,
      category,
      image: upload.secure_url,
      retailerId: req.retailer._id, // ⭐ Add retailerId from auth middleware
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully!",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get only this retailer's products
// controllers/RetailerAddProduct.controllers.js
export const getRetailerProducts = async (req, res) => {
  try {
    const retailerId = req.retailer._id; // ✅ get logged-in retailer ID
    const products = await RetailerAddProduct.find({ retailerId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// controllers/RetailerAddProduct.controllers.js
export const getAllProducts = async (req, res) => {
  try {
    const products = await RetailerAddProduct.find({})
      .sort({ createdAt: -1 })
      .lean();               // faster, plain objects
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// Delete a product (ensure it belongs to the retailer)
export const deleteRetailerProduct = async (req, res) => {
  try {
    const product = await RetailerAddProduct.findOneAndDelete({
      _id: req.params.id,
      retailerId: req.retailer._id, // ⭐ only allow deleting own products
    });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found or not yours" });
    }

    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Edit a product (ensure it belongs to the retailer)
export const editRetailerProduct = async (req, res) => {
  try {
    const { ProductName, ProductPrice } = req.body;
    const updateData = { ProductName, ProductPrice };

    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path);
      updateData.image = upload.secure_url;
    }

    const product = await RetailerAddProduct.findOneAndUpdate(
      { _id: req.params.id, retailerId: req.retailer._id }, // ⭐ only allow updating own products
      updateData,
      { new: true }
    );

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found or not yours" });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
