import React from 'react';
import { SuiteTab } from '../types';
import { HERO_IMAGE } from '../data/mockData';
import { SUITE_ENGINES, SUITE_PILLARS } from '../data/suiteCatalog';
import { ENGINE_ICON_MAP, PILLAR_STYLE_MAP } from '../data/engineIcons';
import { ArrowRight, Compass, LayoutGrid, Search, Sparkles, Zap } from 'lucide-react';

interface WelcomePageProps {
  onEnterHub: () => void;
  onSelectEngine: (tab: SuiteTab) => void;
  onOpenCommandPalette: () => void;
  savedMinutes: number;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({
  onEnterHub,
  onSelectEngine,
  onOpenCommandPalette,
  savedMinutes,
}) => {
  const quickStartEngines: Array<{ id: Exclude<SuiteTab, 'overview'>; note: string }> = [
    { id: 'contextflow', note: `${savedMinutes}m di warmup risparmiati` },
    { id: 'supplypulse', note: 'Monitoraggio filiera 28gg in anticipo' },
    { id: 'liquidcash', note: 'Factoring frazionato & sweep weekend' },
    { id: 'tabzero', note: 'Ufficio vocal-visivo senza tastiera' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Main Welcome Hero */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-10 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            {/* Transparent Brand Header without background */}
            <div className="flex items-center gap-3.5">
              <img
                src="/assets/aistudio/8-2-consultant-download-png_6214edb5.png"
                alt="Continuum Work OS Logo"
                className="h-14 sm:h-16 w-auto object-contain bg-transparent shrink-0 drop-shadow-[0_0_2px_rgba(255,255,255,0.7)]"
              />
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 tracking-wider uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Benvenuto nel tuo Sistema Operativo Aziendale</span>
                </div>
                <p className="text-lg sm:text-xl font-bold text-white tracking-tight mt-0.5">
                  Continuum Work OS
                </p>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white text-balance leading-tight">
              37 Motori Operativi, Tutti in un Unico Posto, Pronti da Usare.
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Niente schede sparse o software scollegati. Qui trovi ogni strumento di lavoro
              organizzato per area — dalla continuità mentale di <strong>ContextFlow</strong> alla
              tesoreria di <strong>LiquidCash</strong>, fino a vendite, filiera, HR e sicurezza —
              pronto da aprire e utilizzare in un clic.
            </p>

            {/* Primary Call To Actions */}
            <div className="pt-1 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onEnterHub}
                className="px-5 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 cursor-pointer"
              >
                <LayoutGrid className="w-4 h-4" />
                <span>Apri Tutti i 37 Motori in un Unico Posto</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onSelectEngine('contextflow')}
                className="px-4 py-3 text-sm font-semibold text-slate-200 bg-slate-800/90 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-indigo-400" />
                <span>Riprendi da ContextFlow</span>
              </button>

              <button
                type="button"
                onClick={onOpenCommandPalette}
                className="px-4 py-3 text-sm font-medium text-indigo-300 bg-indigo-950/50 hover:bg-indigo-900/50 border border-indigo-500/30 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Cerca (⌘K)</span>
              </button>
            </div>

            {/* 3 Simple Steps */}
            <div className="pt-5 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-800 text-xs">
              <div className="space-y-1">
                <span className="font-mono text-indigo-400 font-bold">01 · TROVA</span>
                <p className="text-slate-300 font-medium">Tutti i 37 motori riuniti in 6 pilastri</p>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-emerald-400 font-bold">02 · PRENDI</span>
                <p className="text-slate-300 font-medium">Apri o fissa i tuoi preferiti in barra</p>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-amber-400 font-bold">03 · USA SUBITO</span>
                <p className="text-slate-300 font-medium">Console interattive pronte all’uso</p>
              </div>
            </div>
          </div>

          {/* Right Quick-Start Visual Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-xl overflow-hidden border border-slate-700/80 shadow-2xl aspect-video">
              <img
                src={HERO_IMAGE}
                alt="Continuum Work OS Ambiente Operativo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-200">
                <span className="font-semibold">Scrivania Digitale Unificata</span>
                <span className="text-emerald-400 font-mono">37 Motori Pronti</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Accesso Rapido Consigliato</span>
                </span>
                <button
                  type="button"
                  onClick={onEnterHub}
                  className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 cursor-pointer"
                >
                  Vedi tutti (37) →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {quickStartEngines.map((item) => {
                  const meta = SUITE_ENGINES.find((e) => e.id === item.id);
                  if (!meta) return null;
                  const Icon = ENGINE_ICON_MAP[item.id];
                  const pStyle = PILLAR_STYLE_MAP[meta.pillar];
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onSelectEngine(item.id)}
                      className="text-left p-2.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-indigo-500/40 transition-colors cursor-pointer flex items-center gap-2.5"
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center border bg-gradient-to-br shrink-0 ${pStyle.iconBg}`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white truncate">{meta.title}</div>
                        <div className="text-[10px] text-slate-400 truncate">{item.note}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Pillar Preview Section: Jump straight to any engine from Welcome */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              Scegli Direttamente dai 6 Pilastri
            </h2>
            <p className="text-xs text-slate-400">
              Ogni pilastro raccoglie gli strumenti di un’area aziendale: clicca un motore per
              avviarlo subito o apri la bacheca unica.
            </p>
          </div>
          <button
            type="button"
            onClick={onEnterHub}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            <span>Vai alla Bacheca Completa (37 Motori)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {SUITE_PILLARS.map((pillar, index) => {
            const pStyle = PILLAR_STYLE_MAP[pillar.id];
            const engines = SUITE_ENGINES.filter((e) => e.pillar === pillar.id);
            return (
              <div
                key={pillar.id}
                className="rounded-xl border border-slate-800 bg-slate-900/45 p-4 flex flex-col justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className={`text-[11px] font-mono uppercase tracking-wider ${pStyle.accentText}`}>
                    Pilastro 0{index + 1} · {engines.length} Motori
                  </div>
                  <h3 className="text-sm font-bold text-white">{pillar.name}</h3>
                  <p className="text-xs text-slate-400 leading-snug">{pillar.description}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
                  {engines.map((engine) => (
                    <button
                      key={engine.id}
                      type="button"
                      onClick={() => onSelectEngine(engine.id)}
                      className="px-2.5 py-1 rounded-md bg-slate-950/80 hover:bg-indigo-600/25 border border-slate-800 hover:border-indigo-500/40 text-[11px] font-medium text-slate-200 hover:text-white transition-colors cursor-pointer"
                    >
                      {engine.title}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
