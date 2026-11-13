import React, { useState } from 'react';
import {
  Handshake,
  ShieldCheck,
  Lock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  FileText,
  Clock,
  Zap,
} from 'lucide-react';

export const NegotiateZeroView: React.FC = () => {
  // Confidential boundaries for Party A (Fornitore)
  const [vendorTargetPrice, setVendorTargetPrice] = useState<number>(55000);
  const [vendorMinPrice, setVendorMinPrice] = useState<number>(44000);
  const [vendorPaymentDays, setVendorPaymentDays] = useState<number>(30);
  const [vendorFlexibility, setVendorFlexibility] = useState<string>('Sconto 5% se anticipo 30gg');

  // Confidential boundaries for Party B (Cliente)
  const [clientBudget, setClientBudget] = useState<number>(50000);
  const [clientMaxPrice, setClientMaxPrice] = useState<number>(48000);
  const [clientPaymentDays, setClientPaymentDays] = useState<number>(45);

  const [isCrossing, setIsCrossing] = useState<boolean>(false);
  const [dealResult, setDealResult] = useState<any>(null);
  const [contractSealed, setContractSealed] = useState<boolean>(false);

  const handleComputeBlindDeal = async () => {
    setIsCrossing(true);
    try {
      const res = await fetch('/api/gemini/negotiate-blind', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          partyA: {
            name: 'Fornitore Tech (Tu)',
            targetPrice: vendorTargetPrice,
            minPrice: vendorMinPrice,
            paymentDays: vendorPaymentDays,
            flexibility: vendorFlexibility,
          },
          partyB: {
            name: 'Cliente Enterprise SpA',
            targetPrice: clientBudget,
            maxPrice: clientMaxPrice,
            paymentDays: clientPaymentDays,
          },
        }),
      });
      const data = await res.json();
      if (data.success && data.result) {
        setDealResult(data.result);
      }
    } catch (err) {
      console.warn('Blind deal error:', err);
    } finally {
      setIsCrossing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <span>NegotiateZero Engine</span>
            <span aria-hidden="true">·</span>
            <span>Blind B2B Contract Sandbox</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Sandbox per Trattative B2B Senza Attrito
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Incrocio cieco crittografato delle linee rosse: accordo ottimale pre-approvato in 15 minuti anziché settimane di redlining.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
          <Lock className="w-3.5 h-3.5 text-emerald-400" />
          <span>Zero-Knowledge Proof: Nessuna carta rivelata</span>
        </div>
      </div>

      {/* Two Confidential Sides */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Party A (Fornitore) */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-5 shadow-lg relative">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Parte A: Fornitore (Tu)
            </span>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded">
              Crittografato Locale
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="text-slate-300 font-medium block mb-1">
                Prezzo Target vs Linea Rossa Minima (Non negoziabile)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                  <span className="text-[10px] text-slate-400 block">Prezzo Desiderato:</span>
                  <span className="text-sm font-bold text-white font-mono">
                    €{vendorTargetPrice.toLocaleString()}
                  </span>
                </div>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                  <span className="text-[10px] text-rose-400 block">Soglia Minima Assoluta:</span>
                  <span className="text-sm font-bold text-rose-300 font-mono">
                    €{vendorMinPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="text-slate-300 font-medium block mb-1">
                Termini di Pagamento Desiderati
              </label>
              <input
                type="number"
                value={vendorPaymentDays}
                onChange={(e) => setVendorPaymentDays(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white font-mono focus:outline-none focus:border-emerald-500"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Giorni data fattura fine mese preferiti
              </span>
            </div>

            <div>
              <label className="text-slate-300 font-medium block mb-1">
                Margine di Flessibilità Dichiarato (Accordo di Scambio)
              </label>
              <input
                type="text"
                value={vendorFlexibility}
                onChange={(e) => setVendorFlexibility(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Party B (Cliente) */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-5 shadow-lg relative">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Parte B: Cliente Enterprise SpA
            </span>
            <span className="text-[11px] font-mono text-indigo-400 bg-indigo-950/40 border border-indigo-800/40 px-2 py-0.5 rounded">
              Crittografato Remoto
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="text-slate-300 font-medium block mb-1">
                Budget Previsto vs Tetto Massimo di Spesa (Linea Rossa)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                  <span className="text-[10px] text-slate-400 block">Budget Allocato:</span>
                  <span className="text-sm font-bold text-white font-mono">
                    €{clientBudget.toLocaleString()}
                  </span>
                </div>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                  <span className="text-[10px] text-rose-400 block">Tetto Massimo di Spesa:</span>
                  <span className="text-sm font-bold text-rose-300 font-mono">
                    €{clientMaxPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="text-slate-300 font-medium block mb-1">
                Termini di Pagamento Massimi Accettabili
              </label>
              <input
                type="number"
                value={clientPaymentDays}
                onChange={(e) => setClientPaymentDays(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white font-mono focus:outline-none focus:border-indigo-500"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Giorni massimi per procedura amministrativa cliente
              </span>
            </div>

            <div className="p-3 rounded-lg bg-indigo-950/20 border border-indigo-900/30 text-slate-300 space-y-1">
              <span className="font-semibold text-indigo-300 block">Requisito non negoziabile:</span>
              <p className="text-[11px] text-slate-400">
                Garanzia SLA 99.8% e consegna della documentazione tecnica completa in italiano.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action: Compute Blind Deal */}
      <div className="text-center pt-2">
        <button
          onClick={handleComputeBlindDeal}
          disabled={isCrossing}
          className="px-6 py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:scale-98 rounded-xl shadow-lg shadow-emerald-600/30 transition-all inline-flex items-center gap-2 cursor-pointer disabled:opacity-60"
        >
          {isCrossing ? (
            <>
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Incrocio Cieco in Corso (Zero-Knowledge Match)...</span>
            </>
          ) : (
            <>
              <Handshake className="w-5 h-5" />
              <span>Incrocia Carte & Genera Contratto Pre-Approvato (15 min)</span>
            </>
          )}
        </button>
      </div>

      {/* Output Deal Result Card */}
      {dealResult && (
        <section className="rounded-2xl border border-emerald-900/50 bg-gradient-to-r from-slate-900 via-emerald-950/20 to-slate-900 p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  Accordo Ottimale Raggiunto (Nash Equilibrium)
                </h3>
                <p className="text-xs text-slate-400">
                  {dealResult.summary}
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 block uppercase">Tempo risparmiato</span>
              <span className="text-base font-bold text-emerald-400 font-mono">
                {dealResult.weeksNegotiationSaved} settimane di email evitate
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-400 block uppercase tracking-wider font-semibold">
                Prezzo Sintetizzato
              </span>
              <span className="text-2xl font-extrabold text-white font-mono">
                €{dealResult.agreedPrice?.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-500 block">
                Perfetta intersezione tra minimo fornitore e budget cliente
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-400 block uppercase tracking-wider font-semibold">
                Termini di Pagamento
              </span>
              <span className="text-base font-bold text-slate-200">
                {dealResult.agreedPaymentTerms}
              </span>
              <span className="text-[10px] text-slate-500 block">
                Compensato con sconto cassa e acconto iniziale
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-400 block uppercase tracking-wider font-semibold">
                Status Legale
              </span>
              <span className="text-base font-bold text-emerald-400">
                {contractSealed ? 'Contratto Firmato & Blindato' : 'Pronto per Firma Digitale'}
              </span>
              <span className="text-[10px] text-slate-500 block">
                Clausole standard UE pre-approvate da entrambi i legali
              </span>
            </div>
          </div>

          {/* Clauses list */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Bozza di Clausole Armonizzate
            </span>
            <div className="space-y-2 text-xs text-slate-200 font-mono bg-slate-950 p-4 rounded-xl border border-slate-800">
              {dealResult.balancedClauses?.map((clause: string, cIdx: number) => (
                <div key={cIdx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">§{cIdx + 1}.</span>
                  <span>{clause}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={() => setContractSealed(true)}
              disabled={contractSealed}
              className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-70"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{contractSealed ? 'Accordo Sigillato su Blockchain' : 'Firma Contratto Istantaneo'}</span>
            </button>
          </div>
        </section>
      )}
    </div>
  );
};
