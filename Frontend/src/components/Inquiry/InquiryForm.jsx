import { useState } from "react";
import axios from "axios";
import { IoMdPerson } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt, FaCity } from "react-icons/fa";
import { HiGlobeAlt } from "react-icons/hi";
import { RiMessage2Fill } from "react-icons/ri";

function InquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/inquiry", formData);
      setStatus(res.data.msg);
      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "",
        state: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      setStatus("Failed to send message");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-[#F28C1E]">Inquiry Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

     <div className="flex items-center gap-2 border border-gray-300 rounded p-2">
  <IoMdPerson className="text-2xl text-[#F28C1E]" />
  <input
    type="text"
    name="name"
    placeholder="Your Name"
    className="w-full outline-none"
    value={formData.name}
    onChange={handleChange}
    required
  />
</div>
       <div className="flex items-center gap-2 border border-gray-300 rounded p-2">
        <MdEmail className="text-2xl text-[#F28C1E]" />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
           className="w-full outline-none"
          value={formData.email}
          onChange={handleChange}
          required
        />
        </div>

        <div className="flex items-center gap-2 border border-gray-300 rounded p-2">
         <FaPhoneAlt className="text-2xl text-[#F28C1E]" />
        <input
          type="tel"
          name="phone"
          placeholder="Your Phone Number"
           className="w-full outline-none"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        </div>

        <div className="flex items-center gap-2 border border-gray-300 rounded p-2">
         <FaCity className="text-2xl text-[#F28C1E]" />
        <input
          type="text"
          name="city"
          placeholder="City"
           className="w-full outline-none"
          value={formData.city}
          onChange={handleChange}
        />
        </div>

        <div className="flex items-center gap-2 border border-gray-300 rounded p-2">
         <HiGlobeAlt className="text-2xl text-[#F28C1E]" />
        <input
          type="text"
          name="state"
          placeholder="State"
           className="w-full outline-none"
          value={formData.state}
          onChange={handleChange}
        />
        </div>

        <div className="flex items-center gap-2 border border-gray-300 rounded p-2">
         <RiMessage2Fill className="text-2xl text-[#F28C1E]" />
        <textarea
          name="message"
          placeholder="Your Message"
           className="w-full outline-none"
          value={formData.message}
          onChange={handleChange}
          required
        />
        </div>
        <button
          type="submit"
          className="bg-[#F28C1E] text-white px-4 py-2 rounded w-full text-lg font-semibold cursor-pointer"
        >
          Send Message
        </button>
      </form>
      {status && (
        <p
          className={`mt-4 text-center ${
            status.includes("Failed") ? "text-red-600" : "text-green-600"
          }`}
        >
          {status}
        </p>
      )}
    </div>
  );
}

export default InquiryForm;
