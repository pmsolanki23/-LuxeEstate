import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaSearch, FaHome, FaUsers, FaTrophy, FaStar } from "react-icons/fa";

const PROPERTY_TYPES = ["All Types", "Villa", "Penthouse", "Estate", "Apartment"];

const STATS = [
  { icon: <FaHome />, value: "500+", label: "Properties" },
  { icon: <FaUsers />, value: "200+", label: "Happy Clients" },
  { icon: <FaStar />, value: "15+", label: "Years Experience" },
  { icon: <FaTrophy />, value: "50+", label: "Awards Won" },
];

const HeroSection = ({ onSearch }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 240]);
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("All Types");

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(keyword, type === "All Types" ? "" : type);
    document.getElementById("properties")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section style={{ position: "relative", height: "100vh", minHeight: 700, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {/* Parallax BG */}
      <motion.div style={{ position: "absolute", inset: 0, y }}>
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury property"
          style={{ width: "100%", height: "120%", objectFit: "cover" }}
        />
      </motion.div>

      {/* Overlay */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.45), rgba(0,0,0,0.8))" }} />

      {/* Content */}
      <motion.div
        style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, textAlign: "center", padding: "80px 24px 24px" }}
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
      >
        {/* Eyebrow */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
          style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}
        >
          <div style={{ width: 32, height: 1, background: "#C9A84C" }} />
          <span style={{ fontFamily: "'Poppins',sans-serif", color: "#C9A84C", fontSize: 11, letterSpacing: 6, textTransform: "uppercase" }}>
            Premium Real Estate
          </span>
          <div style={{ width: 32, height: 1, background: "#C9A84C" }} />
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
          style={{
            fontFamily: "'Playfair Display',serif", color: "#fff",
            fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 300,
            lineHeight: 1.1, maxWidth: 900, marginBottom: 16,
          }}
        >
          Find Your Perfect{" "}
          <span style={{ fontStyle: "italic", color: "#C9A84C" }}>Luxury</span>{" "}
          Property
        </motion.h1>

        {/* Sub */}
        <motion.p
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
          style={{ fontFamily: "'Poppins',sans-serif", color: "rgba(255,255,255,0.55)", fontSize: 15, maxWidth: 520, marginBottom: 40, lineHeight: 1.7 }}
        >
          Discover an exclusive collection of the world's finest properties — from Amalfi Coast villas to Manhattan penthouses.
        </motion.p>

        {/* Search Bar */}
        <motion.form
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
          onSubmit={handleSearch}
          className="hero-search-form"
          style={{
            width: "100%", maxWidth: 760,
            background: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.15)", borderRadius: 16,
            padding: 8, display: "flex", flexWrap: "wrap", gap: 8,
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          }}
        >
          {/* Input */}
          <div style={{ flex: 1, minWidth: 200, display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.08)", borderRadius: 10, padding: "12px 16px" }}>
            <FaSearch style={{ color: "#C9A84C", fontSize: 13, flexShrink: 0 }} />
            <input
              type="text"
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              placeholder="Search by location or name..."
              aria-label="Search properties"
              style={{ background: "none", border: "none", outline: "none", color: "#fff", fontFamily: "'Poppins',sans-serif", fontSize: 13, width: "100%" }}
            />
          </div>

          {/* Type */}
          <select
            value={type}
            onChange={e => setType(e.target.value)}
            aria-label="Property type"
            style={{
              background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 10, padding: "12px 16px", color: "#fff",
              fontFamily: "'Poppins',sans-serif", fontSize: 13, outline: "none", cursor: "pointer", minWidth: 140,
            }}
          >
            {PROPERTY_TYPES.map(t => (
              <option key={t} value={t} style={{ background: "#1a1a1a", color: "#fff" }}>{t}</option>
            ))}
          </select>

          {/* Button */}
          <button
            type="submit"
            style={{
              background: "linear-gradient(135deg,#C9A84C,#E8C96A)", color: "#fff",
              border: "none", borderRadius: 10, padding: "12px 32px",
              fontFamily: "'Poppins',sans-serif", fontSize: 13, fontWeight: 600,
              letterSpacing: 1, cursor: "pointer", whiteSpace: "nowrap",
            }}
          >
            Search
          </button>
        </motion.form>

        {/* Quick tags */}
        <motion.div
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5, delay: 0.2 } } }}
          style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginTop: 16 }}
        >
          {["Amalfi Coast", "Manhattan", "Dubai", "Santorini"].map(tag => (
            <button
              key={tag}
              type="button"
              onClick={() => { setKeyword(tag); if (onSearch) onSearch(tag, ""); document.getElementById("properties")?.scrollIntoView({ behavior: "smooth" }); }}
              style={{
                background: "none", border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 9999, padding: "4px 14px",
                fontFamily: "'Poppins',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.45)",
                cursor: "pointer", transition: "all 0.3s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)"; e.currentTarget.style.color = "#C9A84C"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
            >{tag}</button>
          ))}
        </motion.div>
      </motion.div>

      {/* Stats Strip */}
      <motion.div
        style={{ position: "relative", zIndex: 10, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.08)" }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 40px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}
          className="grid-cols-2 md:grid-cols-4">
          {STATS.map(({ icon, value, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center" }}>
              <span style={{ color: "#C9A84C", fontSize: 18 }}>{icon}</span>
              <div>
                <p style={{ fontFamily: "'Playfair Display',serif", color: "#fff", fontSize: 22, fontWeight: 500, lineHeight: 1 }}>{value}</p>
                <p style={{ fontFamily: "'Poppins',sans-serif", color: "rgba(255,255,255,0.45)", fontSize: 11, marginTop: 2 }}>{label}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
