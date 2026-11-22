import { Section, TechBadge } from "./ui.jsx";
import { PROFILE, PROJETS, VEILLE } from "../data.js";

// ─── HERO ────────────────────────────────────────────────────────────────────
export function Hero({ onNavigate }) {
  return (
    <section id="accueil" className="min-h-screen flex flex-col justify-center bg-slate-950 relative overflow-hidden">
      {/* Grille de fond */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{ backgroundImage: "linear-gradient(rgba(14,165,233,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      {/* Glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-sky-600/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-32 relative z-10">
        <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/25 text-sky-400 text-xs font-mono px-4 py-2 rounded-full mb-8 tracking-widest uppercase">
          <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-pulse" />
          Portfolio BTS SIO SISR - E5 · Session 2027
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white mb-5 leading-[1.05] tracking-tight">
          Bienvenue sur<br />
          <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">mon portfolio</span>
        </h1>

        <p className="text-sky-300 font-bold text-xl mb-4">{PROFILE.nom}</p>
        <p className="text-slate-400 text-lg max-w-2xl mb-10 leading-relaxed">{PROFILE.tagline}</p>

        <div className="flex flex-wrap gap-4 mb-20">
          <a href="#realisations" className="bg-sky-500 hover:bg-sky-400 text-white font-bold px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30 hover:-translate-y-0.5">
            Voir mes réalisations
          </a>
          <a href={PROFILE.cv} target="_blank" rel="noreferrer"
            className="border border-slate-700 hover:border-sky-500/60 text-slate-300 hover:text-white font-bold px-7 py-3.5 rounded-xl transition-all hover:-translate-y-0.5">
            Télécharger mon CV
          </a>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Formation", value: "BTS SIO SISR", icon: "🎓" },
            { label: "École", value: "H3 Campus", icon: "🏫" },
            { label: "Stage", value: "Mairie Coignières", icon: "🏛️" },
            { label: "Alternance 2025-26", value: "ATERMES", icon: "💼" },
          ].map((c) => (
            <div key={c.label} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur hover:border-slate-700 transition-colors">
              <p className="text-2xl mb-2">{c.icon}</p>
              <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">{c.label}</p>
              <p className="text-white font-bold text-sm">{c.value}</p>
            </div>
          ))}
        </div>

        {/* Liens rapides */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
          {[
            { label: "À propos", desc: "Profil, parcours et expériences", href: "#apropos", icon: "👤" },
            { label: "Compétences", desc: "Systèmes, réseaux, sécurité", href: "#competences", icon: "⚡" },
            { label: "Veille tech.", desc: "RaaS, 2FA et cybersécurité", href: "#veille", icon: "🔍" },
          ].map((c) => (
            <a key={c.label} href={c.href}
              className="flex items-center gap-3 bg-slate-900/50 border border-slate-800 hover:border-sky-500/40 rounded-xl p-4 group transition-all">
              <span className="text-xl">{c.icon}</span>
              <div>
                <p className="text-white font-semibold text-sm group-hover:text-sky-400 transition-colors">{c.label}</p>
                <p className="text-slate-500 text-xs">{c.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── À PROPOS ────────────────────────────────────────────────────────────────
export function APropos({ onNavigate }) {
  return (
    <>
      {/* ── PRÉSENTATION PERSONNELLE ── */}
      <Section id="apropos" title="À propos" subtitle="Mon profil, mon parcours et mes expériences" dark>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Gauche - identité */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-sky-500/20">
                M
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">{PROFILE.nom}</h3>
                <p className="text-sky-400 font-medium">{PROFILE.formation} · {PROFILE.age} ans</p>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed mb-6">{PROFILE.presentation.texte}</p>
            <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-5 mb-5">
              <p className="text-sky-400 font-bold mb-3 flex items-center gap-2"><span>✨</span> Points clés</p>
              <ul className="space-y-2">
                {PROFILE.presentation.points.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                    <span className="text-sky-400 mt-0.5 flex-shrink-0">→</span>{p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-5 mb-5">
              <p className="text-sky-400 font-bold mb-2 flex items-center gap-2"><span>🎯</span> Mon objectif</p>
              <p className="text-slate-300 text-sm leading-relaxed">{PROFILE.objectif}</p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-5">
              <p className="text-sky-400 font-bold mb-3 flex items-center gap-2"><span>🌍</span> Langues</p>
              <div className="flex gap-6">
                {PROFILE.langues.map((l) => (
                  <div key={l.langue}>
                    <p className="text-white font-semibold text-sm">{l.langue}</p>
                    <p className="text-slate-500 text-xs mb-1">{l.niveau}</p>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`w-4 h-1.5 rounded-full ${i < l.stars ? "bg-sky-400" : "bg-slate-700"}`} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Droite - parcours */}
          <div className="space-y-4">
            <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-6">
              <p className="text-sky-400 font-bold mb-4 flex items-center gap-2"><span>🎓</span> Parcours scolaire</p>
              <div className="relative pl-4 border-l border-slate-700 space-y-4">
                {PROFILE.apropos.parcours.map((p, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[21px] w-3 h-3 rounded-full bg-sky-500 border-2 border-slate-900" />
                    <p className="text-white font-semibold text-sm">{p.titre}</p>
                    <p className="text-sky-400 text-xs">{p.ecole}</p>
                    <p className="text-slate-500 text-xs">{p.periode}</p>
                  </div>
                ))}
              </div>
            </div>
            {PROFILE.entreprises.map((e, i) => (
              <div key={i} className="bg-slate-800/50 border border-sky-500/20 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">{e.type}</span>
                  <p className="text-white font-bold text-sm">{e.nom}</p>
                </div>
                <p className="text-slate-500 text-xs mb-3">{e.periode} · {e.lieu}</p>
                {e.missions.length > 0 && (
                  <ul className="space-y-1">
                    {e.missions.slice(0, 3).map((m, j) => (
                      <li key={j} className="flex items-start gap-2 text-slate-300 text-xs">
                        <span className="text-sky-400 mt-0.5 flex-shrink-0">·</span>{m}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── MES ÉCOLES ── */}
      <Section id="ecoles" title="Mes écoles" subtitle="Mon parcours de formation et mon projet d'études">
        <div className="grid md:grid-cols-2 gap-6">
          {PROFILE.ecoles.map((e, i) => (
            <div key={i} className={`relative bg-slate-900 border rounded-2xl overflow-hidden hover:border-opacity-60 transition-all ${e.futur ? "border-amber-500/40 hover:border-amber-500/70" : "border-slate-800 hover:border-sky-500/40"}`}>
              {/* Barre couleur en haut */}
              <div className={`h-3 bg-gradient-to-r ${e.couleur}`} />

              {/* Badge futur */}
              {e.futur && (
                <div className="absolute top-5 right-4">
                  <span className="flex items-center gap-1.5 bg-amber-500/15 text-amber-400 border border-amber-500/30 text-xs font-bold px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
                    Future école
                  </span>
                </div>
              )}

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 pr-3">
                    <h3 className="text-white font-black text-base leading-snug mb-1">{e.nom}</h3>
                    <p className={`text-sm font-medium ${e.futur ? "text-amber-400" : "text-sky-400"}`}>{e.diplome}</p>
                  </div>
                  {e.logo && (
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-white flex items-center justify-center flex-shrink-0 border border-slate-700 p-1">
                      <img src={e.logo} alt={e.nom} className="w-full h-full object-contain" />
                    </div>
                  )}
                </div>
                <p className="text-slate-400 text-xs mb-1 flex items-center gap-1">📍 {e.lieu}</p>
                <p className="text-slate-400 text-xs mb-4">📅 {e.periode}</p>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">{e.description}</p>

                {/* Infos supplémentaires pour la future école */}
                {e.futur && e.infos && (
                  <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 mb-4">
                    <p className="text-amber-400 text-xs uppercase tracking-wider font-bold mb-3">Informations</p>
                    <div className="space-y-1.5">
                      {e.infos.map((info) => (
                        <div key={info.label} className="flex items-start justify-between gap-2">
                          <span className="text-slate-500 text-xs">{info.label}</span>
                          <span className="text-slate-300 text-xs font-medium text-right">{info.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-wider mb-2">
                    {e.futur ? "Matières visées" : "Matières principales"}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {e.matieres.map((m) => (
                      <span key={m} className={`text-xs px-2.5 py-1 rounded-full border ${e.futur ? "bg-amber-500/10 text-amber-300 border-amber-500/20" : "bg-slate-800 text-slate-300 border-slate-700"}`}>
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── MES ENTREPRISES ── */}
      <Section id="entreprises" title="Mes entreprises" subtitle="Stage et alternance - expériences en milieu professionnel" dark>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROFILE.entreprises.map((e, i) => (
            <button
              key={i}
              onClick={() => !e.enRecherche && onNavigate("entreprise", e.nom)}
              className={`text-left bg-slate-950 border rounded-2xl overflow-hidden transition-all group ${e.enRecherche ? "border-dashed border-slate-700 cursor-default" : "border-slate-800 hover:border-sky-500/40 hover:-translate-y-1"}`}
            >
              <div className={`h-3 bg-gradient-to-r ${e.couleur}`} />
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 pr-3">
                    <h3 className="text-white font-black text-lg">{e.nom}</h3>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${e.type === "Alternance" ? "text-sky-400 bg-sky-500/10 border-sky-500/25" : "text-emerald-400 bg-emerald-500/10 border-emerald-500/25"}`}>
                      {e.type}
                    </span>
                  </div>
                  {e.logo && (
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-white flex items-center justify-center flex-shrink-0 border border-slate-700 p-1">
                      <img src={e.logo} alt={e.nom} className="w-full h-full object-contain" />
                    </div>
                  )}
                </div>
                <p className="text-slate-400 text-xs mb-1">📍 {e.lieu}</p>
                <p className="text-slate-400 text-xs mb-1">📅 {e.periode}</p>
                {e.fondation && <p className="text-slate-400 text-xs mb-1">🏭 Fondée en {e.fondation} · {e.effectif}</p>}
                {e.secteur && <p className="text-slate-400 text-xs mb-4">💼 {e.secteur}</p>}
                <p className="text-slate-300 text-sm leading-relaxed mb-4">{e.description}</p>
                {e.missions.length > 0 && (
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-wider mb-2">Missions</p>
                    <ul className="space-y-1.5">
                      {e.missions.slice(0, 3).map((m, j) => (
                        <li key={j} className="flex items-start gap-2 text-slate-300 text-sm">
                          <span className="text-sky-400 mt-0.5 flex-shrink-0">→</span>{m}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {e.enRecherche ? (
                  <div className="mt-4 inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 border border-amber-500/25 text-xs font-semibold px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
                    Recherche en cours
                  </div>
                ) : (
                  <div className="flex items-center gap-1 mt-4 text-sky-400 text-sm font-semibold group-hover:gap-2 transition-all">
                    Voir le detail <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </Section>
    </>
  );
}


// ─── COMPÉTENCES ─────────────────────────────────────────────────────────────
function LignePreuve({ preuve, onNavigate }) {
  const projet = preuve.id ? PROJETS.find((p) => p.id === preuve.id) : null;
  if (preuve.id && !projet) return null;
  const titre = projet ? projet.titre : preuve.titre;
  const outils = projet ? (projet.technologies || []).slice(0, 4) : (preuve.outils || []);
  const cliquable = Boolean(projet || preuve.href);
  const base = "group block w-full text-left bg-slate-900/60 border border-slate-800 rounded-xl p-3 ";
  const contenu = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span className="text-white text-sm font-semibold leading-snug">{titre}</span>
        {cliquable && (
          <span className="text-sky-400 text-sm flex-shrink-0 transition-transform group-hover:translate-x-1">→</span>
        )}
      </div>
      <p className="text-slate-400 text-xs leading-relaxed mt-1">{preuve.fait}</p>
      {outils.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {outils.map((t) => (
            <span key={t} className="text-[10px] text-slate-300 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded-full">{t}</span>
          ))}
        </div>
      )}
      {projet && (
        <span className="inline-block mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          {projet.type === "entreprise" ? "En entreprise" : "Scolaire"}
        </span>
      )}
    </>
  );
  if (projet) {
    return (
      <button onClick={() => onNavigate("projet", projet.id)} className={base + "hover:border-sky-500/50 transition-colors"}>
        {contenu}
      </button>
    );
  }
  if (preuve.href) {
    return (
      <a href={preuve.href} className={base + "hover:border-sky-500/50 transition-colors"}>
        {contenu}
      </a>
    );
  }
  return <div className={base}>{contenu}</div>;
}

export function Competences({ onNavigate }) {
  const referentiel = [
    {
      num: "C1",
      titre: "Gérer le patrimoine informatique",
      resume: "Je recense, documente et suis le matériel et les logiciels d'un parc.",
      couleur: "border-sky-500/40 bg-sky-500/5",
      badge: "text-sky-400",
      preuves: [
        { id: "inventaire-materiel-2027", fait: "Inventaire complet d'un serveur Dell PowerEdge R520 : CPU, RAM, stockage RAID 5, réseau." },
        { id: "inventaire-proxmox", fait: "Inventaire des routeurs, commutateurs, bornes Wi-Fi, serveurs et postes de la M2L." },
        { id: "gestion-parc", fait: "GLPI et OCS Inventory, agent déployé par GPO sur les postes du domaine." },
        { id: "glpi-ocs-m2l", fait: "Synchronisation OCS vers GLPI, création des utilisateurs et des droits d'accès." },
      ],
    },
    {
      num: "C2",
      titre: "Répondre aux incidents et aux demandes d'assistance",
      resume: "Je diagnostique, résous et documente les incidents.",
      couleur: "border-violet-500/40 bg-violet-500/5",
      badge: "text-violet-400",
      preuves: [
        { id: "support-technique", fait: "Diagnostic de problèmes de connectivité, borne Wi-Fi au CCAS, antivirus réinstallé, rapports d'intervention." },
        { id: "nagios-m2l", fait: "Simulation de panne et vérification des alertes UP/DOWN et des notifications par mail." },
        { id: "zabbix-supervision", fait: "Alertes configurées (CPU > 90 %, espace disque) pour détecter les incidents." },
      ],
    },
    {
      num: "C3",
      titre: "Développer la présence en ligne de l'organisation",
      resume: "Je conçois des contenus web et des supports clairs.",
      couleur: "border-purple-500/40 bg-purple-500/5",
      badge: "text-purple-400",
      preuves: [
        { id: "site-web", fait: "Site vitrine HTML/CSS/JS, charte graphique et logo pour l'entreprise fictive NEBULAX (AP1)." },
        { titre: "Ce portfolio", fait: "Site en ligne pour présenter mes réalisations.", outils: ["React", "Tailwind CSS", "Vercel"] },
      ],
    },
    {
      num: "C4",
      titre: "Travailler en mode projet",
      resume: "Je cadre un projet, compare des solutions, justifie mes choix et livre un dossier.",
      couleur: "border-sky-500/40 bg-sky-500/5",
      badge: "text-sky-400",
      preuves: [
        { id: "ap2-m2l", fait: "Étude comparée de 3 solutions VLAN et de 2 solutions Wi-Fi, choix justifié, maquette, dossier et présentation." },
        { id: "site-web", fait: "Projet AP1 complet : entreprise fictive, business plan, fiches de poste, présentation PowerPoint." },
      ],
    },
    {
      num: "C5",
      titre: "Mettre à disposition un service informatique",
      resume: "J'installe, configure, teste et documente des services pour les utilisateurs.",
      couleur: "border-violet-500/40 bg-violet-500/5",
      badge: "text-violet-400",
      preuves: [
        { id: "zabbix-supervision", fait: "Supervision Zabbix 6.0 sur Debian 12 : serveur, agents, tableaux de bord." },
        { id: "nagios-m2l", fait: "Nagios4 : hôtes, services, seuils, SNMP et notifications par Postfix." },
        { id: "virtualisation", fait: "Serveur FTPS (FileZilla) sur Windows Server, avec TLS, comptes et droits d'accès." },
        { id: "glpi-ocs-m2l", fait: "Serveur Ubuntu sur Proxmox avec pile LAMP, OCS Inventory et GLPI." },
      ],
    },
    {
      num: "C6",
      titre: "Organiser son développement professionnel",
      resume: "Je me forme en continu et je suis l'actualité de la cybersécurité.",
      couleur: "border-purple-500/40 bg-purple-500/5",
      badge: "text-purple-400",
      preuves: [
        { href: "#veille", titre: "Veille technologique", fait: "Articles de cybersécurité sélectionnés à partir d'alertes Google, sur la page Veille.", outils: ["Alertes Google"] },
        { id: "cybersecurite-linux", fait: "Étude du 2FA, accès SSH par clés RSA et rapport de sécurité sur une VM Kali Linux." },
        { href: "#ecoles", titre: "Poursuite d'études", fait: "Projet de Licence Pro MRIT parcours ASUR (cybersécurité) à l'IUT de Vélizy-Rambouillet." },
      ],
    },
  ];

  return (
    <Section id="competences" title="Compétences" subtitle="Ce que je sais faire, avec les réalisations et les outils qui le prouvent">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/60 rounded-3xl p-6 md:p-8">
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/25 mb-4 inline-block">BTS SIO SISR</span>
        <h3 className="text-white font-black text-3xl mb-4">Mes compétences, preuves à l'appui</h3>
        <p className="text-slate-400 leading-relaxed max-w-3xl mb-8">
          Chaque compétence du référentiel est reliée aux réalisations qui la démontrent, avec les outils que j'y ai utilisés. Elles viennent de mes stages, de mon alternance et de ma formation.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {referentiel.map((c) => (
            <div key={c.num} className={`border ${c.couleur} rounded-2xl p-6 flex flex-col`}>
              <span className={`text-xs font-black px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 ${c.badge} mb-4 inline-block self-start`}>{c.num}</span>
              <h4 className="text-white font-black text-base mb-2 leading-snug">{c.titre}</h4>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{c.resume}</p>
              <div className="space-y-2 mt-auto">
                {c.preuves.map((p, i) => (
                  <LignePreuve key={i} preuve={p} onNavigate={onNavigate} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── RÉALISATIONS ────────────────────────────────────────────────────────────
const PROJETS_ENTREPRISE = [
  "zabbix-supervision",
  "infrastructure-reseau",
  "gestion-parc",
  "virtualisation",
  "support-technique",
];
const PROJETS_PERSO = [
  "ap2-m2l",
  "inventaire-proxmox",
  "inventaire-materiel-2027",
  "glpi-ocs-m2l",
  "nagios-m2l",
  "site-web",
];

function ProjetCard({ p, onNavigate }) {
  const catColors = {
    Infrastructure: "text-blue-400 bg-blue-500/10 border-blue-500/25",
    Réseau: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
    Sécurité: "text-red-400 bg-red-500/10 border-red-500/25",
    Veille: "text-purple-400 bg-purple-500/10 border-purple-500/25",
    "Gestion de parc": "text-amber-400 bg-amber-500/10 border-amber-500/25",
    Développement: "text-violet-400 bg-violet-500/10 border-violet-500/25",
  };
  return (
    <button
      onClick={() => onNavigate("projet", p.id)}
      className="text-left bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden hover:border-sky-500/50 transition-all hover:-translate-y-1 group flex flex-col w-full"
    >
      {p.logo ? (
        <div className="h-32 bg-slate-800 flex items-center justify-center p-6 relative overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${p.couleur} opacity-40`} />
          <img src={p.logo} alt={p.titre} className="relative z-10 h-16 w-auto object-contain group-hover:scale-105 transition-transform duration-300" />
        </div>
      ) : p.images && p.images.length > 0 ? (
        <div className="h-32 overflow-hidden bg-slate-800 relative">
          <img src={p.images[0].src} alt={p.titre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-65" />
          <div className={`absolute inset-0 bg-gradient-to-br ${p.couleur} opacity-25`} />
        </div>
      ) : (
        <div className={`h-20 bg-gradient-to-br ${p.couleur} flex items-center justify-center text-3xl opacity-70`}>
          {p.icon}
        </div>
      )}
      <div className="p-4 flex-1 flex flex-col">
        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border mb-2 self-start ${catColors[p.categorie] || "text-sky-400 bg-sky-500/10 border-sky-500/25"}`}>
          {p.categorie}
        </span>
        <h3 className="text-white font-black text-sm mb-1.5 group-hover:text-sky-400 transition-colors leading-snug">{p.titre}</h3>
        <p className="text-slate-500 text-xs leading-relaxed flex-1">{p.courte}</p>
        <div className="flex flex-wrap gap-1 mt-3">
          {p.technologies.slice(0, 3).map((t) => (
            <TechBadge key={t} label={t} small />
          ))}
          {p.technologies.length > 3 && (
            <span className="text-slate-600 text-xs px-1">+{p.technologies.length - 3}</span>
          )}
        </div>
        <div className="flex items-center gap-1 mt-3 text-sky-400 text-xs font-semibold">
          Voir le projet <span className="group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </button>
  );
}

export function Realisations({ onNavigate }) {
  const projetsEntreprise = PROJETS.filter((p) => PROJETS_ENTREPRISE.includes(p.id));
  const projetsPerso = PROJETS.filter((p) => PROJETS_PERSO.includes(p.id));

  return (
    <Section id="realisations" title="Réalisations" subtitle="Mes projets professionnels et personnels" dark>
      <div className="grid lg:grid-cols-2 gap-8">

        {/* Colonne gauche - En entreprise */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 flex items-center justify-center text-sky-400 text-sm">🏢</div>
            <div>
              <h3 className="text-white font-black text-lg">En entreprise</h3>
              <p className="text-slate-500 text-xs">Stage Mairie de Coignières · Alternance ATERMES</p>
            </div>
            <span className="ml-auto bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs px-2.5 py-1 rounded-full">
              {projetsEntreprise.length} projets
            </span>
          </div>
          <div className="grid gap-4">
            {projetsEntreprise.map((p) => (
              <ProjetCard key={p.id} p={p} onNavigate={onNavigate} />
            ))}
          </div>
        </div>

        {/* Colonne droite - Personnels / scolaires */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-400 text-sm">🎓</div>
            <div>
              <h3 className="text-white font-black text-lg">Scolaires & personnels</h3>
              <p className="text-slate-500 text-xs">H3 Campus · Projets personnels</p>
            </div>
            <span className="ml-auto bg-violet-500/10 text-violet-400 border border-violet-500/20 text-xs px-2.5 py-1 rounded-full">
              {projetsPerso.length} projets
            </span>
          </div>
          <div className="grid gap-4">
            {projetsPerso.map((p) => (
              <ProjetCard key={p.id} p={p} onNavigate={onNavigate} />
            ))}
          </div>
        </div>

      </div>
    </Section>
  );
}

// ─── VEILLE ──────────────────────────────────────────────────────────────────
export function Veille({ onNavigate }) {
  return (
    <Section id="veille" title="Veille technologique" subtitle="Articles sélectionnés — cybersécurité">

      {/* Articles sélectionnés (issus de mes alertes Google) */}
      <div className="mb-14">
        <p className="text-slate-500 text-xs uppercase tracking-wider mb-4">Articles sélectionnés — issus de mes alertes Google</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {VEILLE.map((v) => (
            <div key={v.titre} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-sky-500/40 transition-all group flex flex-col">
              {v.image && (
                <div className="h-32 overflow-hidden relative flex-shrink-0">
                  <img src={v.image} alt={v.titre} className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                  <div className="absolute bottom-2 left-3">
                    <span className="text-xs bg-sky-500/20 text-sky-400 border border-sky-500/30 px-2 py-0.5 rounded-full">{v.source}</span>
                  </div>
                </div>
              )}
              <div className="p-5 flex flex-col flex-1">
                {!v.image && (
                  <span className="self-start text-xs bg-sky-500/20 text-sky-400 border border-sky-500/30 px-2 py-0.5 rounded-full mb-2">{v.source}</span>
                )}
                <p className="text-slate-500 text-xs font-mono mb-2">{v.date}</p>
                <h3 className="text-white font-bold text-sm mb-3 group-hover:text-sky-400 transition-colors leading-snug">{v.titre}</h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-3">{v.resume}</p>
                {v.analysePerso && (
                  <div className="bg-slate-800/60 border border-sky-500/20 rounded-xl p-3 mb-4">
                    <p className="text-sky-400 text-xs font-bold mb-1 flex items-center gap-1">
                      <span>💬</span> Mon analyse
                    </p>
                    <p className="text-slate-300 text-xs leading-relaxed italic">{v.analysePerso}</p>
                  </div>
                )}
                <div className="flex gap-2 mt-auto">
                  {v.lien && (
                    <a href={v.lien} target="_blank" rel="noreferrer" className="flex-1 text-center bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors">
                      Lire l'article →
                    </a>
                  )}
                  {v.projetId && (
                    <button onClick={() => onNavigate("projet", v.projetId)} className="flex-1 text-center border border-slate-700 hover:border-sky-500/50 text-slate-400 hover:text-sky-400 text-xs font-semibold px-3 py-2 rounded-lg transition-colors">
                      Voir projet
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MÉTHODE DE VEILLE ── */}
      <div className="mt-16">
        <div className="mb-8">
          <h3 className="text-white font-black text-2xl mb-2">Ma méthode de veille</h3>
          <div className="w-10 h-0.5 bg-sky-500 rounded-full" />
        </div>
        <div className="grid md:grid-cols-5 gap-4 mb-12">
          {[
            { num: "01", titre: "Définition des thèmes", desc: "Cibler les sujets prioritaires liés à ma formation : ransomwares, cybercriminalité et leurs impacts sur les entreprises et infrastructures critiques françaises." },
            { num: "02", titre: "Mise en place des alertes", desc: "Configuration d'alertes Google sur : attaque ransomware hôpital, LockBit ransomware, RaaS ransomware as a service, ransomware entreprise, ransomware France." },
            { num: "03", titre: "Collecte et tri", desc: "Réception automatique par email des nouveaux articles, sélection des contenus les plus pertinents et récents en lien avec le BTS SIO SISR." },
            { num: "04", titre: "Analyse et synthèse", desc: "Lecture approfondie des articles retenus, rédaction d'un résumé personnel et mise en lien avec les projets et compétences du référentiel." },
            { num: "05", titre: "Diffusion", desc: "Publication des articles sélectionnés sur ce portfolio, consultable par les jurys et recruteurs." },
          ].map((e) => (
            <div key={e.num} className="bg-slate-900 border border-slate-800 hover:border-sky-500/40 rounded-2xl p-5 transition-all">
              <p className="text-sky-400 font-black text-2xl font-mono mb-3">{e.num}</p>
              <p className="text-white font-bold text-sm mb-2">{e.titre}</p>
              <p className="text-slate-400 text-xs leading-relaxed">{e.desc}</p>
            </div>
          ))}
        </div>

        {/* Conclusion */}
        <div className="bg-gradient-to-r from-sky-600/10 to-blue-600/10 border border-sky-500/25 rounded-2xl p-8">
          <p className="text-sky-400 font-bold mb-3 flex items-center gap-2">
            <span>📌</span> Conclusion
          </p>
          <p className="text-slate-300 leading-relaxed">
            La veille technologique est une compétence essentielle dans le métier d'administrateur systèmes et réseaux. Grâce à mes alertes Google configurées sur les ransomwares, je suis informé en temps réel des nouvelles menaces ciblant les entreprises et les hôpitaux français. Cette démarche s'inscrit directement dans le référentiel BTS SIO SISR et renforce ma préparation vers une spécialisation en cybersécurité.
          </p>
        </div>
      </div>

    </Section>
  );
}

// ─── TABLEAU DE SYNTHÈSE ─────────────────────────────────────────────────────
export function TableauSynthese() {
  return (
    <Section id="tableau" title="Tableau de synthèse" subtitle="Réalisations professionnelles BTS SIO SISR - Session 2027">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-600/20 to-blue-600/20 border-b border-slate-800 px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">BTS Services Informatiques aux Organisations</p>
            <h3 className="text-white font-black text-xl">Tableau de synthèse des réalisations</h3>
            <p className="text-sky-400 text-sm mt-1">AHMIDDOUCH Mehdi · H3 Campus IPSSI SQY · Option SISR</p>
          </div>
          <a
            href="/assets/tableau-synthese.pdf"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 bg-sky-500 hover:bg-sky-400 text-white font-bold px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-sky-500/20 flex-shrink-0"
          >
            <span>📥</span>
            Télécharger le tableau
          </a>
        </div>

        {/* Infos */}
        <div className="px-8 py-6 grid sm:grid-cols-3 gap-6 border-b border-slate-800">
          {[
            { label: "Nom et prénom", value: "AHMIDDOUCH Mehdi" },
            { label: "Centre de formation", value: "H3 Campus – IPSSI SQY" },
            { label: "Session", value: "2026 – 2027" },
          ].map((c) => (
            <div key={c.label}>
              <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">{c.label}</p>
              <p className="text-white font-semibold">{c.value}</p>
            </div>
          ))}
        </div>

        {/* URL portfolio */}
        <div className="px-8 py-5 flex items-center gap-4">
          <span className="text-slate-400 text-sm">Adresse URL du portfolio :</span>
          <a
            href="https://mehdi7881.github.io/portfolio"
            target="_blank"
            rel="noreferrer"
            className="text-sky-400 hover:text-sky-300 font-mono text-sm transition-colors"
          >
            https://mehdi7881.github.io/portfolio
          </a>
        </div>

        {/* Aperçu PDF intégré */}
        <div className="px-8 pb-8">
          <p className="text-slate-500 text-xs uppercase tracking-wider mb-3">Aperçu du document</p>
          <div className="rounded-2xl overflow-hidden border border-slate-700 bg-white" style={{ height: "600px" }}>
            <iframe
              src="/assets/tableau-synthese.pdf"
              className="w-full h-full"
              title="Tableau de synthèse BTS SIO SISR"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────
export function Contact() {
  const { contact } = PROFILE;
  return (
    <Section id="contact" title="Contact" subtitle="À la recherche d'un stage de 10 jours (alterné avec les cours)" dark>
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div>
          <p className="text-slate-300 leading-relaxed mb-6">
            Je suis actuellement en BTS SIO SISR et disponible pour des opportunités professionnelles. N'hésitez pas à me contacter pour discuter de mes projets ou d'une collaboration.
          </p>
          <div className="space-y-3">
            {[
              { icon: "✉️", label: "Email", value: contact.email, href: `mailto:${contact.email}` },
              { icon: "📱", label: "Téléphone", value: PROFILE.phone, href: `tel:${PROFILE.phone}` },
              { icon: "📍", label: "Localisation", value: contact.localisation, href: null },
            ].map((c) => (
              <div key={c.label} className="flex items-center gap-4 bg-slate-800/50 border border-slate-700/60 rounded-2xl px-5 py-4">
                <span className="text-2xl">{c.icon}</span>
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-wider">{c.label}</p>
                  {c.href
                    ? <a href={c.href} className="text-white hover:text-sky-400 font-semibold transition-colors">{c.value}</a>
                    : <p className="text-white font-semibold">{c.value}</p>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <a href={contact.linkedin} target="_blank" rel="noreferrer"
            className="flex items-center gap-4 bg-slate-800/50 border border-slate-700/60 hover:border-blue-500/50 rounded-2xl px-5 py-4 group transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm">in</div>
            <div className="flex-1">
              <p className="text-slate-500 text-xs uppercase tracking-wider">LinkedIn</p>
              <p className="text-white font-semibold group-hover:text-blue-400 transition-colors">mehdi-ahmiddouch</p>
            </div>
            <span className="text-slate-500 group-hover:translate-x-1 transition-transform">→</span>
          </a>

          <a href={contact.github} target="_blank" rel="noreferrer"
            className="flex items-center gap-4 bg-slate-800/50 border border-slate-700/60 hover:border-slate-500 rounded-2xl px-5 py-4 group transition-all">
            <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center text-white text-lg">🐱</div>
            <div className="flex-1">
              <p className="text-slate-500 text-xs uppercase tracking-wider">GitHub</p>
              <p className="text-white font-semibold group-hover:text-slate-300 transition-colors">mehdi7881</p>
            </div>
            <span className="text-slate-500 group-hover:translate-x-1 transition-transform">→</span>
          </a>

          <a href={PROFILE.cv} target="_blank" rel="noreferrer"
            className="flex items-center gap-4 bg-sky-500/10 border border-sky-500/30 hover:border-sky-500/60 rounded-2xl px-5 py-4 group transition-all">
            <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center text-white text-lg">📄</div>
            <div className="flex-1">
              <p className="text-slate-500 text-xs uppercase tracking-wider">Curriculum Vitae</p>
              <p className="text-sky-400 font-semibold group-hover:text-sky-300 transition-colors">Télécharger mon CV</p>
            </div>
            <span className="text-sky-400 group-hover:translate-x-1 transition-transform">↓</span>
          </a>
        </div>
      </div>

      {/* Certifications LinkedIn Learning */}
      <div className="mt-10">
        <h3 className="text-white font-black text-xl mb-4">Certifications</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <a href="/assets/CertificateOfCompletion_Maitriser le contrat de travail de lembauche a la rupture.pdf" target="_blank" rel="noreferrer"
            className="flex items-center gap-4 bg-slate-900 border border-slate-800 hover:border-sky-500/40 rounded-2xl px-5 py-4 group transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white text-lg flex-shrink-0">🎓</div>
            <div className="flex-1">
              <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">LinkedIn Learning</p>
              <p className="text-white font-semibold text-sm group-hover:text-sky-400 transition-colors">Maîtriser le contrat de travail de l'embauche à la rupture</p>
            </div>
            <span className="text-sky-400 group-hover:translate-x-1 transition-transform flex-shrink-0">↓</span>
          </a>
          <a href="/assets/CertificateOfCompletion_Faire une bonne premiere impression .pdf" target="_blank" rel="noreferrer"
            className="flex items-center gap-4 bg-slate-900 border border-slate-800 hover:border-sky-500/40 rounded-2xl px-5 py-4 group transition-all">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white text-lg flex-shrink-0">🎓</div>
            <div className="flex-1">
              <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">LinkedIn Learning</p>
              <p className="text-white font-semibold text-sm group-hover:text-sky-400 transition-colors">Faire une bonne première impression</p>
            </div>
            <span className="text-sky-400 group-hover:translate-x-1 transition-transform flex-shrink-0">↓</span>
          </a>
        </div>
      </div>

    </Section>
  );
}
