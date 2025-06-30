import React from "react";
import { ShieldCheck, BookOpen, HelpCircle } from "lucide-react";

const ExploreMore = () => {
  const sections = [
    {
      icon: <HelpCircle className="w-8 h-8 text-blue-600" />,
      title: "FAQs",
      description: "Common questions related to accounts, security, fees, and more to help you quickly get the answers you need."
    },
    {
      icon: <BookOpen className="w-8 h-8 text-green-600" />,
      title: "Blog / Financial Education",
      description: "Explore articles on saving, investing, taxes, and personal finance tips. Stay updated with the latest trends."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-purple-600" />,
      title: "Security & Compliance",
      description: "Learn how we protect your data with encryption, 2FA, GDPR, PCI-DSS compliance, and fraud prevention systems."
    }
  ];

  return (
    <section className="bg-white py-20 px-6" id="explore">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Explore More</h2>
        <p className="text-gray-600 mb-12">
          Everything you need to know about staying secure, informed, and financially smart.
        </p>

        <div className="grid md:grid-cols-3 gap-10 text-left">
          {sections.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition  cursor-pointer"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreMore;
