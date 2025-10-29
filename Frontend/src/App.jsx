// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import AdminLogin from "./admin/AdminLogin";
import AdminRegister from "./admin/AdminRegister";
import AdminProductPage from "./admin/AdminProductPage";
import AdminService from "./admin/AdminServer";
import ProtectedRoute from "./admin/ProtectedRoute";
import Gallery from "./pages/Gallery";
import Footer from "./components/common/Footer";
import EnquiryButton from "./components/Inquiry/EnquiryButton";
import ProductDetails from "./components/ProductDetails";

function AppContent() {
  const location = useLocation();

  // 👇 List of admin routes where Enquiry button should be hidden
  const adminPaths = [
    "/adminLogin",
    "/adminRegister",
    "/adminProduct",
    "/adminService",
  ];

  // 👇 Check if current path starts with any admin route
  const isAdminPage = adminPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      <Navbar />

      <Routes>
        {/* 🧑‍💼 Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* 🔒 Admin Routes (Protected) */}
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/adminRegister" element={<AdminRegister />} />
        <Route
          path="/adminProduct"
          element={
            <ProtectedRoute>
              <AdminProductPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminService"
          element={
            <ProtectedRoute>
              <AdminService />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />

      {/* 👇 Only show EnquiryButton if NOT on admin page */}
      {!isAdminPage && <EnquiryButton />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
