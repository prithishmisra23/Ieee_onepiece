"use client";
import { useEffect, useState } from "react";

export default function Hero() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Small delay to ensure hydration matches and video has started
    const timer = setTimeout(() => setShow(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: "#020610",
      }}
    >
      {/* LAYER 1: BACKGROUND VIDEO */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src="/intro-video.mp4" type="video/mp4" />
        <source src="/one-piece-phone-bg.mp4" type="video/mp4" />
      </video>

      {/* LAYER 2: DARK GRADIENT OVERLAY */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.45)",
          backgroundImage: "linear-gradient(to bottom, rgba(2,6,16,0.6) 0%, rgba(2,6,16,0.2) 30%, rgba(2,6,16,0.7) 80%, #020610 100%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* LAYER 3: CENTERED CONTENT */}
      {show && (
        <div
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0 1.5rem",
            transform: "translateY(2rem)", /* Prevent overlap with Nav */
            animation: "fadeInUp 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards",
          }}
        >
          {/* Skull Icon */}
          <div
            style={{
              fontSize: "clamp(3.5rem, 8vw, 5.5rem)",
              marginBottom: "1.2rem",
              lineHeight: 1,
              filter: "drop-shadow(0 0 30px rgba(232,195,58,0.9))",
              animation: "pulseIcon 3s infinite alternate",
            }}
          >
            ☠
          </div>

          {/* Tag */}
          <p
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(0.6rem, 1.4vw, 0.85rem)",
              color: "rgba(0,196,216,0.9)",
              letterSpacing: "6px",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
              fontWeight: 700,
            }}
          >
            ✦ AN IEEE INITIATIVE ✦
          </p>

          {/* Main Title */}
          <h1
            style={{
              fontFamily: "'Pirata One', cursive",
              fontSize: "clamp(4.5rem, 12vw, 10rem)",
              color: "#E8C33A",
              lineHeight: 0.9,
              textShadow: "0 0 40px rgba(232,195,58,0.5), 0 8px 30px rgba(0,0,0,0.9)",
              letterSpacing: "-1px",
              marginBottom: "1rem",
            }}
          >
            IEEE EVENTS
          </h1>

          {/* Subtitle */}
          <div
            style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "clamp(1.4rem, 3.5vw, 2.5rem)",
              color: "#FFF",
              letterSpacing: "8px",
              marginBottom: "2.5rem",
              textShadow: "0 4px 20px rgba(0,0,0,0.8)",
            }}
          >
            <span style={{ color: "#00C4D8" }}>THE GRAND LINE</span> AWAITS
          </div>

          {/* Divider */}
          <div
            style={{
              width: "80px",
              height: "2px",
              background: "#E8C33A",
              marginBottom: "3rem",
              boxShadow: "0 0 10px #E8C33A",
            }}
          />

          {/* Buttons */}
          <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              className="action-btn primary"
              onClick={() => document.getElementById("join")?.scrollIntoView({ behavior: "smooth" })}
            >
              JOIN THE CREW
            </button>
            <button
              className="action-btn secondary"
              onClick={() => document.getElementById("posters")?.scrollIntoView({ behavior: "smooth" })}
            >
              EXPLORE EVENT
            </button>
          </div>
        </div>
      )}

      {/* Scroll indicator */}
      {show && (
        <div className="scroll-indicator">
          <div className="scroll-pill">
            <div className="scroll-dot" />
          </div>
          <span>SCROLL</span>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(60px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulseIcon {
          0% { filter: drop-shadow(0 0 20px rgba(232,195,58,0.6)); transform: scale(1); }
          100% { filter: drop-shadow(0 0 40px rgba(232,195,58,1)); transform: scale(1.05); }
        }

        .action-btn {
          padding: 1.2rem 3rem;
          font-family: 'Cinzel', serif;
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 4px;
          text-transform: uppercase;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .action-btn.primary {
          background: #B52626;
          color: #FFF;
          border: 1px solid #D93030;
          box-shadow: 0 10px 20px rgba(181, 38, 38, 0.4);
        }

        .action-btn.primary:hover {
          background: #D93030;
          transform: translateY(-4px);
          box-shadow: 0 15px 30px rgba(181, 38, 38, 0.6);
        }

        .action-btn.secondary {
          background: transparent;
          color: #E8C33A;
          border: 1px solid #E8C33A;
          backdrop-filter: blur(10px);
        }

        .action-btn.secondary:hover {
          background: rgba(232, 195, 58, 0.1);
          transform: translateY(-4px);
          box-shadow: 0 10px 20px rgba(232, 195, 58, 0.2);
        }

        .scroll-indicator {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.8rem;
          z-index: 2;
          font-family: 'Cinzel', serif;
          font-size: 0.65rem;
          letter-spacing: 4px;
          color: rgba(232,195,58,0.8);
          animation: fadeInUp 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards 1s;
          opacity: 0;
        }

        .scroll-pill {
          width: 24px;
          height: 38px;
          border: 2px solid rgba(232,195,58,0.5);
          border-radius: 12px;
          display: flex;
          justify-content: center;
          padding-top: 6px;
        }

        .scroll-dot {
          width: 4px;
          height: 8px;
          background: #E8C33A;
          border-radius: 2px;
          animation: scrollAnim 1.5s infinite;
        }

        @keyframes scrollAnim {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(12px); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
