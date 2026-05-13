import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaCheckCircle } from "react-icons/fa";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const validate = val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSubmit = e => {
    e.preventDefault();
    if (!validate(email)) { setError("Please enter a valid email address."); return; }
    setError("");
    setSuccess(true);
    setEmail("");
  };

  return (
    <section style={{ background: "#0a0a0a", padding: "80px 40px", position: "relative", overflow: "hidden" }}>
      {/* Glow */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 300, background: "radial-gradient(ellipse,rgba(201,168,76,0.06),transparent 70%)", pointerEvents: "none" }} />

      <motion.div
        style={{ position: "relative", zIndex: 1, maxWidth: 600, margin: "0 auto", textAlign: "center" }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        {/* Icon */}
        <div style={{ width: 64, height: 64, borderRadius: "50%", border: "1px solid rgba(201,168,76,0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "#C9A84C", fontSize: 22, margin: "0 auto 24px" }}>
          <FaEnvelope />
        </div>

        <p style={{ fontFamily: "'Poppins',sans-serif", color: "#C9A84C", fontSize: 11, letterSpacing: 6, textTransform: "uppercase", marginBottom: 12 }}>
          Stay Informed
        </p>
        <h2 style={{ fontFamily: "'Playfair Display',serif", color: "#fff", fontSize: "clamp(28px,4vw,44px)", fontWeight: 300, marginBottom: 16 }}>
          Stay Ahead of the Market
        </h2>
        <p style={{ fontFamily: "'Poppins',sans-serif", color: "rgba(255,255,255,0.45)", fontSize: 14, lineHeight: 1.7, marginBottom: 40 }}>
          Subscribe to receive exclusive property listings, market insights, and investment opportunities before they go public.
        </p>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <FaCheckCircle style={{ color: "#C9A84C", fontSize: 40 }} />
              <p style={{ fontFamily: "'Playfair Display',serif", color: "#fff", fontSize: 20 }}>Thank you! You're subscribed.</p>
              <p style={{ fontFamily: "'Poppins',sans-serif", color: "rgba(255,255,255,0.4)", fontSize: 13 }}>We'll be in touch with exclusive listings.</p>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(""); }}
                  placeholder="Enter your email address"
                  aria-label="Email address for newsletter"
                  style={{
                    flex: 1, minWidth: 200,
                    background: "rgba(255,255,255,0.05)",
                    border: error ? "1px solid rgba(239,68,68,0.5)" : "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 12, padding: "14px 20px",
                    fontFamily: "'Poppins',sans-serif", color: "#fff", fontSize: 13, outline: "none",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: "linear-gradient(135deg,#C9A84C,#E8C96A)", color: "#fff",
                    border: "none", borderRadius: 12, padding: "14px 28px",
                    fontFamily: "'Poppins',sans-serif", fontSize: 13, fontWeight: 600,
                    cursor: "pointer", whiteSpace: "nowrap",
                  }}
                >Subscribe</button>
              </div>
              {error && <p style={{ fontFamily: "'Poppins',sans-serif", color: "#f87171", fontSize: 12, textAlign: "left" }}>{error}</p>}
              <p style={{ fontFamily: "'Poppins',sans-serif", color: "rgba(255,255,255,0.2)", fontSize: 11 }}>
                No spam. Unsubscribe at any time.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default NewsletterSection;
