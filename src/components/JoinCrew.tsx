"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function JoinCrew() {
  const [seats, setSeats] = useState(147);
  const [showOverlay, setShowOverlay] = useState(false);
  const [pirateNameInPoster, setPirateNameInPoster] = useState("Pirate Name");
  const [errors, setErrors] = useState({ name: "", email: "", crew: "", bounty: "" });

  useEffect(() => {
    const iv = setInterval(() => setSeats((s) => Math.max(80, s - 1)), 30000);
    return () => clearInterval(iv);
  }, []);

  const pct = ((200 - seats) / 200) * 100;

  const validate = () => {
    const name = (document.getElementById("f-name") as HTMLInputElement)?.value.trim() ?? "";
    const email = (document.getElementById("f-email") as HTMLInputElement)?.value.trim() ?? "";
    const crew = (document.getElementById("f-crew") as HTMLInputElement)?.value.trim() ?? "";
    const bounty = (document.getElementById("f-bounty") as HTMLSelectElement)?.value ?? "";

    const e = {
      name: !name ? "Your pirate name can't be empty, even Buggy has a name." : "",
      email: !email || !email.includes("@") ? "That email looks fake. Marines don't fall for this either." : "",
      crew: !crew ? "Every pirate has a crew. What's yours?" : "",
      bounty: !bounty ? "You must claim your bounty class, pirate." : "",
    };
    setErrors(e);
    const ok = !e.name && !e.email && !e.crew && !e.bounty;
    if (ok) {
      setPirateNameInPoster(name);
      setShowOverlay(true);
    }
  };

  return (
    <>
      <section id="join" style={{ background: "#020610", position: "relative", overflow: "hidden" }}>
        
        {/* Parallax background effects */}
        <div style={{ position: "absolute", top: "20%", right: "-10%", width: "40vw", height: "40vw", background: "radial-gradient(circle, rgba(217,48,48,0.05) 0%, transparent 60%)", filter: "blur(60px)", pointerEvents: "none" }} />
        
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            minHeight: "80vh",
            position: "relative",
            zIndex: 1,
            borderTop: "1px solid rgba(255,255,255,0.03)"
          }}
          className="join-grid"
        >
          {/* LEFT: Copy */}
          <div
            style={{
              padding: "6rem 5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {/* Watermark jolly roger */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -100 }}
              whileInView={{ opacity: 0.02, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{
                position: "absolute",
                left: "-50px",
                top: "30%",
                fontSize: "25rem",
                lineHeight: 1,
                pointerEvents: "none",
                userSelect: "none",
                transformOrigin: "center right",
              }}
            >
              ☠
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.75rem",
                  color: "#D93030",
                  letterSpacing: "6px",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "1rem",
                }}
              >
                Limited Berths
              </span>
              <h2
                style={{
                  fontFamily: "'Pirata One', cursive",
                  fontSize: "clamp(3rem,5vw,4.5rem)",
                  color: "#E8C33A",
                  lineHeight: 1.1,
                  marginBottom: "1.5rem",
                  textShadow: "0 0 40px rgba(232,195,58,0.2)",
                }}
              >
                ARE YOU WORTHY OF IEEE EVENTS?
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.8,
                  marginBottom: "2.5rem",
                  maxWidth: "42ch",
                  fontSize: "1.05rem",
                }}
              >
                Only true innovators make it this far. Register now before all berths are taken. This isn&apos;t just an event — it&apos;s your shot at the One Piece.
              </p>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.8rem", alignItems: "center" }}>
                  <span
                    style={{
                      fontFamily: "'Bebas Neue', cursive",
                      fontSize: "1.4rem",
                      color: "#FF4D4D",
                      letterSpacing: "3px",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem"
                    }}
                  >
                    <span style={{ width: 8, height: 8, background: "#FF4D4D", borderRadius: "50%", animation: "pulseDot 1.5s infinite" }} />
                    {seats} SPOTS LEFT
                  </span>
                  <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', monospace", letterSpacing: "2px" }}>
                    {seats} / 200
                  </span>
                </div>
                <div
                  style={{
                    height: "6px",
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: "3px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                    style={{
                      height: "100%",
                      background: "linear-gradient(90deg, #A81B1B, #FF4D4D)",
                      borderRadius: "3px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div className="progress-shimmer" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Form */}
          <div
            style={{
              background: "linear-gradient(135deg, rgba(16,5,5,0.5), rgba(5,2,2,0.8))",
              borderLeft: "1px solid rgba(255,255,255,0.03)",
              padding: "4rem 3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, rotate: 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: "#FAF3E0",
                padding: "3rem 2.5rem",
                maxWidth: "420px",
                width: "100%",
                position: "relative",
                borderRadius: "2px",
                boxShadow: "0 20px 50px rgba(0,0,0,0.8), 0 0 0 8px rgba(139,105,20,0.2)",
                backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')",
                backgroundBlendMode: "overlay",
              }}
              className="premium-poster-form"
            >
              <div style={{ position: "absolute", top: 8, left: 8, width: 20, height: 20, borderTop: "3px solid #8B6914", borderLeft: "3px solid #8B6914" }} />
              <div style={{ position: "absolute", top: 8, right: 8, width: 20, height: 20, borderTop: "3px solid #8B6914", borderRight: "3px solid #8B6914" }} />
              <div style={{ position: "absolute", bottom: 8, left: 8, width: 20, height: 20, borderBottom: "3px solid #8B6914", borderLeft: "3px solid #8B6914" }} />
              <div style={{ position: "absolute", bottom: 8, right: 8, width: 20, height: 20, borderBottom: "3px solid #8B6914", borderRight: "3px solid #8B6914" }} />

              <h3
                style={{
                  fontFamily: "'Pirata One', cursive",
                  fontSize: "2rem",
                  color: "#8B0000",
                  textAlign: "center",
                  borderBottom: "2px solid rgba(139,105,20,0.3)",
                  paddingBottom: "1.2rem",
                  marginBottom: "2rem",
                  letterSpacing: "2px",
                }}
              >
                ⚔ WANTED: YOUR SKILLS ⚔
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {[
                  { id: "f-name", label: "Pirate Name", type: "text", placeholder: "e.g. Monkey D. Hacker", err: errors.name },
                  { id: "f-email", label: "Email", type: "email", placeholder: "pirate@seas.com", err: errors.email },
                  { id: "f-crew", label: "Crew / College", type: "text", placeholder: "Straw Hat Gang / MIT", err: errors.crew },
                ].map(({ id, label, type, placeholder, err }) => (
                  <div key={id}>
                    <label className="wf-label-new">{label}</label>
                    <input id={id} type={type} placeholder={placeholder} className="wf-input-new" />
                    {err && <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:"auto" }} className="wf-error-new">{err}</motion.div>}
                  </div>
                ))}

                <div>
                  <label className="wf-label-new">Bounty Class</label>
                  <select id="f-bounty" className="wf-select-new">
                    <option value="">Choose your rank...</option>
                    <option>Rookie</option>
                    <option>Super Rookie</option>
                    <option>Warlord</option>
                    <option>Yonko</option>
                  </select>
                  {errors.bounty && <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:"auto" }} className="wf-error-new">{errors.bounty}</motion.div>}
                </div>
              </div>

              <button
                onClick={validate}
                className="wanted-submit-btn"
              >
                🏴‍☠️ SET SAIL
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bounty Overlay - Refined */}
      {showOverlay && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bounty-overlay-premium"
          onClick={() => setShowOverlay(false)}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50, rotateX: 10 }}
            animate={{ scale: 1, y: 0, rotateX: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            style={{
              background: "#FAF3E0",
              border: "8px solid #8B6914",
              padding: "3rem 2rem",
              maxWidth: "400px",
              width: "90%",
              textAlign: "center",
              position: "relative",
              borderRadius: "4px",
              boxShadow: "0 40px 100px rgba(0,0,0,0.8), 0 0 60px rgba(255,215,0,0.15)",
              backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')",
              backgroundBlendMode: "overlay",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                position: "absolute",
                top: 20, right: -15,
                color: "#CC0000",
                border: "4px solid #CC0000",
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "1.4rem",
                padding: "4px 15px",
                transform: "rotate(15deg)",
                letterSpacing: "4px",
                background: "#FAF3E0",
                boxShadow: "2px 2px 0 rgba(0,0,0,0.1)",
              }}
            >
              ISSUED
            </div>
            
            <div style={{ fontFamily: "'Pirata One', cursive", fontSize: "1.5rem", color: "#8B0000", letterSpacing: "5px", marginBottom: "0.2rem" }}>
              ☠ WANTED ☠
            </div>
            <div style={{ fontSize: "0.8rem", color: "#555", letterSpacing: "3px", marginBottom: "1.5rem", fontFamily: "'Cinzel', serif" }}>
              DEAD OR ALIVE
            </div>
            
            <div
              style={{
                width: "140px",
                height: "140px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #1f2025, #353842)",
                margin: "0 auto 1.5rem",
                border: "4px solid #8B6914",
                boxShadow: "inset 0 0 20px rgba(0,0,0,0.8), 0 10px 20px rgba(0,0,0,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "4.5rem",
              }}
            >
              🏴‍☠️
            </div>
            
            <div style={{ fontFamily: "'Pirata One', cursive", fontSize: "2.4rem", color: "#111", marginBottom: "0.5rem" }}>
              {pirateNameInPoster}
            </div>
            
            <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: "1.4rem", color: "#8B0000", letterSpacing: "3px" }}>
              BOUNTY: 100,000,000 ฿
            </div>
            
            <div style={{ fontSize: "0.75rem", color: "#777", marginTop: "1rem", fontFamily: "'Inter', sans-serif" }}>
              Registered for IEEE Events — The Grand Line
            </div>
            
            <button
              onClick={() => setShowOverlay(false)}
              style={{
                marginTop: "2rem",
                background: "none",
                border: "none",
                color: "#8B0000",
                fontSize: "0.9rem",
                cursor: "pointer",
                textDecoration: "underline",
                fontFamily: "'Cinzel', serif",
                letterSpacing: "1px",
              }}
            >
              Close and continue →
            </button>
          </motion.div>
        </motion.div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .join-grid { grid-template-columns: 1fr !important; }
        }

        .wf-label-new {
          font-family: 'Cinzel', serif;
          font-size: 0.75rem;
          color: #5a3e00;
          letter-spacing: 2px;
          text-transform: uppercase;
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .wf-input-new, .wf-select-new {
          width: 100%;
          padding: 0.8rem 1rem;
          border: 2px solid rgba(139,105,20,0.3);
          background: rgba(255,255,255,0.5);
          color: #333;
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          border-radius: 4px;
          outline: none;
          transition: all 0.3s;
        }

        .wf-input-new:focus, .wf-select-new:focus {
          border-color: #8B0000;
          background: #FFF;
          box-shadow: 0 0 15px rgba(139,0,0,0.1);
        }

        .wf-error-new {
          font-size: 0.8rem;
          color: #D93030;
          margin-top: 0.4rem;
          font-style: italic;
          overflow: hidden;
        }

        .wanted-submit-btn {
          width: 100%;
          margin-top: 2rem;
          padding: 1.2rem;
          background: linear-gradient(135deg, #A81B1B, #730F0F);
          color: #fff;
          border: 1px solid #D93030;
          font-family: "'Bebas Neue', cursive";
          font-size: 1.8rem;
          letter-spacing: 5px;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
          box-shadow: 0 10px 20px rgba(139,0,0,0.3);
        }

        .wanted-submit-btn:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(139,0,0,0.5);
          background: linear-gradient(135deg, #B52626, #8B0000);
        }

        .bounty-overlay-premium {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(2,6,16,0.95);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }

        .progress-shimmer {
          position: absolute;
          top: 0; left: 0; bottom: 0; width: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transform: skewX(-20deg) translateX(-150%);
          animation: progressShimmer 3s infinite 1s;
        }

        @keyframes progressShimmer {
          100% { transform: skewX(-20deg) translateX(150%); }
        }
      `}</style>
    </>
  );
}
