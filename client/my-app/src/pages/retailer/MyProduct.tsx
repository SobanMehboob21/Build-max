import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";

interface Product {
  _id: string;
  companyName: string;
  ProductName: string;
  ProductPrice: string;
  category: string;
  image: string;
}

const MyProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const location = useLocation();

  const fetchProducts = async () => {
    setLoading(true);
    setError("");

    const token = localStorage.getItem("retailerToken");
    if (!token) {
      setError("Please login again.");
      setLoading(false);
      return;
    }

    try {
      console.log("Fetching products with token:", token);

      const res = await axios.get(
        "http://localhost:5000/api/retailer-products/my-products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setProducts(res.data.products);
      } else {
        setError(res.data.message || "Failed to load products.");
      }
    } catch (err: any) {
      console.error("Fetch error:", err);
      const msg = err.response?.data?.message || "Failed to load products.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Update product after edit
  useEffect(() => {
    const updatedProduct = location.state?.updatedProduct;
    if (updatedProduct) {
      setProducts((prev) =>
        prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
      );
    }
  }, [location.state]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    const token = localStorage.getItem("retailerToken");
    try {
      await axios.delete(`http://localhost:5000/api/retailer-products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts((prev) => prev.filter((p) => p._id !== id));
      alert("Product deleted!");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to delete.");
    }
  };

  if (loading) return <div className="text-center p-4">Loading your products...</div>;
  if (error) return <div className="alert alert-danger text-center">{error}</div>;

  return (
    <section className="my_all_products">
      <div className="container">
        <div className="row">
          {products.length === 0 ? (
            <div className="col-12 text-center p-4">
              <p className="text-muted">No products found. <NavLink to="../addProduct">Add your first product!</NavLink></p>
            </div>
          ) : (
            products.map((item) => (
              <div className="col-lg-3 mb-4" key={item._id}>
                <div className="featured_products_card">
                  <div className="company_image">
                    <img
                      className="featured-company_image"
                      src={item.image}
                      alt={item.ProductName}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://via.placeholder.com/300x200?text=No+Image";
                      }}
                    />
                  </div>
                  <div className="card_body">
                    <div className="company_Details">
                      <div className="company_name">{item.companyName}</div>
                      <div className="in_stock text-success">In stock</div>
                    </div>
                    <div className="product_name">{item.ProductName}</div>
                    <div className="price fw-bold">Rs {item.ProductPrice}</div>
                    <div className="category text-muted small">Category: {item.category}</div>

                    <div className="mt-3">
                      <button
                        className="d_btn me-2"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>

                      <NavLink
                        to={`../editPage/${item._id}`}
                        state={{ product: item }}
                        className="p_btn"
                      >
                        Edit
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default MyProduct;