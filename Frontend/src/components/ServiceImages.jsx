import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const backendURL = "http://localhost:5000";

function ServiceImages() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/services`);
        // Filter only images
        const imageServices = res.data.filter(
          (item) => item.url && item.url.match(/\.(jpg|jpeg|png|gif)$/i)
        );
        setServices(imageServices);
      } catch (err) {
        console.error(err);
      }
    };
    fetchServices();
  }, []);

  return (
    <section className="min-h-screen bg-gray-50 py-10">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-red-700">Service Images</h2>
        <p className="text-gray-600 mt-2">
          Explore images from our latest fire safety projects and installations.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <motion.div
            key={service._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-4 text-center hover:shadow-2xl transition"
          >
            <img
             src={`http://localhost:5000${service.url}`}
              alt={service.title}
              className="w-full h-56 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">
              {service.title}
            </h3>
            <p className="text-gray-600 mt-2">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default ServiceImages;
