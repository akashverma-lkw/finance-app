import React from "react";
import { FaCheckCircle, FaLock, FaHandshake } from "react-icons/fa";

const badges = [
  {
    icon: <FaLock size={28} className="text-blue-700" />,
    title: "IRDAI Registered",
    subtitle: "Certified by the Insurance Regulatory and Development Authority of India"
  },
  {
    icon: <FaCheckCircle size={28} className="text-green-600" />,
    title: "ISO 27001 Certified",
    subtitle: "World-class data protection and management practices"
  },
  {
    icon: <FaHandshake size={28} className="text-yellow-600" />,
    title: "Partnered with Top Insurers",
    subtitle: "LIC, HDFC Life, ICICI Prudential & more"
  }
];

const TrustBadgesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
          Trusted by Leading Institutions
        </h2>
        <p className="text-gray-600 mb-10 text-lg">
          We're certified and partnered with the most trusted names in finance and insurance.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {badges.map((badge, i) => (
            <div
              key={i}
              className="flex items-start gap-4 bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div className="mt-1">{badge.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{badge.title}</h3>
                <p className="text-sm text-gray-600">{badge.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadgesSection;
