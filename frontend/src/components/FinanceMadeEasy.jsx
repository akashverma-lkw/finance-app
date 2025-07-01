import React, { useState } from "react";

const categories = ["All", "Investments", "Insurance", "Loans", "Tax Saving", "Retirement"];

const contentData = [
  {
    id: 1,
    type: "Article",
    category: "Investments",
    title: "How to Start SIP in Mutual Funds",
    description: "A beginner’s guide to systematic investing in mutual funds.",
    link: "#",
  },
  {
    id: 2,
    type: "Video",
    category: "Insurance",
    title: "Term Insurance Explained in 2 Mins",
    description: "A quick explainer on how term insurance works and why it's important.",
    link: "#",
  },
  {
    id: 3,
    type: "Infographic",
    category: "Loans",
    title: "Home Loan EMI Breakdown",
    description: "Understand how your EMI is calculated with this simple infographic.",
    link: "#",
  },
  {
    id: 4,
    type: "Explainer",
    category: "Tax Saving",
    title: "How to Save Taxes Legally in India",
    description: "Explore tax-saving instruments under Section 80C and more.",
    link: "#",
  },
  {
    id: 5,
    type: "Article",
    category: "Retirement",
    title: "Planning Your Retirement Fund",
    description: "The earlier you start, the better. Here's how to plan it right.",
    link: "#",
  },
  {
    id: 6,
    type: "Video",
    category: "Investments",
    title: "Mutual Funds vs Fixed Deposits",
    description: "A visual comparison of risk, return, and tax benefits.",
    link: "#",
  },
];

const FinanceMadeEasy = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredContent =
    selectedCategory === "All"
      ? contentData
      : contentData.filter((item) => item.category === selectedCategory);

  return (
    <section className="py-16 bg-gray-50" id="finance-made-easy">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Finance Made Easy</h2>
        <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
          Learn personal finance through easy-to-understand articles, videos, infographics, and more.
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full border text-sm sm:text-base ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border-gray-300"
              } transition-all duration-200`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 cursor-pointer">
          {filteredContent.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md p-6 text-left hover:shadow-lg transition duration-300"
            >
              <div className="text-blue-600 font-semibold text-sm mb-1">{item.type}</div>
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{item.description}</p>
              <a
                href={item.link}
                className="inline-block text-blue-500 text-sm font-medium hover:underline"
              >
                Read More →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FinanceMadeEasy;
