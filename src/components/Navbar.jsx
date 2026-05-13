import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Properties", to: "/properties" },
  { label: "Services", to: "/services" },
  { label: "Agents", to: "/agents" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const { darkMode } = useContext(ThemeContext);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const isActive = (to) => location.pathname === to;

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, width: "100%", zIndex: 50,
        padding: "0 40px", height: 70,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        transition: "all 0.4s ease",
        backdropFilter: scrolled ? "blur(24px)" : "blur(12px)",
        background: scrolled ? "rgba(0,0,0,0.75)" : "rgba(0,0,0,0.2)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
        boxSizing: "border-box",
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
          <span style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "linear-gradient(135deg,#C9A84C,#E8C96A)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 700, fontSize: 15,
            fontFamily: "'Playfair Display',serif", flexShrink: 0,
          }}>L</span>
          <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 500, color: "#fff", letterSpacing: 1, whiteSpace: "nowrap" }}>
            LuxeEstate
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              style={{
                fontFamily: "'Poppins',sans-serif", fontSize: 11,
                textTransform: "uppercase", letterSpacing: 3,
                color: isActive(to) ? "#C9A84C" : "rgba(255,255,255,0.7)",
                textDecoration: "none", transition: "color 0.3s",
                borderBottom: isActive(to) ? "1px solid #C9A84C" : "1px solid transparent",
                paddingBottom: 2,
              }}
            >{label}</Link>
          ))}
        </div>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <ThemeToggle />
          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="nav-hamburger"
            style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.85)", fontSize: 22, display: "none", padding: 4 }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              position: "fixed", inset: 0, zIndex: 49,
              background: "rgba(10,10,10,0.98)", backdropFilter: "blur(20px)",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 28,
            }}
          >
            {NAV_LINKS.map(({ label, to }, i) => (
              <motion.div
                key={to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Link
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: "'Playfair Display',serif", fontSize: 34,
                    color: isActive(to) ? "#C9A84C" : "rgba(255,255,255,0.85)",
                    textDecoration: "none", display: "block", textAlign: "center",
                  }}
                >{label}</Link>
              </motion.div>
            ))}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{ fontFamily: "'Poppins',sans-serif", color: "rgba(255,255,255,0.2)", fontSize: 11, letterSpacing: 4, textTransform: "uppercase", marginTop: 16 }}
            >
              hello@luxeestate.com
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
          nav { padding: 0 20px !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
