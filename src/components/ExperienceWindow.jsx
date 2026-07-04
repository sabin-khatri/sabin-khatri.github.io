import React from 'react';

const TIMELINE = [
  {
    year: '2024 — Present',
    title: 'Frontend Developer',
    org: 'Freelance & Personal Projects',
    desc: 'Building responsive web apps with React, Vite, and modern UI libraries. Focus on performance and smooth animations.',
  },
  {
    year: '2023 — 2024',
    title: 'Web Development Journey',
    org: 'Self-taught · Nepal',
    desc: 'Mastered React ecosystem, Tailwind CSS, Three.js, and full-stack basics with Node.js & MongoDB.',
  },
  {
    year: '2022',
    title: 'Started Coding',
    org: 'Biratnagar, Nepal',
    desc: 'First lines of JavaScript. Fell in love with creating interactive experiences on the web.',
  },
];

const ExperienceWindow = () => (
  <div data-lenis-prevent="true" className="p-4 sm:p-5 overflow-y-auto custom-scrollbar max-h-[min(420px,65vh)]" style={{ fontSize: 'var(--ui-font-size, 13px)' }}>
    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4">~/timeline — career.log</p>
    <div className="relative pl-4 border-l border-slate-800 space-y-6">
      {TIMELINE.map((item, i) => (
        <div key={i} className="relative">
          <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent border-2 border-[var(--os-terminal)]" />
          <span className="text-[10px] font-mono text-accent/80">{item.year}</span>
          <h4 className="text-sm font-semibold text-white mt-0.5">{item.title}</h4>
          <p className="text-xs text-slate-500 font-mono">{item.org}</p>
          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
    <p className="text-[10px] font-mono text-slate-600 mt-6 pt-3 border-t border-slate-800">
      cat resume.pdf → available in About section
    </p>
  </div>
);

export default ExperienceWindow;
