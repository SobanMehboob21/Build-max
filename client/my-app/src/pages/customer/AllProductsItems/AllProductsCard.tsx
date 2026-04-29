import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cartSlice.ts";

interface Product {
  _id: string;
  companyName: string;
  ProductName: string;
  ProductPrice: string; // keep as string because you store it that way
  image: string;
  // add any extra fields you need (category, stock, etc.)
}

type SortOption = "default" | "priceLow" | "priceHigh";

const AllProductsCard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sort, setSort] = useState<SortOption>("default");
  const dispatch = useDispatch();
  // -------------------------------------------------
  // 1. FETCH ALL PRODUCTS (public endpoint)
  // -------------------------------------------------
  const fetchAll = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/retailer-products/all"
      );
      if (data.success) setProducts(data.products);
      else setError(data.message ?? "Failed to load products");
    } catch (e: any) {
      console.error(e);
      setError(e.response?.data?.message ?? "Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // -------------------------------------------------
  // 2. SORT LOGIC
  // -------------------------------------------------
  const sortedProducts = React.useMemo(() => {
    let list = [...products];

    if (sort === "priceLow") {
      list.sort((a, b) => Number(a.ProductPrice) - Number(b.ProductPrice));
    } else if (sort === "priceHigh") {
      list.sort((a, b) => Number(b.ProductPrice) - Number(a.ProductPrice));
    }
    // "default" → keep server order (newest first)

    return list;
  }, [products, sort]);

  // -------------------------------------------------
  // 3. RENDER
  // -------------------------------------------------
  if (loading) return <div className="text-center p-5">Loading products…</div>;
  if (error)
    return <div className="alert alert-danger text-center">{error}</div>;

  return (
    <section className="featured_products AllProductsCard">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="AllProductsCard__heading">
              <div className="featured_products_content">All Products</div>

              {/* ==== FILTER DROPDOWN ==== */}
              <div className="filterby">
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {sort === "priceLow"
                      ? "Price: Low to High"
                      : sort === "priceHigh"
                      ? "Price: High to Low"
                      : "Sort by"}
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setSort("default");
                        }}
                      >
                        Default (newest)
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setSort("priceLow");
                        }}
                      >
                        Price: Low to High
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setSort("priceHigh");
                        }}
                      >
                        Price: High to Low
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* ==== PRODUCT GRID ==== */}
          {sortedProducts.length === 0 ? (
            <div className="col-12 text-center p-5 text-muted">
              No products yet.
            </div>
          ) : (
            sortedProducts.map((p) => (
              <div className="col-lg-4 col-md-6" key={p._id}>
                <div className="featured_products_card">
                  <div className="company_image">
                    <img
                      className="featured-company_image"
                      src={p.image}
                      alt={p.ProductName}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://via.placeholder.com/300x200?text=No+Image";
                      }}
                    />
                  </div>

                  <div className="card_body ">
                    <div className="company_Details">
                      <div className="company_name">{p.companyName}</div>
                      <div className="in stock">In stock</div>
                    </div>

                    <div className="product_name ">{p.ProductName}</div>

                    <div className="review ">
                      <div>
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className="ri-star-s-fill"></i>
                        ))}
                      </div>
                      <div className="reviews">(0)</div>
                    </div>

                    <div className="price">
                      Rs {Number(p.ProductPrice).toLocaleString()}
                    </div>

                    <button
                      className="d_btn"
                      onClick={() =>
                        dispatch(
                          addToCart({
                            _id: p._id,
                            ProductName: p.ProductName,
                            ProductPrice: p.ProductPrice,
                            image: p.image,
                            quantity: 1, // optional, handled in slice
                          })
                        )
                      }
                    >
                      Add to cart
                    </button>
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

export default AllProductsCard;
