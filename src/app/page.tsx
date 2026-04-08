"use client";
import Cursor from "../components/Cursor";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Story from "../components/Story";
import Features from "../components/Features";
import Leaderboard from "../components/Leaderboard";
import MapRoute from "../components/MapRoute";
import JoinCrew from "../components/JoinCrew";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Cursor />
      <Nav />
      <Hero />
      <Story />
      <Features />
      <Leaderboard />
      <MapRoute />
      <JoinCrew />
      <Footer />
    </>
  );
}
