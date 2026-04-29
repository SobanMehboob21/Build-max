// pages/Admin/AdminMain.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Requests from "../Admin/Requests.tsx";

const AdminMain = () => {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminMain />} />
      <Route path="/request" element={<Requests />} />
    </Routes>
  );
};

export default AdminMain;
