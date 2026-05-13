import { motion } from "framer-motion";
import { useContext } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const goldIcon = L.divIcon({
  className: "",
  html: `<svg width="28" height="42" viewBox="0 0 28 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 0C6.27 0 0 6.27 0 14c0 10.5 14 28 14 28s14-17.5 14-28C28 6.27 21.73 0 14 0z" fill="#C9A84C"/>
    <circle cx="14" cy="14" r="6" fill="white"/>
    <circle cx="14" cy="14" r="3" fill="#C9A84C"/>
  </svg>`,
  iconSize: [28, 42],
  iconAnchor: [14, 42],
  popupAnchor: [0, -42],
});

const MapSection = ({ properties = [], singleProperty = null }) => {
  const { darkMode } = useContext(ThemeContext);
  const center = singleProperty ? [singleProperty.lat, singleProperty.lng] : [20, 0];
  const zoom = singleProperty ? 14 : 2;
  const markers = (singleProperty ? [singleProperty] : properties).filter(p => p.lat != null && p.lng != null);

  const bg = darkMode ? "#111111" : "#F5F0E8";
  const titleColor = darkMode ? "#ffffff" : "#1a1a1a";

  return (
    <section id="map" style={{ background: bg, padding: "80px 40px", transition: "background 0.5s" }}>
      {!singleProperty && (
        <motion.div
          style={{ textAlign: "center", marginBottom: 48 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p style={{ fontFamily: "'Poppins',sans-serif", color: "#C9A84C", fontSize: 11, letterSpacing: 6, textTransform: "uppercase", marginBottom: 12 }}>
            Global Portfolio
          </p>
          <h2 style={{ fontFamily: "'Playfair Display',serif", color: titleColor, fontSize: "clamp(32px,4vw,48px)", fontWeight: 300 }}>
            Explore Locations
          </h2>
          <div className="section-divider" />
        </motion.div>
      )}

      <motion.div
        style={{ maxWidth: 1280, margin: "0 auto" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {!singleProperty && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontFamily: "'Poppins',sans-serif", color: darkMode ? "rgba(255,255,255,0.4)" : "rgba(26,26,26,0.5)", fontSize: 13 }}>
              Showing <span style={{ color: "#C9A84C", fontWeight: 600 }}>{markers.length}</span> properties worldwide
            </span>
            <span style={{ fontFamily: "'Poppins',sans-serif", color: darkMode ? "rgba(255,255,255,0.25)" : "rgba(26,26,26,0.35)", fontSize: 11 }}>
              Click a marker to view details
            </span>
          </div>
        )}

        <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.15)", border: darkMode ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(26,26,26,0.08)" }}>
          <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} style={{ height: 500, width: "100%", zIndex: 0 }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
            {markers.map(p => (
              <Marker key={p.id} position={[p.lat, p.lng]} icon={goldIcon}>
                <Popup>
                  <div style={{ minWidth: 200, padding: 4 }}>
                    <img src={p.image} alt={p.title} style={{ width: "100%", height: 96, objectFit: "cover", borderRadius: 8, marginBottom: 10 }} onError={e => { e.currentTarget.style.display = "none"; }} />
                    <p style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, color: "#1a1a1a", fontSize: 14, marginBottom: 2 }}>{p.title}</p>
                    <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: 11, color: "#666", marginBottom: 6 }}>{p.location}</p>
                    <p style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 600, color: "#C9A84C", fontSize: 14, marginBottom: 10 }}>{p.price}</p>
                    <Link to={`/property/${p.id}`} style={{ display: "inline-block", background: "linear-gradient(135deg,#C9A84C,#E8C96A)", color: "#fff", fontFamily: "'Poppins',sans-serif", fontSize: 11, fontWeight: 600, padding: "6px 14px", borderRadius: 8, textDecoration: "none" }}>
                      View Details →
                    </Link>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </motion.div>
    </section>
  );
};

export default MapSection;
