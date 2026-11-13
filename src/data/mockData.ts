import {
  DesktopAppSession,
  MorningBriefingData,
  MicroVideoClip,
  SkillColleague,
  DocumentClaim,
} from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_workspace_continuity_1794476792114.jpg';
export const AVATAR_GIULIA = '/src/assets/images/avatar_giulia_marchetti_1794476793077.jpg';
export const AVATAR_MARCO = '/src/assets/images/avatar_marco_bianchi_1794476794313.jpg';
export const VIDEO_POSTER = '/src/assets/images/async_video_poster_1794476794513.jpg';

// ContextFlow Initial Digital Desk State
export const initialDeskSessions: DesktopAppSession[] = [
  {
    id: 's1',
    name: 'VS Code IDE',
    icon: 'Code2',
    category: 'IDE',
    activeItem: 'src/services/auth.service.ts',
    subDetail: 'Branch: feat/jwt-silent-refresh · 4 modifiche non committate',
    cursorOrLocation: 'Riga 142, Colonna 18',
    status: 'active',
    urlOrCommand: 'code --goto src/services/auth.service.ts:142',
    diffPreview: [
      '-  async verifyToken(token: string): Promise<boolean> {',
      '+  async verifyToken(token: string, options?: VerifyOpts): Promise<AuthResult> {',
      '+    const isExpired = this.tokenParser.checkExpiry(token);',
      '+    if (isExpired) return this.attemptSilentRefresh(token);',
    ],
  },
  {
    id: 's2',
    name: 'Figma Design System',
    icon: 'Figma',
    category: 'Design',
    activeItem: 'Checkout 2.0 Design Specs',
    subDetail: 'Frame 4: "Modal Re-Auth Fallback & Error States"',
    cursorOrLocation: 'Zoom 100% su Frame 4.2',
    status: 'pending_review',
    urlOrCommand: 'https://figma.com/file/phoenix-checkout-v2?node-id=4-102',
  },
  {
    id: 's3',
    name: 'Slack Workspace',
    icon: 'MessageSquare',
    category: 'Chat',
    activeItem: '#proj-phoenix-core',
    subDetail: 'Thread con Marco Bianchi sulle variabili scure del tema',
    cursorOrLocation: 'Ultimo messaggio non risposto: 18:24 venerdì',
    status: 'pending_review',
    urlOrCommand: 'slack://channel?team=T123&id=C987',
  },
  {
    id: 's4',
    name: 'Notion PRD',
    icon: 'FileText',
    category: 'Docs',
    activeItem: 'Specifica Tecnica: Continuità Asincrona',
    subDetail: 'Sezione 3.4: "Requisiti di resilienza offline"',
    cursorOrLocation: 'Scroll al 45% del documento',
    status: 'idle',
    urlOrCommand: 'https://notion.so/acme/spec-continuita-34',
  },
];

export const initialMorningBriefing: MorningBriefingData = {
  greeting: 'Bentornato Alex, il tuo contesto mentale è pronto al 100%.',
  headline: 'Eri concentrato sulla regressione del token di autenticazione in auth.service.ts.',
  activeTask: 'Rifattorizzazione del middleware JWT per supportare il refresh silenzioso. Avevi il cursore esattamente alla riga 142.',
  waitingOn: 'Manca l\'approvazione del design token da parte di Marco Bianchi su Figma (Frame 4 - Modal di Reauth).',
  immediateNextStep: 'Esegui il test unitario di auth.service.ts e approva la pull request #142 dopo aver ricevuto il via libera da Marco.',
  cognitiveScore: 98,
};

// AsyncSync Micro-Videos
export const initialMicroVideos: MicroVideoClip[] = [
  {
    id: 'v1',
    title: 'Review UX Nuovo Checkout: criticità contrasto e layout mobile',
    author: 'Sarah Chen',
    authorRole: 'Software Team Lead',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100',
    duration: 54,
    posterImage: VIDEO_POSTER,
    createdAt: 'Oggi, 09:15',
    transcript: [
      { second: 0, text: 'Ciao team, micro-aggiornamento rapido prima di approvare il merge.' },
      { second: 8, text: 'Ho notato due dettagli sul checkout prima del deploy in staging.' },
      { second: 14, text: 'A 0:14: sul calcolo delle tasse estere per la Germania, l\'IVA manda in tilt il subtotale.' },
      { second: 26, text: 'Ho preparato il diff per agganciare il tax engine corretto.' },
      { second: 32, text: 'A 0:32: su mobile con viewport 390px il pulsante "Paga Ora" finisce sotto la piega.' },
      { second: 44, text: 'Dobbiamo renderlo sticky in basso con altezza contenuta entro il 15%.' },
      { second: 51, text: 'A 0:51: togliamo le card recensioni da questa schermata per alleggerire il carico DOM.' },
    ],
    actionItems: [
      { id: 'a1', task: 'Rendere sticky il pulsante Pay Now su viewport mobile 390px', assignee: 'Alex', priority: 'high', completed: false },
      { id: 'a2', task: 'Verificare fallback calcolo IVA Germania con Stripe Tax', assignee: 'Matteo', priority: 'high', completed: false },
      { id: 'a3', task: 'Rimuovere carosello testimonial per migliorare First Contentful Paint', assignee: 'Sarah', priority: 'medium', completed: true },
    ],
    pinpointComments: [
      {
        id: 'c1',
        second: 14,
        author: 'Matteo R.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        text: 'Fix preparato nel branch feat/tax-germany! Lo collego alla PR.',
        createdAt: '09:22',
      },
      {
        id: 'c2',
        second: 32,
        author: 'Marco Bianchi',
        avatar: AVATAR_MARCO,
        text: 'Confermo: il design token `bottom-bar-safe` risolve l\'offset su Safari iOS.',
        createdAt: '09:30',
      },
    ],
  },
  {
    id: 'v2',
    title: 'Allineamento Architettura Pipeline Dati & Caching Redis',
    author: 'Roberto Valente',
    authorRole: 'Platform Architect',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    duration: 48,
    posterImage: HERO_IMAGE,
    createdAt: 'Ieri, 17:40',
    transcript: [
      { second: 0, text: 'Breve punto asincrono: abbiamo ridotto la latenza p99 da 480ms a 42ms.' },
      { second: 12, text: 'Abbiamo introdotto una cache distribuita con TTL a 5 minuti.' },
      { second: 25, text: 'Controllate le nuove metriche su Grafana prima del rilascio.' },
      { second: 40, text: 'Nessun bisogno di call: commentate direttamente con eventuale poll.' },
    ],
    actionItems: [
      { id: 'a4', task: 'Audit consumi memoria cluster Redis prima del picco serale', assignee: 'Roberto', priority: 'medium', completed: false },
      { id: 'a5', task: 'Configurare allarme su superamento soglia 80% RAM', assignee: 'DevOps', priority: 'low', completed: true },
    ],
    pinpointComments: [
      {
        id: 'c3',
        second: 12,
        author: 'Elena Rostagno',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
        text: 'Verificato con Legal: la memorizzazione temporanea rispetta le direttive GDPR.',
        createdAt: '18:05',
      },
    ],
  },
];

// SkillMesh Initial Hidden Colleague Profiles
export const initialColleagues: SkillColleague[] = [
  {
    id: 'col-1',
    name: 'Giulia Marchetti',
    currentRole: 'Senior Supply Chain Analyst',
    department: 'Logistica & Magazzino',
    avatar: AVATAR_GIULIA,
    matchScore: 98,
    hiddenSuperpower: 'Automazione avanzata macro VBA, PowerQuery & Master in Filologia Germanica (Olandese e Fiammingo antico)',
    matchReasoning: 'Anche se lavora nella logistica delle merci, Giulia ha 6 anni di esperienza con formule matematiche complesse e macro per la quadratura doganale, ed è laureata con lode in lingue nord-europee antiche.',
    availability: 'Disponibile oggi alle 16:30 per un micro-caffè di 15 min',
    tags: ['Excel Macros', 'VBA', 'PowerQuery', 'Olandese antico', 'Traduzioni rare', 'Filologia'],
    endorsedByCount: 24,
    pastExperience: 'Ex ricercatrice universitaria in linguistica computazionale e consulente logistica doganale.',
  },
  {
    id: 'col-2',
    name: 'Roberto Valente',
    currentRole: 'Customer Success Specialist',
    department: 'Supporto Clienti EMEA',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    matchScore: 91,
    hiddenSuperpower: 'Ex sviluppatore Python full-stack, creatore di bot di web-scraping e parser regex',
    matchReasoning: 'Ha lavorato come software dev per 3 anni prima di passare al customer success; aiuta regolarmente i colleghi a normalizzare file CSV e creare script di importazione dati.',
    availability: 'Disponibile domani mattina (Slot da 20 min)',
    tags: ['Python', 'Web Scraping', 'Regex', 'Data Cleaning', 'API Testing'],
    endorsedByCount: 19,
    pastExperience: '3 anni come sviluppatore backend in startup fintech a Milano.',
  },
  {
    id: 'col-3',
    name: 'Elena Rostagno',
    currentRole: 'Legal & Compliance Officer',
    department: 'Affari Legali & Contratti',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
    matchScore: 87,
    hiddenSuperpower: 'Graphic Designer freelance e illustratrice vettoriale con padronanza di Figma e tipografia',
    matchReasoning: 'Durante l\'università ha gestito uno studio di grafica; conosce le licenze font nei dettagli e aiuta i designer aziendali su palette colore accessibili.',
    availability: 'Disponibile giovedì alle 11:00',
    tags: ['Figma', 'Typography', 'Color Contrast', 'Graphic Design', 'Licensing'],
    endorsedByCount: 15,
    pastExperience: 'Designer indipendente e consulente proprietà intellettuale.',
  },
  {
    id: 'col-4',
    name: 'Marco Bianchi',
    currentRole: 'Staff Product Designer',
    department: 'Design & UX Research',
    avatar: AVATAR_MARCO,
    matchScore: 84,
    hiddenSuperpower: 'Compositore musicale e Sound Designer per videogiochi indie (Ableton Live, sintesi modulare)',
    matchReasoning: 'Ha composto colonne sonore per giochi premiati; può registrare jingle aziendali, feedback acustici per la UI o pulire l\'audio dei podcast aziendali.',
    availability: 'Disponibile per review asincrona entro 24h',
    tags: ['Audio Engineering', 'Sound Design', 'Ableton', 'UI Haptics', 'Voiceover'],
    endorsedByCount: 22,
    pastExperience: 'Compositore freelance e sound designer diplomato al conservatorio.',
  },
];

// ProofGuard Initial Document & Verified Claims
export const initialDocumentText = `RAPPORTO STRATEGICO: L'ADOZIONE DELL'INTELLIGENZA ARTIFICIALE NEL SETTORE MANIFATTURIERO EUROPEO (2025-2026)

1. Sintesi Esecutiva e Dinamiche di Mercato
Negli ultimi ventiquattro mesi, l'industria manifatturiera europea ha accelerato in modo decisivo la trasformazione digitale delle linee di montaggio. L'adozione dell'IA è cresciuta del 40% nel settore manifatturiero continentale, trainata dall'integrazione di sistemi di machine vision e manutenzione predittiva ad alta frequenza.

2. Impatto su Costi Operativi e Tempi di Fermo
L'implementazione di sensori IoT combinati con modelli computazionali ha generato una contrazione media dei tempi di fermo macchina imprevisti pari al 32%, consentendo un risparmio stimato di oltre 4.2 miliardi di euro a livello comunitario. Tuttavia, il 28% delle piccole e medie imprese segnala ancora un divario critico nelle competenze interne necessarie per governare gli algoritmi.

3. Sostenibilità Energetica e Resilienza delle Catene di Fornitura
Gli impianti dotati di algoritmi di bilanciamento termico adattivo hanno ridotto il consumo energetico medio del 18.5% nei cicli di lavorazione continua. L'85% dei direttori di stabilimento intervistati considera la tracciabilità predittiva il fattore chiave per fronteggiare shock geopolitici e strozzature logistiche.`;

export const initialDocumentClaims: DocumentClaim[] = [
  {
    id: 'claim-1',
    text: "L'adozione dell'IA è cresciuta del 40% nel settore manifatturiero",
    status: 'verified',
    confidenceScore: 96,
    verdictTitle: 'Confermato da Eurostat & McKinsey Global Institute (2025)',
    verdictSummary: 'Dato ufficiale: il censimento sull\'impiego di tecnologie intelligenti nelle imprese manifatturiere UE (27 Paesi) ha registrato un incremento aggregato del +39.4% YoY tra il Q1 2024 e il Q4 2025.',
    primarySource: {
      title: 'European Industrial AI Adoption Index 2025: Sectoral Benchmarks',
      organization: 'Eurostat & McKinsey Research',
      year: 2025,
      credibilityIndex: 'Alta (Censimento Istituzionale & Peer Review)',
      biasRating: 'Neutro (Statistica pubblica indipendente)',
      url: 'https://ec.europa.eu/eurostat/statistics-explained/ai-enterprises',
    },
    suggestedFootnote: '[1] Eurostat (2025). "European Industrial AI Adoption Index 2025", Eurostat Statistical Books, Lussemburgo. DOI: 10.2785/49210',
    footnoteInserted: false,
  },
  {
    id: 'claim-2',
    text: 'contrazione media dei tempi di fermo macchina imprevisti pari al 32%',
    status: 'verified',
    confidenceScore: 92,
    verdictTitle: 'Validato da Fraunhofer Institute for Manufacturing Technology',
    verdictSummary: 'Studio su 420 stabilimenti manifatturieri in Germania, Francia e Italia ha confermato una riduzione del downtime variabile tra il 29% e il 35% con modelli di manutenzione acustica predittiva.',
    primarySource: {
      title: 'Acoustic & Vibration Machine Learning in Modern Assembly Plants',
      organization: 'Fraunhofer IPA Stuttgart',
      year: 2025,
      credibilityIndex: 'Molto Alta (Istituto di Ricerca Applicata)',
      biasRating: 'Neutro / Accademico',
      url: 'https://www.ipa.fraunhofer.de/en/press/ai-maintenance-2025.html',
    },
    suggestedFootnote: '[2] Fraunhofer IPA (2025). "Acoustic Machine Learning in Assembly Plants", Fraunhofer Technical Reports, pp. 45–62.',
    footnoteInserted: false,
  },
  {
    id: 'claim-3',
    text: 'il 28% delle piccole e medie imprese segnala ancora un divario critico nelle competenze',
    status: 'needs_update',
    confidenceScore: 78,
    verdictTitle: 'Dato valido ma in peggioramento nel report 2026',
    verdictSummary: 'La percentuale del 28% risale a fine 2024; l\'indagine aggiornata al Q1 2026 della Commissione Europea mostra che il talent gap nelle PMI ha ora raggiunto il 34.2% per via della rapida obsolescenza delle competenze legacy.',
    primarySource: {
      title: 'Digital Skills & Talent Scarcity in EU SMEs 2026',
      organization: 'European Commission DG GROW',
      year: 2026,
      credibilityIndex: 'Alta (Monitor Istituzionale UE)',
      biasRating: 'Neutro',
      url: 'https://single-market-economy.ec.europa.eu/smes/digital-skills_en',
    },
    suggestedFootnote: '[3] Commissione Europea DG GROW (2026). "Digital Skills & Talent Scarcity in EU SMEs", Brussels.',
    footnoteInserted: false,
  },
  {
    id: 'claim-4',
    text: 'ridotto il consumo energetico medio del 18.5%',
    status: 'verified',
    confidenceScore: 94,
    verdictTitle: 'Confermato da International Energy Agency (IEA)',
    verdictSummary: 'Il rapporto speciale IEA sull\'efficienza energetica nei motori industriali sensorizzati attesta risparmi tra il 16% e il 21% attraverso l\'ottimizzazione termica assistita da algoritmi.',
    primarySource: {
      title: 'Energy Efficiency 2025: The Industrial Automation Dividend',
      organization: 'International Energy Agency (IEA)',
      year: 2025,
      credibilityIndex: 'Alta (Organismo Intergovernativo)',
      biasRating: 'Neutro',
      url: 'https://www.iea.org/reports/energy-efficiency-2025',
    },
    suggestedFootnote: '[4] IEA (2025). "Energy Efficiency 2025: The Industrial Automation Dividend", IEA Publications, Parigi.',
    footnoteInserted: false,
  },
];
