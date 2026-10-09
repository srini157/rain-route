import React, { useState } from 'react';
import {
  AlertCircle,
  Eye,
  Layers,
  CloudRain,
  Compass,
  CheckCircle2,
  XCircle,
  Car,
  Bike,
  Shield,
  Truck,
  ArrowRight,
} from 'lucide-react';
import { FloodZone, RouteOption, VehicleType } from '../types';

interface LiveFloodMapProps {
  floodZones: FloodZone[];
  selectedZone: FloodZone | null;
  onSelectZone: (zone: FloodZone | null) => void;
  activeRoute: RouteOption;
  selectedVehicle: VehicleType;
  showRadarOverlay: boolean;
  setShowRadarOverlay: (show: boolean) => void;
  isSimulatingNav: boolean;
  simulatedProgress: number; // 0 to 1
  onStartNavigation: () => void;
}

export const LiveFloodMap: React.FC<LiveFloodMapProps> = ({
  floodZones,
  selectedZone,
  onSelectZone,
  activeRoute,
  selectedVehicle,
  showRadarOverlay,
  setShowRadarOverlay,
  isSimulatingNav,
  simulatedProgress,
  onStartNavigation,
}) => {
  const [showElevations, setShowElevations] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Compute position of car during simulation along activeRoute path
  const currentCoords = (() => {
    const coords = activeRoute.pathCoordinates;
    if (coords.length === 0) return { x: 18, y: 82 };
    const totalSegments = coords.length - 1;
    const progress = Math.min(Math.max(simulatedProgress, 0), 1);
    const scaledIndex = progress * totalSegments;
    const lowerIndex = Math.min(Math.floor(scaledIndex), totalSegments - 1);
    const upperIndex = lowerIndex + 1;
    const segmentFraction = scaledIndex - lowerIndex;

    const p1 = coords[lowerIndex];
    const p2 = coords[upperIndex];
    return {
      x: p1.x + (p2.x - p1.x) * segmentFraction,
      y: p1.y + (p2.y - p1.y) * segmentFraction,
    };
  })();

  const getVehicleName = (v: VehicleType) => {
    switch (v) {
      case 'two_wheeler':
        return '2-Wheeler (15 cm limit)';
      case 'hatchback':
        return 'Hatchback / Sedan (22 cm limit)';
      case 'suv':
        return 'SUV / 4x4 (45 cm limit)';
      case 'commercial':
        return 'Commercial / Bus (65 cm limit)';
    }
  };

  return (
    <div className="relative w-full aspect-[4/3] md:aspect-[16/10] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
      {/* SVG Canvas Map */}
      <svg
        viewBox="0 0 1000 650"
        className="w-full h-full select-none"
        style={{
          transform: `scale(${zoomLevel})`,
          transformOrigin: 'center center',
          transition: 'transform 0.2s ease-out',
        }}
      >
        <defs>
          {/* Subtle Grid Pattern */}
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(51, 65, 85, 0.25)" strokeWidth="0.8" />
          </pattern>

          {/* Radar Storm Cloud Gradient */}
          <radialGradient id="radarStorm1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.35)" />
            <stop offset="40%" stopColor="rgba(14, 165, 233, 0.25)" />
            <stop offset="80%" stopColor="rgba(6, 182, 212, 0.1)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          <radialGradient id="radarStorm2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(239, 68, 68, 0.3)" />
            <stop offset="50%" stopColor="rgba(245, 158, 11, 0.2)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Water Canal Pattern */}
          <linearGradient id="canalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0369a1" stopOpacity="0.7" />
          </linearGradient>

          {/* Safe Route Glow */}
          <filter id="safeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Hazard Glow */}
          <filter id="hazardGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background Canvas */}
        <rect width="1000" height="650" fill="#090d16" />
        <rect width="1000" height="650" fill="url(#grid)" />

        {/* Coastal Edge / Gulf of Mannar Shoreline (East) */}
        <path
          d="M 880 0 Q 860 120 890 260 T 870 450 T 910 650 L 1000 650 L 1000 0 Z"
          fill="#082f49"
          opacity="0.35"
        />
        <text x="910" y="320" fill="#0284c7" fontSize="12" opacity="0.6" letterSpacing="3" transform="rotate(90, 910, 320)">
          GULF OF MANNAR COAST
        </text>

        {/* Low-lying Drainage Basin Contour Areas */}
        <ellipse cx="480" cy="350" rx="140" ry="90" fill="rgba(239, 68, 68, 0.08)" />
        <ellipse cx="680" cy="400" rx="90" ry="70" fill="rgba(239, 68, 68, 0.07)" />

        {/* Drainage Canal (Buckle Surplus Canal) */}
        <path
          d="M 580 0 C 600 150, 620 220, 680 320 C 730 400, 770 480, 880 540"
          fill="none"
          stroke="url(#canalGradient)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <text x="640" y="240" fill="#38bdf8" fontSize="10" opacity="0.7" transform="rotate(52, 640, 240)">
          Buckle Surplus Drainage Canal
        </text>

        {/* Railway Line (Tracks) */}
        <path
          d="M 450 0 L 480 650"
          fill="none"
          stroke="#475569"
          strokeWidth="5"
          strokeDasharray="6 4"
        />
        <text x="462" y="100" fill="#64748b" fontSize="10" letterSpacing="1" transform="rotate(86, 462, 100)">
          SOUTHERN RAILWAY CORRIDOR
        </text>

        {/* Urban Road Network Layout */}
        <g stroke="#1e293b" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round">
          {/* Major Arterial 1: North-South Highway */}
          <path d="M 120 80 L 180 550 L 320 620" />
          {/* Major Arterial 2: Palayamkottai Road Axis */}
          <path d="M 50 380 L 480 360 L 850 420" />
          {/* Major Arterial 3: Northern High Corridor */}
          <path d="M 150 180 L 550 140 L 820 220" />
          {/* Connector Roads */}
          <path d="M 280 160 L 350 450" />
          <path d="M 550 140 L 720 380" />
          <path d="M 380 370 L 480 540 L 680 520" />
          <path d="M 180 540 L 480 540" />
        </g>

        {/* Inner Road Fill */}
        <g stroke="#334155" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 120 80 L 180 550 L 320 620" />
          <path d="M 50 380 L 480 360 L 850 420" />
          <path d="M 150 180 L 550 140 L 820 220" />
          <path d="M 280 160 L 350 450" />
          <path d="M 550 140 L 720 380" />
          <path d="M 380 370 L 480 540 L 680 520" />
          <path d="M 180 540 L 480 540" />
        </g>

        {/* V.O.C. Elevated Overbridge / Flyover Structure (Highlighted) */}
        {showElevations && (
          <g>
            {/* Flyover Piers / Shadow */}
            <path
              d="M 380 400 L 450 300 L 550 220"
              fill="none"
              stroke="#0e7490"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* Flyover Top Surface */}
            <path
              d="M 380 400 L 450 300 L 550 220"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <rect x="420" y="285" width="105" height="18" rx="4" fill="#083344" stroke="#06b6d4" strokeWidth="1" />
            <text x="428" y="298" fill="#67e8f9" fontSize="9" fontWeight="600">
              V.O.C. Flyover (+14m)
            </text>
          </g>
        )}

        {/* Low-lying Subways / Hazard Roadways (Underpass) */}
        <g>
          {/* Underpass dip marker */}
          <rect x="450" y="340" width="60" height="26" rx="4" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
          <text x="456" y="356" fill="#fca5a5" fontSize="8" fontWeight="600">
            Subway Dip (-3m)
          </text>
        </g>

        {/* ACTIVE ROUTE RENDERING */}
        {activeRoute.id === 'safe' ? (
          /* RainRoute Safe Path (Cyan Glow) */
          <g>
            <path
              d={`M ${activeRoute.pathCoordinates.map(p => `${p.x * 10} ${p.y * 6.5}`).join(' L ')}`}
              fill="none"
              stroke="#06b6d4"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#safeGlow)"
              opacity="0.9"
            />
            <path
              d={`M ${activeRoute.pathCoordinates.map(p => `${p.x * 10} ${p.y * 6.5}`).join(' L ')}`}
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="8 6"
            />
          </g>
        ) : (
          /* Standard Shortest Path (Red Danger Glow) */
          <g>
            <path
              d={`M ${activeRoute.pathCoordinates.map(p => `${p.x * 10} ${p.y * 6.5}`).join(' L ')}`}
              fill="none"
              stroke="#ef4444"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="6 4"
              filter="url(#hazardGlow)"
              opacity="0.85"
            />
          </g>
        )}

        {/* Origin Marker (St. Mother Theresa Engg College Campus) */}
        <g transform="translate(180, 533)">
          <circle r="12" fill="#0284c7" />
          <circle r="6" fill="#ffffff" />
          <text x="18" y="4" fill="#e0f2fe" fontSize="12" fontWeight="700">
            START: College Campus
          </text>
          <text x="18" y="16" fill="#94a3b8" fontSize="9">
            St. Mother Theresa Engineering College
          </text>
        </g>

        {/* Destination Marker (Thoothukudi Central Terminal) */}
        <g transform="translate(820, 286)">
          <circle r="12" fill="#10b981" />
          <circle r="6" fill="#ffffff" />
          <text x="-160" y="-8" fill="#d1fae5" fontSize="12" fontWeight="700">
            DESTINATION: Central Terminal
          </text>
          <text x="-160" y="4" fill="#94a3b8" fontSize="9">
            Railway & Intercity Bus Hub
          </text>
        </g>

        {/* FLOOD HAZARD ZONES (Interactive Circles & Pulse Rings) */}
        {floodZones.map((zone) => {
          const cx = zone.x * 10;
          const cy = zone.y * 6.5;
          const isSelected = selectedZone?.id === zone.id;
          const isSevere = zone.depthCm >= 40;
          const isModerate = zone.depthCm >= 25 && zone.depthCm < 40;

          const fillColor = isSevere ? '#ef4444' : isModerate ? '#f59e0b' : '#38bdf8';
          const ringColor = isSevere ? 'rgba(239, 68, 68, 0.4)' : isModerate ? 'rgba(245, 158, 11, 0.4)' : 'rgba(56, 189, 248, 0.3)';

          return (
            <g
              key={zone.id}
              className="cursor-pointer group"
              onClick={() => onSelectZone(zone)}
            >
              {/* Pulsing Hazard Wave Ring */}
              <circle
                cx={cx}
                cy={cy}
                r={isSelected ? '28' : '22'}
                fill={ringColor}
                className="animate-pulse"
              />

              {/* Water Depth Circle */}
              <circle
                cx={cx}
                cy={cy}
                r={isSelected ? '16' : '14'}
                fill="#0f172a"
                stroke={fillColor}
                strokeWidth={isSelected ? '3' : '2'}
              />

              {/* Hazard Center Icon / Depth Text */}
              <text
                x={cx}
                y={cy + 4}
                textAnchor="middle"
                fill="#ffffff"
                fontSize="10"
                fontWeight="700"
              >
                {zone.depthCm}
              </text>

              {/* Unit Tag below */}
              <text
                x={cx}
                y={cy + 22}
                textAnchor="middle"
                fill={fillColor}
                fontSize="8"
                fontWeight="600"
              >
                {zone.depthCm} cm
              </text>
            </g>
          );
        })}

        {/* WEATHER RADAR CLOUDS OVERLAY (If enabled) */}
        {showRadarOverlay && (
          <g className="pointer-events-none transition-opacity duration-500">
            <circle cx="500" cy="300" r="280" fill="url(#radarStorm1)" />
            <circle cx="480" cy="350" r="160" fill="url(#radarStorm2)" />
            <circle cx="700" cy="420" r="140" fill="url(#radarStorm1)" />
          </g>
        )}

        {/* SIMULATED CAR NAVIGATION MARKER */}
        {isSimulatingNav && (
          <g
            transform={`translate(${currentCoords.x * 10}, ${currentCoords.y * 6.5})`}
            className="transition-transform duration-75"
          >
            {/* Proximity Water Radar Ring */}
            <circle
              r="24"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              className="animate-spin"
              style={{ animationDuration: '6s' }}
            />
            {/* Car Beacon */}
            <circle r="11" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
            <circle r="4" fill="#ffffff" />
          </g>
        )}
      </svg>

      {/* Floating Map Controls & Overlays */}
      <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2">
        {/* Radar Toggle */}
        <button
          onClick={() => setShowRadarOverlay(!showRadarOverlay)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-colors shadow-sm ${
            showRadarOverlay
              ? 'bg-sky-950/80 border-sky-500 text-sky-200'
              : 'bg-slate-900/90 border-slate-700 text-slate-300 hover:text-white'
          }`}
        >
          <CloudRain className="w-3.5 h-3.5 text-sky-400" />
          <span>IMD Radar: {showRadarOverlay ? 'ON' : 'OFF'}</span>
        </button>

        {/* Flyover Elevation Toggle */}
        <button
          onClick={() => setShowElevations(!showElevations)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-colors shadow-sm ${
            showElevations
              ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200'
              : 'bg-slate-900/90 border-slate-700 text-slate-300 hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>Elevation Layers</span>
        </button>

        {/* Zoom Controls */}
        <div className="flex items-center bg-slate-900/90 border border-slate-700 rounded-lg overflow-hidden">
          <button
            onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.8))}
            className="px-2.5 py-1 text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Zoom In"
          >
            +
          </button>
          <span className="text-[10px] text-slate-400 px-1 border-x border-slate-800">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
            className="px-2.5 py-1 text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Zoom Out"
          >
            -
          </button>
        </div>
      </div>

      {/* Floating Active Route Badge */}
      <div className="absolute top-3 right-3 max-w-xs bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-lg p-2.5 shadow-xl hidden sm:block">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-200 mb-1">
          <span className="flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Active Corridor</span>
          </span>
          <span
            className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
              activeRoute.floodRiskLevel === 'safe'
                ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-700/50'
                : 'bg-rose-950/80 text-rose-400 border border-rose-700/50'
            }`}
          >
            {activeRoute.floodRiskLevel === 'safe' ? 'FLOOD-SAFE' : 'HIGH RISK'}
          </span>
        </div>
        <p className="text-xs text-slate-300 font-medium truncate">{activeRoute.title}</p>
        <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
          <span>{activeRoute.distanceKm} km</span>
          <span>·</span>
          <span>{activeRoute.durationMin} mins</span>
          <span>·</span>
          <span className={activeRoute.waterObstaclesCount === 0 ? 'text-emerald-400' : 'text-rose-400'}>
            {activeRoute.waterObstaclesCount === 0 ? '0 Floods' : `${activeRoute.waterObstaclesCount} Floods Ahead`}
          </span>
        </div>
      </div>

      {/* Selected Hazard Zone Detail Drawer (Bottom overlay when clicked) */}
      {selectedZone && (
        <div className="absolute bottom-3 left-3 right-3 sm:left-auto sm:right-3 sm:w-96 bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-xl p-4 shadow-2xl animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    selectedZone.depthCm >= 40
                      ? 'bg-rose-500'
                      : selectedZone.depthCm >= 25
                      ? 'bg-amber-500'
                      : 'bg-sky-500'
                  }`}
                />
                <h4 className="text-sm font-bold text-white">{selectedZone.name}</h4>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{selectedZone.landmark}</p>
            </div>
            <button
              onClick={() => onSelectZone(null)}
              className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors"
            >
              ×
            </button>
          </div>

          {/* Depth Meter */}
          <div className="mt-3 grid grid-cols-2 gap-2 bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
            <div>
              <span className="text-[11px] text-slate-400">Measured Depth</span>
              <div className="text-lg font-mono font-bold text-rose-400">
                {selectedZone.depthCm} cm
              </div>
            </div>
            <div>
              <span className="text-[11px] text-slate-400">Water Flow Current</span>
              <div className="text-xs font-semibold text-slate-200 capitalize mt-1">
                {selectedZone.waterFlowRate.replace('_', ' ')}
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-300 mt-2.5 leading-relaxed bg-slate-800/40 p-2 rounded border border-slate-800">
            {selectedZone.notes}
          </p>

          <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800 pt-2">
            <span>Reported {selectedZone.reportedAt}</span>
            <span className="text-cyan-400">Verified by {selectedZone.verifiedCount} commuters</span>
          </div>

          {/* Passable status for selected vehicle */}
          <div className="mt-3 flex items-center justify-between bg-slate-800/60 p-2 rounded-lg border border-slate-700/60">
            <span className="text-xs text-slate-300">
              Clearance for {getVehicleName(selectedVehicle)}:
            </span>
            {selectedZone.passableFor.includes(selectedVehicle) ? (
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Passable
              </span>
            ) : (
              <span className="text-xs font-semibold text-rose-400 flex items-center gap-1">
                <XCircle className="w-3.5 h-3.5" /> Impassable
              </span>
            )}
          </div>
        </div>
      )}

      {/* Map Legend (Bottom Left) */}
      <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md border border-slate-800 rounded-lg p-2 text-[10px] text-slate-300 hidden md:block">
        <div className="font-semibold text-slate-200 mb-1">Water Depth Legend</div>
        <div className="grid grid-cols-3 gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>&gt;40 cm (Blocked)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>20–40 cm (Caution)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>&lt;20 cm (Flyover/Safe)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
