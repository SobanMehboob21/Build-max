// import FeaturedProducts from "../models/FeaturedProducts.models.js"; 

// export const addProduct = async (req, res) => {
//   try {
//     const { companyName, ProductName, ProductPrice } = req.body;

//     // req.file.path = Cloudinary URL
//     const newProduct = new FeaturedProducts({
//       companyName,
//       ProductName,
//       ProductPrice,
//       image: req.file.path, // from Cloudinary
//     });

//     await newProduct.save();

//     res.status(201).json({
//       success: true,
//       message: "Product added successfully",
//       product: newProduct,
//     });
//   } catch (error) {
//     console.error("Error adding product:", error);
//     res.status(500).json({ success: false, message: "Image upload failed" });
//   }
// };

// export const getAllProducts = async (req, res) => {
//   try {
//     const products = await FeaturedProducts.find().sort({ createdAt: -1 });
//     res.status(200).json(products);
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({ success: false, message: "Failed to fetch products" });
//   }
// };
