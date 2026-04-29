import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { decreaseQty, addToCart, clearCart } from "../redux/cartSlice";
import "../styles/CartPage.css";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { items } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  // Calculate total price
  const totalPrice = items.reduce(
    (sum, item) => sum + Number(item.ProductPrice) * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="main-padding">
        <div className="container text-center">
          <h2>Your Cart is Empty</h2>
          <p>Start adding some products!</p>
          <Link to="/allProduct" className="btn btn-primary mt-3">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="main-padding">
      <div className="container ">
        <h2 className="mb-4">Shopping Cart ({items.length} Items)</h2>

        <div className="row">
          {/* Left Side - Cart Items */}
          <div className="col-lg-8">
            {items.map((item) => (
              <div className="card mb-3 shadow-sm" key={item._id}>
                <div className="row g-0">
                  <div className="col-md-3">
                    <img
                      src={item.image}
                      alt={item.ProductName}
                      className="img-fluid rounded-start"
                    />
                  </div>
                  <div className="col-md-9">
                    <div className="card-body">
                      <h5 className="card-title">{item.ProductName}</h5>
                      {/* <p className="card-text text-muted">{item.companyName}</p> */}

                      <div className="d-flex justify-content-between align-items-center">
                        <p className="fw-bold mb-0">
                          Rs {Number(item.ProductPrice).toLocaleString()}
                        </p>

                        <div className="d-flex align-items-center">
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => dispatch(clearCart())}
                          >
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="mt-3 d-flex align-items-center">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => dispatch(decreaseQty(item._id))}
                        >
                          -
                        </button>

                        <span className="mx-2">{item.quantity}</span>

                        <button
                          className="btn btn-sm btn-outline-dark ms-2"
                          onClick={() => dispatch(addToCart(item))}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Clear cart button */}
            <button
              className="btn btn-danger mt-3"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </button>
          </div>

          {/* Right Side - Price Summary */}
          <div className="col-lg-4">
            <div className="card shadow-sm p-3">
              <h5 className="mb-3">Order Summary</h5>
              <p className="d-flex justify-content-between">
                <span>Total Items:</span> <span>{items.length}</span>
              </p>
              <p className="d-flex justify-content-between">
                <span>Total Price:</span>{" "}
                <span className="fw-bold">
                  Rs {totalPrice.toLocaleString()}
                </span>
              </p>

              <Link to="/proceedToPay" className="btn btn-warning w-100 mt-3">
                Proceed to Checkout
              </Link>
              <Link
                to="/allProduct"
                className="btn btn-outline-secondary w-100 mt-2"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
