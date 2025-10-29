import React from "react";
import { motion } from "framer-motion";
import { FaFireExtinguisher, FaShieldAlt, FaTools, FaRegBuilding, FaBolt, FaUserShield } from "react-icons/fa";

const services = [
  {
    id: 1,
    title: "Fire Extinguisher Installation",
    icon: <FaFireExtinguisher size={40} />,
    desc: "Professional installation of fire extinguishers for residential, commercial, and industrial spaces.",
  },
  {
    id: 2,
    title: "Fire Safety Audit",
    icon: <FaShieldAlt size={40} />,
    desc: "Comprehensive inspection and auditing to ensure compliance with fire safety standards.",
  },
  {
    id: 3,
    title: "System Maintenance",
    icon: <FaTools size={40} />,
    desc: "Regular maintenance of fire alarm, sprinkler, and safety systems for optimal performance.",
  },
  {
    id: 4,
    title: "Building Fire Protection",
    icon: <FaRegBuilding size={40} />,
    desc: "Complete fire safety solutions for offices, factories, and residential complexes.",
  },
  {
    id: 5,
    title: "Electrical Fire Protection",
    icon: <FaBolt size={40} />,
    desc: "Prevent and protect against electrical fires with specialized detection and suppression systems.",
  },
  {
    id: 6,
    title: "Fire Training & Drills",
    icon: <FaUserShield size={40} />,
    desc: "On-site fire safety training and mock drills to prepare employees for real emergencies.",
  },
];

const Services = () => {
  return (
    <section className="min-h-screen py-20 bg-gray-200 mt-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-[#F28C1E]">Our Services</h2>
        <p className="text-gray-600 mt-2">
          We provide end-to-end fire safety solutions for all industries and environments.
        </p>
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-shadow duration-300 border-1 border-[#F28C1E]"
          >
            <div className="flex justify-center text-[#F28C1E] mb-4">{service.icon}</div>
            <h3 className="text-2xl font-semibold text-black">{service.title}</h3>
            <p className="text-gray-700 mt-2">{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;

// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";

// const Services = () => {
//   const [services, setServices] = useState([]);

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/services");
//         setServices(res.data);
//       } catch (error) {
//         console.error("Error fetching services:", error);
//       }
//     };
//     fetchServices();
//   }, []);

//   return (
//     <section className="min-h-screen py-20 bg-gray-50 mt-6">
//       <motion.div
//         initial={{ opacity: 0, y: -30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="text-center mb-12"
//       >
//         <h2 className="text-4xl font-bold text-red-700">Our Services</h2>
//         <p className="text-gray-600 mt-2">
//           We provide end-to-end fire safety solutions for all industries and environments.
//         </p>
//       </motion.div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
//         {services.length > 0 ? (
//           services.map((service, index) => (
//             <motion.div
//               key={service._id}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: index * 0.15 }}
//               whileHover={{ scale: 1.05 }}
//               className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-shadow duration-300"
//             >
//               {/* Display image or video */}
//              {service.file ? (
//   service.type === "image" ? (
//     <img
//       src={`http://localhost:5000${service.file}`}
//       alt={service.title}
//       className="w-full h-56 object-cover rounded-lg mb-4"
//     />
//   ) : (
//     <video
//       controls
//       className="w-full h-56 object-cover rounded-lg mb-4"
//     >
//       <source
//         src={`http://localhost:5000${service.file}`}
//         type="video/mp4"
//       />
//     </video>
//   )
// ) : (
//   <div className="w-full h-56 bg-gray-200 flex items-center justify-center rounded-lg mb-4 text-gray-500">
//     No preview available
//   </div>
// )}



//               <h3 className="text-2xl font-semibold text-gray-800">
//                 {service.title}
//               </h3>
//               <p className="text-gray-600 mt-2">{service.description}</p>
//             </motion.div>
//           ))
//         ) : (
//           <p className="text-center text-gray-500">Loading services...</p>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Services;
