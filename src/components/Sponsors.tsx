"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const SPONSORS = [
  { name: "IEEE Computer Society", logo: "/logos/ieee-computer.png" },
  { name: "GradeX", logo: "/logos/gradex-logo-transparent.png" },
  { name: "6 Pistons", logo: "/logos/6pistons-logo-transparent.png" },
  { name: "Turn2Law", logo: "/logos/turn2law-logo-transparent.png" },
  { name: "Sucksi", logo: "/logos/sucksi-logo-transparent.png" },
  { name: "Spazor Labs", logo: "/logos/spazorlabs-logo.png" },
];

const LOOP = [...SPONSORS, ...SPONSORS, ...SPONSORS, ...SPONSORS];

export default function Sponsors() {
  return (
    <section
      id="sponsors"
      style={{
        background: "#020610",
        padding: "8rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(232,195,58,0.2), rgba(0,196,216,0.2), transparent)",
        }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem", position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <span
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "0.7rem",
              color: "#00C4D8",
              letterSpacing: "6px",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "0.8rem",
            }}
          >
            Our Allies on the Grand Line
          </span>
          <h2
            style={{
              fontFamily: "'Pirata One', cursive",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              color: "#E8C33A",
              textShadow: "0 0 40px rgba(232,195,58,0.2)",
              marginBottom: "1rem",
            }}
          >
            Partners & Guilds
          </h2>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.2 }}
        style={{ position: "relative" }}
      >
        {/* Soft edge fades */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "15vw",
            background: "linear-gradient(90deg, #020610 0%, transparent 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "15vw",
            background: "linear-gradient(-90deg, #020610 0%, transparent 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* Track 1 */}
        <div className="marquee-container" style={{ marginBottom: "2rem" }}>
          <div className="marquee-content ltr">
            {LOOP.map((s, i) => (
              <div key={i} className="sponsor-card-premium">
                <div className="sponsor-img-wrapper">
                  <Image
                    src={s.logo}
                    alt={s.name}
                    width={180}
                    height={80}
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: "65px",
                      objectFit: "contain",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Track 2 */}
        <div className="marquee-container">
          <div className="marquee-content rtl">
            {[...LOOP].reverse().map((s, i) => (
              <div key={i} className="sponsor-card-premium">
                <div className="sponsor-img-wrapper">
                  <Image
                    src={s.logo}
                    alt={s.name}
                    width={180}
                    height={80}
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: "65px",
                      objectFit: "contain",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <style>{`
        .marquee-container {
          display: flex;
          overflow: hidden;
          width: 100%;
        }

        .marquee-content {
          display: flex;
          gap: 2rem;
          padding-left: 2rem;
          width: max-content;
        }

        .ltr {
          animation: slideLTR 40s linear infinite;
        }

        .rtl {
          animation: slideRTL 45s linear infinite;
        }

        .marquee-container:hover .marquee-content {
          animation-play-state: paused;
        }

        @keyframes slideLTR {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 1rem)); }
        }

        @keyframes slideRTL {
          0% { transform: translateX(calc(-50% - 1rem)); }
          100% { transform: translateX(0); }
        }

        .sponsor-card-premium {
          background: rgba(10, 15, 30, 0.3);
          border: 1px solid rgba(255,255,255,0.03);
          border-radius: 12px;
          padding: 1.5rem 2.5rem;
          min-width: 240px;
          display: flex;
          align-items: center;
          justifyContent: center;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          cursor: crosshair;
          backdrop-filter: blur(5px);
        }

        .sponsor-card-premium:hover {
          background: rgba(232, 195, 58, 0.05);
          border-color: rgba(232, 195, 58, 0.2);
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(232,195,58,0.1);
        }

        .sponsor-img-wrapper {
          width: 180px;
          height: 65px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sponsor-img-wrapper img {
          filter: grayscale(100%) opacity(0.4);
          transition: filter 0.4s ease, transform 0.4s ease;
        }

        .sponsor-card-premium:hover img {
          filter: grayscale(0%) opacity(1);
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
}
