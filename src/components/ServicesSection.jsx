import { motion } from "framer-motion";
import { FaHome, FaHandshake, FaChartLine } from "react-icons/fa";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const SERVICES = [
  {
    icon: <FaHome />,
    title: "Buy Property",
    description: "Access our exclusive portfolio of the world's finest properties. Our expert consultants guide you through every step — from initial search to final closing — ensuring a seamless acquisition.",
    link: "#properties",
  },
  {
    icon: <FaHandshake />,
    title: "Sell Property",
    description: "Achieve the best possible price for your luxury property. Our global network of qualified buyers, combined with bespoke marketing strategies, ensures maximum exposure and premium results.",
    link: "#contact",
  },
  {
    icon: <FaChartLine />,
    title: "Invest Smart",
    description: "Grow your wealth through strategic real estate investment. Our advisors identify high-yield opportunities in the world's most desirable markets, tailored to your portfolio goals.",
    link: "#contact",
  },
];

const ServicesSection = () => {
  const { darkMode } = useContext(ThemeContext);
  const bg = darkMode ? "#0a0a0a" : "#F5F0E8";
  const cardBg = darkMode ? "#1a1a1a" : "#ffffff";
  const titleColor = darkMode ? "#ffffff" : "#1a1a1a";
  const textColor = darkMode ? "rgba(255,255,255,0.5)" : "rgba(26,26,26,0.6)";
  const borderColor = darkMode ? "rgba(255,255,255,0.08)" : "rgba(26,26,26,0.08)";

  return (
    <section id="services" style={{ background: bg, padding: "80px 40px", transition: "background 0.5s" }}>
      {/* Header */}
      <motion.div
        style={{ textAlign: "center", marginBottom: 56 }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p style={{ fontFamily: "'Poppins',sans-serif", color: "#C9A84C", fontSize: 11, letterSpacing: 6, textTransform: "uppercase", marginBottom: 12 }}>
          What We Offer
        </p>
        <h2 style={{ fontFamily: "'Playfair Display',serif", color: titleColor, fontSize: "clamp(32px,4vw,48px)", fontWeight: 300 }}>
          Our Services
        </h2>
        <div className="section-divider" />
      </motion.div>

      {/* Cards */}
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
        {SERVICES.map(({ icon, title, description, link }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.6 }}
            whileHover={{ y: -8, borderColor: "rgba(201,168,76,0.5)" }}
            style={{
              background: cardBg, border: `1px solid ${borderColor}`,
              borderRadius: 20, padding: 36, cursor: "pointer",
              transition: "all 0.3s",
            }}
          >
            <div style={{
              width: 56, height: 56, borderRadius: 14,
              background: "linear-gradient(135deg,#C9A84C,#E8C96A)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: 22, marginBottom: 24,
            }}>
              {icon}
            </div>
            <h3 style={{ fontFamily: "'Playfair Display',serif", color: titleColor, fontSize: 22, marginBottom: 12 }}>{title}</h3>
            <p style={{ fontFamily: "'Poppins',sans-serif", color: textColor, fontSize: 13, lineHeight: 1.8, marginBottom: 24 }}>{description}</p>
            <a
              href={link}
              style={{ fontFamily: "'Poppins',sans-serif", color: "#C9A84C", fontSize: 11, textTransform: "uppercase", letterSpacing: 3, textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}
            >
              Learn More <span>→</span>
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
