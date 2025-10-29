import { useState } from "react";
import { motion } from "framer-motion";
import InquiryFrom from "./InquiryForm"

function EnquiryButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Vertical Enquiry Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 bg-[#F28C1E] text-white font-bold px-3 py-2 rounded-l-lg shadow-lg hover:bg-[#d97706] transition-all z-50 flex flex-col items-center space-y-1 cursor-pointer"
      >
        {Array.from("ENQUIRY").map((letter, index) => (
          <span key={index} className="text-sm">
            {letter}
          </span>
        ))}
      </motion.button>

      {/* Popup Form Drawer */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4 }}
            className="bg-white w-full sm:w-[400px] h-full shadow-xl p-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-2xl font-bold text-[#F28C1E]">Enquiry Form</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <InquiryFrom/>
          </motion.div>
        </div>
      )}
    </>
  );
}

export default EnquiryButton;
