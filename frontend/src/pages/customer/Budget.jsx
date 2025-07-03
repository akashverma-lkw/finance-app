import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Budget = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const overallBudget = 40000;
  const overallSpent = 32000;
  const overallPercent = Math.min((overallSpent / overallBudget) * 100, 100);

  const categories = [
    { name: "Groceries", limit: 8000, spent: 6200 },
    { name: "Entertainment", limit: 5000, spent: 4800 },
    { name: "Utilities", limit: 6000, spent: 3000 },
    { name: "Transport", limit: 4000, spent: 3500 },
    { name: "Shopping", limit: 7000, spent: 7100 },
  ];

  const getColor = (percent) => {
    if (percent >= 90) return "bg-red-500";
    if (percent >= 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <motion.div
      className="p-4 space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: fadeIn ? 1 : 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-blue-700">Monthly Budget Overview</h2>

      {/* Overall Budget */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500 transition cursor-pointer"
      >
        <p className="mb-2 text-lg font-medium">Total Budget Limit: ₹{overallBudget}</p>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className={`h-4 rounded-full ${getColor(overallPercent)} transition-all duration-700`}
            style={{ width: `${overallPercent}%` }}
          ></div>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Spent: ₹{overallSpent} ({Math.round(overallPercent)}%)
        </p>
      </motion.div>

      {/* Category Budgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat, idx) => {
          const percent = Math.min((cat.spent / cat.limit) * 100, 100);
          const color = getColor(percent);

          return (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-5 rounded-xl shadow transition cursor-pointer border-l-4"
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-gray-700">{cat.name}</h4>
                <span className="text-sm text-gray-500">
                  ₹{cat.spent} / ₹{cat.limit}
                </span>
              </div>
              <div className="w-full bg-gray-200 h-4 rounded-full">
                <div
                  className={`h-4 rounded-full ${color} transition-all duration-700`}
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {Math.round(percent)}% used
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Tip/Reminder */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="bg-blue-50 border border-blue-200 text-blue-700 p-4 rounded-xl shadow-sm transition cursor-pointer"
      >
        💡 Tip: Keep your expenses under 70% of your budget to stay financially healthy!
      </motion.div>
    </motion.div>
  );
};

export default Budget;
