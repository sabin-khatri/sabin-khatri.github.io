/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { playClickSound } from '../utils/audio';

const TaskManager = ({ windows = [], onCloseWindow }) => {
  const [activeTab, setActiveTab] = useState('performance');
  const [cpuUsage, setCpuUsage] = useState(12);
  const [ramUsage, setRamUsage] = useState(48);
  const cpuHistoryRef = useRef(Array(20).fill(12));
  const ramHistoryRef = useRef(Array(20).fill(48));
  const canvasRef = useRef(null);

  // Simulate usage metrics
  useEffect(() => {
    const interval = setInterval(() => {
      // CPU fluctuations
      const cpuNoise = Math.floor(Math.random() * 15) - 7;
      // High CPU spike if windows are open
      const baseCpu = 5 + windows.length * 8;
      const nextCpu = Math.max(3, Math.min(99, baseCpu + cpuNoise));
      setCpuUsage(nextCpu);

      // Memory fluctuations
      const ramNoise = Math.floor(Math.random() * 3) - 1;
      const baseRam = 38 + windows.length * 6;
      const nextRam = Math.max(30, Math.min(95, baseRam + ramNoise));
      setRamUsage(nextRam);

      // Shift history arrays
      cpuHistoryRef.current.push(nextCpu);
      cpuHistoryRef.current.shift();
      ramHistoryRef.current.push(nextRam);
      ramHistoryRef.current.shift();

      drawGraph();
    }, 1000);

    return () => clearInterval(interval);
  }, [windows.length]);

  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    // Background and grid
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#050507';
    ctx.fillRect(0, 0, w, h);

    // Draw Grid Lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < w; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    const accentRgb = getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim() || '245, 158, 11';

    // Draw CPU Line (Accent Color)
    drawChartLine(ctx, cpuHistoryRef.current, w, h, `rgb(${accentRgb})`, `rgba(${accentRgb}, 0.1)`);

    // Draw RAM Line (Cyan)
    drawChartLine(ctx, ramHistoryRef.current, w, h, '#22d3ee', 'rgba(34, 211, 238, 0.05)');
  };

  const drawChartLine = (ctx, history, w, h, strokeStyle, fillStyle) => {
    ctx.beginPath();
    const len = history.length;
    const step = w / (len - 1);

    history.forEach((val, idx) => {
      const x = idx * step;
      const y = h - (val / 100) * (h - 10) - 5;
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });

    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Area under line
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fillStyle = fillStyle;
    ctx.fill();
  };

  // Initial draw
  useEffect(() => {
    drawGraph();
  }, [activeTab]);

  const handleTabChange = (tab) => {
    playClickSound();
    setActiveTab(tab);
  };

  const terminateTask = (winId) => {
    playClickSound();
    onCloseWindow(winId);
  };

  return (
    <div
      data-lenis-prevent="true"
      className="flex flex-col h-full w-full bg-[#0a0a0c] text-slate-300 font-mono text-[12px] overflow-hidden select-none"
    >
      {/* Tabs */}
      <div className="flex bg-black/45 border-b border-slate-800 shrink-0">
        <button
          onClick={() => handleTabChange('performance')}
          className={`flex-1 py-2 text-center font-bold border-b-2 transition-all ${
            activeTab === 'performance'
              ? 'border-accent text-accent bg-slate-900/40'
              : 'border-transparent text-slate-500 hover:text-slate-300'
          }`}
        >
          Performance
        </button>
        <button
          onClick={() => handleTabChange('processes')}
          className={`flex-1 py-2 text-center font-bold border-b-2 transition-all ${
            activeTab === 'processes'
              ? 'border-accent text-accent bg-slate-900/40'
              : 'border-transparent text-slate-500 hover:text-slate-300'
          }`}
        >
          Processes ({windows.length})
        </button>
      </div>

      {/* Main viewport */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 min-h-0">
        {activeTab === 'performance' ? (
          <div className="space-y-4">
            {/* Visualizer Grid Chart */}
            <div className="border border-slate-800 rounded-lg overflow-hidden relative">
              <canvas
                ref={canvasRef}
                width={360}
                height={150}
                className="w-full h-[150px] block"
              />
              <div className="absolute top-2 left-2 flex gap-3 text-[10px] opacity-75">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-1 rounded bg-accent" /> CPU ({cpuUsage}%)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-1 rounded bg-cyan-400" /> RAM ({ramUsage}%)
                </span>
              </div>
            </div>

            {/* Simulated Specs */}
            <div className="grid grid-cols-2 gap-3 bg-slate-950/40 border border-slate-850 p-3 rounded-lg">
              <div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wide">CPU Cores</div>
                <div className="text-white font-bold">8 Virtual Cores</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wide">Base Speed</div>
                <div className="text-white font-bold">3.20 GHz</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wide">Memory Pool</div>
                <div className="text-white font-bold">16.0 GB RAM</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wide">Platform Kernel</div>
                <div className="text-white font-bold">React 19 V8 Engine</div>
              </div>
            </div>

            {/* OS Log status */}
            <div className="text-[10px] text-slate-500 uppercase tracking-wider flex items-center justify-between border-t border-slate-900 pt-2 px-1">
              <span>Status: Online</span>
              <span className="text-green-500 animate-pulse">Running at 60fps</span>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center text-[10px] text-slate-500 font-bold uppercase tracking-wider px-2 pb-1 border-b border-slate-850">
              <span className="flex-1">Task Name</span>
              <span className="w-20 text-right">Z-Index</span>
              <span className="w-24 text-right">Action</span>
            </div>

            <div className="space-y-1.5 max-h-[220px] overflow-y-auto scrollbar-none">
              {windows.length > 0 ? (
                windows.map((win) => (
                  <div
                    key={win.id}
                    className="flex items-center bg-slate-950/30 border border-slate-850 hover:bg-slate-900/30 px-2.5 py-2 rounded-lg transition-colors"
                  >
                    <span className="flex-1 font-bold text-white capitalize">{win.type}</span>
                    <span className="w-20 text-right text-slate-400 font-mono">{win.zIndex}</span>
                    <span className="w-24 text-right">
                      <button
                        onClick={() => terminateTask(win.id, win.type)}
                        className="px-2 py-0.5 rounded bg-red-950/40 hover:bg-red-900/60 border border-red-500/20 text-red-400 hover:text-white transition-all text-[10px] font-bold cursor-pointer"
                      >
                        End Task
                      </button>
                    </span>
                  </div>
                ))
              ) : (
                <div className="py-6 text-center text-slate-500 italic">
                  No active application windows.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskManager;
