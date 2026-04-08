"use client";
import { useEffect, useRef, useState } from "react";

function ChatDemo() {
  const [visible, setVisible] = useState<number[]>([]);
  const msgs = [
    { user: "Luffy.dev", text: "bro this pitch is INSANE 🔥" },
    { user: "Nami.js", text: "sending 500 berries rn no cap 💰" },
    { user: "Zoro3Swords", text: "we need this on the ship fr 🗡" },
  ];

  useEffect(() => {
    let idx = 0;
    const run = () => {
      setVisible([]);
      idx = 0;
      const timer = setInterval(() => {
        setVisible((v) => [...v, idx]);
        idx++;
        if (idx >= msgs.length) {
          clearInterval(timer);
          setTimeout(run, 2200);
        }
      }, 900);
      return () => clearInterval(timer);
    };
    const t = setTimeout(run, 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "1rem" }}>
      {msgs.map((m, i) => (
        <div
          key={i}
          className={`chat-msg ${visible.includes(i) ? "show" : ""}`}
        >
          <span className="ch">{m.user}: </span>
          {m.text}
        </div>
      ))}
    </div>
  );
}

const CARDS = [
  {
    large: true,
    icon: "🎙",
    subtitle: "Gomu Gomu no Stream · Paramecia",
    title: "REAL-TIME A/V PITCHING",
    desc: "Live pitch rooms powered by WebRTC. Your voice reaches every pirate instantly. Zero delay. Maximum impact.",
    extra: "waveform",
    delay: 0.05,
  },
  {
    large: false,
    icon: null,
    subtitle: "Paramecia Type",
    title: "BERRY ECONOMY",
    desc: "Earn, transfer, and flex your Berries. Real-time transactions that never lag.",
    extra: "coin",
    delay: 0.15,
  },
  {
    large: false,
    icon: "🏆",
    subtitle: "Logia Type",
    title: "LIVE LEADERBOARD",
    desc: "The Pirate King isn't crowned — it's earned. Watch rankings shift live as Berries flow.",
    extra: null,
    delay: 0.25,
  },
  {
    large: false,
    icon: "⚓",
    subtitle: "Zoan Type",
    title: "CREW LOBBY",
    desc: "See every active pirate. Chat. Strategize. Find your crew in the central port.",
    extra: null,
    delay: 0.1,
  },
  {
    large: false,
    icon: "🏝",
    subtitle: "Ancient Zoan",
    title: "ISLAND PITCH ROOMS",
    desc: "Each topic is an island. Navigate the archipelago and join what calls to you.",
    extra: null,
    delay: 0.2,
  },
  {
    large: true,
    icon: "🐌",
    subtitle: "Mythical Zoan · Den Den Mushi",
    title: "REAL-TIME CHAT",
    desc: "The sea is loud. React. Hype. Roast. Every room alive with pirate energy.",
    extra: "chat",
    delay: 0.3,
  },
];

export default function Features() {
  return (
    <section id="features" style={{ background: "var(--black)", padding: "6rem 2rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div
          className="reveal"
          style={{ textAlign: "center", marginBottom: "4rem", position: "relative" }}
        >
          <div className="ghost-text">POWERS</div>
          <span className="section-tag">Abilities Unlocked</span>
          <h2 className="section-heading">Devil Fruit Powers</h2>
          <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: "50ch", margin: "0 auto" }}>
            The abilities that will define your legend on the Grand Line.
          </p>
        </div>

        {/* Bento Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.2rem",
          }}
          className="bento-grid"
        >
          {CARDS.map((card, i) => (
            <div
              key={i}
              className="bento-card reveal"
              style={{
                gridColumn: card.large ? "span 2" : "span 1",
                transitionDelay: `${card.delay}s`,
              }}
            >
              {/* Icon */}
              {card.extra === "coin" ? (
                <div className="spin-coin" style={{ marginBottom: "1rem" }}>₿</div>
              ) : (
                card.icon && (
                  <span style={{ fontSize: "2.5rem", marginBottom: "1rem", display: "block" }}>
                    {card.icon}
                  </span>
                )
              )}

              <div
                style={{
                  fontSize: "0.72rem",
                  color: "var(--teal)",
                  textTransform: "uppercase",
                  letterSpacing: "3px",
                  marginBottom: "0.4rem",
                  marginTop: card.extra === "coin" ? "0" : undefined,
                }}
              >
                {card.subtitle}
              </div>
              <div
                style={{
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: "1.5rem",
                  color: "var(--gold)",
                  marginBottom: "0.75rem",
                  letterSpacing: "2px",
                }}
              >
                {card.title}
              </div>
              <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.75 }}>
                {card.desc}
              </p>

              {card.extra === "waveform" && (
                <div className="waveform" style={{ marginTop: "1rem" }}>
                  {[8, 18, 12, 26, 10, 22, 14, 18, 8, 22, 12, 28].map((h, idx) => (
                    <div
                      key={idx}
                      className="wbar"
                      style={{ height: `${h}px`, animationDelay: `${idx * 0.1}s` }}
                    />
                  ))}
                </div>
              )}
              {card.extra === "chat" && <ChatDemo />}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .bento-grid { grid-template-columns: 1fr 1fr !important; }
          .bento-grid .bento-card[style*="span 2"] { grid-column: span 2 !important; }
        }
        @media (max-width: 600px) {
          .bento-grid { grid-template-columns: 1fr !important; }
          .bento-grid .bento-card[style*="span 2"] { grid-column: span 1 !important; }
        }
      `}</style>
    </section>
  );
}
