import React, { useEffect, useState, memo } from 'react';

const iconComponents = {
  html: {
    color: '#E34F26',
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" fill="#E34F26"/>
      </svg>
    )
  },
  css: {
    color: '#1572B6',
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.751L12 19.351l5.379-1.443.744-8.157z" fill="#1572B6"/>
      </svg>
    )
  },
  javascript: {
    color: '#F7DF1E',
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <rect width="24" height="24" fill="#F7DF1E"/>
        <path d="M22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" fill="#323330"/>
      </svg>
    )
  },
  react: {
    color: '#61DAFB',
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <g stroke="#61DAFB" strokeWidth="1.5" fill="none">
          <circle cx="12" cy="12" r="2.2" fill="#61DAFB"/>
          <ellipse cx="12" cy="12" rx="11" ry="4"/>
          <ellipse cx="12" cy="12" rx="11" ry="4" transform="rotate(60 12 12)"/>
          <ellipse cx="12" cy="12" rx="11" ry="4" transform="rotate(120 12 12)"/>
        </g>
      </svg>
    )
  },
  node: {
    color: '#339933',
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.602.065-.037.151-.023.218.017l2.256 1.339c.082.045.198.045.275 0l8.795-5.076c.082-.047.135-.141.135-.241V6.921c0-.103-.055-.198-.137-.246l-8.791-5.072c-.081-.047-.189-.047-.273 0L2.075 6.675c-.084.048-.139.144-.139.246v10.146c0 .1.055.194.139.241l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L1.352 18.675C.533 18.215 0 17.352 0 16.43V6.284c0-.922.533-1.786 1.352-2.245L10.147.961c.8-.452 1.866-.452 2.657 0l8.796 5.002c.819.459 1.352 1.323 1.352 2.245v10.146c0 .922-.533 1.783-1.352 2.245l-8.796 5.078c-.28.163-.601.247-.926.247zm2.717-6.993c-3.849 0-4.654-1.766-4.654-3.246 0-.14.114-.253.256-.253h1.136c.127 0 .232.091.252.215.173 1.164.686 1.752 3.01 1.752 1.852 0 2.639-.419 2.639-1.401 0-.566-.224-1.03-3.099-1.249-2.404-.184-3.89-.768-3.89-2.689 0-1.771 1.491-2.825 3.991-2.825 2.808 0 4.199.975 4.377 3.068.007.072-.019.141-.065.193-.047.049-.111.077-.178.077h-1.14c-.119 0-.225-.083-.248-.196-.276-1.224-.944-1.616-2.746-1.616-2.023 0-2.259.705-2.259 1.234 0 .641.278.827 3.006 1.19 2.7.359 3.982.866 3.982 2.771 0 1.922-1.603 3.024-4.399 3.024z" fill="#339933"/>
      </svg>
    )
  },
  tailwind: {
    color: '#06B6D4',
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" fill="#06B6D4"/>
      </svg>
    )
  },
typescript: {
  color: '#3178C6',
  component: () => (
    <svg viewBox="0 0 128 128" className="w-full h-full">
      <path fill="#3178C6" d="M0 0h128v128H0z"/>
      <path fill="#FFF" d="M28.3 53.5v9.2h18.4v52.8h10.7V62.7h18.4v-9.2H28.3zm67.3 0c-9.8 0-16.2 5.3-16.2 13.4 0 7.6 4.5 11.2 14.5 13.5 7.7 1.7 9.3 3.1 9.3 6.1 0 3.1-2.6 5.2-7 5.2-5.6 0-9.7-2.1-13.9-5.7l-6.4 7.7c5.4 4.8 12.4 7.3 20.1 7.3 10.7 0 17.7-5.5 17.7-14.2 0-8-4.7-11.6-14.9-13.8-7.4-1.6-8.9-3-8.9-5.8 0-2.7 2.4-4.8 6.6-4.8 4.2 0 7.9 1.5 12 4.6l5.6-8.2c-4.9-3.9-10.8-5.8-18.5-5.8z"/>
    </svg>
  )
}
};

const OrbitRing = ({ radius, dashed }) => (
  <div
    className="absolute top-1/2 left-1/2 rounded-full border pointer-events-none"
    style={{
      width: radius * 2,
      height: radius * 2,
      transform: 'translate(-50%, -50%)',
      borderColor: 'rgba(245,158,11,0.12)',
      borderStyle: dashed ? 'dashed' : 'solid',
      borderWidth: '1px',
    }}
  />
);

const OrbitItem = memo(({ config, angle, radius }) => {
  const [isHovered, setIsHovered] = useState(false);
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  const Icon = iconComponents[config.iconType];

  return (
    <div
      className="absolute top-1/2 left-1/2"
      style={{
        width: `${config.size}px`,
        height: `${config.size}px`,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        zIndex: isHovered ? 40 : 10,
        transition: 'z-index 0s',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="w-full h-full rounded-full flex items-center justify-center cursor-pointer"
        style={{
          background: 'rgba(15,15,15,0.95)',
          backdropFilter: 'blur(12px)',
          border: isHovered
            ? `1.5px solid ${Icon.color}60`
            : '1px solid rgba(255,255,255,0.08)',
          transform: isHovered ? 'scale(1.3)' : 'scale(1)',
          transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), border 0.3s ease, box-shadow 0.3s ease',
          boxShadow: isHovered
            ? `0 0 24px ${Icon.color}50, 0 0 8px ${Icon.color}30`
            : '0 4px 20px rgba(0,0,0,0.4)',
          padding: '20%',
        }}
      >
        {Icon.component()}

        {/* Tooltip */}
        {isHovered && (
          <div
            className="absolute pointer-events-none whitespace-nowrap"
            style={{
              bottom: `calc(100% + 10px)`,
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(10,10,10,0.95)',
              border: `1px solid ${Icon.color}40`,
              color: Icon.color,
              fontSize: '10px',
              fontFamily: 'monospace',
              letterSpacing: '0.08em',
              padding: '4px 10px',
              borderRadius: '20px',
              fontWeight: 600,
            }}
          >
            {config.label}
          </div>
        )}
      </div>
    </div>
  );
});

export default function OrbitingSkills() {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dims, setDims] = useState({ inner: 115, outer: 205, container: 480, core: 80, coreIcon: 52 });

  useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth;
      if (w < 400) {
        setDims({ inner: 75, outer: 135, container: 310, core: 56, coreIcon: 36 });
      } else if (w < 640) {
        setDims({ inner: 90, outer: 160, container: 370, core: 64, coreIcon: 42 });
      } else if (w < 1024) {
        setDims({ inner: 105, outer: 185, container: 430, core: 72, coreIcon: 48 });
      } else {
        setDims({ inner: 115, outer: 205, container: 480, core: 80, coreIcon: 52 });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    let raf;
    let last = performance.now();
    const animate = (now) => {
      const delta = (now - last) / 1000;
      last = now;
      setTime(prev => prev + delta * 0.65);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [isPaused]);

  const innerSkills = [
    { id: 'html',       iconType: 'html',       size: dims.inner * 0.42, phase: 0,                    label: 'HTML5' },
    { id: 'css',        iconType: 'css',        size: dims.inner * 0.44, phase: (2 * Math.PI) / 3,    label: 'CSS3' },
    { id: 'js',         iconType: 'javascript', size: dims.inner * 0.42, phase: (4 * Math.PI) / 3,    label: 'JavaScript' },
  ];

  const outerSkills = [
    { id: 'react',      iconType: 'react',      size: dims.outer * 0.3,  phase: 0,                    label: 'React' },
    { id: 'node',       iconType: 'node',       size: dims.outer * 0.28, phase: (2 * Math.PI) / 3,    label: 'Node.js' },
    { id: 'tailwind',   iconType: 'tailwind',   size: dims.outer * 0.27, phase: (4 * Math.PI) / 3,    label: 'Tailwind' },
    { id: 'typescript', iconType: 'typescript', size: dims.outer * 0.27, phase: Math.PI / 3,          label: 'TypeScript' },
  ];

  return (
    <div
      className="relative w-full h-full flex items-center justify-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="relative flex items-center justify-center"
        style={{ width: dims.container, height: dims.container }}
      >
        {/* Orbit rings */}
        <OrbitRing radius={dims.inner} />
        <OrbitRing radius={dims.outer} dashed />

        {/* Central core */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 rounded-full flex items-center justify-center"
          style={{
            width: dims.core,
            height: dims.core,
            background: 'radial-gradient(circle at 35% 35%, #1a1a1a, #000)',
            boxShadow: '0 0 0 1px rgba(245,158,11,0.25), 0 0 40px rgba(245,158,11,0.1)',
          }}
        >
          <div
            className="rounded-full flex items-center justify-center"
            style={{
              width: dims.coreIcon,
              height: dims.coreIcon,
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              boxShadow: '0 0 20px rgba(245,158,11,0.5)',
            }}
          >
            <span
              className="text-black font-black"
              style={{ fontSize: dims.coreIcon * 0.42, letterSpacing: '-0.05em' }}
            >
              SK
            </span>
          </div>
        </div>

        {/* Inner orbit items */}
        {innerSkills.map(skill => (
          <OrbitItem
            key={skill.id}
            config={skill}
            radius={dims.inner}
            angle={time * 0.85 + skill.phase}
          />
        ))}

        {/* Outer orbit items */}
        {outerSkills.map(skill => (
          <OrbitItem
            key={skill.id}
            config={skill}
            radius={dims.outer}
            angle={time * -0.48 + skill.phase}
          />
        ))}
      </div>
    </div>
  );
}