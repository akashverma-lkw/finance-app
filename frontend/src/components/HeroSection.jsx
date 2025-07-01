import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import {
  FaShieldAlt,
  FaHeartbeat,
  FaChartLine,
} from "react-icons/fa";

import "swiper/css";
import "swiper/css/pagination";

const heroSlides = [
  {
    icon: <FaShieldAlt size={60} className="text-white mb-4" />,
    title: "Secure Your Future Today",
    description: "Compare trusted insurance plans tailored to your needs. Protect your finances with confidence.",
    buttonText: "Compare & Secure Now"
  },
  {
    icon: <FaHeartbeat size={60} className="text-white mb-4" />,
    title: "Protect What Matters Most",
    description: "Health is wealth. Choose the right health coverage for your loved ones and avoid financial emergencies.",
    buttonText: "Explore Health Plans"
  },
  {
    icon: <FaChartLine size={60} className="text-white mb-4" />,
    title: "Your Safety, Our Priority",
    description: "Invest smartly. Learn how to grow your money while staying protected with guaranteed return plans.",
    buttonText: "View Investment Options"
  }
];

const HeroSection = () => {
  return (
    <section className="w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="w-full"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-800 text-white py-20 px-4 text-center min-h-[450px] flex flex-col justify-center items-center">
              {slide.icon}
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
              <p className="text-lg md:text-xl mb-6 max-w-2xl">{slide.description}</p>
              <button className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition">
                {slide.buttonText}
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSection;
