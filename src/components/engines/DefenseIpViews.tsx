import React, { useState } from 'react';
import {
  FileCode2,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Network,
  Users,
  Cpu,
  AlertTriangle,
  Gavel,
  Sparkles,
} from 'lucide-react';

// ============================================================================
// 1. PatentForge: Incubatore brevetti & difesa automatica copyright
// ============================================================================
export const PatentForgeView: React.FC = () => {
  const [drafted, setDrafted] = useState<boolean>(false);
  const [takedownsSent, setTakedownsSent] = useState<string[]>([]);

  const infringements = [
    { id: 'inf1', target: 'Marketplace EU-CloneStore', item: 'Copia integrale UI e algoritmo compressione video brevettato' },
    { id: 'inf2', target: 'App Android "FastFlow Pro"', item: 'Utilizzo non autorizzato libreria R&D core estratta da APK' },
  ];

  const handleTakedown = (id: string) => {
    if (!takedownsSent.includes(id)) {
      setTakedownsSent([...takedownsSent, id]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="border-b border-slate-800 pb-6">
        <div className="text-xs font-medium text-amber-400">
          PatentForge · Incubatore Proprietà Intellettuale & Diffide Web
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
          Scova Invenzioni Brevettabili nel Codice e Ferma i Plagi Online
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">
          Confronta in continuo repository R&D e schemi interni con i registri brevetti globali redigendo la bozza tecnica di deposito, mentre monitora app e marketplace per avviare diffide automatiche.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="text-xs font-semibold text-emerald-400">Innovazione Originale Individuata in Repo R&D</div>
          <h2 className="text-base font-bold text-white">
            Algoritmo Adattivo di Compressione Logica Zero-Buffer (commit #a94f2)
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Confronto eseguito contro 142 milioni di brevetti EPO, USPTO e WIPO: grado di originalità stimato al <strong>94.8%</strong>. Nessuna anteriorità ostativa rilevata.
          </p>

          {drafted ? (
            <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-4 text-xs space-y-1">
              <div className="font-bold text-emerald-300">Bozza Tecnica Brevetto Generata (EP-2026-DRAFT-081)</div>
              <div className="text-slate-300">Rivendicazioni indipendenti, diagrammi architetturali e abstract tecnico pronti per la firma del consulente IP.</div>
            </div>
          ) : (
            <button
              onClick={() => setDrafted(true)}
              className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Genera Bozza Tecnica Brevetto Pronta per Deposito
            </button>
          )}
        </div>

        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="text-xs font-semibold text-rose-400">Monitor Violazioni Copyright & Brevetti sul Web</div>
          <div className="space-y-3">
            {infringements.map((inf) => {
              const sent = takedownsSent.includes(inf.id);
              return (
                <div key={inf.id} className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold text-white">{inf.target}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{inf.item}</div>
                  </div>
                  <button
                    onClick={() => handleTakedown(inf.id)}
                    disabled={sent}
                    className={`px-3 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer shrink-0 ${
                      sent
                        ? 'bg-emerald-950/50 text-emerald-300 border border-emerald-500/30'
                        : 'bg-rose-600 hover:bg-rose-500 text-white'
                    }`}
                  >
                    {sent ? 'Diffida PEC Inviata' : 'Avvia Diffida Legale'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 2. ZeroLeak: Scudo quantistico omomorfico per dati e modelli aziendali
// ============================================================================
export const ZeroLeakView: React.FC = () => {
  const [auditRun, setAuditRun] = useState<boolean>(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="border-b border-slate-800 pb-6">
        <div className="text-xs font-medium text-cyan-400">
          ZeroLeak · Camera Blindata Omomorfica Totale
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
          Fai Lavorare Revisori e IA su Dati Ciechi Mai Decifrati
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">
          Agisce da scudo tra la tua azienda e consulenti o modelli esterni: analizzano bilanci, codici o liste clienti operando matematicamente su vettori cifrati senza poter mai vedere i valori originali.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-cyan-400" />
            <span>Dati Aziendali Originari (Restano In Locale)</span>
          </h2>
          <pre className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-300 overflow-x-auto">
{`Bilancio Q3 Riservato:
- Ricavi Cliente #001 (Ferrari S.p.A.): €1.420.000
- Margine Brevetto Alpha: 68.4%
- Lista R&D Chiave: 14 nomi top-secret`}
          </pre>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Cosa Vede il Revisore Esterno / Modello IA</span>
          </h2>
          <pre className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-cyan-300 overflow-x-auto">
{`Vettore Omomorfico FHE-2048:
- Entità [0x8f29c...e1a]: val_enc(94827104821)
- Parametro [0x3b11a...90f]: val_enc(71048291042)
Decifrabilità Esterna: 0.0000% (Matematicamente Impossibile)`}
          </pre>

          {auditRun ? (
            <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-3.5 text-xs text-emerald-300 font-medium">
              Calcolo esterno completato sui dati ciechi! Risultato verificato in locale: Margine aggregato conforme 68.4%, zero byte esposti.
            </div>
          ) : (
            <button
              onClick={() => setAuditRun(true)}
              className="w-full py-2.5 px-4 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Esegui Audit Esterno su Vettori Omomorfici Ciechi
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 3. ReputationShield: Difesa attiva reputazione e blocco lotti difettosi
// ============================================================================
export const ReputationShieldView: React.FC = () => {
  const [crisisMitigated, setCrisisMitigated] = useState<boolean>(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="border-b border-slate-800 pb-6">
        <div className="text-xs font-medium text-rose-400">
          ReputationShield · Difesa Attiva & Prevenzione Crisi
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
          Disinnesca la Crisi Prima della Prima Recensione Negativa
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">
          Incrocia forum chiusi, community di nicchia e ticket interni di assistenza. Appena individua l'embrione di un disservizio o lotto difettoso, blocca le vendite e trasforma i primi reclamanti in ambasciatori.
        </p>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-xs font-semibold text-rose-400">Anomalia Precoce Intercettata nei Ticket Supporto</div>
            <h2 className="text-lg font-bold text-white mt-0.5">
              Lotto Produzione #B-402: 4 Segnalazioni Silenziose su Connettore USB Difettoso
            </h2>
          </div>
          <span className="text-xs font-mono text-amber-300">0 recensioni pubbliche uscite finora</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          Un modello di propagazione indica l'89% di probabilità che entro 72 ore scoppi un thread virale negativo su Reddit e Trustpilot. Puoi bloccare automaticamente la spedizione delle rimanenti 38 unità di #B-402 e inviare rimborso + sostituzione express gratuita ai 4 clienti.
        </p>

        {crisisMitigated ? (
          <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-4 text-xs space-y-1">
            <div className="font-bold text-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Lotto #B-402 Bloccato & 4 Clienti Rimborsati Proattivamente</span>
            </div>
            <p className="text-slate-300">
              Tutti e 4 i clienti hanno ringraziato l'assistenza. Rischio boicottaggio e danno d'immagine azzerato.
            </p>
          </div>
        ) : (
          <button
            onClick={() => setCrisisMitigated(true)}
            className="px-5 py-3 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Blocca Lotto #B-402, Rimborsa e Invia Omaggio ai 4 Clienti
          </button>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// 4. CultureOS: Sistema immunitario contro silos e progetti duplicati
// ============================================================================
export const CultureOSView: React.FC = () => {
  const [silosDissolved, setSilosDissolved] = useState<boolean>(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="border-b border-slate-800 pb-6">
        <div className="text-xs font-medium text-indigo-400">
          CultureOS · Rete Neurale della Collaborazione
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
          Sistema Immunitario Contro Silos, Tossicità e Lavori Duplicati
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">
          Mappa i flussi reali di collaborazione per valorizzare i connettori invisibili, sciogliere i colli di bottiglia comunicativi con micro-rotazioni e bloccare progetti duplicati.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="text-xs font-semibold text-emerald-400">Connettori Invisibili Identificati</div>
          <h2 className="text-base font-bold text-white">Chiara Esposito (Operations Specialist)</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Anche senza qualifica dirigenziale, Chiara funge da ponte nel 64% delle risoluzioni rapide tra Ingegneria e Vendite. Suggerimento: riconoscimento formale e tutela dal sovraccarico silenzioso.
          </p>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="text-xs font-semibold text-amber-400">Allerta Progetti Duplicati & Silos</div>
          <h2 className="text-base font-bold text-white">Team Marketing e Team Data stanno costruendo 2 dashboard identiche</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            I due reparti non comunicano da 5 settimane. CultureOS propone una micro-rotazione di 3 giorni di un membro per unificare gli archivi ed evitare 160 ore di lavoro sprecato.
          </p>

          {silosDissolved ? (
            <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-3 text-xs text-emerald-300 font-semibold">
              Micro-rotazione avviata · I due team ora lavorano sullo stesso codice condiviso.
            </div>
          ) : (
            <button
              onClick={() => setSilosDissolved(true)}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Unifica Progetti & Avvia Micro-Rotazione di 3 Giorni
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 5. SwarmLabs: Piattaforma di R&D distribuita e istantanea in 48 ore
// ============================================================================
export const SwarmLabsView: React.FC = () => {
  const [swarmStatus, setSwarmStatus] = useState<'ready' | 'running' | 'completed'>('completed');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="border-b border-slate-800 pb-6">
        <div className="text-xs font-medium text-sky-400">
          SwarmLabs · R&D Distribuita Crittografata in 48 Ore
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
          Milioni di Agenti & Ricercatori Risolvono il Tuo Problema Tecnico in 48 Ore
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">
          Carica un problema scientifico o ingegneristico come simulazione cifrata senza svelare segreti industriali. Paghi il premio solo al centraggio esatto dei parametri matematici richiesti.
        </p>
      </div>

      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-xs font-semibold text-sky-400">Sfida R&D #SW-712 · Simulazione Cifrata</div>
            <h2 className="text-lg font-bold text-white mt-0.5">
              Dissipatore Termico Polimerico con Riduzione Peso ≥ 35% e Conducibilità &gt; 42 W/mK
            </h2>
          </div>
          <span className="text-sm font-mono font-bold text-emerald-400">Premio Bloccato: €4.500</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5">
            <div className="text-slate-400">Ricercatori & Agenti Attivi</div>
            <div className="text-base font-bold text-white font-mono mt-1">18.420 in parallelo</div>
          </div>
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5">
            <div className="text-slate-400">Miglior Soluzione Validata</div>
            <div className="text-base font-bold text-emerald-400 font-mono mt-1">-38.2% Peso · 46.5 W/mK</div>
          </div>
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5">
            <div className="text-slate-400">Segretezza Industriale</div>
            <div className="text-base font-bold text-sky-300 font-mono mt-1">Simulazione Cifrata ZK</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSwarmStatus('completed')}
            className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Scarica Progetto CAD Matematicamente Validato & Rilascia Premio
          </button>
          <button
            onClick={() => setSwarmStatus('running')}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            {swarmStatus === 'running' ? 'Nuova Simulazione in Corso...' : 'Riesegui Verifica Stress Termico'}
          </button>
        </div>
      </div>
    </div>
  );
};
