import React, { useState } from 'react';
import {
  Bot,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  Shield,
  Sliders,
  Check,
  X,
  UserCheck,
  Zap,
} from 'lucide-react';

export const ShadowSelfView: React.FC = () => {
  const [twinStatus, setTwinStatus] = useState<'active' | 'learning'>('active');
  const [resolvedTasks, setResolvedTasks] = useState<number>(42);
  const [pendingApprovals, setPendingApprovals] = useState([
    {
      id: 'app-1',
      title: 'Richiesta Sconto 8% dal Cliente FinTech su Rinnovo Annuale',
      context:
        'Lo ShadowSelf del cliente ha chiesto il 15%. Il tuo ShadowSelf ha negoziato al ribasso fino all\'8% in cambio di pagamento semestrale anticipato. Richiede il tuo OK finale sul margine.',
      impact: '+42.000€ ARR consolidato',
      partner: 'ShadowSelf di Lorenzo Moretti (CFO FinTech)',
    },
    {
      id: 'app-2',
      title: 'Nuovo Fornitore Cloud: Spostamento Server su Regione Francoforte',
      context:
        'Lo ShadowSelf ha vagliato 4 contratti. Questo rispetta la tua linea rossa sul GDPR con risparmio del 22%. Richiede firma autorizzativa.',
      impact: 'Risparmio 1.400€/mese',
      partner: 'ShadowSelf di AWS Enterprise Sales',
    },
  ]);

  const handleApprove = (id: string) => {
    setPendingApprovals((prev) => prev.filter((p) => p.id !== id));
    setResolvedTasks((prev) => prev + 1);
  };

  const autonomousLogs = [
    {
      time: '14:22',
      partner: 'ShadowSelf di Marco Bianchi (Design)',
      action: 'Allineamento orario call',
      detail: 'Rifiutata call mattutina alle 10:00 (protetta per deep work); proposto e concordato sync asincrono su AsyncSync a 0:32.',
      savings: '45 min risparmiati',
    },
    {
      time: '11:05',
      partner: 'ShadowSelf di Sarah Chen (Engineering Lead)',
      action: 'Filtro proposta feature secondaria',
      detail: 'Declinata richiesta di aggiunta campo anagrafica non essenziale per il Q3 secondo le tue linee guida di semplicità UI.',
      savings: '20 min di discussione evitati',
    },
    {
      time: '09:40',
      partner: 'ShadowSelf Fornitore Grafica 3D',
      action: 'Negoziazione deadline asset',
      detail: 'Accettato slittamento consegna di 24h a fronte di uno sconto del 5% applicato sul saldo.',
      savings: '3 scambi di email evitati',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider">
            <span>ShadowSelf Engine</span>
            <span aria-hidden="true">·</span>
            <span>Autonomous Executive Digital Twin</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Il Tuo Gemello Digitale Negoziatore ed Esecutore
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Addestrato sulla tua etica e limiti di budget. Negozia con i gemelli di colleghi e clienti, lasciandoti solo le decisioni strategiche.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-1 bg-slate-900 border border-slate-800 rounded-lg flex items-center text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 ml-2 animate-pulse" />
            <span className="text-slate-200 font-semibold pr-2">Twin Autonomo Attivo</span>
          </div>
        </div>
      </div>

      {/* End of Day Executive Summary Hero Card */}
      <section className="rounded-2xl border border-purple-900/40 bg-gradient-to-r from-slate-900 via-purple-950/20 to-slate-900 p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-wider">
              <Bot className="w-4 h-4" />
              <span>Riepilogo Serale del Gemello Digitale</span>
            </div>
            <h2 className="text-2xl font-bold text-white">
              "Ho gestito {resolvedTasks} interazioni oggi in totale autonomia."
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Ecco le uniche {pendingApprovals.length} decisioni strategiche che richiedono davvero il tuo cervello umano.
            </p>
          </div>

          <div className="text-right text-xs text-slate-400 font-mono">
            <span className="block text-2xl font-bold text-purple-400 tabular-nums">
              3.8 ore
            </span>
            <span>Tempo umano protetto oggi</span>
          </div>
        </div>

        {/* The 2 Strategic Escalation Decisions */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            Decisioni Strategiche in Attesa della Tua Firma ({pendingApprovals.length})
          </span>

          {pendingApprovals.length === 0 ? (
            <div className="p-6 rounded-xl bg-slate-950/60 border border-emerald-900/40 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <p className="text-sm font-bold text-white">Tutte le decisioni strategiche completate!</p>
              <p className="text-xs text-slate-400">La tua giornata lavorativa è chiusa senza alcun debito decisionale pendente.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingApprovals.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 max-w-2xl text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">{item.title}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="text-emerald-400 font-mono font-semibold">{item.impact}</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed font-medium">
                      {item.context}
                    </p>
                    <span className="text-[11px] text-slate-500 block">
                      Negoziato con: {item.partner}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleApprove(item.id)}
                      className="px-4 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm shadow-purple-600/30"
                    >
                      <Check className="w-4 h-4" />
                      <span>Firma & Approva</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Autonomous Interactions Audit Trail */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-bold text-white">
              Log Interazioni Autonome Twin-to-Twin (Senza disturbarti)
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">3 su 42 visualizzate</span>
        </div>

        <div className="space-y-3">
          {autonomousLogs.map((log, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-slate-400 text-[11px]">{log.time}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="font-bold text-slate-200">{log.action}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-purple-400 text-[11px]">{log.partner}</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">{log.detail}</p>
              </div>

              <span className="text-emerald-400 font-mono text-[11px] font-semibold shrink-0">
                {log.savings}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
