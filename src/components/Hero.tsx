"use client";
import { useEffect, useRef, useState } from "react";

const TYPEWRITER_WORDS = [
  "PITCH. COMPETE. CONQUER.",
  "EARN BERRIES. RULE THE SEA.",
  "THE GRAND LINE AWAITS YOU.",
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [typed, setTyped] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  // Canvas wave animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let t = 0;
    let animId: number;

    const particles: { x: number; y: number; s: number; sp: number }[] = [];
    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * 2000,
        y: Math.random() * 1000,
        s: Math.random() * 1.5 + 0.4,
        sp: Math.random() * 0.35 + 0.08,
      });
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const waves = [
      { amp: 22, freq: 0.011, speed: 0.016, yFrac: 0.68, alpha: 0.18, color: "#051428" },
      { amp: 30, freq: 0.008, speed: 0.011, yFrac: 0.72, alpha: 0.22, color: "#071830" },
      { amp: 18, freq: 0.018, speed: 0.023, yFrac: 0.78, alpha: 0.14, color: "#0097A7" },
      { amp: 14, freq: 0.025, speed: 0.032, yFrac: 0.84, alpha: 0.18, color: "#071020" },
      { amp: 10, freq: 0.033, speed: 0.044, yFrac: 0.90, alpha: 0.28, color: "#040C18" },
      { amp: 8,  freq: 0.042, speed: 0.056, yFrac: 0.95, alpha: 0.6,  color: "#030A14" },
    ];

    // Ripple texture lines for realistic water look
    const ripples: { y: number; phase: number; speed: number }[] = [];
    for (let i = 0; i < 30; i++) {
      ripples.push({
        y: Math.random() * 0.6 + 0.1,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.008 + 0.003,
      });
    }

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // Deep ocean base gradient
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, "#020810");
      grad.addColorStop(0.3, "#040D1C");
      grad.addColorStop(0.6, "#061224");
      grad.addColorStop(1, "#030A14");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Subtle light shimmer (moonlight on water)
      const shimmer = ctx.createRadialGradient(W * 0.5, H * 0.3, 0, W * 0.5, H * 0.3, W * 0.6);
      shimmer.addColorStop(0, "rgba(0, 151, 167, 0.04)");
      shimmer.addColorStop(0.5, "rgba(255,215,0,0.015)");
      shimmer.addColorStop(1, "transparent");
      ctx.fillStyle = shimmer;
      ctx.fillRect(0, 0, W, H);

      // Ripple lines (horizontal water texture)
      ctx.save();
      ripples.forEach((r) => {
        const yPos = H * r.y + Math.sin(t * r.speed + r.phase) * 6;
        ctx.beginPath();
        for (let x = 0; x < W; x += 3) {
          const yy = yPos + Math.sin(x * 0.025 + t * 0.02 + r.phase) * 4;
          if (x === 0) ctx.moveTo(x, yy);
          else ctx.lineTo(x, yy);
        }
        ctx.strokeStyle = `rgba(255,255,255,${0.012 + Math.sin(t * 0.015 + r.phase) * 0.006})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      });
      ctx.restore();

      // Wave layers
      waves.forEach((w) => {
        ctx.beginPath();
        ctx.moveTo(0, H);
        for (let x = 0; x <= W; x += 3) {
          const y =
            H * w.yFrac +
            Math.sin(x * w.freq + t * w.speed) * w.amp +
            Math.sin(x * w.freq * 0.7 + t * w.speed * 1.4) * (w.amp * 0.35);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(W, H);
        ctx.lineTo(0, H);
        ctx.closePath();
        ctx.fillStyle = w.color;
        ctx.globalAlpha = w.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Foam crests (bright tips on top wave)
      ctx.beginPath();
      for (let x = 0; x < W; x += 3) {
        const y =
          H * waves[5].yFrac +
          Math.sin(x * waves[5].freq + t * waves[5].speed) * waves[5].amp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Sea spray particles
      ctx.fillStyle = "rgba(255,255,255,0.55)";
      particles.forEach((p) => {
        p.y -= p.sp;
        p.x += Math.sin(t * 0.012 + p.x * 0.01) * 0.3;
        if (p.y < -10) p.y = canvas.height + 10;
        ctx.beginPath();
        ctx.arc(p.x % W, p.y, p.s, 0, Math.PI * 2);
        ctx.fill();
      });

      t++;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Typewriter
  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const word = TYPEWRITER_WORDS[wordIdx];
        if (!deleting) {
          setTyped(word.slice(0, charIdx + 1));
          if (charIdx + 1 === word.length) {
            setTimeout(() => setDeleting(true), 1800);
          } else {
            setCharIdx((c) => c + 1);
          }
        } else {
          setTyped(word.slice(0, charIdx - 1));
          if (charIdx - 1 === 0) {
            setDeleting(false);
            setWordIdx((w) => (w + 1) % TYPEWRITER_WORDS.length);
            setCharIdx(0);
          } else {
            setCharIdx((c) => c - 1);
          }
        }
      },
      deleting ? 55 : 90
    );
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx]);

  // Hero entrance
  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Canvas ocean */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}
      />

      {/* Vignette overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(2,8,16,0.7) 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* BIG background Jolly Roger */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
          opacity: 0.055,
          animation: "spin 50s linear infinite",
          filter: "drop-shadow(0 0 40px rgba(255,215,0,0.15))",
        }}
      >
        <svg width="500" height="500" viewBox="0 0 500 500" fill="none">
          {/* Skull */}
          <circle cx="250" cy="195" r="110" stroke="#FFD700" strokeWidth="3" />
          <ellipse cx="215" cy="178" rx="22" ry="27" fill="#FFD700" />
          <ellipse cx="285" cy="178" rx="22" ry="27" fill="#FFD700" />
          <circle cx="215" cy="178" r="11" fill="#060B15" />
          <circle cx="285" cy="178" r="11" fill="#060B15" />
          <path d="M220 228 Q250 248 280 228 Q268 268 250 271 Q232 268 220 228Z" fill="#FFD700" />
          {/* Bones */}
          <line x1="120" y1="340" x2="380" y2="340" stroke="#FFD700" strokeWidth="8" strokeLinecap="round" />
          <ellipse cx="120" cy="340" rx="16" ry="10" fill="#FFD700" />
          <ellipse cx="380" cy="340" rx="16" ry="10" fill="#FFD700" />
          <line x1="250" y1="325" x2="250" y2="435" stroke="#FFD700" strokeWidth="6" />
          <ellipse cx="250" cy="430" rx="18" ry="11" fill="#FFD700" />
          <ellipse cx="250" cy="323" rx="18" ry="11" fill="#FFD700" />
        </svg>
      </div>

      {/* Floating wanted poster cards */}
      <div
        className="wanted-card"
        style={{
          top: "18%",
          left: "4%",
          animation: "floatCard1 9s ease-in-out infinite",
        }}
      >
        <div className="w-stamp">WANTED</div>
        <div className="w-title">W A N T E D</div>
        <div className="w-avatar" style={{ background: "linear-gradient(135deg,#2a2a2a,#444)" }}>
          🏴‍☠️
        </div>
        <div className="w-name">MONKEY D. CODER</div>
        <div className="w-bounty">BOUNTY: ??? BERRIES</div>
      </div>
      <div
        className="wanted-card"
        style={{
          top: "22%",
          right: "4%",
          animation: "floatCard2 11s ease-in-out infinite",
          animationDelay: "-4s",
        }}
      >
        <div className="w-stamp">WANTED</div>
        <div className="w-title">W A N T E D</div>
        <div className="w-avatar" style={{ background: "linear-gradient(135deg,#1a1a2e,#3d3d6e)" }}>
          ⚔️
        </div>
        <div className="w-name">RORONOA DEV</div>
        <div className="w-bounty">BOUNTY: ??? BERRIES</div>
      </div>
      <div
        className="wanted-card"
        style={{
          bottom: "22%",
          left: "6%",
          animation: "floatCard1 8s ease-in-out infinite",
          animationDelay: "-6s",
        }}
      >
        <div className="w-stamp">WANTED</div>
        <div className="w-title">W A N T E D</div>
        <div className="w-avatar" style={{ background: "linear-gradient(135deg,#1e3a2f,#2d6e4e)" }}>
          🗺️
        </div>
        <div className="w-name">NAMI.JS</div>
        <div className="w-bounty">BOUNTY: ??? BERRIES</div>
      </div>

      {/* Hero content */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          textAlign: "center",
          padding: "0 1.5rem",
          maxWidth: "900px",
        }}
      >
        {/* Grand Line Event logo area */}
        <div
          style={{
            fontFamily: "'Pirata One', cursive",
            fontSize: "clamp(0.7rem, 1.5vw, 1rem)",
            color: "var(--teal)",
            letterSpacing: "8px",
            textTransform: "uppercase",
            marginBottom: "1rem",
            opacity: heroVisible ? 1 : 0,
            transition: "opacity 1s ease 0.2s",
          }}
        >
          ✦ AN IEEE INITIATIVE ✦
        </div>

        <h1
          style={{
            fontFamily: "'Pirata One', cursive",
            fontSize: "clamp(4.5rem, 13vw, 11rem)",
            color: "var(--gold)",
            lineHeight: 0.9,
            textShadow: "0 0 80px rgba(255,215,0,0.2), 0 0 20px rgba(255,215,0,0.1)",
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateX(0)" : "translateX(-80px)",
            transition: "opacity 0.9s ease 0.4s, transform 0.9s ease 0.4s",
            letterSpacing: "-2px",
          }}
        >
          SET SAIL.
        </h1>

        <div
          style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: "clamp(1.4rem, 3.5vw, 2.8rem)",
            color: "var(--cream)",
            letterSpacing: "6px",
            margin: "1rem 0 0.5rem",
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.9s ease 1s, transform 0.9s ease 1s",
          }}
        >
          THE GRAND LINE AWAITS.
        </div>

        <div
          style={{
            fontFamily: "'Inter', monospace",
            fontSize: "clamp(0.85rem, 1.8vw, 1.15rem)",
            color: "var(--teal)",
            letterSpacing: "3px",
            textTransform: "uppercase",
            minHeight: "1.8em",
            opacity: heroVisible ? 1 : 0,
            transition: "opacity 0.8s ease 1.8s",
          }}
        >
          {typed}
          <span
            style={{
              borderRight: "2px solid var(--teal)",
              marginLeft: "2px",
              animation: "blink 0.8s step-end infinite",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            marginTop: "2.5rem",
            flexWrap: "wrap",
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.9s ease 2.2s, transform 0.9s ease 2.2s",
          }}
        >
          <button
            className="btn-primary"
            onClick={() => document.getElementById("join")?.scrollIntoView({ behavior: "smooth" })}
          >
            JOIN THE CREW →
          </button>
          <button
            className="btn-ghost"
            onClick={() => document.getElementById("story")?.scrollIntoView({ behavior: "smooth" })}
          >
            EXPLORE THE SEAS
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          animation: "bounce 2s ease-in-out infinite",
          opacity: 0.7,
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="10" r="5" stroke="#FFD700" strokeWidth="2" />
          <line x1="16" y1="15" x2="16" y2="22" stroke="#FFD700" strokeWidth="2" />
          <path d="M11 19 L16 24 L21 19" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      </div>

      <style>{`
        @keyframes floatCard1 {
          0%,100% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-22px) rotate(-1deg); }
        }
        @keyframes floatCard2 {
          0%,100% { transform: translateY(0) rotate(4deg); }
          50% { transform: translateY(-16px) rotate(2deg); }
        }
        @keyframes spin { to { transform: translate(-50%,-50%) rotate(360deg); } }
        @keyframes bounce {
          0%,100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(10px); }
        }
        @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
      `}</style>
    </section>
  );
}
