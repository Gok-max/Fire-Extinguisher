import React from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import {
  FaWhatsapp,
  FaInstagram,
  FaYoutube,
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
} from "react-icons/fa6";
import InquiryForm from "../components/Inquiry/InquiryForm";
import Officer from "../assets/Officer.jpg"

const Contact = () => {
  return (
    <section className="min-h-screen py-20 bg-gray-50 mt-6 space-y-10">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-[#F28C1E]">Contact Us</h2>
        <p className="text-gray-600 mt-2">
          Get in touch with us for any inquiries or project collaborations.
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white shadow-lg rounded-2xl p-8 flex flex-col justify-center border-1 border-[#F28C1E]"
        >
         <img src={Officer} alt="Officer" className=" w-4xl h-4xl rounded-lg"/> 
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white shadow-lg rounded-2xl p-8 space-y-6 border-1 border-[#F28C1E]"
        >
          <h3 className="text-2xl font-semibold text-[#F28C1E] mb-4 text-center m-6">
            Get in Touch
          </h3>
          <p className="text-gray-700 text-center text-md">Reach out to us directly or fill out the form below.</p>

          <p className="text-[#F28C1E] text-center text-xl font-bold">Mr.XYZ</p>

          <div className="space-y-5">

            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-[#F28C1E] text-xl" />
              <p className="text-gray-700">+91 98765 43210</p>
            </div>

            <div className="flex items-center gap-4">
              <FaEnvelope className="text-[#F28C1E] text-xl" />
              <p className="text-gray-700">info@firesecureindia.com</p>
            </div>

            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-[#F28C1E] text-xl" />
              <p className="text-gray-700">
                45B, Industrial Area, Chennai, Tamil Nadu, India
              </p>
            </div>
            <div className="flex gap-2 py-3 place-self-center-safe">
            <a
                          href="https://wa.me/919876543210"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#25D366] text-2xl border-2 border-[#25D366] rounded-full p-2"
                        >
                          <FaWhatsapp />
                        </a>
                        <a
                          href="https://www.instagram.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#E4405F] text-2xl border-2 border-[#E4405F] rounded-full p-2"
                        >
                          <FaInstagram />
                        </a>
                        <a
                          href="https://www.youtube.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-2xl text-[#FF0000] border-2 border-[#FF0000] rounded-full p-2"
                        >
                          <FaYoutube />
                        </a>
                        <a
                          href="https://www.facebook.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xl text-[#1877F2] border-2 border-[#1877F2] rounded-full p-2"
                        >
                          <FaFacebookF />
                        </a>
                        <a
                          href="https://twitter.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xl text-[#1DA1F2] border-2 border-[#1DA1F2] rounded-full p-2"
                        >
                          <FaXTwitter />
                        </a>
                        <a
                          href="https://www.linkedin.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xl text-[#0077B5] border-2 border-[#0077B5] rounded-full p-2"
                        >
                          <FaLinkedinIn />
                        </a>
                        </div>
          </div>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6">
         <motion.div
           initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white shadow-lg rounded-2xl p-8 space-y-6 border-1 border-[#F28C1E]"
        >
        <h3 className="text-2xl font-bold mb-4 text-center text-[#F28C1E]">Locate a Address</h3>
                 {/* Google Map */}
          <iframe
            title="location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.084958778902!2d80.2083!3d13.0674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267a1f4188c3f%3A0x6b2e7f9e1ec0ad87!2sChennai!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            className="mt-6 w-full h-96 rounded-xl border-0"
            loading="lazy"
          ></iframe>
        </motion.div>

        {/* Contact Form */}
        <motion.div
            initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white shadow-lg rounded-2xl p-8 space-y-6 border-1 border-[#F28C1E]"
        >
          <InquiryForm />
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;


 

       