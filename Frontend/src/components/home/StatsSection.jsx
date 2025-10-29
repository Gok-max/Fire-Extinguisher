import React from 'react'
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { FaBuilding, FaFireExtinguisher, FaHandshake } from "react-icons/fa";

function StatsSection() {
  return (
    <>
        <section className="py-16 bg-gradient-to-r from-[#F28C1E] to-[#e67e22] text-white text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-6">
          {[
            { end: 10, suffix: "+", label: "Years of Experience", icon: <FaBuilding size={40} /> },
            { end: 500, suffix: "+", label: "Projects Completed", icon: <FaFireExtinguisher size={40} /> },
            { end: 300, suffix: "+", label: "Happy Clients", icon: <FaHandshake size={40} /> },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center bg-white backdrop-blur-lg p-8 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <div className="text-[#F28C1E] mb-3">{item.icon}</div>
              <h3 className="text-4xl font-bold text-[#F28C1E]">
                <CountUp end={item.end} duration={2} suffix={item.suffix} enableScrollSpy />
              </h3>
              <p className="mt-2 text-lg font-medium text-[#F28C1E]">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  )
}

export default StatsSection