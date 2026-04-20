import { useState, useEffect } from "react";
import { Navbar, Footer } from "./components/ui.jsx";
import { Hero, APropos, Competences, Realisations, Veille, Contact } from "./components/HomePage.jsx";
import { ProjetDetail } from "./components/ProjetDetail.jsx";

export default function App() {
  // page: "home" | "projet"
  // pageId: id du projet si page === "projet"
  const [page, setPage] = useState("home");
  const [pageId, setPageId] = useState(null);

  const handleNavigate = (destination, id = null, anchor = null) => {
    setPage(destination);
    setPageId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Si on revient à home avec une ancre, on scroll après render
    if (destination === "home" && anchor) {
      setTimeout(() => {
        const el = document.querySelector(anchor);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  // Remettre le scroll en haut à chaque changement de page
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [page, pageId]);

  return (
    <div className="min-h-screen bg-slate-950 font-sans antialiased">
      <Navbar currentPage={page} onNavigate={handleNavigate} />

      {page === "home" && (
        <>
          <Hero onNavigate={handleNavigate} />
          <APropos />
          <Competences />
          <Realisations onNavigate={handleNavigate} />
          <Veille onNavigate={handleNavigate} />
          <Contact />
        </>
      )}

      {page === "projet" && pageId && (
        <ProjetDetail projetId={pageId} onNavigate={handleNavigate} />
      )}

      <Footer />
    </div>
  );
}
