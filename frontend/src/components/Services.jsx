import React from "react";
import Slider from "react-slick";
import {
  FaPiggyBank,
  FaChartLine,
  FaCreditCard,
  FaShieldAlt
} from "react-icons/fa";

const services = [
  {
    title: "Savings & Budgeting",
    description: "Track your expenses, set goals, and grow your savings with smart budgeting tools.",
    icon: <FaPiggyBank size={30} className="text-blue-600" />,
  },
  {
    title: "Investments",
    description: "Build wealth with diversified investment plans tailored to your goals and risk profile.",
    icon: <FaChartLine size={30} className="text-green-600" />,
  },
  {
    title: "Credit & Loans",
    description: "Get instant personal loans and credit card recommendations with transparent rates.",
    icon: <FaCreditCard size={30} className="text-purple-600" />,
  },
  {
    title: "Secure Banking",
    description: "Top-tier security with 2FA, encryption, and fraud detection to protect your money.",
    icon: <FaShieldAlt size={30} className="text-red-600" />,
  },
];

const sliderSettings = {
  dots: true,
  arrows: false,
  infinite: true,
  speed: 600,
  autoplay: true,
  autoplaySpeed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Services = () => {
  return (
    <section className="py-16 bg-gray-50 px-6" id="services">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Our Financial Services
        </h2>
        <p className="text-gray-600 mb-12">
          Empowering your financial journey with innovative, secure, and user-friendly solutions.
        </p>
        <div className="sm:hidden">
          <Slider {...sliderSettings}>
            {services.map((service, index) => (
              <div key={index} className="px-4">
                <div className="bg-white p-6 rounded-xl shadow text-left">
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 cursor-pointer">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
