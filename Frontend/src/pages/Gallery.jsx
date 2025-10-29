import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const backendURL = "http://localhost:5000";

const Gallery = () => {
  const [serviceImages, setServiceImages] = useState([]);
  const [serviceVideos, setServiceVideos] = useState([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/services`);
        const images = res.data.filter((item) =>
          item.url?.match(/\.(jpg|jpeg|png|gif|webp)$/i)
        );
        const videos = res.data.filter((item) =>
          item.url?.match(/\.(mp4|mov|avi|mkv)$/i)
        );
        setServiceImages(images);
        setServiceVideos(videos);
      } catch (err) {
        console.error("Error fetching gallery data:", err);
      }
    };
    fetchGallery();
  }, []);

  return (
    <div className="mt-24 px-6 md:px-16 py-16 bg-gray-50 min-h-screen">
      {/* ✅ Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold text-center text-red-700 mb-12"
      >
        Gallery
      </motion.h1>

      {/* ✅ Images Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">
          Service Images
        </h2>

        {serviceImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {serviceImages.map((img, index) => (
              <motion.div
                key={img._id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="overflow-hidden rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={`${backendURL}${img.url}`}
                  alt={img.title || "Service Image"}
                  className="w-full h-64 object-cover"
                />
                <div className="bg-white p-4 text-center">
                  <p className="font-medium text-gray-700">
                    {img.title || "Fire Safety System"}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">
            No service images uploaded yet.
          </p>
        )}
      </section>

      {/* ✅ Videos Section */}
      <section>
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">
          Service Videos
        </h2>

        {serviceVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceVideos.map((video, index) => (
              <motion.div
                key={video._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="rounded-2xl shadow-lg overflow-hidden bg-black"
              >
                <video
                  controls
                  className="w-full h-72 object-cover"
                  poster="https://img.freepik.com/free-photo/firefighter-holding-hose-with-water-fire_23-2150296941.jpg"
                >
                  <source src={`${backendURL}${video.url}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="bg-white p-4 text-center">
                  <p className="font-medium text-gray-700">
                    {video.title || "Service Video"}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">
            No service videos uploaded yet.
          </p>
        )}
      </section>
    </div>
  );
};

export default Gallery;
