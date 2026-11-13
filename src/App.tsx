/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useState } from 'react';
import { SuiteTab } from './types';
import {
  initialDeskSessions,
  initialMorningBriefing,
  initialMicroVideos,
  initialColleagues,
  initialDocumentText,
  initialDocumentClaims,
  AVATAR_MARCO,
} from './data/mockData';
import { SUITE_ENGINES, SUITE_PILLARS } from './data/suiteCatalog';
import { ENGINE_ICON_MAP, PILLAR_STYLE_MAP } from './data/engineIcons';
import { TopNav } from './components/TopNav';
import { AppViewTab, WorkspaceSidebar } from './components/WorkspaceSidebar';
import { CommandPalette } from './components/CommandPalette';
import { WelcomePage } from './components/WelcomePage';
import { OverviewHub } from './components/OverviewHub';
import { ContextFlowView } from './components/ContextFlowView';
import { AsyncSyncView } from './components/AsyncSyncView';
import { SkillMeshView } from './components/SkillMeshView';
import { ProofGuardView } from './components/ProofGuardView';
import { NegotiateZeroView } from './components/NegotiateZeroView';
import { BurnoutRadarView } from './components/BurnoutRadarView';
import { LegacyBridgeView } from './components/LegacyBridgeView';
import { DecisionLedgerView } from './components/DecisionLedgerView';
import { ShadowSelfView } from './components/ShadowSelfView';
import { ZeroUIView } from './components/ZeroUIView';
import { FutureCastView } from './components/FutureCastView';
import { ChronoSculptorView } from './components/ChronoSculptorView';
import { OutcomeMarketView } from './components/OutcomeMarketView';
import { NexusGovView } from './components/NexusGovView';
import { BoardRoomView } from './components/BoardRoomView';
import { TalentMatrixView } from './components/TalentMatrixView';
import { BioCapitalView } from './components/BioCapitalView';
import {
  SupplyPulseView,
  LiquidCashView,
  TrustEscrowView,
  MergerMatchView,
  AutoFollowUpView,
} from './components/engines/SupplyChainFinanceViews';
import {
  CustomerDNAView,
  CompetitorXRayView,
  GhostAgencyView,
  PriceMorphView,
  PivotEngineView,
  MicroFranchiseView,
} from './components/engines/MarketGrowthViews';
import {
  PatentForgeView,
  ZeroLeakView,
  ReputationShieldView,
  CultureOSView,
  SwarmLabsView,
} from './components/engines/DefenseIpViews';
import {
  OneClickBureaucracyView,
  TabZeroView,
  InboxZeroView,
  MeetingSkipperView,
} from './components/engines/ZeroFrictionOfficeViews';
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Star,
} from 'lucide-react';

const DEFAULT_PINNED_TABS: SuiteTab[] = [
  'contextflow',
  'supplypulse',
  'liquidcash',
  'customerdna',
  'tabzero',
];

export default function App() {
  // Starts on the initial Welcome Page, then switches to 'overview' (All 37 Engines in One Place) or any specific engine
  const [activeTab, setActiveTab] = useState<AppViewTab>('welcome');
  const [savedMinutes, setSavedMinutes] = useState<number>(44);
  const [isRestoring, setIsRestoring] = useState<boolean>(false);
  const [showRestoreSuccess, setShowRestoreSuccess] = useState<boolean>(false);

  // OS Shell Navigation State
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const [pinnedTabs, setPinnedTabs] = useState<SuiteTab[]>(DEFAULT_PINNED_TABS);

  // Cross-app state
  const [sessions] = useState(initialDeskSessions);
  const [briefing] = useState(initialMorningBriefing);
  const [videos, setVideos] = useState(initialMicroVideos);
  const [colleagues, setColleagues] = useState(initialColleagues);

  // Global Cmd+K / Ctrl+K shortcut for Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleQuickRestore = () => {
    setIsRestoring(true);
    setTimeout(() => {
      setIsRestoring(false);
      setShowRestoreSuccess(true);
      setSavedMinutes((prev) => prev + 12);
      setTimeout(() => setShowRestoreSuccess(false), 4000);
    }, 1800);
  };

  const navigateTo = (tab: AppViewTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const togglePin = (tab: SuiteTab) => {
    if (tab === 'overview') return;
    setPinnedTabs((prev) =>
      prev.includes(tab) ? prev.filter((item) => item !== tab) : [...prev, tab]
    );
  };

  // Context metadata & sibling navigation within the active pillar
  const activeEngineContext = useMemo(() => {
    if (activeTab === 'welcome' || activeTab === 'overview') return null;
    const engine = SUITE_ENGINES.find((e) => e.id === activeTab);
    if (!engine) return null;
    const pillar = SUITE_PILLARS.find((p) => p.id === engine.pillar);
    const siblings = SUITE_ENGINES.filter((e) => e.pillar === engine.pillar);
    const idx = siblings.findIndex((e) => e.id === engine.id);
    const prevEngine = siblings[(idx - 1 + siblings.length) % siblings.length];
    const nextEngine = siblings[(idx + 1) % siblings.length];
    return { engine, pillar, prevEngine, nextEngine, position: idx + 1, total: siblings.length };
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      {/* Persistent Collapsible OS Sidebar + Mobile Drawer */}
      <WorkspaceSidebar
        activeTab={activeTab}
        onTabChange={navigateTo}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
        pinnedTabs={pinnedTabs}
        onTogglePin={togglePin}
      />

      {/* Main Workspace Column */}
      <div className="flex-1 min-w-0 flex flex-col">
        <TopNav
          activeTab={activeTab}
          onTabChange={navigateTo}
          savedMinutes={savedMinutes}
          onQuickRestore={handleQuickRestore}
          isRestoring={isRestoring}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        />

        {/* Unified Engine Context Sub-Bar when working inside any of the 37 Engines */}
        {activeEngineContext && (
          <div className="bg-slate-900/50 border-b border-slate-800/80 px-4 sm:px-6 py-2.5">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <button
                  type="button"
                  onClick={() => navigateTo('overview')}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Tutti i Motori (37)</span>
                </button>

                <div className="flex items-center gap-2 min-w-0 text-xs">
                  {(() => {
                    const ActiveIcon =
                      activeEngineContext.engine.id === 'overview'
                        ? Star
                        : ENGINE_ICON_MAP[activeEngineContext.engine.id];
                    const pStyle = PILLAR_STYLE_MAP[activeEngineContext.engine.pillar];
                    return (
                      <>
                        <ActiveIcon className={`w-4 h-4 shrink-0 ${pStyle.accentText}`} />
                        <span className="font-bold text-white truncate">
                          {activeEngineContext.engine.title}
                        </span>
                        <span className="text-slate-600 hidden sm:inline">·</span>
                        <span className="text-slate-400 truncate hidden sm:inline">
                          {activeEngineContext.pillar?.name} ({activeEngineContext.position}/
                          {activeEngineContext.total})
                        </span>
                      </>
                    );
                  })()}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => togglePin(activeEngineContext.engine.id)}
                  className={`px-2.5 py-1 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                    pinnedTabs.includes(activeEngineContext.engine.id)
                      ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Star
                    className={`w-3.5 h-3.5 ${
                      pinnedTabs.includes(activeEngineContext.engine.id) ? 'fill-current' : ''
                    }`}
                  />
                  <span className="hidden sm:inline">
                    {pinnedTabs.includes(activeEngineContext.engine.id)
                      ? 'Nei Preferiti'
                      : 'Fissa'}
                  </span>
                </button>

                <div className="inline-flex items-center rounded-lg border border-slate-800 bg-slate-900 overflow-hidden text-xs">
                  <button
                    type="button"
                    onClick={() => navigateTo(activeEngineContext.prevEngine.id)}
                    title={`Precedente: ${activeEngineContext.prevEngine.title}`}
                    className="px-2.5 py-1 text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-1 transition-colors cursor-pointer border-r border-slate-800"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span className="hidden md:inline max-w-[110px] truncate">
                      {activeEngineContext.prevEngine.title}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateTo(activeEngineContext.nextEngine.id)}
                    title={`Successivo: ${activeEngineContext.nextEngine.title}`}
                    className="px-2.5 py-1 text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span className="hidden md:inline max-w-[110px] truncate">
                      {activeEngineContext.nextEngine.title}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Viewport */}
        <main className="flex-1">
          {activeTab === 'welcome' && (
            <WelcomePage
              onEnterHub={() => navigateTo('overview')}
              onSelectEngine={(tab) => navigateTo(tab)}
              onOpenCommandPalette={() => setCommandPaletteOpen(true)}
              savedMinutes={savedMinutes}
            />
          )}

          {activeTab === 'overview' && (
            <OverviewHub
              onSelectTab={(tab) => navigateTo(tab)}
              savedMinutes={savedMinutes}
              pinnedTabs={pinnedTabs}
              onTogglePin={togglePin}
              onOpenWelcome={() => navigateTo('welcome')}
            />
          )}

          {/* Pilastro 1: Autonomia & Zero-Attrito Personale */}
          {activeTab === 'contextflow' && (
            <ContextFlowView
              sessions={sessions}
              briefing={briefing}
              onRestoreDesk={handleQuickRestore}
              isRestoring={isRestoring}
              avatarMarco={AVATAR_MARCO}
            />
          )}
          {activeTab === 'shadowself' && <ShadowSelfView />}
          {activeTab === 'chronosculptor' && <ChronoSculptorView />}
          {activeTab === 'zeroui' && <ZeroUIView />}
          {activeTab === 'tabzero' && <TabZeroView />}
          {activeTab === 'inboxzero' && <InboxZeroView />}

          {/* Pilastro 2: Collaborazione, Persone & Energia */}
          {activeTab === 'asyncsync' && (
            <AsyncSyncView
              videos={videos}
              onAddVideoClip={(newV) => setVideos([newV, ...videos])}
            />
          )}
          {activeTab === 'skillmesh' && (
            <SkillMeshView
              colleagues={colleagues}
              onAddColleagueSkill={(newC) => setColleagues([newC, ...colleagues])}
            />
          )}
          {activeTab === 'burnoutradar' && <BurnoutRadarView />}
          {activeTab === 'biocapital' && <BioCapitalView />}
          {activeTab === 'cultureos' && <CultureOSView />}
          {activeTab === 'meetingskipper' && <MeetingSkipperView />}

          {/* Pilastro 3: Talenti, R&D & Esecuzione */}
          {activeTab === 'legacybridge' && <LegacyBridgeView />}
          {activeTab === 'talentmatrix' && <TalentMatrixView />}
          {activeTab === 'outcomemarket' && <OutcomeMarketView />}
          {activeTab === 'swarmlabs' && <SwarmLabsView />}
          {activeTab === 'patentforge' && <PatentForgeView />}
          {activeTab === 'oneclickbureaucracy' && <OneClickBureaucracyView />}

          {/* Pilastro 4: Mercato, Clienti & Crescita */}
          {activeTab === 'customerdna' && <CustomerDNAView />}
          {activeTab === 'competitorxray' && <CompetitorXRayView />}
          {activeTab === 'ghostagency' && <GhostAgencyView />}
          {activeTab === 'pricemorph' && <PriceMorphView />}
          {activeTab === 'pivotengine' && <PivotEngineView />}
          {activeTab === 'microfranchise' && <MicroFranchiseView />}

          {/* Pilastro 5: Finanza, Filiera & Accordi */}
          {activeTab === 'negotiatezero' && <NegotiateZeroView />}
          {activeTab === 'trustescrow' && <TrustEscrowView />}
          {activeTab === 'liquidcash' && <LiquidCashView />}
          {activeTab === 'supplypulse' && <SupplyPulseView />}
          {activeTab === 'mergermatch' && <MergerMatchView />}
          {activeTab === 'autofollowup' && <AutoFollowUpView />}
          {activeTab === 'futurecast' && <FutureCastView />}

          {/* Pilastro 6: Governance, Sicurezza & Verità */}
          {activeTab === 'nexusgov' && <NexusGovView />}
          {activeTab === 'boardroom' && <BoardRoomView />}
          {activeTab === 'decisionledger' && <DecisionLedgerView />}
          {activeTab === 'proofguard' && (
            <ProofGuardView
              initialText={initialDocumentText}
              initialClaims={initialDocumentClaims}
            />
          )}
          {activeTab === 'zeroleak' && <ZeroLeakView />}
          {activeTab === 'reputationshield' && <ReputationShieldView />}
        </main>

        {/* Clean Compact Footer */}
        <footer className="border-t border-slate-900 bg-slate-950 px-6 py-5 mt-12 text-xs text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <img
                src="/assets/aistudio/8-2-consultant-download-png_6214edb5.png"
                alt="Continuum OS Logo"
                className="h-6 w-auto object-contain bg-transparent drop-shadow-[0_0_2px_rgba(255,255,255,0.55)]"
              />
              <span className="font-bold text-slate-300">Continuum Work OS</span>
              <span aria-hidden="true">·</span>
              <span>37 Motori in 6 Pilastri Strategici</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
              <button
                type="button"
                onClick={() => navigateTo('welcome')}
                className="hover:text-indigo-300 transition-colors cursor-pointer"
              >
                Benvenuto
              </button>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => navigateTo('overview')}
                className="hover:text-indigo-300 transition-colors cursor-pointer"
              >
                Tutti i 37 Motori
              </button>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => setCommandPaletteOpen(true)}
                className="hover:text-indigo-300 transition-colors cursor-pointer"
              >
                Ricerca Rapida (⌘K)
              </button>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => navigateTo('supplypulse')}
                className="hover:text-indigo-300 transition-colors cursor-pointer"
              >
                SupplyPulse
              </button>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => navigateTo('liquidcash')}
                className="hover:text-indigo-300 transition-colors cursor-pointer"
              >
                LiquidCash
              </button>
            </div>
          </div>
        </footer>
      </div>

      {/* Cmd+K Global Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        activeTab={activeTab === 'welcome' ? 'overview' : activeTab}
        onSelectTab={(tab) => navigateTo(tab)}
      />

      {/* Restore Success Toast Notification */}
      {showRestoreSuccess && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-emerald-500/60 text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <span className="font-bold text-white block">Scrivania Digitale Ripristinata al 100%!</span>
            <span className="text-slate-300">
              VS Code riga 142 attiva, Figma Frame 4 centrato, notifiche sincronizzate.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
