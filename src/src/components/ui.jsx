import { useState, useEffect } from "react";

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
export function Navbar({ currentPage, onNavigate }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = currentPage === "home"
    ? [
        { label: "Accueil", href: "#accueil" },
        { label: "À propos", href: "#apropos" },
        { label: "Compétences", href: "#competences" },
        { label: "Réalisations", href: "#realisations" },
        { label: "Veille", href: "#veille" },
        { label: "Synthèse", href: "#tableau" },
        { label: "Contact", href: "#contact" },
      ]
    : [];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-slate-900/97 backdrop-blur-md shadow-xl shadow-black/20" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white font-black text-sm group-hover:bg-sky-400 transition-colors">
            M
          </div>
          <span className="text-white font-bold tracking-tight">Mehdi A.</span>
          <span className="text-slate-500 text-sm font-normal hidden sm:inline">· Portfolio</span>
        </button>

        <ul className="hidden md:flex gap-1 text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-slate-400 hover:text-white hover:bg-slate-800 px-3 py-1.5 rounded-lg transition-all font-medium">
                {l.label}
              </a>
            </li>
          ))}
          {currentPage !== "home" && (
            <li>
              <button
                onClick={() => onNavigate("home")}
                className="text-slate-400 hover:text-white hover:bg-slate-800 px-3 py-1.5 rounded-lg transition-all font-medium flex items-center gap-1"
              >
                ← Accueil
              </button>
            </li>
          )}
        </ul>

        <button className="md:hidden text-slate-300 p-2" onClick={() => setOpen(!open)}>
          {open
            ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          }
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-slate-900/98 border-t border-slate-800">
          <ul className="flex flex-col px-6 py-4 gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="block text-slate-300 hover:text-sky-400 py-2 transition-colors font-medium" onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              </li>
            ))}
            {currentPage !== "home" && (
              <li>
                <button onClick={() => { onNavigate("home"); setOpen(false); }} className="text-slate-300 hover:text-sky-400 py-2 transition-colors font-medium">
                  ← Retour à l'accueil
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

// ─── SECTION WRAPPER ─────────────────────────────────────────────────────────
export function Section({ id, title, subtitle, children, dark = false, className = "" }) {
  return (
    <section id={id} className={`py-24 ${dark ? "bg-slate-900" : "bg-slate-950"} ${className}`}>
      <div className="max-w-6xl mx-auto px-6">
        {title && (
          <div className="mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">{title}</h2>
            {subtitle && <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">{subtitle}</p>}
            <div className="mt-5 flex items-center gap-3">
              <div className="w-12 h-0.5 bg-sky-500 rounded-full" />
              <div className="w-3 h-0.5 bg-sky-500/40 rounded-full" />
            </div>
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

// ─── BADGE TECHNOLOGIE ───────────────────────────────────────────────────────
export function TechBadge({ label, small = false }) {
  return (
    <span className={`bg-sky-500/10 text-sky-400 border border-sky-500/25 rounded-full font-mono ${small ? "text-xs px-2 py-0.5" : "text-xs px-3 py-1"}`}>
      {label}
    </span>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/60 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} — Mehdi Ahmiddouch — BTS SIO SISR</p>
        <div className="flex gap-5">
          <a href="https://www.linkedin.com/in/mehdi-ahmiddouch-bb491b341/" target="_blank" rel="noreferrer" className="hover:text-sky-400 transition-colors">LinkedIn</a>
          <a href="https://github.com/mehdi7881" target="_blank" rel="noreferrer" className="hover:text-sky-400 transition-colors">GitHub</a>
          <a href="mailto:mehdiahmiddouch78@gmail.com" className="hover:text-sky-400 transition-colors">Email</a>
        </div>
      </div>
    </footer>
  );
}
