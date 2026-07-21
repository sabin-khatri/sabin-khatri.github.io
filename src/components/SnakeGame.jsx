/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { playClickSound } from '../utils/audio';

const GRID_SIZE = 20;
const SPEED = 110; // ms per tick

const SnakeGame = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      return Number(localStorage.getItem('arcade-snake-high') || 0);
    } catch { return 0; }
  });
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // References to bypass stale closures in setInterval loop
  const snakeRef = useRef([[10, 10]]);
  const foodRef = useRef([5, 5]);
  const dirRef = useRef([0, -1]); // Initial movement is Up
  const lastDirRef = useRef([0, -1]);

  useEffect(() => {
    // Generate initial food
    generateFood();
  }, []);

  const generateFood = () => {
    let fx, fy;
    let onSnake = true;
    while (onSnake) {
      fx = Math.floor(Math.random() * GRID_SIZE);
      fy = Math.floor(Math.random() * GRID_SIZE);
      onSnake = snakeRef.current.some(([sx, sy]) => sx === fx && sy === fy);
    }
    foodRef.current = [fx, fy];
  };

  const handleDirection = (dx, dy) => {
    if (isGameOver || isPaused || !gameStarted) return;
    
    // Prevent reverse movements (e.g. going Left when moving Right)
    const [lx, ly] = lastDirRef.current;
    if (lx + dx === 0 && ly + dy === 0) return;

    dirRef.current = [dx, dy];
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowUp', 'KeyW'].includes(e.code)) { e.preventDefault(); handleDirection(0, -1); }
      else if (['ArrowDown', 'KeyS'].includes(e.code)) { e.preventDefault(); handleDirection(0, 1); }
      else if (['ArrowLeft', 'KeyA'].includes(e.code)) { e.preventDefault(); handleDirection(-1, 0); }
      else if (['ArrowRight', 'KeyD'].includes(e.code)) { e.preventDefault(); handleDirection(1, 0); }
      else if (e.code === 'Space') {
        e.preventDefault();
        if (gameStarted) togglePause();
        else startGame();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted, isGameOver, isPaused]);

  // Main game ticks
  useEffect(() => {
    if (!gameStarted || isGameOver || isPaused) return;

    const gameTick = () => {
      const snake = [...snakeRef.current];
      const [dx, dy] = dirRef.current;
      lastDirRef.current = [dx, dy];

      const head = snake[0];
      const nextHead = [head[0] + dx, head[1] + dy];

      // Check wall collisions
      if (
        nextHead[0] < 0 || nextHead[0] >= GRID_SIZE ||
        nextHead[1] < 0 || nextHead[1] >= GRID_SIZE
      ) {
        handleGameOver();
        return;
      }

      // Check self-collisions
      if (snake.some(([sx, sy]) => sx === nextHead[0] && sy === nextHead[1])) {
        handleGameOver();
        return;
      }

      // Move snake
      snake.unshift(nextHead);

      // Check food consumption
      const [fx, fy] = foodRef.current;
      if (nextHead[0] === fx && nextHead[1] === fy) {
        setScore(s => {
          const nextS = s + 10;
          if (nextS > highScore) {
            setHighScore(nextS);
            // eslint-disable-next-line no-unused-vars
            try { localStorage.setItem('arcade-snake-high', nextS.toString()); } catch (err) { /* ignore storage error */ }
          }
          return nextS;
        });
        generateFood();
      } else {
        snake.pop();
      }

      snakeRef.current = snake;
      drawCanvas();
    };

    const interval = setInterval(gameTick, SPEED);
    return () => clearInterval(interval);
  }, [gameStarted, isGameOver, isPaused, highScore]);

  // Canvas drawing loop
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const cw = canvas.width;
    const ch = canvas.height;
    const cellSize = cw / GRID_SIZE;

    // Background
    ctx.fillStyle = '#050507';
    ctx.fillRect(0, 0, cw, ch);

    // Draw Grid Lines (thin retro look)
    ctx.strokeStyle = '#111116';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, ch);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(cw, i * cellSize);
      ctx.stroke();
    }

    const accentRgb = getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim() || '245, 158, 11';

    // Draw Food (pulse circle/glow block)
    const [fx, fy] = foodRef.current;
    ctx.fillStyle = '#ef4444'; // Red food
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.arc((fx + 0.5) * cellSize, (fy + 0.5) * cellSize, cellSize / 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Reset shadow
    ctx.shadowBlur = 0;

    // Draw Snake
    snakeRef.current.forEach(([sx, sy], idx) => {
      // Fade snake color toward the tail
      const alpha = Math.max(0.3, 1 - idx / snakeRef.current.length);
      ctx.fillStyle = `rgba(${accentRgb}, ${alpha})`;
      ctx.fillRect(sx * cellSize + 0.5, sy * cellSize + 0.5, cellSize - 1, cellSize - 1);

      // Cute indicator for head
      if (idx === 0) {
        ctx.fillStyle = '#ffffff';
        // Draw tiny eyes
        const eyeSize = cellSize / 6;
        ctx.fillRect(sx * cellSize + cellSize / 3, sy * cellSize + cellSize / 3, eyeSize, eyeSize);
        ctx.fillRect(sx * cellSize + (cellSize * 2) / 3, sy * cellSize + cellSize / 3, eyeSize, eyeSize);
      }
    });
  };

  // Force redraw on mount/state change
  useEffect(() => {
    drawCanvas();
  }, [gameStarted, isGameOver, isPaused]);

  const startGame = () => {
    playClickSound();
    snakeRef.current = [[10, 10], [10, 11], [10, 12]];
    dirRef.current = [0, -1];
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
    setGameStarted(true);
    generateFood();
  };

  const handleGameOver = () => {
    setIsGameOver(true);
    setGameStarted(false);
  };

  const togglePause = () => {
    playClickSound();
    setIsPaused(p => !p);
  };

  return (
    <div
      data-lenis-prevent="true"
      className="flex flex-col h-full w-full bg-[#0a0a0c] text-slate-300 font-mono text-[12px] p-3 select-none overflow-hidden"
    >
      {/* Top dashboard */}
      <div className="flex justify-between items-center bg-black/40 border border-slate-850 px-3 py-1.5 rounded-lg mb-3 shrink-0">
        <div>SCORE: <span className="font-bold text-white">{score}</span></div>
        <div>HIGH: <span className="font-bold text-accent">{highScore}</span></div>
      </div>

      {/* Screen container */}
      <div className="flex-1 flex items-center justify-center relative min-h-0 bg-black/80 rounded-lg overflow-hidden border border-slate-900">
        <canvas
          ref={canvasRef}
          width={280}
          height={280}
          className="w-[280px] h-[280px] block"
        />

        {/* Overlays */}
        {!gameStarted && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-4 text-center">
            <h3 className="text-sm font-bold text-accent mb-2 tracking-widest uppercase">
              {isGameOver ? 'GAME OVER' : 'SNAKE GAME'}
            </h3>
            {isGameOver && <div className="text-[10px] text-red-400 mb-4">You crashed into walls/yourself!</div>}
            <button
              onClick={startGame}
              className="px-4 py-1.5 rounded bg-accent hover:bg-accent/80 text-black font-bold text-xs uppercase cursor-pointer transition-colors shadow-lg shadow-accent/20"
            >
              {isGameOver ? 'RETRY' : 'START GAME'}
            </button>
            <div className="text-[9px] text-slate-500 mt-3 hidden sm:block">Press SPACE to Start / PAUSE</div>
          </div>
        )}

        {isPaused && (
          <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center">
            <h3 className="text-sm font-bold text-yellow-400 tracking-wider mb-2">GAME PAUSED</h3>
            <button
              onClick={togglePause}
              className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer"
            >
              RESUME
            </button>
          </div>
        )}
      </div>

      {/* Mobile On-Screen Controller Pad */}
      <div className="flex flex-col items-center shrink-0 mt-3 pt-1 border-t border-slate-900/60">
        <div className="grid grid-cols-3 gap-1.5 w-36">
          <div />
          <button
            onClick={() => { playClickSound(); handleDirection(0, -1); }}
            className="w-10 h-8 flex items-center justify-center bg-slate-900 border border-slate-800 rounded hover:bg-slate-800 active:scale-95 text-slate-300 text-sm font-bold cursor-pointer"
          >
            ▲
          </button>
          <div />

          <button
            onClick={() => { playClickSound(); handleDirection(-1, 0); }}
            className="w-10 h-8 flex items-center justify-center bg-slate-900 border border-slate-800 rounded hover:bg-slate-800 active:scale-95 text-slate-300 text-sm font-bold cursor-pointer"
          >
            ◀
          </button>
          <button
            onClick={() => { if (gameStarted) togglePause(); }}
            className="w-10 h-8 flex items-center justify-center bg-slate-950 border border-slate-900 rounded hover:bg-slate-900 text-slate-500 text-[9px] font-bold cursor-pointer"
          >
            {isPaused ? 'GO' : '||'}
          </button>
          <button
            onClick={() => { playClickSound(); handleDirection(1, 0); }}
            className="w-10 h-8 flex items-center justify-center bg-slate-900 border border-slate-800 rounded hover:bg-slate-800 active:scale-95 text-slate-300 text-sm font-bold cursor-pointer"
          >
            ▶
          </button>

          <div />
          <button
            onClick={() => { playClickSound(); handleDirection(0, 1); }}
            className="w-10 h-8 flex items-center justify-center bg-slate-900 border border-slate-800 rounded hover:bg-slate-800 active:scale-95 text-slate-300 text-sm font-bold cursor-pointer"
          >
            ▼
          </button>
          <div />
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;
