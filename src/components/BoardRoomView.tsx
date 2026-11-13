import React, { useState } from 'react';
import { BoardRoomScenario, VirtualBoardMember } from '../types';
import {
  initialBoardRoomScenarios,
  initialVirtualBoardMembers,
} from '../data/mockDataAdditions';
import { simulateBoardroomConsensus } from '../utils/enterpriseAdditions';
import {
  Users,
  ShieldAlert,
  Flame,
  CheckCircle2,
  XCircle,
  AlertCircle,
  TrendingDown,
  Sparkles,
  ArrowRight,
  Send,
  HelpCircle,
  Activity,
  Award,
} from 'lucide-react';

export const BoardRoomView: React.FC = () => {
  const [scenarios] = useState<BoardRoomScenario[]>(initialBoardRoomScenarios);
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('sc-1');
  const [boardMembers, setBoardMembers] = useState<VirtualBoardMember[]>(initialVirtualBoardMembers);
  const [defenseInput, setDefenseInput] = useState<string>('');
  const [defenseHistory, setDefenseHistory] = useState<Array<{ sender: string; text: string; role: string }>>([
    {
      sender: 'Warren Buffett Clone',
      role: 'Chief Value & Risk Auditor',
      text: 'Se il calo dura più di 3 mesi, come evitate di intaccare le linee di credito essenziali?',
    },
  ]);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const activeScenario = scenarios.find((s) => s.id === selectedScenarioId) || scenarios[0];
  const consensus = simulateBoardroomConsensus(activeScenario, boardMembers);

  const handleSimulateBoard = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 1000);
  };

  const handleSendDefense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!defenseInput.trim()) return;

    const userText = defenseInput.trim();
    setDefenseInput('');
    setDefenseHistory((prev) => [
      ...prev,
      { sender: 'Tu (CEO / Strategia)', role: 'Difesa Strategica', text: userText },
    ]);

    // Generate responsive feedback from board members
    setTimeout(() => {
      let replyMember = boardMembers[0];
      let replyText = '';
      if (userText.toLowerCase().includes('cassa') || userText.toLowerCase().includes('margine')) {
        replyMember = boardMembers[0]; // Buffett
        replyText =
          'Interessante. Il buffer di cassa tutela il principio di prudenza. Se vincolate le spese discrezionali, il mio voto passa da interlocutorio a favorevole.';
        // Flip Buffett to approve if not already
        setBoardMembers((prev) =>
          prev.map((m) => (m.id === 'bm-buffett' ? { ...m, vote: 'approve' } : m))
        );
      } else if (userText.toLowerCase().includes('veloce') || userText.toLowerCase().includes('acceler')) {
        replyMember = boardMembers[1]; // Musk
        replyText =
          'Esatto! La velocità è l\'unico vero fossato difensivo. Riducete il ciclo di iterazione a 14 giorni e voterò approvazione incondizionata.';
        setBoardMembers((prev) =>
          prev.map((m) => (m.id === 'bm-musk' ? { ...m, vote: 'approve' } : m))
        );
      } else {
        replyMember = boardMembers[3]; // Kahneman
        replyText =
          'Apprezzo l\'intento, ma attenzione al bias di disponibilità: pianificate anche cosa farete se la risposta del mercato sarà negativa nelle prime 4 settimane.';
      }

      setDefenseHistory((prev) => [
        ...prev,
        {
          sender: replyMember.name,
          role: replyMember.roleTitle,
          text: replyText,
        },
      ]);
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" />
            <span>BoardRoom Virtual Crisis Engine</span>
            <span aria-hidden="true">·</span>
            <span>Simulazione Strategica con Cloni IA</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            La Sala di Simulazione Decisionale Prima di Investire 1€ Reale
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Sottoponi decisioni critiche a un consiglio di amministrazione virtuale (Buffett, Musk, Drucker, Kahneman). Il board fa le pulci al piano, simula fallimenti a catena e ti costringe a difendere la strategia prima del lancio.
          </p>
        </div>

        {/* Boardroom Survivability Index */}
        <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 rounded-xl p-3.5 shrink-0">
          <div className="flex flex-col items-center justify-center">
            <span className="text-2xl font-black text-purple-400 tabular-nums">
              {consensus.survivabilityIndex}%
            </span>
            <span className="text-[10px] text-slate-500 uppercase font-semibold">Sopravvivenza</span>
          </div>
          <div className="border-l border-slate-800 pl-3">
            <div className="text-xs text-slate-400">Verdetto del Consiglio</div>
            <div className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
              {consensus.consensusVerdict === 'APPROVED' && (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Approvato dal CdA</span>
                </>
              )}
              {consensus.consensusVerdict === 'CONDITIONAL' && (
                <>
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <span className="text-amber-400">Approvazione con Riserva</span>
                </>
              )}
              {consensus.consensusVerdict === 'BLOCKED' && (
                <>
                  <XCircle className="w-4 h-4 text-rose-400" />
                  <span className="text-rose-400">Bloccato da Veto</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scenario Selector & Financial Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scenarios column */}
        <div className="space-y-3">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Seleziona Crisi o Decisione Strategica:
          </h2>
          <div className="space-y-2">
            {scenarios.map((sc) => {
              const isSelected = sc.id === selectedScenarioId;
              return (
                <button
                  key={sc.id}
                  onClick={() => setSelectedScenarioId(sc.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-purple-950/30 border-purple-500/60 shadow-lg shadow-purple-950/20'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-purple-300">{sc.category}</span>
                    <span className="text-slate-400 font-mono text-[11px]">
                      {sc.cashRunwayMonths} mesi runway
                    </span>
                  </div>
                  <div className="text-sm font-bold text-white leading-snug">{sc.title}</div>
                </button>
              );
            })}
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-3.5 space-y-2 text-xs">
            <span className="font-semibold text-slate-300 block">Condizioni Iniziali Rilevate:</span>
            <p className="text-slate-400 leading-relaxed">{activeScenario.initialConditions}</p>
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-slate-300 font-mono text-[11px]">
              <span>EBITDA: {activeScenario.currentEbitdaPct}%</span>
              <span>Costo Stimato: {activeScenario.projectedCost}</span>
            </div>
          </div>
        </div>

        {/* Virtual Boardroom Members Evaluation */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Membri del Consiglio Virtuale & Votazione:
            </h2>
            <button
              onClick={handleSimulateBoard}
              disabled={isSimulating}
              className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 active:scale-98 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>{isSimulating ? 'Ricalcolo in corso...' : 'Ricalcola Stress Test'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {boardMembers.map((member) => {
              return (
                <div
                  key={member.id}
                  className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-700"
                        />
                        <div>
                          <span className="text-xs font-bold text-white block leading-tight">{member.name}</span>
                          <span className="text-[10px] text-purple-400 font-mono">{member.roleTitle}</span>
                        </div>
                      </div>

                      <div className="shrink-0">
                        {member.vote === 'approve' && (
                          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            Favorevole
                          </span>
                        )}
                        {member.vote === 'conditional_amend' && (
                          <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                            Con Riserva
                          </span>
                        )}
                        {member.vote === 'reject_fatal' && (
                          <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                            Veto Contrario
                          </span>
                        )}
                      </div>
                    </div>

                    <blockquote className="text-xs text-slate-300 italic border-l-2 border-purple-500/50 pl-2.5 my-2">
                      "{member.critiqueQuote}"
                    </blockquote>
                  </div>

                  <div className="space-y-1.5 text-[11px] pt-2 border-t border-slate-800/60">
                    <div className="text-slate-400">
                      <strong className="text-slate-300 font-semibold">Stress Test Fallimento:</strong>{' '}
                      {member.stressTestFailureScenario}
                    </div>
                    <div className="text-slate-400">
                      <strong className="text-slate-300 font-semibold">Raccomandazione:</strong>{' '}
                      {member.recommendation}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Defense Simulator Dialog */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3 mt-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Difendi il Tuo Piano Strategico davanti al Board</span>
              </span>
              <span className="text-[11px] text-slate-500">I cloni risponderanno analizzando la robustezza logica</span>
            </div>

            {/* Conversation Log */}
            <div className="max-h-48 overflow-y-auto space-y-2 pr-1 text-xs">
              {defenseHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-lg border ${
                    msg.sender.includes('Tu')
                      ? 'bg-purple-950/40 border-purple-500/30 text-purple-200 ml-4'
                      : 'bg-slate-950/80 border-slate-800 text-slate-300 mr-4'
                  }`}
                >
                  <div className="text-[10px] font-bold text-slate-400 mb-0.5 flex items-center justify-between">
                    <span>{msg.sender}</span>
                    <span className="text-slate-500 font-normal">{msg.role}</span>
                  </div>
                  <div>{msg.text}</div>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendDefense} className="flex gap-2">
              <input
                type="text"
                value={defenseInput}
                onChange={(e) => setDefenseInput(e.target.value)}
                placeholder="Scrivi la tua difesa (es. 'Garantiamo la cassa con una riserva di 6 mesi e milestone a 30 giorni')..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 active:scale-98 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Invia</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
