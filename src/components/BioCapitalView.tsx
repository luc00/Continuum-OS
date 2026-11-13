import React, { useState } from 'react';
import { DepartmentBioCapital } from '../types';
import { initialDepartmentBioCapital } from '../data/mockDataAdditions';
import { computeBioCapitalROI } from '../utils/enterpriseAdditions';
import {
  HeartPulse,
  Activity,
  BatteryCharging,
  ShieldCheck,
  CheckCircle2,
  ArrowRightLeft,
  Clock,
  Sparkles,
  AlertTriangle,
  Zap,
  TrendingUp,
} from 'lucide-react';

export const BioCapitalView: React.FC = () => {
  const [departments, setDepartments] = useState<DepartmentBioCapital[]>(initialDepartmentBioCapital);
  const [isRebalanced, setIsRebalanced] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const stats = computeBioCapitalROI(departments);

  const handleApplyRebalance = () => {
    setIsRebalanced(true);
    setDepartments((prev) =>
      prev.map((d) => {
        if (d.id === 'd-sales') {
          return {
            ...d,
            recoveryScore: 58,
            strainWorkloadRatio: 1.08,
            chronicFatigueRisk: 'moderate',
            projectedNextWeekHours: 44,
            rebalancedSchedule: d.rebalancedSchedule
              ? { ...d.rebalancedSchedule, status: 'auto_applied' }
              : undefined,
          };
        }
        if (d.id === 'd-cs') {
          return {
            ...d,
            strainWorkloadRatio: 1.12,
            projectedNextWeekHours: 40,
          };
        }
        return d;
      })
    );
    setToastMessage(
      'Carico cognitivo riequilibrato con successo! 16 task ad alto attrito trasferiti a Customer Success. 48 ore di recupero protette.'
    );
    setTimeout(() => setToastMessage(null), 4500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 uppercase tracking-wider mb-1">
            <HeartPulse className="w-4 h-4" />
            <span>BioCapital Optimizer</span>
            <span aria-hidden="true">·</span>
            <span>Gestione del ROI Energetico & Mentale del Team</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            La Lucidità Mentale è il Vero Capitale Aziendale
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Monitora in modo anonimo e aggregato l'equilibrio tra sforzo e recupero tramite wearable. Se rileva che un reparto è in stanchezza cronica (under-recovery), riequilibra automaticamente i carichi sui team più freschi per proteggere la produttività dal logoramento silenzioso.
          </p>
        </div>

        {/* Global Bio-Recovery Index */}
        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl p-3 shrink-0">
          <div className="w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 font-bold text-lg">
            {stats.averageRecoveryScore}%
          </div>
          <div>
            <div className="text-xs text-slate-400">Recovery Score Aziendale</div>
            <div className="text-sm font-semibold text-white">
              {isRebalanced ? 'Equilibrio Biologico Ripristinato' : '1 Reparto in Under-Recovery Critica'}
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Ore di Recupero Protette</span>
            <BatteryCharging className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="text-2xl font-bold text-white tabular-nums">
            {isRebalanced ? '48' : '0'} <span className="text-sm font-normal text-slate-400">ore</span>
          </div>
          <div className="text-xs text-rose-300 mt-1">
            {isRebalanced ? 'Fasce protette senza compiti complessi' : 'Sovraccarico cognitivo attivo'}
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Costo Logoramento Evitato</span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400 tabular-nums">
            €{stats.preventedBurnoutCostEstimate.toLocaleString('it-IT')}
          </div>
          <div className="text-xs text-slate-400 mt-1">Prevenzione dimissioni e assenze</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Sensori & Wearable Sincronizzati</span>
            <Activity className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-white tabular-nums">62 / 62</div>
          <div className="text-xs text-indigo-300 mt-1">Dati anonimi aggregati a tutela privacy</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Stato Reparti Attivi</span>
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white tabular-nums">
            {isRebalanced ? '4 su 4' : '3 su 4'}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            {isRebalanced ? 'Tutti i reparti in zona sicura' : 'Vendite in zona critica'}
          </div>
        </div>
      </div>

      {/* Under-Recovery Banner & Rebalancing Call to Action */}
      {!isRebalanced && (
        <div className="bg-gradient-to-r from-rose-950/40 via-slate-900 to-slate-900 border border-rose-500/40 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg shadow-rose-950/20">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>Rilevata Stanchezza Cronica su "Vendite & Business Dev"</span>
                <span className="text-[10px] uppercase font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                  Under-Recovery 38%
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Il team vendite ha accumulato un rapporto sforzo/recupero di 1.62. Il sistema propone di ridistribuire 16 task a basso impatto decisionale sul reparto Customer Success (fresco a recovery 88%), proteggendo 48 ore di sonno e ricarica cognitiva.
              </p>
            </div>
          </div>

          <button
            onClick={handleApplyRebalance}
            className="px-5 py-3 bg-rose-600 hover:bg-rose-500 active:scale-98 text-white text-xs font-bold rounded-xl shadow-lg shadow-rose-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <ArrowRightLeft className="w-4 h-4" />
            <span>Riequilibra Automaticamente i Carichi</span>
          </button>
        </div>
      )}

      {/* Department Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {departments.map((dept) => {
          const isCritical = dept.chronicFatigueRisk === 'critical';
          const isModerate = dept.chronicFatigueRisk === 'moderate';

          return (
            <div
              key={dept.id}
              className={`rounded-2xl border p-5 flex flex-col justify-between space-y-4 transition-all ${
                isCritical
                  ? 'bg-rose-950/20 border-rose-500/50 shadow-md shadow-rose-950/20'
                  : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h2 className="text-base font-bold text-white tracking-tight">{dept.department}</h2>
                    <span className="text-xs text-slate-400 font-mono">{dept.headcount} collaboratori monitorati</span>
                  </div>

                  <div>
                    {isCritical && (
                      <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-lg border border-rose-500/20 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> Stanchezza Cronica
                      </span>
                    )}
                    {isModerate && (
                      <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                        Carico Medio
                      </span>
                    )}
                    {!isCritical && !isModerate && (
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Stato Ottimale
                      </span>
                    )}
                  </div>
                </div>

                {/* Meters */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/60">
                    <span className="text-slate-400 block mb-1">Recovery Score (Wearable)</span>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            dept.recoveryScore < 50
                              ? 'bg-rose-500'
                              : dept.recoveryScore < 70
                              ? 'bg-amber-500'
                              : 'bg-emerald-500'
                          }`}
                          style={{ width: `${dept.recoveryScore}%` }}
                        />
                      </div>
                      <span className="font-mono font-bold text-white">{dept.recoveryScore}%</span>
                    </div>
                  </div>

                  <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/60">
                    <span className="text-slate-400 block mb-1">Rapporto Sforzo / Riposo</span>
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-white">{dept.strainWorkloadRatio}x</span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {dept.strainWorkloadRatio > 1.3 ? 'Sbilanciato' : 'Sostenibile'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Rebalanced status if applicable */}
                {dept.rebalancedSchedule && (
                  <div className="mt-3 bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-xs space-y-1">
                    <div className="font-semibold text-rose-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                      <span>Riequilibrio Prossima Settimana:</span>
                    </div>
                    <p className="text-slate-400">
                      Trasferiti {dept.rebalancedSchedule.tasksShiftedCount} task burocratici verso{' '}
                      <strong className="text-slate-200">{dept.rebalancedSchedule.destinationDepartment}</strong>.
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                <span>Ore Lavorative Previste: {dept.projectedNextWeekHours}h</span>
                <span className="text-slate-500 font-mono">Sensori biometrici attivi</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-rose-500/80 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in">
          <HeartPulse className="w-5 h-5 text-rose-400 shrink-0" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
