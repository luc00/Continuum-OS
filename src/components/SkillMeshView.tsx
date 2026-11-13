import React, { useState } from 'react';
import { SkillColleague } from '../types';
import {
  Search,
  Sparkles,
  Coffee,
  CheckCircle2,
  Network,
  Share2,
  Plus,
  Lock,
  ArrowRight,
  ExternalLink,
  MessageCircle,
  ThumbsUp,
  Award,
} from 'lucide-react';

interface SkillMeshViewProps {
  colleagues: SkillColleague[];
  onAddColleagueSkill?: (newColleague: SkillColleague) => void;
}

export const SkillMeshView: React.FC<SkillMeshViewProps> = ({
  colleagues: initialColleagues,
  onAddColleagueSkill,
}) => {
  const [colleagueList, setColleagueList] = useState<SkillColleague[]>(initialColleagues);
  const [searchQuery, setSearchQuery] = useState<string>('macro in Excel complessa e olandese');
  const [activeDepartmentFilter, setActiveDepartmentFilter] = useState<string>('Tutti');
  const [selectedColleague, setSelectedColleague] = useState<SkillColleague | null>(null);
  const [isCoffeeModalOpen, setIsCoffeeModalOpen] = useState<boolean>(false);
  const [coffeeRequestSent, setCoffeeRequestSent] = useState<boolean>(false);
  const [isSuperpowerModalOpen, setIsSuperpowerModalOpen] = useState<boolean>(false);

  // New Superpower form
  const [newSkillName, setNewSkillName] = useState<string>('');
  const [newSkillCategory, setNewSkillCategory] = useState<string>('');
  const [newSkillStory, setNewSkillStory] = useState<string>('');

  const quickPromptChips = [
    'Macro in Excel complessa',
    'Tradurre testo in olandese antico',
    'Script Python per automazione file',
    'Figma e contrasto tipografico',
    'Sound Design e audio per video',
  ];

  // Filter colleagues based on search query
  const filteredColleagues = colleagueList
    .map((col) => {
      let score = col.matchScore;
      const q = searchQuery.toLowerCase().trim();
      if (q) {
        const pool = [
          col.name,
          col.department,
          col.currentRole,
          col.hiddenSuperpower,
          col.matchReasoning,
          ...col.tags,
        ]
          .join(' ')
          .toLowerCase();

        const words = q.split(/\s+/).filter((w) => w.length > 2);
        const matches = words.filter((w) => pool.includes(w)).length;
        if (words.length > 0) {
          score = Math.min(99, Math.round(55 + (matches / words.length) * 44));
        }
      }
      return { ...col, dynamicScore: score };
    })
    .filter((col) => {
      if (activeDepartmentFilter === 'Tutti') return true;
      return col.department.toLowerCase().includes(activeDepartmentFilter.toLowerCase());
    })
    .sort((a, b) => b.dynamicScore - a.dynamicScore);

  const handleBookCoffee = (colleague: SkillColleague) => {
    setSelectedColleague(colleague);
    setIsCoffeeModalOpen(true);
    setCoffeeRequestSent(false);
  };

  const handleConfirmCoffee = () => {
    setCoffeeRequestSent(true);
    setTimeout(() => {
      setIsCoffeeModalOpen(false);
      setCoffeeRequestSent(false);
    }, 2000);
  };

  const handleEndorse = (colleagueId: string) => {
    setColleagueList((prev) =>
      prev.map((c) =>
        c.id === colleagueId ? { ...c, endorsedByCount: c.endorsedByCount + 1 } : c
      )
    );
  };

  const handleSaveSuperpower = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const newProfile: SkillColleague = {
      id: `col-${Date.now()}`,
      name: 'Tu (Profilo Personale)',
      currentRole: 'Software Engineer',
      department: 'Engineering & R&D',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      matchScore: 95,
      hiddenSuperpower: `${newSkillName}: ${newSkillStory || 'Competenza precedente e passione personale.'}`,
      matchReasoning: 'Competenza dichiarata verificata tramite auto-certificazione interna.',
      availability: 'Disponibile per micro-scambi di competenze il venerdì pomeriggio',
      tags: [newSkillCategory || 'Hobby & Passioni', 'Skill Sommesa'],
      endorsedByCount: 1,
      pastExperience: newSkillStory || 'Esperienza pregressa dichiarata nel sistema.',
    };

    setColleagueList([newProfile, ...colleagueList]);
    setIsSuperpowerModalOpen(false);
    setNewSkillName('');
    setNewSkillStory('');
    if (onAddColleagueSkill) onAddColleagueSkill(newProfile);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <span>SkillMesh Network</span>
            <span aria-hidden="true">·</span>
            <span>Internal Hidden Talent Marketplace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Il Mercato delle Competenze Aziendali Nascoste
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Smetti di cercare all'esterno. Scopri chi tra i tuoi colleghi di altri dipartimenti possiede la competenza che ti serve.
          </p>
        </div>

        <button
          onClick={() => setIsSuperpowerModalOpen(true)}
          className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-sm shadow-emerald-600/30 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Aggiungi Tua Abilità Segreta</span>
        </button>
      </div>

      {/* Natural Language Semantic AI Search Bar */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4 shadow-xl">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Chiedi a SkillMesh cosa ti serve in linguaggio naturale:</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Es. 'Ho bisogno di una macro in Excel complessa o di tradurre un testo in olandese antico...'"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 pl-11 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors shadow-inner"
            />
            <Search className="w-5 h-5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Prompt Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-slate-400 font-medium">Query frequenti:</span>
          {quickPromptChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => setSearchQuery(chip)}
              className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 transition-colors cursor-pointer text-[11px]"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Department Filter tabs */}
        <div className="flex items-center gap-1.5 pt-2 border-t border-slate-800/80 overflow-x-auto text-xs">
          <span className="text-slate-400 font-medium text-[11px] mr-2">Dipartimento:</span>
          {['Tutti', 'Logistica', 'Supporto', 'Legale', 'Design', 'Engineering'].map((dept) => (
            <button
              key={dept}
              onClick={() => setActiveDepartmentFilter(dept)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeDepartmentFilter === dept
                  ? 'bg-emerald-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Recommendation Banner (Addressing Giulia directly as requested in prompt) */}
      {filteredColleagues.length > 0 && (
        <div className="rounded-xl border border-emerald-900/40 bg-gradient-to-r from-emerald-950/30 via-slate-900 to-slate-900 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                Suggerimento IA Proattivo
              </span>
              <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                "Ehi, <strong>{filteredColleagues[0].name}</strong> del reparto{' '}
                <strong>{filteredColleagues[0].department}</strong> ha fatto un master in lingue ed è
                super esperta di Excel: potresti chiederle una mano invece di cercare una risorsa esterna!"
              </p>
            </div>
          </div>

          <button
            onClick={() => handleBookCoffee(filteredColleagues[0])}
            className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-sm shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 whitespace-nowrap"
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>Chiedi a {filteredColleagues[0].name.split(' ')[0]} (15 min)</span>
          </button>
        </div>
      )}

      {/* Colleagues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {filteredColleagues.map((col) => (
          <div
            key={col.id}
            className="rounded-xl border border-slate-800 bg-slate-900/60 hover:border-emerald-500/50 p-6 space-y-4 transition-all duration-200 shadow-md group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={col.avatar}
                  alt={col.name}
                  className="w-12 h-12 rounded-full object-cover border border-slate-700 group-hover:border-emerald-500/60 transition-colors"
                />
                <div className="space-y-0.5">
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {col.name}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {col.currentRole}
                  </p>
                  <span className="text-[11px] font-semibold text-slate-400 block">
                    {col.department}
                  </span>
                </div>
              </div>

              {/* Match Score */}
              <div className="text-right shrink-0">
                <span className="text-[10px] text-slate-400 block uppercase tracking-wider">
                  Affinità
                </span>
                <span className="text-lg font-bold text-emerald-400 tabular-nums">
                  {col.matchScore}%
                </span>
              </div>
            </div>

            {/* Hidden Superpower Highlight Box */}
            <div className="p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-900/30 space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 uppercase tracking-wide">
                <Award className="w-3.5 h-3.5" />
                <span>Superpotere Nascosto Rilevato</span>
              </div>
              <p className="text-xs text-slate-200 font-medium leading-relaxed">
                {col.hiddenSuperpower}
              </p>
            </div>

            {/* AI Reasoning */}
            <div className="space-y-1 text-xs text-slate-300">
              <span className="text-[11px] font-semibold text-slate-400 block">
                Perché è la persona giusta:
              </span>
              <p className="leading-relaxed text-slate-300">
                {col.matchReasoning}
              </p>
            </div>

            {/* Tags (Zero-Pill discipline: unboxed with subtle separator) */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-400">
              {col.tags.map((tag, tIdx) => (
                <React.Fragment key={tIdx}>
                  <span className="text-slate-300 font-mono text-[11px]">#{tag}</span>
                  {tIdx < col.tags.length - 1 && (
                    <span aria-hidden="true" className="text-slate-600">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Bottom Actions Strip */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEndorse(col.id)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Conferma competenza tra colleghi"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="tabular-nums font-semibold">{col.endorsedByCount}</span>
                </button>
                <span className="text-[11px] text-slate-400 hidden sm:inline">
                  {col.availability}
                </span>
              </div>

              <button
                onClick={() => handleBookCoffee(col)}
                className="px-3.5 py-1.5 font-semibold text-white bg-slate-800 hover:bg-emerald-600 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Coffee className="w-3.5 h-3.5" />
                <span>Chiedi Micro-Caffè (15m)</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Network Visualizer Card */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Network className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Mappa delle Connessioni Spontanee</h3>
          </div>
          <span className="text-xs text-slate-400">
            Connessioni orizzontali senza gerarchie
          </span>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
          SkillMesh abbatte i silos aziendali: i team di marketing collaborano direttamente con la logistica per le formule,
          i legali supportano i designer sulla tipografia, e il customer service sblocca script in Python.
        </p>

        {/* Constellation SVG Diagram */}
        <div className="rounded-lg bg-slate-950 p-4 border border-slate-800 flex items-center justify-center overflow-hidden">
          <svg className="w-full max-w-2xl h-44" viewBox="0 0 600 180">
            {/* Connection Lines */}
            <line x1="100" y1="90" x2="250" y2="40" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="250" y1="40" x2="400" y2="90" stroke="#10b981" strokeWidth="2" />
            <line x1="400" y1="90" x2="520" y2="50" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="100" y1="90" x2="250" y2="140" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="250" y1="140" x2="400" y2="90" stroke="#6366f1" strokeWidth="2" />

            {/* Department Hubs */}
            <circle cx="100" cy="90" r="32" fill="#1e293b" stroke="#475569" strokeWidth="2" />
            <text x="100" y="93" fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle">Marketing</text>
            <text x="100" y="105" fill="#94a3b8" fontSize="8" textAnchor="middle">Team</text>

            <circle cx="250" cy="40" r="28" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
            <text x="250" y="40" fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle">Logistica</text>
            <text x="250" y="52" fill="#6ee7b7" fontSize="8" textAnchor="middle">Giulia M.</text>

            <circle cx="400" cy="90" r="32" fill="#312e81" stroke="#6366f1" strokeWidth="2" />
            <text x="400" y="88" fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle">Macro Excel</text>
            <text x="400" y="100" fill="#a5b4fc" fontSize="8" textAnchor="middle">& Olandese</text>

            <circle cx="250" cy="140" r="28" fill="#1e293b" stroke="#475569" strokeWidth="2" />
            <text x="250" y="140" fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle">Supporto</text>
            <text x="250" y="152" fill="#94a3b8" fontSize="8" textAnchor="middle">Roberto V.</text>

            <circle cx="520" cy="50" r="28" fill="#1e293b" stroke="#475569" strokeWidth="2" />
            <text x="520" y="50" fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle">Legal</text>
            <text x="520" y="62" fill="#94a3b8" fontSize="8" textAnchor="middle">Elena R.</text>
          </svg>
        </div>
      </section>

      {/* Coffee / Mentoring Booking Modal */}
      {isCoffeeModalOpen && selectedColleague && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Coffee className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">
                  Richiedi Micro-Caffè (15 min)
                </h3>
              </div>
              <button
                onClick={() => setIsCoffeeModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                Chiudi
              </button>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-950 border border-slate-800">
              <img
                src={selectedColleague.avatar}
                alt={selectedColleague.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="text-xs">
                <span className="font-bold text-white block">{selectedColleague.name}</span>
                <span className="text-slate-400">{selectedColleague.department}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <label className="font-medium text-slate-300 block">
                Descrivi brevemente su cosa ti serve una mano:
              </label>
              <textarea
                rows={3}
                defaultValue="Ciao! Ho visto su SkillMesh che sei esperta di macro complesse e olandese antico. Avrei bisogno di 10 minuti per sbloccare una tabella dati del marketing."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-900/40 text-xs text-slate-300">
              <span className="font-semibold text-emerald-300 block mb-0.5">
                Privacy & Rispetto del Tempo:
              </span>
              Nessun obbligo di presa in carico. Lo slot è limitato a 15 minuti di allineamento orizzontale.
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsCoffeeModalOpen(false)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                Annulla
              </button>
              <button
                onClick={handleConfirmCoffee}
                className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-600/30"
              >
                {coffeeRequestSent ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Richiesta Inviata!</span>
                  </>
                ) : (
                  <>
                    <Coffee className="w-3.5 h-3.5" />
                    <span>Invia Invito a Calendario</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Secret Superpower Modal */}
      {isSuperpowerModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveSuperpower}
            className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">
                  Dichiara la Tua Competenza Sommersa
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsSuperpowerModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                Chiudi
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-medium text-slate-300 block mb-1">
                  Qual è la tua abilità nascosta? (es. Master in Lingue, Grafica 3D, Blender, Diritto d'Autore)
                </label>
                <input
                  type="text"
                  required
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  placeholder="Es. Modellazione 3D con Blender & Sintesi Audio"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="font-medium text-slate-300 block mb-1">
                  Breve contesto o origine dell'abilità (Hobby, carriera passata, laurea)
                </label>
                <textarea
                  rows={2}
                  value={newSkillStory}
                  onChange={(e) => setNewSkillStory(e.target.value)}
                  placeholder="Es. Ho lavorato come 3D artist per 4 anni prima di passare al product management."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                  <Lock className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Protezione Privacy & Confini del Ruolo</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Questa competenza non modifica le tue metriche di ruolo ufficiali, ma consente
                  ai colleghi di trovarti per micro-consulenze informali.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsSuperpowerModalOpen(false)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                Annulla
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors cursor-pointer shadow-sm"
              >
                Salva nel Grafo Aziendale
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
