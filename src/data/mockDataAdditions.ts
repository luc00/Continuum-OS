import {
  NexusGovRegulation,
  BoardRoomScenario,
  VirtualBoardMember,
  TalentChallenge,
  BlindCandidate,
  DepartmentBioCapital,
} from '../types';

export const initialRegulations: NexusGovRegulation[] = [
  {
    id: 'reg-1',
    title: 'Nuova Direttiva UE sulla Fatturazione Elettronica B2B Transfrontaliera (ViDA 2026)',
    jurisdiction: 'Unione Europea (UE)',
    sector: 'Fiscale & Fatturazione',
    effectiveDate: '1 Luglio 2026',
    daysRemaining: 42,
    status: 'action_required',
    impactSummary:
      'Obbligo di emissione tempestiva entro 48 ore in formato XML conforme allo standard europeo con codici fiscali unificati. Rischio sanzioni fino al 9% del fatturato.',
    autoActions: {
      contractTemplateModified: 'Template contrattuale "Accordo Quadro B2B v4.2" aggiornato con clausola di fatturazione simultanea',
      auditedSuppliersCount: 3,
      compliantSuppliersCount: 3,
      regulatoryArticle: 'Art. 219/c-bis Direttiva IVA 2026/842',
    },
    complianceBlockSigned: false,
  },
  {
    id: 'reg-2',
    title: 'AI Act Europeo: Requisiti di Trasparenza e Registrazione Modelli ad Alto Rischio',
    jurisdiction: 'Unione Europea (UE)',
    sector: 'ESG & AI Act',
    effectiveDate: '15 Settembre 2026',
    daysRemaining: 118,
    status: 'proactively_applied',
    impactSummary:
      'Documentazione dell\'addestramento dei dataset e marcatura obbligatoria degli output generati da intelligenza artificiale per i consumatori finali.',
    autoActions: {
      contractTemplateModified: 'Disclaimer watermark automatico integrato nei portali di output cliente',
      auditedSuppliersCount: 8,
      compliantSuppliersCount: 8,
      regulatoryArticle: 'Art. 52 & 54 Regolamento (UE) 2024/1689',
    },
    complianceBlockSigned: true,
  },
  {
    id: 'reg-3',
    title: 'Decreto Sicurezza sul Lavoro: Protocollo di Ergonomia e Diritto alla Disconnessione',
    jurisdiction: 'Nazionale (IT)',
    sector: 'Sicurezza Lavoro',
    effectiveDate: '1 Ottobre 2026',
    daysRemaining: 134,
    status: 'action_required',
    impactSummary:
      'Monitoraggio obbligatorio dello stress da lavoro correlato con limite massimo di reperibilità serale fissato alle 19:30 nei contratti ibridi.',
    autoActions: {
      contractTemplateModified: 'Accordo individuale di smart working integrato con fascia di silenzio digitale inviolabile',
      auditedSuppliersCount: 2,
      compliantSuppliersCount: 2,
      regulatoryArticle: 'Art. 28 D.Lgs 81/08 aggiornato Legge 124/2026',
    },
    complianceBlockSigned: false,
  },
  {
    id: 'reg-4',
    title: 'Bando Transizione 5.0: Finanziamento a Fondo Perduto per Automazione e Server Cloud',
    jurisdiction: 'Nazionale (IT)',
    sector: 'Bandi & Agevolazioni',
    effectiveDate: '30 Giugno 2026',
    daysRemaining: 24,
    status: 'action_required',
    impactSummary:
      'Credito d\'imposta fino al 45% per investimenti che certificano un risparmio energetico dei server > 15%. Flussi ERP già pronti per la perizia giurata.',
    autoActions: {
      contractTemplateModified: 'Dossier tecnico automatico generato con asseverazione risparmio energetico 18.5%',
      auditedSuppliersCount: 1,
      compliantSuppliersCount: 1,
      regulatoryArticle: 'Art. 38 D.L. 19/2024 Decreto Attuativo MIMIT',
    },
    complianceBlockSigned: false,
  },
];

export const initialBoardRoomScenarios: BoardRoomScenario[] = [
  {
    id: 'sc-1',
    title: 'Calo Improvviso del 30% delle Vendite Enterprise nel Q3',
    category: 'Crollo Vendite 30%',
    initialConditions:
      'Il rinnovo di due grandi clienti enterprise è slittato a causa del blocco dei budget IT. Il fatturato mensile è sceso da 450.000€ a 315.000€.',
    currentEbitdaPct: 3.2,
    cashRunwayMonths: 7,
    proposedAction:
      'Congelare le assunzioni per 90 giorni, rinegoziare i contratti fornitore cloud e convertire i team di sviluppo su pacchetti ad alta conversione rapida.',
    projectedCost: '18.000 € (costi di riconfigurazione)',
  },
  {
    id: 'sc-2',
    title: 'Pivot Radicale da Licenze Perpetue a Modello 100% Subscription Cloud',
    category: 'Pivot Modello di Business',
    initialConditions:
      'I clienti chiedono flessibilità mensile ma il cash flow subirà una contrazione del 50% nei primi 6 mesi prima di risalire con MRR ricorrente.',
    currentEbitdaPct: 8.5,
    cashRunwayMonths: 14,
    proposedAction:
      'Accendere una linea di credito rotativa a basso costo e incentivare il passaggio anticipato con sconti pluriennali del 15% pagati upfront.',
    projectedCost: '120.000 € (riserva ammortamento)',
  },
  {
    id: 'sc-3',
    title: 'Acquisizione del Concorrente Diretto "NexaTech" per 12.000.000 €',
    category: 'Acquisizione Concorrente',
    initialConditions:
      'NexaTech è in difficoltà finanziaria ma possiede 85 clienti nel mercato DACH e un brevetto su algoritmi di compressione dati.',
    currentEbitdaPct: 6.8,
    cashRunwayMonths: 9,
    proposedAction:
      'Offerta con 4M€ in cassa, 4M€ in azioni di nuova emissione e 4M€ ad earn-out legato al mantenimento del 90% della clientela.',
    projectedCost: '12.000.000 €',
  },
];

export const initialVirtualBoardMembers: VirtualBoardMember[] = [
  {
    id: 'bm-buffett',
    name: 'Warren Buffett Clone',
    archetype: 'Warren Buffett (Risk & Value)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120',
    roleTitle: 'Chief Value & Risk Auditor',
    critiqueQuote:
      'Regola numero uno: non perdere denaro. Con 7 mesi di cassa non possiamo permetterci esperimenti speculativi. Proteggete il fossato competitivo e tagliate le spese inutili prima di toccare i prezzi.',
    riskToleranceScore: 16,
    stressTestFailureScenario:
      'Se il calo del fatturato dura 4 trimestri anziché 1, l\'azienda rischia di bruciare la cassa prima dell\'inversione del ciclo.',
    recommendation:
      'Accettare il piano di congelamento spese, ma evitare sconti disperati sui listini che distruggerebbero il pricing power a lungo termine.',
    vote: 'approve',
  },
  {
    id: 'bm-musk',
    name: 'Elon Musk Clone',
    archetype: 'Elon Musk (Hyper-Growth & Aggression)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120',
    roleTitle: 'Hyper-Scale & Velocity Lead',
    critiqueQuote:
      'Il congelamento difensivo è la morte lenta. Bisogna invece raddoppiare la velocità di spedizione dei prodotti e lanciare l\'offerta a prezzi dirompenti per rubare la clientela dei concorrenti più deboli.',
    riskToleranceScore: 88,
    stressTestFailureScenario:
      'La cautela eccessiva fa perdere slancio e porta alla paralisi da analisi proprio quando bisognerebbe colpire duro.',
    recommendation:
      'Ammettere il piano solo se accompagnato da una roadmap di prodotto accelerata a 30 giorni e incentivi aggressivi sul fatturato.',
    vote: 'conditional_amend',
  },
  {
    id: 'bm-drucker',
    name: 'Peter Drucker Clone',
    archetype: 'Peter Drucker (Organizational Strategy)',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120',
    roleTitle: 'Organizational Discipline Strategist',
    critiqueQuote:
      'La cultura mangia la strategia a colazione. Se tagliate le assunzioni senza riallineare gli obiettivi delle persone, genererete frustrazione e fuga dei talenti migliori.',
    riskToleranceScore: 38,
    stressTestFailureScenario:
      'Frattura della motivazione interna e calo della qualità del supporto ai clienti chiave.',
    recommendation:
      'Riorganizzare le priorità attorno ai 5 clienti più fedeli che generano l\'80% del margine operativo.',
    vote: 'approve',
  },
  {
    id: 'bm-kahneman',
    name: 'Daniel Kahneman Clone',
    archetype: 'Daniel Kahneman (Cognitive Biases)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120',
    roleTitle: 'Cognitive Bias Auditor',
    critiqueQuote:
      'State cadendo nel bias di conferma: credete che il calo sia solo temporaneo perché è doloroso ammettere che il mercato è cambiato strutturalmente.',
    riskToleranceScore: 24,
    stressTestFailureScenario:
      'Planning Fallacy: le stime di recupero in 90 giorni si basano sul migliore scenario possibile, non sulla media statistica.',
    recommendation:
      'Effettuare un "Pre-Mortem": assumiamo che tra 6 mesi l\'azienda sia insolvente. Perché è successo? Ora risolviamo quella causa specifica.',
    vote: 'conditional_amend',
  },
];

export const initialTalentChallenges: TalentChallenge[] = [
  {
    id: 'tc-1',
    title: 'Risoluzione Abbandono Carrello al 40% & Disallineamento Database PostgreSQL',
    department: 'Software Engineering & Growth',
    businessContext:
      'Durante i picchi promozionali, le transazioni concorrenti generano lock di riga sulla tabella `inventory_reservations`, causando timeout di 4 secondi e abbandono del 40% dei clienti nel checkout.',
    objective:
      'Scrivere una soluzione architetturale (o refactoring codice) che elimini i lock di riga, garantisca la coerenza di cassa e mantenga la latenza p99 sotto i 35ms.',
    timeLimitHours: 4,
    activeSubmissionsCount: 42,
    benchmarkPercentileAvg: 71,
  },
  {
    id: 'tc-2',
    title: 'Algoritmo di Pricing Dinamico B2B con Vincoli di Margine Operativo e Resi',
    department: 'Pricing Strategy & Data Science',
    businessContext:
      'La fluttuazione dei carburanti e l\'inflazione fornitore erodono i margini sui contratti a lungo termine. Serve un calcolatore predittivo dei ricarichi.',
    objective:
      'Modellare una formula di tariffazione automatica basata su indici ISTAT e soglia di sicurezza minima del 14% di margine netto.',
    timeLimitHours: 3,
    activeSubmissionsCount: 28,
    benchmarkPercentileAvg: 68,
  },
];

export const initialBlindCandidates: BlindCandidate[] = [
  {
    id: 'cand-1',
    candidateCode: '#EXEC-8492',
    challengeId: 'tc-1',
    executionScore: 98,
    logicQualityScore: 96,
    algorithmicEfficiencyScore: 97,
    timeSpentMinutes: 38,
    solutionSnippet: `// Soluzione Ottimizzata di #EXEC-8492
// Approccio: Atomic Decrement con Redis LUA script + Asynchronous Ledger Queue
export async function reserveStockAtomic(skuId: string, qty: number, txId: string): Promise<ReservationResult> {
  const luaScript = \`
    local current = redis.call('GET', KEYS[1])
    if not current or tonumber(current) < tonumber(ARGV[1]) then
      return 0
    end
    redis.call('DECRBY', KEYS[1], ARGV[1])
    return 1
  \`;
  const reserved = await redis.eval(luaScript, 1, \`stock:\${skuId}\`, qty);
  if (!reserved) return { success: false, reason: 'INSUFFICIENT_STOCK' };
  
  // Pipeline non-bloccante verso PostgreSQL con idempotency key
  await eventQueue.push('STOCK_RESERVED', { skuId, qty, txId, timestamp: Date.now() });
  return { success: true, latencyMs: 2.4 };
}`,
    keyStrengths: [
      'Eliminazione totale dei lock sul database relazionale',
      'Latenza scesa da 4.200ms a soli 2.4ms (99.9% più veloce)',
      'Idempotenza perfetta con LUA script atomico',
    ],
    biasFreeBadge: 'Zero Bias Certificato · Valutato al 100% su Benchmark di Codice Puro',
    selectedForOffer: false,
  },
  {
    id: 'cand-2',
    candidateCode: '#EXEC-3109',
    challengeId: 'tc-1',
    executionScore: 92,
    logicQualityScore: 90,
    algorithmicEfficiencyScore: 89,
    timeSpentMinutes: 42,
    solutionSnippet: `// Soluzione di #EXEC-3109
// Approccio: PostgreSQL Advisory Locks con SKIP LOCKED
SELECT id, available_qty 
FROM inventory_items 
WHERE sku = $1 
FOR UPDATE SKIP LOCKED;
-- Esegue la deduzione solo sulle righe libere senza mandare in stallo il pool HTTP`,
    keyStrengths: [
      'Nessuna dipendenza infrastrutturale aggiuntiva richiesta',
      'Uso corretto delle primitive SKIP LOCKED di Postgres',
      'Latenza ridotta a 28ms sotto carico elevato',
    ],
    biasFreeBadge: 'Zero Bias Certificato · Valutato al 100% su Benchmark di Codice Puro',
    selectedForOffer: false,
  },
  {
    id: 'cand-3',
    candidateCode: '#EXEC-7724',
    challengeId: 'tc-1',
    executionScore: 88,
    logicQualityScore: 94,
    algorithmicEfficiencyScore: 84,
    timeSpentMinutes: 51,
    solutionSnippet: `// Soluzione di #EXEC-7724
// Approccio: Batch Processing con In-Memory Ring Buffer & Deduping
export class StockRingBuffer {
  private queue = new Map<string, number>();
  // Accumula le richieste per 20ms e le processa con una singola istruzione CASE WHEN
}`,
    keyStrengths: [
      'Architettura robusta orientata al micro-batching',
      'Gestione impeccabile degli edge case di timeout di rete',
      'Documentazione inline esemplare e suite di test al 100%',
    ],
    biasFreeBadge: 'Zero Bias Certificato · Valutato al 100% su Benchmark di Codice Puro',
    selectedForOffer: false,
  },
];

export const initialDepartmentBioCapital: DepartmentBioCapital[] = [
  {
    id: 'd-sales',
    department: 'Vendite & Business Dev',
    headcount: 14,
    recoveryScore: 38,
    strainWorkloadRatio: 1.62,
    chronicFatigueRisk: 'critical',
    projectedNextWeekHours: 64,
    rebalancedSchedule: {
      tasksShiftedCount: 16,
      destinationDepartment: 'Customer Success & Operations (Fresco, Recovery 88%)',
      shieldedRecoveryHours: 48,
      status: 'pending_confirmation',
    },
  },
  {
    id: 'd-product',
    department: 'Design & UX Research',
    headcount: 8,
    recoveryScore: 74,
    strainWorkloadRatio: 1.10,
    chronicFatigueRisk: 'optimal',
    projectedNextWeekHours: 37,
  },
  {
    id: 'd-eng',
    department: 'Core Software Engineering',
    headcount: 22,
    recoveryScore: 65,
    strainWorkloadRatio: 1.28,
    chronicFatigueRisk: 'moderate',
    projectedNextWeekHours: 42,
  },
  {
    id: 'd-cs',
    department: 'Customer Success & Operations',
    headcount: 18,
    recoveryScore: 88,
    strainWorkloadRatio: 0.82,
    chronicFatigueRisk: 'optimal',
    projectedNextWeekHours: 34,
  },
];
