import React, { useState } from 'react';
import {
  GitFork,
  BookOpen,
  Terminal,
  Play,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Database,
  Layers,
  GraduationCap,
} from 'lucide-react';

export const LegacyBridgeView: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [showErrorBranch, setShowErrorBranch] = useState<boolean>(false);
  const [simulatorSuccess, setSimulatorSuccess] = useState<boolean>(false);

  const steps = [
    {
      stepNumber: 1,
      title: 'Accesso al Terminale AS/400 & Selezione Registro Contabile',
      system: 'AS/400 Terminale 5250 verde',
      instruction:
        'Accedi con credenziali contabili. Nel menu principale digita il comando `GO ACCT_CLOSE` e premi Invio. Non toccare il tasto F3 per evitare il rollback dei registri.',
      screenPreview: '=== AS/400 MENU GESTIONALE COMMERCIALE 1998 ===\nOpzione: 14 [Chiusura Mensile Partite Doppie]\nAnno: 2026  Mese: 10\n> INVIO PER PROCEDERE',
      branchRule: 'Se compare il messaggio "RECORD BLOCCATO DA UTENTE GUEST", premere F12 e riavviare la sessione.',
    },
    {
      stepNumber: 2,
      title: 'Esportazione CSV & Riconciliazione Macro Excel Mario_v4.xlsm',
      system: 'Excel Macro Locale Legacy',
      instruction:
        'Apri il file `Mario_Chiusura_v4.xlsm` nella cartella di rete Z:\\Contabilita. Clicca sul pulsante arancione "Esegui Quadratura Partite".',
      screenPreview: 'FOGLIO EXCEL: Quadratura_2026.xlsm\nMacro in esecuzione: Macro_Pulisci_IVA_SplitPayment()\nStato: 4,120 righe elaborate... [100% OK]',
      branchRule: 'Se compare l\'errore VBA 702 (Overflow data), cambiare il formato della cella B12 in "Testo" prima di rilanciare.',
    },
    {
      stepNumber: 3,
      title: 'Caricamento Telematico su SDI con Certificato Fisico',
      system: 'Portale Agenzia Entrate / SDI Token',
      instruction:
        'Inserire la smart card fisica nel lettore USB. Trascinare il file XML generato nel portale e digitare il PIN dell\'amministratore.',
      screenPreview: 'PORTALE SDI: Ricevuta di Trasmissione\nID Invio: IT2026_98412_CL\nEsito: ACCOLTO - Ricevuta firmata digitalmente generata.',
      branchRule: 'Se la smart card non viene rilevata, staccare e riattaccare il lettore USB attendendo il led verde.',
    },
  ];

  const handleSimulatorClick = () => {
    setSimulatorSuccess(true);
    setTimeout(() => setSimulatorSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
            <span>LegacyBridge Engine</span>
            <span aria-hidden="true">·</span>
            <span>Tribal Knowledge Runbook Compiler</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Traduttore Istantaneo di Processi "Tribali"
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Registra passivamente cosa fa l'esperto al computer e lo trasforma in manuali operativi interattivi con alberi decisionali.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span>Processo salvato da: <strong>Mario Rossi (34 anni anzianità)</strong></span>
        </div>
      </div>

      {/* Featured Active Runbook Card */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
              Manuale Operativo Interattivo
            </span>
            <h2 className="text-xl font-bold text-white">
              Chiusura Mensile Partite & Riconciliazione Fiscale su AS/400
            </h2>
            <p className="text-xs text-slate-400">
              Generato automaticamente dall'osservazione passiva dello schermo di Mario Rossi prima della pensione.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">3 passaggi chiave</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-xs text-emerald-400 font-semibold">2 alberi decisionali d'errore</span>
          </div>
        </div>

        {/* Step Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {steps.map((st) => (
            <button
              key={st.stepNumber}
              onClick={() => setActiveStep(st.stepNumber)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                activeStep === st.stepNumber
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-slate-900/60 flex items-center justify-center font-mono text-[11px]">
                {st.stepNumber}
              </span>
              <span>{st.title.split('&')[0]}</span>
            </button>
          ))}
        </div>

        {/* Active Step Deep Detail */}
        {(() => {
          const current = steps.find((s) => s.stepNumber === activeStep) || steps[0];
          return (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Instructions and Decision Tree (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Sistema Coinvolto: <strong>{current.system}</strong></span>
                    <span className="font-mono text-amber-400">Step {current.stepNumber} di 3</span>
                  </div>
                  <h3 className="text-base font-bold text-white leading-snug">
                    {current.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
                    {current.instruction}
                  </p>
                </div>

                {/* Decision Tree Branch Callout */}
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wide">
                      <GitFork className="w-3.5 h-3.5" />
                      <span>Albero Decisionale: Se compare errore</span>
                    </span>
                    <button
                      onClick={() => setShowErrorBranch(!showErrorBranch)}
                      className="text-[11px] text-amber-300 hover:underline cursor-pointer"
                    >
                      {showErrorBranch ? 'Nascondi' : 'Espandi Ramo'}
                    </button>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-mono">
                    {current.branchRule}
                  </p>
                </div>
              </div>

              {/* Right Column: Simulated Screen & New Hire Interactive Practice (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Cattura Schermo Esatta</span>
                  </span>
                  <span className="text-emerald-400 font-mono text-[10px]">Verificato</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400 whitespace-pre-wrap leading-relaxed shadow-inner">
                  {current.screenPreview}
                </div>

                {/* Interactive Simulator for New Hires */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wide">
                    <GraduationCap className="w-4 h-4" />
                    <span>Simulatore Pratico per Neoassunti</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Mettiti alla prova senza toccare il database reale di produzione.
                  </p>

                  <button
                    onClick={handleSimulatorClick}
                    className="w-full py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Simula Clic e Verifica Passaggio</span>
                  </button>

                  {simulatorSuccess && (
                    <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-xs text-emerald-300 flex items-center gap-2 animate-fadeIn">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Ottimo! Sequenza corretta appresa al 100%.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};
