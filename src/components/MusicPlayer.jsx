/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import {  motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp, FaVolumeMute, FaMusic, FaBroadcastTower } from 'react-icons/fa';
import { playClickSound } from '../utils/audio';
import { useSettings } from '../lib/SettingsContext';
import { MUSIC_STATIONS } from '../data/musicStations';

function getCtx() {
  return new (window.AudioContext || window.webkitAudioContext)();
}

const MusicPlayer = () => {
  const { musicStation, setMusicStation } = useSettings();
  const initialIdx = Math.max(0, MUSIC_STATIONS.findIndex(s => s.id === musicStation));

  const [stationIdx, setStationIdx] = useState(initialIdx >= 0 ? initialIdx : 2);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.65);
  const [progress, setProgress] = useState(0);
  const [bars, setBars] = useState(Array(12).fill(4));
  const [streamLoaded, setStreamLoaded] = useState(false);

  const ctxRef = useRef(null);
  const masterRef = useRef(null);
  const schedRef = useRef(null);
  const progRef = useRef(null);
  const animRef = useRef(null);
  const beatRef = useRef(0);
  const playingRef = useRef(false);

  const station = MUSIC_STATIONS[stationIdx];
  const isStream = station.type === 'stream';

  const stopProcedural = useCallback(() => {
    playingRef.current = false;
    if (schedRef.current) clearTimeout(schedRef.current);
    if (progRef.current) clearInterval(progRef.current);
    if (animRef.current) clearTimeout(animRef.current);
    if (masterRef.current && ctxRef.current) {
      masterRef.current.gain.setTargetAtTime(0, ctxRef.current.currentTime, 0.1);
    }
    beatRef.current = 0;
  }, []);

  const scheduleNote = useCallback((freq, start, dur, type, gain) => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master) return;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0, start);
    g.gain.linearRampToValueAtTime(gain, start + 0.02);
    g.gain.setTargetAtTime(0, start + dur * 0.7, 0.08);
    osc.connect(g);
    g.connect(master);
    osc.start(start);
    osc.stop(start + dur + 0.2);
  }, []);

  const scheduleBeat = useCallback(() => {
    if (!playingRef.current) return;
    const ctx = ctxRef.current;
    const s = MUSIC_STATIONS[stationIdx];
    if (!ctx || s.type !== 'procedural') return;

    const beatDur = 60 / s.bpm;
    const now = ctx.currentTime;
    const beat = beatRef.current;

    if (beat % 4 === 0 || beat % 4 === 2) scheduleNote(s.bass, now, beatDur * 1.8, 'sine', 0.28);
    const pattern = [0, 2, 1, 3, 2, 4, 1, 0];
    const noteIdx = pattern[beat % pattern.length] % s.scale.length;
    if (beat % 2 === 0) scheduleNote(s.scale[noteIdx], now + 0.01, beatDur * 0.45, s.wave, 0.13);

    beatRef.current = beat + 1;
    schedRef.current = setTimeout(scheduleBeat, beatDur * 1000 * 0.95);
  }, [stationIdx, scheduleNote]);

  const animateBars = useCallback(() => {
    if (!playingRef.current) return;
    setBars(Array(12).fill(0).map((_, i) => Math.random() * (i < 5 ? 14 : 9) + 4));
    animRef.current = setTimeout(animateBars, 140);
  }, []);

  const startProcedural = useCallback(() => {
    if (!ctxRef.current) ctxRef.current = getCtx();
    const ctx = ctxRef.current;
    if (ctx.state === 'suspended') ctx.resume();
    const master = ctx.createGain();
    master.gain.value = muted ? 0 : volume * 0.65;
    master.connect(ctx.destination);
    masterRef.current = master;
    playingRef.current = true;
    beatRef.current = 0;
    scheduleBeat();
    animateBars();
    progRef.current = setInterval(() => setProgress(p => (p >= 100 ? 0 : p + 0.25)), 350);
  }, [muted, volume, scheduleBeat, animateBars]);

  const stopAll = useCallback(() => {
    stopProcedural();
    setStreamLoaded(false);
    setProgress(0);
    setBars(Array(12).fill(4));
  }, [stopProcedural]);

  const togglePlay = () => {
    playClickSound();
    if (playing) {
      stopAll();
      setPlaying(false);
    } else {
      if (isStream) setStreamLoaded(true);
      else startProcedural();
      setPlaying(true);
    }
  };

  const selectStation = (idx) => {
    playClickSound();
    stopAll();
    setPlaying(false);
    setStationIdx(idx);
    setMusicStation(MUSIC_STATIONS[idx].id);
  };

  const changeStation = (dir) => {
    const next = (stationIdx + dir + MUSIC_STATIONS.length) % MUSIC_STATIONS.length;
    selectStation(next);
  };

  useEffect(() => {
    if (masterRef.current && ctxRef.current) {
      masterRef.current.gain.setTargetAtTime(muted ? 0 : volume * 0.65, ctxRef.current.currentTime, 0.05);
    }
  }, [volume, muted]);

  useEffect(() => () => stopAll(), [stopAll]);

  const totalSecs = Math.round((180 * progress) / 100);
  const mins = Math.floor(totalSecs / 60);
  const secs = totalSecs % 60;

  return (
    <div className="p-4 custom-scrollbar overflow-y-auto max-h-[min(520px,70vh)]">
      {/* Now playing */}
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-11 h-11 rounded-lg border flex items-center justify-center shrink-0 ${playing ? 'border-accent/40' : 'border-slate-700'}`}>
          {isStream ? <FaBroadcastTower className={`${station.color} ${playing ? 'animate-pulse' : ''}`} /> : <FaMusic className={`${station.color} ${playing ? 'animate-pulse' : ''}`} />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-white truncate">{station.name}</div>
          <div className="text-xs font-mono text-slate-500 truncate">{station.artist}</div>
          <div className="text-[10px] font-mono text-slate-600">{isStream ? 'Live Stream' : `${station.bpm} BPM · Generated`}</div>
        </div>
        <button onClick={() => { playClickSound(); setMuted(m => !m); }} className="text-slate-500 hover:text-white transition-colors shrink-0">
          {muted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
      </div>

      {/* Stream embed — only loads when playing */}
      {isStream && playing && streamLoaded && (
        <div className="mb-3 rounded-lg overflow-hidden border border-slate-800 bg-black h-[120px]">
          <iframe
            title={station.name}
            width="100%"
            height="120"
            src={`https://www.youtube-nocookie.com/embed/${station.embedId}?autoplay=1&mute=${muted ? 1 : 0}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
            loading="lazy"
            className="border-0"
          />
        </div>
      )}

      {/* Visualizer */}
      {!isStream && (
        <div className="flex items-end gap-0.5 h-9 mb-3 px-1 bg-slate-900/50 rounded-md overflow-hidden">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              animate={{ height: playing ? `${h}px` : '4px' }}
              transition={{ duration: 0.1 }}
              className="flex-1 rounded-sm opacity-80"
              style={{ background: i < 4 ? 'var(--os-accent)' : i < 8 ? '#22d3ee' : '#e879f9', minHeight: 4 }}
            />
          ))}
        </div>
      )}

      {!isStream && (
        <div className="mb-3">
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <motion.div className="h-full bg-accent rounded-full" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
            <span>{mins}:{secs.toString().padStart(2, '0')}</span>
            <span>3:00</span>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-center gap-5 mb-3">
        <button onClick={() => changeStation(-1)} className="text-slate-500 hover:text-white transition-colors"><FaStepBackward /></button>
        <button onClick={togglePlay} className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-black hover:brightness-110 active:scale-95 transition-all">
          <AnimatePresence mode="wait">
            {playing
              ? <motion.span key="p" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><FaPause /></motion.span>
              : <motion.span key="pl" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><FaPlay className="ml-0.5" /></motion.span>}
          </AnimatePresence>
        </button>
        <button onClick={() => changeStation(1)} className="text-slate-500 hover:text-white transition-colors"><FaStepForward /></button>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-2 mb-3 px-1">
        <FaVolumeMute className="text-slate-600 text-xs shrink-0" />
        <input type="range" min={0} max={1} step={0.01} value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="flex-1 accent-accent h-1 cursor-pointer" />
      </div>

      {/* Station list */}
      <div className="space-y-1 border-t border-slate-800 pt-3">
        <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest mb-2">Stations</p>
        {MUSIC_STATIONS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => selectStation(i)}
            className={`w-full flex items-center gap-2 px-2 py-2 rounded text-xs font-mono transition-colors text-left ${
              i === stationIdx ? 'bg-accent/10 text-accent' : 'text-slate-500 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${i === stationIdx && playing ? 'bg-accent animate-pulse' : 'bg-slate-700'}`} />
            <div className="flex-1 min-w-0">
              <span className="block truncate">{s.name}</span>
              <span className="text-[10px] text-slate-600 truncate block">{s.desc}</span>
            </div>
            <span className="text-[9px] text-slate-600 shrink-0">{s.type === 'stream' ? 'LIVE' : 'GEN'}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MusicPlayer;
