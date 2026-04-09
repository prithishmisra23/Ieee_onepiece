"use client";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import React, { useRef } from "react";

const POSTERS = [
  { src: "/posters/event-announcement.png", label: "Event Announcement", tag: "Chapter 01" },
  { src: "/posters/registration.png", label: "Registration Open", tag: "Chapter 02" },
  { src: "/posters/round-announcement.png", label: "Round Announcement", tag: "Chapter 03" },
];

function TiltCard({ poster, index }: { poster: any; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Mouse coordinates
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for the 3D rotation
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  // Transform coordinates into rotation degrees
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Normalize coordinates from -0.5 to 0.5
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="poster-card-3d"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="poster-glow"
          style={{
            transform: "translateZ(-20px)",
          }}
        />
        
        <div style={{ transform: "translateZ(40px)", display: "flex", flexDirection: "column", height: "100%", background: "rgba(8,15,30,0.85)", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(232,195,58,0.15)" }}>
          <div className="poster-tag">{poster.tag}</div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={poster.src}
            alt={poster.label}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <div className="poster-label">{poster.label}</div>
        </div>
      </motion.div>

      <style>{`
        .poster-card-3d {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 12px;
          cursor: crosshair;
          transition: filter 0.3s ease;
        }

        .poster-card-3d:hover {
          filter: brightness(1.1);
        }

        .poster-glow {
          position: absolute;
          inset: -10px;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(232,195,58,0.4), rgba(0,196,216,0.2) 50%, transparent);
          filter: blur(25px);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .poster-card-3d:hover .poster-glow {
          opacity: 1;
        }

        .poster-tag {
          position: absolute;
          top: 16px; left: 16px;
          background: rgba(3,9,18,0.7);
          border: 1px solid rgba(232,195,58,0.4);
          color: #E8C33A;
          font-family: 'Cinzel', serif;
          font-size: 0.65rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          padding: 6px 12px;
          border-radius: 4px;
          backdrop-filter: blur(10px);
          z-index: 10;
          transform: translateZ(60px); /* Pops out in 3D space */
          box-shadow: 0 10px 20px rgba(0,0,0,0.5);
        }

        .poster-label {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 1.5rem;
          font-family: 'Cinzel', serif;
          font-size: 0.9rem;
          color: #FFF;
          letter-spacing: 2px;
          text-transform: uppercase;
          background: linear-gradient(to top, rgba(2,6,16,0.95), transparent);
          text-align: center;
          transform: translateZ(50px);
        }
      `}</style>
    </motion.div>
  );
}

export default function Posters() {
  return (
    <section
      id="posters"
      style={{
        background: "#020610",
        padding: "10rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background elements */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "-10%",
          width: "40vw",
          height: "40vw",
          background: "radial-gradient(circle, rgba(232,195,58,0.03) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "-10%",
          width: "50vw",
          height: "50vw",
          background: "radial-gradient(circle, rgba(0,196,216,0.02) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* Ghost text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: "easeOut" }}
        style={{
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          fontFamily: "'Bebas Neue', cursive",
          fontSize: "clamp(8rem, 25vw, 20rem)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(232,195,58,0.03)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
          letterSpacing: "12px",
        }}
      >
        LORE
      </motion.div>

      <div style={{ maxWidth: "1300px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ textAlign: "center", marginBottom: "6rem" }}
        >
          <span
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "0.8rem",
              color: "#00C4D8",
              letterSpacing: "6px",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "1rem",
            }}
          >
            Official Communications
          </span>
          <h2
            style={{
              fontFamily: "'Pirata One', cursive",
              fontSize: "clamp(3rem, 7vw, 6rem)",
              color: "#E8C33A",
              textShadow: "0 0 60px rgba(232,195,58,0.25)",
              marginBottom: "0.5rem",
              lineHeight: 1,
            }}
          >
            Bounties Issued
          </h2>
          <div
            style={{
              width: "80px",
              height: "2px",
              background: "linear-gradient(90deg, #00C4D8, #E8C33A)",
              margin: "1.5rem auto 0",
              borderRadius: "2px",
            }}
          />
        </motion.div>

        {/* Poster grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "3rem",
            perspective: "1000px",
          }}
        >
          {POSTERS.map((p, i) => (
            <TiltCard key={i} poster={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
