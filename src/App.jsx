import { useState, useEffect } from "react";
import { Navbar, Footer, ThemeWrapper } from "./components/ui.jsx";
import { Hero, APropos, Competences, Realisations, Veille, Contact, TableauSynthese } from "./components/HomePage.jsx";
import { ProjetDetail } from "./components/ProjetDetail.jsx";
import { EntrepriseDetail } from "./components/EntrepriseDetail.jsx";

export default function App() {
  const [page, setPage] = useState("home");
  const [pageId, setPageId] = useState(null);

  const handleNavigate = (destination, id = null, anchor = null) => {
    setPage(destination);
    setPageId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (destination === "home" && anchor) {
      setTimeout(() => {
        const el = document.querySelector(anchor);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [page, pageId]);

  return (
    <ThemeWrapper>
      <div className="min-h-screen bg-slate-950 font-sans antialiased">
        <Navbar currentPage={page} onNavigate={handleNavigate} />
        {page === "home" && (
          <>
            <Hero onNavigate={handleNavigate} />
            <APropos onNavigate={handleNavigate} />
            <Competences />
            <Realisations onNavigate={handleNavigate} />
            <Veille onNavigate={handleNavigate} />
            <TableauSynthese />
            <Contact />
          </>
        )}
        {page === "projet" && pageId && (
          <ProjetDetail projetId={pageId} onNavigate={handleNavigate} />
        )}
        {page === "entreprise" && pageId && (
          <EntrepriseDetail entrepriseNom={pageId} onNavigate={handleNavigate} />
        )}
        <Footer />
      </div>
    </ThemeWrapper>
  );
}
