"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const lastX = useRef(0);
  const lastY = useRef(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const dx = e.clientX - lastX.current;
      const dy = e.clientY - lastY.current;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 14}px, ${e.clientY - 14}px) rotate(${angle}deg)`;
      }
      lastX.current = e.clientX;
      lastY.current = e.clientY;
    };
    document.addEventListener("mousemove", move);
    return () => document.removeEventListener("mousemove", move);
  }, []);

  return (
    <div id="cursor" ref={cursorRef}>
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path
          d="M14 2 L17 11 L26 14 L17 17 L14 26 L11 17 L2 14 L11 11 Z"
          fill="#FFD700"
          stroke="#8B6914"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
