import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes, Outlet, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";

// Admin Imports
import AdminNavbar from "./admin_components/Navbar/Navbar";
import AdminSidebar from "./admin_components/Sidebar/Sidebar";
import AdminLogin from "./admin_components/Login/Login";
import AdminAdd from "./admin_pages/Add/Add";
import AdminList from "./admin_pages/List/List";
import AdminOrders from "./admin_pages/Orders/Orders";

const CustomerLayout = ({ showLogin, setShowLogin }) => {
  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

const AdminLayout = () => {
  return (
    <div>
      <AdminNavbar />
      <hr />
      <div className="app-content">
        <AdminSidebar />
        <Outlet />
      </div>
    </div>
  );
};

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Customer Routes */}
        <Route path="/" element={<CustomerLayout showLogin={showLogin} setShowLogin={setShowLogin} />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="order" element={<PlaceOrder />} />
          <Route path="verify" element={<Verify />} />
          <Route path="myorders" element={<MyOrders />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin">
          <Route index element={<AdminLogin url={url} />} />
          <Route element={<AdminLayout />}>
            <Route path="add" element={<AdminAdd url={url}/>} />
            <Route path="list" element={<AdminList url={url}/>} />
            <Route path="orders" element={<AdminOrders url={url}/>} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
