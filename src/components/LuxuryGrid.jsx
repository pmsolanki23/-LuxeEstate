import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import PropertyCard from "./PropertyCard";

const FILTERS = ["All", "Featured", "Villa", "Penthouse", "Estate", "Apartment"];

const LuxuryGrid = ({ properties = [], searchQuery = "", searchType = "" }) => {
  const { darkMode } = useContext(ThemeContext);
  const [filter, setFilter] = useState("All");

  const filtered = properties.filter(p => {
    if (filter === "Featured" && !p.featured) return false;
    if (!["All", "Featured"].includes(filter) && p.type !== filter) return false;
    if (searchType && p.type !== searchType) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!p.title.toLowerCase().includes(q) && !p.location.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const bg = darkMode ? "#0a0a0a" : "#F5F0E8";
  const titleColor = darkMode ? "#ffffff" : "#1a1a1a";
  const tabActive = { background: "#C9A84C", color: "#fff", border: "1px solid #C9A84C" };
  const tabInactive = (dm) => ({ background: "none", color: dm ? "rgba(255,255,255,0.5)" : "rgba(26,26,26,0.5)", border: dm ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(26,26,26,0.15)" });

  return (
    <section id="properties" style={{ background: bg, padding: "80px 40px", transition: "background 0.5s" }}>
      {/* Header */}
      <motion.div
        style={{ textAlign: "center", marginBottom: 48 }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p style={{ fontFamily: "'Poppins',sans-serif", color: "#C9A84C", fontSize: 11, letterSpacing: 6, textTransform: "uppercase", marginBottom: 12 }}>
          Curated Collection
        </p>
        <h2 style={{ fontFamily: "'Playfair Display',serif", color: titleColor, fontSize: "clamp(32px,4vw,48px)", fontWeight: 300 }}>
          Our Properties
        </h2>
        <div className="section-divider" />
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginBottom: 40, alignItems: "center" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {FILTERS.map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            style={{
              fontFamily: "'Poppins',sans-serif", fontSize: 11,
              textTransform: "uppercase", letterSpacing: 2,
              padding: "8px 20px", borderRadius: 9999, cursor: "pointer",
              transition: "all 0.3s",
              ...(filter === tab ? tabActive : tabInactive(darkMode)),
            }}
          >{tab}</button>
        ))}
        <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: 11, color: darkMode ? "rgba(255,255,255,0.25)" : "rgba(26,26,26,0.3)", marginLeft: 8 }}>
          {filtered.length} {filtered.length === 1 ? "property" : "properties"}
        </span>
      </motion.div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{ fontFamily: "'Playfair Display',serif", color: darkMode ? "rgba(255,255,255,0.25)" : "rgba(26,26,26,0.3)", fontSize: 24, marginBottom: 8 }}>No properties found</p>
            <p style={{ fontFamily: "'Poppins',sans-serif", color: darkMode ? "rgba(255,255,255,0.2)" : "rgba(26,26,26,0.25)", fontSize: 13 }}>Try adjusting your search or filter</p>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 24 }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {filtered.map(p => <PropertyCard key={p.id} property={p} />)}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LuxuryGrid;
