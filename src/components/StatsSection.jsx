import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FaHome, FaUsers, FaStar, FaTrophy } from "react-icons/fa";

const STATS = [
  { icon: <FaHome />, target: 500, suffix: "+", label: "Properties Listed" },
  { icon: <FaUsers />, target: 200, suffix: "+", label: "Happy Clients" },
  { icon: <FaStar />, target: 15, suffix: "+", label: "Years Experience" },
  { icon: <FaTrophy />, target: 50, suffix: "+", label: "Awards Won" },
];

const CountUp = ({ target, suffix, started }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let current = 0;
    const step = Math.ceil(target / 80);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(current);
    }, 25);
    return () => clearInterval(timer);
  }, [started, target]);
  return <span>{count}{suffix}</span>;
};

const StatsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} style={{ background: "#0a0a0a", padding: "80px 40px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 40 }}>
        {STATS.map(({ icon, target, suffix, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.6 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
          >
            <div style={{
              width: 56, height: 56, borderRadius: "50%",
              border: "1px solid rgba(201,168,76,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#C9A84C", fontSize: 20, marginBottom: 16,
            }}>
              {icon}
            </div>
            <p style={{ fontFamily: "'Playfair Display',serif", color: "#C9A84C", fontSize: 48, fontWeight: 300, lineHeight: 1, marginBottom: 8 }}>
              <CountUp target={target} suffix={suffix} started={inView} />
            </p>
            <p style={{ fontFamily: "'Poppins',sans-serif", color: "rgba(255,255,255,0.45)", fontSize: 13, letterSpacing: 1 }}>{label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
