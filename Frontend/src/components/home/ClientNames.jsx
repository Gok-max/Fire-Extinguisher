import React from 'react'
import { motion } from "framer-motion";

function ClientNames() {
  return (
    <>
  <section className="py-16 px-6 md:px-16 bg-white text-center">
  <motion.h2
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="text-3xl md:text-4xl font-bold text-[#d35400] mb-10"
  >
    Our Trusted Clients
  </motion.h2>

  <div className="overflow-hidden relative">
    <motion.div
      className="flex space-x-12 animate-scrollX"
      initial={{ x: 0 }}
      animate={{ x: ["0%", "-50%"] }}
      transition={{
        repeat: Infinity,
        duration: 20,
        ease: "linear",
      }}
    >
      {[
        "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
        "https://purepng.com/public/uploads/large/purepng.com-google-logo-2015brandlogobrand-logoiconssymbolslogosgoogle-6815229372333mqrr.png",
        "https://indiancompanies.in/wp-content/uploads/2020/05/TCS-Logo-Tata-consultancy-service-1920x1144.png",
        "https://logodix.com/logo/1047785.png",
        "https://logowik.com/content/uploads/images/zoho-new9282.logowik.com.webp",
        "https://www.pngmart.com/files/23/Shell-Logo-PNG-Pic.png",
      ].map((logo, i) => (
        <motion.img
          key={i}
          src={logo}
          alt={`Client ${i + 1}`}
          className="h-20 w-auto object-contain opacity-80 hover:opacity-100 transition duration-300"
          whileHover={{ scale: 1.1 }}
        />
      ))}

      {/* Duplicate logos for smooth infinite loop */}
      {[
        "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/0/08/Google_Logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/1/19/Tata_Consultancy_Services_Logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/5/51/Infosys_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/7/78/Wipro_Primary_Logo_Color_RGB.svg",
        "https://upload.wikimedia.org/wikipedia/commons/6/6e/Siemens_logo.svg",
      ].map((logo, i) => (
        <motion.img
          key={`dup-${i}`}
          src={logo}
          alt={`Client ${i + 1}`}
          className="h-20 w-auto object-contain opacity-80 hover:opacity-100 transition duration-300"
          whileHover={{ scale: 1.1 }}
        />
      ))}
    </motion.div>
  </div>
</section>

    </>
  )
}

export default ClientNames