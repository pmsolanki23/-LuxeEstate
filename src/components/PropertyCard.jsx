import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBath, FaBed, FaMapMarkerAlt, FaRulerCombined } from "react-icons/fa";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const FALLBACK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%23C9A84C'/%3E%3Cstop offset='1' stop-color='%230a0a0a'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='300' fill='url(%23g)'/%3E%3C/svg%3E";

const TYPE_CLASS = { Villa: "badge-villa", Penthouse: "badge-penthouse", Estate: "badge-estate", Apartment: "badge-apartment" };
const STATUS_CLASS = { "For Sale": "badge-sale", "For Rent": "badge-rent" };

const PropertyCard = ({ property }) => {
  const { darkMode } = useContext(ThemeContext);
  const { id, title, type, status, price, location, image, beds, baths, sqft, featured } = property;

  const cardBg = darkMode ? "#1a1a1a" : "#ffffff";
  const titleColor = darkMode ? "#ffffff" : "#1a1a1a";
  const textColor = darkMode ? "rgba(255,255,255,0.45)" : "rgba(26,26,26,0.5)";
  const borderColor = darkMode ? "rgba(255,255,255,0.06)" : "rgba(26,26,26,0.08)";
  const dividerColor = darkMode ? "rgba(255,255,255,0.08)" : "rgba(26,26,26,0.08)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
      whileHover={{ y: -10, boxShadow: "0 30px 60px rgba(0,0,0,0.25)" }}
      transition={{ duration: 0.3 }}
      style={{
        background: cardBg, borderRadius: 20,
        border: `1px solid ${borderColor}`,
        overflow: "hidden", cursor: "pointer",
        transition: "background 0.5s, border-color 0.3s",
      }}
    >
      <Link to={`/property/${id}`} style={{ textDecoration: "none", display: "block" }}>
        {/* Image */}
        <div style={{ position: "relative", height: 240, overflow: "hidden" }} className="group">
          <img
            src={image}
            alt={title}
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s" }}
            className="group-hover:scale-110"
            onError={e => { e.currentTarget.src = FALLBACK; }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }} />

          {/* Status — top left */}
          {status && <span className={STATUS_CLASS[status] || "badge-sale"} style={{ position: "absolute", top: 12, left: 12 }}>{status}</span>}

          {/* Type — top right */}
          {type && <span className={TYPE_CLASS[type] || "badge-villa"} style={{ position: "absolute", top: 12, right: 12 }}>{type}</span>}

          {/* Featured */}
          {featured && (
            <span style={{
              position: "absolute", bottom: 12, right: 12,
              background: "linear-gradient(135deg,#C9A84C,#E8C96A)", color: "#fff",
              fontFamily: "'Poppins',sans-serif", fontSize: 10, fontWeight: 600,
              padding: "3px 10px", borderRadius: 9999,
            }}>★ Featured</span>
          )}
        </div>

        {/* Body */}
        <div style={{ padding: "20px 20px 16px" }}>
          <h3 style={{ fontFamily: "'Playfair Display',serif", color: titleColor, fontSize: 17, fontWeight: 500, marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {title}
          </h3>
          <p style={{ fontFamily: "'Poppins',sans-serif", color: "#C9A84C", fontWeight: 600, fontSize: 15, marginBottom: 8 }}>{price}</p>
          <p style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "'Poppins',sans-serif", color: textColor, fontSize: 12, marginBottom: 16 }}>
            <FaMapMarkerAlt style={{ color: "#C9A84C", flexShrink: 0 }} /> {location}
          </p>

          {/* Divider */}
          <div style={{ borderTop: `1px solid ${dividerColor}`, paddingTop: 14, display: "flex", justifyContent: "space-between" }}>
            {[
              { icon: <FaBed />, val: `${beds} Beds` },
              { icon: <FaBath />, val: `${baths} Baths` },
              { icon: <FaRulerCombined />, val: `${sqft?.toLocaleString()} ft²` },
            ].map(({ icon, val }) => (
              <span key={val} style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "'Poppins',sans-serif", color: textColor, fontSize: 11 }}>
                <span style={{ color: "#C9A84C" }}>{icon}</span> {val}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PropertyCard;
