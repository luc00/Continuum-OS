import React, { useState } from 'react';
import { NexusGovRegulation } from '../types';
import { initialRegulations } from '../data/mockDataAdditions';
import { calculateComplianceHealth } from '../utils/enterpriseAdditions';
import {
  Scale,
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
  AlertTriangle,
  Building2,
  Clock,
  Sparkles,
  ExternalLink,
  Search,
  Filter,
  FileText,
  Users,
} from 'lucide-react';

export const NexusGovView: React.FC = () => {
  const [regulations, setRegulations] = useState<NexusGovRegulation[]>(initialRegulations);
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [signingId, setSigningId] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const stats = calculateComplianceHealth(regulations);

  const handleSignComplianceBlock = (id: string, title: string) => {
    setSigningId(id);
    setTimeout(() => {
      setRegulations((prev) =>
        prev.map((reg) =>
          reg.id === id
            ? { ...reg, complianceBlockSigned: true, status: 'proactively_applied' }
            : reg
        )
      );
      setSigningId(null);
      setSuccessToast(`Blocco di conformità per "${title.slice(0, 32)}..." firmato e contratti aggiornati!`);
      setTimeout(() => setSuccessToast(null), 4500);
    }, 1200);
  };

  const filteredRegulations = regulations.filter((reg) => {
    const matchesSector = selectedSector === 'all' || reg.sector.toLowerCase().includes(selectedSector.toLowerCase());
    const matchesSearch =
      reg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.impactSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.sector.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSector && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
            <Scale className="w-4 h-4" />
            <span>NexusGov Operating System</span>
            <span aria-hidden="true">·</span>
            <span>Conformità Normativa & Fiscale Predittiva</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Il Sistema Che Anticipa la Legge e Blinda i Contratti
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Collegato direttamente ai flussi di fatturazione ed ERP. Non si limita a segnalare scadenze, ma agisce in anticipo: modifica i template contrattuali, verifica i fornitori e propone la firma a un clic.
          </p>
        </div>

        {/* Global Compliance Health Badge */}
        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl p-3 shrink-0">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-lg">
            {stats.overallScore}%
          </div>
          <div>
            <div className="text-xs text-slate-400">Indice Conformità Globale</div>
            <div className="text-sm font-semibold text-white">
              {stats.pendingActions === 0 ? 'Conformità 100% Blindata' : `${stats.pendingActions} Azioni Preventive Pronte`}
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Prossima Scadenza Cogente</span>
            <Clock className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white tabular-nums">
            {stats.daysToNextDeadline} <span className="text-sm font-normal text-slate-400">giorni</span>
          </div>
          <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Contratti già pre-adeguati
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Fornitori Verificati alla Cieca</span>
            <Building2 className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-white tabular-nums">14 / 14</div>
          <div className="text-xs text-indigo-300 mt-1">Conformi a ViDA & GDPR v3</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Risparmio Sanzioni Stimato</span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white tabular-nums">€185.000</div>
          <div className="text-xs text-slate-400 mt-1">Rischio sanzioni azzerato</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Agevolazioni Transizione 5.0</span>
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-cyan-300 tabular-nums">€142.000</div>
          <div className="text-xs text-slate-400 mt-1">Dossier perizia già asseverato</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/50 p-3 rounded-xl border border-slate-800/80">
        <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedSector('all')}
            className={`px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-colors whitespace-nowrap ${
              selectedSector === 'all'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Tutti i Settori ({regulations.length})
          </button>
          <button
            onClick={() => setSelectedSector('fiscale')}
            className={`px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-colors whitespace-nowrap ${
              selectedSector === 'fiscale'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Fiscale & ViDA
          </button>
          <button
            onClick={() => setSelectedSector('privacy')}
            className={`px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-colors whitespace-nowrap ${
              selectedSector === 'privacy'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Privacy & GDPR
          </button>
          <button
            onClick={() => setSelectedSector('sicurezza')}
            className={`px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-colors whitespace-nowrap ${
              selectedSector === 'sicurezza'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Sicurezza Lavoro
          </button>
          <button
            onClick={() => setSelectedSector('bandi')}
            className={`px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-colors whitespace-nowrap ${
              selectedSector === 'bandi'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Bandi 5.0
          </button>
        </div>

        <div className="relative min-w-[220px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cerca normativa, articolo o fornitore..."
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Regulation List Cards */}
      <div className="space-y-4">
        {filteredRegulations.map((reg) => {
          const isSigned = reg.complianceBlockSigned;
          const isSigning = signingId === reg.id;

          return (
            <div
              key={reg.id}
              className={`rounded-2xl border p-5 sm:p-6 transition-all ${
                isSigned
                  ? 'bg-slate-900/40 border-slate-800/80'
                  : 'bg-gradient-to-r from-slate-900/90 to-emerald-950/20 border-emerald-500/40 shadow-lg shadow-emerald-950/20'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                      {reg.sector}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px] bg-slate-800/60 px-2 py-0.5 rounded">
                      {reg.jurisdiction}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">
                      {reg.autoActions.regulatoryArticle}
                    </span>
                    <span className="text-slate-400">·</span>
                    <span className="text-amber-400 font-medium">
                      In vigore tra {reg.daysRemaining} giorni ({reg.effectiveDate})
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-white tracking-tight">{reg.title}</h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{reg.impactSummary}</p>

                  {/* Proactive Action Box */}
                  <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-2 mt-3">
                    <div className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Azione Automatica Preventiva Eseguita da NexusGov:</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300 pt-1">
                      <div className="flex items-start gap-2 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/60">
                        <FileText className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-white block">Template Contratti Aggiornato</span>
                          <span className="text-slate-400">{reg.autoActions.contractTemplateModified}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/60">
                        <Building2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-white block">Audit Fornitori Automatico</span>
                          <span className="text-slate-400">
                            {reg.autoActions.compliantSuppliersCount} fornitori su {reg.autoActions.auditedSuppliersCount} già verificati conformi al 100%.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action CTA */}
                <div className="lg:w-64 flex flex-col justify-between shrink-0 space-y-3 pt-2 lg:pt-0">
                  {isSigned ? (
                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-center space-y-1">
                      <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Blocco Sigillato & Conforme</span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Contratti distribuiti e firmati digitalmente. Nessuna azione manuale necessaria.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <button
                        onClick={() => handleSignComplianceBlock(reg.id, reg.title)}
                        disabled={isSigning}
                        className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        <FileCheck2 className="w-4 h-4" />
                        <span>{isSigning ? 'Firma Digitale in Corso...' : 'Firma Blocco di Conformità'}</span>
                      </button>
                      <p className="text-[10px] text-slate-400 text-center leading-tight">
                        Applica automaticamente le modifiche a 3 contratti e notifica i fornitori collegati.
                      </p>
                    </div>
                  )}

                  <div className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1 font-mono">
                    <ShieldCheck className="w-3 h-3 text-slate-400" /> Audit trail crittografato
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Toast Notification */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-emerald-500/80 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-medium">{successToast}</span>
        </div>
      )}
    </div>
  );
};
