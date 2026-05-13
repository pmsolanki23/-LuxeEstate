import { useContext } from "react";
import { motion } from "framer-motion";
import { FaHome, FaHandshake, FaChartLine, FaKey, FaBuilding, FaGlobe } from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";
import Footer from "../components/Footer";
import { pageVariants } from "../utils/animations";

const SERVICES = [
  { icon: <FaHome />, title: "Buy Property", desc: "Access our exclusive portfolio of the world's finest properties. Our expert consultants guide you through every step — from initial search to final closing — ensuring a seamless acquisition experience." },
  { icon: <FaHandshake />, title: "Sell Property", desc: "Achieve the best possible price for your luxury property. Our global network of qualified buyers, combined with bespoke marketing strategies, ensures maximum exposure and premium results." },
  { icon: <FaChartLine />, title: "Invest Smart", desc: "Grow your wealth through strategic real estate investment. Our advisors identify high-yield opportunities in the world's most desirable markets, tailored to your portfolio goals." },
  { icon: <FaKey />, title: "Property Management", desc: "Let us manage your luxury property with the same care and attention you would. From tenant sourcing to maintenance, we handle everything so you don't have to." },
  { icon: <FaBuilding />, title: "Development Consulting", desc: "Planning a luxury development? Our team provides end-to-end consulting — from site acquisition and planning to interior design and marketing strategy." },
  { icon: <FaGlobe />, title: "International Relocation", desc: "Moving abroad? We specialise in international property acquisition and relocation services, helping you find your perfect home in any of our global markets." },
];

const ServicesPage = () => {
  const { darkMode } = useContext(ThemeContext);
  const bg = darkMode ? "#0a0a0a" : "#F5F0E8";
  const cardBg = darkMode ? "#1a1a1a" : "#ffffff";
  const titleColor = darkMode ? "#ffffff" : "#1a1a1a";
  const textColor = darkMode ? "rgba(255,255,255,0.5)" : "rgba(26,26,26,0.6)";
  const borderColor = darkMode ? "rgba(255,255,255,0.08)" : "rgba(26,26,26,0.08)";

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" style={{ background: bg, minHeight: "100vh", transition: "background 0.5s" }}>
      {/* Hero */}
      <div style={{ background: "#0a0a0a", padding: "120px 24px 60px", textAlign: "center" }}>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ fontFamily: "'Poppins',sans-serif", color: "#C9A84C", fontSize: 11, letterSpacing: 6, textTransform: "uppercase", marginBottom: 12 }}>
          What We Offer
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          style={{ fontFamily: "'Playfair Display',serif", color: "#fff", fontSize: "clamp(32px,5vw,56px)", fontWeight: 300, marginBottom: 16 }}>
          Our Services
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ fontFamily: "'Poppins',sans-serif", color: "rgba(255,255,255,0.45)", fontSize: 14, maxWidth: 500, margin: "0 auto" }}>
          Comprehensive luxury real estate services tailored to your unique needs.
        </motion.p>
      </div>

      {/* Services Grid */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
          {SERVICES.map(({ icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
              style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 20, padding: 36, transition: "all 0.3s" }}
            >
              <div style={{ width: 56, height: 56, borderRadius: 14, background: "linear-gradient(135deg,#C9A84C,#E8C96A)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 22, marginBottom: 24 }}>
                {icon}
              </div>
              <h3 style={{ fontFamily: "'Playfair Display',serif", color: titleColor, fontSize: 22, marginBottom: 12 }}>{title}</h3>
              <p style={{ fontFamily: "'Poppins',sans-serif", color: textColor, fontSize: 13, lineHeight: 1.8 }}>{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "#0a0a0a", padding: "80px 24px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", color: "#fff", fontSize: "clamp(28px,4vw,44px)", fontWeight: 300, marginBottom: 16 }}>
          Ready to Get Started?
        </h2>
        <p style={{ fontFamily: "'Poppins',sans-serif", color: "rgba(255,255,255,0.45)", fontSize: 14, marginBottom: 32, maxWidth: 400, margin: "0 auto 32px" }}>
          Contact our team today and let us help you find your perfect luxury property.
        </p>
        <a href="/contact" style={{ display: "inline-block", background: "linear-gradient(135deg,#C9A84C,#E8C96A)", color: "#fff", fontFamily: "'Poppins',sans-serif", fontSize: 12, fontWeight: 600, padding: "14px 36px", borderRadius: 12, textDecoration: "none", letterSpacing: 2, textTransform: "uppercase" }}>
          Contact Us
        </a>
      </div>

      <Footer />
    </motion.div>
  );
};

export default ServicesPage;
