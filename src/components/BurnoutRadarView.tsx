import React, { useState } from 'react';
import { DepartmentBurnoutMetric } from '../types';
import {
  Flame,
  ShieldCheck,
  AlertTriangle,
  HeartPulse,
  Clock,
  Calendar,
  Zap,
  CheckCircle2,
  Users,
  Activity,
} from 'lucide-react';

const initialDepartments: DepartmentBurnoutMetric[] = [
  {
    id: 'dept-1',
    department: 'Product Design & UI',
    headcount: 8,
    riskLevel: 'critical',
    fatigueScore: 78,
    afterHoursCommPct: 44,
    deepWorkHoursAvg: 2.5,
    calendarFragmentationPct: 82,
    contextSwitchesPerHour: 11,
    actionRecommendation: 'Il team Design ha avuto il 40% di riunioni in più questa settimana e zero blocchi di lavoro profondo: suggerisci di cancellare i sync di venerdì e bloccare le notifiche Slack dopo le 18:30.',
  },
  {
    id: 'dept-2',
    department: 'Full-Stack Engineering',
    headcount: 14,
    riskLevel: 'warning',
    fatigueScore: 54,
    afterHoursCommPct: 22,
    deepWorkHoursAvg: 6.0,
    calendarFragmentationPct: 56,
    contextSwitchesPerHour: 7,
    actionRecommendation: 'Picco di review PR notturne rilevato il martedì sera. Suggerisci di raggruppare i merge standup prima delle 16:00.',
  },
  {
    id: 'dept-3',
    department: 'Customer Success & Support',
    headcount: 10,
    riskLevel: 'healthy',
    fatigueScore: 24,
    afterHoursCommPct: 6,
    deepWorkHoursAvg: 12.0,
    calendarFragmentationPct: 28,
    contextSwitchesPerHour: 4,
    actionRecommendation: 'Carico operativo ottimale. Latenza di risposta regolare durante l\'orario lavorativo.',
  },
  {
    id: 'dept-4',
    department: 'Legal & Compliance',
    headcount: 4,
    riskLevel: 'healthy',
    fatigueScore: 18,
    afterHoursCommPct: 4,
    deepWorkHoursAvg: 16.5,
    calendarFragmentationPct: 20,
    contextSwitchesPerHour: 3,
    actionRecommendation: 'Blocchi di lavoro profondo stabili con orario di stacco serale rispettato al 96%.',
  },
];

export const BurnoutRadarView: React.FC = () => {
  const [departments, setDepartments] = useState<DepartmentBurnoutMetric[]>(initialDepartments);
  const [selectedDeptId, setSelectedDeptId] = useState<string>('dept-1');
  const [interventionApplied, setInterventionApplied] = useState<boolean>(false);

  const selectedDept = departments.find((d) => d.id === selectedDeptId) || departments[0];

  const handleApplyIntervention = () => {
    setInterventionApplied(true);
    setTimeout(() => {
      setDepartments((prev) =>
        prev.map((d) =>
          d.id === selectedDept.id
            ? {
                ...d,
                riskLevel: 'warning',
                fatigueScore: 48,
                actionRecommendation: 'Intervento preventivo applicato: No-Meeting Friday attivato a calendario!',
              }
            : d
        )
      );
      setInterventionApplied(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 uppercase tracking-wider">
            <span>BurnoutRadar</span>
            <span aria-hidden="true">·</span>
            <span>Predictive Cognitive Load Thermometer</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Termometro Predittivo del Carico Cognitivo dei Team
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Analizza i pattern di sovraccarico dai metadati (orari email, cambi contesto, frammentazione calendario) a totale tutela della privacy.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Zero lettura testi · 100% rispetto della privacy</span>
        </div>
      </div>

      {/* Department Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {departments.map((dept) => {
          const isSelected = dept.id === selectedDept.id;
          const isCritical = dept.riskLevel === 'critical';
          const isWarning = dept.riskLevel === 'warning';

          return (
            <button
              key={dept.id}
              onClick={() => setSelectedDeptId(dept.id)}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer space-y-3 ${
                isSelected
                  ? 'bg-slate-900 border-rose-500/60 shadow-lg shadow-rose-500/10'
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">
                  {dept.headcount} persone
                </span>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                    isCritical
                      ? 'bg-rose-950/60 text-rose-400 border-rose-800/60'
                      : isWarning
                      ? 'bg-amber-950/60 text-amber-400 border-amber-800/60'
                      : 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60'
                  }`}
                >
                  {isCritical ? 'Rischio Alto' : isWarning ? 'Attenzione' : 'Nominale'}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white truncate">
                  {dept.department}
                </h3>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-extrabold font-mono text-white">
                    {dept.fatigueScore}
                  </span>
                  <span className="text-[10px] text-slate-500">/ 100 fatica</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isCritical ? 'bg-rose-500' : isWarning ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${dept.fatigueScore}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Deep Diagnostic for Selected Department */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                Diagnostica Dettagliata: {selectedDept.department}
              </h2>
              <span className="text-xs text-slate-400">
                Pattern comportamentali aggregati rilevati negli ultimi 7 giorni
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-rose-400 animate-pulse" />
            <span className="text-xs font-mono font-bold text-slate-300">
              Indice di Saturazione Cognitiva: {selectedDept.fatigueScore}%
            </span>
          </div>
        </div>

        {/* 4 Metadata Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-400 block uppercase tracking-wider font-semibold">
              Email & Chat Fuori Orario
            </span>
            <span className="text-xl font-bold text-rose-400 font-mono">
              +{selectedDept.afterHoursCommPct}%
            </span>
            <span className="text-[10px] text-slate-500 block">
              Invii tra le 19:00 e le 07:30
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-400 block uppercase tracking-wider font-semibold">
              Lavoro Profondo Residuo
            </span>
            <span className="text-xl font-bold text-amber-400 font-mono">
              {selectedDept.deepWorkHoursAvg}h / sett
            </span>
            <span className="text-[10px] text-slate-500 block">
              Soglia minima vitale: 10 ore
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-400 block uppercase tracking-wider font-semibold">
              Frammentazione Calendario
            </span>
            <span className="text-xl font-bold text-rose-400 font-mono">
              {selectedDept.calendarFragmentationPct}%
            </span>
            <span className="text-[10px] text-slate-500 block">
              Slot isolati da 30 min tra meeting
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-400 block uppercase tracking-wider font-semibold">
              Cambi di Contesto all'Ora
            </span>
            <span className="text-xl font-bold text-white font-mono">
              {selectedDept.contextSwitchesPerHour} switch/h
            </span>
            <span className="text-[10px] text-slate-500 block">
              Switch continui tra Figma, Slack e IDE
            </span>
          </div>
        </div>

        {/* Prescriptive Action Intervention */}
        <div className="p-5 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-300 uppercase tracking-wide">
            <Zap className="w-4 h-4 text-rose-400" />
            <span>Intervento Preventivo Consigliato per i Manager</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
            "{selectedDept.actionRecommendation}"
          </p>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              Impatto stimato: -24% fatica cumulativa entro martedì prossimo
            </span>

            <button
              onClick={handleApplyIntervention}
              disabled={interventionApplied}
              className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 active:scale-98 rounded-lg shadow-md shadow-rose-600/30 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{interventionApplied ? 'Applicazione in corso...' : 'Applica "No-Meeting Friday"'}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
