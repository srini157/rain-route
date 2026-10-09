import React from 'react';
import {
  ShieldAlert,
  Radio,
  FileText,
  AlertTriangle,
  Wifi,
  WifiOff,
  Navigation,
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'map' | 'navigation' | 'reports' | 'emergency' | 'deck' | 'iot';
  setActiveTab: (tab: 'map' | 'navigation' | 'reports' | 'emergency' | 'deck' | 'iot') => void;
  onOpenReportModal: () => void;
  isOfflineMode: boolean;
  setIsOfflineMode: (offline: boolean) => void;
  language: 'en' | 'ta';
  setLanguage: (lang: 'en' | 'ta') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenReportModal,
  isOfflineMode,
  setIsOfflineMode,
  language,
  setLanguage,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      {/* Strict 3-zone Top Bar Contract: Brand — 4-5 Nav Links — 1 Primary Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand title, one line wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('map')}
            className="flex items-center gap-2.5 text-left group transition-opacity hover:opacity-90"
            aria-label="RainRoute Home"
          >
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-white whitespace-nowrap">
                  RainRoute
                </span>
                <span className="text-xs text-cyan-400 font-medium whitespace-nowrap hidden sm:inline">
                  Team NEXUS
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-normal whitespace-nowrap hidden md:inline">
                St. Mother Theresa Engineering College
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('map')}
            className={`whitespace-nowrap transition-colors py-1 relative ${
              activeTab === 'map' ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'
            }`}
          >
            {language === 'en' ? 'Live Flood Map' : 'நேரலை வரைபடம்'}
            {activeTab === 'map' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('navigation')}
            className={`whitespace-nowrap transition-colors py-1 relative ${
              activeTab === 'navigation' ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'
            }`}
          >
            {language === 'en' ? 'Safe Navigation' : 'பாதுகாப்பான வழி'}
            {activeTab === 'navigation' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`whitespace-nowrap transition-colors py-1 relative ${
              activeTab === 'reports' ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'
            }`}
          >
            {language === 'en' ? 'Community Reports' : 'சமூக தகவல்கள்'}
            {activeTab === 'reports' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('emergency')}
            className={`whitespace-nowrap transition-colors py-1 relative ${
              activeTab === 'emergency' ? 'text-rose-400 font-semibold' : 'text-slate-300 hover:text-white'
            }`}
          >
            {language === 'en' ? 'Emergency SOS' : 'அவசர உதவி'}
            {activeTab === 'emergency' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('deck')}
            className={`whitespace-nowrap transition-colors py-1 relative flex items-center gap-1.5 ${
              activeTab === 'deck' ? 'text-cyan-400 font-semibold' : 'text-slate-300 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Pitch Deck (15 Slides)' : 'திட்ட விளக்கம் (15 பக்கங்கள்)'}</span>
            {activeTab === 'deck' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('iot')}
            className={`whitespace-nowrap transition-colors py-1 relative text-xs text-slate-400 hover:text-slate-200 ${
              activeTab === 'iot' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            {language === 'en' ? 'IoT Sensors' : 'சென்சார் பார்வை'}
          </button>
        </nav>

        {/* Zone 3: 1 primary action button + functional utility badges */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Offline Mode Indicator / Toggle */}
          <button
            onClick={() => setIsOfflineMode(!isOfflineMode)}
            title={isOfflineMode ? 'Offline Cache Active' : 'Online Cloud Stream'}
            className={`px-2.5 py-1 text-xs rounded-md border flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              isOfflineMode
                ? 'bg-amber-950/60 border-amber-600/50 text-amber-300'
                : 'bg-slate-900 border-slate-750 text-slate-400 hover:text-slate-200'
            }`}
          >
            {isOfflineMode ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isOfflineMode ? 'Offline Cache' : 'Online'}</span>
          </button>

          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
            className="px-2.5 py-1 text-xs rounded-md bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors whitespace-nowrap"
            title="Toggle Language"
          >
            {language === 'en' ? 'தமிழ்' : 'English'}
          </button>

          {/* Primary Action Button */}
          <button
            onClick={onOpenReportModal}
            className="px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-sm transition-all flex items-center gap-1.5 whitespace-nowrap"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>{language === 'en' ? 'Report Flood' : 'வெள்ள தகவல்'}</span>
          </button>
        </div>

      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="lg:hidden flex items-center justify-around border-t border-slate-900 bg-slate-950/95 px-2 py-2 text-xs">
        <button
          onClick={() => setActiveTab('map')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'map' ? 'text-cyan-400 font-semibold' : 'text-slate-400'}`}
        >
          <Navigation className="w-4 h-4" />
          <span>Map</span>
        </button>
        <button
          onClick={() => setActiveTab('navigation')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'navigation' ? 'text-cyan-400 font-semibold' : 'text-slate-400'}`}
        >
          <Radio className="w-4 h-4" />
          <span>Navigate</span>
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'reports' ? 'text-cyan-400 font-semibold' : 'text-slate-400'}`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Reports</span>
        </button>
        <button
          onClick={() => setActiveTab('emergency')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'emergency' ? 'text-rose-400 font-semibold' : 'text-slate-400'}`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>SOS</span>
        </button>
        <button
          onClick={() => setActiveTab('deck')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'deck' ? 'text-cyan-400 font-semibold' : 'text-slate-400'}`}
        >
          <FileText className="w-4 h-4" />
          <span>Pitch Deck</span>
        </button>
      </div>
    </header>
  );
};
