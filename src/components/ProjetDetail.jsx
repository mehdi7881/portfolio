import { useState } from "react";
import { Section, TechBadge } from "./ui.jsx";
import { PROJETS } from "../data.js";

// ─── GALERIE D'IMAGES ────────────────────────────────────────────────────────
function Galerie({ images }) {
  const [active, setActive] = useState(null);

  if (!images || images.length === 0) return null;

  return (
    <div>
      <h3 className="text-white font-bold text-xl mb-5 flex items-center gap-2">
        <span className="text-sky-400">📷</span> Captures d'écran
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(img)}
            className="group relative overflow-hidden rounded-xl border border-slate-700 hover:border-sky-500/60 transition-all bg-slate-800"
          >
            <img
              src={img.src}
              alt={img.legende}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <p className="text-white text-xs font-medium">{img.legende}</p>
            </div>
            <div className="absolute top-2 right-2 bg-sky-500/80 text-white text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              Agrandir
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={active.src} alt={active.legende} className="w-full rounded-xl shadow-2xl" />
            <p className="text-slate-300 text-center mt-3 text-sm">{active.legende}</p>
            <button
              onClick={() => setActive(null)}
              className="mt-4 mx-auto flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
            >
              ✕ Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── DOCUMENTS ───────────────────────────────────────────────────────────────
function Documents({ documents }) {
  if (!documents || documents.length === 0) return null;

  return (
    <div>
      <h3 className="text-white font-bold text-xl mb-5 flex items-center gap-2">
        <span className="text-sky-400">📄</span> Documents
      </h3>
      <div className="flex flex-col gap-3">
        {documents.map((doc, i) => (
          <a
            key={i}
            href={doc.fichier}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 bg-slate-800 border border-slate-700 hover:border-sky-500/50 rounded-xl px-5 py-4 group transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400 flex-shrink-0 text-lg">
              📑
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold group-hover:text-sky-400 transition-colors">{doc.nom}</p>
              <p className="text-slate-500 text-sm">{doc.description}</p>
            </div>
            <div className="text-sky-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
              Ouvrir →
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── PAGE PROJET DÉTAIL ──────────────────────────────────────────────────────
export function ProjetDetail({ projetId, onNavigate }) {
  const projet = PROJETS.find((p) => p.id === projetId);
  if (!projet) return null;

  const idx = PROJETS.findIndex((p) => p.id === projetId);
  const prev = PROJETS[idx - 1] || null;
  const next = PROJETS[idx + 1] || null;

  // Catégorie couleur
  const catColor = {
    Infrastructure: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    Réseau: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    Sécurité: "bg-red-500/15 text-red-400 border-red-500/30",
    Veille: "bg-purple-500/15 text-purple-400 border-purple-500/30",
    "Gestion de parc": "bg-amber-500/15 text-amber-400 border-amber-500/30",
    Développement: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  }[projet.categorie] || "bg-sky-500/15 text-sky-400 border-sky-500/30";

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero du projet */}
      <div className={`relative bg-gradient-to-br ${projet.couleur} pt-32 pb-20 overflow-hidden`}>
        <div className="absolute inset-0 bg-slate-950/75" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <button
            onClick={() => onNavigate("home", "#realisations")}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 text-sm group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Retour aux réalisations
          </button>

          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center text-3xl flex-shrink-0">
              {projet.icon}
            </div>
            <div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${catColor} mb-3 inline-block`}>
                {projet.categorie}
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
                {projet.titre}
              </h1>
            </div>
          </div>

          <p className="text-slate-300 text-lg max-w-3xl leading-relaxed">{projet.courte}</p>

          <div className="flex flex-wrap gap-2 mt-6">
            {projet.technologies.map((t) => (
              <TechBadge key={t} label={t} />
            ))}
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">

        {/* Description */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-white font-black text-2xl mb-4 flex items-center gap-2">
              <span className="text-sky-400">📋</span> Description du projet
            </h2>
            <p className="text-slate-300 leading-relaxed text-base">{projet.description}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-4">Infos rapides</h3>
            <div className="space-y-3">
              <div>
                <p className="text-slate-500 text-xs">Catégorie</p>
                <p className="text-white font-semibold">{projet.categorie}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs">Technologies</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {projet.technologies.map((t) => (
                    <TechBadge key={t} label={t} small />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-slate-500 text-xs">Missions</p>
                <p className="text-white font-semibold">{projet.missions.length} tâches réalisées</p>
              </div>
            </div>
          </div>
        </div>

        {/* Missions */}
        <div>
          <h2 className="text-white font-black text-2xl mb-6 flex items-center gap-2">
            <span className="text-sky-400">✅</span> Missions réalisées
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {projet.missions.map((m, i) => (
              <div key={i} className="flex items-start gap-3 bg-slate-900 border border-slate-800 rounded-xl px-5 py-4 hover:border-sky-500/30 transition-colors">
                <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-slate-300 text-sm leading-relaxed">{m}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Galerie */}
        {projet.images && projet.images.length > 0 && (
          <Galerie images={projet.images} />
        )}

        {/* Documents */}
        {projet.documents && projet.documents.length > 0 && (
          <Documents documents={projet.documents} />
        )}

        {/* Navigation projets */}
        <div className="border-t border-slate-800 pt-10">
          <p className="text-slate-500 text-sm mb-5 font-medium uppercase tracking-wider">Autres projets</p>
          <div className="grid grid-cols-2 gap-4">
            {prev ? (
              <button
                onClick={() => onNavigate("projet", prev.id)}
                className="flex items-center gap-3 bg-slate-900 border border-slate-800 hover:border-sky-500/40 rounded-xl p-4 text-left group transition-all"
              >
                <span className="text-slate-500 group-hover:-translate-x-1 transition-transform text-lg">←</span>
                <div>
                  <p className="text-slate-500 text-xs">Précédent</p>
                  <p className="text-white font-semibold text-sm group-hover:text-sky-400 transition-colors">{prev.titre}</p>
                </div>
              </button>
            ) : <div />}

            {next ? (
              <button
                onClick={() => onNavigate("projet", next.id)}
                className="flex items-center gap-3 bg-slate-900 border border-slate-800 hover:border-sky-500/40 rounded-xl p-4 text-right justify-end group transition-all"
              >
                <div>
                  <p className="text-slate-500 text-xs">Suivant</p>
                  <p className="text-white font-semibold text-sm group-hover:text-sky-400 transition-colors">{next.titre}</p>
                </div>
                <span className="text-slate-500 group-hover:translate-x-1 transition-transform text-lg">→</span>
              </button>
            ) : <div />}
          </div>
        </div>
      </div>
    </div>
  );
}
