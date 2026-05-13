import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { testimonials } from "../data/properties";

const TestimonialsSection = () => {
  return (
    <section style={{ background: "#0a0a0a", padding: "80px 40px", overflow: "hidden" }}>
      {/* Header */}
      <motion.div
        style={{ textAlign: "center", marginBottom: 56 }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p style={{ fontFamily: "'Poppins',sans-serif", color: "#C9A84C", fontSize: 11, letterSpacing: 6, textTransform: "uppercase", marginBottom: 12 }}>
          Client Stories
        </p>
        <h2 style={{ fontFamily: "'Playfair Display',serif", color: "#fff", fontSize: "clamp(32px,4vw,48px)", fontWeight: 300 }}>
          What Our Clients Say
        </h2>
        <div style={{ width: 60, height: 2, background: "linear-gradient(90deg,#C9A84C,transparent)", margin: "16px auto 0" }} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ maxWidth: 1280, margin: "0 auto" }}
      >
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          style={{ paddingBottom: 48 }}
        >
          {testimonials.map(t => (
            <SwiperSlide key={t.id}>
              <div style={{
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20, padding: 32, height: "100%", display: "flex", flexDirection: "column",
              }}>
                <FaQuoteLeft style={{ color: "rgba(201,168,76,0.25)", fontSize: 28, marginBottom: 16 }} />

                {/* Stars */}
                <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <FaStar key={i} style={{ color: "#C9A84C", fontSize: 13 }} />
                  ))}
                </div>

                {/* Review */}
                <p style={{ fontFamily: "'Poppins',sans-serif", color: "rgba(255,255,255,0.55)", fontSize: 13, lineHeight: 1.8, fontStyle: "italic", flex: 1, marginBottom: 24 }}>
                  "{t.review}"
                </p>

                {/* Client */}
                <div style={{ display: "flex", alignItems: "center", gap: 14, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                  <img
                    src={t.avatar}
                    alt={t.name}
                    style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(201,168,76,0.3)" }}
                    onError={e => { e.currentTarget.style.display = "none"; }}
                  />
                  <div>
                    <p style={{ fontFamily: "'Playfair Display',serif", color: "#fff", fontSize: 15 }}>{t.name}</p>
                    <p style={{ fontFamily: "'Poppins',sans-serif", color: "#C9A84C", fontSize: 11 }}>{t.designation}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
};

export default TestimonialsSection;
