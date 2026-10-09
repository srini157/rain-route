import React, { useState } from 'react';
import {
  Users,
  ThumbsUp,
  ThumbsDown,
  ShieldCheck,
  Camera,
  MapPin,
  Clock,
  AlertTriangle,
  Send,
  Award,
  CheckCircle,
  X,
  Upload,
} from 'lucide-react';
import { CommunityReport, HazardSeverity } from '../types';

interface CommunityReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
  reports: CommunityReport[];
  onAddReport: (report: CommunityReport) => void;
  onVoteReport: (id: string, isUpvote: boolean) => void;
  language: 'en' | 'ta';
}

export const CommunityReportsModal: React.FC<CommunityReportsModalProps> = ({
  isOpen,
  onClose,
  reports,
  onAddReport,
  onVoteReport,
  language,
}) => {
  const [activeTab, setActiveTab] = useState<'feed' | 'submit'>('feed');
  const [locationName, setLocationName] = useState('');
  const [depthCm, setDepthCm] = useState(30);
  const [severity, setSeverity] = useState<HazardSeverity>('moderate');
  const [passableVehicle, setPassableVehicle] = useState('SUVs & High Clearance');
  const [notes, setNotes] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [reporterName, setReporterName] = useState('');
  const [hasPhoto, setHasPhoto] = useState(true);
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!locationName) return;

    const newReport: CommunityReport = {
      id: `rep-${Date.now()}`,
      userName: isAnonymous ? 'Anonymous Commuter' : reporterName || 'Commuter Sentinel',
      badge: isAnonymous ? 'Citizen Contributor' : 'Monsoon Scout',
      locationName,
      depthCm: Number(depthCm),
      severity,
      passableVehicle,
      timestamp: 'Just now',
      upvotes: 1,
      downvotes: 0,
      verifiedByAI: true,
      notes: notes || 'Waterlogging reported by commuter.',
      photoUrl: hasPhoto ? '/src/assets/images/rainroute_flood_street_1791535786508.jpg' : undefined,
    };

    onAddReport(newReport);
    setIsSubmittedSuccess(true);
    setTimeout(() => {
      setIsSubmittedSuccess(false);
      setActiveTab('feed');
      setLocationName('');
      setNotes('');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {language === 'en' ? 'Community Flood Reports' : 'சமூக வெள்ள தகவல்கள்'}
              </h3>
              <p className="text-xs text-slate-400">
                {language === 'en'
                  ? 'Crowd-Sourced Intelligence Verified by RainRoute ML'
                  : 'பொதுமக்கள் தரும் உண்மைத் தகவல்கள்'}
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

        {/* Tab Buttons */}
        <div className="flex border-b border-slate-800 bg-slate-950/50 px-5 pt-2 gap-4">
          <button
            onClick={() => setActiveTab('feed')}
            className={`pb-2.5 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'feed'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {language === 'en' ? 'Live Community Feed' : 'தகவல் பட்டியல்'} ({reports.length})
          </button>
          <button
            onClick={() => setActiveTab('submit')}
            className={`pb-2.5 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'submit'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {language === 'en' ? '+ Submit New Flood Report' : '+ புதிய வெள்ள தகவல் பதிவு'}
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {activeTab === 'feed' ? (
            <div className="space-y-4">
              {/* Gamification banner */}
              <div className="bg-cyan-950/30 border border-cyan-800/40 rounded-xl p-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-cyan-300">
                  <Award className="w-4 h-4 text-cyan-400" />
                  <span>"Every report makes the road safer for someone else"</span>
                </div>
                <span className="text-[11px] text-cyan-400 font-mono hidden sm:inline">
                  AI Spam Filter: Active
                </span>
              </div>

              {/* Feed items */}
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-4 transition-all hover:border-slate-700"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-white">
                          {report.locationName}
                        </span>
                        {report.verifiedByAI && (
                          <span className="inline-flex items-center gap-1 text-[10px] text-cyan-400 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-800">
                            <ShieldCheck className="w-3 h-3" /> AI & Radar Verified
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                        <span>{report.userName}</span>
                        <span>·</span>
                        <span className="text-cyan-400/90">{report.badge}</span>
                        <span>·</span>
                        <span>{report.timestamp}</span>
                      </div>
                    </div>

                    {/* Depth Badge */}
                    <div className="text-right">
                      <span className="text-lg font-mono font-bold text-rose-400">
                        {report.depthCm} cm
                      </span>
                      <span className="block text-[10px] text-slate-400">water depth</span>
                    </div>
                  </div>

                  {/* Notes */}
                  <p className="text-xs text-slate-300 mt-2.5 leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                    {report.notes}
                  </p>

                  {/* Photo if present */}
                  {report.photoUrl && (
                    <div className="mt-3 relative rounded-lg overflow-hidden border border-slate-800 max-h-48">
                      <img
                        src={report.photoUrl}
                        alt="Flood condition verification"
                        className="w-full h-44 object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute bottom-2 left-2 bg-slate-950/80 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur">
                        Verified Photo Upload
                      </div>
                    </div>
                  )}

                  {/* Passable status and voting footer */}
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800/80 pt-2.5 text-xs">
                    <span className="text-slate-400">
                      Passable for:{' '}
                      <strong className="text-slate-200">{report.passableVehicle}</strong>
                    </span>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-slate-400">Is this accurate?</span>
                      <button
                        onClick={() => onVoteReport(report.id, true)}
                        className="flex items-center gap-1 text-slate-400 hover:text-emerald-400 transition-colors p-1"
                        title="Upvote report"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span className="text-xs font-mono">{report.upvotes}</span>
                      </button>
                      <button
                        onClick={() => onVoteReport(report.id, false)}
                        className="flex items-center gap-1 text-slate-400 hover:text-rose-400 transition-colors p-1"
                        title="Downvote report"
                      >
                        <ThumbsDown className="w-3.5 h-3.5" />
                        <span className="text-xs font-mono">{report.downvotes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* SUBMIT NEW FLOOD REPORT FORM */
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSubmittedSuccess ? (
                <div className="bg-emerald-950/60 border border-emerald-800 p-6 rounded-xl text-center space-y-2">
                  <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-white">Report Submitted!</h4>
                  <p className="text-xs text-slate-300">
                    Thank you for helping keep fellow commuters safe. Your report is live and verified against radar readings.
                  </p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Location / Road Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="e.g. Cruz Fernandez Avenue / Railway Underpass"
                        value={locationName}
                        onChange={(e) => setLocationName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                      />
                      <MapPin className="w-4 h-4 text-cyan-400 absolute right-3 top-2.5" />
                    </div>
                  </div>

                  {/* Depth Picker Slider */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1">
                      <span>Estimated Water Depth</span>
                      <span className="text-cyan-400 font-mono text-sm">{depthCm} cm</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="100"
                      step="5"
                      value={depthCm}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setDepthCm(val);
                        if (val < 20) setSeverity('low');
                        else if (val < 40) setSeverity('moderate');
                        else setSeverity('severe');
                      }}
                      className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                      <span>10cm (Ankle)</span>
                      <span>25cm (Shin)</span>
                      <span>50cm (Knee / Car Bumper)</span>
                      <span>80cm+ (Submerged)</span>
                    </div>
                  </div>

                  {/* Passable Vehicles */}
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Passable For
                    </label>
                    <select
                      value={passableVehicle}
                      onChange={(e) => setPassableVehicle(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="All Vehicles (Shallow)">All Vehicles (Shallow water)</option>
                      <option value="SUVs & High Clearance">SUVs & High Clearance Vehicles</option>
                      <option value="Heavy Trucks & Buses Only">Heavy Trucks & Buses Only</option>
                      <option value="Blocked / Completely Impassable">Blocked / Completely Impassable</option>
                    </select>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Road Condition Notes
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Stalled vehicles present, strong current from drainage overflow..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
                    />
                  </div>

                  {/* Photo Verification Toggle */}
                  <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Camera className="w-4 h-4 text-cyan-400" />
                      <div>
                        <span className="text-xs font-medium text-slate-200 block">
                          Attach Photo Verification
                        </span>
                        <span className="text-[10px] text-slate-400">
                          Adds camera timestamp and AI visual verification
                        </span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={hasPhoto}
                      onChange={(e) => setHasPhoto(e.target.checked)}
                      className="accent-cyan-400 w-4 h-4"
                    />
                  </div>

                  {/* Reporter Privacy / Alias */}
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="accent-cyan-400 w-4 h-4"
                      />
                      <span>Report anonymously for privacy</span>
                    </label>
                  </div>

                  {!isAnonymous && (
                    <input
                      type="text"
                      placeholder="Your Name (Optional)"
                      value={reporterName}
                      onChange={(e) => setReporterName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  )}

                  <button
                    type="submit"
                    className="w-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold py-2.5 rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-4 h-4" />
                    <span>Publish Flood Report to Community</span>
                  </button>
                </>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
