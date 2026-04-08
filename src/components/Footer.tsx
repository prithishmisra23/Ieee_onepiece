"use client";

const NAV_LINKS = [
  { label: "The Story", href: "#story" },
  { label: "Devil Fruits", href: "#features" },
  { label: "Rankings", href: "#leaderboard" },
  { label: "Schedule", href: "#map-section" },
];
const CREW_LINKS = [
  { label: "About IEEE", href: "#" },
  { label: "Event Rules", href: "#" },
  { label: "FAQ", href: "#" },
  { label: "Contact", href: "#" },
];

export default function Footer() {
  return (
    <footer style={{ background: "#02050A", paddingTop: "0", borderTop: "1px solid rgba(255,215,0,0.08)" }}>
      {/* Wave */}
      <div style={{ overflow: "hidden", lineHeight: 0 }}>
        <svg viewBox="0 0 1200 60" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "60px" }}>
          <path d="M0 40 C200 10 400 58 600 28 C800 0 1000 50 1200 18 L1200 0 L0 0Z" fill="rgba(255,215,0,0.04)" />
        </svg>
      </div>

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "3rem 2rem",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr",
          gap: "3rem",
        }}
        className="footer-grid"
      >
        {/* Brand */}
        <div>
          <div
            style={{
              fontFamily: "'Pirata One', cursive",
              fontSize: "2rem",
              color: "var(--gold)",
              marginBottom: "0.75rem",
            }}
          >
            ☠ GRAND LINE
          </div>
          <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.75, maxWidth: "26ch" }}>
            An IEEE Initiative.<br />Pirate Spirit. Real Innovation.<br />Set sail and find your One Piece.
          </p>
          {/* Social icons */}
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
            {/* X / Twitter */}
            <a
              href="#"
              style={{
                width: "38px",
                height: "38px",
                border: "1px solid rgba(255,215,0,0.2)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255,255,255,0.45)",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--gold)";
                e.currentTarget.style.color = "var(--gold)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,215,0,0.2)";
                e.currentTarget.style.color = "rgba(255,255,255,0.45)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="#"
              style={{
                width: "38px",
                height: "38px",
                border: "1px solid rgba(255,215,0,0.2)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255,255,255,0.45)",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--gold)";
                e.currentTarget.style.color = "var(--gold)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,215,0,0.2)";
                e.currentTarget.style.color = "rgba(255,255,255,0.45)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="#"
              style={{
                width: "38px",
                height: "38px",
                border: "1px solid rgba(255,215,0,0.2)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255,255,255,0.45)",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--gold)";
                e.currentTarget.style.color = "var(--gold)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,215,0,0.2)";
                e.currentTarget.style.color = "rgba(255,255,255,0.45)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Navigate */}
        <div>
          <h4
            style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "0.9rem",
              color: "var(--teal)",
              letterSpacing: "3px",
              marginBottom: "1rem",
            }}
          >
            Navigate
          </h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a className="footer-link" href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Crew */}
        <div>
          <h4
            style={{
              fontFamily: "'Bebas Neue', cursive",
              fontSize: "0.9rem",
              color: "var(--teal)",
              letterSpacing: "3px",
              marginBottom: "1rem",
            }}
          >
            Crew
          </h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
            {CREW_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a className="footer-link" href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          textAlign: "center",
          padding: "1.5rem 2rem",
          fontSize: "0.78rem",
          color: "rgba(255,255,255,0.2)",
          fontStyle: "italic",
        }}
      >
        © 2025 Grand Line Event. All rights reserved. Eiichiro Oda would be proud. ⚓
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
    </footer>
  );
}
