import React, { useState } from 'react';
import {
  ShieldAlert,
  PhoneCall,
  Home,
  MapPin,
  Share2,
  CheckCircle,
  AlertOctagon,
  X,
  Radio,
  ExternalLink,
} from 'lucide-react';
import { EMERGENCY_CONTACTS, SAFE_SHELTERS } from '../data/mockData';

interface EmergencySOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'ta';
}

export const EmergencySOSModal: React.FC<EmergencySOSModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [sosSent, setSosSent] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleTriggerSOS = () => {
    setSosSent(true);
    setTimeout(() => {
      setSosSent(false);
    }, 4000);
  };

  const handleCopyNumber = (num: string, id: string) => {
    navigator.clipboard?.writeText(num);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 bg-rose-950/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>{language === 'en' ? 'Emergency SOS & Disaster Helplines' : 'அவசர உதவி & பேரிடர் தொடர்பு'}</span>
                <span className="text-[10px] bg-rose-900/60 text-rose-300 border border-rose-700/50 px-1.5 py-0.5 rounded font-mono">
                  24/7 ACTIVE
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Thoothukudi District Disaster Operations Cell & Tamil Nadu Rescue
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

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* 1-Tap SOS Beacon Broadcast */}
          <div className="bg-rose-950/40 border border-rose-850 p-4 rounded-xl text-center space-y-3">
            <div className="flex items-center justify-center gap-2 text-rose-300 text-xs font-semibold uppercase tracking-wider">
              <Radio className="w-4 h-4 text-rose-400" />
              <span>Instant Distress Location Beacon</span>
            </div>
            
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              If your vehicle is stranded or taking water, trigger this distress signal to transmit your live GPS coordinates to DDMA and emergency rescue units.
            </p>

            <button
              onClick={handleTriggerSOS}
              className={`px-6 py-3 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 mx-auto ${
                sosSent
                  ? 'bg-emerald-600 text-white'
                  : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-950/50'
              }`}
            >
              {sosSent ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>GPS Beacon Transmitted to DDMA Cell (Lat: 8.764, Lng: 78.134)</span>
                </>
              ) : (
                <>
                  <AlertOctagon className="w-5 h-5" />
                  <span>Transmit One-Tap Emergency SOS</span>
                </>
              )}
            </button>
          </div>

          {/* Emergency Helpline Numbers */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
              <span>Direct Emergency Helplines</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {EMERGENCY_CONTACTS.map((contact) => (
                <div
                  key={contact.id}
                  className="bg-slate-950 border border-slate-800 rounded-lg p-3 flex items-center justify-between hover:border-slate-700 transition-colors"
                >
                  <div className="truncate mr-2">
                    <span className="text-xs font-bold text-white block truncate">
                      {contact.name}
                    </span>
                    <span className="text-[10px] text-slate-400 block truncate">
                      {contact.department}
                    </span>
                    <span className="text-[10px] text-cyan-400 font-mono">
                      {contact.availableHours}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <a
                      href={`tel:${contact.number}`}
                      className="px-2.5 py-1.5 rounded-md bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-800 text-cyan-300 text-xs font-mono font-bold flex items-center gap-1"
                    >
                      <PhoneCall className="w-3 h-3" />
                      <span>{contact.number}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* High Ground Relief Shelters */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-emerald-400" />
              <span>Designated Flood Shelters (Elevated High Ground)</span>
            </h4>

            <div className="space-y-2">
              {SAFE_SHELTERS.map((sh) => (
                <div
                  key={sh.id}
                  className="bg-slate-950 border border-slate-800 rounded-lg p-3 flex flex-wrap items-center justify-between gap-2"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{sh.name}</span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800">
                        +{sh.elevationMeters}m Elevation
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{sh.address}</p>
                    <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-2">
                      <span>Capacity: {sh.capacity} persons</span>
                      <span>·</span>
                      <span>Occupancy: {sh.currentOccupancy}/{sh.capacity}</span>
                      <span>·</span>
                      <span className="text-cyan-400">{sh.distanceKm} km away</span>
                    </div>
                  </div>

                  <a
                    href={`tel:${sh.phone}`}
                    className="text-xs text-slate-300 bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-lg hover:text-white transition-colors flex items-center gap-1"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Contact Shelter</span>
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
