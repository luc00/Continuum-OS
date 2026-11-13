import React, { useState } from 'react';
import {
  Package,
  Sparkles,
  CheckCircle2,
  Clock,
  DollarSign,
  Download,
  Plus,
  ShieldCheck,
  Cpu,
  Layers,
  ArrowRight,
} from 'lucide-react';

export const OutcomeMarketView: React.FC = () => {
  const [packages, setPackages] = useState([
    {
      id: 'pkg-1',
      title: 'Trasformazione di 500 PDF disordinati in Database SQL normalizzato',
      scope:
        'Scomposizione automatica in 12 micro-task anonimi e paralleli: estrazione campi Iva, data fattura, ragione sociale e popolamento schema relazionale PostgreSQL.',
      budget: 250,
      slaHours: 4,
      elapsedMinutes: 195,
      status: 'completed',
      parallelWorkers: 12,
      testsPassed: '38/38 test di integrità relazionale superati al 100%',
      downloadFile: 'archivio_normalizzato_2026.sql',
    },
    {
      id: 'pkg-2',
      title: 'Render 3D fotorealistico di modello CAD per sedia ergonomica',
      scope:
        'Ottimizzazione mesh poligonale, texturing materico tessuto bouclé e calcolo illuminazione studio 8K per catalogo.',
      budget: 180,
      slaHours: 3,
      elapsedMinutes: 85,
      status: 'processing_parallel',
      parallelWorkers: 4,
      testsPassed: 'Verifica calibrazione colore P3 in corso (82%)',
    },
    {
      id: 'pkg-3',
      title: 'Audit conformità legale clausole contrattuali rispetto a regolamento AI Act',
      scope:
        'Verifica rigorosa articoli 14 e 28 su trasparenza modelli di fondazione e responsabilità civile.',
      budget: 320,
      slaHours: 6,
      elapsedMinutes: 340,
      status: 'completed',
      parallelWorkers: 6,
      testsPassed: '14/14 conformità giuridiche convalidate da specialisti verificati',
      downloadFile: 'parere_conformita_ai_act.pdf',
    },
  ]);

  const [isBountyModalOpen, setIsBountyModalOpen] = useState<boolean>(false);
  const [bountyTitle, setBountyTitle] = useState<string>('');
  const [bountyBudget, setBountyBudget] = useState<number>(200);
  const [bountySla, setBountySla] = useState<number>(4);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handlePostBounty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bountyTitle.trim()) return;

    const newPkg = {
      id: `pkg-${Date.now()}`,
      title: bountyTitle,
      scope: 'Pacchetto chiuso scomposto in micro-task crittografati paralleli con collaudo automatico.',
      budget: bountyBudget,
      slaHours: bountySla,
      elapsedMinutes: 10,
      status: 'processing_parallel' as const,
      parallelWorkers: 8,
      testsPassed: 'Test di qualità automatizzati in esecuzione...',
    };

    setPackages([newPkg, ...packages]);
    setIsBountyModalOpen(false);
    setBountyTitle('');
  };

  const handleDownload = (filename: string) => {
    setDownloadSuccess(filename);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <span>OutcomeMarket</span>
            <span aria-hidden="true">·</span>
            <span>Instant Results Exchange, Not Freelance Hours</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            La Borsa Istantanea dei Risultati, Non dei Freelance
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Non comprare ore e non fare call conoscitive. Pubblica un problema chiuso con budget e scadenza: ricevi il file finito pronto all'uso.
          </p>
        </div>

        <button
          onClick={() => setIsBountyModalOpen(true)}
          className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-sm shadow-emerald-600/30 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Pubblica Problema Chiuso</span>
        </button>
      </div>

      {/* Packages Grid */}
      <div className="space-y-4">
        {packages.map((pkg) => {
          const isDone = pkg.status === 'completed';

          return (
            <div
              key={pkg.id}
              className={`p-6 rounded-2xl border transition-all space-y-4 ${
                isDone
                  ? 'bg-slate-900/60 border-emerald-900/40 shadow-lg'
                  : 'bg-slate-900/30 border-slate-800'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1 max-w-3xl">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                        isDone
                          ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60'
                          : 'bg-indigo-950/60 text-indigo-400 border-indigo-800/60'
                      }`}
                    >
                      {isDone ? 'Risultato Convalidato & Pronto' : 'Elaborazione Parallela'}
                    </span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="text-xs text-slate-400 font-mono">
                      {pkg.parallelWorkers} sistemi e specialisti paralleli
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white">{pkg.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{pkg.scope}</p>
                </div>

                <div className="flex items-center gap-6 shrink-0 text-right">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Budget Fissato</span>
                    <span className="text-lg font-bold font-mono text-emerald-400">
                      €{pkg.budget}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">SLA Scadenza</span>
                    <span className="text-lg font-bold font-mono text-slate-200">
                      {pkg.slaHours} ore
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress & Verification Bar */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-mono text-[11px]">{pkg.testsPassed}</span>
                </div>

                {isDone && pkg.downloadFile && (
                  <button
                    onClick={() => handleDownload(pkg.downloadFile!)}
                    className="px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Scarica Risultato Validato ({pkg.downloadFile})</span>
                  </button>
                )}
              </div>

              {downloadSuccess === pkg.downloadFile && (
                <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 animate-fadeIn">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>File scaricato con successo! Zero messaggi o call scambiate.</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* New Problem Modal */}
      {isBountyModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handlePostBounty}
            className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">
                  Pubblica Pacchetto Problema Chiuso
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsBountyModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                Chiudi
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-medium text-slate-300 block mb-1">
                  Titolo e Risultato Atteso Rigoroso (Cosa deve essere consegnato)
                </label>
                <textarea
                  required
                  rows={3}
                  value={bountyTitle}
                  onChange={(e) => setBountyTitle(e.target.value)}
                  placeholder="Es. 'Trasformare questi 500 PDF disordinati in un database SQL pulito con schema normalizzato'..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-medium text-slate-300 block mb-1">Budget (€)</label>
                  <input
                    type="number"
                    value={bountyBudget}
                    onChange={(e) => setBountyBudget(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="font-medium text-slate-300 block mb-1">Scadenza SLA (Ore)</label>
                  <input
                    type="number"
                    value={bountySla}
                    onChange={(e) => setBountySla(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono"
                  />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                Il pacchetto verrà scomposto istantaneamente in micro-task anonimi e verificato tramite test di accettazione automatizzati.
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsBountyModalOpen(false)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                Annulla
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors cursor-pointer shadow-md shadow-emerald-600/30"
              >
                Pubblica su OutcomeMarket
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
