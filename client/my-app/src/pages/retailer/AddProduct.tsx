import React, { useState } from "react";
import axios from "axios";
import "../../styles/retailer/AddProduct.css";

const AddProduct = () => {
  const [form, setForm] = useState({
    companyName: "",
    ProductName: "",
    ProductPrice: "",
    category: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!image) newErrors.image = "Please upload an image.";
    if (!form.companyName.trim())
      newErrors.companyName = "Company name is required.";
    if (!form.ProductName.trim())
      newErrors.ProductName = "Product name is required.";
    if (!form.ProductPrice.trim())
      newErrors.ProductPrice = "Product price is required.";
    else if (isNaN(Number(form.ProductPrice)))
      newErrors.ProductPrice = "Product price must be a number.";
    if (!form.category.trim()) newErrors.category = "Category is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // ✅ true if no errors
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const token = localStorage.getItem("retailerToken");
    console.log("TOKEN FROM localStorage:", token); // ← MUST SHOW JWT

    if (!token) {
      alert("No token! Login again.");
      return;
    }

    const data = new FormData();
    data.append("image", image!);
    data.append("companyName", form.companyName);
    data.append("ProductName", form.ProductName);
    data.append("ProductPrice", form.ProductPrice);
    data.append("category", form.category);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/retailer-products/add",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ← ONLY THIS
          },
        }
      );
      alert("Success!");
    } catch (err: any) {
      console.log("401 Error Response:", err.response?.data);
    }
  };

  return (
    <section className="add_product main-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {errors.general && <p className="text-danger">{errors.general}</p>}

            <form className="add_product_form" onSubmit={handleSubmit}>
              <div className="input_fields">
                <input
                  className="add_input_field"
                  type="file"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                />
                {errors.image && (
                  <p className="text-danger small">{errors.image}</p>
                )}
              </div>

              <div className="input_fields">
                <input
                  className="add_input_field"
                  type="text"
                  placeholder="Company Name"
                  value={form.companyName}
                  onChange={(e) =>
                    setForm({ ...form, companyName: e.target.value })
                  }
                />
                {errors.companyName && (
                  <p className="text-danger small">{errors.companyName}</p>
                )}
              </div>

              <div className="input_fields">
                <input
                  className="add_input_field"
                  type="text"
                  placeholder="Product Name"
                  value={form.ProductName}
                  onChange={(e) =>
                    setForm({ ...form, ProductName: e.target.value })
                  }
                />
                {errors.ProductName && (
                  <p className="text-danger small">{errors.ProductName}</p>
                )}
              </div>

              <div className="input_fields">
                <input
                  className="add_input_field"
                  type="text"
                  placeholder="Product Price"
                  value={form.ProductPrice}
                  onChange={(e) =>
                    setForm({ ...form, ProductPrice: e.target.value })
                  }
                />
                {errors.ProductPrice && (
                  <p className="text-danger small">{errors.ProductPrice}</p>
                )}
              </div>

              <div className="input_fields">
                <input
                  className="add_input_field"
                  type="text"
                  placeholder="Category"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                />
                {errors.category && (
                  <p className="text-danger small">{errors.category}</p>
                )}
              </div>

              <button className="d_btn" type="submit">
                Upload
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;
