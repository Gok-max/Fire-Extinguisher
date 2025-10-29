import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [showVideo, setShowVideo] = useState(false); // 🎬 for video modal toggle
  const videoRef = useRef(null); // 🎬 reference for video element


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
        if (res.data.variants && res.data.variants.length > 0) {
          setSelectedVariant(res.data.variants[0]);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product)
    return (
      <p className="text-center mt-20 text-[#F28C1E] text-lg">Loading...</p>
    );

  return (
    <div className="px-6 md:px-20 py-10 mt-20 space-y-10">
      {/* 🧱 Product Header */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-10">
        {/* Left - Variant Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={`http://localhost:5000${selectedVariant.gallery[0]}`}
            alt={selectedVariant.name}
            className="rounded-xl w-full md:w-96 h-96 object-contain border-2 border-[#F28C1E]"
          />
        </div>

        {/* Right - Info */}
        <div className="md:w-1/2 space-y-5">
          <h1 className="text-4xl font-bold text-[#F28C1E]">
            {selectedVariant?.name}
          </h1>

          <p className="text-2xl font-semibold text-green-700">
            ₹{selectedVariant?.price || "N/A"}
          </p>
          <p className="text-gray-500">(Inclusive of all taxes)</p>

          {/* Sizes */}
          <div className="flex flex-wrap gap-3">
            {product.variants.map((variant, i) => (
              <button
                key={i}
                onClick={() => setSelectedVariant(variant)}
                className={`px-5 py-2 rounded-lg font-medium border transition ${
                  selectedVariant?.size === variant.size
                    ? "bg-[#F28C1E] text-white border-[#F28C1E]"
                    : "bg-white text-[#F28C1E] border-[#F28C1E] hover:bg-[#F28C1E]/10"
                }`}
              >
                {variant.size}
              </button>
            ))}
          </div>

          {/* Warranty & Certification */}
          <div className="flex gap-10 mt-4">
            <div>
              <h3 className="text-lg font-semibold text-[#F28C1E]">
                Warranty
              </h3>
              <p>5 Years Warranty*</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#F28C1E]">
                Certification
              </h3>
              <p>ISO 9001:2015 Certified</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <Link
              to="/contact"
              className="bg-[#F28C1E] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#d77a14] transition"
            >
              Enquiry Now
            </Link>

            {/* 🎥 Video Button */}
            {product.video && (
              <button
                onClick={() => setShowVideo(true)}
                className="bg-transparent border-2 border-[#F28C1E] text-[#F28C1E] px-6 py-2 rounded-lg font-semibold hover:bg-[#F28C1E]/10 transition"
              >
                Watch Video
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 🧱 Product Section (Image + Key Points) */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-10">
        {/* Product Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={
              product.image?.startsWith("http")
                ? product.image
                : `http://localhost:5000${product.image}`
            }
            alt={product.name}
            className="w-full md:w-96 h-auto rounded-2xl shadow-lg border-2 border-[#F28C1E] object-contain bg-white p-4 hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Key Points */}
        {product.keypoints?.length > 0 && (
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-semibold text-[#F28C1E] mb-4">
              Key Points
            </h2>
            <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
              {product.keypoints.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 🧾 Specifications Table */}
      {selectedVariant?.specifications?.length > 0 && (
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-2xl font-semibold text-[#F28C1E] mb-4 text-center">
            Specifications for {selectedVariant.size}
          </h3>
          <table className="min-w-full border border-gray-300 rounded-xl">
            <tbody>
              {selectedVariant.specifications.map((spec, i) => (
                <tr
                  key={i}
                  className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-6 py-3 font-medium border-b border-gray-200 w-1/3">
                    {spec.name}
                  </td>
                  <td className="px-6 py-3 border-b border-gray-200">
                    {spec.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 🎬 Video Modal */}
{showVideo && (
  <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
    <div className="relative bg-white rounded-xl overflow-hidden w-11/12 md:w-2/3 lg:w-1/2">
      <button
        onClick={() => {
          if (videoRef.current) {
            videoRef.current.pause(); // ⏸ pause before closing
          }
          setShowVideo(false);
        }}
        className="absolute top-3 right-3 text-[#F28C1E] font-bold text-xl z-10 bg-white/80 rounded-full px-2"
      >
        ✕
      </button>
      <video
        ref={videoRef} // 🔗 attach ref
        src={`http://localhost:5000${product.video}`}
        controls
        autoPlay
        className="w-full h-auto rounded-xl"
      ></video>
    </div>
  </div>
)}

    </div>
  );
};

export default ProductDetails;
