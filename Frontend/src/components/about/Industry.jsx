import React from 'react'
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Industry() {

    const spectrum = [
  {
    id: 1,
    title: "House",
    image: "/industry/house.jpg",
  },
  {
    id: 2,
    title: "Hospital",
    image: "/industry/hospital.jpg",
  },
  {
    id: 3,
    title: "School",
    image: "/industry/school.jpg",
  },
  {
    id: 4,
    title: "Office",
    image: "/industry/office.jpg",
  },
  {
    id: 5,
    title: "Residential",
    image: "/industry/residential.jpg",
  },
   {
    id: 6,
    title: "Hotel",
    image: "/industry/hotel.jpg",
  },
   {
    id: 7,
    title: "Factory",
    image: "/industry/factory.jpg",
  },
   {
    id: 8,
    title: "Data Center",
    image: "/industry/data center.jpg",
  },
];

  return (
     <>
      <section className="py-16 px-6 md:px-16">

  <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-[#F28C1E]">
    Industries We Serve
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
    {spectrum.map((item, i) => (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: i * 0.2 }}
        whileHover={{ scale: 1.05 }}
        className="overflow-hidden text-center border-1 border-[#F28C1E] p-3 rounded-xl"
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-60 h-60 mx-auto object-cover"
        />
        <div className="p-2 text-center">
          <h3 className="text-lg font-semibold text-black">
            {item.title}
          </h3>
        </div>
      </motion.div>
    ))}
  </div>

</section>
    </>
  )
}

export default Industry