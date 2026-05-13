import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const FeaturedSpotlight = ({ property }) => {
  const { darkMode } = useContext(ThemeContext);
  if (!property) return null;

  const sectionBg = darkMode ? "#111111" : "#ffffff";
  const titleColor = darkMode ? "#ffffff" : "#1a1a1a";
  const textColor = darkMode ? "rgba(255,255,255,0.55)" : "rgba(26,26,26,0.6)";

  return (
    <section style={{ background: sectionBg, padding: "80px 40px", overflow: "hidden", transition: "background 0.5s" }}>
      {/* Header */}
      <motion.div
        style={{ textAlign: "center", marginBottom: 56 }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p style={{ fontFamily: "'Poppins',sans-serif", color: "#C9A84C", fontSize: 11, letterSpacing: 6, textTransform: "uppercase", marginBottom: 12 }}>
          Spotlight
        </p>
        <h2 style={{ fontFamily: "'Playfair Display',serif", color: titleColor, fontSize: "clamp(32px,4vw,48px)", fontWeight: 300 }}>
          Featured Property
        </h2>
        <div className="section-divider" />
      </motion.div>

      {/* Two-column */}
      <div className="featured-grid" style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, borderRadius: 24, overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.25)" }}>
        {/* Image */}
        <motion.div
          style={{ position: "relative", minHeight: 500, overflow: "hidden" }}
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <img
            src={property.image}
            alt={property.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          />
          <div style={{ position: "absolute", top: 24, left: 24, display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ background: "linear-gradient(135deg,#C9A84C,#E8C96A)", color: "#fff", fontFamily: "'Poppins',sans-serif", fontSize: 11, fontWeight: 600, padding: "6px 16px", borderRadius: 9999, textTransform: "uppercase", letterSpacing: 2 }}>
              Featured
            </span>
            <span style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", color: "#fff", fontFamily: "'Poppins',sans-serif", fontSize: 11, padding: "6px 16px", borderRadius: 9999 }}>
              {property.type}
            </span>
          </div>
          <div style={{ position: "absolute", bottom: 24, left: 24, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(12px)", borderRadius: 12, padding: "12px 20px" }}>
            <p style={{ fontFamily: "'Poppins',sans-serif", color: "rgba(255,255,255,0.5)", fontSize: 10, textTransform: "uppercase", letterSpacing: 3, marginBottom: 4 }}>Price</p>
            <p style={{ fontFamily: "'Playfair Display',serif", color: "#C9A84C", fontSize: 26, fontWeight: 500 }}>{property.price}</p>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          style={{ background: "#0a0a0a", padding: "56px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "'Poppins',sans-serif", color: "#C9A84C", fontSize: 11, letterSpacing: 4, textTransform: "uppercase", marginBottom: 16 }}>
            <FaMapMarkerAlt /> {property.location}
          </p>
          <h3 style={{ fontFamily: "'Playfair Display',serif", color: "#fff", fontSize: "clamp(28px,3vw,44px)", fontWeight: 300, lineHeight: 1.2, marginBottom: 20 }}>
            {property.title}
          </h3>
          <div style={{ width: 48, height: 2, background: "#C9A84C", marginBottom: 20 }} />
          <p style={{ fontFamily: "'Poppins',sans-serif", color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.8, marginBottom: 32 }}>
            {property.description.slice(0, 180)}...
          </p>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 32, paddingBottom: 32, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            {[
              { icon: <FaBed />, value: property.beds, label: "Bedrooms" },
              { icon: <FaBath />, value: property.baths, label: "Bathrooms" },
              { icon: <FaRulerCombined />, value: property.sqft?.toLocaleString(), label: "Sq Ft" },
            ].map(({ icon, value, label }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <span style={{ color: "#C9A84C", fontSize: 18, display: "block", marginBottom: 6 }}>{icon}</span>
                <p style={{ fontFamily: "'Playfair Display',serif", color: "#fff", fontSize: 20 }}>{value}</p>
                <p style={{ fontFamily: "'Poppins',sans-serif", color: "rgba(255,255,255,0.35)", fontSize: 10, textTransform: "uppercase", letterSpacing: 2, marginTop: 2 }}>{label}</p>
              </div>
            ))}
          </div>

          <Link
            to={`/property/${property.id}`}
            style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              background: "linear-gradient(135deg,#C9A84C,#E8C96A)", color: "#fff",
              fontFamily: "'Poppins',sans-serif", fontSize: 13, fontWeight: 600,
              padding: "14px 28px", borderRadius: 12, textDecoration: "none",
              alignSelf: "flex-start",
            }}
          >
            View Property <FaArrowRight />
          </Link>
        </motion.div>
      </div>
      {/* Responsive */}
      <style>{`
        @media (max-width: 900px) {
          .featured-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default FeaturedSpotlight;
