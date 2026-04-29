import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import AllProduct from "./pages/customer/AllProduct";
import CoreMaterial from "./pages/customer/CoreMaterial";
import RetailerMain from "./pages/retailer/RetailerMain";
import { RetailerHeader } from "./components/RetailerHeader";
import MainPage from "./pages/MainPage";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import RetailerForm from "./pages/retailer/RetailerFormSignup";
import AdminMain from "./pages/Admin/AdminMain";   // ✅ Add this
import AdminMainPanal from "./pages/Admin/AdminMainPanal";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import RetailerFormSignup from "./pages/retailer/RetailerFormSignup";

function App() {
  const location = useLocation();

  const isRetailerRoute = location.pathname.startsWith("/retailer");
  const isMainPage = location.pathname === "/";
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!isRetailerRoute && !isMainPage && !isAuthPage && <Header />}
      {isRetailerRoute && <RetailerHeader />}

      <Routes>
        {/* Customer pages */}
        <Route path="/" element={<MainPage />} />
        <Route path="/retailerForm" element={<RetailerFormSignup />} />
        <Route path="/allProduct" element={<AllProduct />} />
        <Route path="/core-materials" element={<CoreMaterial />} />
        {/*  */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/proceedToPay" element={<CheckoutPage />}/>

        {/* Retailer pages */}
        <Route path="/retailer/*" element={<RetailerMain />} />

        {/* Auth pages */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* ✅ Admin routes */}
        <Route path="/admin/*" element={<AdminMain />} />
        <Route path="/adminMainPanal" element={<AdminMainPanal />} />
      </Routes>   
    </>
  );
}

export default App;
