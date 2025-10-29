import React from "react";
import { Link } from "react-router-dom";
import {
  FaWhatsapp,
  FaInstagram,
  FaYoutube,
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
} from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* 🧯 Company Info */}
        <div>
          <h2 className="text-2xl font-bold text-[#F28C1E] mb-3">
            Fire Execution Pvt. Ltd.
          </h2>
          <p className="text-sm leading-relaxed">
            Your trusted partner in fire protection and safety solutions.
            We specialize in installation, maintenance, and inspection of
            fire safety systems across industries.
          </p>
        </div>

        {/* 📜 Menu */}
        <div>
          <h3 className="text-xl font-semibold text-[#F28C1E] mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-[#F28C1E]">Home</Link></li>
            <li><Link to="/about" className="hover:text-[#F28C1E]">About</Link></li>
            <li><Link to="/products" className="hover:text-[#F28C1E]">Products</Link></li>
            <li><Link to="/services" className="hover:text-[#F28C1E]">Services</Link></li>
            <li><Link to="/contact" className="hover:text-[#F28C1E]">Contact</Link></li>
            <li><Link to="/adminLogin" className="hover:text-[#F28C1E]">Admin</Link></li>
          </ul>
        </div>

        {/* 📍 Address & Contact */}
        <div>
          <h3 className="text-xl font-semibold text-[#F28C1E] mb-3">
            Contact Info
          </h3>
          <p className="text-sm">📍 123, Industrial Area, Tamil Nadu, India</p>
          <p className="text-sm mt-2">📞 +91 98765 43210</p>
          <p className="text-sm mt-2">✉️ info@firesafety.com</p>
        </div>

        {/* 🌐 Social Media */}
        <div>
          <h3 className="text-xl font-semibold text-[#F28C1E] mb-3">
            Follow Us
          </h3>
          <div className="flex space-x-4 text-lg">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#25D366]"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E4405F]"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FF0000]"
            >
              <FaYoutube />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1877F2]"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1DA1F2]"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0077B5]"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* ⚙️ Footer Bottom */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Fire Execution Pvt. Ltd. | All Rights Reserved
      </div>
    </footer>
  );
}

export default Footer;
