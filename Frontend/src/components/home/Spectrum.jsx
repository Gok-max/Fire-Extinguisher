import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const spectrum = [
  {
    id: 1,
    title: "FIRE EXTINGUISHERS",
    image: "/images/FE.avif",
  },
  {
    id: 2,
    title: "IN-PANEL FIRE SUPPRESSION",
    image: "/images/In-panel-system.avif",
  },
  {
    id: 3,
    title: "KITCHEN FIRE SUPPRESSION",
    image: "/images/KSS.avif",
  },
  {
    id: 4,
    title: "TOTAL FLOODING SYSTEMS",
    image: "/images/TOTAL-FLOODING--SYSTEMS.avif",
  },
  {
    id: 5,
    title: "AUTOMATIC FIREFIGHTERS",
    image: "/images/AUTOMATIC-FIREFIGHTERS.avif",
  },
   {
    id: 6,
    title: "HYDRANTS",
    image: "/images/HYDRANTS.avif",
  },
   {
    id: 7,
    title: "ALARM SOLUTIONS",
    image: "/images/ALARM-SOLUTIONS.avif",
  },
   {
    id: 8,
    title: "SERVICES",
    image: "/images/SERVICES.avif",
  },
];

function Spectrum() {
  return (
    <>
      <section className="py-16 px-6 md:px-16">
  <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-[#F28C1E]">
    Spectrum of Our Services
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
    {spectrum.map((item, i) => (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: i * 0.2 }}
        whileHover={{ scale: 1.05 }}
        className="overflow-hidden text-center"
      >
        <img
          src={item.image}
          alt={item.title}
          className=" w-24 h-24 mx-auto object-cover"
        />
        <div className="p-2 text-center">
          <h3 className="text-sm font-semibold text-[#F28C1E]">
            {item.title}
          </h3>
        </div>
      </motion.div>
    ))}
  </div>

  <div className="text-center mt-10">
    <Link
      to="/services"
      className="inline-block text-xl font-semibold text-[#F28C1E] hover:underline hover:text-[#d35400] transition"
    >
      Click to see our services
    </Link>
  </div>
</section>
    </>
  );
}

export default Spectrum;
