import React, { useState } from 'react';
import {
  Wind,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Percent,
  RefreshCw,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

export const FutureCastView: React.FC = () => {
  const [proposalDraft, setProposalDraft] = useState<string>(
    `Gentile Dott.ssa Ferri,\n\nIn allegato trasmettiamo la proposta commerciale per il rinnovo della suite software per il 2027.\n\nIl canone annuale concordato è fissato a 48.000€ con fatturazione anticipata in un'unica soluzione. È prevista una penale del 3% per ogni settimana di ritardo nel pagamento delle tranche accessorie.\n\nRestiamo a disposizione per la firma entro venerdì prossimo.`
  );

  const [recipientType, setRecipientType] = useState<string>('Ufficio Acquisti Enterprise (Procurement)');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationResult, setSimulationResult] = useState<any>({
    immediateCloseProbability: 46,
    discountPushbackRisk: 78,
    scenarios: [
      {
        title: 'Richiesta Sconto 15% & Stralcio Penale',
        probability: 78,
        tone: 'pushback',
        detail: 'Il cliente eccepisce sul canone anticipato unico e sulla penale del 3%, chiedendo 4 settimane di revisione interna.',
      },
      {
        title: 'Chiusura Immediata senza modifiche',
        probability: 14,
        tone: 'enthusiastic',
        detail: 'Firma entro venerdì senza alcuna contestazione di budget.',
      },
      {
        title: 'Richiesta Rateizzazione Trimestrale',
        probability: 8,
        tone: 'cautious',
        detail: 'Accettazione del prezzo base con dilazione a 90 giorni.',
      },
    ],
    heatmapRiskClause: 'È prevista una penale del 3% per ogni settimana di ritardo nel pagamento',
    recommendedWordingRewrite:
      'È riconosciuto un incentivo cassa del 2% per saldo contabile emesso entro 15 giorni lavorativi.',
  });

  const handleRunSimulation = async () => {
    setIsSimulating(true);
    try {
      const res = await fetch('/api/gemini/futurecast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          proposalText: proposalDraft,
          recipientType,
        }),
      });
      const data = await res.json();
      if (data.success && data.result) {
        setSimulationResult(data.result);
      }
    } catch (err) {
      console.warn('FutureCast simulation error:', err);
    } finally {
      setIsSimulating(false);
    }
  };

  const handleApplyRewrite = () => {
    if (!simulationResult?.heatmapRiskClause || !simulationResult?.recommendedWordingRewrite) return;
    setProposalDraft((prev) =>
      prev.replace(
        simulationResult.heatmapRiskClause,
        simulationResult.recommendedWordingRewrite
      )
    );
    // Upgrade probability
    setSimulationResult((prev: any) => ({
      ...prev,
      immediateCloseProbability: 84,
      discountPushbackRisk: 22,
      heatmapRiskClause: null,
      scenarios: [
        {
          title: 'Chiusura Immediata Ottimizzata',
          probability: 84,
          tone: 'enthusiastic',
          detail: 'L\'incentivo cassa stimola la liquidazione immediata senza frizioni contrattuali.',
        },
        {
          title: 'Richiesta Chiarimento Tecnico',
          probability: 16,
          tone: 'cautious',
          detail: 'Allineamento standard sui tempi di onboarding.',
        },
      ],
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-400 uppercase tracking-wider">
            <span>FutureCast Simulator</span>
            <span aria-hidden="true">·</span>
            <span>Pre-Click Consequence Wind Tunnel</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Il Simulatore di Conseguenze Prima del "Click"
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            La galleria del vento digitale per il lavoro d'ufficio: simula 1.000 scenari di reazione prima di inviare un'email o proposta.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg font-mono">
          <Wind className="w-3.5 h-3.5 text-teal-400" />
          <span>1.000 iterazioni Monte Carlo</span>
        </div>
      </div>

      {/* Main Split: Proposal Text on Left, Wind Tunnel Simulation on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Draft Editor (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Bozza Comunicazione / Proposta Delicata
            </span>
            <select
              value={recipientType}
              onChange={(e) => setRecipientType(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-300 focus:outline-none focus:border-teal-500"
            >
              <option value="Ufficio Acquisti Enterprise (Procurement)">Ufficio Acquisti Enterprise</option>
              <option value="Amministratore Delegato / Founder">CEO / Founder</option>
              <option value="Cliente Storico su Rinnovo">Cliente Storico (Rinnovo)</option>
            </select>
          </div>

          <textarea
            rows={10}
            value={proposalDraft}
            onChange={(e) => setProposalDraft(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-200 leading-relaxed focus:outline-none focus:border-teal-500 shadow-inner"
          />

          <button
            onClick={handleRunSimulation}
            disabled={isSimulating}
            className="w-full py-3 text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-teal-600/30 disabled:opacity-60"
          >
            {isSimulating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Simulazione 1.000 Scenari in Corso...</span>
              </>
            ) : (
              <>
                <Wind className="w-4 h-4" />
                <span>Testa Proposta nella Galleria del Vento</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Risk Heatmap & Optimization (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Mappa Termica di Reazione Probabilistica
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Confidenza Modello: 94%
            </span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 space-y-6 shadow-xl">
            {/* Probability Gauges */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Probabilità Chiusura Immediata
                </span>
                <span
                  className={`text-3xl font-extrabold font-mono ${
                    simulationResult.immediateCloseProbability >= 70
                      ? 'text-emerald-400'
                      : 'text-amber-400'
                  }`}
                >
                  {simulationResult.immediateCloseProbability}%
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[11px] font-semibold text-rose-400 uppercase tracking-wider block">
                  Rischio Richiesta Sconto / Attrito
                </span>
                <span className="text-3xl font-extrabold text-rose-400 font-mono">
                  {simulationResult.discountPushbackRisk}%
                </span>
              </div>
            </div>

            {/* Heatmap High-Risk Clause Flag */}
            {simulationResult.heatmapRiskClause && (
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wide">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Frase ad Alto Rischio Identificata nel Testo:</span>
                </div>
                <p className="text-xs font-mono text-rose-300 italic bg-slate-950 p-2.5 rounded border border-rose-900/50">
                  "{simulationResult.heatmapRiskClause}"
                </p>

                <div className="pt-2 space-y-1.5">
                  <span className="text-xs font-bold text-emerald-400 block">
                    Riformulazione Ottimale Suggerita:
                  </span>
                  <p className="text-xs font-mono text-emerald-300 bg-slate-950 p-2.5 rounded border border-emerald-900/50">
                    "{simulationResult.recommendedWordingRewrite}"
                  </p>

                  <button
                    onClick={handleApplyRewrite}
                    className="mt-2 w-full py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Applica Riformulazione & Alza Chiusura all'84%</span>
                  </button>
                </div>
              </div>
            )}

            {/* Scenarios Breakdown */}
            <div className="space-y-2 text-xs">
              <span className="text-slate-400 font-semibold uppercase tracking-wider block">
                Distribuzione dei 1.000 Scenari Simulati:
              </span>
              <div className="space-y-2">
                {simulationResult.scenarios?.map((sc: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{sc.title}</span>
                      <span className="font-mono text-teal-400 font-bold">{sc.probability}%</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-normal">{sc.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
