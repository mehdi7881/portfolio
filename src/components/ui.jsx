// ═══════════════════════════════════════════════════════════════
// ui.jsx — Composants UI partagés
// Style hacker / terminal — BTS SIO SISR Portfolio
// ═══════════════════════════════════════════════════════════════
import { useState, useEffect } from "react";

// ── THEME GLOBAL ─────────────────────────────────────────────
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

// ── NAVBAR avec style terminal ────────────────────────────────
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
        { label: "~/accueil", href: "#accueil" },
        { label: "~/profil", href: "#apropos" },
        { label: "~/skills", href: "#competences" },
        { label: "~/projets", href: "#realisations" },
        { label: "~/veille", href: "#veille" },
        { label: "~/synthese", href: "#tableau" },
        { label: "~/contact", href: "#contact" },
      ]
    : [];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? "bg-slate-950/97 backdrop-blur-md shadow-xl shadow-black/40 border-b border-green-500/10"
        : "bg-transparent"
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo terminal */}
        <button onClick={() => onNavigate("home")} className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded border border-green-500/40 bg-green-500/10 flex items-center justify-center font-black text-xs font-mono text-green-400 group-hover:bg-green-500/20 group-hover:border-green-500/60 transition-all">
            &gt;_
          </div>
          <span className="text-green-400 font-mono font-bold tracking-tight text-sm group-hover:text-green-300 transition-colors">mehdi@portfolio</span>
          <span className="text-slate-600 text-xs font-mono hidden sm:inline">:~$</span>
        </button>

        {/* Links desktop style terminal */}
        <ul className="hidden md:flex gap-1 text-xs font-mono">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-slate-500 hover:text-green-400 hover:bg-green-500/5 px-2.5 py-1.5 rounded transition-all border border-transparent hover:border-green-500/20">
                {l.label}
              </a>
            </li>
          ))}
          {currentPage !== "home" && (
            <li>
              <button onClick={() => onNavigate("home")} className="text-slate-500 hover:text-green-400 hover:bg-green-500/5 px-2.5 py-1.5 rounded transition-all border border-transparent hover:border-green-500/20 flex items-center gap-1">
                ← back
              </button>
            </li>
          )}
        </ul>

        <div className="flex items-center gap-2">
          {/* Bouton thème */}
          <button
            onClick={toggle}
            className="w-9 h-9 rounded border border-slate-700 hover:border-green-500/40 flex items-center justify-center transition-all text-slate-400 hover:text-green-400"
            title={theme === "dark" ? "Mode clair" : "Mode sombre"}
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

          {/* Burger mobile */}
          <button className="md:hidden text-slate-400 hover:text-green-400 p-2 transition-colors" onClick={() => setOpen(!open)}>
            {open
              ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            }
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {open && (
        <div className="md:hidden bg-slate-950/98 border-t border-green-500/10">
          <ul className="flex flex-col px-6 py-4 gap-1 font-mono text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="block text-slate-400 hover:text-green-400 py-2 transition-colors" onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              </li>
            ))}
            {currentPage !== "home" && (
              <li>
                <button onClick={() => { onNavigate("home"); setOpen(false); }} className="text-slate-400 hover:text-green-400 py-2 transition-colors">
                  ← retour accueil
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

// ── SECTION — avec accent vert optionnel ──────────────────────
export function Section({ id, title, subtitle, children, dark = false, className = "", terminal = false }) {
  const { theme } = useTheme();
  const bgClass = theme === "light"
    ? "bg-white"
    : dark ? "bg-slate-900" : "bg-slate-950";

  return (
    <section id={id} className={`py-24 ${bgClass} ${className}`}>
      <div className="max-w-6xl mx-auto px-6">
        {title && (
          <div className="mb-14">
            {terminal && (
              <span className="text-green-500/60 font-mono text-xs block mb-2">
                # {id}
              </span>
            )}
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">{title}</h2>
            {subtitle && <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">{subtitle}</p>}
            <div className="mt-5 flex items-center gap-3">
              {/* Accent vert pour le style terminal */}
              <div className="w-12 h-0.5 bg-green-500/70 rounded-full" />
              <div className="w-3 h-0.5 bg-green-500/30 rounded-full" />
            </div>
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

// ── TECH BADGE style terminal ─────────────────────────────────
export function TechBadge({ label, small = false }) {
  return (
    <span className={`bg-green-500/8 text-green-400 border border-green-500/25 rounded font-mono ${small ? "text-xs px-2 py-0.5" : "text-xs px-3 py-1"}`}>
      {label}
    </span>
  );
}

// ── FOOTER style terminal ─────────────────────────────────────
export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-green-500/10 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Ligne de "commande" terminal */}
        <p className="text-slate-600 text-xs font-mono">
          <span className="text-green-500/50">mehdi@portfolio</span>
          <span className="text-slate-700">:~$</span>
          <span className="text-slate-500"> echo "© 2026 — Mehdi Ahmiddouch — BTS SIO SISR"</span>
        </p>
        <div className="flex gap-5 text-xs font-mono">
          <a href="https://www.linkedin.com/in/mehdi-ahmiddouch-bb491b341/" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-green-400 transition-colors">[linkedin]</a>
          <a href="https://github.com/mehdi7881" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-green-400 transition-colors">[github]</a>
          <a href="mailto:mehdiahmiddouch78@gmail.com" className="text-slate-500 hover:text-green-400 transition-colors">[email]</a>
        </div>
      </div>
    </footer>
  );
}

// ── COMPOSANT IMAGE SAFE (évite les erreurs 404 visibles) ─────
export function SafeImg({ src, alt, className, fallbackText }) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className={`img-placeholder ${className}`}>
        <span className="font-mono text-slate-600 text-xs">{fallbackText || alt || "img"}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
}

// ── TERMINAL WINDOW (composant réutilisable) ──────────────────
export function TerminalWindow({ title = "terminal", children, className = "" }) {
  return (
    <div className={`terminal-window ${className}`}>
      <div className="terminal-header">
        <div className="terminal-dot bg-red-500" />
        <div className="terminal-dot bg-yellow-500" />
        <div className="terminal-dot bg-green-500" />
        <span className="text-slate-500 text-xs font-mono ml-2">{title}</span>
      </div>
      <div className="terminal-body">
        {children}
      </div>
    </div>
  );
}
