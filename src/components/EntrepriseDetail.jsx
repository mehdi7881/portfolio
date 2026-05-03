import { useState } from "react";
import { PROFILE } from "../data.js";

const ENTREPRISES_DETAIL = {
  "ATERMES": {
    nom: "ATERMES",
    logo: "/assets/logo-atermes.png",
    type: "Alternance",
    periode: "Septembre 2025 - Juin 2026",
    lieu: "Montigny-le-Bretonneux, Yvelines (78)",
    siteWeb: "https://www.atermes.fr",
    couleur: "from-red-700 to-rose-800",
    presentation: "ATERMES (Applications Techniques Etudes Realisations Mecaniques Electroniques Systemes) est un groupe industriel francais specialise dans la defense et les industries de haute technologie. Creee en 1989 par Charles CASANOVA, la societe est devenue un acteur majeur de l'industrie de defense.",
    chiffres: [
      { label: "Annee de creation", value: "1989" },
      { label: "Effectif", value: "~200 personnes" },
      { label: "Sites", value: "2 sites en France" },
      { label: "Secteur", value: "Defense & haute technologie" },
    ],
    metiers: [
      { titre: "Mecanique", desc: "Conception et fabrication de sous-ensembles mecaniques de precision" },
      { titre: "Electronique", desc: "Developpement de systemes electroniques embarques et durcis" },
      { titre: "Optronique", desc: "Solutions optiques et infrarouges pour la surveillance et la detection" },
      { titre: "Logiciel", desc: "Developpement logiciel embarque et systemes de commandement" },
    ],
    sites: [
      {
        nom: "Montigny-le-Bretonneux",
        type: "Siege & Centre de conception",
        surface: "4 500 m2",
        description: "Siege social et centre de R&D. Equipe de recherche en Electronique, Mecanique, Optique et Logiciel. Laboratoires, bureaux de CAO, prototypage rapide, salle blanche et chambre anechoique.",
        image: "/assets/atermes-montigny.jpg",
      },
      {
        nom: "Salbris (Loir-et-Cher)",
        type: "Centre de production industrielle",
        surface: "10 000 m2",
        description: "Site de production et de maintenance. Ateliers et lignes de production, salles blanches, equipements de tests, centre de competences en radar et hyperfrequences.",
        image: "/assets/atermes-salbris.jpg",
      },
    ],
    missions: [
      "Administration systemes et reseaux en environnement professionnel exigeant",
      "Participation aux projets d'infrastructure informatique",
      "Support technique et maintenance du parc informatique",
      "Mise en place et gestion de services informatiques",
      "Travail en environnement sensible soumis a confidentialite",
    ],
    technologies: ["Windows Server", "Reseaux", "Support IT", "Administration systemes"],
    note: "En raison de l'activite de defense d'ATERMES, les details des missions et les photos internes sont soumis a confidentialite.",
  },
  "Mairie de Coignieres": {
    nom: "Mairie de Coignieres",
    logo: "/assets/logo-coignieres.jpg",
    type: "Stage",
    periode: "28 avril - 25 juin 2025 (8 semaines)",
    lieu: "Coignieres, Yvelines (78)",
    siteWeb: "https://www.coignieres.fr",
    couleur: "from-emerald-600 to-teal-700",
    presentation: "La Mairie de Coignieres est une collectivite territoriale situee dans les Yvelines (78). J'ai effectue mon stage de 8 semaines au sein de la Direction des Systemes d'Information (DSI), participant activement a l'administration du parc informatique et a la supervision du reseau de la ville.",
    chiffres: [
      { label: "Localisation", value: "Yvelines (78)" },
      { label: "Service", value: "DSI" },
      { label: "Duree du stage", value: "8 semaines" },
      { label: "Periode", value: "Avril - Juin 2025" },
    ],
    missions: [
      "Installation et configuration d'un serveur HP ProLiant sous Debian 12",
      "Deploiement de Zabbix 6.0 pour la supervision reseau",
      "Analyse et schematisation de l'infrastructure reseau",
      "Support technique des agents municipaux",
      "Deplacements dans les ecoles, CCAS et MDJ pour incidents reseau et VPN",
      "Installation de bornes Wi-Fi au CCAS",
      "Test et verification des cables reseau (Wire Tracker)",
      "Creation de comptes utilisateurs (GLPI, messagerie professionnelle)",
    ],
    galerie: [],
    documents: [],
    technologies: ["Debian 12", "Zabbix 6.0", "Linux", "MariaDB", "Apache2", "GLPI", "Wire Tracker", "TP-Link", "VPN", "Windows Server"],
  },
};

export function EntrepriseDetail({ entrepriseNom, onNavigate }) {
  const [activeImg, setActiveImg] = useState(null);
  const e = ENTREPRISES_DETAIL[entrepriseNom];
  if (!e) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-center">
        <p className="text-slate-400 text-xl mb-4">Entreprise non trouvee</p>
        <button onClick={() => onNavigate("home")} className="text-sky-400 hover:text-sky-300">Retour</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <div className={`relative bg-gradient-to-br ${e.couleur} pt-32 pb-20 overflow-hidden`}>
        <div className="absolute inset-0 bg-slate-950/75" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <button onClick={() => onNavigate("home", null, "#entreprises")} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 text-sm group">
            <span className="group-hover:-translate-x-1 transition-transform">-</span> Retour aux entreprises
          </button>
          <div className="flex items-start gap-6 mb-6">
            <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center p-2 flex-shrink-0">
              <img src={e.logo} alt={e.nom} className="w-full h-full object-contain" />
            </div>
            <div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border mb-3 inline-block ${e.type === "Alternance" ? "bg-sky-500/15 text-sky-400 border-sky-500/30" : "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"}`}>
                {e.type}
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-2">{e.nom}</h1>
              <p className="text-slate-300 text-lg">{e.periode} - {e.lieu}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <a href={e.siteWeb} target="_blank" rel="noreferrer" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm">
              Visiter le site officiel
            </a>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">

        {/* Presentation + chiffres */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-white font-black text-2xl mb-4">Presentation</h2>
            <p className="text-slate-300 leading-relaxed">{e.presentation}</p>
            {e.note && (
              <div className="mt-4 bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                <p className="text-amber-400 text-sm"><span className="font-bold">Note :</span> {e.note}</p>
              </div>
            )}
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-slate-400 text-xs uppercase tracking-wider mb-4">Informations</h3>
            <div className="space-y-3">
              {e.chiffres.map((c) => (
                <div key={c.label}>
                  <p className="text-slate-500 text-xs">{c.label}</p>
                  <p className="text-white font-semibold">{c.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Metiers (ATERMES seulement) */}
        {e.metiers && (
          <div>
            <h2 className="text-white font-black text-2xl mb-6">Les 4 metiers d'ATERMES</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {e.metiers.map((m) => (
                <div key={m.titre} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-sky-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center text-red-400 font-black text-lg mb-3">
                    {m.titre[0]}
                  </div>
                  <h3 className="text-white font-bold mb-2">{m.titre}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sites (ATERMES seulement) */}
        {e.sites && (
          <div>
            <h2 className="text-white font-black text-2xl mb-6">Les 2 sites</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {e.sites.map((s) => (
                <div key={s.nom} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                  {s.image && (
                    <div className="h-48 overflow-hidden">
                      <img src={s.image} alt={s.nom} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                    </div>
                  )}
                  <div className="h-2 bg-gradient-to-r from-red-600 to-rose-500" />
                  <div className="p-6">
                    <h3 className="text-white font-black text-lg mb-1">{s.nom}</h3>
                    <p className="text-sky-400 text-sm mb-1">{s.type}</p>
                    <p className="text-slate-500 text-xs mb-4">{s.surface}</p>
                    <p className="text-slate-300 text-sm leading-relaxed">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Missions */}
        <div>
          <h2 className="text-white font-black text-2xl mb-6">Mes missions</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {e.missions.map((m, i) => (
              <div key={i} className="flex items-start gap-3 bg-slate-900 border border-slate-800 rounded-xl px-5 py-4 hover:border-sky-500/30 transition-colors">
                <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                <p className="text-slate-300 text-sm leading-relaxed">{m}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div>
          <h2 className="text-white font-black text-2xl mb-4">Technologies utilisees</h2>
          <div className="flex flex-wrap gap-2">
            {e.technologies.map((t) => (
              <span key={t} className="bg-sky-500/10 text-sky-400 border border-sky-500/20 text-sm font-mono px-3 py-1.5 rounded-full">{t}</span>
            ))}
          </div>
        </div>

        {/* Galerie (Mairie seulement) */}
        {e.galerie && (
          <div>
            <h2 className="text-white font-black text-2xl mb-6">Galerie photos</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {e.galerie.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(img)} className="group relative overflow-hidden rounded-xl border border-slate-700 hover:border-sky-500/60 transition-all bg-slate-800">
                  <img src={img.src} alt={img.legende} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <p className="text-white text-xs font-medium">{img.legende}</p>
                  </div>
                </button>
              ))}
            </div>
            {activeImg && (
              <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setActiveImg(null)}>
                <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
                  <img src={activeImg.src} alt={activeImg.legende} className="w-full rounded-xl shadow-2xl" />
                  <p className="text-slate-300 text-center mt-3 text-sm">{activeImg.legende}</p>
                  <button onClick={() => setActiveImg(null)} className="mt-4 mx-auto flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm">X Fermer</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Documents */}
        {e.documents && e.documents.length > 0 && (
          <div>
            <h2 className="text-white font-black text-2xl mb-4">Documents</h2>
            {e.documents.map((doc, i) => (
              <a key={i} href={doc.fichier} download className="flex items-center gap-4 bg-slate-900 border border-slate-800 hover:border-sky-500/50 rounded-xl px-6 py-4 group transition-all mb-3">
                <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400 text-xs font-bold flex-shrink-0">PDF</div>
                <div className="flex-1">
                  <p className="text-white font-semibold group-hover:text-sky-400 transition-colors">{doc.nom}</p>
                  <p className="text-slate-500 text-sm">{doc.description}</p>
                </div>
                <div className="text-sky-400 text-sm font-medium group-hover:translate-x-1 transition-transform">Telecharger</div>
              </a>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
