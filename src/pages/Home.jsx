import { useState } from "react";
import { motion } from "framer-motion";
import { pageVariants } from "../utils/animations";
import { properties } from "../data/properties";

import HeroSection from "../components/HeroSection";
import StatsSection from "../components/StatsSection";
import ServicesSection from "../components/ServicesSection";
import FeaturedSpotlight from "../components/FeaturedSpotlight";
import LuxuryGrid from "../components/LuxuryGrid";
import TestimonialsSection from "../components/TestimonialsSection";
import AgentsSection from "../components/AgentsSection";
import MapSection from "../components/MapSection";
import NewsletterSection from "../components/NewsletterSection";
import Footer from "../components/Footer";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("");

  const handleSearch = (query, type) => {
    setSearchQuery(query);
    setSearchType(type);
    // Scroll to properties grid
    setTimeout(() => {
      document.getElementById("properties-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const featuredProperty = properties.find(p => p.featured);

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <HeroSection onSearch={handleSearch} />
      <StatsSection />
      <ServicesSection />
      <FeaturedSpotlight property={featuredProperty} />
      <div id="properties-section">
        <LuxuryGrid properties={properties} searchQuery={searchQuery} searchType={searchType} />
      </div>
      <TestimonialsSection />
      <AgentsSection />
      <MapSection properties={properties} />
      <NewsletterSection />
      <Footer />
    </motion.div>
  );
};

export default Home;
