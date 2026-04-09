"use client";
import { motion } from "framer-motion";

const ITEMS = [
  { icon: "🎙", title: "LIVE PITCHING", desc: "Real-time pitch rooms. Your voice, your idea, your shot at glory.", color: "#00C4D8" },
  { icon: "💰", title: "BERRY ECONOMY", desc: "Earn Berries for every pitch. Climb the bounty board.", color: "#E8C33A" },
  { icon: "🏆", title: "LIVE LEADERBOARD", desc: "Watch rankings shift in real time. The Pirate King is crowned by Berries.", color: "#E8C33A" },
  { icon: "⚓", title: "CREW LOBBY", desc: "Form your crew. See every active pirate. Find your island.", color: "#00C4D8" },
  { icon: "🏝", title: "PITCH ISLANDS", desc: "Each topic is an island. Navigate the archipelago. Conquer your domain.", color: "#D93030" },
  { icon: "🐌", title: "REAL-TIME CHAT", desc: "Den Den Mushi comms. React, hype, roast. Every room buzzing.", color: "#D93030" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function EventHighlights() {
  return (
    <section
      id="features"
      style={{
        background: "linear-gradient(180deg, #020610 0%, #060f22 50%, #020610 100%)",
        padding: "8rem 2rem",
        borderTop: "1px solid rgba(232,195,58,0.03)",
        borderBottom: "1px solid rgba(232,195,58,0.03)",
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "url('/noise.png')", opacity: 0.03, pointerEvents: "none" }} />
      
      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ textAlign: "center", marginBottom: "5rem" }}
        >
          <span
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "0.75rem",
              color: "#00C4D8",
              letterSpacing: "6px",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "0.8rem",
            }}
          >
            Abilities Unlocked
          </span>
          <h2
            style={{
              fontFamily: "'Pirata One', cursive",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              color: "#E8C33A",
              textShadow: "0 0 50px rgba(232,195,58,0.3)",
              marginBottom: "1rem",
            }}
          >
            Devil Fruit Powers
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "0.95rem",
              maxWidth: "50ch",
              margin: "0 auto",
              lineHeight: 1.8,
            }}
          >
            The abilities that will define your legend on the Grand Line. Command the room, build your fortune, and outmaneuver rival crews.
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            style={{
              width: "80px",
              height: "2px",
              background: "linear-gradient(90deg, transparent, #E8C33A, transparent)",
              margin: "1.5rem auto 0",
              borderRadius: "2px",
            }}
          />
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
          }}
        >
          {ITEMS.map((item, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="highlight-card"
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1.2rem" }}>
                <div
                  style={{
                    fontSize: "2.2rem",
                    width: "65px",
                    height: "65px",
                    background: `radial-gradient(circle at top left, ${item.color}30, transparent)`,
                    border: `1px solid ${item.color}40`,
                    boxShadow: `inset 0 0 20px ${item.color}10, 0 0 20px ${item.color}20`,
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span style={{ filter: `drop-shadow(0 0 8px ${item.color}80)` }}>{item.icon}</span>
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Bebas Neue', cursive",
                      fontSize: "1.3rem",
                      color: item.color,
                      letterSpacing: "3px",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {item.title}
                  </div>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "rgba(255,255,255,0.6)",
                      lineHeight: 1.7,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .highlight-card {
          background: rgba(10, 18, 35, 0.4);
          border: 1px solid rgba(232,195,58,0.1);
          border-radius: 16px;
          padding: 2rem;
          transition: border-color 0.4s ease, box-shadow 0.4s ease, background 0.4s ease;
          cursor: pointer;
          backdrop-filter: blur(12px);
          position: relative;
          overflow: hidden;
        }

        .highlight-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 100%;
          background: linear-gradient(135deg, rgba(232,195,58,0.1), transparent 60%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .highlight-card:hover {
          background: rgba(15, 25, 45, 0.6);
          border-color: rgba(232,195,58,0.3);
          box-shadow: 0 30px 60px rgba(0,0,0,0.6), 0 0 40px rgba(232,195,58,0.1);
        }

        .highlight-card:hover::before {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
