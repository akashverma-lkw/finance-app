import React from "react";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import Features2 from "../components/Features2";
import Footer from "../components/Footer";
import Services from "../components/Services";
import Pricing from "../components/Pricing";
import Testimonials from "../components/Testimonials";
import ExploreMore from "../components/ExploreMore";
import ContactUs from '../components/ContactUs'
import FinancialToolsSection from "../components/FinancialToolsSection";
import IdealPlanQuiz from "../components/IdealPlanQuiz";
import TrustBadgesSection from "../components/TrustBadgesSection";
import FinanceMadeEasy from "../components/FinanceMadeEasy";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Features />
      <Features2 />
      <Services />
      <Pricing />
      <IdealPlanQuiz />
      <FinancialToolsSection />
      <FinanceMadeEasy />
      <ExploreMore />
      <Testimonials />
      <TrustBadgesSection />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Home;
