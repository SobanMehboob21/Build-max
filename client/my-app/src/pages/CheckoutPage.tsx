import React, { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import axios from "axios";

const CheckoutPage = () => {
  const { items } = useSelector((state: RootState) => state.cart);

  const [paymentMethod, setPaymentMethod] = useState("cod"); // cod or card
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const totalPrice = items.reduce(
    (sum, item) => sum + Number(item.ProductPrice) * item.quantity,
    0
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name in cardDetails) {
      setCardDetails({ ...cardDetails, [name]: value });
    } else {
      setAddress(value);
    }
  };

  const handlePlaceOrder = async () => {
    if (!address) {
      setError("Please enter delivery address");
      return;
    }

    if (paymentMethod === "card") {
      if (!cardDetails.cardNumber || !cardDetails.expiry || !cardDetails.cvv) {
        setError("Please fill in all card details");
        return;
      }
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Send order data to backend
      const orderPayload = {
        items,
        totalPrice,
        paymentMethod,
        cardDetails: paymentMethod === "card" ? cardDetails : null,
        address,
      };

      const res = await axios.post(
        "http://localhost:5000/api/orders",
        orderPayload
      );

      if (res.data.success) {
        setSuccess("Order placed successfully!");
        // Optional: clear cart here (dispatch clearCart)
      } else {
        setError(res.data.message || "Failed to place order");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="main-padding">
      <div className="container">
        <h2 className="mb-4 text-center">Checkout</h2>
        <div className="row">
          {/* Left Column: Cart Summary */}
          <div className="col-md-6">
            <h4>Order Summary</h4>
            <div className="card p-3 shadow-sm">
              {items.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <>
                  {items.map((item) => (
                    <div
                      className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-2"
                      key={item._id}
                    >
                      <div className="d-flex align-items-center">
                        <img
                          src={item.image}
                          alt={item.ProductName}
                          width="60"
                          className="me-3 rounded"
                        />
                        <div>
                          <p className="mb-1 fw-bold">{item.ProductName}</p>
                          <small className="text-muted">
                            Qty: {item.quantity}
                          </small>
                        </div>
                      </div>
                      <div>
                        <p className="mb-0 fw-bold">
                          Rs{" "}
                          {(
                            Number(item.ProductPrice) * item.quantity
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="d-flex justify-content-between mt-3">
                    <h5>Total:</h5>
                    <h5>Rs {totalPrice.toLocaleString()}</h5>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Column: Payment Method */}
          <div className="col-md-6">
            <h4>Payment Method</h4>
            <div className="card p-4 shadow-sm">
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}

              <div className="mb-3">
                <label htmlFor="paymentMethod" className="form-label">
                  Choose Payment Option
                </label>
                <select
                  id="paymentMethod"
                  className="form-select"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="cod">Cash on Delivery</option>
                  <option value="card">Credit / Debit Card</option>
                </select>
              </div>

              {paymentMethod === "card" && (
                <div className="mb-3">
                  <label className="form-label">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={cardDetails.cardNumber}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="xxxx-xxxx-xxxx-xxxx"
                  />
                  <label className="form-label mt-2">Expiry</label>
                  <input
                    type="text"
                    name="expiry"
                    value={cardDetails.expiry}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="MM/YY"
                  />
                  <label className="form-label mt-2">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={cardDetails.cvv}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="123"
                  />
                </div>
              )}

              <div className="mb-3">
                <label className="form-label">Delivery Address</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={address}
                  onChange={handleInputChange}
                  placeholder="Enter full address"
                  name="address"
                ></textarea>
              </div>

              <button
                type="button" // important! prevents default form submission
                className="btn btn-primary w-100 mt-2"
                onClick={handlePlaceOrder}
                disabled={loading || items.length === 0}
              >
                {loading ? "Processing..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
