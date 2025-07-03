import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Transactions = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const transactions = [
    { id: 1, title: "Salary", amount: 30000, type: "income", date: "2025-07-01" },
    { id: 2, title: "Groceries", amount: 2000, type: "expense", date: "2025-07-02" },
    { id: 3, title: "Netflix", amount: 500, type: "expense", date: "2025-07-03" },
    { id: 4, title: "Freelance", amount: 8000, type: "income", date: "2025-07-04" },
    { id: 5, title: "Electricity", amount: 2200, type: "expense", date: "2025-07-05" },
    { id: 6, title: "Bonus", amount: 5000, type: "income", date: "2025-07-06" },
    { id: 7, title: "Internet Bill", amount: 1000, type: "expense", date: "2025-07-07" },
    { id: 8, title: "Investment Return", amount: 12000, type: "income", date: "2025-07-08" },
    { id: 9, title: "Dining Out", amount: 1800, type: "expense", date: "2025-07-09" },
    { id: 10, title: "Side Project", amount: 9000, type: "income", date: "2025-07-10" },
  ];

  return (
    <motion.div
      className="p-4 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: fadeIn ? 1 : 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-blue-700">All Transactions</h2>

      {/* ✅ SCROLLABLE TABLE WRAPPER */}
      <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
        <div className="max-w-full overflow-x-auto rounded-md">
          <table className="min-w-[800px] w-full text-sm text-left">
            <thead className="bg-blue-50 text-gray-700">
              <tr>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Title</th>
                <th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <motion.tr
                  key={t.id}
                  whileHover={{ scale: 1.01 }}
                  className="border-t transition hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-5 py-3 text-gray-600">{t.date}</td>
                  <td className="px-5 py-3 font-medium text-gray-800">{t.title}</td>
                  <td
                    className={`px-5 py-3 font-semibold ${
                      t.type === "income" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    ₹{t.amount}
                  </td>
                  <td className="px-5 py-3 capitalize text-gray-600">{t.type}</td>
                  <td className="px-5 py-3 text-right">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                        t.type === "income"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {t.type === "income" ? "Credited" : "Debited"}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default Transactions;
