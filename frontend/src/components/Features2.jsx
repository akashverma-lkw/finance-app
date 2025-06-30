import React from "react";
import Slider from "react-slick";
import {
  FaLock,
  FaRocket,
  FaUserShield,
  FaMobileAlt,
  FaChartPie,
  FaHeadset,
} from "react-icons/fa";
import { FcStart } from "react-icons/fc";

const features = [
  {
    icon: <FaLock size={28} className="text-blue-600" />,
    title: "Bank-Grade Security",
    description: "Your data and transactions are protected with advanced encryption and 2FA.",
  },
  {
    icon: <FaRocket size={28} className="text-green-600" />,
    title: "Fast & Seamless",
    description: "Enjoy lightning-fast performance with a seamless and intuitive user experience.",
  },
  {
    icon: <FaUserShield size={28} className="text-purple-600" />,
    title: "Trusted & Regulated",
    description: "Fully compliant with financial regulations to ensure safety and transparency.",
  },
  {
    icon: <FaMobileAlt size={28} className="text-yellow-500" />,
    title: "Mobile Friendly",
    description: "Access your finances anytime, anywhere with our responsive mobile-first design.",
  },
  {
    icon: <FaChartPie size={28} className="text-pink-500" />,
    title: "Smart Analytics",
    description: "Visualize your spending, savings, and investments with real-time insights.",
  },
  {
    icon: <FaHeadset size={28} className="text-red-500" />,
    title: "24/7 Support",
    description: "Our customer care team is always ready to assist you via chat, email, or call.",
  },
];

const sliderSettings = {
  dots: true,
  arrows: false,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Features2 = () => {
  return (
    <section className="bg-white py-16 px-6" id="features">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4 flex justify-center items-center gap-2">
          <FcStart />
          Benefits
        </h2>
        <p className="text-gray-600 mb-12">
          Discover how we help you stay in control of your finances with powerful, secure, and easy-to-use tools.
        </p>

        {/* 👇 Auto Carousel on Mobile */}
        <div className="sm:hidden">
          <Slider {...sliderSettings}>
            {features.map((feature, index) => (
              <div key={index} className="px-4">
                <div className="bg-gray-50 p-6 rounded-xl shadow text-left h-full">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* 👇 Grid for Desktop */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left cursor-pointer">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features2;
