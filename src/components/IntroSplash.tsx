"use client";
import { useEffect, useRef, useState } from "react";

export default function IntroSplash() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  const dismiss = () => {
    if (fading) return;
    setFading(true);
    setTimeout(() => setVisible(false), 900);
  };

  useEffect(() => {
    // Fades out after 9 seconds automatically just in case
    const t = setTimeout(dismiss, 9000);
    const vid = videoRef.current;
    
    const handleEnded = () => {
      dismiss();
    };

    vid?.addEventListener("ended", handleEnded);
    return () => { 
      clearTimeout(t); 
      vid?.removeEventListener("ended", handleEnded); 
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <div
      onClick={dismiss}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        backgroundColor: "#000",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.9s ease",
        cursor: "pointer", // Added pointer to indicate it's clickable
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* FULL-SCREEN VIDEO */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover", // Essential: guarantees it fills bounds correctly
          zIndex: 0,
        }}
      >
        <source src="/water-bg.mp4" type="video/mp4" />
      </video>

      {/* SUBTLE OVERLAY FOR TYPOGRAPHY */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.8) 100%)",
          zIndex: 1,
          pointerEvents: "none"
        }}
      />

      {/* TOP & BOTTOM CINEMATIC BARS */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "10vh", background: "#000", zIndex: 2 }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "10vh", background: "#000", zIndex: 2 }} />

      {/* SPLASH CONTENT ABOVE VIDEO */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          animation: "splashPulse 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        }}
      >
        {/* SKULL ICON */}
        <div style={{
          fontSize: "4rem",
          marginBottom: "1rem",
          filter: "drop-shadow(0 0 30px rgba(232,195,58,0.9))",
        }}>
          ☠
        </div>

        {/* TAP TO SKIP TEXT */}
        <div style={{
          marginTop: "1.5rem",
          fontFamily: "'Cinzel', serif",
          fontSize: "0.75rem",
          letterSpacing: "4px",
          color: "rgba(255,255,255,0.5)",
          textTransform: "uppercase",
          animation: "blinkOpacity 3s infinite",
        }}>
          Tap anywhere to skip
        </div>
      </div>

      <style>{`
        @keyframes splashPulse {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes blinkOpacity {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
