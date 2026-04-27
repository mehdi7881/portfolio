// ═══════════════════════════════════════════════════════════════
// EntrepriseDetail.jsx — Page détail entreprise
// CORRECTIONS : page Mairie vierge + "Scene" → "Stage"
// ═══════════════════════════════════════════════════════════════
import { SafeImg } from "./ui.jsx";
import { PROFILE } from "../data.js";

const ENTREPRISES_DETAIL = {
  // ✅ CORRECTION : la clé doit correspondre EXACTEMENT à ce qui est passé
  // dans onNavigate("entreprise", e.nom) — ici e.nom = "ATERMES" et "Mairie de Coignières"
  "ATERMES": {
    nom: "ATERMES",
    slogan: "L'innovation au cœur de vos activités",
    logo: "/assets/logo-atermes.png",
    site: "https://www.atermes.fr",
    // ✅ CORRECTION : "Scene" → "Stage" (et ici c'est bien Alternance)
    type: "Alternance",
    periode: "Septembre 2025 - Juin 2026",
    lieu: "Montigny-le-Bretonneux, Yvelines (78)",
    secteur: "Industrie de défense & haute technologie",
    effectif: "~200 personnes",
    fondation: "1989",
    fondateur: "Charles CASANOVA",
    description: "La Société ATERMES (Applications Techniques Études Réalisations Mécaniques Électroniques Systèmes), créée en 1989, est devenue aujourd'hui un groupe de près de 200 personnes. ATERMES est un partenaire industriel de choix depuis plus de 35 ans, proposant des solutions innovantes et performantes dans les secteurs de la défense et des industries de hautes technologies.",
    metiers: [
      { nom: "Mécanique",    desc: "Conception et fabrication de composants mécaniques de haute précision" },
      { nom: "Électronique", desc: "Ingénierie électronique pour systèmes embarqués et durcis" },
      { nom: "Optronique",   desc: "Systèmes optiques et électroniques pour la défense" },
      { nom: "Logiciel",     desc: "Développement logiciel embarqué et systèmes temps réel" },
    ],
    sites: [
      {
        nom: "Siège social - Montigny-le-Bretonneux",
        lieu: "4 avenue des Trois Peuples, 78180 Montigny-le-Bretonneux (78)",
        role: "R&D, études et conceptions à forte valeur ajoutée",
        image: "/assets/atermes-montigny.jpg",
        annee: "1993",
      },
      {
        nom: "Site de production - Salbris",
        lieu: "Salbris (41)",
        role: "Centre de production, maintenance et compétences radar",
        image: "/assets/atermes-salbris.jpg",
        annee: "2004",
      },
    ],
    missions: [
      "Administration systèmes et réseaux",
      "Mise en place de services informatiques",
      "Support technique et maintenance du parc",
      "Participation aux projets d'infrastructure IT",
      "Gestion des utilisateurs et des droits d'accès",
    ],
    technologies: ["Windows Server", "Active Directory", "GLPI", "Réseaux", "Cybersécurité"],
    confidentialite: true,
  },

  // ✅ CORRECTION CLEF : "Mairie de Coignières" avec accent et espace
  // → doit correspondre EXACTEMENT à PROFILE.entreprises[1].nom dans data.js
  "Mairie de Coignières": {
    nom: "Mairie de Coignières",
    slogan: "Éco solidaire par nature",
    logo: "/assets/logo-coignieres.jpg",
    site: "https://www.coignieres.fr",
    // ✅ CORRECTION : "Scene" → "Stage"
    type: "Stage",
    periode: "28 avril - 25 juin 2025 (8 semaines)",
    lieu: "Coignières, Yvelines (78)",
    secteur: "Collectivité territoriale",
    effectif: "Service DSI",
    fondation: "Commune des Yvelines",
    description: "La Mairie de Coignières est une collectivité territoriale située dans les Yvelines (78). J'ai effectué mon stage de 8 semaines au sein de la Direction des Systèmes d'Information (DSI), où j'ai participé à l'administration du parc informatique, la supervision réseau et le support aux agents municipaux.",
    metiers: [
      { nom: "Support utilisateurs",    desc: "Assistance technique aux agents municipaux" },
      { nom: "Administration systèmes", desc: "Gestion des serveurs et infrastructure réseau" },
      { nom: "Supervision réseau",      desc: "Monitoring avec Zabbix" },
      { nom: "Gestion de parc",         desc: "Inventaire et maintenance du matériel" },
    ],
    sites: [
      {
        nom: "Mairie de Coignières",
        lieu: "Place du Général de Gaulle, 78310 Coignières",
        role: "Siège de la collectivité - DSI",
        image: "/assets/logo-coignieres.jpg",
        annee: "Stage 2025",
      },
    ],
    missions: [
      "Installation et configuration serveur HP ProLiant sous Debian 12",
      "Déploiement de Zabbix 6.0 pour la supervision réseau",
      "Analyse et schématisation de l'infrastructure réseau",
      "Support technique des agents municipaux",
      "Déplacements écoles, CCAS, MDJ pour incidents réseau et VPN",
      "Création de comptes utilisateurs (GLPI, messagerie pro)",
    ],
    technologies: ["Debian 12", "Zabbix 6.0", "GLPI", "VPN", "Windows Server", "Cisco"],
    confidentialite: false,
  },
};

export function EntrepriseDetail({ entrepriseNom, onNavigate }) {
  // ✅ CORRECTION BUG PAGE VIERGE : recherche tolérante aux variantes
  // Cherche d'abord la clé exacte, puis normalise si besoin
  let e = ENTREPRISES_DETAIL[entrepriseNom];

  // Fallback : recherche insensible aux accents/espaces
  if (!e) {
    const normalize = (s) => s?.toLowerCase().replace(/[^a-z0-9]/g, "");
    const key = Object.keys(ENTREPRISES_DETAIL).find(
      (k) => normalize(k) === normalize(entrepriseNom)
    );
    if (key) e = ENTREPRISES_DETAIL[key];
  }

  if (!e) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center font-mono">
          <p className="text-green-400 text-2xl mb-4">404</p>
          <p className="text-slate-400 mb-2">Entreprise non trouvée : <span className="text-white">"{entrepriseNom}"</span></p>
          <button onClick={() => onNavigate("home")} className="mt-4 text-green-400 hover:text-green-300 border border-green-500/30 px-4 py-2 rounded text-sm transition-colors">
            ← retour accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-slate-900 to-slate-950 pt-32 pb-16 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-matrix-grid opacity-30" />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <button onClick={() => onNavigate("home")}
            className="flex items-center gap-2 text-slate-400 hover:text-green-400 transition-colors mb-8 text-sm group font-mono">
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            cd ../accueil
          </button>

          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="w-24 h-24 rounded border border-slate-700 bg-white flex items-center justify-center p-3 flex-shrink-0">
              <SafeImg src={e.logo} alt={e.nom} className="w-full h-full object-contain" fallbackText={e.nom.slice(0, 2)} />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                {/* ✅ CORRECTION : type correct (Stage / Alternance), plus de "Scene" */}
                <span className={`text-xs font-bold px-3 py-1 rounded border font-mono ${e.type === "Alternance" ? "bg-sky-500/10 text-sky-400 border-sky-500/25" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/25"}`}>
                  {e.type}
                </span>
                {e.confidentialite && (
                  <span className="text-xs font-bold px-3 py-1 rounded border bg-red-500/10 text-red-400 border-red-500/25 font-mono">
                    Confidentiel Défense
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-2">{e.nom}</h1>
              <p className="text-green-400 text-lg font-mono mb-4">{e.slogan}</p>
              <div className="flex flex-wrap gap-4 text-slate-400 text-sm font-mono">
                <span>📍 {e.lieu}</span>
                <span>📅 {e.periode}</span>
                <span>👥 {e.effectif}</span>
                <span>🏭 Fondée en {e.fondation}</span>
              </div>
            </div>
            <a href={e.site} target="_blank" rel="noreferrer"
              className="bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-400 font-bold font-mono px-6 py-3 rounded transition-all flex-shrink-0 text-sm">
              visiter →
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">

        {/* Description */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-white font-black text-2xl mb-4 font-mono">
              <span className="text-green-500/60">$</span> presentation
            </h2>
            <p className="text-slate-300 leading-relaxed">{e.description}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded p-6 space-y-4 font-mono">
            {[
              { label: "secteur",    value: e.secteur },
              { label: "effectif",   value: e.effectif },
              { label: "creation",   value: e.fondation },
              { label: "localisation",value: e.lieu },
            ].map((c) => (
              <div key={c.label}>
                <p className="text-green-500/50 text-xs">$ {c.label}</p>
                <p className="text-white font-semibold text-sm">{c.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Métiers */}
        <div>
          <h2 className="text-white font-black text-2xl mb-6 font-mono">
            <span className="text-green-500/60">$</span> metiers
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {e.metiers.map((m) => (
              <div key={m.nom} className="bg-slate-900 border border-slate-800 rounded p-5 hover:border-green-500/25 transition-all">
                <p className="text-green-400 font-black text-sm mb-2 font-mono">{m.nom}</p>
                <p className="text-slate-400 text-xs leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sites */}
        <div>
          <h2 className="text-white font-black text-2xl mb-6 font-mono">
            <span className="text-green-500/60">$</span> {e.sites.length > 1 ? "sites" : "site"}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {e.sites.map((s) => (
              <div key={s.nom} className="bg-slate-900 border border-slate-800 rounded overflow-hidden hover:border-green-500/25 transition-all">
                <div className="h-48 overflow-hidden bg-slate-800">
                  <SafeImg src={s.image} alt={s.nom} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" fallbackText={s.nom} />
                </div>
                <div className="p-5">
                  <span className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded font-mono mb-2 inline-block">{s.annee}</span>
                  <h3 className="text-white font-black text-base mb-1">{s.nom}</h3>
                  <p className="text-slate-400 text-xs mb-2 font-mono">📍 {s.lieu}</p>
                  <p className="text-slate-300 text-sm">{s.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Confidentialité */}
        {e.confidentialite && (
          <div className="bg-red-500/5 border border-red-500/20 rounded p-6 flex items-start gap-4">
            <span className="text-2xl flex-shrink-0">🔒</span>
            <div>
              <p className="text-red-400 font-bold mb-1 font-mono">Confidentialité - Secteur Défense</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                En raison du caractère confidentiel des activités d'ATERMES dans le secteur de la défense, les détails spécifiques des missions, captures d'écran et documents internes ne peuvent pas être divulgués. Les informations présentées restent générales.
              </p>
            </div>
          </div>
        )}

        {/* Mes missions */}
        <div>
          <h2 className="text-white font-black text-2xl mb-6 font-mono">
            <span className="text-green-500/60">$</span> missions
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {e.missions.map((m, i) => (
              <div key={i} className="flex items-start gap-3 bg-slate-900 border border-slate-800 rounded px-5 py-4 hover:border-green-500/20 transition-colors">
                <span className="w-6 h-6 rounded border border-green-500/25 bg-green-500/8 text-green-400 flex items-center justify-center text-xs font-bold font-mono flex-shrink-0 mt-0.5">{i + 1}</span>
                <p className="text-slate-300 text-sm leading-relaxed">{m}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div>
          <h2 className="text-white font-black text-2xl mb-4 font-mono">
            <span className="text-green-500/60">$</span> technologies
          </h2>
          <div className="flex flex-wrap gap-2">
            {e.technologies.map((t) => (
              <span key={t} className="bg-green-500/8 text-green-400 border border-green-500/20 text-sm font-mono px-4 py-2 rounded">{t}</span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
