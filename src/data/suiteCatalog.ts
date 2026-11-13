import { SuiteCategory, SuiteTab } from '../types';

export interface PillarMeta {
  id: SuiteCategory;
  name: string;
  shortName: string;
  description: string;
}

export interface EngineCatalogItem {
  id: SuiteTab;
  title: string;
  badge: string;
  subtitle: string;
  problem: string;
  solution: string;
  kpiLabel: string;
  kpiValue: string;
  pillar: SuiteCategory;
  pillarLabel: string;
  actionText: string;
  isNew?: boolean;
}

export const SUITE_PILLARS: PillarMeta[] = [
  {
    id: 'autonomy',
    name: 'Autonomia & Zero-Attrito Personale',
    shortName: 'Autonomia',
    description: 'Elimina il riscaldamento mentale, la tastiera, le email superflue e le interfacce rigide.',
  },
  {
    id: 'people',
    name: 'Collaborazione, Persone & Energia',
    shortName: 'Persone',
    description: 'Protegge lucidità biologica, cultura aziendale, call asincrone e competenze nascoste.',
  },
  {
    id: 'execution',
    name: 'Talenti, R&D & Esecuzione',
    shortName: 'Esecuzione',
    description: 'Hiring cieco senza CV, R&D distribuita, brevetti automatici, burocrazia in 10 secondi.',
  },
  {
    id: 'market',
    name: 'Mercato, Clienti & Crescita',
    shortName: 'Mercato',
    description: 'Co-creazione prototipi, radiografia competitor, campagne auto-adattive, pricing empatico e franchising.',
  },
  {
    id: 'finance',
    name: 'Finanza, Filiera & Accordi',
    shortName: 'Finanza & Filiera',
    description: 'Tesoreria ad alta frequenza, filiera satellitare predittiva, escrow IoT, M&A anonimo e contratti.',
  },
  {
    id: 'governance',
    name: 'Governance, Sicurezza & Verità',
    shortName: 'Governance',
    description: 'Conformità normativa anticipata, board virtuali, scudo omomorfico ZeroLeak, fonti e reputazione.',
  },
];

export const SUITE_ENGINES: EngineCatalogItem[] = [
  // ==========================================================
  // PILASTRO 1: AUTONOMIA & ZERO-ATTRITO PERSONALE (6 Motori)
  // ==========================================================
  {
    id: 'contextflow',
    title: 'ContextFlow',
    badge: 'Continuità del Lavoro',
    subtitle: 'Il sistema operativo per azzerare il riscaldamento cognitivo',
    problem:
      'Quando cambi task o riprendi un progetto dopo il weekend, perdi fino a 40 minuti a ricreare il contesto mentale tra file, chat e priorità.',
    solution:
      'Mappa in tempo reale il flusso cross-app (Slack, Figma, IDE, documenti). La mattina ricostruisce la tua esatta scrivania digitale alla riga esatta.',
    kpiLabel: 'Warmup risparmiato',
    kpiValue: '44 minuti',
    pillar: 'autonomy',
    pillarLabel: 'Autonomia',
    actionText: 'Apri Digital Desk',
  },
  {
    id: 'shadowself',
    title: 'ShadowSelf',
    badge: 'Gemello Digitale',
    subtitle: 'Il tuo gemello digitale negoziatore ed esecutore',
    problem:
      'Anche con gli assistenti odierni devi leggere decine di email, approvare bozze e prendere micro-decisioni ripetitive.',
    solution:
      'Gemello digitale addestrato sui tuoi limiti di budget ed etica che negozia con i gemelli di colleghi e clienti, sottoponendoti solo le 2 scelte strategiche.',
    kpiLabel: 'Micro-interazioni autonome',
    kpiValue: '42 gestite / giorno',
    pillar: 'autonomy',
    pillarLabel: 'Autonomia',
    actionText: 'Configura ShadowSelf',
  },
  {
    id: 'chronosculptor',
    title: 'ChronoSculptor',
    badge: 'Ritmo Biologico',
    subtitle: 'Il regista del tuo ritmo biologico e cognitivo',
    problem:
      'I calendari tradizionali trattano tutte le ore allo stesso modo, ignorando la fluttuazione della lucidità mentale durante la giornata.',
    solution:
      'Sincronizza l\'agenda con dati biometrici: in fase di iper-focus alza uno scudo notifiche e sposta le call burocratiche al pomeriggio con scuse diplomatiche.',
    kpiLabel: 'Stato di flow protetto',
    kpiValue: '3.5 ore / giorno',
    pillar: 'autonomy',
    pillarLabel: 'Autonomia',
    actionText: 'Scolpisci Agenda',
  },
  {
    id: 'zeroui',
    title: 'ZeroUI Workspace',
    badge: 'Zero-Software',
    subtitle: 'Il sito che distrugge i software e genera interfacce al volo',
    problem:
      'Saltare tra 15 schede del browser (CRM, fogli di calcolo, gestionali, email), adattando il cervello a interfacce rigide pensate da altri.',
    solution:
      'Una pagina web che si auto-assembla in tempo reale intorno al tuo obiettivo: scrivi cosa devi fare e genera timeline, simulatore costi e fornitori su misura.',
    kpiLabel: 'Tempo assemblaggio',
    kpiValue: '1.2 secondi',
    pillar: 'autonomy',
    pillarLabel: 'Autonomia',
    actionText: 'Genera Interfaccia',
  },
  {
    id: 'tabzero',
    title: 'TabZero',
    badge: 'Ufficio Vocal-Visivo',
    subtitle: 'L\'ufficio vocal-visivo senza tastiera né finestre',
    problem:
      'Passare ore curvi sulla tastiera a cercare file nelle cartelle, copiare dati da Excel a una email, formattare report e fare decine di clic banali.',
    solution:
      'Esecutore visivo comandato a voce: chiedi di confrontare vendite, pulire righe sotto i 100€ e preparare la mail per Luca, e lo schermo assembla tutto sotto i tuoi occhi.',
    kpiLabel: 'Clic e finestre risparmiati',
    kpiValue: 'Zero tastiera',
    pillar: 'autonomy',
    pillarLabel: 'Autonomia',
    actionText: 'Apri Console Vocale',
    isNew: true,
  },
  {
    id: 'inboxzero',
    title: 'InboxZero AutoPilot',
    badge: 'Posta Autonoma',
    subtitle: 'Il filtro empatico che risponde, smista e cancella il rumore',
    problem:
      'Aprire la casella email la mattina e trovare 80 messaggi, newsletter inutili e richieste vaghe, perdendo 2 ore solo a capire cosa è urgente.',
    solution:
      'Segretario capo silenzioso: archivia il rumore, risponde alle richieste standard col tuo stile e distilla le email cruciali in schede a 3 scelte rapide.',
    kpiLabel: 'Tempo svuotamento posta',
    kpiValue: '3 min invece di 2h',
    pillar: 'autonomy',
    pillarLabel: 'Autonomia',
    actionText: 'Svuota Inbox Ora',
    isNew: true,
  },

  // ==========================================================
  // PILASTRO 2: COLLABORAZIONE, PERSONE & ENERGIA (6 Motori)
  // ==========================================================
  {
    id: 'asyncsync',
    title: 'AsyncSync',
    badge: 'Asincrono 100%',
    subtitle: 'Micro-video contestuali e tracciabili strutturati come codice',
    problem:
      'Le riunioni di allineamento rubano ore preziose, mentre i messaggi scritti mancano di sfumature e generano scambi infiniti.',
    solution:
      'Micro-video da 60 secondi con trascrizione sincronizzata, estrazione automatica di to-do list e commenti puntuali al secondo esatto.',
    kpiLabel: 'Riunioni evitate',
    kpiValue: '6.5 ore / sett',
    pillar: 'people',
    pillarLabel: 'Persone',
    actionText: 'Esplora Micro-Video',
  },
  {
    id: 'skillmesh',
    title: 'SkillMesh',
    badge: 'Talenti Nascosti',
    subtitle: 'Il mercato interno delle competenze aziendali sommerse',
    problem:
      'Si cerca un\'abilità all\'esterno quando magari un collega di un altro reparto la possiede per studi precedenti o passione, ma nessuno lo sa.',
    solution:
      'LinkedIn interno intelligente: se serve una macro Excel complessa o olandese antico, individua subito Giulia di Logistica per 15 minuti di micro-mentoring.',
    kpiLabel: 'Talenti mappati',
    kpiValue: '142 competenze',
    pillar: 'people',
    pillarLabel: 'Persone',
    actionText: 'Trova Talenti',
  },
  {
    id: 'burnoutradar',
    title: 'BurnoutRadar',
    badge: 'Metadati Privacy-Safe',
    subtitle: 'Il termometro predittivo del carico cognitivo dei team',
    problem:
      'I manager si accorgono del burnout quando arrivano dimissioni o errori gravi, perché i sondaggi tradizionali sono falsati dalla paura.',
    solution:
      'Analizza i metadati (orari email, frammentazione calendario, cambi di contesto) senza leggere i contenuti, proponendo interventi pratici 3 settimane prima.',
    kpiLabel: 'Interventi anticipati',
    kpiValue: '3 settimane prima',
    pillar: 'people',
    pillarLabel: 'Persone',
    actionText: 'Verifica Team',
  },
  {
    id: 'biocapital',
    title: 'BioCapital',
    badge: 'ROI Energetico',
    subtitle: 'Il gestore del ROI energetico e mentale del team',
    problem:
      'Trattiamo il capitale finanziario come unica risorsa preziosa, ignorando che lucidità mentale ed energia cognitiva sono il vero collo di bottiglia.',
    solution:
      'Monitora sforzo e recupero tramite wearable aggregati. Se rileva stanchezza cronica nelle Vendite, sposta automaticamente i carichi sui team più freschi.',
    kpiLabel: 'Ore recupero protette',
    kpiValue: '48 ore / ciclo',
    pillar: 'people',
    pillarLabel: 'Persone',
    actionText: 'Ottimizza BioCapitale',
  },
  {
    id: 'cultureos',
    title: 'CultureOS',
    badge: 'Rete Neurale Team',
    subtitle: 'Sistema immunitario contro tossicità, silos e progetti duplicati',
    problem:
      'Crescendo velocemente si creano silos tra reparti che non si parlano, i collaboratori chiave restano invisibili e due team duplicano lo stesso lavoro.',
    solution:
      'Mappa la rete neurale reale della collaborazione: valorizza i "connettori invisibili", propone micro-rotazioni e blocca sul nascere i progetti duplicati.',
    kpiLabel: 'Connettori protetti',
    kpiValue: 'Zero silos attivi',
    pillar: 'people',
    pillarLabel: 'Persone',
    actionText: 'Mappa Rete Aziendale',
    isNew: true,
  },
  {
    id: 'meetingskipper',
    title: 'MeetingSkipper',
    badge: 'Avatar Silente Call',
    subtitle: 'Il tuo avatar partecipante che ti fa saltare le riunioni inutili',
    problem:
      'Partecipare a call di un\'ora in cui parli per 2 minuti o che servono solo per aggiornamenti di stato, bloccando il lavoro profondo.',
    solution:
      'Invia il tuo agente silente nella call: prende appunti, risponde in chat se vieni citato e ti manda un avviso "Entra ora" solo quando scatta una decisione critica.',
    kpiLabel: 'Ore di call saltate',
    kpiValue: '85% call delegate',
    pillar: 'people',
    pillarLabel: 'Persone',
    actionText: 'Invia Avatar in Call',
    isNew: true,
  },

  // ==========================================================
  // PILASTRO 3: TALENTI, R&D & ESECUZIONE (6 Motori)
  // ==========================================================
  {
    id: 'legacybridge',
    title: 'LegacyBridge',
    badge: 'Processi Tribali',
    subtitle: 'Traduttore istantaneo di procedure critiche in manuali interattivi',
    problem:
      'Procedure vitali custodite nella testa di una sola persona ("Chiedi a Mario sull\'AS/400"). Quando va in pensione, l\'azienda rischia il blocco.',
    solution:
      'Osserva passivamente lo schermo dell\'esperto e trasforma i clic in un manuale step-by-step con alberi decisionali d\'errore e simulatore per neoassunti.',
    kpiLabel: 'Tempo onboarding',
    kpiValue: '-70% su legacy',
    pillar: 'execution',
    pillarLabel: 'Esecuzione',
    actionText: 'Apri Manuale Mario',
  },
  {
    id: 'talentmatrix',
    title: 'TalentMatrix',
    badge: 'Hiring Senza CV',
    subtitle: 'Reclutamento basato su progetti reali e simulazioni, zero CV',
    problem:
      'I curriculum e i colloqui premiano chi sa vendersi a parole, non chi sa risolvere i problemi reali aziendali.',
    solution:
      'Pubblica una micro-sfida tecnica estratta dal tuo business; i candidati lavorano in sandbox anonima e ricevi i top 3 esecutori senza bias di età o titolo.',
    kpiLabel: 'Bias di selezione',
    kpiValue: 'Zero (100% blind)',
    pillar: 'execution',
    pillarLabel: 'Esecuzione',
    actionText: 'Vedi Top 3 Esecutori',
  },
  {
    id: 'outcomemarket',
    title: 'OutcomeMarket',
    badge: 'Borsa Risultati',
    subtitle: 'La borsa istantanea dei risultati chiusi, non dei freelance',
    problem:
      'Per risolvere un collo di bottiglia perdi giorni tra call conoscitive, preventivi lenti e tariffe orarie opache.',
    solution:
      'Pubblica un pacchetto chiuso con budget e SLA (es. 500 PDF in SQL in 4h per 250€): esecuzione parallela e test automatici senza scambiare messaggi.',
    kpiLabel: 'Call necessarie',
    kpiValue: 'Zero messaggi',
    pillar: 'execution',
    pillarLabel: 'Esecuzione',
    actionText: 'Apri Borsa Risultati',
  },
  {
    id: 'swarmlabs',
    title: 'SwarmLabs',
    badge: 'R&D Distribuita',
    subtitle: 'Ricerca e sviluppo parallela in 48 ore sotto simulazione cifrata',
    problem:
      'Fare R&D tradizionale richiede laboratori costosi, team fissi e anni di tentativi per risolvere un singolo problema chimico, ingegneristico o algoritmico.',
    solution:
      'Carica il problema come simulazione digitale crittografata: milioni di agenti IA e ricercatori competono per 48h, pagando il premio solo a parametri centrati.',
    kpiLabel: 'Tempo prototipazione R&D',
    kpiValue: '48 ore garantite',
    pillar: 'execution',
    pillarLabel: 'Esecuzione',
    actionText: 'Lancia Sciame R&D',
    isNew: true,
  },
  {
    id: 'patentforge',
    title: 'PatentForge',
    badge: 'Brevetti & Difesa IP',
    subtitle: 'Incubatore automatico di brevetti e difesa attiva del copyright',
    problem:
      'Sviluppi algoritmi o processi brillanti senza sapere che sono brevettabili, oppure vieni copiato dai concorrenti sui marketplace senza accorgertene.',
    solution:
      'Scansiona repo R&D contro i registri brevetti globali redigendo la bozza tecnica di deposito, mentre individua violazioni online avviando diffide automatiche.',
    kpiLabel: 'Idee brevettabili trovate',
    kpiValue: '3 bozze pronte',
    pillar: 'execution',
    pillarLabel: 'Esecuzione',
    actionText: 'Scansiona IP & Diffide',
    isNew: true,
  },
  {
    id: 'oneclickbureaucracy',
    title: 'OneClick Bureaucracy',
    badge: 'Passaporto Pratiche',
    subtitle: 'Il distruttore istantaneo di moduli, bandi, PEC e scartoffie',
    problem:
      'Riscrivere gli stessi dati anagrafici su decine di portali diversi, formattare PDF, scansionare deleghe e inviare PEC per ogni singola pratica.',
    solution:
      'Carichi i documenti aziendali una sola volta. Incolli il link della pratica: il portale compila tutto all\'esterno e chiede solo la tua impronta digitale finale.',
    kpiLabel: 'Tempo pratica completo',
    kpiValue: '10 secondi',
    pillar: 'execution',
    pillarLabel: 'Esecuzione',
    actionText: 'Incolla Link Pratica',
    isNew: true,
  },

  // ==========================================================
  // PILASTRO 4: MERCATO, CLIENTI & CRESCITA (6 Motori)
  // ==========================================================
  {
    id: 'customerdna',
    title: 'CustomerDNA',
    badge: 'Co-Creazione & Pre-Ordini',
    subtitle: 'Co-creazione predittiva su prototipi virtuali con domanda esatta',
    problem:
      'I sondaggi annoiano e i dati storici arrivano tardi rispetto ai trend reali di ciò che il cliente vuole davvero comprare domani.',
    solution:
      'I clienti modificano prototipi virtuali interattivi in tempo reale: aggrega migliaia di micro-scelte per predire esattamente pre-ordini e prezzo ottimale.',
    kpiLabel: 'Pre-ordini verificati',
    kpiValue: '1.400 a €89',
    pillar: 'market',
    pillarLabel: 'Mercato',
    actionText: 'Testa Prototipo Live',
    isNew: true,
  },
  {
    id: 'competitorxray',
    title: 'CompetitorX-Ray',
    badge: 'Intelligence Legale',
    subtitle: 'La radiografia strategica in tempo reale della roadmap concorrenti',
    problem:
      'Guardare i siti dei rivali o leggere bilanci dell\'anno scorso significa osservare uno specchietto retrovisore già vecchio.',
    solution:
      'Aggrega assunzioni appena pubblicate, domini registrati, brevetti e diff di app per svelare la prossima mossa del rivale e suggerire 3 contromosse.',
    kpiLabel: 'Anticipo strategico',
    kpiValue: '4 mesi di vantaggio',
    pillar: 'market',
    pillarLabel: 'Mercato',
    actionText: 'Vedi Roadmap Rivali',
    isNew: true,
  },
  {
    id: 'ghostagency',
    title: 'GhostAgency',
    badge: 'Marketing Auto-Adattivo',
    subtitle: 'Fabbrica istantanea di campagne e offerte matematicamente profittevoli',
    problem:
      'Agenzie costose, settimane per produrre creatività e budget bruciato in A/B test manuali lenti su canali statici.',
    solution:
      'Inserisci link prodotto e margine minimo: genera migliaia di micro-varianti, spegne subito ciò che perde, riscrive il bundle in tempo reale e scala i vincitori.',
    kpiLabel: 'ROAS netto autonomo',
    kpiValue: '4.6x garantito',
    pillar: 'market',
    pillarLabel: 'Mercato',
    actionText: 'Avvia Fabbrica Ads',
    isNew: true,
  },
  {
    id: 'pricemorph',
    title: 'PriceMorph',
    badge: 'Pricing Empatico',
    subtitle: 'Motore di offerta dinamica e scambio di valore in tempo reale',
    problem:
      'I listini fissi lasciano denaro sul tavolo ed escludono clienti validi, mentre il dynamic pricing aggressivo viene percepito come ingiusto.',
    solution:
      'Ristruttura i termini dell\'offerta su misura: sconto 30% in cambio di caso studio pubblico se manca budget, oppure consegna express 12h premium per chi ha urgenza.',
    kpiLabel: 'Conversione marginale',
    kpiValue: '+44% su lead salvati',
    pillar: 'market',
    pillarLabel: 'Mercato',
    actionText: 'Simula Offerta Empatica',
    isNew: true,
  },
  {
    id: 'pivotengine',
    title: 'PivotEngine',
    badge: 'Monetizzazione Scarti',
    subtitle: 'Generatore di nuovi business chiavi in mano dalle risorse interne',
    problem:
      'Ogni azienda lascia inutilizzati dati logistici, capacità server/macchinari ferma, software interni e scarti di lavorazione.',
    solution:
      'Incrocia l\'inventario degli scarti aziendali con i bisogni di altri settori, impacchettando API o sottoprodotti pronti da vendere con clienti già individuati.',
    kpiLabel: 'Nuovi ricavi passivi',
    kpiValue: '€15.000 / mese API',
    pillar: 'market',
    pillarLabel: 'Mercato',
    actionText: 'Scopri Nuovi Ricavi',
    isNew: true,
  },
  {
    id: 'microfranchise',
    title: 'MicroFranchise',
    badge: 'Clonazione Format',
    subtitle: 'Il clonatore istantaneo chiavi in mano di modelli vincenti',
    problem:
      'Espandere un format locale di successo in nuove città o nazioni richiede anni di manualistica legale, fornitori e capitali enormi.',
    solution:
      'Impacchetta i flussi operativi in un kit replicabile: chi compra la licenza ottiene sito locale, contratti fornitori e campagne geo-localizzate, versandoti royalty.',
    kpiLabel: 'Tempo apertura filiale',
    kpiValue: '72 ore chiavi in mano',
    pillar: 'market',
    pillarLabel: 'Mercato',
    actionText: 'Clona Modello Business',
    isNew: true,
  },

  // ==========================================================
  // PILASTRO 5: FINANZA, FILIERA & ACCORDI (7 Motori)
  // ==========================================================
  {
    id: 'negotiatezero',
    title: 'NegotiateZero',
    badge: 'Trattative Cieche B2B',
    subtitle: 'Sandbox crittografata per accordi B2B senza settimane di redlining',
    problem:
      'Chiudere un contratto richiede settimane di email avanti e indietro, telefonate snervanti e revisioni legali PDF.',
    solution:
      'Entrambe le aziende inseriscono privatamente linee rosse e flessibilità: l\'algoritmo incrocia i dati alla cieca proponendo subito la sintesi ottimale.',
    kpiLabel: 'Tempo contrattazione',
    kpiValue: 'Da 4 sett a 15 min',
    pillar: 'finance',
    pillarLabel: 'Finanza & Filiera',
    actionText: 'Apri Sandbox B2B',
  },
  {
    id: 'trustescrow',
    title: 'TrustEscrow',
    badge: 'Caveau IoT & Dogana',
    subtitle: 'Fiducia istantanea globale con rilascio automatico a tranche',
    problem:
      'Collaborare con partner esteri sconosciuti espone a rischi di insolvenza e obbliga a spendere fortune in lettere di credito bancarie.',
    solution:
      'I fondi restano bloccati nel caveau digitale e vengono sbloccati automaticamente dai sensori IoT e dogana (20% uscita fabbrica, 30% sdoganamento, 50% QA finale).',
    kpiLabel: 'Rischio controparte',
    kpiValue: '0% senza avvocati',
    pillar: 'finance',
    pillarLabel: 'Finanza & Filiera',
    actionText: 'Configura Caveau IoT',
    isNew: true,
  },
  {
    id: 'liquidcash',
    title: 'LiquidCash',
    badge: 'Tesoreria Autonoma HFT',
    subtitle: 'Factoring frazionato invisibile e rendimento automatico weekend',
    problem:
      'Fatture pagate a 60/90 giorni creano buchi di cassa improvvisi mentre la liquidità ferma sul conto rende zero.',
    solution:
      'Gestisce il conto come trading ad alta frequenza: vende solo la frazione di credito esatta per coprire i buchi e investe la cassa del weekend fino alle 8:00 di lunedì.',
    kpiLabel: 'Buchi cassa coperti',
    kpiValue: 'Zero burocrazia',
    pillar: 'finance',
    pillarLabel: 'Finanza & Filiera',
    actionText: 'Ottimizza Tesoreria',
    isNew: true,
  },
  {
    id: 'supplypulse',
    title: 'SupplyPulse',
    badge: 'Filiera Satellitare',
    subtitle: 'Gemello digitale predittivo della supply chain e blocchi opzione',
    problem:
      'Crisi geopolitiche, porti bloccati e impennate materie prime vengono scoperti solo quando i margini sono già bruciati.',
    solution:
      'Incrocia dati satellitari e doganali lungo tutta la filiera Tier-2/Tier-3: ti avvisa settimane prima e blocca in automatico l\'opzione di acquisto alternativa in Europa.',
    kpiLabel: 'Anticipo su ritardi',
    kpiValue: '18 giorni salvati',
    pillar: 'finance',
    pillarLabel: 'Finanza & Filiera',
    actionText: 'Controlla Rischio Filiera',
    isNew: true,
  },
  {
    id: 'mergermatch',
    title: 'MergerMatch',
    badge: 'M&A & Alleanze Cieche',
    subtitle: 'Borsa silenziosa e anonima per alleanze, fusioni e joint venture',
    problem:
      'Cercare acquisizioni o partner distributivi richiede mesi di advisor costosi e rischia di far trapelare voci sul mercato.',
    solution:
      'Incrocia asset sottoutilizzati e colli di bottiglia strategici in totale anonimato, svelando i nomi solo dopo la doppia validazione matematica ed economica.',
    kpiLabel: 'Segretezza trattativa',
    kpiValue: '100% blind match',
    pillar: 'finance',
    pillarLabel: 'Finanza & Filiera',
    actionText: 'Trova Partner M&A',
    isNew: true,
  },
  {
    id: 'autofollowup',
    title: 'AutoFollowUp',
    badge: 'Segugio Gentile Impegni',
    subtitle: 'Traccia e sollecita autonomamente preventivi e documenti mancanti',
    problem:
      'Ricordarsi chi non ha firmato un preventivo o dover scrivere imbarazzanti email di sollecito per ottenere un documento.',
    solution:
      'Cattura ogni impegno preso via chat, voce o mail: se scadono le 48 ore gestisce i solleciti calibrando il tono e cambiando canale fino al risultato ottenuto.',
    kpiLabel: 'Preventivi recuperati',
    kpiValue: '+31% incassi chiusi',
    pillar: 'finance',
    pillarLabel: 'Finanza & Filiera',
    actionText: 'Monitora Impegni',
    isNew: true,
  },
  {
    id: 'futurecast',
    title: 'FutureCast',
    badge: 'Galleria del Vento',
    subtitle: 'Simulatore di 1.000 scenari di reazione prima del "Click"',
    problem:
      'Inviare proposte commerciali delicate o cambiare listini navigando a vista nella speranza che il destinatario accetti.',
    solution:
      'Galleria del vento digitale: simula 1.000 scenari di reazione sul testo, evidenzia la frase ad alto attrito e propone la riformulazione che massimizza la chiusura.',
    kpiLabel: 'Tasso di chiusura',
    kpiValue: '+38% probabilità',
    pillar: 'finance',
    pillarLabel: 'Finanza & Filiera',
    actionText: 'Simula Proposta',
  },

  // ==========================================================
  // PILASTRO 6: GOVERNANCE, SICUREZZA & VERITÀ (6 Motori)
  // ==========================================================
  {
    id: 'nexusgov',
    title: 'NexusGov',
    badge: 'Conformità Predittiva',
    subtitle: 'Sistema operativo per conformità normativa, fiscale e bandi',
    problem:
      'Migliaia di ore perse in consulenze per rincorrere leggi fiscali, GDPR, sicurezza sul lavoro e bandi, rischiando sanzioni per ogni distrazione.',
    solution:
      'Collegato ai flussi ERP: modifica in anticipo i template contrattuali prima che la legge entri in vigore, verifica i fornitori e prepara la firma a 1 clic.',
    kpiLabel: 'Sanzioni evitate',
    kpiValue: '€185.000 / anno',
    pillar: 'governance',
    pillarLabel: 'Governance',
    actionText: 'Verifica Conformità',
  },
  {
    id: 'boardroom',
    title: 'BoardRoom',
    badge: 'CdA Virtuale Crisi',
    subtitle: 'Sala di simulazione strategica con cloni IA dei grandi imprenditori',
    problem:
      'Di fronte a un crollo vendite o un pivot drastico, il consiglio di amministrazione discute spesso al buio affidandosi all\'intuito.',
    solution:
      'Sottoponi il piano a un board virtuale (Buffett, Musk, Drucker, Kahneman): scovano punti deboli, simulano fallimenti a catena e mettono alla prova la tua difesa.',
    kpiLabel: 'Sopravvivenza piano',
    kpiValue: 'Stress-testato',
    pillar: 'governance',
    pillarLabel: 'Governance',
    actionText: 'Entra in BoardRoom',
  },
  {
    id: 'decisionledger',
    title: 'DecisionLedger',
    badge: 'Memoria Storica Perché',
    subtitle: 'L\'archivio vivo del perché aziendale e delle alternative scartate',
    problem:
      'A distanza di un anno nessuno ricorda perché una scelta fu presa o scartata, portando i nuovi team a ripetere errori già pagati.',
    solution:
      'Cattura alternative valutate, metriche e rischi accettati al momento della scelta, consentendo di interrogare la memoria storica come un consulente.',
    kpiLabel: 'Audit trail storico',
    kpiValue: '84 scelte indicizzate',
    pillar: 'governance',
    pillarLabel: 'Governance',
    actionText: 'Interroga Memoria',
  },
  {
    id: 'proofguard',
    title: 'ProofGuard',
    badge: 'Validatore Fonti',
    subtitle: 'Editor intelligente che verifica statistiche e inietta note certificate',
    problem:
      'Chi redige report o analisi di mercato perde ore a verificare l\'attualità dei dati statistici e costruire bibliografie solide.',
    solution:
      'Scansiona ogni affermazione in tempo reale incrociando Eurostat, ISTAT e istituti accademici, valuta eventuali bias e inserisce la nota a piè di pagina con 1 clic.',
    kpiLabel: 'Affidabilità fonti',
    kpiValue: '96% confidenza',
    pillar: 'governance',
    pillarLabel: 'Governance',
    actionText: 'Apri Editor Blindato',
  },
  {
    id: 'zeroleak',
    title: 'ZeroLeak',
    badge: 'Scudo Omomorfico',
    subtitle: 'Camera blindata crittografica per analisi esterne su dati mai decifrati',
    problem:
      'Usare consulenti esterni, partner o modelli IA richiede di esportare bilanci, codici o liste clienti esponendosi a furti e spionaggio.',
    solution:
      'Crittografia omomorfica totale: revisori, partner o algoritmi calcolano i risultati esatti lavorando su vettori ciechi, senza mai poter decifrare i dati originali.',
    kpiLabel: 'Esposizione dati grezzi',
    kpiValue: '0.00% decifrabile',
    pillar: 'governance',
    pillarLabel: 'Governance',
    actionText: 'Attiva Camera Blindata',
    isNew: true,
  },
  {
    id: 'reputationshield',
    title: 'ReputationShield',
    badge: 'Difesa Reputazione',
    subtitle: 'Intercetta anomalie su ticket e forum bloccando le crisi sul nascere',
    problem:
      'Le aziende intervengono sulle crisi reputazionali o sui lotti difettosi solo dopo l\'esplosione di recensioni negative virali.',
    solution:
      'Incrocia forum chiusi e pattern nei ticket interni: ai primi 4 reclami silenziosi blocca il lotto sospetto, rimborsa e invia omaggi prima che esca una recensione negativa.',
    kpiLabel: 'Crisi disinnescate',
    kpiValue: 'Prima della 1a recensione',
    pillar: 'governance',
    pillarLabel: 'Governance',
    actionText: 'Controlla Radar Crisi',
    isNew: true,
  },
];
