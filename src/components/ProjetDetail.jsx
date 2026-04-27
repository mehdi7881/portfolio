// ═══════════════════════════════════════════════════════════════
// ProjetDetail.jsx — Page détail d'un projet
// CORRECTIONS : suppression ".sh", SafeImg, style terminal
// ═══════════════════════════════════════════════════════════════
import { useState } from "react";
import { TechBadge, SafeImg } from "./ui.jsx";
import { PROJETS } from "../data.js";

// ── GALERIE D'IMAGES ──────────────────────────────────────────
function Galerie({ images }) {
  const [active, setActive] = useState(null);
  if (!images || images.length === 0) return null;

  return (
    <div>
      <h3 className="text-white font-bold text-xl mb-5 flex items-center gap-2 font-mono">
        <span className="text-green-400">📷</span> ./screenshots/
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <button key={i} onClick={() => setActive(i)}
            className="group rounded overflow-hidden border border-slate-800 hover:border-green-500/30 transition-all bg-slate-900 text-left">
            <div className="h-40 overflow-hidden relative bg-slate-800">
              <SafeImg src={img.src} alt={img.legende}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                fallbackText={`[${img.legende || "image"}]`} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-green-400 text-xs font-mono bg-slate-900/80 px-3 py-1 rounded">./ouvrir</span>
              </div>
            </div>
            <p className="text-slate-500 text-xs p-3 font-mono leading-relaxed">{img.legende}</p>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-6" onClick={() => setActive(null)}>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="bg-slate-900 border border-green-500/20 rounded-t p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" onClick={() => setActive(null)} />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-slate-500 text-xs font-mono ml-3">{images[active].src}</span>
              </div>
              <div className="flex gap-3 text-slate-500 text-xs font-mono">
                <button onClick={() => setActive((a) => (a > 0 ? a - 1 : images.length - 1))} className="hover:text-green-400">← prev</button>
                <span>{active + 1}/{images.length}</span>
                <button onClick={() => setActive((a) => (a < images.length - 1 ? a + 1 : 0))} className="hover:text-green-400">next →</button>
                <button onClick={() => setActive(null)} className="hover:text-red-400 ml-2">[x]</button>
              </div>
            </div>
            <div className="bg-slate-900 border border-green-500/20 border-t-0 rounded-b overflow-hidden">
              <SafeImg src={images[active].src} alt={images[active].legende}
                className="w-full max-h-[70vh] object-contain" fallbackText={images[active].legende} />
              {images[active].legende && (
                <p className="text-slate-500 text-sm p-4 text-center font-mono border-t border-slate-800">{images[active].legende}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── DOCUMENTS ─────────────────────────────────────────────────
function Documents({ documents }) {
  if (!documents || documents.length === 0) return null;
  return (
    <div>
      <h3 className="text-white font-bold text-xl mb-5 flex items-center gap-2 font-mono">
        <span className="text-green-400">📁</span> ./documents/
      </h3>
      <div className="space-y-3">
        {documents.map((doc, i) => (
          <a key={i} href={doc.fichier} target="_blank" rel="noreferrer"
            className="flex items-center gap-4 bg-slate-900 border border-slate-800 hover:border-green-500/30 rounded px-5 py-4 group transition-all">
            <div className="w-10 h-10 rounded border border-green-500/20 bg-green-500/5 flex items-center justify-center text-green-400 flex-shrink-0 text-sm font-mono">
              📄
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold group-hover:text-green-400 transition-colors text-sm">{doc.nom}</p>
              <p className="text-slate-500 text-xs font-mono">{doc.description}</p>
            </div>
            <div className="text-green-400 text-xs font-mono group-hover:translate-x-1 transition-transform">ouvrir →</div>
          </a>
        ))}
      </div>
    </div>
  );
}

// ── PAGE PROJET DÉTAIL ────────────────────────────────────────
export function ProjetDetail({ projetId, onNavigate }) {
  const projet = PROJETS.find((p) => p.id === projetId);
  if (!projet) return null;

  const idx = PROJETS.findIndex((p) => p.id === projetId);
  const prev = PROJETS[idx - 1] || null;
  const next = PROJETS[idx + 1] || null;

  const catColor = {
    Infrastructure:   "bg-blue-500/15 text-blue-400 border-blue-500/30",
    Réseau:           "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    Sécurité:         "bg-red-500/15 text-red-400 border-red-500/30",
    Veille:           "bg-purple-500/15 text-purple-400 border-purple-500/30",
    "Gestion de parc":"bg-amber-500/15 text-amber-400 border-amber-500/30",
    Développement:    "bg-violet-500/15 text-violet-400 border-violet-500/30",
    Supervision:      "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  }[projet.categorie] || "bg-green-500/15 text-green-400 border-green-500/30";

  return (
    <div className="min-h-screen bg-slate-950">

      {/* Hero */}
      <div className={`relative bg-gradient-to-br ${projet.couleur} pt-32 pb-20 overflow-hidden`}>
        <div className="absolute inset-0 bg-slate-950/80" />
        <div className="absolute inset-0 bg-matrix-grid opacity-50" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <button onClick={() => onNavigate("home", "#realisations")}
            className="flex items-center gap-2 text-slate-500 hover:text-green-400 transition-colors mb-8 text-sm group font-mono">
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Retour aux réalisations
          </button>

          <div className="flex items-start gap-4 mb-6">
            {/* Logo ou icône */}
            {projet.logo ? (
              <div className="w-20 h-20 rounded border border-green-500/20 bg-white/10 backdrop-blur flex items-center justify-center p-3 flex-shrink-0">
                <SafeImg src={projet.logo} alt={projet.titre} className="w-full h-full object-contain" />
              </div>
            ) : (
              <div className="w-14 h-14 rounded border border-green-500/30 bg-green-500/10 backdrop-blur flex items-center justify-center text-green-400 font-mono font-black flex-shrink-0">
                [{projet.icon}]
              </div>
            )}
            <div>
              <span className={`text-xs font-mono font-semibold px-3 py-1 rounded border ${catColor} mb-3 inline-block`}>
                {projet.categorie}
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">{projet.titre}</h1>
            </div>
          </div>

          <p className="text-slate-400 text-lg max-w-3xl leading-relaxed font-mono text-sm">{projet.courte}</p>
          <div className="flex flex-wrap gap-2 mt-6">
            {projet.technologies.map((t) => <TechBadge key={t} label={t} />)}
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">

        {/* Description */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-white font-black text-2xl mb-4 flex items-center gap-2 font-mono">
              <span className="text-green-400">📋</span> Description du projet
            </h2>
            <p className="text-slate-300 leading-relaxed text-base">{projet.description}</p>
            {(projet.contexte || projet.objectif || projet.resultat) && (
              <div className="mt-6 space-y-3">
                {projet.contexte && (
                  <div className="bg-slate-900 border border-slate-800 rounded p-4">
                    <p className="text-green-500/60 text-xs font-mono mb-1"># contexte</p>
                    <p className="text-slate-300 text-sm">{projet.contexte}</p>
                  </div>
                )}
                {projet.objectif && (
                  <div className="bg-slate-900 border border-slate-800 rounded p-4">
                    <p className="text-sky-500/60 text-xs font-mono mb-1"># objectif</p>
                    <p className="text-slate-300 text-sm">{projet.objectif}</p>
                  </div>
                )}
                {projet.resultat && (
                  <div className="bg-slate-900 border border-green-500/20 rounded p-4">
                    <p className="text-green-400 text-xs font-mono mb-1"># résultat ✓</p>
                    <p className="text-slate-300 text-sm">{projet.resultat}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="bg-slate-900 border border-slate-800 rounded p-6">
            <h3 className="text-green-500/60 text-xs font-mono font-semibold uppercase tracking-wider mb-4">Infos projet</h3>
            <div className="space-y-3 font-mono">
              <div>
                <p className="text-slate-600 text-xs">catégorie</p>
                <p className="text-white font-semibold text-sm">{projet.categorie}</p>
              </div>
              {projet.type && (
                <div>
                  <p className="text-slate-600 text-xs">type</p>
                  {/* ✅ CORRECTION : "Scene" → "Stage" */}
                  <p className="text-white font-semibold text-sm">
                    {projet.type === "entreprise" ? "🏢 Entreprise" : "🎓 Scolaire"}
                  </p>
                </div>
              )}
              {projet.periode && (
                <div>
                  <p className="text-slate-600 text-xs">période</p>
                  <p className="text-white font-semibold text-sm">{projet.periode}</p>
                </div>
              )}
              {projet.lieu && (
                <div>
                  <p className="text-slate-600 text-xs">lieu</p>
                  <p className="text-white font-semibold text-sm">{projet.lieu}</p>
                </div>
              )}
              <div>
                <p className="text-slate-600 text-xs">technologies</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {projet.technologies.map((t) => <TechBadge key={t} label={t} small />)}
                </div>
              </div>
              <div>
                <p className="text-slate-600 text-xs">missions</p>
                <p className="text-green-400 font-semibold text-sm">{projet.missions.length} tâches ✓</p>
              </div>
            </div>
          </div>
        </div>

        {/* Missions */}
        <div>
          <h2 className="text-white font-black text-2xl mb-6 flex items-center gap-2 font-mono">
            <span className="text-green-400">✅</span> Missions réalisées
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {projet.missions.map((m, i) => (
              <div key={i} className="flex items-start gap-3 bg-slate-900 border border-slate-800 rounded px-5 py-4 hover:border-green-500/20 transition-colors">
                <span className="w-6 h-6 rounded border border-green-500/25 bg-green-500/8 text-green-400 flex items-center justify-center text-xs font-bold font-mono flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-slate-300 text-sm leading-relaxed">{m}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Galerie */}
        {projet.images && projet.images.length > 0 && <Galerie images={projet.images} />}

        {/* Documents */}
        {projet.documents && projet.documents.length > 0 && <Documents documents={projet.documents} />}

        {/* Infos RP */}
        {(projet.numero || projet.lienProduction) && (
          <div className="bg-slate-900 border border-green-500/15 rounded p-6">
            <h2 className="text-white font-black text-xl mb-4 flex items-center gap-2 font-mono">
              <span className="text-green-400">📋</span> Fiche de réalisation professionnelle
            </h2>
            <div className="grid sm:grid-cols-3 gap-4 mb-4 font-mono">
              {projet.numero  && <div><p className="text-green-500/50 text-xs">numéro</p><p className="text-white font-semibold">{projet.numero}</p></div>}
              {projet.periode && <div><p className="text-green-500/50 text-xs">période</p><p className="text-white font-semibold">{projet.periode}</p></div>}
              {projet.lieu    && <div><p className="text-green-500/50 text-xs">lieu</p><p className="text-white font-semibold">{projet.lieu}</p></div>}
            </div>
            {projet.lienProduction && (
              <a href={projet.lienProduction} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 bg-green-500/8 text-green-400 border border-green-500/25 px-4 py-2 rounded text-sm font-mono hover:bg-green-500/15 transition-colors">
                Accéder aux productions →
              </a>
            )}
          </div>
        )}

        {/* Aperçu fiche Word */}
        {projet.ficheWord && (
          <div>
            <h2 className="text-white font-black text-xl mb-4 flex items-center gap-2 font-mono">
              <span className="text-sky-400">📄</span> Aperçu document officiel
            </h2>
            <div className="bg-slate-900 border border-slate-800 rounded overflow-hidden">
              <div className="bg-slate-800 px-5 py-3 flex items-center justify-between border-b border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="ml-2">
                    <p className="text-white text-sm font-semibold font-mono">Fiche descriptive BTS SIO — Épreuve E6</p>
                    <p className="text-slate-500 text-xs font-mono">Session 2026 — AHMIDDOUCH Mehdi</p>
                  </div>
                </div>
                <a href={projet.ficheWord} download
                  className="flex items-center gap-1.5 bg-green-500/10 hover:bg-green-500/20 border border-green-500/25 text-green-400 text-xs font-mono px-3 py-1.5 rounded transition-colors">
                  ↓ télécharger
                </a>
              </div>
              <div className="bg-white" style={{ height: "600px" }}>
                <iframe
                  src={`https://docs.google.com/gview?url=${encodeURIComponent("https://mehdi7881.github.io/portfolio" + projet.ficheWord)}&embedded=true`}
                  className="w-full h-full border-0"
                  title="Aperçu fiche"
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation projets */}
        <div className="border-t border-slate-800 pt-10">
          <p className="text-green-500/40 text-xs font-mono mb-5">Autres projets</p>
          <div className="grid grid-cols-2 gap-4">
            {prev ? (
              <button onClick={() => onNavigate("projet", prev.id)}
                className="flex items-center gap-3 bg-slate-900 border border-slate-800 hover:border-green-500/25 rounded p-4 text-left group transition-all">
                <span className="text-slate-600 group-hover:-translate-x-1 transition-transform text-lg font-mono">←</span>
                <div>
                  <p className="text-slate-600 text-xs font-mono">Précédent</p>
                  <p className="text-white font-semibold text-sm group-hover:text-green-400 transition-colors">{prev.titre}</p>
                </div>
              </button>
            ) : <div />}
            {next ? (
              <button onClick={() => onNavigate("projet", next.id)}
                className="flex items-center gap-3 bg-slate-900 border border-slate-800 hover:border-green-500/25 rounded p-4 text-right justify-end group transition-all">
                <div>
                  <p className="text-slate-600 text-xs font-mono">Suivant</p>
                  <p className="text-white font-semibold text-sm group-hover:text-green-400 transition-colors">{next.titre}</p>
                </div>
                <span className="text-slate-600 group-hover:translate-x-1 transition-transform text-lg font-mono">→</span>
              </button>
            ) : <div />}
          </div>
        </div>
      </div>
    </div>
  );
}
