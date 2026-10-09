import React, { useState } from 'react';
import {
  ShieldAlert,
  CloudRain,
  AlertTriangle,
  Radio,
  FileText,
  Navigation,
  Compass,
  Users,
  Cpu,
  Layers,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { LiveFloodMap } from './components/LiveFloodMap';
import { RouteNavigationPanel } from './components/RouteNavigationPanel';
import { WeatherWidget } from './components/WeatherWidget';
import { CommunityReportsModal } from './components/CommunityReportsModal';
import { EmergencySOSModal } from './components/EmergencySOSModal';
import { PresentationDeck } from './components/PresentationDeck';
import { IoTFutureScopeModal } from './components/IoTFutureScopeModal';
import {
  INITIAL_FLOOD_ZONES,
  PRESET_ROUTES,
  INITIAL_REPORTS,
  MOCK_WEATHER,
  TEAM_MEMBERS,
} from './data/mockData';
import { FloodZone, RouteOption, VehicleType, CommunityReport } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'map' | 'navigation' | 'reports' | 'emergency' | 'deck' | 'iot'>('map');
  const [floodZones, setFloodZones] = useState<FloodZone[]>(INITIAL_FLOOD_ZONES);
  const [selectedZone, setSelectedZone] = useState<FloodZone | null>(null);
  const [activeRoute, setActiveRoute] = useState<RouteOption>(PRESET_ROUTES[0]);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType>('hatchback');
  const [reports, setReports] = useState<CommunityReport[]>(INITIAL_REPORTS);
  const [weather] = useState(MOCK_WEATHER);

  // Modals & States
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isSosModalOpen, setIsSosModalOpen] = useState(false);
  const [isIotModalOpen, setIsIotModalOpen] = useState(false);
  const [showRadarOverlay, setShowRadarOverlay] = useState(true);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ta'>('en');

  // Driving navigation simulation state
  const [isSimulatingNav, setIsSimulatingNav] = useState(false);
  const [simulatedProgress, setSimulatedProgress] = useState(0);

  // Community report handlers
  const handleAddReport = (newReport: CommunityReport) => {
    setReports((prev) => [newReport, ...prev]);
    // Also create a dynamic map hazard if depth is significant
    if (newReport.depthCm >= 15) {
      const newZone: FloodZone = {
        id: `fz-${Date.now()}`,
        name: newReport.locationName,
        landmark: 'Community Reported Hazard',
        depthCm: newReport.depthCm,
        severity: newReport.severity,
        x: 40 + Math.floor(Math.random() * 20),
        y: 40 + Math.floor(Math.random() * 20),
        waterFlowRate: 'flowing',
        reportedAt: 'Just now',
        verifiedCount: 1,
        passableFor: newReport.depthCm > 40 ? ['commercial'] : ['suv', 'commercial'],
        notes: newReport.notes,
        photoUrl: newReport.photoUrl,
      };
      setFloodZones((prev) => [newZone, ...prev]);
    }
  };

  const handleVoteReport = (id: string, isUpvote: boolean) => {
    setReports((prev) =>
      prev.map((rep) => {
        if (rep.id === id) {
          return {
            ...rep,
            upvotes: isUpvote ? rep.upvotes + 1 : rep.upvotes,
            downvotes: !isUpvote ? rep.downvotes + 1 : rep.downvotes,
          };
        }
        return rep;
      })
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* 3-Zone Compliant Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'emergency') {
            setIsSosModalOpen(true);
          } else if (tab === 'reports') {
            setIsReportModalOpen(true);
          } else if (tab === 'iot') {
            setIsIotModalOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        isOfflineMode={isOfflineMode}
        setIsOfflineMode={setIsOfflineMode}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Monsoon Flash Flood Alert Banner */}
      <div className="bg-gradient-to-r from-rose-950/80 via-rose-900/40 to-slate-950 border-b border-rose-900/60 px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-rose-300">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping shrink-0" />
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <span className="font-bold">IMD Heavy Rain Alert:</span>
            <span className="text-slate-200 hidden sm:inline">
              Coastal Thoothukudi experiencing 44 mm/hr downpour. 2 low-lying railway subways waterlogged.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setActiveRoute(PRESET_ROUTES[0]);
                setActiveTab('navigation');
              }}
              className="text-cyan-300 hover:text-cyan-200 underline font-semibold transition-colors text-xs"
            >
              View Recommended Flyover Detour
            </button>
            <button
              onClick={() => setIsSosModalOpen(true)}
              className="text-rose-400 hover:text-rose-300 font-bold bg-rose-950 px-2 py-0.5 rounded border border-rose-800 text-xs"
            >
              SOS: 1077
            </button>
          </div>
        </div>
      </div>

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
        
        {/* PRESENTATION DECK VIEW (All 15 Slides) */}
        {activeTab === 'deck' ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">
                  RainRoute Project Presentation Deck
                </h2>
                <p className="text-xs text-slate-400">
                  Comprehensive 15-Slide Pitch · Team NEXUS · St. Mother Theresa Engineering College
                </p>
              </div>
              <button
                onClick={() => setActiveTab('map')}
                className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 hover:text-white transition-colors"
              >
                Switch to Live Navigation App
              </button>
            </div>

            <PresentationDeck
              onSwitchToLiveApp={() => setActiveTab('map')}
              language={language}
            />
          </div>
        ) : (
          /* LIVE APP VIEW (Map, Route Planning & Weather Intelligence) */
          <div className="space-y-6">
            
            {/* View Switcher Banner & Quick Stats */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                    Real-Time Flood-Safe Navigation
                  </span>
                  <span className="text-xs text-slate-500">·</span>
                  <span className="text-xs text-slate-400 font-mono">
                    Thoothukudi Smart City Grid
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                  Safe Monsoon Commuting & Flood Avoidance
                </h1>
              </div>

              {/* Quick Jump Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsReportModalOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-200 transition-colors flex items-center gap-1.5"
                >
                  <Users className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Community Feed ({reports.length})</span>
                </button>
                <button
                  onClick={() => setIsSosModalOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-rose-950/70 hover:bg-rose-900 border border-rose-800 text-xs text-rose-300 font-semibold transition-colors flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
                  <span>Helplines & Shelters</span>
                </button>
                <button
                  onClick={() => setActiveTab('deck')}
                  className="px-3 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-800 text-xs text-cyan-300 font-semibold transition-colors flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  <span>View 15 Slides</span>
                </button>
              </div>
            </div>

            {/* Split Grid: Interactive Map + Turn-by-Turn Guidance */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Interactive Vector Flood Map (7 cols) */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="font-semibold flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-cyan-400" />
                    <span>Live Interactive Flood Map</span>
                  </span>
                  <span className="text-slate-400">
                    Click any depth marker to inspect road clearance
                  </span>
                </div>

                <LiveFloodMap
                  floodZones={floodZones}
                  selectedZone={selectedZone}
                  onSelectZone={setSelectedZone}
                  activeRoute={activeRoute}
                  selectedVehicle={selectedVehicle}
                  showRadarOverlay={showRadarOverlay}
                  setShowRadarOverlay={setShowRadarOverlay}
                  isSimulatingNav={isSimulatingNav}
                  simulatedProgress={simulatedProgress}
                  onStartNavigation={() => {
                    setIsSimulatingNav(true);
                  }}
                />

                {/* Real-World Pain Point Callout Strip */}
                <div className="grid grid-cols-3 gap-3 bg-slate-900/50 p-3.5 rounded-xl border border-slate-800/80 text-center">
                  <div>
                    <div className="text-lg font-bold font-mono text-cyan-400">70%</div>
                    <div className="text-[11px] text-slate-300">Commuters Stranded</div>
                    <div className="text-[10px] text-slate-500">Without water depth clarity</div>
                  </div>
                  <div className="border-x border-slate-800">
                    <div className="text-lg font-bold font-mono text-rose-400">60%</div>
                    <div className="text-[11px] text-slate-300">Vehicle Engine Damage</div>
                    <div className="text-[10px] text-slate-500">From submerged subways</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold font-mono text-emerald-400">45 min</div>
                    <div className="text-[11px] text-slate-300">Time Saved</div>
                    <div className="text-[10px] text-slate-500">Via RainRoute flyover detours</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Route Planner HUD & Turn Directions (5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <RouteNavigationPanel
                  activeRoute={activeRoute}
                  setActiveRoute={setActiveRoute}
                  selectedVehicle={selectedVehicle}
                  setSelectedVehicle={setSelectedVehicle}
                  isSimulatingNav={isSimulatingNav}
                  setIsSimulatingNav={setIsSimulatingNav}
                  simulatedProgress={simulatedProgress}
                  setSimulatedProgress={setSimulatedProgress}
                  language={language}
                />

                <WeatherWidget
                  weather={weather}
                  language={language}
                />
              </div>

            </div>

            {/* Project Pitch & Team NEXUS Highlight Strip */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
              <div className="max-w-3xl">
                <span className="text-xs font-mono font-bold uppercase text-cyan-400 tracking-wider">
                  Innovated by Team NEXUS · St. Mother Theresa Engineering College, Thoothukudi
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  "During monsoons, the biggest challenge isn't the rain — it's not knowing which road is safe."
                </h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  RainRoute was conceived and engineered by II Year Computer Science students to bridge the gap between meteorological forecasts and street-level commuter navigation, preventing engine hydrolock and saving lives.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800">
                {TEAM_MEMBERS.map((tm, i) => (
                  <div key={i} className="space-y-1">
                    <span className="text-xs font-bold text-white block">{tm.name}</span>
                    <span className="text-[11px] text-cyan-400 font-medium block">{tm.role}</span>
                    <span className="text-[10px] text-slate-500 block leading-tight">{tm.focus}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </main>

      {/* Community Reports Drawer / Modal */}
      <CommunityReportsModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        reports={reports}
        onAddReport={handleAddReport}
        onVoteReport={handleVoteReport}
        language={language}
      />

      {/* Emergency SOS & Helplines Modal */}
      <EmergencySOSModal
        isOpen={isSosModalOpen}
        onClose={() => setIsSosModalOpen(false)}
        language={language}
      />

      {/* Future Scope IoT Telemetry Modal */}
      <IoTFutureScopeModal
        isOpen={isIotModalOpen}
        onClose={() => setIsIotModalOpen(false)}
        language={language}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-6 px-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span className="font-bold text-white">RainRoute</span>
            <span className="hidden sm:inline">·</span>
            <span>Team NEXUS: N. Magdalene Ashirvatham, A. Srini, P. Revathi, B. Benisha</span>
            <span className="hidden sm:inline">·</span>
            <span>St. Mother Theresa Engineering College, Thoothukudi</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setActiveTab('deck')}
              className="hover:text-cyan-400 transition-colors"
            >
              Pitch Deck (15 Slides)
            </button>
            <span>·</span>
            <button
              onClick={() => setIsIotModalOpen(true)}
              className="hover:text-cyan-400 transition-colors"
            >
              IoT Hardware Scope
            </button>
            <span>·</span>
            <button
              onClick={() => setIsSosModalOpen(true)}
              className="hover:text-rose-400 transition-colors"
            >
              Emergency 1077
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
