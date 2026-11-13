import React, { useState } from 'react';
import { TalentChallenge, BlindCandidate } from '../types';
import {
  initialTalentChallenges,
  initialBlindCandidates,
} from '../data/mockDataAdditions';
import {
  Terminal,
  Cpu,
  Award,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Code2,
  Clock,
  Layers,
  ArrowRight,
  Sparkles,
  Plus,
  Send,
} from 'lucide-react';

export const TalentMatrixView: React.FC = () => {
  const [challenges] = useState<TalentChallenge[]>(initialTalentChallenges);
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>('tc-1');
  const [candidates, setCandidates] = useState<BlindCandidate[]>(initialBlindCandidates);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>('cand-1');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showChallengeModal, setShowChallengeModal] = useState<boolean>(false);
  const [newChallengeTitle, setNewChallengeTitle] = useState<string>('');

  const activeChallenge = challenges.find((c) => c.id === selectedChallengeId) || challenges[0];
  const activeCandidate = candidates.find((c) => c.id === selectedCandidateId) || candidates[0];

  const handleSendOffer = (candidateCode: string) => {
    setCandidates((prev) =>
      prev.map((c) =>
        c.candidateCode === candidateCode ? { ...c, selectedForOffer: true } : c
      )
    );
    setToastMessage(`Offerta di assunzione immediata inviata anonimamente a ${candidateCode}! Nessun CV richiesto.`);
    setTimeout(() => setToastMessage(null), 4500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
            <Cpu className="w-4 h-4" />
            <span>TalentMatrix Blind Hiring</span>
            <span aria-hidden="true">·</span>
            <span>Reclutamento Basato su Fatti Puri, Zero CV</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Assumi Chi Sa Lavorare Davvero, Non Chi Sa Vendersi Meglio
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Nessun curriculum vitae, nessun colloquio formale o bias d'età e pedigree accademico. L'azienda pubblica una micro-sfida reale estratta dal proprio business; la piattaforma valuta alla cieca codice e logica, presentando i migliori 3 esecutori al mondo.
          </p>
        </div>

        <button
          onClick={() => setShowChallengeModal(true)}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 active:scale-98 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Pubblica Nuova Micro-Sfida</span>
        </button>
      </div>

      {/* Challenge Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {challenges.map((ch) => {
          const isSelected = ch.id === selectedChallengeId;
          return (
            <div
              key={ch.id}
              onClick={() => setSelectedChallengeId(ch.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-amber-950/20 border-amber-500/60 shadow-lg shadow-amber-950/20'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-amber-400">{ch.department}</span>
                <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" /> Max {ch.timeLimitHours} ore
                </span>
              </div>
              <h2 className="text-sm font-bold text-white mb-1.5">{ch.title}</h2>
              <p className="text-xs text-slate-400 line-clamp-2">{ch.businessContext}</p>
              <div className="flex items-center gap-4 mt-3 pt-2.5 border-t border-slate-800/60 text-[11px] text-slate-400">
                <span>{ch.activeSubmissionsCount} soluzioni sandbox anonime</span>
                <span aria-hidden="true">·</span>
                <span className="text-amber-300">Top 3 finalisti identificati</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Blind Leaderboard & Code Sandbox Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Candidates List Column */}
        <div className="lg:col-span-5 space-y-3">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            I Migliori 3 Esecutori Anonimi (Zero-Bias Ranking):
          </h2>

          <div className="space-y-3">
            {candidates.map((cand, idx) => {
              const isSelected = cand.id === selectedCandidateId;
              return (
                <div
                  key={cand.id}
                  onClick={() => setSelectedCandidateId(cand.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-amber-500/80 shadow-md shadow-amber-950/30'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-amber-500/20 text-amber-400 font-mono font-bold text-xs flex items-center justify-center">
                        #{idx + 1}
                      </span>
                      <span className="text-sm font-mono font-bold text-white">{cand.candidateCode}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-amber-300 font-mono">
                        {cand.executionScore}/100
                      </span>
                      {cand.selectedForOffer && (
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          Offerta Inviata
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono py-1.5 bg-slate-950/60 rounded-lg border border-slate-800/60 mb-2">
                    <div>
                      <span className="text-slate-500 block">Esecuzione</span>
                      <span className="text-slate-200 font-bold">{cand.executionScore}%</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Logica</span>
                      <span className="text-slate-200 font-bold">{cand.logicQualityScore}%</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Tempo</span>
                      <span className="text-slate-200 font-bold">{cand.timeSpentMinutes}m</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{cand.biasFreeBadge}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Candidate Deep Dive & Code Sandbox */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-mono font-black text-amber-400">{activeCandidate.candidateCode}</span>
                <span className="text-xs text-slate-400">· Risoluzione in Sandbox Cloud</span>
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Valutato unicamente sull'efficienza computazionale e la coerenza logica.
              </div>
            </div>

            <button
              onClick={() => handleSendOffer(activeCandidate.candidateCode)}
              disabled={activeCandidate.selectedForOffer}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                activeCandidate.selectedForOffer
                  ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-amber-500 hover:bg-amber-400 active:scale-98 text-slate-950 shadow-md shadow-amber-500/20'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>{activeCandidate.selectedForOffer ? 'Offerta Inviata' : 'Invia Offerta di Assunzione'}</span>
            </button>
          </div>

          {/* Key Strengths */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-300">Punti di Forza Verificati dai Test Automatici:</span>
            <ul className="space-y-1">
              {activeCandidate.keyStrengths.map((st, i) => (
                <li key={i} className="text-xs text-slate-300 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{st}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Code Sandbox Preview */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-mono text-slate-300">
                <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Soluzione Eseguita in Sandbox:</span>
              </span>
              <span className="text-[11px] text-slate-500">Benchmark Concurrency: 5.000 req/sec</span>
            </div>
            <pre className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
              <code>{activeCandidate.solutionSnippet}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Modal for creating a new challenge */}
      {showChallengeModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Pubblica Nuova Micro-Sfida per il Tuo Team</h3>
            <p className="text-xs text-slate-400">
              Descrivi un collo di bottiglia reale del tuo business. La piattaforma genera automaticamente l'ambiente sandbox e i test di collaudo cieco.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Titolo Problema & Dipartimento
                </label>
                <input
                  type="text"
                  value={newChallengeTitle}
                  onChange={(e) => setNewChallengeTitle(e.target.value)}
                  placeholder="Es. 'Ottimizzazione cache Redis su picchi serali di streaming'..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowChallengeModal(false)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                Annulla
              </button>
              <button
                onClick={() => {
                  setShowChallengeModal(false);
                  setToastMessage('Nuova sfida pubblicata sulla sandbox globale! Riceverai i primi 3 candidati entro 48h.');
                  setTimeout(() => setToastMessage(null), 4500);
                }}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg cursor-pointer"
              >
                Pubblica Sfida
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-amber-500/80 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in">
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
