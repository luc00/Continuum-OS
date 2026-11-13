import React, { useState } from 'react';
import {
  Archive,
  Search,
  Sparkles,
  HelpCircle,
  Clock,
  UserCheck,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Plus,
} from 'lucide-react';

export const DecisionLedgerView: React.FC = () => {
  const [query, setQuery] = useState<string>('Perché nel 2025 non siamo entrati nel mercato spagnolo?');
  const [isQuerying, setIsQuerying] = useState<boolean>(false);
  const [decisionResult, setDecisionResult] = useState<any>({
    question: 'Perché nel 2025 non siamo entrati nel mercato spagnolo?',
    historicalVerdict:
      'Nel Q2 2025 il Comitato Strategico ha valutato l\'espansione in Spagna. La decisione di NON entrare è stata presa all\'unanimità per via della frammentazione logistica iberica e dell\'imminente cambio normativo sui resi e-commerce che avrebbe eroso il margine netto del 18%.',
    dateDecided: '14 Maggio 2025',
    decisionOwner: 'Elena Rostagno (Legal) & Marco B. (CFO)',
    alternativesDiscarded: [
      'Apertura filiale autonoma a Barcellona (scartata per costi fissi eccessivi > 450k€)',
      'Partnership con distributore locale terzo (scartata per perdita di controllo sul brand e marginalità)',
    ],
    supportingMetrics: 'EBITDA iberico stimato a soli 3.2% vs 14.8% nel mercato DACH.',
    acceptedRisks: 'Rinuncia temporanea a 1.2M€ di fatturato lordo per preservare il margine operativo del gruppo.',
  });

  const sampleQuestions = [
    'Perché nel 2025 non siamo entrati nel mercato spagnolo?',
    'Perché PostgreSQL invece di MongoDB per il billing?',
    'Perché abbiamo scartato la modalità freemium nel 2024?',
  ];

  const handleRunQuery = async (customQ?: string) => {
    const targetQ = customQ || query;
    setIsQuerying(true);
    try {
      const res = await fetch('/api/gemini/decision-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: targetQ }),
      });
      const data = await res.json();
      if (data.success && data.result) {
        setDecisionResult(data.result);
      }
    } catch (err) {
      console.warn('Decision query error:', err);
    } finally {
      setIsQuerying(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            <span>DecisionLedger</span>
            <span aria-hidden="true">·</span>
            <span>Corporate "Why" Living Memory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Il Registro Storico del "Perché" Aziendale
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Interroga la memoria storica dell'azienda come un consulente. Non ripetere gli errori già scartati in passato.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
          <Archive className="w-3.5 h-3.5 text-cyan-400" />
          <span>84 decisioni strategiche indicizzate</span>
        </div>
      </div>

      {/* Query Bar */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4 shadow-xl">
        <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Fai una domanda alla memoria storica dell'azienda:</span>
        </label>

        <div className="flex gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Es. 'Perché non abbiamo lanciato l'app mobile nel 2024?'..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 pl-11 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 shadow-inner"
            />
            <Search className="w-5 h-5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          <button
            onClick={() => handleRunQuery()}
            disabled={isQuerying}
            className="px-5 py-3 text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            {isQuerying ? 'Ricerca...' : 'Interroga Memoria'}
          </button>
        </div>

        {/* Quick Question Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-slate-400 font-medium text-[11px]">Quesiti frequenti:</span>
          {sampleQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(q);
                handleRunQuery(q);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 transition-colors cursor-pointer text-[11px]"
            >
              {q}
            </button>
          ))}
        </div>
      </section>

      {/* Decision Memory Result Card */}
      {decisionResult && (
        <section className="rounded-2xl border border-cyan-900/40 bg-gradient-to-r from-slate-900 via-cyan-950/20 to-slate-900 p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                Decision Record Certificato
              </span>
              <h2 className="text-xl font-bold text-white mt-1">
                {decisionResult.question}
              </h2>
            </div>

            <div className="text-xs text-slate-400 flex items-center gap-2 font-mono">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Deciso il: <strong>{decisionResult.dateDecided}</strong></span>
            </div>
          </div>

          {/* Historical Verdict */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              La Motivazione Originale Risoluta:
            </span>
            <p className="text-sm text-slate-200 leading-relaxed font-medium">
              {decisionResult.historicalVerdict}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Responsible Owners */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-slate-400 font-semibold uppercase tracking-wider block">
                Decision Makers & Stakeholder
              </span>
              <div className="flex items-center gap-2 text-white font-medium">
                <UserCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{decisionResult.decisionOwner}</span>
              </div>
            </div>

            {/* Evidence Data */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-slate-400 font-semibold uppercase tracking-wider block">
                Dati Disponibili all'Epoca
              </span>
              <p className="text-slate-300 font-mono">
                {decisionResult.supportingMetrics || 'Metriche EBITDA e forecast logistici'}
              </p>
            </div>

            {/* Accepted Risks */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-amber-400 font-semibold uppercase tracking-wider block">
                Rischi Accettati Consapevolmente
              </span>
              <p className="text-slate-300">
                {decisionResult.acceptedRisks || 'Rinuncia controllata a volumi per margini'}
              </p>
            </div>
          </div>

          {/* Discarded Alternatives List */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Alternative Valutate e Scartate (Evita di riproporle senza nuovi presupposti):
            </span>
            <div className="space-y-2 text-xs">
              {decisionResult.alternativesDiscarded?.map((alt: string, aIdx: number) => (
                <div
                  key={aIdx}
                  className="p-3 rounded-lg bg-rose-950/20 border border-rose-900/30 text-slate-300 flex items-start gap-2.5"
                >
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{alt}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
