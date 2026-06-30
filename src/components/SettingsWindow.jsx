import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useSettings } from '../lib/SettingsContext';
import { playClickSound, playOpenSound, playSuccessSound, playKeySound } from '../utils/audio';
import { MUSIC_STATIONS } from '../data/musicStations';

const THEMES = [
  { id: 'default',    name: 'Default',     colors: ['bg-amber-400', 'bg-slate-800', 'bg-slate-900'] },
  { id: 'dracula',    name: 'Dracula',     colors: ['bg-purple-400', 'bg-slate-700', 'bg-slate-800'] },
  { id: 'catppuccin', name: 'Catppuccin',  colors: ['bg-pink-300', 'bg-slate-700', 'bg-slate-800'] },
  { id: 'nord',       name: 'Nord',        colors: ['bg-cyan-300', 'bg-slate-600', 'bg-slate-700'] },
  { id: 'tokyo',      name: 'Tokyo Night', colors: ['bg-indigo-400', 'bg-slate-800', 'bg-slate-900'] },
];

const ACCENTS = [
  { id: 'amber',  name: 'Amber',  color: 'bg-amber-400',  glow: 'shadow-[0_0_15px_rgba(245,158,11,0.5)]' },
  { id: 'matrix', name: 'Matrix', color: 'bg-green-400',  glow: 'shadow-[0_0_15px_rgba(74,222,128,0.5)]' },
  { id: 'cyber',  name: 'Cyber',  color: 'bg-cyan-300',   glow: 'shadow-[0_0_15px_rgba(103,232,249,0.5)]' },
  { id: 'neon',   name: 'Neon',   color: 'bg-fuchsia-400',glow: 'shadow-[0_0_15px_rgba(232,121,249,0.5)]' },
  { id: 'azure',  name: 'Azure',  color: 'bg-blue-400',   glow: 'shadow-[0_0_15px_rgba(96,165,250,0.5)]' },
];

const SOUND_PROFILES = [
  { id: 'soft',    name: 'Soft',    desc: 'Gentle & modern' },
  { id: 'retro',   name: 'Retro',   desc: '8-bit chip sounds' },
  { id: 'arcade',  name: 'Arcade',  desc: 'Crisp & punchy' },
  { id: 'minimal', name: 'Minimal', desc: 'Ultra subtle' },
];

const WALLPAPERS = [
  { id: 'dots',     name: 'Dot Grid' },
  { id: 'grid',     name: 'Grid Lines' },
  { id: 'gradient', name: 'Gradient' },
  { id: 'aurora',   name: 'Aurora' },
];

const selectedCls = 'border-accent/50 bg-accent/5 text-accent';
const idleCls = 'border-slate-800/50 hover:border-slate-700';

const SettingsWindow = () => {
  const {
    accent, fontSize, crtScanlines, theme, soundEnabled, soundProfile, musicStation, wallpaper,
    setAccent, setFontSize, setCrtScanlines, setTheme, setSoundEnabled,
    setSoundProfile, setMusicStation, setWallpaper,
  } = useSettings();

  const click = () => playClickSound();

  const previewSound = (profile) => {
    setSoundProfile(profile);
    playOpenSound();
    setTimeout(playSuccessSound, 120);
    setTimeout(playKeySound, 280);
  };

  return (
    <div className="w-full h-full text-slate-300 p-4 sm:p-6 overflow-y-auto font-mono custom-scrollbar" style={{ fontSize: 'var(--ui-font-size, 13px)', background: 'var(--os-terminal)' }}>

      {/* Sound Profile */}
      <div className="mb-6">
        <h3 className="text-xs font-bold text-slate-500 mb-3 tracking-widest uppercase">UI Sound Style</h3>
        <div className="grid grid-cols-2 gap-2">
          {SOUND_PROFILES.map((p) => (
            <button
              key={p.id}
              onClick={() => { click(); previewSound(p.id); }}
              className={`p-2.5 rounded-lg border text-left transition-all ${
                soundProfile === p.id ? selectedCls : idleCls
              }`}
            >
              <span className="text-xs text-white block">{p.name}</span>
              <span className="text-[10px] text-slate-500">{p.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Default Music Station */}
      <div className="mb-6">
        <h3 className="text-xs font-bold text-slate-500 mb-3 tracking-widest uppercase">Default Music Station</h3>
        <select
          value={musicStation}
          onChange={(e) => { click(); setMusicStation(e.target.value); }}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-accent/50"
        >
          {MUSIC_STATIONS.map(s => (
            <option key={s.id} value={s.id}>{s.name} — {s.type === 'stream' ? 'Live' : 'Generated'}</option>
          ))}
        </select>
      </div>

      {/* Wallpaper */}
      <div className="mb-6">
        <h3 className="text-xs font-bold text-slate-500 mb-3 tracking-widest uppercase">Desktop Wallpaper</h3>
        <div className="grid grid-cols-2 gap-2">
          {WALLPAPERS.map((w) => (
            <button
              key={w.id}
              onClick={() => { click(); setWallpaper(w.id); }}
              className={`p-2.5 rounded-lg border text-xs transition-all ${
                wallpaper === w.id ? `${selectedCls}` : `${idleCls} text-slate-400`
              }`}
            >
              {w.name}
            </button>
          ))}
        </div>
      </div>

      {/* OS Theme */}
      <div className="mb-6">
        <h3 className="text-xs font-bold text-slate-500 mb-3 tracking-widest uppercase">OS Theme</h3>
        <div className="flex flex-col gap-2">
          {THEMES.map((t) => (
            <button key={t.id} onClick={() => { click(); setTheme(t.id); }}
              className={`flex items-center justify-between p-2.5 rounded-lg border transition-all ${theme === t.id ? selectedCls : idleCls}`}>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-1">{t.colors.map((c, i) => <div key={i} className={`w-3.5 h-3.5 rounded-full ${c} border border-slate-900`} />)}</div>
                <span className="text-sm">{t.name}</span>
              </div>
              {theme === t.id && <span className="text-xs text-accent">active</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Accent */}
      <div className="mb-6">
        <h3 className="text-xs font-bold text-slate-500 mb-3 tracking-widest uppercase">Accent Color</h3>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {ACCENTS.map((a) => (
            <button key={a.id} onClick={() => { click(); setTheme('default'); setAccent(a.id); }}
              className={`flex flex-col items-center p-2.5 rounded-lg border min-w-[72px] shrink-0 transition-all ${theme === 'default' && accent === a.id ? selectedCls : idleCls}`}>
              <div className={`w-5 h-5 rounded-full ${a.color} ${theme === 'default' && accent === a.id ? a.glow : ''} mb-1`} />
              <span className="text-[10px] text-slate-400">{a.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Font Size */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <h3 className="text-xs font-bold text-slate-500 tracking-widest uppercase">Font Size</h3>
          <span className="text-accent text-sm">{fontSize}px</span>
        </div>
        <input type="range" min="11" max="18" value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value))} className="w-full accent-accent" />
      </div>

      {/* Toggles */}
      {[
        { label: 'Sound Effects', sub: 'UI click & notification sounds', val: soundEnabled, set: setSoundEnabled },
        { label: 'CRT Scanlines', sub: 'Retro CRT overlay effect', val: crtScanlines, set: setCrtScanlines },
      ].map(({ label, sub, val, set }) => (
        <div key={label} className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-xs font-bold text-slate-500 tracking-widest uppercase">{label}</h3>
            <p className="text-[11px] text-slate-500">{sub}</p>
          </div>
          <button onClick={() => { click(); set(!val); }} className={`w-10 h-5 rounded-full relative transition-colors ${val ? 'bg-accent' : 'bg-slate-700'}`}>
            <motion.div initial={false} animate={{ x: val ? 20 : 2 }} className="w-4 h-4 rounded-full bg-white absolute top-0.5 shadow-sm" />
          </button>
        </div>
      ))}

      <div className="pt-3 border-t border-slate-800 text-[10px] text-slate-600">Sabin OS v1.1 — Settings saved automatically</div>
    </div>
  );
};

export default SettingsWindow;
