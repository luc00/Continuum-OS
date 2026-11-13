import React, { useMemo, useState } from 'react';
import { SuiteCategory, SuiteTab } from '../types';
import { EngineCatalogItem, SUITE_ENGINES, SUITE_PILLARS } from '../data/suiteCatalog';
import { ENGINE_ICON_MAP, PILLAR_STYLE_MAP } from '../data/engineIcons';
import {
  ArrowRight,
  Cpu,
  LayoutGrid,
  ListTree,
  Search,
  Sparkles,
  Star,
} from 'lucide-react';

interface OverviewHubProps {
  onSelectTab: (tab: SuiteTab) => void;
  savedMinutes: number;
  pinnedTabs: SuiteTab[];
  onTogglePin: (tab: SuiteTab) => void;
  onOpenWelcome: () => void;
}

export const OverviewHub: React.FC<OverviewHubProps> = ({
  onSelectTab,
  savedMinutes,
  pinnedTabs,
  onTogglePin,
  onOpenWelcome,
}) => {
  const [filterCategory, setFilterCategory] = useState<'all' | SuiteCategory>('all');
  const [quickFilterMode, setQuickFilterMode] = useState<'all' | 'new' | 'pinned'>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [viewMode, setViewMode] = useState<'compact' | 'detailed'>('compact');

  const enrichedEngines = useMemo(
    () =>
      SUITE_ENGINES.map((engine) =>
        engine.id === 'contextflow' ? { ...engine, kpiValue: `${savedMinutes} minuti` } : engine
      ),
    [savedMinutes]
  );

  const filtered = useMemo(() => {
    const q = searchFilter.trim().toLowerCase();
    return enrichedEngines
      .filter((m) => filterCategory === 'all' || m.pillar === filterCategory)
      .filter((m) => {
        if (quickFilterMode === 'new') return Boolean(m.isNew);
        if (quickFilterMode === 'pinned') return pinnedTabs.includes(m.id);
        return true;
      })
      .filter((m) => {
        if (!q) return true;
        return (
          m.title.toLowerCase().includes(q) ||
          m.badge.toLowerCase().includes(q) ||
          m.subtitle.toLowerCase().includes(q) ||
          m.problem.toLowerCase().includes(q) ||
          m.solution.toLowerCase().includes(q)
        );
      });
  }, [enrichedEngines, filterCategory, quickFilterMode, pinnedTabs, searchFilter]);

  const isUnfiltered =
    filterCategory === 'all' && quickFilterMode === 'all' && searchFilter.trim() === '';

  const renderEngineTile = (s: EngineCatalogItem) => {
    const Icon = s.id === 'overview' ? Cpu : ENGINE_ICON_MAP[s.id];
    const pStyle = PILLAR_STYLE_MAP[s.pillar];
    const isPinned = pinnedTabs.includes(s.id);

    return (
      <div
        key={s.id}
        className="rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 p-4 flex flex-col justify-between transition-all duration-150 group hover:border-indigo-500/40 shadow-sm"
      >
        <div className="space-y-2.5">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center border bg-gradient-to-br shrink-0 ${pStyle.iconBg}`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors truncate flex items-center gap-1.5">
                  <span className="truncate">{s.title}</span>
                  {s.isNew && (
                    <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-400 shrink-0">
                      Nuovo
                    </span>
                  )}
                </h3>
                <p className="text-[11px] font-medium text-slate-400 truncate">{s.badge}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onTogglePin(s.id)}
              aria-label={
                isPinned
                  ? `Rimuovi ${s.title} dai preferiti`
                  : `Fissa ${s.title} in Accesso Rapido`
              }
              title={isPinned ? 'Rimuovi dai preferiti' : 'Fissa in Accesso Rapido'}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer shrink-0 ${
                isPinned
                  ? 'text-amber-400 bg-amber-500/10'
                  : 'text-slate-600 hover:text-amber-300 hover:bg-slate-800'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${isPinned ? 'fill-current' : ''}`} />
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-snug line-clamp-2">{s.subtitle}</p>

          {viewMode === 'detailed' && (
            <div className="space-y-2 pt-1 text-xs">
              <div className="p-2.5 rounded-lg bg-red-950/20 border border-red-900/30 text-slate-300">
                <span className="font-bold text-red-400 block mb-0.5 text-[11px]">Il Problema:</span>
                <p className="leading-snug text-slate-300 line-clamp-3">{s.problem}</p>
              </div>

              <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-900/30 text-slate-300">
                <span className="font-bold text-emerald-400 block mb-0.5 text-[11px]">La Soluzione:</span>
                <p className="leading-snug text-slate-300 line-clamp-3">{s.solution}</p>
              </div>
            </div>
          )}
        </div>

        <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <span className="text-[10px] text-slate-400 block truncate">{s.kpiLabel}</span>
            <span className="text-xs font-bold text-slate-100 tabular-nums truncate block">
              {s.kpiValue}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onSelectTab(s.id)}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600/90 hover:bg-indigo-500 rounded-lg transition-colors flex items-center gap-1 cursor-pointer shrink-0"
          >
            <span>Usa Ora</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Unified Single-Place Header + Controls (Immediately Above the Fold) */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Armadio Unico dei Motori · Pronti da Prendere e Usare</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Tutti i 37 Motori in un Unico Posto
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Scegli un pilastro, filtra per parola chiave o clicca su <strong>Usa Ora</strong> su
              qualsiasi motore per avviarlo immediatamente.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* Search Box */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Cerca motore (es. brevetti, cassa)..."
                aria-label="Cerca tra tutti i 37 motori"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 pl-8 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Compact vs Detailed View Switcher */}
            <div
              className="inline-flex rounded-lg bg-slate-950 border border-slate-800 p-0.5"
              role="group"
              aria-label="Modalità schede"
            >
              <button
                type="button"
                onClick={() => setViewMode('compact')}
                className={`px-2.5 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                  viewMode === 'compact'
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Compatta</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('detailed')}
                className={`px-2.5 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                  viewMode === 'detailed'
                    ? 'bg-slate-800 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <ListTree className="w-3.5 h-3.5" />
                <span>Dettaglio</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onOpenWelcome}
              className="px-3 py-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 cursor-pointer"
            >
              Pagina Benvenuto
            </button>
          </div>
        </div>

        {/* Filter Strips: Pillar Tabs + Quick Toggles (Tutti / Nuovi / Preferiti) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              type="button"
              onClick={() => setFilterCategory('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                filterCategory === 'all'
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Tutti (37)
            </button>
            {SUITE_PILLARS.map((pillar) => {
              const count = SUITE_ENGINES.filter((e) => e.pillar === pillar.id).length;
              const isSelected = filterCategory === pillar.id;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => setFilterCategory(pillar.id)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-indigo-600 text-white font-semibold'
                      : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {pillar.shortName} ({count})
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5 text-xs shrink-0">
            <button
              type="button"
              onClick={() => setQuickFilterMode('all')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                quickFilterMode === 'all'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Tutti
            </button>
            <button
              type="button"
              onClick={() => setQuickFilterMode('new')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                quickFilterMode === 'new'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Nuovi (20)
            </button>
            <button
              type="button"
              onClick={() => setQuickFilterMode('pinned')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                quickFilterMode === 'pinned'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Star className="w-3 h-3" />
              <span>Preferiti ({pinnedTabs.length})</span>
            </button>
          </div>
        </div>
      </section>

      {/* All 37 Engines Organized Cleanly by Pillar in One Place */}
      {isUnfiltered ? (
        <div className="space-y-8">
          {SUITE_PILLARS.map((pillar, index) => {
            const engines = enrichedEngines.filter((e) => e.pillar === pillar.id);
            const pStyle = PILLAR_STYLE_MAP[pillar.id];

            return (
              <section key={pillar.id} className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-2 border-b border-slate-800/80">
                  <div>
                    <div
                      className={`text-[11px] font-mono uppercase tracking-wider ${pStyle.accentText}`}
                    >
                      Pilastro 0{index + 1} · {engines.length} Motori
                    </div>
                    <h2 className="text-lg font-bold text-white mt-0.5">{pillar.name}</h2>
                  </div>
                  <p className="text-xs text-slate-400 max-w-xl">{pillar.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {engines.map(renderEngineTile)}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <section className="space-y-4">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map(renderEngineTile)}
            </div>
          ) : (
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-10 text-center space-y-3">
              <p className="text-sm font-semibold text-white">
                Nessun motore trovato con questi filtri.
              </p>
              <button
                type="button"
                onClick={() => {
                  setFilterCategory('all');
                  setQuickFilterMode('all');
                  setSearchFilter('');
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg cursor-pointer"
              >
                Ripristina tutti i 37 Motori
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  );
};
