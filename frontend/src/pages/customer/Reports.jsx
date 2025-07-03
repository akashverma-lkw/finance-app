import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { motion } from "framer-motion";

const Reports = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const pieData = [
    { name: "Income", value: 50000 },
    { name: "Expenses", value: 32000 },
  ];

  const barData = [
    { month: "Jan", income: 40000, expenses: 28000 },
    { month: "Feb", income: 45000, expenses: 32000 },
    { month: "Mar", income: 50000, expenses: 36000 },
    { month: "Apr", income: 47000, expenses: 30000 },
    { month: "May", income: 52000, expenses: 35000 },
    { month: "Jun", income: 56000, expenses: 40000 },
  ];

  const COLORS = ["#16a34a", "#dc2626"]; // Green, Red

  return (
    <motion.div
      className="p-4 space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: fadeIn ? 1 : 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-blue-700">Finance Reports</h2>

      {/* Pie Chart Section */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white p-6 rounded-xl shadow border-l-4 border-green-500 transition cursor-pointer"
      >
        <h3 className="text-xl font-semibold mb-4">This Month: Income vs Expenses</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Bar Chart Section */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white p-6 rounded-xl shadow border-l-4 border-blue-500 transition cursor-pointer"
      >
        <h3 className="text-xl font-semibold mb-4">Monthly Income vs Expenses</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#16a34a" name="Income" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expenses" fill="#dc2626" name="Expenses" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Future Insights Placeholder */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="bg-yellow-50 border border-yellow-300 text-yellow-700 p-5 rounded-xl shadow-sm cursor-pointer"
      >
        📊 <strong>Coming Soon:</strong> Personalized financial insights, forecast graphs, and PDF export reports!
      </motion.div>
    </motion.div>
  );
};

export default Reports;
