import React, { useState } from 'react';
import { DesktopAppSession, MorningBriefingData } from '../types';
import {
  calculateWarmupReduction,
  calculateReadinessScore,
} from '../utils/contextEngine';
import {
  Code2,
  Figma,
  MessageSquare,
  FileText,
  Clock,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  Eye,
  GitBranch,
  Terminal,
  Send,
  SlidersHorizontal,
} from 'lucide-react';

interface ContextFlowViewProps {
  sessions: DesktopAppSession[];
  briefing: MorningBriefingData;
  onRestoreDesk: () => void;
  isRestoring: boolean;
  avatarMarco: string;
}

export const ContextFlowView: React.FC<ContextFlowViewProps> = ({
  sessions,
  briefing: initialBriefing,
  onRestoreDesk,
  isRestoring,
  avatarMarco,
}) => {
  const [briefing, setBriefing] = useState<MorningBriefingData>(initialBriefing);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState<string>(sessions[0]?.id || 's1');
  const [marcoPingSent, setMarcoPingSent] = useState(false);
  const [activePreset, setActivePreset] = useState<'monday' | 'midweek' | 'release'>('monday');

  const selectedSession = sessions.find((s) => s.id === selectedSessionId) || sessions[0];

  const getAppIcon = (category: DesktopAppSession['category']) => {
    switch (category) {
      case 'IDE':
        return Code2;
      case 'Design':
        return Figma;
      case 'Chat':
        return MessageSquare;
      case 'Docs':
        return FileText;
      default:
        return Terminal;
    }
  };

  const handleRefreshBriefing = async () => {
    setIsAiLoading(true);
    try {
      const res = await fetch('/api/gemini/briefing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          openFiles: sessions.map((s) => s.activeItem),
          blockers: ['Marco Bianchi su Figma Frame 4'],
          recentActivities: ['Modifica auth.service.ts riga 142'],
        }),
      });
      const data = await res.json();
      if (data.success && data.result) {
        setBriefing(data.result);
      }
    } catch (err) {
      console.warn('Briefing update failed:', err);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handlePingMarco = () => {
    setMarcoPingSent(true);
    setTimeout(() => setMarcoPingSent(false), 4000);
  };

  const readinessScore = calculateReadinessScore(
    [
      {
        id: '1',
        filename: 'auth.service.ts',
        filepath: 'src/services/auth.service.ts',
        cursorLine: 142,
        totalLines: 320,
        unstagedChanges: 4,
        app: 'vscode',
        lastEditedMinutesAgo: 60,
      },
    ],
    [
      {
        id: 'b1',
        source: 'Figma',
        person: 'Marco Bianchi',
        avatar: avatarMarco,
        waitingOn: 'Approvazione Frame 4',
        ageHours: 16,
        severity: 'high',
      },
    ]
  );

  const warmupSaved = calculateWarmupReduction(
    [
      {
        id: '1',
        filename: 'auth.service.ts',
        filepath: 'src/services/auth.service.ts',
        cursorLine: 142,
        totalLines: 320,
        unstagedChanges: 4,
        app: 'vscode',
        lastEditedMinutesAgo: 60,
      },
      {
        id: '2',
        filename: 'CheckoutModal.tsx',
        filepath: 'src/components/CheckoutModal.tsx',
        cursorLine: 88,
        totalLines: 190,
        unstagedChanges: 2,
        app: 'vscode',
        lastEditedMinutesAgo: 90,
      },
    ],
    [
      {
        id: 'b1',
        source: 'Figma',
        person: 'Marco Bianchi',
        avatar: avatarMarco,
        waitingOn: 'Frame 4',
        ageHours: 16,
        severity: 'high',
      },
    ]
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      {/* Header Bar with Mode Selector & Readiness Metric */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
            <span>ContextFlow Engine</span>
            <span aria-hidden="true">·</span>
            <span>Zero-Warmup Work Continuity</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            La Tua Scrivania Digitale Contestuale
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Ricostruzione automatica dello stato mentale esatto: dove eri arrivato prima dell'interruzione.
          </p>
        </div>

        {/* Preset Selector & Readiness Gauge */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="p-1 bg-slate-900 border border-slate-800 rounded-lg flex items-center gap-1">
            <button
              onClick={() => setActivePreset('monday')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activePreset === 'monday'
                  ? 'bg-slate-800 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Lunedì Mattina (Post-Weekend)
            </button>
            <button
              onClick={() => setActivePreset('midweek')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activePreset === 'midweek'
                  ? 'bg-slate-800 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Rientro Pausa Pranzo
            </button>
            <button
              onClick={() => setActivePreset('release')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activePreset === 'release'
                  ? 'bg-slate-800 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Sprint Release Mode
            </button>
          </div>

          <div className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block uppercase tracking-wider">
                Readiness Score
              </span>
              <span className="text-base font-bold text-emerald-400 tabular-nums">
                {readinessScore}%
              </span>
            </div>
            <div className="w-9 h-9 rounded-full bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Zap className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Cognitive Morning Briefing Card (The core AI reconstruction) */}
      <section className="rounded-xl border border-indigo-900/40 bg-gradient-to-r from-slate-900 via-indigo-950/20 to-slate-900 p-6 shadow-xl relative overflow-hidden">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-4 max-w-4xl">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wide">
                Briefing di Continuità Istantanea
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-xs text-slate-400">Aggiornato alle 08:30</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {briefing.greeting}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-1.5">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Dov'eri arrivato ieri
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {briefing.activeTask}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-950/60 border border-amber-900/30 space-y-1.5">
                <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block">
                  Cosa manca / Blocco pendente
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {briefing.waitingOn}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-950/60 border border-indigo-900/40 space-y-1.5">
                <span className="text-[11px] font-semibold text-indigo-300 uppercase tracking-wider block">
                  Primo passo consigliato (3 min)
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {briefing.immediateNextStep}
                </p>
              </div>
            </div>
          </div>

          <div className="hidden sm:flex flex-col items-end gap-3 shrink-0">
            <button
              onClick={handleRefreshBriefing}
              disabled={isAiLoading}
              className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 flex items-center gap-1.5 cursor-pointer disabled:opacity-60 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isAiLoading ? 'animate-spin' : ''}`} />
              <span>{isAiLoading ? 'Sintesi...' : 'Rianalizza IA'}</span>
            </button>

            <div className="text-right text-xs text-slate-400">
              <span className="block font-semibold text-indigo-300 tabular-nums">
                {warmupSaved} min risparmiati
              </span>
              <span>Tempo warmup azzerato</span>
            </div>
          </div>
        </div>

        {/* Restore All CTA */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              4 applicazioni tracciate: <strong>VS Code</strong> (riga 142),{' '}
              <strong>Figma</strong> (Frame 4), <strong>Slack</strong> (#proj-phoenix),{' '}
              <strong>Notion</strong> (PRD v2).
            </span>
          </div>

          <button
            onClick={onRestoreDesk}
            disabled={isRestoring}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 active:scale-98 rounded-lg shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            <Zap className={`w-4 h-4 ${isRestoring ? 'animate-spin' : ''}`} />
            <span>
              {isRestoring
                ? 'Ripristino cursore & finestre in corso...'
                : 'Ripristina Scrivania al 100%'}
            </span>
          </button>
        </div>
      </section>

      {/* Main Digital Desk Layout: Left Cross-App Sessions List, Right Focus Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Apps in Session (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-slate-400" />
              <span>Applicazioni & File Connessi</span>
            </h3>
            <span className="text-xs text-slate-400">
              Seleziona una scheda per ispezionare il contesto salvato
            </span>
          </div>

          <div className="space-y-3">
            {sessions.map((session) => {
              const Icon = getAppIcon(session.category);
              const isSelected = session.id === selectedSession.id;

              return (
                <div
                  key={session.id}
                  onClick={() => setSelectedSessionId(session.id)}
                  className={`p-4 rounded-xl border transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-indigo-500/60 shadow-lg shadow-indigo-500/10'
                      : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border ${
                          isSelected
                            ? 'bg-indigo-600/20 border-indigo-500/40 text-indigo-300'
                            : 'bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                            {session.name}
                          </span>
                          <span aria-hidden="true" className="text-slate-600">·</span>
                          <span className="text-xs text-indigo-400 font-mono">
                            {session.cursorOrLocation}
                          </span>
                        </div>

                        <h4 className="text-sm font-semibold text-white">
                          {session.activeItem}
                        </h4>

                        <p className="text-xs text-slate-400 leading-normal">
                          {session.subDetail}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      {session.status === 'active' && (
                        <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded">
                          In Lavorazione
                        </span>
                      )}
                      {session.status === 'pending_review' && (
                        <span className="text-[11px] font-semibold text-amber-400 bg-amber-950/40 border border-amber-800/40 px-2 py-0.5 rounded">
                          Attesa Feedback
                        </span>
                      )}
                      {session.status === 'idle' && (
                        <span className="text-[11px] font-semibold text-slate-400 bg-slate-800/40 border border-slate-700 px-2 py-0.5 rounded">
                          Sincronizzato
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pending Blocker Alert Banner with direct ping action */}
          <div className="rounded-xl border border-amber-900/40 bg-amber-950/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={avatarMarco}
                alt="Marco Bianchi"
                className="w-10 h-10 rounded-full object-cover border border-amber-500/40 shrink-0"
              />
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Blocco Critico: In attesa di Marco Bianchi</span>
                </div>
                <p className="text-xs text-slate-300">
                  Figma Checkout 2.0 (Frame 4) · Non puoi committare il CSS prima dell'approvazione token.
                </p>
              </div>
            </div>

            <button
              onClick={handlePingMarco}
              disabled={marcoPingSent}
              className="px-3.5 py-1.5 text-xs font-semibold text-amber-200 bg-amber-900/60 hover:bg-amber-900 border border-amber-700/60 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-70 whitespace-nowrap shrink-0"
            >
              {marcoPingSent ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Sollecito Inviato su Slack!</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Sollecita Marco su Slack</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Deep Focus Inspector (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Eye className="w-4 h-4 text-slate-400" />
              <span>Dettaglio Contesto Aperto</span>
            </h3>
            <span className="text-xs text-indigo-400 font-mono">
              {selectedSession.name}
            </span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Elemento Attivo</span>
                <span className="font-mono text-slate-300">
                  {selectedSession.category}
                </span>
              </div>
              <h4 className="text-base font-bold text-white break-all">
                {selectedSession.activeItem}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedSession.subDetail}
              </p>
            </div>

            {/* If IDE session: show live unstaged code diff */}
            {selectedSession.diffPreview && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                    <GitBranch className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Diff non salvato sullo schermo</span>
                  </span>
                  <span className="font-mono text-[11px] text-amber-400">
                    4 linee modificate
                  </span>
                </div>

                <div className="rounded-lg bg-slate-950 p-3 border border-slate-800 font-mono text-xs overflow-x-auto space-y-1">
                  {selectedSession.diffPreview.map((line, idx) => (
                    <div
                      key={idx}
                      className={
                        line.startsWith('+')
                          ? 'text-emerald-400 bg-emerald-950/20 px-1 py-0.5 rounded'
                          : line.startsWith('-')
                          ? 'text-rose-400 bg-rose-950/20 px-1 py-0.5 rounded'
                          : 'text-slate-400'
                      }
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Launch / Command preview */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Comando di Ripristino Diretto
              </span>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-indigo-300 flex items-center justify-between gap-2 overflow-x-auto">
                <span className="truncate">{selectedSession.urlOrCommand}</span>
                <button
                  onClick={() => navigator.clipboard?.writeText(selectedSession.urlOrCommand)}
                  className="px-2 py-1 text-[10px] text-slate-300 bg-slate-800 hover:bg-slate-700 rounded transition-colors cursor-pointer shrink-0"
                >
                  Copia
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onRestoreDesk}
                className="w-full py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Apri e Posiziona Cursore a Questo File</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
