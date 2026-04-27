// HomePage.jsx — BTS SIO SISR — Mehdi Ahmiddouch 2026
import { useState, useEffect } from "react";
import { Section, TechBadge, SafeImg, TerminalWindow } from "./ui.jsx";
import { PROFILE, PROJETS, VEILLE } from "../data.js";

// ── TYPEWRITER ─────────────────────────────────────────────────
function useTypewriter(lines, speed = 45, pauseBetween = 600) {
  const [displayed, setDisplayed] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (currentLine >= lines.length) { setDone(true); return; }
    if (currentChar < lines[currentLine].length) {
      const t = setTimeout(() => setCurrentChar((c) => c + 1), speed);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setDisplayed((d) => [...d, lines[currentLine]]);
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, pauseBetween);
      return () => clearTimeout(t);
    }
  }, [currentLine, currentChar, lines, speed, pauseBetween]);
  const partial = currentLine < lines.length ? lines[currentLine].slice(0, currentChar) : "";
  return { displayed, partial, done };
}

// ── HERO ───────────────────────────────────────────────────────
export function Hero({ onNavigate }) {
  const terminalLines = [
    "$ whoami",
    "  mehdi-ahmiddouch — BTS SIO SISR",
    "$ formation",
    "  H3 Campus IPSSI | Alternance @ ATERMES",
    "$ ls ./competences/",
    "  debian  zabbix  nagios  glpi  cisco  kali",
    "$ objectif",
    "  Administrateur Systèmes & Réseaux — Cybersécurité",
    "$ _",
  ];
  const { displayed, partial, done } = useTypewriter(terminalLines);

  return (
    <section id="accueil" className="min-h-screen flex flex-col justify-center bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-matrix-grid opacity-100" />
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-green-500/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-sky-500/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div>
            <div className="inline-flex items-center gap-2 bg-green-500/8 border border-green-500/25 text-green-400 text-xs font-mono px-4 py-2 rounded mb-8 tracking-widest">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full" style={{ animation: "blink 1s step-end infinite" }} />
              PORTFOLIO BTS SIO SISR — E5/E6 — SESSION 2026
            </div>

            {/* ✅ "Bienvenue sur mon portfolio" au lieu de root@portfolio */}
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4 leading-[1.05] tracking-tight">
              <span className="text-green-400 font-mono text-xl md:text-2xl block mb-3 font-normal tracking-wide">
                Bienvenue sur mon portfolio
              </span>
              Mehdi<br />
              <span className="bg-gradient-to-r from-green-400 to-sky-400 bg-clip-text text-transparent">Ahmiddouch</span>
            </h1>

            <p className="text-slate-400 text-base max-w-xl mb-8 leading-relaxed font-mono text-sm">
              <span className="text-green-500/70">// </span>{PROFILE.tagline}
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a href="#realisations" className="bg-green-500/15 hover:bg-green-500/25 border border-green-500/40 hover:border-green-500/70 text-green-400 font-bold font-mono px-6 py-3 rounded transition-all text-sm">
                ./voir-projets →
              </a>
              <a href={PROFILE.cv} target="_blank" rel="noreferrer" className="border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white font-bold font-mono px-6 py-3 rounded transition-all text-sm">
                [CV_Mehdi_Amd.pdf]
              </a>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "formation",  value: "BTS SIO SISR",    icon: "🎓" },
                { label: "ecole",      value: "H3 Campus",       icon: "🏫" },
                { label: "stage",      value: "Mairie Coignières", icon: "🏛️" },
                { label: "alternance", value: "ATERMES",         icon: "💼" },
              ].map((c) => (
                <div key={c.label} className="bg-slate-900/60 border border-slate-800 hover:border-green-500/20 rounded p-4 transition-colors">
                  <p className="text-slate-600 text-xs font-mono mb-1"><span className="text-green-500/50">$</span> {c.label}</p>
                  <p className="text-white font-bold text-sm">{c.icon} {c.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <TerminalWindow title="mehdi@portfolio:~">
              {displayed.map((line, i) => (
                <div key={i} className={line.startsWith("$") ? "text-green-400" : "text-slate-400"}>{line}</div>
              ))}
              {partial && (
                <div className={partial.startsWith("$") ? "text-green-400" : "text-slate-400"}>
                  {partial}<span style={{ animation: "blink 1s step-end infinite", color: "#00ff41" }}>█</span>
                </div>
              )}
              {done && <div className="text-green-400"><span style={{ animation: "blink 1s step-end infinite" }}>█</span></div>}
            </TerminalWindow>
            <div className="grid grid-cols-1 gap-2 mt-4">
              {[
                { label: "competences", desc: "Systèmes, réseaux, sécurité", href: "#competences" },
                { label: "veille-tech", desc: "RaaS, 2FA, ANSSI 2025",       href: "#veille" },
              ].map((c) => (
                <a key={c.label} href={c.href} className="flex items-center gap-3 bg-slate-900/40 border border-slate-800 hover:border-green-500/20 rounded p-3 group transition-all">
                  <span className="text-green-500/50 font-mono text-xs">./</span>
                  <div>
                    <p className="text-slate-300 font-mono text-sm group-hover:text-green-400 transition-colors">{c.label}</p>
                    <p className="text-slate-600 text-xs">{c.desc}</p>
                  </div>
                  <span className="ml-auto text-slate-700 group-hover:text-green-500/50 transition-colors text-xs font-mono">→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── À PROPOS ───────────────────────────────────────────────────
export function APropos({ onNavigate }) {
  return (
    <Section id="apropos" title="À propos" subtitle="Mon profil, mon parcours et mes expériences" dark terminal>
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded border border-green-500/30 bg-green-500/10 flex items-center justify-center text-green-400 font-black text-2xl font-mono">MA</div>
            <div>
              <h3 className="text-2xl font-black text-white">{PROFILE.nom}</h3>
              <p className="text-green-400 font-mono text-sm">{PROFILE.formation} · {PROFILE.age} ans</p>
            </div>
          </div>
          <p className="text-slate-300 leading-relaxed mb-6">{PROFILE.presentation.texte}</p>

          {/* ✅ Suppression "cat" dans tous les labels */}
          <div className="bg-slate-800/50 border border-slate-700/60 rounded p-5 mb-5">
            <p className="text-green-400 font-bold mb-3 flex items-center gap-2 font-mono text-sm">
              <span className="text-green-500/60">$</span> points-cles
            </p>
            <ul className="space-y-2">
              {PROFILE.presentation.points.map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                  <span className="text-green-400 mt-0.5 flex-shrink-0 font-mono">→</span>{p}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/60 rounded p-5 mb-5">
            <p className="text-green-400 font-bold mb-2 flex items-center gap-2 font-mono text-sm">
              <span className="text-green-500/60">$</span> objectif
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">{PROFILE.objectif}</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700/60 rounded p-5">
            <p className="text-green-400 font-bold mb-3 flex items-center gap-2 font-mono text-sm">
              <span className="text-green-500/60">$</span> langues
            </p>
            <div className="flex gap-6">
              {PROFILE.langues.map((l) => (
                <div key={l.langue}>
                  <p className="text-white font-semibold text-sm">{l.langue}</p>
                  <p className="text-slate-500 text-xs mb-1">{l.niveau}</p>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`w-4 h-1 rounded-sm ${i < l.stars ? "bg-green-500" : "bg-slate-700"}`} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <p className="text-green-400 font-mono text-sm mb-5 flex items-center gap-2">
            <span className="text-green-500/60">$</span> parcours
          </p>
          <div className="relative pl-6 border-l border-green-500/20">
            {PROFILE.apropos.parcours.map((item, i) => (
              <div key={i} className="mb-8 relative">
                <div className="absolute -left-[25px] w-3 h-3 rounded-sm border border-green-500/50 bg-slate-950 flex items-center justify-center">
                  <div className="w-1 h-1 bg-green-500 rounded-sm" />
                </div>
                <p className="text-slate-500 text-xs font-mono mb-1">{item.periode}</p>
                <p className="text-white font-black text-sm">{item.titre}</p>
                <p className="text-green-400/70 text-xs font-mono">{item.ecole}</p>
              </div>
            ))}
          </div>

          <p className="text-green-400 font-mono text-sm mb-4 mt-8 flex items-center gap-2">
            <span className="text-green-500/60">$</span> experiences
          </p>
          <div className="space-y-4">
            {PROFILE.entreprises.map((e) => (
              <button key={e.nom} onClick={() => onNavigate("entreprise", e.nom)}
                className="w-full text-left bg-slate-800/40 border border-slate-700 hover:border-green-500/30 rounded p-4 group transition-all">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded bg-gradient-to-br ${e.couleur} flex items-center justify-center text-white font-black text-xs flex-shrink-0`}>
                    {e.nom.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-white font-bold text-sm group-hover:text-green-400 transition-colors">{e.nom}</p>
                      <span className={`text-xs px-2 py-0.5 rounded border font-mono ${e.type === "Alternance" ? "bg-sky-500/10 text-sky-400 border-sky-500/25" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/25"}`}>{e.type}</span>
                    </div>
                    <p className="text-slate-500 text-xs font-mono">{e.periode}</p>
                  </div>
                  <span className="text-slate-600 group-hover:text-green-400 transition-colors text-sm font-mono">→</span>
                </div>
              </button>
            ))}
          </div>

          <p className="text-green-400 font-mono text-sm mb-4 mt-8 flex items-center gap-2">
            <span className="text-green-500/60">$</span> formations
          </p>
          <div className="space-y-3">
            {PROFILE.ecoles.map((ec) => (
              <div key={ec.nom} className={`bg-slate-800/40 border ${ec.futur ? "border-amber-500/20" : "border-slate-700"} rounded p-4`}>
                <div className="flex items-start gap-3">
                  <SafeImg
                    src={ec.logo}
                    alt={ec.nom}
                    className="w-10 h-10 object-contain rounded bg-white p-1 flex-shrink-0"
                    fallback={
                      <div className={`w-10 h-10 rounded bg-gradient-to-br ${ec.couleur} flex items-center justify-center text-white font-black text-xs flex-shrink-0`}>
                        {ec.nom.slice(0, 2).toUpperCase()}
                      </div>
                    }
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <p className="text-white font-bold text-sm">{ec.nom}</p>
                      {ec.futur && <span className="text-xs px-2 py-0.5 rounded border bg-amber-500/10 text-amber-400 border-amber-500/25 font-mono">→ objectif</span>}
                    </div>
                    <p className="text-green-400/70 text-xs font-mono mb-1">{ec.diplome}</p>
                    <p className="text-slate-500 text-xs">{ec.periode} · {ec.lieu}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

// ── COMPÉTENCES ────────────────────────────────────────────────
const referentiel = [
  {
    categorie: "B1 — Support et mise à disposition de services informatiques",
    badge: "B1", couleur: "border-sky-500/20",
    items: [
      "Gérer le patrimoine informatique",
      "Répondre aux incidents et aux demandes d'assistance",
      "Développer la présence en ligne de l'organisation",
      "Travailler en mode projet",
      "Mettre à disposition des utilisateurs un service informatique",
      "Organiser son développement professionnel",
    ],
    pratique: {
      contexte: "Stage Mairie + Alternance ATERMES",
      // ✅ OCS retiré — uniquement GLPI utilisé
      outils: ["GLPI", "Windows Server", "Active Directory", "Trello"],
      exemples: [
        "Gestion et inventaire du parc informatique via GLPI",
        "Support utilisateurs agents municipaux (incidents, comptes)",
        "Documentation technique, schémas réseau et procédures",
      ],
    },
  },
  {
    categorie: "B2 — Cybermenaces et réponse aux incidents",
    badge: "B2", couleur: "border-red-500/20",
    items: [
      "Protéger les données à caractère personnel",
      "Préserver l'identité numérique de l'organisation",
      "Sécuriser les équipements et usages des utilisateurs",
      "Garantir la disponibilité, l'intégrité et la confidentialité des services",
    ],
    pratique: {
      contexte: "TP IPSSI + Veille ANSSI",
      outils: ["Kali Linux", "SSH", "2FA", "VPN", "TLS/SSL"],
      exemples: [
        "Configuration SSH avec clés RSA asymétriques",
        "Étude du contournement 2FA (phishing de session, SIM swapping)",
        "Veille sur les ransomwares RaaS et directive NIS 2",
      ],
    },
  },
  {
    categorie: "B3 — Administration des réseaux et des systèmes",
    badge: "B3", couleur: "border-emerald-500/20",
    items: [
      "Exploiter un réseau local",
      "Étendre un réseau local",
      "Sécuriser un réseau",
      "Gérer des ressources dans un réseau",
      "Superviser les services réseau",
    ],
    pratique: {
      contexte: "Stage Mairie + Projets scolaires",
      outils: ["Debian 12", "Zabbix 6.0", "Nagios", "Cisco Packet Tracer", "VLANs"],
      exemples: [
        "Installation Debian 12 + déploiement Zabbix 6.0 (supervision réseau mairie)",
        "Schématisation de l'infrastructure réseau mairie + VLANs",
        "AP2 : MAC-based VLAN (DYLAN) et Wi-Fi sécurisé (ASSIZ)",
      ],
    },
  },
];

const badgeColors = {
  B1: "bg-sky-500/10 text-sky-400 border-sky-500/25",
  B2: "bg-red-500/10 text-red-400 border-red-500/25",
  B3: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
};

export function Competences() {
  return (
    <Section id="competences" title="Compétences" subtitle="Référentiel BTS SIO SISR — concordance théorie/pratique" terminal>
      <div className="flex gap-8 items-start mb-10">
        <div className="flex-shrink-0 text-center">
          {/* ✅ Sphère animée — rotation 3D continue */}
          <div className="bg-slate-900 border border-green-500/20 rounded p-4"
            style={{ perspective: "800px" }}>
            <img
              src="/assets/skills-sphere.png"
              alt="Compétences"
              className="w-56 h-56 object-contain"
              style={{
                animation: "spin3d 8s linear infinite",
              }}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div style={{ display: "none" }}
              className="w-56 h-56 items-center justify-center text-slate-600 font-mono text-xs">
              [skills-sphere]
            </div>
          </div>
          <p className="text-slate-600 text-xs mt-3 font-mono">// écosystème technologique</p>
          <style>{`
            @keyframes spin3d {
              0%   { transform: rotateY(0deg) rotateX(10deg); }
              100% { transform: rotateY(360deg) rotateX(10deg); }
            }
          `}</style>
        </div>
        <div className="flex-1">
          <p className="text-slate-300 leading-relaxed mb-4">Mon parcours en BTS SIO SISR m'a permis de mettre en pratique toutes les compétences du référentiel officiel, lors de mon stage à la Mairie de Coignières, mon alternance chez ATERMES et mes projets scolaires à l'IPSSI.</p>
          <div className="flex flex-wrap gap-2">
            {["Debian 12","Linux","Zabbix","Nagios","Kali Linux","SSH","VPN","VirtualBox","GLPI","OCS","Windows Server","Cisco","GPO","FileZilla FTPS","HTML/CSS","Figma"].map((t) => <TechBadge key={t} label={t} />)}
          </div>
        </div>
      </div>
      <div className="space-y-5">
        {referentiel.map((cat) => (
          <div key={cat.categorie} className={`bg-slate-900 border ${cat.couleur} rounded overflow-hidden`}>
            <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
              <div className="p-6">
                <span className={`text-xs font-bold px-2.5 py-1 rounded border font-mono ${badgeColors[cat.badge]} mb-4 inline-block`}>Référentiel officiel — {cat.badge}</span>
                <h3 className="text-white font-black text-sm mb-4">{cat.categorie}</h3>
                <ul className="space-y-2">{cat.items.map((item) => <li key={item} className="flex items-start gap-2 text-slate-400 text-sm"><span className="text-slate-600 mt-1 flex-shrink-0 font-mono">▸</span>{item}</li>)}</ul>
              </div>
              <div className="p-6 bg-slate-950/50">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-bold px-2.5 py-1 rounded border bg-green-500/8 text-green-400 border-green-500/25 font-mono">Mise en pratique</span>
                  <span className="text-slate-600 text-xs font-mono">{cat.pratique.contexte}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">{cat.pratique.outils.map((o) => <span key={o} className="bg-slate-800 text-slate-300 border border-slate-700 text-xs px-2.5 py-1 rounded font-mono">{o}</span>)}</div>
                <ul className="space-y-2">{cat.pratique.exemples.map((ex) => <li key={ex} className="flex items-start gap-2 text-slate-300 text-sm"><span className="text-green-400 mt-1 flex-shrink-0">✓</span>{ex}</li>)}</ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ── RÉALISATIONS ───────────────────────────────────────────────
const PROJETS_ENTREPRISE = ["zabbix-supervision","infrastructure-reseau","gestion-parc","virtualisation"];
const PROJETS_PERSO = ["ap2-m2l","glpi-ocs-m2l","nagios-m2l","cybersecurite-linux","veille-ransomware","site-web"];

const catColors = {
  Infrastructure: "text-blue-400 bg-blue-500/10 border-blue-500/25",
  Réseau: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
  Sécurité: "text-red-400 bg-red-500/10 border-red-500/25",
  Veille: "text-purple-400 bg-purple-500/10 border-purple-500/25",
  "Gestion de parc": "text-amber-400 bg-amber-500/10 border-amber-500/25",
  Développement: "text-violet-400 bg-violet-500/10 border-violet-500/25",
  Supervision: "text-cyan-400 bg-cyan-500/10 border-cyan-500/25",
};

function ProjetCard({ p, onNavigate }) {
  return (
    <button onClick={() => onNavigate("projet", p.id)}
      className="text-left bg-slate-900/60 border border-slate-800 rounded overflow-hidden hover:border-green-500/30 transition-all hover:-translate-y-0.5 group flex flex-col w-full">
      {p.logo ? (
        <div className="h-28 bg-slate-800 flex items-center justify-center p-6 relative overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${p.couleur} opacity-30`} />
          <SafeImg src={p.logo} alt={p.titre} className="relative z-10 h-14 w-auto object-contain group-hover:scale-105 transition-transform duration-300" />
        </div>
      ) : p.images && p.images.length > 0 ? (
        <div className="h-28 overflow-hidden bg-slate-800 relative">
          <SafeImg src={p.images[0].src} alt={p.titre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60" />
          <div className={`absolute inset-0 bg-gradient-to-br ${p.couleur} opacity-20`} />
        </div>
      ) : (
        <div className={`h-16 bg-gradient-to-br ${p.couleur} flex items-center justify-center font-mono text-white/50 text-xs opacity-80`}>[{p.icon}]</div>
      )}
      <div className="p-4 flex-1 flex flex-col">
        <span className={`text-xs font-mono font-semibold px-2.5 py-0.5 rounded border mb-2 self-start ${catColors[p.categorie] || "text-green-400 bg-green-500/10 border-green-500/25"}`}>{p.categorie}</span>
        <h3 className="text-white font-black text-sm mb-1.5 group-hover:text-green-400 transition-colors leading-snug">{p.titre}</h3>
        <p className="text-slate-500 text-xs leading-relaxed flex-1">{p.courte}</p>
        <div className="flex flex-wrap gap-1 mt-3">
          {p.technologies.slice(0, 3).map((t) => <TechBadge key={t} label={t} small />)}
          {p.technologies.length > 3 && <span className="text-slate-600 text-xs px-1 font-mono">+{p.technologies.length - 3}</span>}
        </div>
        <div className="flex items-center gap-1 mt-3 text-green-400 text-xs font-mono">./voir-projet <span className="group-hover:translate-x-1 transition-transform">→</span></div>
      </div>
    </button>
  );
}

export function Realisations({ onNavigate }) {
  const projetsEntreprise = PROJETS.filter((p) => PROJETS_ENTREPRISE.includes(p.id));
  const projetsPerso      = PROJETS.filter((p) => PROJETS_PERSO.includes(p.id));
  return (
    <Section id="realisations" title="Réalisations" subtitle="Mes projets professionnels et personnels" dark terminal>
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-6 font-mono text-sm">
            <span className="text-green-500/50">$</span><span className="text-slate-400">ls ./projets/entreprise/</span>
            <span className="ml-auto bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs px-2.5 py-1 rounded font-mono">{projetsEntreprise.length} items</span>
          </div>
          <p className="text-slate-600 text-xs font-mono mb-4">Stage Mairie de Coignières · Alternance ATERMES</p>
          <div className="grid gap-4">{projetsEntreprise.map((p) => <ProjetCard key={p.id} p={p} onNavigate={onNavigate} />)}</div>
        </div>
        <div>
          <div className="flex items-center gap-3 mb-6 font-mono text-sm">
            <span className="text-green-500/50">$</span><span className="text-slate-400">ls ./projets/scolaires/</span>
            <span className="ml-auto bg-violet-500/10 text-violet-400 border border-violet-500/20 text-xs px-2.5 py-1 rounded font-mono">{projetsPerso.length} items</span>
          </div>
          <p className="text-slate-600 text-xs font-mono mb-4">H3 Campus · Projets personnels</p>
          <div className="grid gap-4">{projetsPerso.map((p) => <ProjetCard key={p.id} p={p} onNavigate={onNavigate} />)}</div>
        </div>
      </div>
    </Section>
  );
}

// ── VEILLE ─────────────────────────────────────────────────────
export function Veille({ onNavigate }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSource, setActiveSource] = useState("tous");
  const sources = [
    { id: "lemagit",   nom: "LeMagIT",      url: "https://www.lemagit.fr/rss/actualites/Securite",                           couleur: "sky",     site: "https://www.lemagit.fr/actualites/Securite" },
    { id: "anssi",     nom: "ANSSI",         url: "https://www.cert.ssi.gouv.fr/feed/",                                      couleur: "emerald", site: "https://cyber.gouv.fr/" },
    { id: "itconnect", nom: "IT-Connect",    url: "https://www.it-connect.fr/feed/",                                         couleur: "violet",  site: "https://www.it-connect.fr/" },
    { id: "lemonde",   nom: "Le Monde Info", url: "https://www.lemondeinformatique.fr/flux-rss/thematique/securite/rss.xml", couleur: "amber",   site: "https://www.lemondeinformatique.fr/" },
  ];
  useEffect(() => {
    const fetchFeeds = async () => {
      setLoading(true);
      try {
        const proxy = "https://api.rss2json.com/v1/api.json?rss_url=";
        const results = await Promise.allSettled(sources.map(async (s) => {
          const res = await fetch(`${proxy}${encodeURIComponent(s.url)}&count=3`);
          const data = await res.json();
          if (data.status === "ok") return data.items.map((item) => ({ titre: item.title, date: new Date(item.pubDate).toLocaleDateString("fr-FR"), resume: item.description?.replace(/<[^>]*>/g, "").slice(0, 150) + "...", lien: item.link, source: s.nom, sourceId: s.id, couleur: s.couleur }));
          return [];
        }));
        setArticles(results.flatMap((r) => r.status === "fulfilled" ? r.value : []));
      } catch (e) { setArticles([]); }
      setLoading(false);
    };
    fetchFeeds();
  }, []);
  const filtered = activeSource === "tous" ? articles : articles.filter((a) => a.sourceId === activeSource);
  const badgeColors = { sky: "bg-sky-500/10 text-sky-400 border-sky-500/25", emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25", violet: "bg-violet-500/10 text-violet-400 border-violet-500/25", amber: "bg-amber-500/10 text-amber-400 border-amber-500/25" };

  return (
    <Section id="veille" title="Veille technologique" subtitle="Flux RSS en direct — cybersécurité & SISR" terminal>
      <div className="mb-8">
        <p className="text-green-500/50 text-xs font-mono mb-4"># sources de veille — flux RSS en direct</p>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => setActiveSource("tous")} className={`px-4 py-2 rounded text-xs font-mono border transition-all ${activeSource === "tous" ? "bg-green-500/15 text-green-400 border-green-500/40" : "bg-slate-900 text-slate-500 border-slate-700 hover:border-green-500/20"}`}>[tous]</button>
          {sources.map((s) => (
            <button key={s.id} onClick={() => setActiveSource(s.id)} className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-mono border transition-all ${activeSource === s.id ? "bg-sky-500/10 text-sky-400 border-sky-500/30" : "bg-slate-900 text-slate-500 border-slate-700 hover:border-green-500/20"}`}>
              <span className={`w-1.5 h-1.5 rounded-full bg-${s.couleur}-400`} />{s.nom}
              <a href={s.site} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="text-slate-600 hover:text-green-400 text-xs ml-1">↗</a>
            </button>
          ))}
        </div>
      </div>
      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">{[...Array(6)].map((_, i) => <div key={i} className="bg-slate-900 border border-green-500/10 rounded p-5 animate-pulse"><div className="h-3 bg-slate-800 rounded mb-3 w-1/3" /><div className="h-4 bg-slate-800 rounded mb-2" /><div className="h-4 bg-slate-800 rounded mb-2 w-3/4" /></div>)}</div>
      ) : filtered.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((art, i) => (
            <a key={i} href={art.lien} target="_blank" rel="noreferrer" className="bg-slate-900 border border-slate-800 rounded p-5 hover:border-green-500/25 transition-all hover:-translate-y-0.5 group flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-mono font-semibold px-2.5 py-1 rounded border ${badgeColors[art.couleur] || badgeColors.sky}`}>{art.source}</span>
                <span className="text-slate-600 text-xs font-mono">{art.date}</span>
              </div>
              <h3 className="text-white font-bold text-sm mb-3 group-hover:text-green-400 transition-colors leading-snug flex-1">{art.titre}</h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-4">{art.resume}</p>
              <div className="flex items-center gap-1 text-green-400 text-xs font-mono mt-auto">lire l'article <span className="group-hover:translate-x-1 transition-transform">→</span></div>
            </a>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {VEILLE.map((v) => (
            <div key={v.titre} className="bg-slate-900 border border-slate-800 rounded overflow-hidden hover:border-green-500/25 transition-all group flex flex-col">
              {v.image && (
                <div className="h-32 overflow-hidden relative flex-shrink-0">
                  <SafeImg src={v.image} alt={v.titre} className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                  <div className="absolute bottom-2 left-3"><span className="text-xs bg-green-500/15 text-green-400 border border-green-500/25 px-2 py-0.5 rounded font-mono">{v.source}</span></div>
                </div>
              )}
              <div className="p-5 flex flex-col flex-1">
                <p className="text-slate-600 text-xs font-mono mb-2">{v.date}</p>
                <h3 className="text-white font-bold text-sm mb-3 group-hover:text-green-400 transition-colors leading-snug flex-1">{v.titre}</h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-4">{v.resume}</p>
                <div className="flex gap-2 mt-auto">
                  {v.lien && <a href={v.lien} target="_blank" rel="noreferrer" className="flex-1 text-center bg-green-500/10 hover:bg-green-500/20 text-green-400 text-xs font-mono px-3 py-2 rounded border border-green-500/25 transition-colors">lire →</a>}
                  {v.projetId && <button onClick={() => onNavigate("projet", v.projetId)} className="flex-1 text-center border border-slate-700 hover:border-green-500/30 text-slate-500 hover:text-green-400 text-xs font-mono px-3 py-2 rounded transition-colors">./projet</button>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}

// ── TABLEAU DE SYNTHÈSE ────────────────────────────────────────
export function TableauSynthese() {
  return (
    <Section id="tableau" title="Tableau de synthèse" subtitle="Réalisations professionnelles BTS SIO SISR — Session 2026" dark terminal>
      <div className="bg-slate-900 border border-green-500/15 rounded overflow-hidden">
        <div className="bg-gradient-to-r from-green-500/5 to-sky-500/5 border-b border-slate-800 px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="text-slate-500 text-xs font-mono mb-1"># BTS Services Informatiques aux Organisations</p>
            <h3 className="text-white font-black text-xl">Tableau de synthèse des réalisations</h3>
            <p className="text-green-400 text-sm mt-1 font-mono">AHMIDDOUCH Mehdi · H3 Campus IPSSI SQY · Option SISR</p>
          </div>
            <a href="/assets/tableau-synthese.pdf" target="_blank" rel="noreferrer"
            className="flex items-center gap-3 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-400 font-bold font-mono px-6 py-3 rounded transition-all flex-shrink-0 text-sm">
            📥 tableau-synthese.pdf
          </a>
        </div>
        <div className="px-8 py-6 grid sm:grid-cols-3 gap-6 border-b border-slate-800">
          {[{ label: "candidate", value: "AHMIDDOUCH Mehdi" },{ label: "centre", value: "H3 Campus – IPSSI SQY" },{ label: "session", value: "2025 – 2026" }].map((c) => (
            <div key={c.label}><p className="text-green-500/50 text-xs font-mono mb-1">$ {c.label}</p><p className="text-white font-semibold">{c.value}</p></div>
          ))}
        </div>
        <div className="px-8 py-5 flex items-center gap-4 border-b border-slate-800">
          <span className="text-slate-500 text-xs font-mono">$ url-portfolio :</span>
          <a href="https://mehdi7881.github.io/portfolio" target="_blank" rel="noreferrer" className="text-green-400 hover:text-green-300 font-mono text-sm transition-colors">https://mehdi7881.github.io/portfolio</a>
        </div>
        {/* Aperçu PDF intégré */}
        <div className="px-8 pb-8 pt-6">
          <p className="text-green-500/50 text-xs font-mono mb-3"># aperçu du tableau de synthèse</p>
          <div className="rounded overflow-hidden border border-slate-700 bg-white" style={{ height: "650px" }}>
            <iframe
              src="/assets/tableau-synthese.pdf"
              className="w-full h-full border-0"
              title="Tableau de synthèse BTS SIO SISR"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

// ── CONTACT ────────────────────────────────────────────────────
export function Contact() {
  const { contact } = PROFILE;
  return (
    <Section id="contact" title="Contact" subtitle="Disponible pour un stage ou une alternance" terminal>
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div>
          <TerminalWindow title="contact.sh" className="mb-6">
            <div className="text-green-400">$ whoami</div>
            <div className="text-slate-400 ml-4 mb-3">Mehdi Ahmiddouch — 18 ans — BTS SIO SISR</div>
            <div className="text-green-400">$ disponibilite</div>
            <div className="text-slate-400 ml-4">Disponible pour opportunités professionnelles.</div>
            <div className="text-slate-400 ml-4">N'hésitez pas à me contacter !</div>
          </TerminalWindow>
          <div className="space-y-3">
            {[
              { icon: "✉️", label: "email", value: contact.email,       href: `mailto:${contact.email}` },
              { icon: "📱", label: "tel",   value: PROFILE.phone,       href: `tel:${PROFILE.phone}` },
              { icon: "📍", label: "loc",   value: contact.localisation, href: null },
            ].map((c) => (
              <div key={c.label} className="flex items-center gap-4 bg-slate-800/50 border border-slate-700/60 rounded px-5 py-4 font-mono">
                <span className="text-2xl">{c.icon}</span>
                <div>
                  <p className="text-green-500/50 text-xs">$ {c.label}</p>
                  {c.href ? <a href={c.href} className="text-white hover:text-green-400 font-semibold transition-colors text-sm">{c.value}</a> : <p className="text-white font-semibold text-sm">{c.value}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <a href={contact.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-4 bg-slate-800/50 border border-slate-700/60 hover:border-blue-500/50 rounded px-5 py-4 group transition-all">
            <div className="w-10 h-10 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-sm">in</div>
            <div className="flex-1"><p className="text-green-500/50 text-xs font-mono">$ linkedin</p><p className="text-white font-semibold group-hover:text-blue-400 transition-colors">mehdi-ahmiddouch</p></div>
            <span className="text-slate-500 group-hover:translate-x-1 transition-transform font-mono">→</span>
          </a>
          <a href={contact.github} target="_blank" rel="noreferrer" className="flex items-center gap-4 bg-slate-800/50 border border-slate-700/60 hover:border-slate-500 rounded px-5 py-4 group transition-all">
            <div className="w-10 h-10 rounded bg-slate-700 flex items-center justify-center text-white text-lg">🐱</div>
            <div className="flex-1"><p className="text-green-500/50 text-xs font-mono">$ github</p><p className="text-white font-semibold group-hover:text-slate-300 transition-colors">mehdi7881</p></div>
            <span className="text-slate-500 group-hover:translate-x-1 transition-transform font-mono">→</span>
          </a>
          <a href={PROFILE.cv} target="_blank" rel="noreferrer" className="flex items-center gap-4 bg-green-500/5 border border-green-500/25 hover:border-green-500/50 rounded px-5 py-4 group transition-all">
            <div className="w-10 h-10 rounded bg-green-500/20 flex items-center justify-center text-green-400 text-lg">📄</div>
            <div className="flex-1"><p className="text-green-500/50 text-xs font-mono">$ cv</p><p className="text-green-400 font-semibold group-hover:text-green-300 transition-colors">CV_Mehdi_Amd.pdf</p></div>
            <span className="text-green-400 group-hover:translate-x-1 transition-transform font-mono">↓</span>
          </a>
        </div>
      </div>
    </Section>
  );
}
