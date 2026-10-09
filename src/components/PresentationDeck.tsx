import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Play,
  Award,
  Users,
  Compass,
  CloudRain,
  ShieldAlert,
  Cpu,
  Layers,
  Radio,
  ExternalLink,
  Sparkles,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import { SLIDES_DATA, SlideItem } from '../data/slidesData';
import { TEAM_MEMBERS } from '../data/mockData';

interface PresentationDeckProps {
  onSwitchToLiveApp: () => void;
  language: 'en' | 'ta';
}

export const PresentationDeck: React.FC<PresentationDeckProps> = ({
  onSwitchToLiveApp,
  language,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const slide = SLIDES_DATA[currentSlideIndex];
  const totalSlides = SLIDES_DATA.length;

  const goToNext = () => {
    setCurrentSlideIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  };

  const goToPrev = () => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalSlides]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className="flex flex-col bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden min-h-[680px]">
      
      {/* Top Deck Toolbar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-800">
              Slide {slide.id} / {totalSlides}
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">
              {slide.category}
            </span>
          </div>
        </div>

        {/* Slide navigation controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrev}
            disabled={currentSlideIndex === 0}
            className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Previous Slide (Left Arrow)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Quick Slide Selector */}
          <select
            value={currentSlideIndex}
            onChange={(e) => setCurrentSlideIndex(Number(e.target.value))}
            className="bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-500"
          >
            {SLIDES_DATA.map((s, idx) => (
              <option key={s.id} value={idx}>
                {s.id}. {s.title.substring(0, 32)}...
              </option>
            ))}
          </select>

          <button
            onClick={goToNext}
            disabled={currentSlideIndex === totalSlides - 1}
            className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Next Slide (Right Arrow)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Fullscreen toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Jump to Live App CTA */}
          <button
            onClick={onSwitchToLiveApp}
            className="ml-2 px-3 py-1.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Launch Live App</span>
          </button>
        </div>
      </div>

      {/* Main Slide Canvas */}
      <div className="flex-1 p-6 md:p-12 flex flex-col justify-center max-w-5xl mx-auto w-full">
        
        {/* SLIDE 1: TITLE SLIDE */}
        {slide.id === 1 && (
          <div className="space-y-6 text-center animate-in fade-in duration-300">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 text-xs font-semibold">
              <ShieldAlert className="w-4 h-4" />
              <span>Project Presentation · Department of Computer Science & Engineering</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              RainRoute
            </h1>

            <p className="text-xl sm:text-2xl text-cyan-300 font-medium max-w-2xl mx-auto">
              Smart Flood-Safe Navigation for Every Rainy Day
            </p>

            <div className="pt-6 border-t border-slate-800/80 max-w-xl mx-auto space-y-2">
              <div className="text-base font-bold text-white tracking-wide">
                TEAM NEXUS
              </div>
              <div className="text-sm text-slate-300">
                St. Mother Theresa Engineering College, Thoothukudi
              </div>
              <div className="text-xs text-slate-400">
                Department of Computer Science & Engineering | II Year
              </div>
            </div>

            <div className="pt-4 flex justify-center gap-4">
              <button
                onClick={goToNext}
                className="px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm transition-all flex items-center gap-2"
              >
                <span>Begin Presentation</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* SLIDE 2: WHO WE ARE */}
        {slide.id === 2 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Slide 02 · Identity & Purpose
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
                Who We Are
              </h2>
              <p className="text-cyan-300 text-sm mt-1">
                TEAM NEXUS: Connecting Solutions for Safer Roads
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4 text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-6 rounded-xl border border-slate-800">
                <p>
                  We are a team of passionate Computer Science students driven by the vision to solve real-world problems using technology.
                </p>
                <p>
                  Our team name <strong className="text-white">"NEXUS"</strong> represents the connection between innovation and impact — bridging the gap between weather data and commuter safety.
                </p>
                <p className="text-cyan-300 font-medium">
                  Together, we built RainRoute to help people navigate safely during heavy rainfall and flooding.
                </p>
              </div>

              <div className="bg-cyan-950/20 border border-cyan-800/40 p-6 rounded-xl flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">
                    Institutional Affiliation
                  </h4>
                  <div className="text-base font-bold text-white">
                    St. Mother Theresa Engineering College
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Thoothukudi, Tamil Nadu
                  </div>
                  <div className="mt-4 text-sm text-slate-300">
                    Department of Computer Science & Engineering
                  </div>
                  <div className="text-xs text-cyan-400 font-mono mt-0.5">
                    Batch: II Year (B.E. CSE)
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-cyan-900/40 text-xs text-slate-400 italic">
                  "Engineered with local civic insights from Thoothukudi coastal monsoon surges."
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 3: OUR TEAM MEMBERS */}
        {slide.id === 3 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="border-b border-slate-800 pb-4 flex flex-wrap items-end justify-between gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Slide 03 · Team Composition
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
                  Our Team Members
                </h2>
              </div>
              <p className="text-xs font-medium text-cyan-300 italic">
                {slide.quote}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {TEAM_MEMBERS.map((member, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-bold text-sm mb-3 font-mono">
                      {member.initials}
                    </div>
                    <h3 className="text-sm font-bold text-white">
                      {member.name}
                    </h3>
                    <div className="text-xs font-semibold text-cyan-400 mt-0.5">
                      {member.role}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                      {member.focus}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-500 font-mono">
                    Team NEXUS · II Year CSE
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SLIDE 4 & 5: THE PROBLEM & REAL-WORLD IMPACT */}
        {(slide.id === 4 || slide.id === 5) && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                Slide 0{slide.id} · {slide.category}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
                {slide.title}
              </h2>
              <p className="text-slate-400 text-sm mt-1">{slide.subtitle}</p>
            </div>

            {/* Key stats row */}
            {slide.keyStats && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {slide.keyStats.map((st, i) => (
                  <div
                    key={i}
                    className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center"
                  >
                    <div className="text-3xl font-extrabold font-mono text-rose-400">
                      {st.value}
                    </div>
                    <div className="text-xs font-bold text-white mt-1">{st.label}</div>
                    {st.desc && <p className="text-[11px] text-slate-400 mt-1">{st.desc}</p>}
                  </div>
                ))}
              </div>
            )}

            {/* Bullet points */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-3">
              {slide.bulletPoints.map((bp, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0" />
                  <span className="leading-relaxed">{bp}</span>
                </div>
              ))}
            </div>

            {slide.quote && (
              <blockquote className="bg-rose-950/30 border border-rose-900/50 rounded-xl p-4 text-center text-sm font-medium text-rose-200 italic">
                {slide.quote}
              </blockquote>
            )}
          </div>
        )}

        {/* SLIDE 6: OUR SOLUTION */}
        {slide.id === 6 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Slide 06 · The Innovation
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
                Our Solution: RainRoute
              </h2>
              <p className="text-cyan-300 text-sm mt-1">{slide.subtitle}</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-sm text-slate-300 leading-relaxed space-y-3">
              <p>
                <strong className="text-white">RainRoute</strong> is a smart navigation app that helps commuters find safe routes during heavy rainfall and flooding.
              </p>
              <p>
                It combines real-time weather data with crowd-sourced reports to display flooded and blocked roads, and suggests the safest alternative routes.
              </p>
              <p className="text-cyan-300 font-semibold">
                Our mission is to ensure no commuter is caught off-guard by unexpected waterlogging.
              </p>
            </div>

            {/* 3 Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mx-auto flex items-center justify-center mb-2">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">Safe Routes</h4>
                <p className="text-xs text-slate-400 mt-1">
                  High-ground elevation algorithms avoiding waterlogged subways
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
                <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400 mx-auto flex items-center justify-center mb-2">
                  <CloudRain className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">Real-Time Data</h4>
                <p className="text-xs text-slate-400 mt-1">
                  IMD rainfall rate & Doppler radar convective cloud tracking
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
                <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-400 mx-auto flex items-center justify-center mb-2">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">Community Powered</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Crowd-sourced depth reports with AI spam verification
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 7: HOW RAINROUTE WORKS */}
        {slide.id === 7 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Slide 07 · Workflow Pipeline
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
                How RainRoute Works
              </h2>
              <p className="text-slate-400 text-sm mt-1">{slide.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {slide.workflowSteps?.map((st, i) => (
                <div
                  key={i}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-2xl font-mono font-extrabold text-cyan-400">
                      {st.step}
                    </span>
                    <h4 className="text-base font-bold text-white mt-1">{st.name}</h4>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-cyan-400 font-medium">
                    Continuous Live Loop
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-cyan-950/30 border border-cyan-800/40 p-4 rounded-xl text-center text-xs text-cyan-300">
              Note: All steps happen in real-time, providing instant route updates to users.
            </div>
          </div>
        )}

        {/* SLIDE 8: KEY FEATURES */}
        {slide.id === 8 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Slide 08 · System Capabilities
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
                Key Features
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Flood Map', desc: 'Live map showing flooded and blocked roads with water depth' },
                { title: 'Safe Routes', desc: 'AI-powered alternative route suggestions avoiding low basins' },
                { title: 'User Reports', desc: 'Community-driven flood reporting system with spam filtering' },
                { title: 'Weather Alerts', desc: 'Push notifications for incoming heavy rain & IMD warnings' },
                { title: 'Offline Mode', desc: 'Access cached maps without internet during storm outages' },
                { title: 'Emergency SOS', desc: 'Quick access to emergency helplines and high-ground shelters' },
              ].map((feat, i) => (
                <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-cyan-400" />
                    <span>{feat.title}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SLIDE 9: TECHNOLOGY STACK */}
        {slide.id === 9 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Slide 09 · Engineering Stack
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
                Technology Stack
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {slide.techGrid?.map((tg, i) => (
                <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                  <span className="text-xs font-mono text-cyan-400 uppercase font-semibold">
                    {tg.category}
                  </span>
                  <h4 className="text-base font-bold text-white mt-1">{tg.stack}</h4>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{tg.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SLIDE 10: APP INTERFACE CONCEPT */}
        {slide.id === 10 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Slide 10 · UX Architecture
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
                App Interface Concept
              </h2>
              <p className="text-slate-400 text-sm mt-1">{slide.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3 bg-slate-900/60 p-5 rounded-xl border border-slate-800">
                {slide.bulletPoints.map((bp, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="text-cyan-400 font-bold">▪</span>
                    <span>{bp}</span>
                  </div>
                ))}
              </div>

              <div className="bg-cyan-950/20 border border-cyan-800/40 p-6 rounded-xl flex flex-col justify-center items-center text-center">
                <ShieldAlert className="w-12 h-12 text-cyan-400 mb-3" />
                <h4 className="text-base font-bold text-white">Live Working UI Available</h4>
                <p className="text-xs text-slate-300 mt-2 max-w-xs">
                  Experience the interactive map, turn-by-turn guidance, and flood sensor reporting directly in this app.
                </p>
                <button
                  onClick={onSwitchToLiveApp}
                  className="mt-4 px-4 py-2 rounded-lg bg-cyan-400 text-slate-950 font-bold text-xs hover:bg-cyan-300 transition-colors"
                >
                  Switch to Live Application
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 11: WEATHER DATA INTEGRATION */}
        {slide.id === 11 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Slide 11 · Meteorological Pipeline
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
                Weather Data Integration
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <span className="text-xs font-bold text-cyan-400 uppercase">Source 01</span>
                <h4 className="text-sm font-bold text-white mt-1">IMD (India Meteorological Dept)</h4>
                <p className="text-xs text-slate-400 mt-2">
                  Official coastal flood warnings, threshold rainfall triggers, and regional advisories.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <span className="text-xs font-bold text-sky-400 uppercase">Source 02</span>
                <h4 className="text-sm font-bold text-white mt-1">OpenWeatherMap API</h4>
                <p className="text-xs text-slate-400 mt-2">
                  Hyper-local 1-hour precipitation intensity, wind speeds, and relative humidity.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <span className="text-xs font-bold text-teal-400 uppercase">Source 03</span>
                <h4 className="text-sm font-bold text-white mt-1">ISRO Satellite & Doppler Radar</h4>
                <p className="text-xs text-slate-400 mt-2">
                  INSAT-3DR satellite imagery and storm cloud convective movement tracking.
                </p>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-2 text-xs text-slate-300">
              <div className="font-semibold text-white">Automated Triggers:</div>
              <div>• Instant alert sent to commuters when rainfall rate exceeds 30 mm/hr</div>
              <div>• Dynamic rerouting away from historical drainage choke points</div>
            </div>
          </div>
        )}

        {/* SLIDE 12: COMMUNITY REPORTING SYSTEM */}
        {slide.id === 12 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Slide 12 · Crowd-Sourcing
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
                Community Reporting System
              </h2>
              <p className="text-cyan-300 text-sm mt-1">
                RainRoute thrives on community participation
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2.5 bg-slate-900/60 p-5 rounded-xl border border-slate-800 text-xs text-slate-300">
                <div>• One-tap flood reporting with GPS location</div>
                <div>• Photo upload for visual verification</div>
                <div>• Upvote/downvote system for report accuracy</div>
                <div>• Gamification with badges for active reporters</div>
                <div>• AI filters spam and verifies crowd-sourced data</div>
                <div>• Anonymous reporting for user privacy</div>
              </div>

              <div className="bg-cyan-950/30 border border-cyan-800/40 p-6 rounded-xl flex flex-col justify-center text-center">
                <Users className="w-10 h-10 text-cyan-400 mx-auto mb-2" />
                <blockquote className="text-sm font-semibold text-white italic">
                  "Every report makes the road safer for someone else"
                </blockquote>
                <p className="text-xs text-slate-400 mt-3">
                  Crowdsourced intelligence bridges the gap where municipal sensors haven't yet reached.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 13: BENEFITS & IMPACT */}
        {slide.id === 13 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Slide 13 · Value Creation
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
                Benefits & Impact
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Commuter Safety', desc: 'Avoid dangerous flooded roads and reach destinations safely' },
                { title: 'Time Savings', desc: 'Reduce delays by knowing blocked routes in advance' },
                { title: 'Vehicle Protection', desc: 'Prevent engine damage and accidents from waterlogging' },
                { title: 'Emergency Access', desc: 'Help emergency services reach those in need faster' },
                { title: 'City Resilience', desc: 'Build data for better urban flood management planning' },
                { title: 'Community Bond', desc: 'Foster a culture of mutual help among citizens' },
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{item.title}</span>
                  </h4>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SLIDE 14: FUTURE SCOPE */}
        {slide.id === 14 && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Slide 14 · Roadmap
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
                Future Scope
              </h2>
              <p className="text-slate-400 text-sm mt-1">{slide.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'IoT Sensors', desc: 'Deploy water-level ultrasonic sensors at flood-prone intersections for real-time telemetry' },
                { title: 'Drone Surveillance', desc: 'Use drones to assess flood severity and update maps automatically' },
                { title: 'Government Integration', desc: 'Partner with municipal corporations for official flood data sharing' },
                { title: 'Multi-language Support', desc: 'Expand to regional languages (Tamil, Hindi) for wider accessibility across India' },
                { title: 'Vehicle Integration', desc: 'Connect with car infotainment systems (Android Auto / Apple CarPlay) for in-dashboard navigation' },
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                  <h4 className="text-sm font-bold text-cyan-300">{item.title}</h4>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SLIDE 15: THANK YOU */}
        {slide.id === 15 && (
          <div className="space-y-6 text-center animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mx-auto flex items-center justify-center">
              <Award className="w-8 h-8" />
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Thank You!
            </h1>

            <p className="text-lg sm:text-xl text-cyan-300 font-medium">
              RainRoute — Navigating Safety Through Innovation
            </p>

            <div className="pt-6 border-t border-slate-800/80 max-w-xl mx-auto space-y-3">
              <div className="text-sm font-bold text-white">
                Team NEXUS
              </div>
              <div className="text-xs text-slate-300">
                N. Magdalene Ashirvatham (Lead) · A. Srini · P. Revathi · B. Benisha
              </div>
              <div className="text-xs text-slate-400">
                St. Mother Theresa Engineering College, Thoothukudi
              </div>
              <div className="text-xs text-slate-500">
                Department of Computer Science & Engineering | II Year
              </div>
            </div>

            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={onSwitchToLiveApp}
                className="px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm transition-all flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                <span>Test Live Interactive App</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Slide Thumbnails Footer strip */}
      <div className="bg-slate-900/80 border-t border-slate-800 p-2.5 flex items-center justify-center gap-1.5 overflow-x-auto">
        {SLIDES_DATA.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentSlideIndex(idx)}
            className={`w-7 h-6 rounded text-[11px] font-mono font-medium transition-all ${
              currentSlideIndex === idx
                ? 'bg-cyan-400 text-slate-950 font-bold shadow-sm'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
            title={`Slide ${s.id}: ${s.title}`}
          >
            {s.id}
          </button>
        ))}
      </div>

    </div>
  );
};
