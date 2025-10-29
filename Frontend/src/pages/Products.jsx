import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products?page=1");
        setProducts(res.data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="min-h-screen py-16 bg-gradient-to-b from-gray-50 to-gray-200 mt-8">
      <div className="text-center mb-12 px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#F28C1E]">Our Products</h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Premium fire safety products built for protection and trust.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 sm:px-6">
        {products.map((product) => (
          <motion.div
            key={product._id}
            className="relative group"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Desktop (Flip Card) */}
            <div className="hidden sm:block relative w-full h-80 transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              {/* Front Side */}
              <div className="absolute inset-0 bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center [backface-visibility:hidden] border-1 border-[#F28C1E]">
                <img
                  src={
                    product.image.startsWith("http")
                      ? product.image
                      : `http://localhost:5000${product.image}`
                  }
                  alt={product.name}
                  className="w-48 h-48 object-contain mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-700 text-center px-2">
                  {product.name}
                </h3>
              </div>

              {/* Back Side */}
              <div className="absolute inset-0 bg-[#F28C1E] text-white rounded-2xl p-6 text-center [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center">
                <p className="text-sm mb-4">{product.category}</p>
                <button
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="bg-white text-[#F28C1E] px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  View Details
                </button>
              </div>
            </div>

            {/* Mobile (Simple Card) */}
            <div className="sm:hidden bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center p-4">
              <img
                src={
                  product.image.startsWith("http")
                    ? product.image
                    : `http://localhost:5000${product.image}`
                }
                alt={product.name}
                className="w-40 h-40 object-contain mb-3"
              />
              <h3 className="text-lg font-semibold text-gray-700 text-center mb-2">
                {product.name}
              </h3>
              <button
                onClick={() => navigate(`/product/${product._id}`)}
                className="bg-[#F28C1E] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#e57c0d] transition"
              >
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Products;
