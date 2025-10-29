import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Industry from "../components/about/Industry";
// import StatsSection from "../components/home/StatsSection";

const backendURL = "http://localhost:5000";

const About = () => {

  const [serviceImages, setServiceImages] = useState([]);

 useEffect(() => {

    const fetchServices = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/services`);
        console.log("Fetched services:", res.data);

        const images = res.data.filter(
          (item) => item.url && item.url.match(/\.(jpg|jpeg|png|gif)$/i)
        );

        setServiceImages(images.slice(0, 3));
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    };

    fetchServices();
  }, []);


  return (
    <div className="pt-17 bg-gray-50 text-gray-800 overflow-hidden">
      {/* 🧯 About Content Section */}
      <section className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto py-12 px-6 gap-10">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="md:w-1/2 space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#F28C1E]">
            Dedicated to Safety. Driven by Trust.
          </h2>
          <p className="text-lg leading-relaxed">
            Fire Execution Co. specializes in the design, installation, and
            maintenance of advanced fire protection systems for commercial,
            industrial, and residential buildings. Our mission is to safeguard
            lives and assets with precision-engineered safety systems.
          </p>
          <p className="text-lg leading-relaxed">
            We take pride in delivering quality and reliability, ensuring every
            project exceeds industry standards with unmatched commitment and
            integrity.
          </p>
        </motion.div>

        {/* Image */}
        {serviceImages.length > 0 ? (
          <motion.img
            src={`http://localhost:5000${serviceImages[0].url}`}  // ✅ use first image
            alt={serviceImages[0].title || "Fire Safety Service"}
            className="mt-10 md:mt-0 md:w-1/2 rounded-2xl shadow-2xl object-cover"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          />
        ) : (
          // fallback image if no service image available
          <motion.img
            src="https://img.freepik.com/free-photo/firefighter-holding-hose-with-water-fire_23-2150296941.jpg"
            alt="Fire Safety"
            className="mt-10 md:mt-0 md:w-1/2 rounded-2xl shadow-2xl object-cover"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          />
        )}

      </section>

       {/* 💬 Mission & Vision */}
      <section className="max-w-6xl mx-auto py-8 px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-[#F28C1E]"
        >
          <h3 className="text-2xl font-bold text-[#F28C1E] mb-4">Our Mission</h3>
          <p className="text-lg leading-relaxed text-gray-700">
            To provide world-class fire safety systems that protect lives and
            property through innovation, technology, and reliable service.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-[#F28C1E]"
        >
          <h3 className="text-2xl font-bold text-[#F28C1E] mb-4">Our Vision</h3>
          <p className="text-lg leading-relaxed text-gray-700">
            To be a global leader in fire safety, recognized for our commitment
            to excellence, safety innovation, and customer satisfaction.
          </p>
        </motion.div>
      </section>
    
    <Industry/>
    </div>
  );
};

export default About;
