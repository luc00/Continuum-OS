import React, { useEffect, useMemo, useRef, useState } from 'react';
import { SuiteTab } from '../types';
import { SUITE_ENGINES, SUITE_PILLARS } from '../data/suiteCatalog';
import { ENGINE_ICON_MAP, PILLAR_STYLE_MAP } from '../data/engineIcons';
import { ArrowRight, Home, Search, X } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: SuiteTab;
  onSelectTab: (tab: SuiteTab) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  activeTab,
  onSelectTab,
}) => {
  const [query, setQuery] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [isOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const baseItems = SUITE_ENGINES.filter((e) => {
      if (!q) return true;
      return (
        e.title.toLowerCase().includes(q) ||
        e.badge.toLowerCase().includes(q) ||
        e.pillarLabel.toLowerCase().includes(q) ||
        e.subtitle.toLowerCase().includes(q) ||
        e.problem.toLowerCase().includes(q)
      );
    });
    return baseItems;
  }, [query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length === 0 ? 0 : (prev + 1) % results.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          results.length === 0 ? 0 : (prev - 1 + results.length) % results.length
        );
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault();
        onSelectTab(results[selectedIndex].id);
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose, onSelectTab, results, selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4 bg-black/75 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Ricerca rapida tra i 37 motori"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-slate-950 border border-slate-700/80 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800">
          <Search className="w-4 h-4 text-indigo-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cerca motore, pilastro o problema (es. SupplyPulse, factoring, brevetti)..."
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Chiudi ricerca"
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Grouped or Filtered Results */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
          {/* Quick Hub Jump */}
          {!query.trim() && (
            <button
              type="button"
              onClick={() => {
                onSelectTab('overview');
                onClose();
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-indigo-600/20 text-indigo-200 border border-indigo-500/40'
                  : 'bg-slate-900/60 text-slate-200 hover:bg-slate-900 border border-slate-800'
              }`}
            >
              <span className="flex items-center gap-2.5 font-semibold">
                <Home className="w-4 h-4 text-indigo-400" />
                <span>Torna alla Panoramica Generale (37 Motori · 6 Pilastri)</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          )}

          {results.length === 0 ? (
            <div className="py-10 text-center text-xs text-slate-400">
              Nessun motore corrispondente a "{query}".
            </div>
          ) : (
            SUITE_PILLARS.map((pillar) => {
              const groupEngines = results.filter((e) => e.pillar === pillar.id);
              if (groupEngines.length === 0) return null;
              const pStyle = PILLAR_STYLE_MAP[pillar.id];

              return (
                <div key={pillar.id} className="space-y-1.5">
                  <div className="px-2 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <span>{pillar.name}</span>
                    <span className="font-mono text-slate-500">{groupEngines.length}</span>
                  </div>
                  <div className="space-y-1">
                    {groupEngines.map((engine) => {
                      const flatIdx = results.findIndex((r) => r.id === engine.id);
                      const isHighlighted = flatIdx === selectedIndex;
                      const Icon =
                        engine.id === 'overview' ? Home : ENGINE_ICON_MAP[engine.id];

                      return (
                        <button
                          key={engine.id}
                          type="button"
                          onMouseEnter={() => setSelectedIndex(flatIdx)}
                          onClick={() => {
                            onSelectTab(engine.id);
                            onClose();
                          }}
                          className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                            isHighlighted
                              ? 'bg-indigo-600/20 border border-indigo-500/40 text-white'
                              : 'bg-slate-900/40 hover:bg-slate-900 border border-transparent text-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center border bg-gradient-to-br shrink-0 ${pStyle.iconBg}`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs font-bold flex items-center gap-2">
                                <span className="truncate">{engine.title}</span>
                                {engine.isNew && (
                                  <span className="text-[10px] font-semibold text-emerald-400 uppercase">
                                    Nuovo
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-slate-400 truncate">
                                {engine.subtitle}
                              </div>
                            </div>
                          </div>
                          <span className="text-[11px] font-mono text-slate-500 shrink-0 hidden sm:inline">
                            {engine.kpiValue}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Keyboard Footer Hint */}
        <div className="px-4 py-2.5 bg-slate-900/70 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Usa ↑ ↓ per spostarti · Invio per aprire</span>
          <span>Esc per chiudere</span>
        </div>
      </div>
    </div>
  );
};
