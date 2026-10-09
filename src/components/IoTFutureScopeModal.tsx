import React, { useState } from 'react';
import {
  Radio,
  Cpu,
  Wifi,
  BatteryCharging,
  AlertTriangle,
  Building2,
  X,
  RefreshCw,
  Compass,
} from 'lucide-react';

interface IoTFutureScopeModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'ta';
}

interface SensorNode {
  id: string;
  name: string;
  location: string;
  sensorType: string;
  waterLevelCm: number;
  thresholdCm: number;
  status: 'normal' | 'warning' | 'critical';
  batteryPercent: number;
  solarPowered: boolean;
  lastPing: string;
}

export const IoTFutureScopeModal: React.FC<IoTFutureScopeModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [nodes, setNodes] = useState<SensorNode[]>([
    {
      id: 'NODE-TH-01',
      name: 'Railway Underpass North Culvert',
      location: '12m from Southern Railway Pier #4',
      sensorType: 'Ultrasonic HC-SR04 Waterproof Beam',
      waterLevelCm: 48,
      thresholdCm: 25,
      status: 'critical',
      batteryPercent: 92,
      solarPowered: true,
      lastPing: '3 sec ago',
    },
    {
      id: 'NODE-TH-02',
      name: 'Buckle Canal Surplus Sluice Gate',
      location: 'George Road Intersection Weir',
      sensorType: 'Submersible Hydrostatic Pressure Probe',
      waterLevelCm: 22,
      thresholdCm: 30,
      status: 'normal',
      batteryPercent: 88,
      solarPowered: true,
      lastPing: '8 sec ago',
    },
    {
      id: 'NODE-TH-03',
      name: 'Cruz Fernandez Low Causeway',
      location: 'Port Link Road Chainage 4+200',
      sensorType: 'Radar Level Gauge (77 GHz)',
      waterLevelCm: 56,
      thresholdCm: 35,
      status: 'critical',
      batteryPercent: 96,
      solarPowered: true,
      lastPing: '1 sec ago',
    },
    {
      id: 'NODE-TH-04',
      name: 'Old Bus Stand Palayamkottai Jn',
      location: 'Storm Drain Retention Basin',
      sensorType: 'Laser Time-of-Flight Telemetry',
      waterLevelCm: 32,
      thresholdCm: 20,
      status: 'warning',
      batteryPercent: 85,
      solarPowered: true,
      lastPing: '5 sec ago',
    },
  ]);

  const [isSyncingGov, setIsSyncingGov] = useState(false);
  const [govSyncDone, setGovSyncDone] = useState(false);

  if (!isOpen) return null;

  const handleSimulateSync = () => {
    setIsSyncingGov(true);
    setTimeout(() => {
      setIsSyncingGov(false);
      setGovSyncDone(true);
      setTimeout(() => setGovSyncDone(false), 3000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>{language === 'en' ? 'IoT Water-Level Telemetry Grid' : 'சென்சார் கள கண்காணிப்பு'}</span>
                <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800 px-1.5 py-0.5 rounded font-mono">
                  FUTURE SCOPE (SLIDE 14)
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Autonomous Hardware Probes & Municipal Smart City Infrastructure
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          
          {/* Municipal Sync Banner */}
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <span className="text-xs font-bold text-white block">
                  Thoothukudi City Municipal Corporation API Gateway
                </span>
                <span className="text-[11px] text-slate-400 block">
                  Automated bilateral data handshake for disaster management
                </span>
              </div>
            </div>

            <button
              onClick={handleSimulateSync}
              disabled={isSyncingGov}
              className="px-3 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncingGov ? 'animate-spin' : ''}`} />
              <span>{govSyncDone ? 'Synced with Corporation!' : isSyncingGov ? 'Syncing...' : 'Sync Municipal Data'}</span>
            </button>
          </div>

          {/* Real-time Hardware Sensor Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-cyan-400" />
              <span>Active IoT Ultrasonic Nodes</span>
            </h4>

            {nodes.map((node) => (
              <div
                key={node.id}
                className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 hover:border-slate-700 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-cyan-400">
                        {node.id}
                      </span>
                      <span className="text-xs font-bold text-white">
                        {node.name}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      {node.location} · {node.sensorType}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${
                      node.status === 'critical'
                        ? 'bg-rose-950/80 text-rose-400 border-rose-800'
                        : node.status === 'warning'
                        ? 'bg-amber-950/80 text-amber-400 border-amber-800'
                        : 'bg-emerald-950/80 text-emerald-400 border-emerald-800'
                    }`}
                  >
                    {node.status}
                  </span>
                </div>

                {/* Sensor reading bar */}
                <div className="mt-3 bg-slate-900 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Water Level</span>
                      <span className="text-base font-mono font-bold text-white">
                        {node.waterLevelCm} <span className="text-xs text-slate-400">cm</span>
                      </span>
                    </div>
                    <div className="border-l border-slate-800 pl-4">
                      <span className="text-[10px] text-slate-400 block">Alert Threshold</span>
                      <span className="text-xs font-mono text-slate-300">
                        {node.thresholdCm} cm
                      </span>
                    </div>
                  </div>

                  <div className="text-right text-[10px] text-slate-400 space-y-0.5">
                    <div className="flex items-center justify-end gap-1 text-cyan-300">
                      <BatteryCharging className="w-3 h-3" />
                      <span>{node.batteryPercent}% Solar</span>
                    </div>
                    <div>Ping: {node.lastPing}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Drone and Car Infotainment Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl">
              <h5 className="text-xs font-bold text-white flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-cyan-400" />
                <span>Autonomous Drone Reconnaissance</span>
              </h5>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                Tethered and autonomous quadcopters conduct visual photogrammetry along the Buckle Canal and low subways during rainfall surges.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl">
              <h5 className="text-xs font-bold text-white flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-teal-400" />
                <span>In-Car Infotainment (CarPlay / Auto)</span>
              </h5>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                Direct head-unit HUD projection warning drivers 500 meters ahead of deep water spots before headlights detect standing water.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
