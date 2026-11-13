import React, { useState } from 'react';
import {
  Clock,
  Heart,
  Activity,
  Zap,
  CheckCircle2,
  Calendar,
  Shield,
  Coffee,
  BellOff,
  Sliders,
} from 'lucide-react';

export const ChronoSculptorView: React.FC = () => {
  const [chronoMode, setChronoMode] = useState<'hyper_focus' | 'post_prandial'>('hyper_focus');

  const biometricData = {
    hyper_focus: {
      sleepQuality: 92,
      typingRhythm: '108 WPM (Stato di Flow Ottimale)',
      vocalStress: '9% (Rilassato & Centrato)',
      cognitivePeak: 'Picco Mattutino Rilevato (09:00 - 12:30)',
      schedule: [
        {
          time: '09:00 - 12:30',
          type: 'peak_focus',
          title: 'Blocco Iper-Focus Creativo: Architettura Core & Codice',
          status: 'Notifiche mute · 2 riunioni burocratiche spostate al pomeriggio',
        },
        {
          time: '12:30 - 13:30',
          type: 'rest',
          title: 'Pausa Metabolica & Passeggiata Decognitiva',
          status: 'Consigliata disconnessione dagli schermi',
        },
        {
          time: '13:30 - 15:30',
          type: 'execution',
          title: 'Esecuzione Asincrona & Review Documenti',
          status: 'Lavoro lineare ad attrito zero',
        },
        {
          time: '15:30 - 17:00',
          type: 'admin',
          title: 'Finestra Allineamenti Burocratici & Sync Clienti',
          status: 'Call con Marco e fornitore spostate qui con scusa diplomatica automatica',
        },
      ],
    },
    post_prandial: {
      sleepQuality: 74,
      typingRhythm: '58 WPM (Frequenza pause anomala)',
      vocalStress: '24% (Fatica visiva moderata)',
      cognitivePeak: 'Calo Fisiologico Post-Prandiale Rilevato',
      schedule: [
        {
          time: '13:30 - 14:15',
          type: 'rest',
          title: 'Micro-Pausa Cognitiva & Caffè Idratante',
          status: 'Nessun task concettuale ad alta complessità',
        },
        {
          time: '14:15 - 16:00',
          type: 'admin',
          title: 'Risposta Email & Smistamento Ticket a Basso Carico Mentale',
          status: 'Attività a basso sforzo cognitivo',
        },
        {
          time: '16:00 - 17:30',
          type: 'execution',
          title: 'Rientro in Concentrazione: Review Codice Leggero',
          status: 'Ripresa del ritmo ottimale',
        },
      ],
    },
  };

  const currentData = biometricData[chronoMode];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 uppercase tracking-wider">
            <span>ChronoSculptor Engine</span>
            <span aria-hidden="true">·</span>
            <span>Biological & Cognitive Rhythm Director</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Il Regista del Tuo Ritmo Biologico e Cognitivo
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            I calendari tradizionali trattano tutte le ore allo stesso modo. ChronoSculptor riorganizza la tua giornata in base a sonno e lucidità reale.
          </p>
        </div>

        {/* State Toggle for Demonstration */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
          <button
            onClick={() => setChronoMode('hyper_focus')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              chronoMode === 'hyper_focus'
                ? 'bg-rose-600 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Iper-Focus Creativo
          </button>
          <button
            onClick={() => setChronoMode('post_prandial')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
              chronoMode === 'post_prandial'
                ? 'bg-rose-600 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Calo Pomeridiano
          </button>
        </div>
      </div>

      {/* Biometric Telemetry Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-semibold uppercase tracking-wider">
              Smartwatch Sleep Score
            </span>
            <Heart className="w-4 h-4 text-rose-400" />
          </div>
          <span className="text-2xl font-extrabold font-mono text-white">
            {currentData.sleepQuality}/100
          </span>
          <span className="text-[10px] text-emerald-400 block font-medium">
            Sonno profondo ottimale
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-semibold uppercase tracking-wider">
              Ritmo di Battitura Cursore
            </span>
            <Activity className="w-4 h-4 text-indigo-400" />
          </div>
          <span className="text-sm font-bold font-mono text-white">
            {currentData.typingRhythm}
          </span>
          <span className="text-[10px] text-slate-500 block">
            Cadenza e velocità tastiera
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-semibold uppercase tracking-wider">
              Indice di Stress Vocale
            </span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-2xl font-extrabold font-mono text-emerald-400">
            {currentData.vocalStress}
          </span>
          <span className="text-[10px] text-slate-500 block">
            Analisi micro-tremore voce
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-semibold uppercase tracking-wider">
              Stato Cognitivo Corrente
            </span>
            <BellOff className="w-4 h-4 text-purple-400" />
          </div>
          <span className="text-sm font-bold text-slate-200">
            {currentData.cognitivePeak}
          </span>
          <span className="text-[10px] text-purple-300 block">
            Scudo notifiche attivo
          </span>
        </div>
      </div>

      {/* Dynamic Schedule Engine */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-rose-400" />
            <h2 className="text-base font-bold text-white">
              Agenda Dinamica Scolpita in Tempo Reale
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Riorganizzazione Automatica Intelligente
          </span>
        </div>

        <div className="space-y-3">
          {currentData.schedule.map((slot, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border text-xs flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                slot.type === 'peak_focus'
                  ? 'bg-rose-950/20 border-rose-900/40 shadow-sm'
                  : slot.type === 'admin'
                  ? 'bg-slate-950 border-slate-800'
                  : 'bg-slate-900/40 border-slate-800/80'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-white">{slot.time}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span
                    className={`font-semibold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded ${
                      slot.type === 'peak_focus'
                        ? 'bg-rose-500/20 text-rose-300'
                        : slot.type === 'rest'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {slot.type === 'peak_focus' ? 'Massima Lucifità' : slot.type === 'rest' ? 'Ricarica' : 'Burocrazia'}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-100">{slot.title}</h3>
                <p className="text-slate-400">{slot.status}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {slot.type === 'peak_focus' && (
                  <span className="text-rose-400 font-semibold text-[11px] flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5" />
                    <span>Scudo Anti-Distrazione</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
