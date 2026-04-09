"use client";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  ["posters",  "Posters"],
  ["features", "Powers"],
  ["sponsors", "Partners"],
  ["join",     "Register"],
];

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
          padding: "0.9rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
          background: scrolled ? "rgba(3,9,18,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(232,195,58,0.1)" : "none",
        }}
      >
        {/* Logo / Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            cursor: "none",
          }}
          onClick={() => scrollTo("hero")}
        >
          <span style={{ fontSize: "1.4rem", filter: "drop-shadow(0 0 8px rgba(232,195,58,0.5))" }}>
            ☠
          </span>
          <div style={{ lineHeight: 1.1 }}>
            <div
              style={{
                fontFamily: "'Pirata One', cursive",
                fontSize: "1.25rem",
                color: "var(--gold)",
                letterSpacing: "1px",
              }}
            >
              IEEE EVENTS
            </div>
            <div
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.55rem",
                color: "var(--teal)",
                letterSpacing: "3px",
                textTransform: "uppercase",
              }}
            >
              The Grand Line
            </div>
          </div>
        </div>

        {/* Desktop links */}
        <ul
          style={{ display: "flex", gap: "2rem", listStyle: "none", margin: 0 }}
          className="hidden md:flex"
        >
          {NAV_ITEMS.map(([id, label]) => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                style={{
                  background: "none",
                  border: "none",
                  color: "rgba(248,248,248,0.6)",
                  fontSize: "0.72rem",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  cursor: "none",
                  transition: "color 0.3s",
                  fontFamily: "'Cinzel', serif",
                  fontWeight: 400,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(248,248,248,0.6)")}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        <button
          className="btn-primary hidden md:inline-flex"
          onClick={() => scrollTo("join")}
          style={{ fontSize: "0.75rem", padding: "0.55rem 1.3rem", letterSpacing: "3px" }}
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
          {[0, 1, 2].map((i) => (
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
          {NAV_ITEMS.map(([id, label]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                background: "none",
                border: "none",
                color: "rgba(248,248,248,0.8)",
                fontSize: "1.1rem",
                fontFamily: "'Cinzel', serif",
                letterSpacing: "3px",
                cursor: "none",
                textAlign: "left",
                textTransform: "uppercase",
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
