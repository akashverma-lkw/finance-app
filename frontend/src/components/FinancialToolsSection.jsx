import React from "react";
import {
  FaPiggyBank,
  FaMoneyBillWave,
  FaUserShield,
  FaChartLine,
  FaCalculator
} from "react-icons/fa";

const tools = [
  {
    title: "SIP Calculator",
    icon: <FaPiggyBank size={24} />,
    description: "Plan your monthly investments to reach your future goals.",
    link: "/calculators/sip"
  },
  {
    title: "EMI Calculator",
    icon: <FaMoneyBillWave size={24} />,
    description: "Estimate your loan EMI and interest breakdown instantly.",
    link: "/calculators/emi"
  },
  {
    title: "Retirement Calculator",
    icon: <FaUserShield size={24} />,
    description: "Know how much you need to save for a peaceful retirement.",
    link: "/calculators/retirement"
  },
  {
    title: "Term Insurance Estimator",
    icon: <FaChartLine size={24} />,
    description: "Figure out your ideal insurance cover based on income & goals.",
    link: "/calculators/term-cover"
  },
  {
    title: "Loan Eligibility Checker",
    icon: <FaCalculator size={24} />,
    description: "See how much loan amount you're eligible for.",
    link: "/calculators/loan-eligibility"
  }
];

const FinancialToolsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 ">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-700 text-center mb-4">
          Financial Calculator Tools
        </h2>
        <p className="text-center text-gray-600 text-lg mb-10">
          Explore our powerful calculators to make smart financial decisions.
        </p>

        <div className="space-y-6">
          {tools.map((tool, index) => (
            <a
              key={index}
              href={tool.link}
              className="flex items-start gap-4 border-b pb-4 hover:pl-2 transition-all duration-300 group"
            >
              <div className="text-blue-600 mt-1 group-hover:scale-110 transition">
                {tool.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-700">
                  {tool.title}
                </h3>
                <p className="text-sm text-gray-600">{tool.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FinancialToolsSection;
