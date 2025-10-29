import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import StatsSection from "../components/home/StatsSection";
import ClientNames from "../components/home/ClientNames";
import Hero from "../components/home/Hero";
import Spectrum from "../components/home/Spectrum";


const Home = () => {

  return (
    <div className="overflow-hidden mt-24">
      <Hero/>
   
      <section className="py-16 px-6 md:px-16 bg-gray-50 text-gray-800">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-center mb-8"
        >
          About Our Company
        </motion.h2>

        <p className="text-lg text-center max-w-3xl mx-auto leading-relaxed">
          With years of expertise in fire safety systems, our company
          specializes in installation, maintenance, and inspection of fire
          alarms, extinguishers, and emergency systems. Our mission is to
          protect lives and assets through professional service and innovative
          technology.
        </p>
      </section>

      <StatsSection/>
      <Spectrum/>
       <ClientNames/>

    </div>
  );
};

export default Home;
