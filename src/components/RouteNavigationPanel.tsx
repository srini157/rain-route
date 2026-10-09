import React, { useState, useEffect } from 'react';
import {
  Navigation,
  ShieldCheck,
  AlertOctagon,
  ArrowRight,
  Compass,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Bike,
  Car,
  Truck,
  Shield,
  Layers,
  MapPin,
  Clock,
  Sparkles,
} from 'lucide-react';
import { RouteOption, VehicleType, VehicleConfig } from '../types';
import { VEHICLE_CONFIGS, PRESET_ROUTES } from '../data/mockData';

interface RouteNavigationPanelProps {
  activeRoute: RouteOption;
  setActiveRoute: (route: RouteOption) => void;
  selectedVehicle: VehicleType;
  setSelectedVehicle: (v: VehicleType) => void;
  isSimulatingNav: boolean;
  setIsSimulatingNav: (sim: boolean) => void;
  simulatedProgress: number;
  setSimulatedProgress: React.Dispatch<React.SetStateAction<number>>;
  language: 'en' | 'ta';
}

export const RouteNavigationPanel: React.FC<RouteNavigationPanelProps> = ({
  activeRoute,
  setActiveRoute,
  selectedVehicle,
  setSelectedVehicle,
  isSimulatingNav,
  setIsSimulatingNav,
  simulatedProgress,
  setSimulatedProgress,
  language,
}) => {
  const [voiceGuidance, setVoiceGuidance] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const currentVehicleConfig = VEHICLE_CONFIGS.find((v) => v.id === selectedVehicle) || VEHICLE_CONFIGS[1];
  const safeRoute = PRESET_ROUTES.find((r) => r.id === 'safe') || PRESET_ROUTES[0];
  const standardRoute = PRESET_ROUTES.find((r) => r.id === 'standard') || PRESET_ROUTES[1];

  // Drive simulation tick
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSimulatingNav) {
      interval = setInterval(() => {
        setSimulatedProgress((prev) => {
          if (prev >= 1) {
            setIsSimulatingNav(false);
            return 1;
          }
          const next = prev + 0.02;
          // compute current step
          const stepIndex = Math.min(
            Math.floor(next * activeRoute.steps.length),
            activeRoute.steps.length - 1
          );
          setCurrentStepIndex(stepIndex);
          return next;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isSimulatingNav, activeRoute, setSimulatedProgress, setIsSimulatingNav]);

  const handleToggleSimulation = () => {
    if (simulatedProgress >= 1) {
      setSimulatedProgress(0);
      setCurrentStepIndex(0);
    }
    setIsSimulatingNav(!isSimulatingNav);
  };

  const handleResetNavigation = () => {
    setIsSimulatingNav(false);
    setSimulatedProgress(0);
    setCurrentStepIndex(0);
  };

  const getVehicleIcon = (type: VehicleType) => {
    switch (type) {
      case 'two_wheeler':
        return <Bike className="w-4 h-4" />;
      case 'hatchback':
        return <Car className="w-4 h-4" />;
      case 'suv':
        return <Truck className="w-4 h-4" />;
      case 'commercial':
        return <Shield className="w-4 h-4" />;
    }
  };

  // Water depth danger analysis for standard route
  const standardRouteExceedsBy = standardRoute.maxWaterDepthCm - currentVehicleConfig.maxWaterDepthCm;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-xl flex flex-col gap-5">
      {/* Route Header & Vehicle Selector */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">
              {language === 'en' ? 'Flood-Safe Route Planner' : 'வெள்ளப் பாதுகாப்பு வழித் திட்டம்'}
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Origin: SMTEC Campus
          </span>
        </div>

        {/* Origin & Destination Inputs (Simulated real-world places) */}
        <div className="space-y-2 bg-slate-950 p-3 rounded-lg border border-slate-800">
          <div className="flex items-center gap-2.5 text-xs text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shrink-0" />
            <div className="flex-1 truncate">
              <span className="text-slate-400 block text-[10px]">Start Location</span>
              <span className="font-medium text-slate-200">St. Mother Theresa Engineering College Campus, Thoothukudi</span>
            </div>
          </div>
          <div className="h-px bg-slate-800 ml-5" />
          <div className="flex items-center gap-2.5 text-xs text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
            <div className="flex-1 truncate">
              <span className="text-slate-400 block text-[10px]">Destination</span>
              <span className="font-medium text-slate-200">Thoothukudi Central Railway & Transit Terminal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Category Selector */}
      <div>
        <label className="text-xs font-semibold text-slate-300 block mb-2">
          {language === 'en' ? 'Select Vehicle Type (Ground Clearance Check)' : 'வாகன வகை (தண்ணீர் தாங்கும் திறன்)'}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {VEHICLE_CONFIGS.map((v) => (
            <button
              key={v.id}
              onClick={() => setSelectedVehicle(v.id)}
              className={`p-2.5 rounded-lg border text-left transition-all ${
                selectedVehicle === v.id
                  ? 'bg-cyan-950/70 border-cyan-500 text-white shadow-sm ring-1 ring-cyan-500/50'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                {getVehicleIcon(v.id)}
                <span className="text-[10px] font-mono text-cyan-400">
                  {v.maxWaterDepthCm} cm limit
                </span>
              </div>
              <div className="text-xs font-bold truncate">{v.label}</div>
            </button>
          ))}
        </div>
        <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
          <span>Tolerance:</span>
          <span className="text-cyan-300 font-medium">{currentVehicleConfig.description}</span>
        </p>
      </div>

      {/* Side-by-Side Route Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* RECOMMENDED FLOOD-SAFE ROUTE */}
        <div
          onClick={() => setActiveRoute(safeRoute)}
          className={`cursor-pointer rounded-xl p-4 border transition-all ${
            activeRoute.id === 'safe'
              ? 'bg-cyan-950/40 border-cyan-400 shadow-md ring-1 ring-cyan-400/40'
              : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 opacity-80'
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 uppercase tracking-wide">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>RainRoute Recommended</span>
              </div>
              <h4 className="text-sm font-bold text-white mt-0.5">Elevated High-Ground Flyover</h4>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
              0 Flood Risks
            </span>
          </div>

          <div className="flex items-center gap-3 mt-3 text-xs text-slate-300">
            <span className="text-lg font-bold font-mono text-white">{safeRoute.durationMin} min</span>
            <span>·</span>
            <span>{safeRoute.distanceKm} km</span>
            <span>·</span>
            <span className="text-emerald-400 font-medium">+4 min detour</span>
          </div>

          <ul className="mt-3 space-y-1.5 text-xs text-slate-300 border-t border-slate-800/80 pt-2.5">
            {safeRoute.highlights.slice(0, 2).map((h, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-cyan-400">✓</span>
                <span className="leading-tight">{h}</span>
              </li>
            ))}
          </ul>

          <div className="mt-3 bg-emerald-950/40 border border-emerald-800/60 p-2 rounded-lg text-xs text-emerald-300 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>Safe for {currentVehicleConfig.label} (Max water on path: 4 cm)</span>
          </div>
        </div>

        {/* STANDARD RISKY ROUTE */}
        <div
          onClick={() => setActiveRoute(standardRoute)}
          className={`cursor-pointer rounded-xl p-4 border transition-all ${
            activeRoute.id === 'standard'
              ? 'bg-rose-950/30 border-rose-500 shadow-md ring-1 ring-rose-500/40'
              : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 opacity-80'
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400 uppercase tracking-wide">
                <AlertOctagon className="w-4 h-4 text-rose-400" />
                <span>Standard Shortest GPS</span>
              </div>
              <h4 className="text-sm font-bold text-white mt-0.5">Railway Underpass Subway Link</h4>
            </div>
            <span className="text-xs font-mono font-bold text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800">
              2 Flooded Traps
            </span>
          </div>

          <div className="flex items-center gap-3 mt-3 text-xs text-slate-300">
            <span className="text-lg font-bold font-mono text-white">{standardRoute.durationMin} min</span>
            <span>·</span>
            <span>{standardRoute.distanceKm} km</span>
            <span>·</span>
            <span className="text-rose-400 font-medium">48 cm water depth</span>
          </div>

          <ul className="mt-3 space-y-1.5 text-xs text-slate-300 border-t border-slate-800/80 pt-2.5">
            {standardRoute.highlights.slice(0, 2).map((h, i) => (
              <li key={i} className="flex items-start gap-1.5 text-rose-300/90">
                <span className="text-rose-400">✗</span>
                <span className="leading-tight">{h}</span>
              </li>
            ))}
          </ul>

          <div className="mt-3 bg-rose-950/50 border border-rose-800/60 p-2 rounded-lg text-xs text-rose-300 flex items-center gap-2">
            <AlertOctagon className="w-4 h-4 shrink-0 text-rose-400" />
            <span>
              {standardRouteExceedsBy > 0
                ? `CRITICAL: Exceeds ${currentVehicleConfig.label} limit by ${standardRouteExceedsBy} cm!`
                : `Caution: High risk of sudden stalling.`}
            </span>
          </div>
        </div>
      </div>

      {/* Turn-by-Turn Navigation Control HUD */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              {language === 'en' ? 'Live Turn-by-Turn Simulation' : 'நேரலை திருப்ப வழிகாட்டுதல்'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Voice Guidance Toggle */}
            <button
              onClick={() => setVoiceGuidance(!voiceGuidance)}
              className={`p-1.5 rounded-lg border text-xs transition-colors ${
                voiceGuidance
                  ? 'bg-cyan-950/60 border-cyan-600 text-cyan-300'
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}
              title="Voice Guidance"
            >
              {voiceGuidance ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Play/Pause Navigation */}
            <button
              onClick={handleToggleSimulation}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                isSimulatingNav
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
              }`}
            >
              {isSimulatingNav ? (
                <>
                  <Pause className="w-3.5 h-3.5" /> Pause Drive
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" /> Start Navigation
                </>
              )}
            </button>

            {/* Reset */}
            <button
              onClick={handleResetNavigation}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Reset Drive"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar along route */}
        <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden mb-4 border border-slate-800">
          <div
            className={`h-full transition-all duration-300 ${
              activeRoute.floodRiskLevel === 'safe' ? 'bg-cyan-400' : 'bg-rose-500'
            }`}
            style={{ width: `${Math.round(simulatedProgress * 100)}%` }}
          />
        </div>

        {/* Current Active Maneuver Box */}
        {activeRoute.steps[currentStepIndex] && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <Navigation className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase">
                    Step {currentStepIndex + 1} of {activeRoute.steps.length} · In{' '}
                    {activeRoute.steps[currentStepIndex].distanceMeters}m
                  </span>
                  {activeRoute.steps[currentStepIndex].roadElevation === 'elevated_flyover' && (
                    <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800 px-1.5 rounded">
                      Elevated Flyover Ramp
                    </span>
                  )}
                </div>
                <h5 className="text-sm font-bold text-white mt-0.5">
                  {activeRoute.steps[currentStepIndex].instruction}
                </h5>
                <p className="text-xs text-slate-400 mt-1">
                  {activeRoute.steps[currentStepIndex].subText}
                </p>
                {activeRoute.steps[currentStepIndex].floodWarning && (
                  <div className="mt-2 text-xs text-rose-300 bg-rose-950/60 p-2 rounded border border-rose-800 flex items-center gap-1.5">
                    <AlertOctagon className="w-3.5 h-3.5 shrink-0 text-rose-400" />
                    <span>{activeRoute.steps[currentStepIndex].floodWarning}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Steps List */}
        <div className="mt-3 space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {activeRoute.steps.map((st, idx) => (
            <div
              key={st.id}
              onClick={() => {
                setCurrentStepIndex(idx);
                setSimulatedProgress(idx / (activeRoute.steps.length - 1));
              }}
              className={`text-xs p-2 rounded-lg cursor-pointer flex items-center justify-between border transition-all ${
                currentStepIndex === idx
                  ? 'bg-slate-800 border-cyan-500/60 text-white font-medium'
                  : 'bg-slate-950/60 border-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <span className="font-mono text-[10px] text-slate-500">{idx + 1}.</span>
                <span className="truncate">{st.instruction}</span>
              </div>
              <span className="font-mono text-[11px] text-slate-400 shrink-0 ml-2">
                {st.distanceMeters}m
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
