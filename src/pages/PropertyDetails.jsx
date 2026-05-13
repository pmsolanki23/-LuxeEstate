import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  FaArrowLeft, FaBath, FaBed, FaMapMarkerAlt, FaRulerCombined,
  FaSwimmingPool, FaDumbbell, FaFilm, FaWineGlassAlt, FaHome,
  FaCar, FaShieldAlt, FaConciergeBell, FaWhatsapp, FaCheckCircle,
  FaCalendarAlt,
} from "react-icons/fa";
import { properties } from "../data/properties";
import { ThemeContext } from "../context/ThemeContext";
import MapSection from "../components/MapSection";
import PropertyCard from "../components/PropertyCard";
import Footer from "../components/Footer";
import { pageVariants } from "../utils/animations";

const AMENITY_ICONS = {
  "Swimming Pool": <FaSwimmingPool />,
  "Private Gym": <FaDumbbell />,
  "Home Cinema": <FaFilm />,
  "Wine Cellar": <FaWineGlassAlt />,
  "Smart Home": <FaHome />,
  "Concierge Service": <FaConciergeBell />,
  "Private Parking": <FaCar />,
  "Security System": <FaShieldAlt />,
};

const PropertyDetails = () => {
  const { id } = useParams();
  const { darkMode } = useContext(ThemeContext);
  const property = properties.find(p => p.id === Number(id));

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);

  const bg = darkMode ? "#0a0a0a" : "#F5F0E8";
  const cardBg = darkMode ? "#1a1a1a" : "#ffffff";
  const titleColor = darkMode ? "#ffffff" : "#1a1a1a";
  const textColor = darkMode ? "rgba(255,255,255,0.55)" : "rgba(26,26,26,0.6)";
  const borderColor = darkMode ? "rgba(255,255,255,0.08)" : "rgba(26,26,26,0.08)";
  const inputBg = darkMode ? "rgba(255,255,255,0.04)" : "rgba(26,26,26,0.04)";

  if (!property) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: bg, padding: 24 }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", color: titleColor, fontSize: 36, marginBottom: 16 }}>Property Not Found</h2>
        <p style={{ fontFamily: "'Poppins',sans-serif", color: textColor, marginBottom: 32, textAlign: "center" }}>
          The property you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "'Poppins',sans-serif", color: "#C9A84C", textDecoration: "none", fontSize: 12, textTransform: "uppercase", letterSpacing: 3 }}>
          <FaArrowLeft /> Back to Home
        </Link>
      </div>
    );
  }

  const similar = properties.filter(p => p.id !== property.id && p.type === property.type).slice(0, 3);
  const images = property.images?.length ? property.images : [property.image, property.image, property.image];

  const handleFormSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { setFormError("Please fill in all required fields."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setFormError("Please enter a valid email address."); return; }
    setFormError("");
    setFormSuccess(true);
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  const stats = [
    { icon: <FaBed />, label: "Bedrooms", value: property.beds },
    { icon: <FaBath />, label: "Bathrooms", value: property.baths },
    { icon: <FaRulerCombined />, label: "Square Feet", value: property.sqft?.toLocaleString() },
    { icon: <FaMapMarkerAlt />, label: "Location", value: property.location },
    { icon: <FaCalendarAlt />, label: "Year Built", value: property.yearBuilt },
    { icon: <FaCar />, label: "Garage", value: `${property.garage} Cars` },
  ];

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" style={{ background: bg, transition: "background 0.5s" }}>

      {/* ── Hero ── */}
      <section style={{ position: "relative", height: "80vh", minHeight: 500, overflow: "hidden" }}>
        <img src={property.image} alt={property.title} style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.45), rgba(0,0,0,0.15))" }} />

        <Link to="/" style={{ position: "absolute", top: 96, left: 40, zIndex: 10, display: "flex", alignItems: "center", gap: 8, fontFamily: "'Poppins',sans-serif", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 11, textTransform: "uppercase", letterSpacing: 3 }}>
          <FaArrowLeft /> Back to Properties
        </Link>

        <div style={{ position: "absolute", top: 96, right: 40, zIndex: 10, display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
          {property.status && <span className={property.status === "For Sale" ? "badge-sale" : "badge-rent"}>{property.status}</span>}
          {property.type && <span className={`badge-${property.type.toLowerCase()}`}>{property.type}</span>}
        </div>

        <div style={{ position: "absolute", bottom: 40, left: 40, zIndex: 10, maxWidth: 700 }}>
          <motion.p style={{ fontFamily: "'Poppins',sans-serif", color: "#C9A84C", fontSize: 11, letterSpacing: 6, textTransform: "uppercase", marginBottom: 8 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            {property.location}
          </motion.p>
          <motion.h1 style={{ fontFamily: "'Playfair Display',serif", color: "#fff", fontSize: "clamp(32px,5vw,60px)", fontWeight: 300, lineHeight: 1.1, marginBottom: 12 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            {property.title}
          </motion.h1>
          <motion.p style={{ fontFamily: "'Poppins',sans-serif", color: "#C9A84C", fontSize: 28, fontWeight: 600 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            {property.price}
          </motion.p>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section style={{ background: cardBg, borderBottom: `1px solid ${borderColor}`, transition: "background 0.5s" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 40px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 24 }}>
          {stats.map((stat, i) => (
            <motion.div key={stat.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <span style={{ color: "#C9A84C", fontSize: 20, marginBottom: 8 }}>{stat.icon}</span>
              <span style={{ fontFamily: "'Poppins',sans-serif", color: titleColor, fontWeight: 600, fontSize: 16, lineHeight: 1 }}>{stat.value}</span>
              <span style={{ fontFamily: "'Poppins',sans-serif", color: textColor, fontSize: 10, textTransform: "uppercase", letterSpacing: 2, marginTop: 4 }}>{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Description ── */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "64px 40px" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p style={{ fontFamily: "'Poppins',sans-serif", color: "#C9A84C", fontSize: 11, letterSpacing: 6, textTransform: "uppercase", marginBottom: 12 }}>Overview</p>
          <h2 style={{ fontFamily: "'Playfair Display',serif", color: titleColor, fontSize: "clamp(28px,3vw,40px)", fontWeight: 300, marginBottom: 16 }}>About This Property</h2>
          <div style={{ width: 48, height: 2, background: "#C9A84C", marginBottom: 24 }} />
          <p style={{ fontFamily: "'Poppins',sans-serif", color: textColor, fontSize: 15, lineHeight: 1.9 }}>{property.description}</p>
        </motion.div>
      </section>

      {/* ── Amenities ── */}
      {property.amenities?.length > 0 && (
        <section style={{ maxWidth: 900, margin: "0 auto", padding: "0 40px 64px" }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p style={{ fontFamily: "'Poppins',sans-serif", color: "#C9A84C", fontSize: 11, letterSpacing: 6, textTransform: "uppercase", marginBottom: 12 }}>Included</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", color: titleColor, fontSize: 30, fontWeight: 300, marginBottom: 24 }}>Amenities</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 12 }}>
              {property.amenities.map(amenity => (
                <div key={amenity} style={{ display: "flex", alignItems: "center", gap: 12, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 12, padding: "12px 16px", transition: "border-color 0.3s" }}>
                  <span style={{ color: "#C9A84C", fontSize: 15, flexShrink: 0 }}>{AMENITY_ICONS[amenity] || <FaHome />}</span>
                  <span style={{ fontFamily: "'Poppins',sans-serif", color: textColor, fontSize: 12 }}>{amenity}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* ── Gallery ── */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px 64px" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p style={{ fontFamily: "'Poppins',sans-serif", color: "#C9A84C", fontSize: 11, letterSpacing: 6, textTransform: "uppercase", marginBottom: 12, textAlign: "center" }}>Gallery</p>
          <h2 style={{ fontFamily: "'Playfair Display',serif", color: titleColor, fontSize: 30, fontWeight: 300, textAlign: "center", marginBottom: 32 }}>Property Images</h2>
          <Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable: true }} spaceBetween={16} slidesPerView={1} breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }} style={{ borderRadius: 16 }}>
            {images.map((img, i) => (
              <SwiperSlide key={i}>
                <img src={img} alt={`${property.title} ${i + 1}`} style={{ height: 320, width: "100%", objectFit: "cover", borderRadius: 16 }} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </section>

      {/* ── Map ── */}
      <MapSection properties={[property]} singleProperty={property} />

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .enquiry-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .featured-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── Enquiry Form ── */}
      <section style={{ background: cardBg, padding: "80px 40px", transition: "background 0.5s" }}>
        <div className="enquiry-grid" style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }}>
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p style={{ fontFamily: "'Poppins',sans-serif", color: "#C9A84C", fontSize: 11, letterSpacing: 6, textTransform: "uppercase", marginBottom: 12 }}>Get in Touch</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", color: titleColor, fontSize: "clamp(26px,3vw,38px)", fontWeight: 300, marginBottom: 16 }}>Enquire About This Property</h2>
            <div style={{ width: 48, height: 2, background: "#C9A84C", marginBottom: 20 }} />
            <p style={{ fontFamily: "'Poppins',sans-serif", color: textColor, fontSize: 14, lineHeight: 1.8, marginBottom: 32 }}>
              Interested in <strong style={{ color: titleColor }}>{property.title}</strong>? Fill in the form and one of our expert consultants will be in touch within 24 hours.
            </p>
            <a
              href={`https://wa.me/15550000000?text=Hi, I'm interested in ${encodeURIComponent(property.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#25D366", color: "#fff", fontFamily: "'Poppins',sans-serif", fontSize: 13, fontWeight: 600, padding: "12px 24px", borderRadius: 12, textDecoration: "none" }}
            >
              <FaWhatsapp style={{ fontSize: 18 }} /> Chat on WhatsApp
            </a>
          </motion.div>

          {/* Right — Form */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <AnimatePresence mode="wait">
              {formSuccess ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: "48px 0" }}>
                  <FaCheckCircle style={{ color: "#C9A84C", fontSize: 48 }} />
                  <h3 style={{ fontFamily: "'Playfair Display',serif", color: titleColor, fontSize: 24 }}>Enquiry Sent!</h3>
                  <p style={{ fontFamily: "'Poppins',sans-serif", color: textColor, fontSize: 13, textAlign: "center" }}>We'll be in touch within 24 hours.</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[
                    { name: "name", placeholder: "Your Full Name *", type: "text" },
                    { name: "email", placeholder: "Email Address *", type: "email" },
                    { name: "phone", placeholder: "Phone Number", type: "tel" },
                  ].map(({ name, placeholder, type }) => (
                    <input
                      key={name}
                      type={type}
                      placeholder={placeholder}
                      value={form[name]}
                      onChange={e => setForm({ ...form, [name]: e.target.value })}
                      aria-label={placeholder}
                      style={{
                        background: inputBg, border: `1px solid ${borderColor}`,
                        borderRadius: 12, padding: "14px 18px",
                        fontFamily: "'Poppins',sans-serif", color: titleColor, fontSize: 13, outline: "none",
                        transition: "border-color 0.3s",
                      }}
                    />
                  ))}
                  <textarea
                    placeholder="Your Message *"
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    aria-label="Your message"
                    style={{
                      background: inputBg, border: `1px solid ${borderColor}`,
                      borderRadius: 12, padding: "14px 18px",
                      fontFamily: "'Poppins',sans-serif", color: titleColor, fontSize: 13, outline: "none",
                      resize: "none", transition: "border-color 0.3s",
                    }}
                  />
                  {formError && <p style={{ fontFamily: "'Poppins',sans-serif", color: "#f87171", fontSize: 12 }}>{formError}</p>}
                  <button
                    type="submit"
                    style={{ background: "linear-gradient(135deg,#C9A84C,#E8C96A)", color: "#fff", border: "none", borderRadius: 12, padding: "14px", fontFamily: "'Poppins',sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                  >
                    Send Enquiry
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── Similar Properties ── */}
      {similar.length > 0 && (
        <section style={{ background: bg, padding: "64px 40px", transition: "background 0.5s" }}>
          <motion.div style={{ textAlign: "center", marginBottom: 40 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p style={{ fontFamily: "'Poppins',sans-serif", color: "#C9A84C", fontSize: 11, letterSpacing: 6, textTransform: "uppercase", marginBottom: 8 }}>You May Also Like</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", color: titleColor, fontSize: 30, fontWeight: 300 }}>Similar Properties</h2>
          </motion.div>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 24 }}>
            {similar.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
        </section>
      )}

      <Footer />
    </motion.div>
  );
};

export default PropertyDetails;
