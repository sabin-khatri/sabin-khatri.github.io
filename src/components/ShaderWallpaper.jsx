import React, { useEffect, useRef } from 'react';

const MOCK_LOGS = [
  "✔ [vite] hot module replacement active",
  "⚡ [hmr] update /src/components/Hero.jsx",
  "➤ [npm] install react-icons three @react-three/fiber",
  "✔ [npm] added 34 packages in 2.45s",
  "⚡ [git] commit -m 'feat: optimize custom cursor motion values'",
  "✔ [git] branch main -> origin/main [up to date]",
  "➤ [git] push origin main",
  "✔ [git] transfer complete - 1.2 MB/s",
  "⚡ [vite] build --mode production",
  "✔ [vite] built in 12.02s (32 files)",
  "➤ [docker] building container image: sabin-os-portfolio:latest",
  "✔ [docker] step 1/8 : FROM node:20-alpine",
  "✔ [docker] step 5/8 : RUN npm run build",
  "✔ [docker] container f9a8b7c6d5e4 deployed on port 80",
  "➤ [api] GET /api/projects - 200 OK (18ms)",
  "➤ [api] GET /api/skills - 200 OK (11ms)",
  "➤ [api] POST /api/contact - message queued (4ms)",
  "✔ [system] cpu load: 14% | heap memory: 84.2 MB / 512 MB",
  "⚡ [settings] sound profile changed to: ARCADE",
  "✔ [settings] theme set to: CATPPUCCIN (dark)",
  "➤ [music] loading stream: midnight-lofi-beats",
  "✔ [music] buffering station complete (192kbps)",
  "⚡ [assistant] pipeline running, temperature: 0.75",
  "✔ [assistant] semantic search index updated (89 documents)",
  "➤ [system] client connection established from IP 192.168.1.104",
];

const ShaderWallpaper = ({ type = 'shader' }) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null, radius: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    // Matrix Rain State
    const matrixFontSize = 14;
    let matrixColumns = Math.ceil(window.innerWidth / matrixFontSize);
    let matrixDrops = Array(matrixColumns).fill(1);
    const matrixChars = "日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍｦｲｸｺｿﾁﾄﾉﾌﾔﾖﾙﾚﾛﾝ0123456789<>[]{}+=-_*&^%$#@!";

    // Code Stream State
    let activeLogs = [];
    let lastLogTime = 0;
    const logFontSize = 12;
    const maxLogs = Math.ceil(window.innerHeight / (logFontSize + 6)) + 5;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Re-initialize Matrix drops
      matrixColumns = Math.ceil(canvas.width / matrixFontSize);
      matrixDrops = Array(matrixColumns).fill(1).map(() => Math.random() * -100); // randomize start Y

      initParticles();
    };

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

        if (mouseRef.current.x !== null) {
          const dx = mouseRef.current.x - this.x;
          const dy = mouseRef.current.y - this.y;
          const dist = Math.hypot(dx, dy);
          if (dist < mouseRef.current.radius) {
            const force = (mouseRef.current.radius - dist) / mouseRef.current.radius;
            this.x -= dx * force * 0.02;
            this.y -= dy * force * 0.02;
          }
        }
      }

      draw(accentRgb) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accentRgb || '245, 158, 11'}, 0.4)`;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const density = Math.min(65, Math.floor((canvas.width * canvas.height) / 18000));
      for (let i = 0; i < density; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push(new Particle(x, y));
      }
    };

    const drawLines = (accentRgb) => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < 100) {
            const alpha = (100 - dist) / 100 * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${accentRgb || '245, 158, 11'}, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    };

    // Rendering loops
    const drawShader = (accentRgb) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw(accentRgb);
      });
      drawLines(accentRgb);
    };

    const drawMatrix = (accentRgb) => {
      // Semi-transparent fade to draw trail
      ctx.fillStyle = 'rgba(10, 10, 12, 0.075)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = `rgba(${accentRgb || '245, 158, 11'}, 0.7)`;
      ctx.font = `${matrixFontSize}px Courier New, monospace`;

      for (let i = 0; i < matrixDrops.length; i++) {
        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        const x = i * matrixFontSize;
        const y = matrixDrops[i] * matrixFontSize;

        // Draw character (sometimes highlight first character in white)
        if (Math.random() > 0.98) {
          ctx.fillStyle = '#ffffff';
        } else {
          ctx.fillStyle = `rgba(${accentRgb || '245, 158, 11'}, 0.8)`;
        }
        
        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          matrixDrops[i] = 0;
        }
        matrixDrops[i]++;
      }
    };

    const drawCodeStream = (accentRgb, now) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Feed logs slowly
      if (now - lastLogTime > 400 + Math.random() * 800) {
        const randomLog = MOCK_LOGS[Math.floor(Math.random() * MOCK_LOGS.length)];
        const timestamp = new Date().toLocaleTimeString();
        activeLogs.push(`[${timestamp}] ${randomLog}`);
        
        if (activeLogs.length > maxLogs) {
          activeLogs.shift();
        }
        lastLogTime = now;
      }

      ctx.fillStyle = `rgba(${accentRgb || '245, 158, 11'}, 0.16)`; // subtle background opacity
      ctx.font = `${logFontSize}px JetBrains Mono, Courier New, monospace`;

      const startY = canvas.height - 40;
      activeLogs.forEach((log, index) => {
        const y = startY - (activeLogs.length - 1 - index) * (logFontSize + 6);
        ctx.fillText(log, 20, y);
      });
    };

    const animate = (timestamp) => {
      let accentRgb = getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim();
      if (!accentRgb) accentRgb = '245, 158, 11';

      if (type === 'matrix') {
        drawMatrix(accentRgb);
      } else if (type === 'codestream') {
        drawCodeStream(accentRgb, timestamp);
      } else {
        drawShader(accentRgb);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    animate(0);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [type]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 w-full h-full pointer-events-none opacity-60"
    />
  );
};

export default ShaderWallpaper;
