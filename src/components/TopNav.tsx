import React from 'react';
import { SUITE_ENGINES, SUITE_PILLARS } from '../data/suiteCatalog';
import { AppViewTab } from './WorkspaceSidebar';
import { ChevronRight, Clock, Menu, Search, Zap } from 'lucide-react';

interface TopNavProps {
  activeTab: AppViewTab;
  onTabChange: (tab: AppViewTab) => void;
  savedMinutes: number;
  onQuickRestore: () => void;
  isRestoring: boolean;
  onOpenMobileMenu: () => void;
  onOpenCommandPalette: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  onTabChange,
  savedMinutes,
  onQuickRestore,
  isRestoring,
  onOpenMobileMenu,
  onOpenCommandPalette,
}) => {
  const activeEngine = SUITE_ENGINES.find((e) => e.id === activeTab);
  const activePillar = activeEngine
    ? SUITE_PILLARS.find((p) => p.id === activeEngine.pillar)
    : undefined;

  return (
    <header className="sticky top-0 z-40 h-[60px] bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between gap-3">
      {/* Left: Mobile drawer trigger + mobile transparent logo + desktop breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          aria-label="Apri menu dei 6 pilastri e 37 motori"
          className="lg:hidden p-2 -ml-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900 cursor-pointer shrink-0"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Mobile Brand Logo without background */}
        <button
          type="button"
          onClick={() => onTabChange('welcome')}
          className="lg:hidden flex items-center gap-2 text-left bg-transparent cursor-pointer min-w-0"
          aria-label="Continuum OS - Pagina di Benvenuto"
        >
          <img
            src="/assets/aistudio/8-2-consultant-download-png_6214edb5.png"
            alt="Continuum OS Logo"
            className="h-8 w-auto object-contain bg-transparent shrink-0 drop-shadow-[0_0_2px_rgba(255,255,255,0.65)]"
          />
          <span className="text-xs sm:text-sm font-bold text-white tracking-tight truncate">
            Continuum OS
          </span>
        </button>

        {/* Desktop Breadcrumb Context */}
        <nav aria-label="Percorso sezione attiva" className="hidden lg:flex items-center gap-1.5 text-xs min-w-0">
          <button
            type="button"
            onClick={() => onTabChange('welcome')}
            className={`px-2 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'welcome'
                ? 'text-white font-semibold bg-slate-900'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Benvenuto
          </button>

          <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />

          <button
            type="button"
            onClick={() => onTabChange('overview')}
            className={`px-2 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'text-indigo-300 font-semibold bg-slate-900'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Tutti i 37 Motori
          </button>

          {activeEngine && activePillar && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              <span className="text-slate-400 whitespace-nowrap truncate max-w-[140px]">
                {activePillar.shortName}
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              <span className="font-semibold text-indigo-300 whitespace-nowrap truncate">
                {activeEngine.title}
              </span>
            </>
          )}
        </nav>
      </div>

      {/* Right: Command Palette search trigger + Warmup + Quick Restore */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button
          type="button"
          onClick={onOpenCommandPalette}
          className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 transition-colors cursor-pointer"
          aria-label="Apri ricerca rapida tra i 37 motori"
        >
          <Search className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden sm:inline">Cerca tra 37 motori...</span>
          <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-950 border border-slate-800 rounded">
            ⌘K
          </kbd>
        </button>

        <div className="hidden xl:flex items-center gap-1.5 text-xs text-slate-400 tabular-nums px-2">
          <Clock className="w-3.5 h-3.5 text-indigo-400" />
          <span>Warmup:</span>
          <span className="font-semibold text-slate-200">{savedMinutes}m</span>
        </div>

        <button
          type="button"
          onClick={onQuickRestore}
          disabled={isRestoring}
          className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:scale-98 rounded-lg shadow-sm shadow-indigo-600/30 transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-60"
        >
          <Zap className={`w-3.5 h-3.5 ${isRestoring ? 'animate-spin' : ''}`} />
          <span>{isRestoring ? 'Ripristino...' : 'Ripristina'}</span>
        </button>
      </div>
    </header>
  );
};
