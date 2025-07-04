import React from "react";
import {
  ShieldCheck,
  Users,
  BarChart,
  PhoneCall,
  Star,
  Globe2
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <ShieldCheck size={42} strokeWidth={1.5} />,
    title: "Trusted Partners",
    desc: "We’ve partnered with top insurance companies for best deals.",
    subtext: "Our partnerships ensure reliability and coverage options tailored for you."
  },
  {
    icon: <Users size={42} strokeWidth={1.5} />,
    title: "Customer First",
    desc: "Your needs come first — always. Personalized recommendations.",
    subtext: "Our advisors analyze your needs to suggest what's truly best."
  },
  {
    icon: <BarChart size={42} strokeWidth={1.5} />,
    title: "Compare Policies",
    desc: "Get a side-by-side view of plans and choose smartly.",
    subtext: "Make informed decisions with detailed benefit breakdowns."
  },
  {
    icon: <PhoneCall size={42} strokeWidth={1.5} />,
    title: "24x7 Support",
    desc: "Dedicated experts to help you anytime, anywhere.",
    subtext: "Get support even on holidays. We're always just a call away."
  },
  {
    icon: <Star size={42} strokeWidth={1.5} />,
    title: "Rated 4.9★",
    desc: "Thousands of customers trust and rate us highly.",
    subtext: "Our track record speaks for itself — see what our clients say."
  },
  {
    icon: <Globe2 size={42} strokeWidth={1.5} />,
    title: "Pan India",
    desc: "Our services are available across all Indian cities.",
    subtext: "From metros to small towns, we’re here to help everywhere."
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.7,
      ease: "easeOut",
    },
  }),
};

const Features = () => {
  return (
    <section className="min-h-[90vh] py-12 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e0_1px,transparent_1px)] [background-size:16px_16px] opacity-30 z-0" />
      <div className="text-center mb-4 relative z-10">
        <span className="inline-block text-sm bg-purple-100 text-purple-700 px-4 py-1 rounded-full font-medium">
          Our Highlights
        </span>
      </div>
      <h2 className="text-3xl md:text-5xl font-bold text-center text-blue-900 relative z-10">
        Why Choose <span className="bg-gradient-to-r from-blue-800 to-indigo-600 bg-clip-text text-transparent font-semibold">FinSecure?</span>

      </h2>
      <p className="text-center mt-4 text-lg text-gray-600 max-w-2xl mx-auto relative z-10">
        We bring security, transparency, and ease to your financial decisions.
      </p>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 px-6 mt-20 max-w-7xl mx-auto relative z-10">
        {features.map((f, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
          >
            <div className="w-14 h-14 flex items-center justify-center mx-auto text-blue-600 mb-4">
              {f.icon}
            </div>
            <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">
              {f.title}
            </h3>
            <p className="text-gray-600 text-center">{f.desc}</p>
            <p className="text-sm text-gray-500 mt-3 text-center">{f.subtext}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 text-center relative z-10">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Still not sure?</h3>
        <p className="text-gray-600 mb-6">Talk to our insurance experts for a free consultation.</p>
        <button className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition">
          Talk to Expert
        </button>
      </div>
    </section>
  );
};

export default Features;
