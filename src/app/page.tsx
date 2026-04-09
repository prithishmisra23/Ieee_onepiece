"use client";
import Cursor from "../components/Cursor";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Posters from "../components/Posters";
import EventHighlights from "../components/EventHighlights";
import Sponsors from "../components/Sponsors";
import JoinCrew from "../components/JoinCrew";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Cursor />
      <Nav />
      <Hero />
      <Posters />
      <EventHighlights />
      <Sponsors />
      <JoinCrew />
      <Footer />
    </>
  );
}
