import React, { useState } from 'react';
import {
  Sparkles,
  Sliders,
  DollarSign,
  Calendar,
  CheckCircle2,
  Trash2,
  ArrowRight,
  Send,
  Zap,
} from 'lucide-react';

export const ZeroUIView: React.FC = () => {
  const [goalInput, setGoalInput] = useState<string>(
    'Devo organizzare il lancio del prodotto X e capire se ci stiamo dentro coi costi'
  );
  const [isAssembling, setIsAssembling] = useState<boolean>(false);
  const [assembledData, setAssembledData] = useState<any>({
    workspaceTitle: 'Lancio Prodotto X & Verifica Sostenibilità Costi',
    budgetLimit: 35000,
    estimatedExpenses: 28400,
    milestones: [
      { id: 'm1', text: 'Freeze codice e security audit backend', done: true },
      { id: 'm2', text: 'Produzione video 3D e rendering asset stampa', done: false },
      { id: 'm3', text: 'Deploy staging e test gateway pagamenti Stripe', done: false },
      { id: 'm4', text: 'Lancio pubblico e campagna stampa specializzata', done: false },
    ],
    suppliers: [
      { name: 'Studio Vertex 3D', cost: '€4.200', role: 'Asset grafici e video promo' },
      { name: 'Stripe EMEA Gateway', cost: '€1.100', role: 'Elaborazione transazioni' },
      { name: 'Agenzia Pr Tech', cost: '€6.500', role: 'Comunicati stampa e media' },
    ],
  });

  const [marketingBudgetSlider, setMarketingBudgetSlider] = useState<number>(35000);

  const handleAssemble = async (overridePrompt?: string) => {
    const promptToUse = overridePrompt || goalInput;
    setIsAssembling(true);
    try {
      const res = await fetch('/api/gemini/zeroui', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goalPrompt: promptToUse }),
      });
      const data = await res.json();
      if (data.success && data.result) {
        setAssembledData({
          workspaceTitle: data.result.workspaceTitle,
          budgetLimit: marketingBudgetSlider,
          estimatedExpenses: 26800,
          milestones: [
            { id: 'm1', text: 'Analisi requisiti prioritari per l\'obiettivo', done: true },
            { id: 'm2', text: 'Attivazione pipeline dati e integrazione database', done: false },
            { id: 'm3', text: 'Validazione finale e quadratura economica', done: false },
          ],
          suppliers: [
            { name: 'Partner Primario', cost: '€5.000', role: 'Integrazione core' },
            { name: 'Consulente Tecnico', cost: '€2.500', role: 'Verifica conformità' },
          ],
        });
      }
    } catch (err) {
      console.warn('ZeroUI assemble error:', err);
    } finally {
      setIsAssembling(false);
    }
  };

  const handleToggleMilestone = (id: string) => {
    setAssembledData((prev: any) => ({
      ...prev,
      milestones: prev.milestones.map((m: any) =>
        m.id === id ? { ...m, done: !m.done } : m
      ),
    }));
  };

  const handleVanishWorkspace = () => {
    setAssembledData(null);
    setGoalInput('');
  };

  const marginPct = Math.round(
    ((marketingBudgetSlider - (assembledData?.estimatedExpenses || 24000)) /
      marketingBudgetSlider) *
      100
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider">
            <span>ZeroUI Workspace</span>
            <span aria-hidden="true">·</span>
            <span>Ephemeral Goal-Generated Interfaces</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Il Sito Che Distrugge i Software e Genera Interfacce al Volo
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Nessun menu o scheda fissa. Scrivi il tuo obiettivo e l'interfaccia si assembla da sola in tempo reale.
          </p>
        </div>

        {assembledData && (
          <button
            onClick={handleVanishWorkspace}
            className="px-3.5 py-1.5 text-xs text-rose-300 hover:text-white bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/60 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Fai Svanire Interfaccia</span>
          </button>
        )}
      </div>

      {/* Goal Prompt Bar (The only starting point) */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4 shadow-xl">
        <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-sky-400" />
          <span>Qual è il tuo obiettivo attuale da risolvere?</span>
        </label>

        <div className="flex gap-3">
          <input
            type="text"
            value={goalInput}
            onChange={(e) => setGoalInput(e.target.value)}
            placeholder="Es. 'Devo organizzare il lancio del prodotto X e capire se ci stiamo dentro coi costi'..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 shadow-inner"
          />

          <button
            onClick={() => handleAssemble()}
            disabled={!goalInput.trim() || isAssembling}
            className="px-5 py-3 text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 rounded-xl transition-all cursor-pointer flex items-center gap-2 shrink-0 shadow-md shadow-sky-600/30"
          >
            {isAssembling ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Assemblaggio UI...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>Auto-Costruisci Interfaccia</span>
              </>
            )}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 pt-1">
          <span className="text-[11px] font-medium">Esempi di compiti:</span>
          {[
            'Devo organizzare il lancio del prodotto X e capire se ci stiamo dentro coi costi',
            'Riconciliare fatture non liquidate e generare piano di rientro',
            'Audit fornitori cloud con simulazione di risparmio server',
          ].map((ex, idx) => (
            <button
              key={idx}
              onClick={() => {
                setGoalInput(ex);
                handleAssemble(ex);
              }}
              className="px-2.5 py-1 text-[11px] rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/80 cursor-pointer transition-colors"
            >
              {ex}
            </button>
          ))}
        </div>
      </section>

      {/* Dynamically Assembled Custom Workspace Grid */}
      {assembledData ? (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
              <span>{assembledData.workspaceTitle}</span>
            </h2>
            <span className="text-xs text-slate-400 font-mono">
              Interfaccia Effimera Generata al Volo
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Widget 1: Interactive Timeline (4 cols) */}
            <div className="lg:col-span-4 rounded-xl border border-slate-800 bg-slate-900/70 p-5 space-y-4 shadow-md flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-sky-400" />
                    <span>Timeline & Milestone</span>
                  </span>
                  <span className="text-sky-400 font-mono text-[11px]">4 Settimane</span>
                </div>

                <div className="space-y-2 text-xs">
                  {assembledData.milestones.map((m: any) => (
                    <div
                      key={m.id}
                      onClick={() => handleToggleMilestone(m.id)}
                      className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-2.5 ${
                        m.done
                          ? 'bg-slate-950/40 border-slate-800/60 opacity-60'
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <button className="mt-0.5 text-slate-400 hover:text-emerald-400">
                        {m.done ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-slate-600" />
                        )}
                      </button>
                      <span className={m.done ? 'line-through text-slate-500' : 'text-slate-200'}>
                        {m.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <span className="text-[10px] text-slate-500 pt-3 border-t border-slate-800 block">
                Sincronizzato istantaneamente con Jira & Notion
              </span>
            </div>

            {/* Widget 2: Financial Simulator (4 cols) */}
            <div className="lg:col-span-4 rounded-xl border border-slate-800 bg-slate-900/70 p-5 space-y-4 shadow-md flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Simulatore Margine Economico</span>
                  </span>
                  <span className="text-emerald-400 font-mono font-bold">
                    Margine: {marginPct}%
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Budget Max Assegnato:</span>
                    <span className="font-bold font-mono text-white">
                      €{marketingBudgetSlider.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="20000"
                    max="60000"
                    step="1000"
                    value={marketingBudgetSlider}
                    onChange={(e) => setMarketingBudgetSlider(Number(e.target.value))}
                    className="w-full accent-sky-500 cursor-pointer"
                  />
                </div>

                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Costi Diretti Previsti:</span>
                    <span className="font-mono text-rose-300 font-semibold">
                      -€{(assembledData.estimatedExpenses || 28400).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-800 font-bold">
                    <span className="text-slate-200">Margine Operativo Netto:</span>
                    <span className="font-mono text-emerald-400">
                      +€{(marketingBudgetSlider - (assembledData.estimatedExpenses || 28400)).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <span className="text-[10px] text-slate-500 pt-3 border-t border-slate-800 block">
                Pescato in tempo reale da SAP & Stripe Ledger
              </span>
            </div>

            {/* Widget 3: Supplier Roster (4 cols) */}
            <div className="lg:col-span-4 rounded-xl border border-slate-800 bg-slate-900/70 p-5 space-y-4 shadow-md flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-300 uppercase tracking-wider">
                    Contatti Fornitori Collegati
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">3 Partner</span>
                </div>

                <div className="space-y-2 text-xs">
                  {assembledData.suppliers.map((s: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{s.name}</span>
                        <span className="font-mono text-slate-300 text-[11px] font-semibold">{s.cost}</span>
                      </div>
                      <p className="text-[11px] text-slate-400">{s.role}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleVanishWorkspace}
                className="w-full py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                Task Completato: Chiudi Tutto
              </button>
            </div>
          </div>
        </section>
      ) : (
        <div className="p-12 text-center border border-dashed border-slate-800 rounded-2xl space-y-2">
          <Sparkles className="w-8 h-8 text-slate-600 mx-auto" />
          <h3 className="text-sm font-bold text-slate-400">Nessuna interfaccia attiva</h3>
          <p className="text-xs text-slate-500">
            Digita un obiettivo qui sopra per vedere il software auto-assemblarsi su misura per te.
          </p>
        </div>
      )}
    </div>
  );
};
