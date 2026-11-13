import React, { useState } from 'react';
import {
  simulatePrototypeDemand,
  computeEmpatheticOffer,
} from '../../utils/suiteBatch3Engines';
import {
  Sparkles,
  CheckCircle2,
  Radar,
  TrendingUp,
  Layers,
  Tag,
  Recycle,
  Copy,
  Megaphone,
  ArrowRight,
  Sliders,
} from 'lucide-react';

// ============================================================================
// 1. CustomerDNA: Co-creazione predittiva con prototipi virtuali e pre-ordini
// ============================================================================
export const CustomerDNAView: React.FC = () => {
  const [features, setFeatures] = useState([
    { id: 'f1', name: 'Modalità Offline Crittografata', weightMultiplier: 1.15, unitCostEuros: 8, enabled: true },
    { id: 'f2', name: 'Ricarica Rapida Solare Integrata', weightMultiplier: 1.22, unitCostEuros: 14, enabled: true },
    { id: 'f3', name: 'Scocca Titanio Riciclato Zero-Graffi', weightMultiplier: 1.12, unitCostEuros: 19, enabled: false },
    { id: 'f4', name: 'Sincronizzazione Biometrica SmartWatch', weightMultiplier: 1.09, unitCostEuros: 6, enabled: false },
  ]);
  const [pricePoint, setPricePoint] = useState<number>(89);
  const [campaignLaunched, setCampaignLaunched] = useState<boolean>(false);

  const selected = features.filter((f) => f.enabled);
  const forecast = simulatePrototypeDemand({
    baseAudience: 1000,
    selectedFeatures: selected,
    pricePointEuros: pricePoint,
  });

  const toggleFeature = (id: string) => {
    setFeatures((prev) =>
      prev.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f))
    );
    setCampaignLaunched(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="text-xs font-medium text-indigo-400">
            CustomerDNA · Co-Creazione Predittiva sul Prototipo
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Calcola i Pre-Ordini Esatti Prima di Produrre
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            I tuoi clienti più fedeli modificano, combinano e scartano funzionalità sui prototipi virtuali. Migliaia di micro-comportamenti si aggregano nella previsione esatta di domanda e prezzo.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-right shrink-0">
          <div className="text-xs text-slate-400">Domanda Predetta a €{pricePoint}</div>
          <div className="text-xl font-bold text-emerald-400 font-mono tabular-nums">
            {forecast.predictedPreorders.toLocaleString('it-IT')} Pre-Ordini Pronti
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-bold text-white">Configuratore Prototipo Interattivo Clienti</h2>
          <div className="space-y-2.5">
            {features.map((feat) => (
              <button
                key={feat.id}
                onClick={() => toggleFeature(feat.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                  feat.enabled
                    ? 'bg-indigo-950/30 border-indigo-500/60 text-white'
                    : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="text-sm font-semibold">{feat.name}</div>
                  <div className="text-xs text-slate-400 font-mono">
                    Costo unitario: +€{feat.unitCostEuros} · Impatto domanda: +{Math.round((feat.weightMultiplier - 1) * 100)}%
                  </div>
                </div>
                <span className={`text-xs font-bold ${feat.enabled ? 'text-indigo-300' : 'text-slate-500'}`}>
                  {feat.enabled ? 'Inclusa' : 'Aggiungi'}
                </span>
              </button>
            ))}
          </div>

          <div className="pt-2 space-y-2">
            <label htmlFor="price-dna-slider" className="text-xs text-slate-300 flex justify-between">
              <span>Fascia di Prezzo Lancio Testata</span>
              <span className="font-mono font-bold text-white">€{pricePoint}</span>
            </label>
            <input
              id="price-dna-slider"
              type="range"
              min={49}
              max={199}
              value={pricePoint}
              onChange={(e) => {
                setPricePoint(Number(e.target.value));
                setCampaignLaunched(false);
              }}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>
        </div>

        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <h2 className="text-base font-bold text-white">Verdetto di Mercato Live</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Se lanci il prodotto con le <strong>{selected.length} caratteristiche</strong> selezionate al prezzo di{' '}
              <strong>€{pricePoint}</strong>, hai già{' '}
              <strong className="text-emerald-400">{forecast.predictedPreorders.toLocaleString('it-IT')} acquirenti</strong> pronti a pre-ordinarlo.
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs pt-2">
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
                <span className="text-slate-400 block">Fatturato Pre-Ordini</span>
                <span className="text-base font-bold text-white font-mono">
                  €{forecast.grossRevenueEuros.toLocaleString('it-IT')}
                </span>
              </div>
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3">
                <span className="text-slate-400 block">Margine Netto Stimato</span>
                <span className="text-base font-bold text-emerald-400 font-mono">
                  €{forecast.grossMarginEuros.toLocaleString('it-IT')}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setCampaignLaunched(true)}
            disabled={campaignLaunched}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-emerald-950/50 disabled:text-emerald-300 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            {campaignLaunched
              ? 'Campagna Pre-Ordini Inviata ai 1.400 Clienti Selezionati'
              : 'Lancia Pre-Ordine sulla Coorte Validata'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 2. CompetitorX-Ray: Radiografia strategica in tempo reale dei concorrenti
// ============================================================================
export const CompetitorXRayView: React.FC = () => {
  const [counterMovesActivated, setCounterMovesActivated] = useState<string[]>([]);

  const signals = [
    { source: 'Annunci di Lavoro', detail: 'Assunti 4 ingegneri senior specializzati in pagamenti crypto & SEPA instant (Berlino)' },
    { source: 'Registri Domini & TLS', detail: 'Registrati 3 nuovi domini .de e sottodominio checkout-de nelle ultime 48 ore' },
    { source: 'Analisi App Mobile', detail: 'Trovati string-key di localizzazione tedesca e SDK KYC tedesco nel bundle v4.12' },
    { source: 'Brevetti & Flussi', detail: 'Deposito brevetto su riconciliazione IVA automatizzata per mercato DACH' },
  ];

  const counterMoves = [
    { id: 'cm1', title: 'Blocca 12 Partner Chiave DACH con Offerta Annuale Scontata del 15%' },
    { id: 'cm2', title: 'Lancia Pagamento Istantaneo SEPA Zero-Fee Prima di Loro (30 Giorni)' },
    { id: 'cm3', title: 'Attiva Campagna Search Mirata su Keyword FinTech Germania' },
  ];

  const activateMove = (id: string) => {
    if (!counterMovesActivated.includes(id)) {
      setCounterMovesActivated([...counterMovesActivated, id]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="border-b border-slate-800 pb-6">
        <div className="text-xs font-medium text-rose-400">
          CompetitorX-Ray · Intelligence Strategica Legale
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
          Radiografia in Tempo Reale della Roadmap Concorrenti
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">
          Aggrega micro-segnali pubblici (assunzioni, brevetti, diff di codice app, domini, recensioni) per svelare la prossima mossa del rivale prima del lancio.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Radar className="w-4 h-4 text-rose-400" />
            <span>Micro-Segnali Rilevati su Competitor #1 (VelocePay)</span>
          </h2>
          <div className="space-y-3">
            {signals.map((sig, i) => (
              <div key={i} className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5">
                <div className="text-xs font-bold text-rose-300">{sig.source}</div>
                <p className="text-xs text-slate-300 mt-1">{sig.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="space-y-2">
            <div className="text-xs font-semibold text-amber-400">Roadmap Segreta Ricostruita</div>
            <p className="text-sm text-white font-medium leading-relaxed">
              VelocePay lancerà un servizio fintech B2B dedicato al mercato tedesco entro 4 mesi.
            </p>
          </div>

          <div className="space-y-2.5 pt-2">
            <div className="text-xs font-semibold text-slate-400">3 Contromosse Immediate per Anticiparli:</div>
            {counterMoves.map((cm) => {
              const active = counterMovesActivated.includes(cm.id);
              return (
                <div
                  key={cm.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-950/70 border border-slate-800 rounded-xl p-3.5"
                >
                  <span className="text-xs text-slate-200 font-medium">{cm.title}</span>
                  <button
                    onClick={() => activateMove(cm.id)}
                    disabled={active}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer shrink-0 ${
                      active
                        ? 'bg-emerald-950/50 text-emerald-300 border border-emerald-500/30'
                        : 'bg-rose-600 hover:bg-rose-500 text-white'
                    }`}
                  >
                    {active ? 'Attivata' : 'Esegui Ora'}
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
// 3. GhostAgency: Fabbrica istantanea di campagne marketing auto-adattive
// ============================================================================
export const GhostAgencyView: React.FC = () => {
  const [productUrl, setProductUrl] = useState<string>('https://shop.azienda.it/kit-ergonomia-pro');
  const [minMarginPct, setMinMarginPct] = useState<number>(32);
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  const [variants, setVariants] = useState([
    { id: 'v1', hook: 'Angolo Ergonomia & Dolore Schiena', roas: 1.4, status: 'spenta' as 'spenta' | 'scaling', convPct: '1.1%' },
    { id: 'v2', hook: 'Bundle Studio Domestico + Garanzia 5 Anni', roas: 4.8, status: 'scaling' as 'spenta' | 'scaling', convPct: '5.4%' },
    { id: 'v3', hook: 'Video Comparativa Tecnica 15s B2B', roas: 3.9, status: 'scaling' as 'spenta' | 'scaling', convPct: '4.2%' },
  ]);

  const handleLaunchFactory = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOptimizing(true);
    setTimeout(() => {
      setVariants([
        { id: 'v1', hook: 'Angolo Generico Sconto 10%', roas: 1.1, status: 'spenta', convPct: '0.8%' },
        { id: 'v2', hook: `Bundle Riscritto Automatico (Margine min ${minMarginPct}%)`, roas: 5.2, status: 'scaling', convPct: '6.1%' },
        { id: 'v3', hook: 'Landing Personalizzata CFO & Procurement', roas: 4.4, status: 'scaling', convPct: '4.9%' },
      ]);
      setIsOptimizing(false);
    }, 900);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="border-b border-slate-800 pb-6">
        <div className="text-xs font-medium text-violet-400">
          GhostAgency · Marketing Autonomo Auto-Adattivo
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
          Migliaia di Micro-Varianti in Tempo Reale Senza Agenzie
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">
          Inserisci il link del prodotto e il margine minimo: genera migliaia di test su nicchie specifiche, spegne subito ciò che brucia budget e riscrive offerta e bundle finché il profitto non scala.
        </p>
      </div>

      <form onSubmit={handleLaunchFactory} className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        <div className="md:col-span-6 space-y-1.5">
          <label htmlFor="ghost-url" className="text-xs font-semibold text-slate-300 block">
            Link Prodotto o Pagina Destinazione
          </label>
          <input
            id="ghost-url"
            type="url"
            value={productUrl}
            onChange={(e) => setProductUrl(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
          />
        </div>
        <div className="md:col-span-3 space-y-1.5">
          <label htmlFor="ghost-margin" className="text-xs font-semibold text-slate-300 block">
            Margine Minimo Protetto (%)
          </label>
          <input
            id="ghost-margin"
            type="number"
            min={10}
            max={80}
            value={minMarginPct}
            onChange={(e) => setMinMarginPct(Number(e.target.value))}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-violet-500"
          />
        </div>
        <div className="md:col-span-3">
          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            {isOptimizing ? 'Generazione Micro-Test...' : 'Rigenera & Scala Varianti'}
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {variants.map((v) => (
          <div key={v.id} className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className={v.status === 'scaling' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                {v.status === 'scaling' ? 'In Scaling Automatico' : 'Spenta in 18 Secondi'}
              </span>
              <span className="font-mono text-slate-400">Conv: {v.convPct}</span>
            </div>
            <div className="text-sm font-bold text-white">{v.hook}</div>
            <div className="text-xs text-slate-400 font-mono">ROAS Misurato: <strong className="text-white">{v.roas}x</strong></div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// 4. PriceMorph: Motore di pricing empatico e dinamico per valore
// ============================================================================
export const PriceMorphView: React.FC = () => {
  const [profile, setProfile] = useState<'low_budget_high_visibility' | 'extreme_urgency_12h' | 'standard_enterprise'>('low_budget_high_visibility');
  const [basePrice, setBasePrice] = useState<number>(10000);

  const offer = computeEmpatheticOffer({ basePriceEuros: basePrice, buyerProfile: profile });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="border-b border-slate-800 pb-6">
        <div className="text-xs font-medium text-amber-400">
          PriceMorph · Scambio di Valore Empatico in Tempo Reale
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
          Non Cambiare Prezzo Arbitrariamente, Rimodula i Termini di Valore
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">
          Negozia silenziosamente i termini per ogni visitatore B2B: sconto in cambio di visibilità e pagamento anticipato se ha poca cassa, oppure corsia express 12 ore se ha urgenza estrema.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="text-xs font-semibold text-slate-300">Seleziona Profilo Visitatore B2B Rilevato:</div>
          <div className="space-y-2">
            {[
              { id: 'low_budget_high_visibility', label: 'Poca Liquidità, Alta Visibilità & Brand Noto' },
              { id: 'extreme_urgency_12h', label: 'Urgenza Estrema · Consegna Richiesta Entro 12 Ore' },
              { id: 'standard_enterprise', label: 'Azienda Enterprise Standard' },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setProfile(opt.id as any)}
                className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition-colors cursor-pointer ${
                  profile === opt.id
                    ? 'bg-amber-950/30 border-amber-500/60 text-white'
                    : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="space-y-1.5 pt-2">
            <label htmlFor="pm-base" className="text-xs text-slate-300 flex justify-between">
              <span>Valore Listino Base</span>
              <span className="font-mono font-bold text-white">€{basePrice.toLocaleString('it-IT')}</span>
            </label>
            <input
              id="pm-base"
              type="range"
              min={2000}
              max={50000}
              step={1000}
              value={basePrice}
              onChange={(e) => setBasePrice(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>
        </div>

        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="text-xs text-amber-400 font-semibold">Proposta Empatica Generata sul Momento</div>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-white font-mono">
              €{offer.finalPriceEuros.toLocaleString('it-IT')}
            </span>
            <span className="text-sm font-mono text-emerald-400">
              {offer.discountOrPremiumPct === 0
                ? 'Listino Standard'
                : `${offer.discountOrPremiumPct > 0 ? '+' : ''}${offer.discountOrPremiumPct}% vs listino`}
            </span>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2 text-xs">
            <div className="text-slate-400">Scambio di Valore Reciproco Proposto:</div>
            <div className="text-sm font-semibold text-white">{offer.valueExchangeClause}</div>
            <div className="text-slate-400 pt-1">SLA di Consegna: <span className="text-slate-200">{offer.deliverySla}</span></div>
          </div>

          <div className="text-xs text-emerald-400 font-medium">
            Incremento probabilità di chiusura rispetto a listino rigido: +{offer.conversionLiftPct}%
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 5. PivotEngine: Nuovi modelli di business dagli scarti aziendali
// ============================================================================
export const PivotEngineView: React.FC = () => {
  const [packagedIds, setPackagedIds] = useState<string[]>([]);

  const opportunities = [
    {
      id: 'piv1',
      wasteAsset: 'Dati anonimizzati sui flussi logistici e ritardi autostradali giornalieri',
      targetSector: 'Compagnie Assicurative & Cargo Analytics',
      monthlyRevenue: '€15.000 / mese',
      readyClients: '12 clienti potenziali già individuati',
      deliverable: 'API REST pronta su endpoint sicuro con chiavi di accesso',
    },
    {
      id: 'piv2',
      wasteAsset: 'Capacità presse CNC & forno industriale ferma tra le 22:00 e le 06:00',
      targetSector: 'Startup Hardware & Prototipazione Rapida Europea',
      monthlyRevenue: '€22.500 / mese',
      readyClients: '7 studi di design industriale in lista d\'attesa',
      deliverable: 'Portale prenotazione slot notturni chiavi in mano',
    },
  ];

  const handlePackage = (id: string) => {
    if (!packagedIds.includes(id)) {
      setPackagedIds([...packagedIds, id]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="border-b border-slate-800 pb-6">
        <div className="text-xs font-medium text-emerald-400">
          PivotEngine · Monetizzazione Risorse & Scarti Interni
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
          Nuove Linee di Business Chiavi in Mano da Ciò Che Hai Già
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">
          Incrocia dati non usati, capacità produttiva ferma o software interni con la domanda di altri settori industriali, impacchettando prodotti vendibili subito.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {opportunities.map((op) => {
          const isPackaged = packagedIds.includes(op.id);
          return (
            <div key={op.id} className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="text-xs font-semibold text-emerald-400">{op.targetSector}</div>
                <h2 className="text-base font-bold text-white">{op.wasteAsset}</h2>
                <div className="text-xs text-slate-300 space-y-1">
                  <div>Ricavo ricorrente stimato: <strong className="text-emerald-400 font-mono">{op.monthlyRevenue}</strong></div>
                  <div>Domanda individuata: <strong className="text-white">{op.readyClients}</strong></div>
                  <div>Prodotto pronto: <span className="text-slate-400">{op.deliverable}</span></div>
                </div>
              </div>

              <button
                onClick={() => handlePackage(op.id)}
                disabled={isPackaged}
                className={`w-full py-2.5 px-4 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                  isPackaged
                    ? 'bg-emerald-950/50 text-emerald-300 border border-emerald-500/30'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
              >
                {isPackaged ? 'API Impacchettata & Proposta Inviata ai Clienti' : 'Impacchetta Prodotto & Contatta Clienti'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================================
// 6. MicroFranchise: Clonatore istantaneo di modelli vincenti
// ============================================================================
export const MicroFranchiseView: React.FC = () => {
  const [city, setCity] = useState<string>('Bologna');
  const [clonedCities, setClonedCities] = useState<string[]>(['Torino', 'Milano Navigli']);

  const handleClone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim() || clonedCities.includes(city.trim())) return;
    setClonedCities([...clonedCities, city.trim()]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="border-b border-slate-800 pb-6">
        <div className="text-xs font-medium text-sky-400">
          MicroFranchise · Clonazione Turnkey di Business Vincenti
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
          Replica il Tuo Modello in Nuove Città in 72 Ore
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">
          Impacchetta flussi operativi, fornitori, margini e marketing locale in un kit pronto: chi acquista la licenza riceve sito locale, contratti e guida giornaliera versando royalty automatiche.
        </p>
      </div>

      <form onSubmit={handleClone} className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row gap-3 items-end">
        <div className="flex-1 w-full space-y-1.5">
          <label htmlFor="clone-city" className="text-xs font-semibold text-slate-300 block">
            Nuova Città da Attivare con Kit di Clonazione Automatico
          </label>
          <input
            id="clone-city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Es. Lione, Madrid, Bologna..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shrink-0"
        >
          Genera Kit & Apri Licenza Locale
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {clonedCities.map((c) => (
          <div key={c} className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="text-xs text-emerald-400 font-semibold">Licenza Operativa Attiva</div>
            <div className="text-base font-bold text-white">Hub {c}</div>
            <div className="text-xs text-slate-400">
              Sito locale, contratti fornitori zonali e campagne geo-localizzate avviati automaticamente.
            </div>
            <div className="text-xs font-mono text-sky-300 pt-1">Royalty Istantanea: 6% su incasso</div>
          </div>
        ))}
      </div>
    </div>
  );
};
