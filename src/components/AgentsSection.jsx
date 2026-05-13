import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaLinkedin } from "react-icons/fa";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { agents } from "../data/properties";

const AgentsSection = () => {
  const { darkMode } = useContext(ThemeContext);
  const bg = darkMode ? "#111111" : "#ffffff";
  const titleColor = darkMode ? "#ffffff" : "#1a1a1a";
  const cardBg = darkMode ? "#1a1a1a" : "#F5F0E8";
  const borderColor = darkMode ? "rgba(255,255,255,0.06)" : "rgba(26,26,26,0.08)";

  return (
    <section id="agents" style={{ background: bg, padding: "80px 40px", transition: "background 0.5s" }}>
      {/* Header */}
      <motion.div
        style={{ textAlign: "center", marginBottom: 56 }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p style={{ fontFamily: "'Poppins',sans-serif", color: "#C9A84C", fontSize: 11, letterSpacing: 6, textTransform: "uppercase", marginBottom: 12 }}>
          Our Team
        </p>
        <h2 style={{ fontFamily: "'Playfair Display',serif", color: titleColor, fontSize: "clamp(32px,4vw,48px)", fontWeight: 300 }}>
          Meet the Agents
        </h2>
        <div className="section-divider" />
      </motion.div>

      {/* Grid */}
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 24 }}>
        {agents.map((agent, i) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 20, overflow: "hidden", transition: "all 0.3s" }}
            className="group"
          >
            {/* Photo */}
            <div style={{ position: "relative", height: 280, overflow: "hidden" }}>
              <img
                src={agent.image}
                alt={agent.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
                className="group-hover:scale-105"
                onError={e => { e.currentTarget.style.background = "#1a1a1a"; }}
              />
              {/* Hover overlay */}
              <div
                style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(10,10,10,0.9), rgba(10,10,10,0.3), transparent)",
                  display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 20,
                  opacity: 0, transition: "opacity 0.3s",
                }}
                className="group-hover:opacity-100"
              >
                <div style={{ display: "flex", gap: 10 }}>
                  {[
                    { icon: <FaPhone />, href: `tel:${agent.phone}`, label: `Call ${agent.name}` },
                    { icon: <FaEnvelope />, href: `mailto:${agent.email}`, label: `Email ${agent.name}` },
                    { icon: <FaLinkedin />, href: "#", label: "LinkedIn" },
                  ].map(({ icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      style={{
                        width: 38, height: 38, borderRadius: "50%",
                        background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.4)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#C9A84C", fontSize: 13, textDecoration: "none", transition: "all 0.3s",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = "#C9A84C"; e.currentTarget.style.color = "#fff"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "rgba(201,168,76,0.15)"; e.currentTarget.style.color = "#C9A84C"; }}
                    >{icon}</a>
                  ))}
                </div>
              </div>
            </div>

            {/* Info */}
            <div style={{ padding: "20px 20px 24px" }}>
              <h3 style={{ fontFamily: "'Playfair Display',serif", color: titleColor, fontSize: 18, marginBottom: 4 }}>{agent.name}</h3>
              <p style={{ fontFamily: "'Poppins',sans-serif", color: "#C9A84C", fontSize: 12, marginBottom: 8 }}>{agent.role}</p>
              <p style={{ fontFamily: "'Poppins',sans-serif", color: darkMode ? "rgba(255,255,255,0.3)" : "rgba(26,26,26,0.4)", fontSize: 11 }}>
                {agent.properties} Properties Sold
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AgentsSection;
