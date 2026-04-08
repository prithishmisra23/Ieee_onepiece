"use client";
import { useEffect, useRef, useState } from "react";

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
      <section id="join" style={{ background: "var(--navy)" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            minHeight: "75vh",
          }}
          className="join-grid"
        >
          {/* LEFT */}
          <div
            style={{
              background: "linear-gradient(135deg, var(--navy) 60%, #0d1830)",
              padding: "5rem 4rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Watermark jolly roger */}
            <div
              style={{
                position: "absolute",
                right: "-60px",
                top: "50%",
                transform: "translateY(-50%)",
                opacity: 0.04,
                fontSize: "18rem",
                lineHeight: 1,
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              ☠
            </div>

            <div className="reveal-left">
              <span className="section-tag">Limited Berths</span>
              <h2
                style={{
                  fontFamily: "'Pirata One', cursive",
                  fontSize: "clamp(2rem,4.5vw,3.5rem)",
                  color: "var(--gold)",
                  lineHeight: 1.1,
                  marginBottom: "1.5rem",
                }}
              >
                ARE YOU WORTHY OF THE GRAND LINE?
              </h2>
              <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.8, marginBottom: "2rem", maxWidth: "42ch" }}>
                Only true pirates make it this far. Register now before all berths are taken. This isn&apos;t just an event — it&apos;s your shot at the One Piece.
              </p>
              <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.35)", marginBottom: "1.5rem", letterSpacing: "1px" }}>
                Limited to 200 pirates per event
              </p>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--red)", fontWeight: 600, letterSpacing: "1px" }}>
                    🔴 {seats} SPOTS LEFT
                  </span>
                  <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.35)" }}>
                    {seats} / 200
                  </span>
                </div>
                <div
                  style={{
                    height: "8px",
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${pct}%`,
                      background: "linear-gradient(90deg, var(--red), #ff3333)",
                      borderRadius: "4px",
                      transition: "width 1s ease",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Wanted Poster Form */}
          <div
            style={{
              background: "linear-gradient(135deg, #1a0505, #0d0202)",
              padding: "4rem 3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              className="reveal-right"
              style={{
                background: "var(--cream)",
                border: "5px solid #8B6914",
                padding: "2.5rem 2rem",
                maxWidth: "400px",
                width: "100%",
                position: "relative",
                borderRadius: "2px",
                boxShadow: "8px 8px 0 rgba(0,0,0,0.6), 0 0 60px rgba(204,0,0,0.15)",
              }}
            >
              {/* Corner decorations */}
              <div style={{ position: "absolute", top: 6, left: 6, width: 14, height: 14, borderTop: "2px solid #8B6914", borderLeft: "2px solid #8B6914" }} />
              <div style={{ position: "absolute", top: 6, right: 6, width: 14, height: 14, borderTop: "2px solid #8B6914", borderRight: "2px solid #8B6914" }} />
              <div style={{ position: "absolute", bottom: 6, left: 6, width: 14, height: 14, borderBottom: "2px solid #8B6914", borderLeft: "2px solid #8B6914" }} />
              <div style={{ position: "absolute", bottom: 6, right: 6, width: 14, height: 14, borderBottom: "2px solid #8B6914", borderRight: "2px solid #8B6914" }} />

              <h3
                style={{
                  fontFamily: "'Pirata One', cursive",
                  fontSize: "1.6rem",
                  color: "#8B0000",
                  textAlign: "center",
                  borderBottom: "2px solid #8B6914",
                  paddingBottom: "0.8rem",
                  marginBottom: "1.5rem",
                }}
              >
                ⚔ WANTED: YOUR SKILLS ⚔
              </h3>

              {[
                { id: "f-name", label: "Pirate Name", type: "text", placeholder: "e.g. Monkey D. Hacker", err: errors.name },
                { id: "f-email", label: "Email", type: "email", placeholder: "pirate@seas.com", err: errors.email },
                { id: "f-crew", label: "Crew / College", type: "text", placeholder: "Straw Hat Gang / MIT", err: errors.crew },
              ].map(({ id, label, type, placeholder, err }) => (
                <div key={id}>
                  <label className="wf-label">{label}</label>
                  <input id={id} type={type} placeholder={placeholder} className="wf-input" />
                  {err && <div className="wf-error">{err}</div>}
                </div>
              ))}

              <div>
                <label className="wf-label">Bounty Class</label>
                <select id="f-bounty" className="wf-select">
                  <option value="">Choose your rank...</option>
                  <option>Rookie</option>
                  <option>Super Rookie</option>
                  <option>Warlord</option>
                  <option>Yonko</option>
                </select>
                {errors.bounty && <div className="wf-error">{errors.bounty}</div>}
              </div>

              <button
                onClick={validate}
                style={{
                  width: "100%",
                  marginTop: "1.5rem",
                  padding: "1rem",
                  background: "var(--red)",
                  color: "#fff",
                  border: "none",
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: "1.5rem",
                  letterSpacing: "4px",
                  cursor: "none",
                  borderRadius: "2px",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#aa0000";
                  e.currentTarget.style.transform = "scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--red)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                🏴‍☠️ SET SAIL
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bounty overlay */}
      {showOverlay && (
        <div className="bounty-overlay" onClick={() => setShowOverlay(false)}>
          <div
            style={{
              background: "var(--cream)",
              border: "6px solid #8B6914",
              padding: "2.5rem 2rem",
              maxWidth: "360px",
              width: "90%",
              textAlign: "center",
              position: "relative",
              borderRadius: "2px",
              boxShadow: "0 0 100px rgba(255,215,0,0.3), 0 0 40px rgba(255,215,0,0.15)",
              animation: "posterIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                position: "absolute",
                top: 14, right: 14,
                color: "#CC0000",
                border: "3px solid #CC0000",
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "1rem",
                padding: "4px 10px",
                transform: "rotate(15deg)",
                letterSpacing: "3px",
              }}
            >
              ISSUED
            </div>
            <div
              style={{
                fontFamily: "'Pirata One', cursive",
                fontSize: "1.2rem",
                color: "#8B0000",
                letterSpacing: "4px",
                marginBottom: "0.5rem",
              }}
            >
              ☠ WANTED ☠
            </div>
            <div style={{ fontSize: "0.72rem", color: "#888", letterSpacing: "2px", marginBottom: "0.8rem" }}>
              DEAD OR ALIVE
            </div>
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                background: "linear-gradient(135deg,#2a2a2a,#555)",
                margin: "0 auto 1rem",
                border: "4px solid #8B6914",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "4rem",
              }}
            >
              🏴‍☠️
            </div>
            <div
              style={{
                fontFamily: "'Pirata One', cursive",
                fontSize: "1.8rem",
                color: "#333",
                marginBottom: "0.5rem",
              }}
            >
              {pirateNameInPoster}
            </div>
            <div
              style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "1.1rem",
                color: "#8B0000",
                letterSpacing: "2px",
              }}
            >
              BOUNTY: 100,000,000 ฿
            </div>
            <div style={{ fontSize: "0.72rem", color: "#888", marginTop: "0.5rem" }}>
              Registered for the Grand Line Event
            </div>
            <button
              onClick={() => setShowOverlay(false)}
              style={{
                marginTop: "1.5rem",
                background: "none",
                border: "none",
                color: "rgba(0,0,0,0.4)",
                fontSize: "0.85rem",
                cursor: "none",
                textDecoration: "underline",
              }}
            >
              Close and continue →
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 800px) {
          .join-grid { grid-template-columns: 1fr !important; }
        }
        @keyframes posterIn {
          from { transform: scale(0.7) rotate(-5deg); opacity: 0; }
          to { transform: scale(1) rotate(0deg); opacity: 1; }
        }
      `}</style>
    </>
  );
}
