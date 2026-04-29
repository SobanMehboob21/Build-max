import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const productFromState = location.state?.product;

  const [product, setProduct] = useState<any>(productFromState || null);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch product if not passed via state
  useEffect(() => {
    if (!product && id) {
      axios
        .get(`http://localhost:5000/api/retailer-products/${id}`)
        .then((res) => {
          setProduct(res.data.product);
          setProductName(res.data.product.ProductName);
          setProductPrice(res.data.product.ProductPrice);
        })
        .catch(() => setError("Failed to load product."));
    } else if (product) {
      setProductName(product.ProductName);
      setProductPrice(product.ProductPrice);
    }
  }, [id, product]);

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!product) return <div>Loading product...</div>;

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const formData = new FormData();
    formData.append("ProductName", productName);
    formData.append("ProductPrice", productPrice);
    if (imageFile) formData.append("image", imageFile);

    const token = localStorage.getItem("retailerToken"); // ✅ get token

    const { data } = await axios.put(
      `http://localhost:5000/api/retailer-products/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // ✅ send token
        },
      }
    );

    const updatedProduct = {
      ...product,
      ProductName: productName,
      ProductPrice: productPrice,
      image: imageFile ? URL.createObjectURL(imageFile) : product.image,
    };

    navigate("/retailer/MyProduct", { state: { updatedProduct } });
  } catch (err: any) {
    console.error("Full error:", err);
    setError(err.response?.data?.message || "Failed to update product. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="edit-product-form">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Product Price:</label>
          <input
            type="text"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Product Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0])
                setImageFile(e.target.files[0]);
            }}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
