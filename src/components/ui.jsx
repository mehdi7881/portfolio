import { useState, useEffect } from "react";

// Theme global
let themeListeners = [];
let currentTheme = "dark";

export function useTheme() {
  const [theme, setTheme] = useState(currentTheme);
  useEffect(() => {
    const handler = (t) => setTheme(t);
    themeListeners.push(handler);
    return () => { themeListeners = themeListeners.filter(h => h !== handler); };
  }, []);
  const toggle = () => {
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    themeListeners.forEach(h => h(currentTheme));
    document.documentElement.style.backgroundColor = currentTheme === "light" ? "#ffffff" : "";
    document.body.style.backgroundColor = currentTheme === "light" ? "#ffffff" : "";
  };
  return { theme, toggle };
}

export function ThemeWrapper({ children }) {
  const { theme } = useTheme();
  return (
    <div style={{ backgroundColor: theme === "light" ? "#ffffff" : "" }}>
      {children}
    </div>
  );
}

export function Navbar({ currentPage, onNavigate }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = currentPage === "home"
    ? [
      { label: "Accueil", href: "#accueil" },
      { label: "A propos", href: "#apropos" },
      { label: "Competences", href: "#competences" },
      { label: "Realisations", href: "#realisations" },
      { label: "Veille", href: "#veille" },
      { label: "Synthese", href: "#tableau" },
      { label: "Contact", href: "#contact" },
    ]
    : [];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-slate-900/97 backdrop-blur-md shadow-xl shadow-black/20" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={() => onNavigate("home")} className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white font-black text-sm group-hover:bg-sky-400 transition-colors">M</div>
          <span className="text-white font-bold tracking-tight">Mehdi A.</span>
          <span className="text-slate-500 text-sm font-normal hidden sm:inline">Portfolio</span>
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
              <button onClick={() => onNavigate("home")} className="text-slate-400 hover:text-white hover:bg-slate-800 px-3 py-1.5 rounded-lg transition-all font-medium flex items-center gap-1">
                &larr; Accueil
              </button>
            </li>
          )}
        </ul>

        <div className="flex items-center gap-2">
          {/* Bouton theme */}
          <button
            onClick={toggle}
            className="w-9 h-9 rounded-lg border border-slate-700 hover:border-sky-500/60 flex items-center justify-center transition-all text-slate-300 hover:text-sky-400"
            title={theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
          >
            {theme === "dark" ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10A5 5 0 0012 7z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
              </svg>
            )}
          </button>

          <button className="md:hidden text-slate-300 p-2" onClick={() => setOpen(!open)}>
            {open
              ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            }
          </button>
        </div>
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
                  &larr; Retour
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export function Section({ id, title, subtitle, children, dark = false, className = "" }) {
  const { theme } = useTheme();
  const bgClass = theme === "light"
    ? "bg-white"
    : dark ? "bg-slate-900" : "bg-slate-950";

  return (
    <section id={id} className={`py-24 ${bgClass} ${className}`}>
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

export function TechBadge({ label, small = false }) {
  return (
    <span className={`bg-sky-500/10 text-sky-400 border border-sky-500/25 rounded-full font-mono ${small ? "text-xs px-2 py-0.5" : "text-xs px-3 py-1"}`}>
      {label}
    </span>
  );
}

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/60 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-sm">
        <p>2026 - Mehdi Ahmiddouch - BTS SIO SISR</p>
        <div className="flex gap-5">
          <a href="https://www.linkedin.com/in/mehdi-ahmiddouch-bb491b341/" target="_blank" rel="noreferrer" className="hover:text-sky-400 transition-colors">LinkedIn</a>
          <a href="https://github.com/mehdi7881" target="_blank" rel="noreferrer" className="hover:text-sky-400 transition-colors">GitHub</a>
          <a href="mailto:mehdiahmiddouch78@gmail.com" className="hover:text-sky-400 transition-colors">Email</a>
        </div>
      </div>
    </footer>
  );
}
