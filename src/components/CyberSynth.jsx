import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaPlay, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

// Frequencies for C4-C5 octave
const NOTES = [
  { note: 'C', freq: 261.63, key: 'A' },
  { note: 'C#', freq: 277.18, key: 'W', isAccidental: true },
  { note: 'D', freq: 293.66, key: 'S' },
  { note: 'D#', freq: 311.13, key: 'E', isAccidental: true },
  { note: 'E', freq: 329.63, key: 'D' },
  { note: 'F', freq: 349.23, key: 'F' },
  { note: 'F#', freq: 369.99, key: 'T', isAccidental: true },
  { note: 'G', freq: 392.00, key: 'G' },
  { note: 'G#', freq: 415.30, key: 'Y', isAccidental: true },
  { note: 'A', freq: 440.00, key: 'H' },
  { note: 'A#', freq: 466.16, key: 'U', isAccidental: true },
  { note: 'B', freq: 493.88, key: 'J' },
  { note: 'C5', freq: 523.25, key: 'K' },
];

const DRUM_PADS = [
  { id: 'kick', label: 'KICK', key: '1', desc: 'Deep Sine Bass' },
  { id: 'snare', label: 'SNARE', key: '2', desc: 'Noise Burst' },
  { id: 'hihat', label: 'HI-HAT', key: '3', desc: 'Short Metal Tick' },
  { id: 'zap', label: 'ZAP', key: '4', desc: 'Pitch Sweep' },
];

const CyberSynth = () => {
  const [synthType, setSynthType] = useState('sine'); // sine, sawtooth, triangle, square
  const [octave, setOctave] = useState(0); // -1, 0, 1
  const [activeNotes, setActiveNotes] = useState({});
  const [muted, setMuted] = useState(false);
  const [gainValue, setGainValue] = useState(0.3);

  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const mainGainRef = useRef(null);
  const analyzerRef = useRef(null);
  const activeOscillators = useRef({});
  const animationFrameId = useRef(null);

  // Initialize Audio Context on demand
  const initAudio = useCallback(() => {
    if (audioCtxRef.current) return;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    const gainNode = ctx.createGain();
    const analyzerNode = ctx.createAnalyser();

    analyzerNode.fftSize = 256;
    gainNode.gain.setValueAtTime(gainValue, ctx.currentTime);

    // Connections: Osc -> Gain -> Analyzer -> Destination
    gainNode.connect(analyzerNode);
    analyzerNode.connect(ctx.destination);

    audioCtxRef.current = ctx;
    mainGainRef.current = gainNode;
    analyzerRef.current = analyzerNode;

    // Start Visualizer Loop
    drawVisualizer();
  }, [gainValue]);

  // Adjust volume
  useEffect(() => {
    if (mainGainRef.current && audioCtxRef.current) {
      mainGainRef.current.gain.setValueAtTime(muted ? 0 : gainValue, audioCtxRef.current.currentTime);
    }
  }, [gainValue, muted]);

  // Cleanup audio
  useEffect(() => {
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  // Draw Web Audio Visualizer
  const drawVisualizer = () => {
    if (!canvasRef.current || !analyzerRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const analyzer = analyzerRef.current;
    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationFrameId.current = requestAnimationFrame(draw);
      analyzer.getByteTimeDomainData(dataArray);

      // Gradient background matching terminal styles
      ctx.fillStyle = 'rgba(15, 23, 42, 0.4)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 2;
      // Use CSS variable accent color
      ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent-color') || '#22c55e';
      ctx.beginPath();

      const sliceWidth = canvas.width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      // Render static style grid lines over visualizer
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      for (let j = 0; j < canvas.width; j += 40) {
        ctx.beginPath();
        ctx.moveTo(j, 0);
        ctx.lineTo(j, canvas.height);
        ctx.stroke();
      }
      for (let k = 0; k < canvas.height; k += 20) {
        ctx.beginPath();
        ctx.moveTo(0, k);
        ctx.lineTo(canvas.width, k);
        ctx.stroke();
      }
    };

    draw();
  };

  // Play a Synth Note
  const playNote = (noteObj) => {
    initAudio();
    if (!audioCtxRef.current || !mainGainRef.current) return;

    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Stop previous instance if exists
    stopNote(noteObj.note);

    const freqMultiplier = Math.pow(2, octave);
    const frequency = noteObj.freq * freqMultiplier;

    const osc = ctx.createOscillator();
    const noteGain = ctx.createGain();

    osc.type = synthType;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);

    // Envelope setting (Attack = 0.05s, Sustain, Release)
    noteGain.gain.setValueAtTime(0, ctx.currentTime);
    noteGain.gain.linearRampToValueAtTime(1.0, ctx.currentTime + 0.05);

    osc.connect(noteGain);
    noteGain.connect(mainGainRef.current);

    osc.start();

    activeOscillators.current[noteObj.note] = { osc, gain: noteGain };
    setActiveNotes(prev => ({ ...prev, [noteObj.note]: true }));
  };

  // Stop a Synth Note
  const stopNote = (noteName) => {
    const oscData = activeOscillators.current[noteName];
    if (oscData && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      const { osc, gain } = oscData;

      try {
        // Linear decay to 0 over 0.2s
        gain.gain.cancelScheduledValues(ctx.currentTime);
        gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
        
        setTimeout(() => {
          try {
            osc.stop();
            osc.disconnect();
          } catch (e) {}
        }, 250);
      } catch (e) {
        try {
          osc.stop();
        } catch (err) {}
      }

      delete activeOscillators.current[noteName];
      setActiveNotes(prev => {
        const copy = { ...prev };
        delete copy[noteName];
        return copy;
      });
    }
  };

  // Play Drum/SFX pad
  const playDrum = (id) => {
    initAudio();
    if (!audioCtxRef.current || !mainGainRef.current) return;
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(mainGainRef.current);

    const now = ctx.currentTime;

    if (id === 'kick') {
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(0.01, now + 0.3);
      gain.gain.setValueAtTime(1.0, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (id === 'snare') {
      // Noise buffer snare
      const bufferSize = ctx.sampleRate * 0.15;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'highpass';
      noiseFilter.frequency.value = 1000;

      noise.connect(noiseFilter);
      noiseFilter.connect(gain);

      gain.gain.setValueAtTime(0.7, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

      noise.start(now);
      noise.stop(now + 0.16);
    } else if (id === 'hihat') {
      // High frequency metal tick
      osc.frequency.setValueAtTime(10000, now);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.06);
    } else if (id === 'zap') {
      // Classic arcade sweep
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.25);
      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.26);
    }
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.repeat) return;
      // Skip if typing in an input
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') return;

      const key = e.key.toUpperCase();
      const noteMatch = NOTES.find(n => n.key === key);
      if (noteMatch) {
        e.preventDefault();
        playNote(noteMatch);
      }

      const padMatch = DRUM_PADS.find(p => p.key === key);
      if (padMatch) {
        e.preventDefault();
        playDrum(padMatch.id);
      }
    };

    const handleKeyUp = (e) => {
      const key = e.key.toUpperCase();
      const noteMatch = NOTES.find(n => n.key === key);
      if (noteMatch) {
        stopNote(noteMatch.note);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [synthType, octave, gainValue, muted]);

  return (
    <div className="flex flex-col gap-4 p-4 text-slate-200 font-mono" style={{ background: 'var(--os-terminal)' }}>
      {/* Waveform Visualizer Display */}
      <div className="relative border border-slate-800 rounded-lg overflow-hidden h-24 bg-slate-950 flex items-center justify-center">
        <canvas ref={canvasRef} width="440" height="96" className="w-full h-full object-cover" />
        <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-slate-900/80 px-2 py-0.5 rounded text-[10px] text-accent border border-accent/20">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span>CYBER VISUALIZER</span>
        </div>
      </div>

      {/* Top Controls */}
      <div className="grid grid-cols-2 xs:grid-cols-4 gap-2 text-xs">
        {/* Synth Mode selector */}
        <div className="flex flex-col gap-1 col-span-2 xs:col-span-2">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Oscillator</span>
          <div className="grid grid-cols-4 border border-slate-800 rounded-lg overflow-hidden bg-slate-900">
            {['sine', 'triangle', 'sawtooth', 'square'].map(t => (
              <button
                key={t}
                onClick={() => setSynthType(t)}
                className={`py-1.5 text-[10px] transition-colors uppercase ${
                  synthType === t ? 'bg-accent text-slate-950 font-bold' : 'hover:bg-slate-800 text-slate-400'
                }`}
              >
                {t.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>

        {/* Octave Settings */}
        <div className="flex flex-col gap-1 col-span-1">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Octave</span>
          <div className="flex border border-slate-800 rounded-lg overflow-hidden bg-slate-900 justify-between">
            <button onClick={() => setOctave(o => Math.max(-1, o - 1))} className="flex-1 py-1.5 hover:bg-slate-800 text-slate-400 text-center">-</button>
            <span className="px-2 py-1.5 font-bold text-accent select-none">{octave > 0 ? `+${octave}` : octave}</span>
            <button onClick={() => setOctave(o => Math.min(1, o + 1))} className="flex-1 py-1.5 hover:bg-slate-800 text-slate-400 text-center">+</button>
          </div>
        </div>

        {/* Volume setting */}
        <div className="flex flex-col gap-1 col-span-1">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Volume</span>
          <div className="flex items-center gap-2 h-full px-1">
            <button
              onClick={() => setMuted(!muted)}
              className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
            >
              {muted ? <FaVolumeMute className="text-red-400" /> : <FaVolumeUp />}
            </button>
            <input
              type="range"
              min="0"
              max="0.8"
              step="0.05"
              value={gainValue}
              onChange={(e) => {
                setGainValue(parseFloat(e.target.value));
                setMuted(false);
              }}
              className="w-full accent-accent bg-slate-800 h-1 rounded"
            />
          </div>
        </div>
      </div>

      {/* Cyber Drum Pads */}
      <div>
        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Cyber Drum Pads</span>
        <div className="grid grid-cols-4 gap-2">
          {DRUM_PADS.map(pad => (
            <button
              key={pad.id}
              onClick={() => playDrum(pad.id)}
              className="relative py-3 rounded-lg border border-slate-800 hover:border-accent/40 bg-slate-900/60 hover:bg-slate-800/40 text-center transition-all group active:scale-95"
            >
              <span className="block text-xs font-bold text-slate-300 group-hover:text-accent transition-colors">{pad.label}</span>
              <kbd className="absolute top-1 right-1 text-[8px] px-1 py-0.5 rounded bg-slate-950 text-slate-600 font-sans">{pad.key}</kbd>
            </button>
          ))}
        </div>
      </div>

      {/* Musical Keyboard */}
      <div className="relative border border-slate-800 p-2 rounded-lg bg-slate-950 overflow-x-auto scrollbar-none select-none">
        <div className="flex min-w-[380px] h-32 relative">
          {NOTES.map((noteObj, idx) => {
            const isActive = activeNotes[noteObj.note];
            if (noteObj.isAccidental) {
              // Accidental (black) keys overlays
              // Calculate correct left margin relative to white keys index
              const whiteKeyWidth = 100 / 8; // 8 white keys
              let leftPos = 0;
              if (idx === 1) leftPos = 1;
              else if (idx === 3) leftPos = 2;
              else if (idx === 6) leftPos = 4;
              else if (idx === 8) leftPos = 5;
              else if (idx === 10) leftPos = 6;

              return (
                <button
                  key={noteObj.note}
                  onMouseDown={() => playNote(noteObj)}
                  onMouseUp={() => stopNote(noteObj.note)}
                  onMouseLeave={() => stopNote(noteObj.note)}
                  onTouchStart={(e) => { e.preventDefault(); playNote(noteObj); }}
                  onTouchEnd={() => stopNote(noteObj.note)}
                  className={`absolute z-20 w-[6%] h-[60%] border border-black rounded-b-md transition-all ${
                    isActive
                      ? 'bg-accent/80 shadow-[0_0_12px_var(--accent-color)] border-accent'
                      : 'bg-slate-800 hover:bg-slate-700'
                  }`}
                  style={{ left: `${leftPos * 12.5 - 3}%` }}
                >
                  <span className="absolute bottom-1.5 left-0 right-0 text-[8px] text-center text-slate-400 font-bold select-none">{noteObj.key}</span>
                </button>
              );
            }

            // Normal (white) keys
            return (
              <button
                key={noteObj.note}
                onMouseDown={() => playNote(noteObj)}
                onMouseUp={() => stopNote(noteObj.note)}
                onMouseLeave={() => stopNote(noteObj.note)}
                onTouchStart={(e) => { e.preventDefault(); playNote(noteObj); }}
                onTouchEnd={() => stopNote(noteObj.note)}
                className={`flex-1 h-full border border-slate-900 rounded-b-md flex flex-col justify-end pb-2 items-center transition-all ${
                  isActive
                    ? 'bg-accent text-slate-950 shadow-[0_0_15px_var(--accent-color)] border-accent'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
              >
                <span className="text-[10px] font-bold block">{noteObj.note}</span>
                <span className="text-[8px] text-slate-500 font-bold">{noteObj.key}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="text-[10px] text-slate-500 text-center flex flex-col gap-0.5">
        <span>🎹 USE KEYBOARD KEYS [A, S, D, F, G, H, J, K] AND [W, E, T, Y, U]</span>
        <span>⚡ TRIGGERS KICK (1), SNARE (2), HI-HAT (3), ARCADE ZAP (4)</span>
      </div>
    </div>
  );
};

export default CyberSynth;
