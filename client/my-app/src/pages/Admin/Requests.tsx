import React, { useEffect, useState } from "react";
import axios from "axios";

// Define a type for the retailer request
type RetailerRequest = {
  _id: string;
  name: string;
  companyName: string;
  email: string;
  text: string;
};

const Requests = () => {
  const [requests, setRequests] = useState<RetailerRequest[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const res = await axios.get("http://localhost:5000/api/admin/requests");
      setRequests(res.data);
    };
    fetchRequests();
  }, []);

  const handleApprove = async (id: string) => {
    await axios.put(`http://localhost:5000/api/admin/approve/${id}`);
    setRequests((prev) => prev.filter((req) => req._id !== id));
  };

  return (
    <section className="main-padding">
      <h2>Pending Retailer Requests</h2>
      {requests.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        <ul>
          {requests.map((r) => (
            <li key={r._id}>
              <p>
                <strong>{r.companyName}</strong> ({r.email})
              </p>
              <p>{r.text}</p>
              <button onClick={() => handleApprove(r._id)}>Approve</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Requests;
