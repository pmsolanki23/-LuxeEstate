import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "../utils/animations";

const stats = [
  { number: "500+", label: "Properties Sold", suffix: "" },
  { number: "25+", label: "Years Experience", suffix: "" },
  { number: "50+", label: "Countries", suffix: "" },
  { number: "98%", label: "Client Satisfaction", suffix: "" },
];

const StatsBar = () => {
  return (
    <section id="stats" className="bg-[#0a0a0a] py-14 px-6 md:px-10">
      <div className="max-w-screen-xl mx-auto">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {stats.map(({ number, label }, i) => (
            <motion.div
              key={label}
              variants={fadeInUp}
              className={`flex flex-col items-center text-center relative
                ${i < stats.length - 1 ? "md:border-r md:border-white/10" : ""}`}
            >
              <span className="font-playfair text-gold text-4xl md:text-5xl font-light">
                {number}
              </span>
              <span className="font-poppins text-white/50 text-xs tracking-[3px] uppercase mt-2">
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsBar;
