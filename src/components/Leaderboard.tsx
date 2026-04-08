"use client";
import { useEffect, useState } from "react";

const PIRATES_BASE = [
  { name: "Monkey D. Coder",   crew: "Straw Hat Dev",    berries: 847,  status: "PITCHING" },
  { name: "Roronoa Dev",       crew: "Swordsman Stack",  berries: 720,  status: "PITCHING" },
  { name: "Nami.js",           crew: "Navigation UI",    berries: 666,  status: "IN LOBBY" },
  { name: "Sanji.py",          crew: "Backend Bistro",   berries: 577,  status: "PITCHING" },
  { name: "Chopper UI",        crew: "Med Tech Pirates", berries: 450,  status: "IN LOBBY" },
  { name: "Robin Backend",     crew: "Scholarly Stack",  berries: 390,  status: "PITCHING" },
  { name: "Franky Full-Stack", crew: "Shipwright Corp",  berries: 294,  status: "IN LOBBY" },
  { name: "Brook API",         crew: "Soul REST",        berries: 183,  status: "IN LOBBY" },
];

type Pirate = typeof PIRATES_BASE[0];

function shuffleLeaderboard(arr: Pirate[]): Pirate[] {
  const a = arr.map((p) => ({ ...p }));
  const swaps = Math.floor(Math.random() * 3) + 1;
  for (let s = 0; s < swaps; s++) {
    const i = Math.floor(Math.random() * (a.length - 2)) + 1;
    const j = i + 1;
    [a[i], a[j]] = [a[j], a[i]];
    a[i].berries += Math.floor(Math.random() * 15);
    a[j].berries = Math.max(a[j].berries - Math.floor(Math.random() * 10), 50);
  }
  return a.sort((a, b) => b.berries - a.berries);
}

export default function Leaderboard() {
  const [data, setData] = useState<Pirate[]>(PIRATES_BASE);

  useEffect(() => {
    const iv = setInterval(() => {
      setData((d) => shuffleLeaderboard(d));
    }, 4000);
    return () => clearInterval(iv);
  }, []);

  const rankClass = (i: number) => (i === 0 ? "rank1" : i === 1 ? "rank2" : i === 2 ? "rank3" : "");
  const rankPrefix = (i: number) => (i === 0 ? " 👑" : "");

  return (
    <section id="leaderboard" style={{ background: "var(--navy)", padding: "6rem 2rem" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div className="reveal" style={{ textAlign: "center", marginBottom: "3rem", position: "relative" }}>
          <div className="ghost-text">KINGS</div>
          <span className="section-tag">Updated Live</span>
          <h2 className="section-heading">Pirate King Rankings</h2>
          <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: "50ch", margin: "0 auto" }}>
            The board shuffles every few seconds. Don&apos;t blink.
          </p>
        </div>

        <div
          className="reveal"
          style={{
            background: "rgba(6,11,21,0.6)",
            border: "1px solid rgba(255,215,0,0.12)",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <table className="lb-table">
            <thead>
              <tr>
                <th style={{ width: "60px" }}>Rank</th>
                <th>Pirate</th>
                <th className="hide-mobile" style={{ width: "180px" }}>Crew</th>
                <th style={{ width: "130px" }}>Berries</th>
                <th style={{ width: "120px" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((p, i) => (
                <tr key={p.name} className={rankClass(i)}>
                  <td>
                    <span className="rank-num">
                      {i + 1}
                      {rankPrefix(i)}
                    </span>
                  </td>
                  <td>
                    <strong style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem" }}>
                      {p.name}
                    </strong>
                  </td>
                  <td
                    className="hide-mobile"
                    style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.82rem" }}
                  >
                    {p.crew}
                  </td>
                  <td>
                    <span
                      style={{
                        fontFamily: "'Bebas Neue', cursive",
                        fontSize: "1.1rem",
                        color: "var(--gold)",
                      }}
                    >
                      ฿{p.berries}M
                    </span>
                  </td>
                  <td>
                    {p.status === "PITCHING" ? (
                      <span className="status-live">PITCHING</span>
                    ) : (
                      <span className="status-lobby">IN LOBBY</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="reveal" style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <button
            className="btn-primary"
            onClick={() => document.getElementById("join")?.scrollIntoView({ behavior: "smooth" })}
          >
            JOIN TO CLAIM YOUR RANK →
          </button>
        </div>
      </div>

      <style>{`
        .hide-mobile { }
        @media (max-width: 600px) { .hide-mobile { display: none; } }
      `}</style>
    </section>
  );
}
