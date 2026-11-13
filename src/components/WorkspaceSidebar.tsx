import React, { useEffect, useMemo, useState } from 'react';
import { SuiteCategory, SuiteTab } from '../types';
import { SUITE_ENGINES, SUITE_PILLARS } from '../data/suiteCatalog';
import { ENGINE_ICON_MAP, PILLAR_STYLE_MAP } from '../data/engineIcons';
import {
  ChevronDown,
  ChevronRight,
  LayoutGrid,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Sparkles,
  Star,
  X,
} from 'lucide-react';

export type AppViewTab = 'welcome' | SuiteTab;

interface WorkspaceSidebarProps {
  activeTab: AppViewTab;
  onTabChange: (tab: AppViewTab) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  pinnedTabs: SuiteTab[];
  onTogglePin: (tab: SuiteTab) => void;
}

export const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = ({
  activeTab,
  onTabChange,
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
  pinnedTabs,
  onTogglePin,
}) => {
  const [sidebarSearch, setSidebarSearch] = useState<string>('');
  const [openPillars, setOpenPillars] = useState<Record<SuiteCategory, boolean>>({
    autonomy: true,
    people: false,
    execution: false,
    market: false,
    finance: true,
    governance: false,
  });

  useEffect(() => {
    const activeEngine = SUITE_ENGINES.find((e) => e.id === activeTab);
    if (activeEngine) {
      setOpenPillars((prev) =>
        prev[activeEngine.pillar] ? prev : { ...prev, [activeEngine.pillar]: true }
      );
    }
  }, [activeTab]);

  const togglePillar = (pillarId: SuiteCategory) => {
    setOpenPillars((prev) => ({ ...prev, [pillarId]: !prev[pillarId] }));
  };

  const filteredGroups = useMemo(() => {
    const q = sidebarSearch.trim().toLowerCase();
    return SUITE_PILLARS.map((pillar, idx) => {
      const engines = SUITE_ENGINES.filter((e) => {
        if (e.pillar !== pillar.id) return false;
        if (!q) return true;
        return (
          e.title.toLowerCase().includes(q) ||
          e.badge.toLowerCase().includes(q) ||
          e.subtitle.toLowerCase().includes(q)
        );
      });
      return { pillar, index: idx + 1, engines };
    }).filter((g) => g.engines.length > 0);
  }, [sidebarSearch]);

  const pinnedEngines = useMemo(
    () => SUITE_ENGINES.filter((e) => pinnedTabs.includes(e.id)),
    [pinnedTabs]
  );

  const handleSelect = (tab: AppViewTab) => {
    onTabChange(tab);
    onCloseMobile();
  };

  const renderSidebarBody = (isMobileDrawer: boolean) => {
    const isRailOnly = !isMobileDrawer && collapsed;

    return (
      <div className="flex flex-col h-full bg-slate-950 border-r border-slate-800/80 select-none">
        {/* Brand Header with transparent uploaded logo */}
        <div
          className={`flex items-center border-b border-slate-800/80 h-[60px] shrink-0 ${
            isRailOnly ? 'justify-center px-2' : 'justify-between px-4'
          }`}
        >
          <button
            type="button"
            onClick={() => handleSelect('welcome')}
            className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer bg-transparent min-w-0"
            title="Continuum OS — Pagina di Benvenuto"
          >
            <img
              src="/assets/aistudio/8-2-consultant-download-png_6214edb5.png"
              alt="Continuum OS Logo"
              className="h-9 w-auto object-contain bg-transparent shrink-0 drop-shadow-[0_0_2px_rgba(255,255,255,0.65)] transition-transform duration-200 group-hover:scale-105"
            />
            {!isRailOnly && (
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors truncate">
                  Continuum OS
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase -mt-0.5 truncate">
                  37 Motori · 6 Pilastri
                </span>
              </div>
            )}
          </button>

          {isMobileDrawer ? (
            <button
              type="button"
              onClick={onCloseMobile}
              aria-label="Chiudi menu laterale"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          ) : !isRailOnly ? (
            <button
              type="button"
              onClick={onToggleCollapse}
              aria-label="Comprimi barra laterale"
              title="Comprimi barra laterale"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 cursor-pointer shrink-0"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          ) : null}
        </div>

        {/* Expand button when collapsed to icon rail */}
        {isRailOnly && (
          <div className="flex justify-center py-2.5 border-b border-slate-800/60">
            <button
              type="button"
              onClick={onToggleCollapse}
              aria-label="Espandi barra laterale"
              title="Espandi barra laterale"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 cursor-pointer"
            >
              <PanelLeftOpen className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Quick Search inside sidebar (expanded mode) */}
        {!isRailOnly && (
          <div className="p-3 border-b border-slate-800/60 shrink-0">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={sidebarSearch}
                onChange={(e) => setSidebarSearch(e.target.value)}
                placeholder="Filtra motore (es. LiquidCash)..."
                aria-label="Filtra motori nella barra laterale"
                className="w-full bg-slate-900/90 border border-slate-800 rounded-lg pl-8 pr-7 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              {sidebarSearch && (
                <button
                  type="button"
                  onClick={() => setSidebarSearch('')}
                  aria-label="Cancella filtro barra laterale"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Navigation Tree */}
        <nav
          aria-label="Navigazione completa per pilastri"
          className="flex-1 overflow-y-auto px-2.5 py-3 space-y-4"
        >
          {/* Welcome + All 37 Unified Hub */}
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => handleSelect('welcome')}
              title="Pagina di Benvenuto"
              className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                isRailOnly ? 'justify-center' : ''
              } ${
                activeTab === 'welcome'
                  ? 'bg-indigo-600/20 text-indigo-200 border border-indigo-500/40'
                  : 'text-slate-300 hover:bg-slate-900 hover:text-white border border-transparent'
              }`}
            >
              <Sparkles className="w-4 h-4 shrink-0 text-indigo-400" />
              {!isRailOnly && <span className="truncate">Benvenuto</span>}
            </button>

            <button
              type="button"
              onClick={() => handleSelect('overview')}
              title="Tutti i 37 Motori in un Unico Posto"
              className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                isRailOnly ? 'justify-center' : ''
              } ${
                activeTab === 'overview'
                  ? 'bg-indigo-600/20 text-indigo-200 border border-indigo-500/40'
                  : 'text-slate-300 hover:bg-slate-900 hover:text-white border border-transparent'
              }`}
            >
              <LayoutGrid className="w-4 h-4 shrink-0 text-emerald-400" />
              {!isRailOnly && <span className="truncate">Tutti i 37 Motori</span>}
            </button>
          </div>

          {/* Pinned / Favorites */}
          {!isRailOnly && pinnedEngines.length > 0 && !sidebarSearch.trim() && (
            <div className="space-y-1">
              <div className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                <span>Accesso Rapido</span>
                <span>{pinnedEngines.length}</span>
              </div>
              <div className="space-y-0.5">
                {pinnedEngines.map((engine) => {
                  const Icon =
                    engine.id === 'overview' ? LayoutGrid : ENGINE_ICON_MAP[engine.id];
                  const isActive = activeTab === engine.id;
                  return (
                    <div key={`pin-${engine.id}`} className="flex items-center group">
                      <button
                        type="button"
                        onClick={() => handleSelect(engine.id)}
                        className={`flex-1 flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer min-w-0 ${
                          isActive
                            ? 'bg-slate-800 text-white font-semibold'
                            : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                        <span className="truncate">{engine.title}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onTogglePin(engine.id)}
                        aria-label={`Rimuovi ${engine.title} dai preferiti`}
                        title="Rimuovi dai preferiti"
                        className="p-1 text-amber-400/70 hover:text-amber-300 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity cursor-pointer"
                      >
                        <Star className="w-3 h-3 fill-current" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 6 Strategic Pillars */}
          {isRailOnly ? (
            <div className="space-y-1.5 pt-1 border-t border-slate-800/60">
              {SUITE_ENGINES.map((engine) => {
                const Icon = engine.id === 'overview' ? LayoutGrid : ENGINE_ICON_MAP[engine.id];
                const isActive = activeTab === engine.id;
                return (
                  <button
                    key={engine.id}
                    type="button"
                    onClick={() => handleSelect(engine.id)}
                    title={`${engine.title} · ${engine.pillarLabel}`}
                    className={`w-full flex items-center justify-center p-2 rounded-lg transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-indigo-600/25 text-indigo-300 border border-indigo-500/40'
                        : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-transparent'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="space-y-2 pt-1 border-t border-slate-800/60">
              <div className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                6 Pilastri Strategici
              </div>

              {filteredGroups.map(({ pillar, index, engines }) => {
                const isSearching = sidebarSearch.trim().length > 0;
                const isOpen = isSearching || openPillars[pillar.id];
                const pStyle = PILLAR_STYLE_MAP[pillar.id];
                const hasActiveChild = engines.some((e) => e.id === activeTab);

                return (
                  <div key={pillar.id} className="space-y-0.5">
                    <button
                      type="button"
                      onClick={() => togglePillar(pillar.id)}
                      aria-expanded={isOpen}
                      className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-left transition-colors cursor-pointer ${
                        hasActiveChild
                          ? 'text-white bg-slate-900/90'
                          : 'text-slate-300 hover:bg-slate-900/60'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${pStyle.dotColor}`} />
                        <span className="text-[11px] font-bold truncate">
                          0{index}. {pillar.shortName}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-[10px] font-mono text-slate-500">{engines.length}</span>
                        {isOpen ? (
                          <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                        )}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="pl-3 space-y-0.5 border-l border-slate-800/80 ml-2.5 my-1">
                        {engines.map((engine) => {
                          const Icon =
                            engine.id === 'overview' ? LayoutGrid : ENGINE_ICON_MAP[engine.id];
                          const isActive = activeTab === engine.id;
                          const isPinned = pinnedTabs.includes(engine.id);

                          return (
                            <div key={engine.id} className="flex items-center group">
                              <button
                                type="button"
                                onClick={() => handleSelect(engine.id)}
                                className={`flex-1 flex items-center justify-between gap-2 px-2 py-1.5 rounded-lg text-xs transition-colors cursor-pointer min-w-0 ${
                                  isActive
                                    ? 'bg-indigo-600/20 text-indigo-200 font-semibold border border-indigo-500/40'
                                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/80 border border-transparent'
                                }`}
                              >
                                <span className="flex items-center gap-2 min-w-0">
                                  <Icon
                                    className={`w-3.5 h-3.5 shrink-0 ${
                                      isActive ? pStyle.accentText : 'text-slate-500'
                                    }`}
                                  />
                                  <span className="truncate">{engine.title}</span>
                                </span>
                                {engine.isNew && (
                                  <span className="text-[9px] font-semibold uppercase tracking-wider text-emerald-400 shrink-0">
                                    Nuovo
                                  </span>
                                )}
                              </button>
                              <button
                                type="button"
                                onClick={() => onTogglePin(engine.id)}
                                aria-label={
                                  isPinned
                                    ? `Rimuovi ${engine.title} dai preferiti`
                                    : `Aggiungi ${engine.title} ai preferiti`
                                }
                                title={isPinned ? 'Rimuovi dai preferiti' : 'Fissa in Accesso Rapido'}
                                className={`p-1 transition-opacity cursor-pointer shrink-0 ${
                                  isPinned
                                    ? 'text-amber-400 opacity-100'
                                    : 'text-slate-600 hover:text-amber-300 opacity-0 group-hover:opacity-100 focus:opacity-100'
                                }`}
                              >
                                <Star className={`w-3 h-3 ${isPinned ? 'fill-current' : ''}`} />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}

              {filteredGroups.length === 0 && (
                <div className="px-2 py-6 text-center text-[11px] text-slate-500">
                  Nessun motore trovato per "{sidebarSearch}".
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Bottom OS Status Line */}
        {!isRailOnly && (
          <div className="px-4 py-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between shrink-0">
            <span>Suite Completa</span>
            <span className="font-mono text-slate-300">37 / 37 Pronti</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Persistent Desktop Sidebar */}
      <aside
        className={`hidden lg:block sticky top-0 h-screen shrink-0 transition-all duration-200 z-30 ${
          collapsed ? 'w-[68px]' : 'w-[276px]'
        }`}
      >
        {renderSidebarBody(false)}
      </aside>

      {/* Mobile / Tablet Slide-over Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <aside className="relative w-[290px] max-w-[85vw] h-full z-10 shadow-2xl">
            {renderSidebarBody(true)}
          </aside>
        </div>
      )}
    </>
  );
};
