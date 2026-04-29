
import { Routes, Route, Navigate } from "react-router-dom";
import AddProduct from "./AddProduct";
import MyProduct from "./MyProduct";
import EditProduct from "./EditProduct";
import RetailerFormLogin from "./RetailerFormLogin";
import RetailerDashboard from "./RetailerDashboard";

const RetailerMain = () => {
  return (
    <>
      <Routes>
        <Route path="AddProduct" element={<AddProduct />} />
        <Route path="MyProduct" element={<MyProduct />} />
        <Route path="editPage/:id" element={<EditProduct />} />
        <Route path="login" element={<RetailerFormLogin />} />

        <Route
          path="dashboard"
          element={
            localStorage.getItem("retailerToken") ? (
              <RetailerDashboard />
            ) : (
              <Navigate to="login" replace />
            )
          }
        />
      </Routes>
    </>
  );
};

export default RetailerMain;
