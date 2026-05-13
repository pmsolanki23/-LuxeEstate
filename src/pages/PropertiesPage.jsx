import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";
import { properties } from "../data/properties";
import PropertyCard from "../components/PropertyCard";
import Footer from "../components/Footer";
import { pageVariants } from "../utils/animations";

const FILTERS = ["All", "Featured", "Villa", "Penthouse", "Estate", "Apartment"];
const STATUSES = ["All Status", "For Sale", "For Rent"];

const PropertiesPage = () => {
  const { darkMode } = useContext(ThemeContext);
  const [filter, setFilter] = useState("All");
  const [status, setStatus] = useState("All Status");
  const [search, setSearch] = useState("");

  const bg = darkMode ? "#0a0a0a" : "#F5F0E8";
  const cardBg = darkMode ? "#1a1a1a" : "#ffffff";
  const titleColor = darkMode ? "#ffffff" : "#1a1a1a";
  const textColor = darkMode ? "rgba(255,255,255,0.5)" : "rgba(26,26,26,0.55)";
  const borderColor = darkMode ? "rgba(255,255,255,0.08)" : "rgba(26,26,26,0.1)";
  const inputBg = darkMode ? "rgba(255,255,255,0.05)" : "rgba(26,26,26,0.04)";

  const filtered = properties.filter(p => {
    if (filter === "Featured" && !p.featured) return false;
    if (!["All", "Featured"].includes(filter) && p.type !== filter) return false;
    if (status !== "All Status" && p.status !== status) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!p.title.toLowerCase().includes(q) && !p.location.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" style={{ background: bg, minHeight: "100vh", transition: "background 0.5s" }}>
      {/* Page Hero */}
      <div style={{ background: "#0a0a0a", padding: "120px 24px 60px", textAlign: "center" }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ fontFamily: "'Poppins',sans-serif", color: "#C9A84C", fontSize: 11, letterSpacing: 6, textTransform: "uppercase", marginBottom: 12 }}
        >Our Portfolio</motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          style={{ fontFamily: "'Playfair Display',serif", color: "#fff", fontSize: "clamp(32px,5vw,56px)", fontWeight: 300, marginBottom: 16 }}
        >All Properties</motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ fontFamily: "'Poppins',sans-serif", color: "rgba(255,255,255,0.45)", fontSize: 14, maxWidth: 500, margin: "0 auto" }}
        >Browse our curated collection of the world's finest luxury properties.</motion.p>
      </div>

      {/* Filters */}
      <div style={{ background: cardBg, borderBottom: `1px solid ${borderColor}`, padding: "24px", position: "sticky", top: 70, zIndex: 30, transition: "background 0.5s" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
          {/* Search */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, background: inputBg, border: `1px solid ${borderColor}`, borderRadius: 10, padding: "10px 16px", flex: "1 1 220px", maxWidth: 320 }}>
            <FaSearch style={{ color: "#C9A84C", fontSize: 13, flexShrink: 0 }} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search location or name..."
              aria-label="Search properties"
              style={{ background: "none", border: "none", outline: "none", fontFamily: "'Poppins',sans-serif", color: titleColor, fontSize: 13, width: "100%" }}
            />
          </div>

          {/* Type tabs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                fontFamily: "'Poppins',sans-serif", fontSize: 11, textTransform: "uppercase", letterSpacing: 2,
                padding: "8px 16px", borderRadius: 9999, cursor: "pointer", transition: "all 0.3s",
                background: filter === f ? "#C9A84C" : "none",
                color: filter === f ? "#fff" : textColor,
                border: filter === f ? "1px solid #C9A84C" : `1px solid ${borderColor}`,
              }}>{f}</button>
            ))}
          </div>

          {/* Status */}
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            aria-label="Filter by status"
            style={{
              background: inputBg, border: `1px solid ${borderColor}`, borderRadius: 10,
              padding: "10px 16px", fontFamily: "'Poppins',sans-serif", color: titleColor,
              fontSize: 12, outline: "none", cursor: "pointer",
            }}
          >
            {STATUSES.map(s => <option key={s} value={s} style={{ background: darkMode ? "#1a1a1a" : "#fff" }}>{s}</option>)}
          </select>

          <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 12, color: textColor }}>
            <span style={{ color: "#C9A84C", fontWeight: 600 }}>{filtered.length}</span> properties
          </span>
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 24px" }}>
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ textAlign: "center", padding: "80px 0" }}>
              <p style={{ fontFamily: "'Playfair Display',serif", color: textColor, fontSize: 24, marginBottom: 8 }}>No properties found</p>
              <p style={{ fontFamily: "'Poppins',sans-serif", color: textColor, fontSize: 13 }}>Try adjusting your filters</p>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            >
              {filtered.map(p => <PropertyCard key={p.id} property={p} />)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </motion.div>
  );
};

export default PropertiesPage;
