import { useEffect } from "react";
import { motion } from "framer-motion";

const Loader = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-gold/5 blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center">
        {/* Wordmark */}
        <motion.h1
          className="font-playfair text-white text-5xl md:text-7xl font-light tracking-[0.15em]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          LuxeEstate
        </motion.h1>

        {/* Gold underline */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-gold to-transparent mt-4"
          style={{ width: "220px" }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {/* Tagline */}
        <motion.p
          className="font-poppins text-white/30 text-xs tracking-[5px] uppercase mt-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          Curating the World's Finest Properties
        </motion.p>

        {/* Loading dots */}
        <motion.div
          className="flex gap-1.5 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1 h-1 rounded-full bg-gold/60"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Loader;
