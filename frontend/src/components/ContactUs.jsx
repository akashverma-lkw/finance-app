import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const ContactUs = () => {
  return (
    <section className="py-16 px-6 bg-white" id="contact">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-blue-800 mb-4">Contact Us</h2>
        <p className="text-center text-gray-600 mb-10">
          Reach out to us for policy inquiries, support, or collaboration. We're here to help!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6 text-gray-700 text-base mt-10">
            <div className="flex items-start gap-4">
              <FaPhoneAlt className="text-blue-600 mt-1" size={20} />
              <div>
                <h4 className="font-semibold">Phone</h4>
                <p>+91 12345 67890</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FaEnvelope className="text-blue-600 mt-1" size={20} />
              <div>
                <h4 className="font-semibold">Email</h4>
                <p>support@finsecure.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-blue-600 mt-1" size={20} />
              <div>
                <h4 className="font-semibold">Office</h4>
                <p>2nd Floor, Tower B, FinSecure HQ, Mumbai, India</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FaClock className="text-blue-600 mt-1" size={20} />
              <div>
                <h4 className="font-semibold">Working Hours</h4>
                <p>Mon - Fri: 9:00 AM to 6:00 PM</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="bg-gray-50 p-6 rounded-lg shadow space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 p-3 rounded"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 p-3 rounded"
              required
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              className="w-full border border-gray-300 p-3 rounded resize-none"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
