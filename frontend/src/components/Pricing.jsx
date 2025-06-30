import React from "react";

const plans = [
  {
    name: "Starter",
    price: "₹0",
    description: "Ideal for individuals getting started with finance tracking.",
    features: [
      "Basic budgeting tools",
      "Spending insights",
      "Email support",
    ],
    highlight: false,
  },
  {
    name: "Pro",
    price: "₹499/mo",
    description: "Perfect for professionals managing savings, credit, and investments.",
    features: [
      "All Starter features",
      "Investment tracking",
      "Credit score monitoring",
      "Priority support",
    ],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "₹1499/mo",
    description: "Tailored for businesses with custom reports and integrations.",
    features: [
      "All Pro features",
      "Custom analytics",
      "Multiple user accounts",
      "Dedicated account manager",
    ],
    highlight: false,
  },
];

const Pricing = () => {
  return (
    <section className="bg-gray-100 py-20 px-6" id="pricing">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Plans</h2>
        <p className="text-gray-600 mb-12">
          Choose a plan that suits your financial goals. Upgrade anytime.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 cursor-pointer">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white p-8 rounded-2xl shadow-xl border-t-4 transition-transform transform hover:-translate-y-2 hover:shadow-2xl ${
                plan.highlight ? "border-blue-600 scale-105" : "border-gray-200"
              }`}
            >
              {plan.highlight && (
                <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                  Most Popular
                </span>
              )}

              <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
              <p className="text-3xl font-extrabold text-blue-700 mb-4">{plan.price}</p>
              <p className="text-gray-600 mb-6">{plan.description}</p>

              <ul className="text-gray-700 space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="text-green-500 mr-2">✔</span> {feature}
                  </li>
                ))}
              </ul>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition">
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
