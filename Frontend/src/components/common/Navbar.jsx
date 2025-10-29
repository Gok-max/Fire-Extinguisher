import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../../assets/logo.jpeg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Handle logout
 const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin"));

const handleLogout = () => {
  localStorage.removeItem("isAdmin");
  localStorage.removeItem("token");
  setIsAdmin(null);
  navigate("/");
};


  // ✅ Navigation links for normal users
  const userLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  // ✅ Navigation links for admin
  const adminLinks = [
    { name: "Dashboard", path: "/adminProduct" },
    { name: "Manage Services", path: "/adminService" },
  ];

  // ✅ Framer Motion Animation Variants
  const navVariants = {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-0 w-full bg-white/90 shadow-md z-50 rounded-lg"
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* 🔥 Logo + Company Name */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3"
          >
            <img
              src={Logo}
              alt="Fire Execution Logo"
              className="h-12 w-12 object-contain rounded-bl-xl rounded-tr-xl shadow-lg"
            />
            <div className="leading-tight">
              <div className="text-2xl font-extrabold text-[#F28C1E] tracking-wider font-serif">
                Fire Execution Co.
              </div>
              <div className="text-sm text-gray-500 ml-1">
                Safety. Trust. Excellence.
              </div>
            </div>
          </motion.div>

          {/* 🖥️ Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {(isAdmin ? adminLinks : userLinks).map((link, i) => {
              const isActive = location.pathname === link.path;
              return (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * i, duration: 0.4 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Link
                    to={link.path}
                    className={`relative font-medium transition-colors text-lg group
                      ${isActive ? "text-[#F28C1E]" : "text-gray-600 hover:text-[#F28C1E]"}
                    `}
                  >
                    {link.name}
                    <span
                      className={`absolute left-0 -bottom-1 w-full border-b-2 border-[#F28C1E] transform origin-left transition-transform duration-300 
                        ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
                      `}
                    />
                  </Link>
                </motion.div>
              );
            })}

            {/* 🔓 Logout Button (Admin only) */}
            {isAdmin && (
              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-[#F28C1E] text-lg font-semibold border-2 border-[#F28C1E] px-4 py-2 rounded-lg shadow-md hover:bg-[#F28C1E] hover:text-white transition"
              >
                Logout
              </motion.button>
            )}
          </div>

          {/* 📱 Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              aria-label="Toggle menu"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
              className="text-[#F28C1E] hover:text-[#F28C1E] transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* 📱 Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="md:hidden bg-white shadow-inner rounded-2xl p-4"
          >
            <div className="px-4 py-3 space-y-2">
              {(isAdmin ? adminLinks : userLinks).map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div key={link.name} whileHover={{ scale: 1.05 }}>
                    <Link
                      to={link.path}
                      className={`block font-medium transition-colors duration-200 
                        ${isActive ? "text-[#F28C1E]" : "text-gray-600 hover:text-[#F28C1E]"}
                      `}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}

              {/* 🔓 Logout for Mobile (Admin only) */}
              {isAdmin && (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-center rounded-xl font-medium bg-[#F28C1E] text-white text-lg hover:bg-white hover:text-[#F28C1E] transition py-2"
                >
                  Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
