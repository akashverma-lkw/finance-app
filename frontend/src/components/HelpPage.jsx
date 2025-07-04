import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaQuestionCircle,
  FaPhoneAlt,
  FaEnvelope,
  FaPaperPlane,
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";

const faqs = [
  {
    question: "How do I update my profile image?",
    answer: "Go to 'My Account', click edit, upload a new image and save changes."
  },
  {
    question: "How do I reset my password?",
    answer: "Click on 'Forgot Password' on the login page and follow the instructions."
  },
  {
    question: "Can I delete my account permanently?",
    answer: "Yes, contact support and request account deletion. Your data will be removed."
  }
];

const HelpPage = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="pt-[80px] min-h-screen w-full bg-gradient-to-b from-indigo-50 to-purple-100 px-4 sm:px-10 py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-700 mb-3 flex justify-center items-center gap-3">
          <FaQuestionCircle className="text-purple-500 animate-bounce" /> Help & Support
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Need help? Browse our FAQs or submit your query and our team will get back to you shortly.
        </p>
        <img
          src="https://images.vexels.com/media/users/3/134904/isolated/preview/55500571b8176366dd4298b925235cb2-3d-contact-support-icon.png"
          alt="Help Illustration"
          className="w-64 mx-auto mt-6"
        />
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="bg-white rounded-2xl shadow-lg max-w-4xl mx-auto mb-16 p-6 sm:p-10"
      >
        <h2 className="text-2xl font-semibold text-indigo-700 mb-6">Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4 border-b pb-4">
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full text-left text-gray-800 font-medium text-lg"
            >
              {faq.question}
              {openFAQ === index ? (
                <FaChevronUp className="text-indigo-500" />
              ) : (
                <FaChevronDown className="text-indigo-500" />
              )}
            </button>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={openFAQ === index ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="text-gray-600 mt-2 pl-1">{faq.answer}</p>
            </motion.div>
          </div>
        ))}
      </motion.div>

      {/* Contact Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-10"
      >
        <h2 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
          <FaPaperPlane className="text-green-500" /> Submit a Query
        </h2>
        <form className="space-y-4 text-sm sm:text-base">
          <div>
            <label className="block mb-1 font-medium">Your Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Your Message</label>
            <textarea
              rows="4"
              placeholder="Describe your issue or question..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-full transition-all flex justify-center items-center gap-2"
          >
            <FaEnvelope /> Send Message
          </button>
        </form>
        <div className="mt-6 text-gray-500 text-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="flex items-center gap-2">
            <FaPhoneAlt className="text-blue-500" /> +91-9876543210
          </span>
          <span className="flex items-center gap-2">
            <FaEnvelope className="text-pink-500" /> help@yourwebsite.com
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default HelpPage;
