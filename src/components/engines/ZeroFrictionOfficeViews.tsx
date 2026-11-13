import React, { useState } from 'react';
import { parseTabZeroVoiceCommand } from '../../utils/suiteBatch3Engines';
import {
  Fingerprint,
  FileCheck2,
  Mic,
  Mail,
  CheckCircle2,
  PhoneOff,
  Sparkles,
  Send,
  Link2,
  Play,
  ArrowRight,
  Clock,
} from 'lucide-react';

// ============================================================================
// 1. OneClick Bureaucracy: Il distruttore istantaneo di moduli, pratiche e PEC
// ============================================================================
export const OneClickBureaucracyView: React.FC = () => {
  const [portalUrl, setPortalUrl] = useState<string>('https://bandi.regione.lombardia.it/pratica/transizione-digitale-2026');
  const [step, setStep] = useState<'idle' | 'filled' | 'signed'>('idle');

  const handleCompile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!portalUrl.trim()) return;
    setStep('filled');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="border-b border-slate-800 pb-6">
        <div className="text-xs font-medium text-emerald-400">
          OneClick Bureaucracy · Passaporto Universale del Business
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
          Compila Moduli, Bandi e PEC Esterni in 10 Secondi
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">
          Carichi documenti, visure e deleghe una volta sola. Incolla il link della pratica: il portale compila ogni campo su siti esterni, formatta i PDF e ti chiede solo l'impronta digitale dal telefono.
        </p>
      </div>

      <form onSubmit={handleCompile} className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
        <label htmlFor="buro-url" className="text-xs font-semibold text-slate-300 block">
          Incolla il Link della Pratica / Bando / Conto / Albo Esterno
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            id="buro-url"
            type="url"
            value={portalUrl}
            onChange={(e) => {
              setPortalUrl(e.target.value);
              setStep('idle');
            }}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shrink-0"
          >
            Naviga & Compila Automaticamente
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-2">
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
            <span className="text-slate-400 block">Visura Camerale & P.IVA</span>
            <span className="text-emerald-400 font-semibold">Pre-caricata nel Passaporto</span>
          </div>
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
            <span className="text-slate-400 block">Bilanci & Deleghe Legali</span>
            <span className="text-emerald-400 font-semibold">Formattati PDF/A Conformi</span>
          </div>
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
            <span className="text-slate-400 block">Invio & Protocollo PEC</span>
            <span className="text-slate-200 font-semibold">Pronto su sblocco impronta</span>
          </div>
        </div>
      </form>

      {step === 'filled' && (
        <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-sm font-bold text-white">48 Campi Compilati e 4 Allegati Formattati sul Portale Esterno</div>
            <p className="text-xs text-slate-300">
              Tutti i dati anagrafici, IBAN e firme sono stati inseriti. Sblocca con la tua impronta digitale per completare l'invio PEC.
            </p>
          </div>
          <button
            onClick={() => setStep('signed')}
            className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Fingerprint className="w-4 h-4" />
            <span>Sblocca con Impronta & Firma (10s)</span>
          </button>
        </div>
      )}

      {step === 'signed' && (
        <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-6 text-xs space-y-1">
          <div className="text-sm font-bold text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Pratica Protocollata e PEC Inviata con Successo!</span>
          </div>
          <p className="text-slate-300">Ricevuta ufficiale archiviata nel tuo Passaporto Aziendale. Tempo impiegato: 9.4 secondi.</p>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// 2. TabZero: L'ufficio vocal-visivo senza tastiera né finestre
// ============================================================================
export const TabZeroView: React.FC = () => {
  const sampleRecords = [
    { id: 'r1', region: 'Nord Italia (Lombardia/Veneto)', amount2025: 42000, amount2026: 35700 },
    { id: 'r2', region: 'Centro Italia (Lazio/Toscana)', amount2025: 28500, amount2026: 31200 },
    { id: 'r3', region: 'Micro-Ordine Campione Test', amount2025: 85, amount2026: 64 },
    { id: 'r4', region: 'Sud & Isole', amount2025: 19400, amount2026: 21800 },
  ];

  const [voiceInput, setVoiceInput] = useState<string>(
    'Prendi i dati di vendita di ottobre, confrontali con quelli dell\'anno scorso, elimina le righe sotto i 100 euro e prepara una mail gentile per Luca chiedendogli perché il nord Italia è calato'
  );
  const [mailSent, setMailSent] = useState<boolean>(false);

  const parsed = parseTabZeroVoiceCommand(voiceInput, sampleRecords);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="border-b border-slate-800 pb-6">
        <div className="text-xs font-medium text-sky-400">
          TabZero · Ufficio Vocal-Visivo Senza Tastiera né Finestre
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
          Parla a Voce Normale, Vedi Lo Schermo Assemblare Tutto
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">
          Lavora comodamente dal divano o camminando senza aprire Excel né cartelle: dai un comando vocale complesso e guarda dati, confronti e bozze prendere forma in tempo reale.
        </p>
      </div>

      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-3">
        <label htmlFor="tabzero-cmd" className="text-xs font-semibold text-sky-300 flex items-center gap-2">
          <Mic className="w-4 h-4" />
          <span>Comando Vocale Rilevato in Tempo Reale:</span>
        </label>
        <input
          id="tabzero-cmd"
          type="text"
          value={voiceInput}
          onChange={(e) => {
            setVoiceInput(e.target.value);
            setMailSent(false);
          }}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-sky-500"
        />
        <div className="text-xs text-slate-400">
          Azioni eseguite automaticamente: <strong>{parsed.removedCount}</strong> righe sotto €100 rimosse · Confronto 2025 vs 2026 calcolato · Bozza email pronta.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-3">
          <h2 className="text-sm font-bold text-white">Tabella Vendite Ottobre Pulita & Confrontata</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-2">Area Geografica</th>
                  <th className="py-2 text-right font-mono">Ott 2025</th>
                  <th className="py-2 text-right font-mono">Ott 2026</th>
                  <th className="py-2 text-right font-mono">Delta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {parsed.filteredRecords.map((row) => {
                  const delta = Math.round(((row.amount2026 - row.amount2025) / row.amount2025) * 100);
                  return (
                    <tr key={row.id} className={delta < 0 ? 'bg-rose-950/20' : ''}>
                      <td className="py-2.5 text-white font-medium">{row.region}</td>
                      <td className="py-2.5 text-right font-mono text-slate-300">€{row.amount2025.toLocaleString('it-IT')}</td>
                      <td className="py-2.5 text-right font-mono text-white font-semibold">€{row.amount2026.toLocaleString('it-IT')}</td>
                      <td className={`py-2.5 text-right font-mono font-bold ${delta < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {delta > 0 ? `+${delta}%` : `${delta}%`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-2 text-xs">
            <div className="font-bold text-white text-sm">Email Pronta per {parsed.draftEmail.to}</div>
            <div className="text-slate-400">Oggetto: {parsed.draftEmail.subject}</div>
            <p className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-slate-200 leading-relaxed">
              {parsed.draftEmail.body}
            </p>
          </div>
          <button
            onClick={() => setMailSent(true)}
            disabled={mailSent}
            className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-500 disabled:bg-emerald-950/50 disabled:text-emerald-300 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            {mailSent ? 'Email Inviata a Luca con Allegato Grafico' : 'Conferma Invio Vocale Email'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 3. InboxZero AutoPilot: Filtro empatico con 3 scelte rapide
// ============================================================================
export const InboxZeroView: React.FC = () => {
  const [importantEmails, setImportantEmails] = useState([
    {
      id: 'em1',
      sender: 'Ing. Davide Conti · Partner Enterprise',
      subject: 'Proposta estensione contratto Q4 con sconto volume 8%',
      summary: 'Chiede estensione annuale anticipata con blocco listino fino a fine 2027.',
      choice: null as string | null,
    },
    {
      id: 'em2',
      sender: 'Giulia Ferri · Direzione HR',
      subject: 'Approvazione budget formazione team Design (3.400€)',
      summary: 'Workshop di due giorni su accessibilità e prototyping rapido.',
      choice: null as string | null,
    },
  ]);

  const handleAction = (id: string, actionLabel: string) => {
    setImportantEmails((prev) =>
      prev.map((e) => (e.id === id ? { ...e, choice: actionLabel } : e))
    );
  };

  const remaining = importantEmails.filter((e) => !e.choice).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="text-xs font-medium text-indigo-400">
            InboxZero AutoPilot · Segretario Capo Empatico
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Svuota la Posta in 3 Minuti Invece che 2 Ore
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Ha già archiviato 64 newsletter e risposto in autonomia a 11 richieste di listino o fatture imitando il tuo stile. Ecco le sole decisioni essenziali rimaste con 3 pulsanti rapidi.
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-right shrink-0">
          <div className="text-xs text-slate-400">Email da Decidere</div>
          <div className="text-xl font-bold text-indigo-300 font-mono">
            {remaining === 0 ? 'Inbox Zero Raggiunto!' : `${remaining} Rimaste`}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {importantEmails.map((em) => (
          <div key={em.id} className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
              <span className="font-bold text-indigo-300">{em.sender}</span>
              <span className="text-slate-400">Sintesi Segretario Capo</span>
            </div>
            <h2 className="text-base font-bold text-white">{em.subject}</h2>
            <p className="text-xs text-slate-300">{em.summary}</p>

            {em.choice ? (
              <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Risposta inviata automaticamente: "{em.choice}"</span>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => handleAction(em.id, 'Accetta proposta')}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Accetta proposta
                </button>
                <button
                  onClick={() => handleAction(em.id, 'Rifiuta con gentilezza')}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Rifiuta con gentilezza
                </button>
                <button
                  onClick={() => handleAction(em.id, 'Chiedi rinvio a martedì')}
                  className="px-3.5 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Chiedi rinvio a martedì
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// 4. MeetingSkipper: Avatar partecipante per saltare le riunioni inutili
// ============================================================================
export const MeetingSkipperView: React.FC = () => {
  const [meetingLink, setMeetingLink] = useState<string>('https://meet.google.com/abc-defg-hij');
  const [agentActive, setAgentActive] = useState<boolean>(true);
  const [joinedLive, setJoinedLive] = useState<boolean>(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="border-b border-slate-800 pb-6">
        <div className="text-xs font-medium text-purple-400">
          MeetingSkipper · Avatar Silente Partecipante alle Call
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
          Salta le Call di Aggiornamento ed Entra Solo nei 5 Minuti Decisivi
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">
          Manda il tuo agente silente nella riunione: ascolta tutto, prende appunti, risponde in chat con i dati dei tuoi progetti se ti chiamano e ti avvisa sul telefono solo se serve la tua decisione.
        </p>
      </div>

      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row gap-3 items-end">
        <div className="flex-1 w-full space-y-1.5">
          <label htmlFor="meet-link" className="text-xs font-semibold text-slate-300 block">
            Link Riunione da Delegare al Tuo Avatar
          </label>
          <input
            id="meet-link"
            type="url"
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
          />
        </div>
        <button
          onClick={() => setAgentActive(true)}
          className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shrink-0"
        >
          {agentActive ? 'Agente Silente in Call (Minuto 34:12)' : 'Invia Agente in Call'}
        </button>
      </div>

      {agentActive && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
            <div className="font-bold text-white text-sm">Log Attività dell'Agente in Riunione</div>
            <div className="space-y-2">
              <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-3 text-slate-300">
                <span className="font-mono text-slate-500 mr-2">00:12</span>
                Sara ha chiesto lo stato dell'integrazione API. <strong>Risposta automatica inviata in chat dal tuo agente:</strong> "Completata al 92% su staging, test finali alle 16:00."
              </div>
              <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-3 text-slate-300">
                <span className="font-mono text-slate-500 mr-2">00:28</span>
                Discussione operativa su colori brochure (non richiede il tuo intervento). Hai risparmiato 28 minuti di lavoro profondo.
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-purple-950/30 border border-purple-500/40 rounded-2xl p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="text-xs font-bold text-amber-300">Notifica Decisione Critica Rilevata (Ora)</div>
              <p className="text-xs text-slate-200 leading-relaxed">
                <strong>Riassunto ultimi 2 minuti:</strong> Il direttore vendite propone di anticipare il rilascio di lunedì sacrificando la modalità offline per chiudere il cliente Beta. Serve il tuo sì o no.
              </p>
            </div>
            <button
              onClick={() => setJoinedLive(true)}
              disabled={joinedLive}
              className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-500 disabled:bg-emerald-950/50 disabled:text-emerald-300 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              {joinedLive ? 'Connesso in Call con Riassunto Pronti in Mano' : 'Entra Ora con il Riassunto degli Ultimi 2 Minuti'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
