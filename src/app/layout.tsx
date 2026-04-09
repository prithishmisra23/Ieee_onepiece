import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IEEE Events — The Grand Line | Pitch. Compete. Conquer.",
  description:
    "IEEE Events: The Grand Line — a One Piece–themed innovation event where pirates pitch ideas, compete for Berries, and conquer the seas. An IEEE Initiative.",
  keywords: ["IEEE", "IEEE Events", "One Piece", "Grand Line", "hackathon", "pitch event", "startup", "innovation"],
  openGraph: {
    title: "IEEE Events — The Grand Line",
    description: "Pitch. Compete. Conquer. Set Sail on the Grand Line.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
