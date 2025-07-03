import React, { useEffect, useState } from "react";
import { BarChart2, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";
import { motion } from "framer-motion";

const Overview = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const transactions = [
    { id: 1, title: "Grocery", amount: -1200, date: "2025-07-01" },
    { id: 2, title: "Salary", amount: 50000, date: "2025-07-01" },
    { id: 3, title: "Netflix", amount: -500, date: "2025-06-30" },
    { id: 4, title: "Electricity Bill", amount: -2300, date: "2025-06-29" },
  ];

  return (
    <motion.div
      className="p-4 space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: fadeIn ? 1 : 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-blue-700 mb-4">Overview</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Income */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500 transition cursor-pointer hover:shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-500">Total Income</p>
            <TrendingUp className="text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-green-600">₹50,000</h3>
        </motion.div>

        {/* Expenses */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500 transition cursor-pointer hover:shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-500">Total Expenses</p>
            <TrendingDown className="text-red-600" />
          </div>
          <h3 className="text-2xl font-bold text-red-600">₹32,000</h3>
        </motion.div>

        {/* Savings */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500 transition cursor-pointer hover:shadow-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-500">Total Savings</p>
            <PiggyBank className="text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-blue-600">₹18,000</h3>
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        <ul className="divide-y divide-gray-200">
          {transactions.map((tx) => (
            <li
              key={tx.id}
              className="py-3 px-2 flex justify-between items-center rounded-md transition hover:bg-gray-50 cursor-pointer"
            >
              <div>
                <p className="font-medium">{tx.title}</p>
                <p className="text-sm text-gray-400">{tx.date}</p>
              </div>
              <p
                className={`font-semibold ${
                  tx.amount < 0 ? "text-red-600" : "text-green-600"
                }`}
              >
                ₹{Math.abs(tx.amount)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Budget Progress */}
      <div className="bg-white p-6 rounded-xl shadow-md space-y-3">
        <h3 className="text-lg font-semibold mb-2">Monthly Budget Usage</h3>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-red-500 h-4 rounded-full transition-all duration-500"
            style={{ width: "64%" }}
          ></div>
        </div>
        <p className="text-sm text-gray-600">
          You’ve used ₹32,000 of your ₹50,000 budget.
        </p>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center justify-center h-64 cursor-pointer hover:bg-gray-50 transition">
        <BarChart2 className="text-gray-400 mb-2" size={48} />
        <p className="text-gray-500">Charts coming soon...</p>
      </div>
    </motion.div>
  );
};

export default Overview;
