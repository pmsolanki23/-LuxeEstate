import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCheckCircle, FaWhatsapp } from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";
import Footer from "../components/Footer";
import { pageVariants } from "../utils/animations";

const ContactPage = () => {
  const { darkMode } = useContext(ThemeContext);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const bg = darkMode ? "#0a0a0a" : "#F5F0E8";
  const cardBg = darkMode ? "#1a1a1a" : "#ffffff";
  const titleColor = darkMode ? "#ffffff" : "#1a1a1a";
  const textColor = darkMode ? "rgba(255,255,255,0.5)" : "rgba(26,26,26,0.6)";
  const borderColor = darkMode ? "rgba(255,255,255,0.08)" : "rgba(26,26,26,0.1)";
  const inputBg = darkMode ? "rgba(255,255,255,0.04)" : "rgba(26,26,26,0.03)";

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { setError("Please fill in all required fields."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setError("Please enter a valid email address."); return; }
    setError("");
    setSuccess(true);
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const inputStyle = {
    width: "100%", background: inputBg, border: `1px solid ${borderColor}`,
    borderRadius: 12, padding: "14px 18px", boxSizing: "border-box",
    fontFamily: "'Poppins',sans-serif", color: titleColor, fontSize: 13, outline: "none",
    transition: "border-color 0.3s",
  };

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" style={{ background: bg, minHeight: "100vh", transition: "background 0.5s" }}>
      {/* Hero */}
      <div style={{ background: "#0a0a0a", padding: "120px 24px 60px", textAlign: "center" }}>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ fontFamily: "'Poppins',sans-serif", color: "#C9A84C", fontSize: 11, letterSpacing: 6, textTransform: "uppercase", marginBottom: 12 }}>
          Get in Touch
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          style={{ fontFamily: "'Playfair Display',serif", color: "#fff", fontSize: "clamp(32px,5vw,56px)", fontWeight: 300, marginBottom: 16 }}>
          Contact Us
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ fontFamily: "'Poppins',sans-serif", color: "rgba(255,255,255,0.45)", fontSize: 14, maxWidth: 500, margin: "0 auto" }}>
          Our team of luxury property specialists is ready to assist you.
        </motion.p>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 24px" }}>
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 48 }}>
          {/* Left — Info */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", color: titleColor, fontSize: 32, fontWeight: 300, marginBottom: 12 }}>Let's Talk</h2>
            <div style={{ width: 48, height: 2, background: "#C9A84C", marginBottom: 24 }} />
            <p style={{ fontFamily: "'Poppins',sans-serif", color: textColor, fontSize: 14, lineHeight: 1.8, marginBottom: 40 }}>
              Whether you're looking to buy, sell, or invest in luxury real estate, our expert team is here to guide you every step of the way.
            </p>

            {/* Contact details */}
            {[
              { icon: <FaPhone />, label: "Phone", value: "+1 (555) 000-0000", href: "tel:+15550000000" },
              { icon: <FaEnvelope />, label: "Email", value: "hello@luxeestate.com", href: "mailto:hello@luxeestate.com" },
              { icon: <FaMapMarkerAlt />, label: "Office", value: "432 Park Avenue, Suite 5000\nNew York, NY 10022", href: null },
            ].map(({ icon, label, value, href }) => (
              <div key={label} style={{ display: "flex", gap: 16, marginBottom: 28 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(201,168,76,0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "#C9A84C", fontSize: 16, flexShrink: 0 }}>
                  {icon}
                </div>
                <div>
                  <p style={{ fontFamily: "'Poppins',sans-serif", color: "rgba(201,168,76,0.7)", fontSize: 10, textTransform: "uppercase", letterSpacing: 3, marginBottom: 4 }}>{label}</p>
                  {href ? (
                    <a href={href} style={{ fontFamily: "'Poppins',sans-serif", color: titleColor, fontSize: 14, textDecoration: "none" }}>{value}</a>
                  ) : (
                    <p style={{ fontFamily: "'Poppins',sans-serif", color: titleColor, fontSize: 14, whiteSpace: "pre-line" }}>{value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* WhatsApp */}
            <a
              href="https://wa.me/15550000000"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#25D366", color: "#fff", fontFamily: "'Poppins',sans-serif", fontSize: 13, fontWeight: 600, padding: "12px 24px", borderRadius: 12, textDecoration: "none", marginTop: 8 }}
            >
              <FaWhatsapp style={{ fontSize: 18 }} /> Chat on WhatsApp
            </a>
          </motion.div>

          {/* Right — Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 20, padding: "40px 36px", transition: "background 0.5s" }}>
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "40px 0", textAlign: "center" }}>
                    <FaCheckCircle style={{ color: "#C9A84C", fontSize: 52 }} />
                    <h3 style={{ fontFamily: "'Playfair Display',serif", color: titleColor, fontSize: 26 }}>Message Sent!</h3>
                    <p style={{ fontFamily: "'Poppins',sans-serif", color: textColor, fontSize: 14 }}>We'll get back to you within 24 hours.</p>
                    <button onClick={() => setSuccess(false)} style={{ background: "none", border: "1px solid #C9A84C", color: "#C9A84C", fontFamily: "'Poppins',sans-serif", fontSize: 12, padding: "10px 24px", borderRadius: 10, cursor: "pointer", marginTop: 8 }}>
                      Send Another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <input type="text" placeholder="Full Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} aria-label="Full name" style={inputStyle} />
                      <input type="email" placeholder="Email Address *" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} aria-label="Email address" style={inputStyle} />
                    </div>
                    <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <input type="tel" placeholder="Phone Number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} aria-label="Phone number" style={inputStyle} />
                      <input type="text" placeholder="Subject" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} aria-label="Subject" style={inputStyle} />
                    </div>
                    <textarea
                      placeholder="Your Message *"
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      rows={5}
                      aria-label="Your message"
                      style={{ ...inputStyle, resize: "none" }}
                    />
                    {error && <p style={{ fontFamily: "'Poppins',sans-serif", color: "#f87171", fontSize: 12 }}>{error}</p>}
                    <button type="submit" style={{ background: "linear-gradient(135deg,#C9A84C,#E8C96A)", color: "#fff", border: "none", borderRadius: 12, padding: "15px", fontFamily: "'Poppins',sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer", letterSpacing: 1 }}>
                      Send Message
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Footer />
    </motion.div>
  );
};

export default ContactPage;
