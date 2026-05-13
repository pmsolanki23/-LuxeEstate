import { useContext } from "react";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaLinkedin } from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";
import { agents } from "../data/properties";
import Footer from "../components/Footer";
import { pageVariants } from "../utils/animations";

const AgentsPage = () => {
  const { darkMode } = useContext(ThemeContext);
  const bg = darkMode ? "#0a0a0a" : "#F5F0E8";
  const cardBg = darkMode ? "#1a1a1a" : "#ffffff";
  const titleColor = darkMode ? "#ffffff" : "#1a1a1a";
  const textColor = darkMode ? "rgba(255,255,255,0.45)" : "rgba(26,26,26,0.5)";
  const borderColor = darkMode ? "rgba(255,255,255,0.08)" : "rgba(26,26,26,0.08)";

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit" style={{ background: bg, minHeight: "100vh", transition: "background 0.5s" }}>
      {/* Hero */}
      <div style={{ background: "#0a0a0a", padding: "120px 24px 60px", textAlign: "center" }}>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ fontFamily: "'Poppins',sans-serif", color: "#C9A84C", fontSize: 11, letterSpacing: 6, textTransform: "uppercase", marginBottom: 12 }}>
          Our Team
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          style={{ fontFamily: "'Playfair Display',serif", color: "#fff", fontSize: "clamp(32px,5vw,56px)", fontWeight: 300, marginBottom: 16 }}>
          Meet Our Agents
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ fontFamily: "'Poppins',sans-serif", color: "rgba(255,255,255,0.45)", fontSize: 14, maxWidth: 500, margin: "0 auto" }}>
          Our world-class team of luxury property specialists is here to guide you.
        </motion.p>
      </div>

      {/* Agents Grid */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 28 }}>
          {agents.map((agent, i) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 20, overflow: "hidden", transition: "all 0.3s" }}
              className="agent-card"
            >
              {/* Photo */}
              <div style={{ position: "relative", height: 300, overflow: "hidden" }}>
                <img
                  src={agent.image}
                  alt={agent.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
                  onError={e => { e.currentTarget.style.background = "#1a1a1a"; }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)" }} />
              </div>

              {/* Info */}
              <div style={{ padding: "24px 24px 20px" }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", color: titleColor, fontSize: 20, marginBottom: 4 }}>{agent.name}</h3>
                <p style={{ fontFamily: "'Poppins',sans-serif", color: "#C9A84C", fontSize: 12, marginBottom: 12 }}>{agent.role}</p>
                <p style={{ fontFamily: "'Poppins',sans-serif", color: textColor, fontSize: 12, marginBottom: 20 }}>
                  {agent.properties} Properties Sold
                </p>

                {/* Contact */}
                <div style={{ display: "flex", gap: 10, borderTop: `1px solid ${borderColor}`, paddingTop: 16 }}>
                  {[
                    { icon: <FaPhone />, href: `tel:${agent.phone}`, label: "Call" },
                    { icon: <FaEnvelope />, href: `mailto:${agent.email}`, label: "Email" },
                    { icon: <FaLinkedin />, href: "#", label: "LinkedIn" },
                  ].map(({ icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      style={{
                        width: 38, height: 38, borderRadius: "50%",
                        border: "1px solid rgba(201,168,76,0.3)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#C9A84C", fontSize: 14, textDecoration: "none", transition: "all 0.3s",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = "#C9A84C"; e.currentTarget.style.color = "#fff"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#C9A84C"; }}
                    >{icon}</a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </motion.div>
  );
};

export default AgentsPage;
