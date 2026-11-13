import React, { useState } from 'react';
import {
  evaluateSupplyResilience,
  calculateTreasuryOptimization,
  computeEscrowState,
} from '../../utils/suiteBatch3Engines';
import {
  Globe,
  AlertTriangle,
  CheckCircle2,
  Ship,
  ArrowRight,
  Landmark,
  TrendingUp,
  Coins,
  ShieldCheck,
  Lock,
  Unlock,
  Handshake,
  Eye,
  Send,
  Clock,
  RefreshCw,
} from 'lucide-react';

// ============================================================================
// 1. SupplyPulse: Gemello digitale resiliente della catena di fornitura e costi
// ============================================================================
export const SupplyPulseView: React.FC = () => {
  const [portSlowdown, setPortSlowdown] = useState<number>(40);
  const [optionConfirmed, setOptionConfirmed] = useState<boolean>(false);

  const assessment = evaluateSupplyResilience({
    portName: 'Porto di Ningbo-Zhoushan (Tier-1 Asia)',
    congestionPct: portSlowdown,
    estimatedDelayDays: Math.round(portSlowdown * 0.45),
    marginAtRiskEuros: 148000,
    alternativeCostDeltaPct: 0,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="text-xs font-medium text-cyan-400">
            SupplyPulse · Filiera Satellitare & Doganale Predittiva
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Gemello Digitale Resiliente della Catena di Fornitura
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Incrocia dati satellitari, bollettini meteo e flussi doganali lungo fornitori Tier-1, Tier-2 e Tier-3 per bloccare alternative prima che il ritardo eroda i margini.
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-right shrink-0">
          <div className="text-xs text-slate-400">Margine Protetto</div>
          <div className="text-xl font-bold text-emerald-400 font-mono tabular-nums">
            €{assessment.protectedMarginEuros.toLocaleString('it-IT')}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>Telemetria Rotta Critica: Asia → Europa</span>
            </h2>
            <span className="text-xs text-slate-400 font-mono">
              Congestione attuale: {portSlowdown}%
            </span>
          </div>

          <div className="space-y-2">
            <label htmlFor="congestion-slider" className="text-xs text-slate-300 flex justify-between">
              <span>Simula Rallentamento Porto Satellitare (Ningbo-Zhoushan)</span>
              <span className="font-mono text-amber-300">+{Math.round(portSlowdown * 0.45)} giorni ritardo</span>
            </label>
            <input
              id="congestion-slider"
              type="range"
              min={10}
              max={65}
              value={portSlowdown}
              onChange={(e) => {
                setPortSlowdown(Number(e.target.value));
                setOptionConfirmed(false);
              }}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5">
              <div className="text-slate-400">Tier-3 Materia Prima</div>
              <div className="font-semibold text-white mt-1">Estrusione Alluminio</div>
              <div className="text-emerald-400 mt-1">Regolare (Stock 92%)</div>
            </div>
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5">
              <div className="text-slate-400">Tier-1 Hub Marittimo</div>
              <div className="font-semibold text-white mt-1">Porto Ningbo-Zhoushan</div>
              <div className={`mt-1 font-medium ${assessment.severity === 'critical' ? 'text-rose-400' : 'text-amber-400'}`}>
                Rallentamento {portSlowdown}%
              </div>
            </div>
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5">
              <div className="text-slate-400">Impatto Magazzino Italia</div>
              <div className="font-semibold text-white mt-1">Consegna Prevista</div>
              <div className="text-slate-300 mt-1 font-mono">
                {optionConfirmed ? 'Puntuale via Europa' : `+${Math.round(portSlowdown * 0.45)} giorni tra 1 mese`}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
              <AlertTriangle className="w-4 h-4" />
              <span>Avviso Predittivo con 28 Giorni di Anticipo</span>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">
              Un porto chiave in Asia sta rallentando del <strong>{portSlowdown}%</strong>; il tuo fornitore principale subirà un ritardo di{' '}
              <strong>{Math.round(portSlowdown * 0.45)} giorni</strong> tra un mese. Ho già bloccato un'opzione d'acquisto con il fornitore europeo{' '}
              <strong>RheinMetall Componenti (Stoccarda)</strong> allo stesso identico prezzo unitario.
            </p>
          </div>

          {optionConfirmed ? (
            <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-4 space-y-1">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-300">
                <CheckCircle2 className="w-4 h-4" />
                <span>Opzione Europea Confermata & Ordine Deviato</span>
              </div>
              <p className="text-xs text-slate-300">
                Stock garantito senza sovrapprezzo. €148.000 di margine trimestrale messi al sicuro.
              </p>
            </div>
          ) : (
            <button
              onClick={() => setOptionConfirmed(true)}
              className="w-full py-3 px-4 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Ship className="w-4 h-4" />
              <span>Conferma Opzione Europea entro {assessment.hoursToLockOption} Ore</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 2. LiquidCash: Tesoreria autonoma HFT & factoring frazionato invisibile
// ============================================================================
export const LiquidCashView: React.FC = () => {
  const [gapAmount, setGapAmount] = useState<number>(22000);
  const [weekendCash, setWeekendCash] = useState<number>(50000);
  const [factoringExecuted, setFactoringExecuted] = useState<boolean>(false);
  const [weekendSweepActive, setWeekendSweepActive] = useState<boolean>(false);

  const treasury = calculateTreasuryOptimization({
    upcomingGapEuros: gapAmount,
    receivableInvoiceEuros: 68000,
    factoringRatePct: 0.75,
    idleWeekendCashEuros: weekendCash,
    overnightAprPct: 4.15,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="text-xs font-medium text-emerald-400">
            LiquidCash · Tesoreria Autonoma ad Alta Frequenza
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Factoring Frazionato Invisibile & Rendimento Overnight
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Anticipa automaticamente solo la frazione di credito esatta per coprire buchi di cassa futuri al tasso più basso e sposta la liquidità del weekend in strumenti sicuri fino alle 08:00 di lunedì.
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-right shrink-0">
          <div className="text-xs text-slate-400">Saldo Operativo Disponibile</div>
          <div className="text-xl font-bold text-white font-mono tabular-nums">
            €{(124500 + (factoringExecuted ? treasury.fractionToFactorEuros : 0)).toLocaleString('it-IT')}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card A: Fractional Factoring */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Landmark className="w-4 h-4 text-emerald-400" />
              <span>Copertura Buco di Cassa tra 18 Giorni</span>
            </h2>
            <span className="text-xs text-slate-400 font-mono">Fattura #FT-884: €68.000</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Il cliente Alpha Logistic pagherà con 22 giorni di ritardo. Invece di chiedere un fido bancario intero, LiquidCash vende solo la frazione necessaria sul mercato decentralizzato al tasso dello 0.75%.
          </p>

          <div className="space-y-2">
            <label htmlFor="gap-slider" className="text-xs text-slate-300 flex justify-between">
              <span>Frazione Esatta da Anticipare</span>
              <span className="font-mono font-bold text-white">€{gapAmount.toLocaleString('it-IT')}</span>
            </label>
            <input
              id="gap-slider"
              type="range"
              min={5000}
              max={68000}
              step={1000}
              value={gapAmount}
              onChange={(e) => {
                setGapAmount(Number(e.target.value));
                setFactoringExecuted(false);
              }}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs pt-1">
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
              <span className="text-slate-400 block">Costo Unico Operazione</span>
              <span className="text-base font-bold text-white font-mono">€{treasury.factoringCostEuros}</span>
            </div>
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
              <span className="text-slate-400 block">Giorni Burocrazia Risparmiati</span>
              <span className="text-base font-bold text-emerald-400 font-mono">21 giorni</span>
            </div>
          </div>

          <button
            onClick={() => setFactoringExecuted(true)}
            disabled={factoringExecuted}
            className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-900/40 disabled:text-emerald-300 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            {factoringExecuted
              ? `Frazione di €${treasury.fractionToFactorEuros.toLocaleString('it-IT')} Liquidata Istantaneamente`
              : `Liquida Solo €${treasury.fractionToFactorEuros.toLocaleString('it-IT')} al Tasso Minimo`}
          </button>
        </div>

        {/* Card B: Weekend Overnight Sweep */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Coins className="w-4 h-4 text-amber-400" />
              <span>Rendimento Automatico Liquidità Weekend</span>
            </h2>
            <span className="text-xs text-slate-400 font-mono">Rientro Lunedì 08:00</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Rilevata liquidità ferma sul conto fino ai bonifici fornitori di lunedì mattina. Spostamento automatico su titoli monetari overnight AAA (APR 4.15%) con rientro garantito alle 08:00.
          </p>

          <div className="space-y-2">
            <label htmlFor="weekend-slider" className="text-xs text-slate-300 flex justify-between">
              <span>Capitale Fermo per il Weekend</span>
              <span className="font-mono font-bold text-white">€{weekendCash.toLocaleString('it-IT')}</span>
            </label>
            <input
              id="weekend-slider"
              type="range"
              min={10000}
              max={250000}
              step={5000}
              value={weekendCash}
              onChange={(e) => {
                setWeekendCash(Number(e.target.value));
                setWeekendSweepActive(false);
              }}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs pt-1">
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
              <span className="text-slate-400 block">Rendimento Netto Weekend</span>
              <span className="text-base font-bold text-amber-300 font-mono">+€{treasury.weekendYieldEuros}</span>
            </div>
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
              <span className="text-slate-400 block">Finestra di Rientro</span>
              <span className="text-base font-bold text-white font-mono">Lun 08:00 CET</span>
            </div>
          </div>

          <button
            onClick={() => setWeekendSweepActive(true)}
            disabled={weekendSweepActive}
            className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 disabled:bg-amber-900/40 disabled:text-amber-200 text-slate-950 text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            {weekendSweepActive
              ? 'Sweep Weekend Attivo · Rientro Programmato alle 08:00'
              : 'Attiva Sweep Overnight Automatico'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 3. TrustEscrow: Piattaforma di fiducia istantanea senza avvocati
// ============================================================================
export const TrustEscrowView: React.FC = () => {
  const [milestones, setMilestones] = useState([
    { id: 'm1', label: 'Uscita Merce dalla Fabbrica (Sensore GPS IoT)', pct: 20, verified: true },
    { id: 'm2', label: 'Superamento Dogana Porto di Rotterdam (API Dogana)', pct: 30, verified: false },
    { id: 'm3', label: 'Verifica Qualitativa Laser all\'Arrivo (Toll-Free QA)', pct: 50, verified: false },
  ]);

  const escrow = computeEscrowState(80000, milestones);

  const toggleMilestone = (id: string) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, verified: !m.verified } : m))
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="text-xs font-medium text-teal-400">
            TrustEscrow · Esecuzione Contrattuale Programmabile
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Collaborazioni Globali Sicure Senza Avvocati né Banche
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Due aziende sconosciute avviano una fornitura in 5 minuti: i fondi restano nel caveau digitale e vengono rilasciati a tranche al verificarsi automatico di eventi IoT e doganali.
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-right shrink-0">
          <div className="text-xs text-slate-400">Contratto Caveau #TR-904</div>
          <div className="text-xl font-bold text-teal-300 font-mono tabular-nums">
            €{escrow.releasedEuros.toLocaleString('it-IT')} / €80.000 Rilasciati
          </div>
        </div>
      </div>

      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-300">
          <span>Acquirente: <strong>Manifattura Nord (Torino)</strong> ↔ Fornitore: <strong>Shenzhen Precision Robotics</strong></span>
          <span className="font-mono text-teal-400">{escrow.releasedPct}% sbloccato · €{escrow.lockedEuros.toLocaleString('it-IT')} in caveau</span>
        </div>

        <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-300"
            style={{ width: `${escrow.releasedPct}%` }}
          />
        </div>

        <div className="space-y-3">
          {milestones.map((m) => (
            <div
              key={m.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/70 border border-slate-800 rounded-xl p-4"
            >
              <div className="space-y-0.5">
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  {m.verified ? (
                    <Unlock className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <Lock className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                  <span>{m.label}</span>
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  Tranche programmata: {m.pct}% (€{((80000 * m.pct) / 100).toLocaleString('it-IT')})
                </div>
              </div>

              <button
                onClick={() => toggleMilestone(m.id)}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer shrink-0 ${
                  m.verified
                    ? 'bg-emerald-950/50 text-emerald-300 border border-emerald-500/40'
                    : 'bg-teal-600 hover:bg-teal-500 text-white'
                }`}
              >
                {m.verified ? 'Verificato da Oracolo IoT' : 'Simula Verifica & Sblocca Tranche'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 4. MergerMatch: Borsa silenziosa e anonima per alleanze, M&A e joint venture
// ============================================================================
export const MergerMatchView: React.FC = () => {
  const [myAsset, setMyAsset] = useState<string>('Rete distributiva capillare in 140 città italiane');
  const [roomOpened, setRoomOpened] = useState<boolean>(false);
  const [identityUnlocked, setIdentityUnlocked] = useState<boolean>(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="text-xs font-medium text-indigo-400">
            MergerMatch · Zero-Leak M&A & Joint Venture Exchange
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Borsa Silenziosa e Anonima per Alleanze e Acquisizioni
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Incrocia asset sottoutilizzati e colli di bottiglia strategici senza advisor né fughe di notizie. Le identità si svelano solo dopo la doppia validazione matematica della sinergia.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-4">
          <label htmlFor="asset-select" className="text-xs font-semibold text-slate-300 block">
            Asset Sottoutilizzato / Collo di Bottiglia Dichiarato:
          </label>
          <select
            id="asset-select"
            value={myAsset}
            onChange={(e) => {
              setMyAsset(e.target.value);
              setRoomOpened(false);
              setIdentityUnlocked(false);
            }}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="Rete distributiva capillare in 140 città italiane">
              Ho rete distributiva capillare in Italia ma pochi prodotti nuovi
            </option>
            <option value="Brevetto packaging biodegradabile ma zero commerciale">
              Ho prodotto brevettato ad alto margine ma zero forza vendita
            </option>
          </select>

          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2 text-xs">
            <div className="text-indigo-400 font-semibold">Controparte Anonima Compatibile #99-DELTA</div>
            <div className="text-white font-bold text-sm">
              Sinergia Matematica Calcolata: 96.4%
            </div>
            <p className="text-slate-400">
              {myAsset.includes('Rete')
                ? 'Detiene brevetto europeo per sensori energetici pronti ma 0 agenti commerciali in Italia. EBITDA combinato stimato: +€2.4M in 12 mesi.'
                : 'Possiede 85 agenti esclusivi nel settore GDO e logistica refrigerata con capacità residua del 38%.'}
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Handshake className="w-4 h-4 text-indigo-400" />
            <span>Stanza di Negoziazione Cifrata</span>
          </h2>

          {!roomOpened ? (
            <div className="space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed">
                L'identità legale della tua azienda e quella di <strong>#99-DELTA</strong> restano matematicamente nascoste. Avvia la verifica incrociata dei multipli EBITDA e della complementarietà di mercato.
              </p>
              <button
                onClick={() => setRoomOpened(true)}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Apri Stanza Anonima di Validazione
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
                  <span className="text-slate-400 block">Overlap Clienti</span>
                  <span className="text-emerald-400 font-bold font-mono">4% (Ottimale)</span>
                </div>
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
                  <span className="text-slate-400 block">Moltiplicatore Ricavi</span>
                  <span className="text-white font-bold font-mono">2.8x in 18 mesi</span>
                </div>
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
                  <span className="text-slate-400 block">Stato Segretezza</span>
                  <span className="text-indigo-300 font-bold font-mono">
                    {identityUnlocked ? 'Svelata NDA' : 'Anonima'}
                  </span>
                </div>
              </div>

              {!identityUnlocked ? (
                <button
                  onClick={() => setIdentityUnlocked(true)}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>Valida Sinergia & Svela Identità Societarie (Doppia Chiave)</span>
                </button>
              ) : (
                <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-4 text-xs space-y-1">
                  <div className="font-bold text-emerald-300">Identità Sbloccata Reciprocamente: GreenGrid Sensors S.r.l. (Bolzano)</div>
                  <div className="text-slate-300">NDA firmato digitalmente. Bozza di term sheet per Joint Venture pronta in sala dati.</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 5. AutoFollowUp: Il segugio gentile per impegni e solleciti
// ============================================================================
export const AutoFollowUpView: React.FC = () => {
  const [commitments, setCommitments] = useState([
    {
      id: 'f1',
      target: 'Studio Legale Verdi · Firma Preventivo Consulenza',
      channel: 'Email Formale -> WhatsApp',
      delayHours: 52,
      tone: 'Formale & Cortese',
      status: 'in_escalation',
      preview: 'Gentile Avv. Verdi, le riporto in cima questo preventivo condiviso martedì qualora fosse utile un chiarimento sui termini...',
    },
    {
      id: 'f2',
      target: 'Fornitore Logistica Express · Bolla Doganale #409',
      channel: 'Email Diretta -> Portale Fornitori',
      delayHours: 49,
      tone: 'Amichevole Partner Storico',
      status: 'in_escalation',
      preview: 'Ciao Marco, quando hai un minuto ci giri la bolla #409 così chiudiamo la pratica prima della chiusura?',
    },
  ]);

  const markObtained = (id: string) => {
    setCommitments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'resolved' } : c))
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="border-b border-slate-800 pb-6">
        <div className="text-xs font-medium text-amber-400">
          AutoFollowUp · Tracciamento Impegni & Solleciti Autonomi
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
          Il Segugio Gentile Che Non Ti Fa Mai Inseguire Nessuno
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">
          Estrae in automatico ogni impegno da email, chat o voce. Dopo 48 ore gestisce i solleciti calibrando il tono e cambiando canale fino al documento firmato.
        </p>
      </div>

      <div className="space-y-4">
        {commitments.map((item) => (
          <div
            key={item.id}
            className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
          >
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <span className="font-semibold text-amber-300">{item.tone}</span>
                <span aria-hidden="true">·</span>
                <span>Canale: {item.channel}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono">Attesa: {item.delayHours}h</span>
              </div>
              <h2 className="text-base font-bold text-white">{item.target}</h2>
              <p className="text-xs text-slate-300 bg-slate-950/70 border border-slate-800/80 rounded-lg p-3 italic">
                "{item.preview}"
              </p>
            </div>

            <div className="shrink-0">
              {item.status === 'resolved' ? (
                <div className="px-4 py-2 bg-emerald-950/50 border border-emerald-500/40 rounded-xl text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Risultato Ottenuto</span>
                </div>
              ) : (
                <button
                  onClick={() => markObtained(item.id)}
                  className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Invia Sollecito Calibrato Ora</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
