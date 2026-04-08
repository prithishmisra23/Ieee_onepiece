"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "../hooks/useInView";

function Countdown() {
  const [time, setTime] = useState({ d: "00", h: "00", m: "00", s: "00" });

  useEffect(() => {
    const target = new Date("2026-01-25T09:00:00").getTime();
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTime({
        d: String(d).padStart(2, "0"),
        h: String(h).padStart(2, "0"),
        m: String(m).padStart(2, "0"),
        s: String(s).padStart(2, "0"),
      });
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div
      style={{
        background: "rgba(0,0,0,0.6)",
        border: "1px solid rgba(255,215,0,0.3)",
        borderRadius: "8px",
        padding: "1.5rem 2rem",
        textAlign: "center",
        marginTop: "2rem",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        style={{
          fontFamily: "'Bebas Neue', cursive",
          fontSize: "0.7rem",
          color: "var(--teal)",
          letterSpacing: "4px",
          marginBottom: "1rem",
        }}
      >
        ☠ TIME UNTIL DEPARTURE
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap" }}>
        {[
          { val: time.d, label: "Days" },
          { val: time.h, label: "Hours" },
          { val: time.m, label: "Minutes" },
          { val: time.s, label: "Seconds" },
        ].map(({ val, label }) => (
          <div key={label} style={{ textAlign: "center" }}>
            <span className="cd-num">{val}</span>
            <span className="cd-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MapRoute() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const shipRef = useRef<SVGGElement>(null);
  const inView = useInView(sectionRef, 0.3);
  const animated = useRef(false);

  useEffect(() => {
    if (inView && !animated.current) {
      animated.current = true;
      if (pathRef.current) pathRef.current.classList.add("draw");
      // Animate ship
      const trackPath = document.getElementById("trackPath") as SVGPathElement | null;
      if (!trackPath || !shipRef.current) return;
      const total = trackPath.getTotalLength();
      let pct = 0;
      const move = () => {
        pct = Math.min(pct + 0.003, 1);
        const pt = trackPath.getPointAtLength(pct * total);
        if (shipRef.current) {
          shipRef.current.setAttribute("transform", `translate(${pt.x - 14},${pt.y - 22})`);
        }
        if (pct < 1) requestAnimationFrame(move);
      };
      setTimeout(move, 400);
    }
  }, [inView]);

  return (
    <section id="map-section" ref={sectionRef} style={{ background: "var(--black)", padding: "6rem 2rem" }}>
      <div style={{ maxWidth: "1050px", margin: "0 auto" }}>
        <div className="reveal" style={{ textAlign: "center", marginBottom: "3rem", position: "relative" }}>
          <div className="ghost-text">VOYAGE</div>
          <span className="section-tag">Navigation Chart</span>
          <h2 className="section-heading">The Route</h2>
          <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: "50ch", margin: "0 auto" }}>
            Three seas. One path. The Grand Line doesn&apos;t wait for anyone.
          </p>
        </div>

        <div
          className="reveal"
          style={{
            background: "rgba(245,230,200,0.04)",
            border: "1px solid rgba(245,230,200,0.12)",
            borderRadius: "14px",
            padding: "3rem 2rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* dot grid texture */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "radial-gradient(circle, rgba(255,215,0,0.04) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
              pointerEvents: "none",
            }}
          />

          <svg
            viewBox="0 0 900 220"
            style={{ width: "100%", height: "auto", display: "block", position: "relative", zIndex: 1 }}
          >
            <defs>
              <marker id="arrowhead" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M0 0 L10 5 L0 10Z" fill="rgba(255,215,0,0.4)" />
              </marker>
            </defs>

            {/* Ghost route */}
            <path
              id="trackPath"
              d="M90 110 C220 65 320 155 450 110 C580 65 680 155 810 100"
              fill="none"
              stroke="rgba(255,215,0,0.15)"
              strokeWidth="2"
              strokeDasharray="12 7"
              markerEnd="url(#arrowhead)"
            />

            {/* Animated route */}
            <path
              ref={pathRef}
              className="route-path-anim"
              d="M90 110 C220 65 320 155 450 110 C580 65 680 155 810 100"
              fill="none"
              stroke="#FFD700"
              strokeWidth="2.5"
              opacity="0.8"
            />

            {/* Stop 1 — East Blue */}
            <circle cx="90" cy="110" r="13" fill="var(--navy)" stroke="#FFD700" strokeWidth="2" />
            <text x="90" y="114" textAnchor="middle" fill="#FFD700" fontFamily="Bebas Neue,cursive" fontSize="9">S</text>
            <text x="90" y="142" textAnchor="middle" fill="var(--cream)" fontFamily="Bebas Neue,cursive" fontSize="12">EAST BLUE</text>
            <text x="90" y="158" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontFamily="Inter,sans-serif" fontSize="9">Registration Open</text>

            {/* Stop 2 — Grand Line */}
            <circle cx="450" cy="110" r="16" fill="var(--navy)" stroke="#FFD700" strokeWidth="2.5" />
            <text x="450" y="115" textAnchor="middle" fill="#FFD700" fontFamily="Bebas Neue,cursive" fontSize="9">GL</text>
            <text x="450" y="142" textAnchor="middle" fill="var(--cream)" fontFamily="Bebas Neue,cursive" fontSize="13">GRAND LINE</text>
            <text x="450" y="158" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontFamily="Inter,sans-serif" fontSize="9">Event Day — Pitch Rooms Live</text>

            {/* Stop 3 — New World */}
            <circle cx="810" cy="100" r="18" fill="#FFD700" stroke="#8B6914" strokeWidth="2.5" />
            <text x="810" y="105" textAnchor="middle" fill="#060B15" fontFamily="Bebas Neue,cursive" fontSize="9">NW</text>
            <text x="810" y="135" textAnchor="middle" fill="#FFD700" fontFamily="Bebas Neue,cursive" fontSize="14">NEW WORLD</text>
            <text x="810" y="152" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontFamily="Inter,sans-serif" fontSize="9">Finals &amp; Crowning</text>

            {/* Ship */}
            <g ref={shipRef} transform="translate(76,88)">
              <text fontSize="24" y="0">⛵</text>
            </g>
          </svg>

          <Countdown />
        </div>
      </div>
    </section>
  );
}
