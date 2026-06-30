// Web Audio API — configurable sound profiles
let audioCtx = null;
let soundEnabled = true;
let soundProfile = 'soft';

const PROFILES = {
  soft:   { type: 'sine',     volume: 0.03,  pitch: 1 },
  retro:  { type: 'square',   volume: 0.035, pitch: 0.85 },
  arcade: { type: 'triangle', volume: 0.04,  pitch: 1.15 },
  minimal:{ type: 'sine',     volume: 0.015, pitch: 1 },
};

export function setSoundEnabled(enabled) {
  soundEnabled = enabled;
}

export function setSoundProfile(profile) {
  soundProfile = PROFILES[profile] ? profile : 'soft';
}

export function ensureContext() {
  if (typeof window === 'undefined') return;
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();
}

function getProfile() {
  return PROFILES[soundProfile] || PROFILES.soft;
}

function playTone(freq, duration, typeOverride) {
  if (!soundEnabled || !audioCtx) return;
  ensureContext();
  const p = getProfile();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const f = freq * p.pitch;
  osc.type = typeOverride || p.type;
  osc.frequency.setValueAtTime(f, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(f * 0.92, audioCtx.currentTime + duration);
  gain.gain.setValueAtTime(0, audioCtx.currentTime);
  gain.gain.linearRampToValueAtTime(p.volume, audioCtx.currentTime + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

export function playKeySound() { playTone(420, 0.03); }
export function playSuccessSound() {
  if (!soundEnabled) return;
  ensureContext();
  playTone(520, 0.1);
  setTimeout(() => playTone(680, 0.12), 70);
  setTimeout(() => playTone(820, 0.14), 150);
}
export function playErrorSound() { playTone(180, 0.18, 'sawtooth'); }
export function playOpenSound() {
  playTone(320, 0.06);
  setTimeout(() => playTone(480, 0.08), 45);
}
export function playCloseSound() {
  playTone(480, 0.06);
  setTimeout(() => playTone(320, 0.08), 45);
}
export function playMinimizeSound() { playTone(380, 0.06); }
export function playMaximizeSound() { playTone(520, 0.06); }
export function playClickSound() { playTone(460, 0.03); }
