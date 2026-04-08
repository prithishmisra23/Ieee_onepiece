"use client";
import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          padding: "1rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "all 0.4s",
          background: scrolled ? "rgba(6,11,21,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,215,0,0.15)" : "none",
        }}
      >
        <div
          style={{
            fontFamily: "'Pirata One', cursive",
            fontSize: "1.6rem",
            color: "var(--gold)",
            letterSpacing: "2px",
            cursor: "none",
          }}
          onClick={() => scrollTo("hero")}
        >
          ☠ GRAND LINE
        </div>

        {/* Desktop links */}
        <ul
          style={{
            display: "flex",
            gap: "2rem",
            listStyle: "none",
            margin: 0,
          }}
          className="hidden md:flex"
        >
          {[
            ["story", "Story"],
            ["features", "Powers"],
            ["leaderboard", "Rankings"],
            ["map-section", "Schedule"],
          ].map(([id, label]) => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                style={{
                  background: "none",
                  border: "none",
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "0.85rem",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  cursor: "none",
                  transition: "color 0.3s",
                  fontFamily: "'Inter', sans-serif",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        <button
          className="btn-primary hidden md:inline-flex"
          onClick={() => scrollTo("join")}
          style={{ fontSize: "1rem", padding: "0.6rem 1.4rem" }}
        >
          JOIN CREW
        </button>

        {/* Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          style={{
            background: "none",
            border: "none",
            cursor: "none",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            padding: "0.5rem",
          }}
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              style={{
                display: "block",
                width: "24px",
                height: "2px",
                background: "var(--gold)",
                borderRadius: "2px",
                transition: "all 0.3s",
                transform:
                  open && i === 0
                    ? "rotate(45deg) translateY(7px)"
                    : open && i === 2
                    ? "rotate(-45deg) translateY(-7px)"
                    : open && i === 1
                    ? "scaleX(0)"
                    : "none",
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="nav-mobile-menu md:hidden">
          {[
            ["story", "Story"],
            ["features", "Powers"],
            ["leaderboard", "Rankings"],
            ["map-section", "Schedule"],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.8)",
                fontSize: "1.2rem",
                fontFamily: "'Bebas Neue', cursive",
                letterSpacing: "3px",
                cursor: "none",
                textAlign: "left",
              }}
            >
              {label}
            </button>
          ))}
          <button
            className="btn-primary"
            onClick={() => scrollTo("join")}
            style={{ width: "100%", justifyContent: "center" }}
          >
            JOIN CREW
          </button>
        </div>
      )}
    </>
  );
}
