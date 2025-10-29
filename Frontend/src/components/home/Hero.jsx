import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const backendURL = "http://localhost:5000";

function Hero() {
     const [serviceImages, setServiceImages] = useState([]);
     const [currentIndex, setCurrentIndex] = useState(0); 

     const navigate = useNavigate();

     useEffect(() => {

    const fetchServices = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/services`);
        console.log("Fetched services:", res.data);

        const images = res.data.filter(
          (item) => item.url && item.url.match(/\.(jpg|jpeg|png|gif)$/i)
        );

        setServiceImages(images.slice(0, 5));
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    };
    fetchServices();
  }, []);

  // 👇 Auto slideshow effect
  useEffect(() => {
    if (serviceImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) =>
          prev === serviceImages.length - 1 ? 0 : prev + 1
        );
      }, 3000); // every 3 seconds
      return () => clearInterval(interval);
    }
  }, [serviceImages]);

  const currentImage =
    serviceImages.length > 0
      ? `${backendURL}${serviceImages[currentIndex].url}`
      : "https://img.freepik.com/free-photo/firefighter-holding-hose-with-water-fire_23-2150296941.jpg";

  return (
    <>
        <section className="bg-gradient-to-r from-[#F28C1E] to-[#e67e22] text-white py-16 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between rounded-lg">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="md:w-1/2 space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Fire Execution & Safety Solutions
          </h1>
          <p className="text-lg">
            We provide complete fire protection systems for industrial,
            commercial, and residential sectors with guaranteed safety and trust.
          </p>
          <div className=' space-x-3'>
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => navigate("/about")}
            className=" text-white font-semibold px-6 py-3 rounded-lg shadow-lg border-1 border-white text-lg cursor-pointer hover:bg-white hover:text-[#F28C1E]"
          >
            Learn More
          </motion.button>
           <motion.button
             whileHover={{ scale: 1.06 }}
             onClick={() => navigate("/products")}
             className="bg-white text-[#F28C1E] font-semibold px-6 py-3 rounded-lg shadow-lg text-lg cursor-pointer
                 border border-white hover:bg-[#F28C1E] hover:text-white transition-colors"
            >
             View Products
           </motion.button>
          </div>
        </motion.div>

        {/* 🔥 Auto Slideshow Section */}
        <motion.img
          key={currentImage} // animation triggers when image changes
          src={currentImage}
          alt={
            serviceImages[currentIndex]?.title || "Fire Safety Service"
          }
          className="mt-10 md:mt-0 md:w-1/2 h-[400px] rounded-2xl shadow-2xl object-cover"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 1 }}
        />
      </section>

    </>
  )
}

export default Hero