"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "../hooks/useInView";

const panels = [
  {
    num: "01",
    icon: "🏴‍☠️",
    title: "REGISTER AS A PIRATE",
    text: "Every legend starts somewhere. Create your crew profile, claim your pirate name, and step onto the Grand Line. No devil fruit required — just your ideas.",
    bg: "radial-gradient(ellipse at 30% 50%, rgba(0,151,167,0.1), transparent 60%)",
    extra: null,
  },
  {
    num: "02",
    icon: "⚓",
    title: "ENTER THE LOBBY",
    text: "The central port. See every active pirate in real time. Watch the live leaderboard shift. Form alliances. The sea is full of rivals — and potential crewmates.",
    bg: "radial-gradient(ellipse at 70% 50%, rgba(255,215,0,0.07), transparent 60%)",
    extra: "lobby",
  },
  {
    num: "03",
    icon: "🎤",
    title: "PITCH ON AN ISLAND",
    text: "Each pitch room is an island. Step onto the stage, speak your idea, and let the crew judge. Live audio and video. Real reactions. The Grand Line is merciless — only the bold survive.",
    bg: "radial-gradient(ellipse at 30% 50%, rgba(204,0,0,0.09), transparent 60%)",
    extra: null,
  },
  {
    num: "04",
    icon: "💰",
    title: "EARN BERRIES. RULE THE SEA.",
    text: "Every vote, every pitch, every interaction earns you Berries. Transfer them. Flex them. Watch your name climb the leaderboard. The Pirate King isn't a title — it's a score.",
    bg: "radial-gradient(ellipse at 70% 50%, rgba(255,215,0,0.09), transparent 60%)",
    extra: "berries",
  },
];

function CoinCounter() {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.5);
  const started = useRef(false);

  useEffect(() => {
    if (inView && !started.current) {
      started.current = true;
      const target = 50000000;
      const step = Math.ceil(target / 80);
      const iv = setInterval(() => {
        setValue((v) => {
          const next = Math.min(v + step, target);
          if (next >= target) clearInterval(iv);
          return next;
        });
      }, 25);
    }
  }, [inView]);

  return (
    <div ref={ref}>
      <div
        style={{
          fontFamily: "'Bebas Neue', cursive",
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          color: "var(--gold)",
          marginTop: "1rem",
          textShadow: "0 0 20px rgba(255,215,0,0.4)",
        }}
      >
        {value.toLocaleString()} ฿
      </div>
      <div style={{ fontSize: "0.7rem", color: "rgba(255,215,0,0.5)", letterSpacing: "2px" }}>
        BERRIES EARNED THIS SEASON
      </div>
    </div>
  );
}

function CoinRain() {
  const coins = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 5,
  }));
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {coins.map((c) => (
        <div
          key={c.id}
          className="coin-particle"
          style={{
            left: `${c.left}%`,
            top: "-20px",
            animationDuration: `${c.duration}s`,
            animationDelay: `${c.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function Story() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activePanel, setActivePanel] = useState(0);

  const scrollTo = (i: number) => {
    if (trackRef.current) {
      trackRef.current.scrollTo({ left: i * window.innerWidth, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const i = Math.round(track.scrollLeft / window.innerWidth);
      setActivePanel(i);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="story"
      style={{ background: "var(--navy)", paddingTop: "5rem", paddingBottom: "3rem" }}
    >
      {/* Header */}
      <div
        className="reveal"
        style={{ textAlign: "center", padding: "0 2rem 2.5rem", position: "relative" }}
      >
        <div className="ghost-text" style={{ fontSize: "clamp(4rem,14vw,10rem)" }}>VOYAGE</div>
        <span className="section-tag">Chapter by Chapter</span>
        <h2 className="section-heading">Your Voyage</h2>
        <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: "50ch", margin: "0 auto" }}>
          Four panels. One destiny. This is how legends are made on the Grand Line.
        </p>
      </div>

      {/* Manga track */}
      <div ref={trackRef} className="manga-track">
        {panels.map((p, i) => (
          <div
            key={i}
            className="manga-panel"
            style={{
              minHeight: "70vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "3rem 2rem",
              background: p.bg,
              borderRight: "2px solid rgba(255,215,0,0.12)",
              position: "relative",
            }}
          >
            {/* Chapter number */}
            <div
              style={{
                position: "absolute",
                top: "1rem",
                left: "1.5rem",
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "8rem",
                color: "rgba(255,215,0,0.06)",
                lineHeight: 1,
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              {p.num}
            </div>

            {p.extra === "berries" && <CoinRain />}

            <div style={{ maxWidth: "460px", position: "relative", zIndex: 1 }}>
              <span style={{ fontSize: "3.5rem", marginBottom: "1.2rem", display: "block" }}>
                {p.icon}
              </span>
              <h3
                style={{
                  fontFamily: "'Pirata One', cursive",
                  fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                  color: "var(--gold)",
                  marginBottom: "1rem",
                  lineHeight: 1.1,
                }}
              >
                {p.title}
              </h3>
              <p style={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.85, fontSize: "1rem" }}>
                {p.text}
              </p>

              {p.extra === "lobby" && (
                <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
                  <span className="status-live">47 Pirates Online</span>
                  <span style={{ fontSize: "0.78rem", color: "var(--gold)" }}>🏝 12 Islands Active</span>
                </div>
              )}
              {p.extra === "berries" && <CoinCounter />}
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: "0.6rem", marginTop: "1.5rem" }}>
        {panels.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: activePanel === i ? "var(--gold)" : "rgba(255,215,0,0.2)",
              border: "none",
              cursor: "none",
              transition: "background 0.3s",
              padding: 0,
            }}
          />
        ))}
      </div>
    </section>
  );
}
