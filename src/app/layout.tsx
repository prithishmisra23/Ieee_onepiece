import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grand Line Event — Pitch. Compete. Conquer. | IEEE",
  description:
    "Grand Line Event — the One Piece–themed live event platform where pirates compete, pitch ideas, and conquer the sea. An IEEE Initiative.",
  keywords: ["IEEE", "One Piece", "Grand Line", "hackathon", "pitch event"],
  openGraph: {
    title: "Grand Line Event",
    description: "Pitch. Compete. Conquer. An IEEE Initiative.",
    type: "website",
  },
};

const OBSERVER_SCRIPT = `
(function(){
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting) e.target.classList.add('visible');
    });
  },{threshold:0.12});
  function init(){
    document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(function(el){obs.observe(el);});
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
  else init();
  var mo = new MutationObserver(function(){
    document.querySelectorAll('.reveal:not([data-obs]),.reveal-left:not([data-obs]),.reveal-right:not([data-obs])').forEach(function(el){
      el.setAttribute('data-obs','1');
      obs.observe(el);
    });
  });
  mo.observe(document.body,{childList:true,subtree:true});
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <script dangerouslySetInnerHTML={{ __html: OBSERVER_SCRIPT }} />
      </body>
    </html>
  );
}
