import React from 'react';
import {
  CloudRain,
  Wind,
  Thermometer,
  Radio,
  AlertTriangle,
  Clock,
  Satellite,
  TrendingUp,
} from 'lucide-react';
import { WeatherTelemetry } from '../types';

interface WeatherWidgetProps {
  weather: WeatherTelemetry;
  language: 'en' | 'ta';
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ weather, language }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-xl flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Satellite className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="text-sm font-bold text-white">
              {language === 'en' ? 'Weather Data Integration' : 'வானிலை தரவு இணைப்பு'}
            </h3>
            <p className="text-[11px] text-slate-400">
              IMD & OpenWeatherMap · ISRO Satellite Radar
            </p>
          </div>
        </div>

        {/* IMD Alert Badge */}
        <div className="flex items-center gap-1.5 bg-rose-950/80 border border-rose-800 text-rose-300 px-2.5 py-1 rounded-md text-xs font-bold">
          <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
          <span>IMD Red Alert</span>
        </div>
      </div>

      {/* Main Meteorological Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Rainfall Intensity */}
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <CloudRain className="w-3.5 h-3.5 text-cyan-400" />
            <span>Rainfall Rate</span>
          </div>
          <div className="text-xl font-bold font-mono text-cyan-300">
            {weather.rainfallMmHr} <span className="text-xs font-normal text-slate-400">mm/h</span>
          </div>
          <span className="text-[10px] text-rose-400 font-medium">Flash Flood Risk</span>
        </div>

        {/* Status */}
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <Radio className="w-3.5 h-3.5 text-sky-400" />
            <span>Conditions</span>
          </div>
          <div className="text-sm font-bold text-white truncate mt-1">
            {weather.status}
          </div>
          <span className="text-[10px] text-slate-400">Heavy Inflow</span>
        </div>

        {/* Wind Speed */}
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <Wind className="w-3.5 h-3.5 text-teal-400" />
            <span>Coastal Wind</span>
          </div>
          <div className="text-xl font-bold font-mono text-white">
            {weather.windSpeedKmh} <span className="text-xs font-normal text-slate-400">km/h</span>
          </div>
          <span className="text-[10px] text-slate-400">Gusts up to 55 km/h</span>
        </div>

        {/* Temperature */}
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <Thermometer className="w-3.5 h-3.5 text-amber-400" />
            <span>Ambient Temp</span>
          </div>
          <div className="text-xl font-bold font-mono text-white">
            {weather.temperatureC}°C
          </div>
          <span className="text-[10px] text-slate-400">98% Relative Humidity</span>
        </div>
      </div>

      {/* Advisory Banner */}
      <div className="bg-rose-950/30 border border-rose-900/60 rounded-lg p-3 text-xs text-rose-200">
        <div className="font-semibold text-rose-300 flex items-center gap-1.5 mb-1">
          <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
          <span>{weather.alertTitle}</span>
        </div>
        <p className="leading-relaxed text-slate-300">{weather.alertSummary}</p>
      </div>

      {/* Hourly Precipitation Forecast Bar Graph */}
      <div>
        <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
          <span className="font-medium flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            <span>Upcoming 6-Hour Precipitation Trend</span>
          </span>
          <span className="text-[10px] text-slate-500 font-mono">
            {weather.satelliteTimestamp}
          </span>
        </div>

        <div className="grid grid-cols-6 gap-2 bg-slate-950 p-3 rounded-lg border border-slate-800">
          {weather.hourlyForecast.map((fc, i) => {
            const heightPercent = Math.min(Math.round((fc.mm / 60) * 100), 100);
            return (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <span className="text-[10px] font-mono font-semibold text-cyan-300">
                  {fc.mm}mm
                </span>
                <div className="w-full bg-slate-900 h-16 rounded flex items-end p-0.5">
                  <div
                    className={`w-full rounded-sm transition-all duration-500 ${
                      fc.risk === 'high'
                        ? 'bg-rose-500'
                        : fc.risk === 'moderate'
                        ? 'bg-amber-500'
                        : 'bg-cyan-400'
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-400 font-mono">{fc.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
