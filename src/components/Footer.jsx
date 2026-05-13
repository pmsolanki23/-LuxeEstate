import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer id="contact" style={{ background: "#0a0a0a", color: "#fff", padding: "64px 40px 32px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <motion.div
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 40, paddingBottom: 48, borderBottom: "1px solid rgba(255,255,255,0.08)" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#C9A84C,#E8C96A)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13, fontFamily: "'Playfair Display',serif" }}>L</span>
              <span style={{ fontFamily: "'Playfair Display',serif", color: "#C9A84C", fontSize: 22 }}>LuxeEstate</span>
            </div>
            <p style={{ fontFamily: "'Poppins',sans-serif", color: "rgba(255,255,255,0.35)", fontSize: 13, lineHeight: 1.7, maxWidth: 260, marginBottom: 24 }}>
              Curating the world's finest properties for discerning buyers who demand nothing less than extraordinary.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {[
                { icon: <FaInstagram />, label: "Instagram" },
                { icon: <FaXTwitter />, label: "Twitter" },
                { icon: <FaLinkedin />, label: "LinkedIn" },
                { icon: <FaFacebook />, label: "Facebook" },
                { icon: <FaYoutube />, label: "YouTube" },
              ].map(({ icon, label }) => (
                <a
                  key={label}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.35)", fontSize: 14, textDecoration: "none", transition: "all 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#C9A84C"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.35)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                >{icon}</a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: "'Playfair Display',serif", color: "#C9A84C", fontSize: 17, marginBottom: 20 }}>Quick Links</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {["Properties", "Services", "Agents", "Contact", "About Us"].map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(" ", "-")}`} style={{ fontFamily: "'Poppins',sans-serif", color: "rgba(255,255,255,0.35)", fontSize: 13, textDecoration: "none", transition: "color 0.3s" }}
                    onMouseEnter={e => e.target.style.color = "#C9A84C"}
                    onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.35)"}
                  >{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h4 style={{ fontFamily: "'Playfair Display',serif", color: "#C9A84C", fontSize: 17, marginBottom: 20 }}>Property Types</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {["Villa", "Penthouse", "Estate", "Apartment", "All Properties"].map(type => (
                <li key={type}>
                  <Link to="/" style={{ fontFamily: "'Poppins',sans-serif", color: "rgba(255,255,255,0.35)", fontSize: 13, textDecoration: "none", transition: "color 0.3s" }}
                    onMouseEnter={e => e.target.style.color = "#C9A84C"}
                    onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.35)"}
                  >{type}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: "'Playfair Display',serif", color: "#C9A84C", fontSize: 17, marginBottom: 20 }}>Contact</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { label: "Email", value: "hello@luxeestate.com", href: "mailto:hello@luxeestate.com" },
                { label: "Phone", value: "+1 (555) 000-0000", href: "tel:+15550000000" },
              ].map(({ label, value, href }) => (
                <div key={label}>
                  <p style={{ fontFamily: "'Poppins',sans-serif", color: "rgba(255,255,255,0.2)", fontSize: 10, textTransform: "uppercase", letterSpacing: 3, marginBottom: 4 }}>{label}</p>
                  <a href={href} style={{ fontFamily: "'Poppins',sans-serif", color: "rgba(255,255,255,0.35)", fontSize: 13, textDecoration: "none", transition: "color 0.3s" }}
                    onMouseEnter={e => e.target.style.color = "#C9A84C"}
                    onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.35)"}
                  >{value}</a>
                </div>
              ))}
              <div>
                <p style={{ fontFamily: "'Poppins',sans-serif", color: "rgba(255,255,255,0.2)", fontSize: 10, textTransform: "uppercase", letterSpacing: 3, marginBottom: 4 }}>Office</p>
                <p style={{ fontFamily: "'Poppins',sans-serif", color: "rgba(255,255,255,0.35)", fontSize: 13, lineHeight: 1.6 }}>432 Park Avenue, Suite 5000<br />New York, NY 10022</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <div style={{ paddingTop: 24, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <p style={{ fontFamily: "'Poppins',sans-serif", color: "rgba(255,255,255,0.2)", fontSize: 12 }}>
            © 2025 LuxeEstate. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy Policy", "Terms of Service"].map(item => (
              <a key={item} href="#" style={{ fontFamily: "'Poppins',sans-serif", color: "rgba(255,255,255,0.2)", fontSize: 12, textDecoration: "none", transition: "color 0.3s" }}
                onMouseEnter={e => e.target.style.color = "#C9A84C"}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.2)"}
              >{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
