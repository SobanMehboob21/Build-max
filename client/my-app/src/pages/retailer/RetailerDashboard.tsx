import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface OrderItem {
  _id: string;
  ProductName: string;
  ProductPrice: string;
  quantity: number;
  image: string;
}

interface Order {
  _id: string;
  items: OrderItem[];
  totalPrice: number;
  paymentMethod: string;
  address: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}

const RetailerDashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"orders" | "revenue">("orders");

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders"); // same, backend filters
      setOrders(res.data.orders || []);
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Accept or reject order
  const handleUpdateOrderStatus = async (
    orderId: string,
    status: "accepted" | "rejected"
  ) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}`, {
        status,
      });
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      );

      // Notify customer (you can implement your notification logic here)
      await axios.post(`http://localhost:5000/api/notifications`, {
        orderId,
        message: `Your order has been ${status}`,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Prepare chart data for revenue and order count
  const chartData = orders
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    )
    .map((order) => ({
      date: new Date(order.createdAt).toLocaleDateString(),
      totalRevenue: order.totalPrice,
      orderCount: 1,
    }));

  // Aggregate data by date
  const aggregatedChartData = chartData.reduce((acc: any[], curr) => {
    const existing = acc.find((d) => d.date === curr.date);
    if (existing) {
      existing.totalRevenue += curr.totalRevenue;
      existing.orderCount += curr.orderCount;
    } else {
      acc.push({ ...curr });
    }
    return acc;
  }, []);

  if (loading) return <p className="text-center mt-5">Loading dashboard...</p>;
  if (error) return <p className="text-danger text-center mt-5">{error}</p>;

  return (
    <section className="main-padding">
      <div className="container">
        <h2 className="mb-4">Retailer Dashboard</h2>

        {/* Tabs */}
        <div className="mb-4">
          <button
            className={`btn me-2 ${
              activeTab === "orders" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setActiveTab("orders")}
          >
            Orders
          </button>
          <button
            className={`btn ${
              activeTab === "revenue" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setActiveTab("revenue")}
          >
            Revenue
          </button>
        </div>

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <>
            {orders.length === 0 ? (
              <p>No orders yet.</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Products</th>
                      <th>Total Price</th>
                      <th>Payment Method</th>
                      <th>Delivery Address</th>
                      <th>Status</th>
                      <th>Actions</th>
                      <th>Order Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>
                          {order.items.map((item) => (
                            <div
                              key={item._id}
                              className="d-flex align-items-center mb-1"
                            >
                              <img
                                src={item.image}
                                alt={item.ProductName}
                                width={40}
                                className="me-2 rounded"
                              />
                              <span>
                                {item.ProductName} (x{item.quantity})
                              </span>
                            </div>
                          ))}
                        </td>
                        <td>Rs {order.totalPrice.toLocaleString()}</td>
                        <td>
                          {order.paymentMethod === "card"
                            ? "Credit/Debit Card"
                            : "Cash on Delivery"}
                        </td>
                        <td>{order.address}</td>
                        <td>{order.status}</td>
                        <td>
                          {order.status === "pending" && (
                            <>
                              <button
                                className="btn btn-success btn-sm me-2"
                                onClick={() =>
                                  handleUpdateOrderStatus(order._id, "accepted")
                                }
                              >
                                Accept
                              </button>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                  handleUpdateOrderStatus(order._id, "rejected")
                                }
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </td>
                        <td>{new Date(order.createdAt).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* Revenue Tab */}
        {activeTab === "revenue" && (
          <div className="card p-4 shadow-sm">
            {aggregatedChartData.length === 0 ? (
              <p>No revenue data yet.</p>
            ) : (
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={aggregatedChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="totalRevenue"
                    stroke="#8884d8"
                    name="Revenue"
                  />
                  <Line
                    type="monotone"
                    dataKey="orderCount"
                    stroke="#82ca9d"
                    name="Orders"
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default RetailerDashboard;
