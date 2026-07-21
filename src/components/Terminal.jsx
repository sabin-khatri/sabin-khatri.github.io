import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { playKeySound, playSuccessSound, playErrorSound, playCloseSound, playMinimizeSound } from '../utils/audio';
import { scrollToSection } from '../utils/scroll';

const handleChatbotQuery = (query) => {
  const q = query.toLowerCase();
  
  if (q.includes("who") || q.includes("name") || q.includes("about") || q.includes("sabin")) {
    return "SYSTEM LOOKUP:\n  Sabin Khatri is a passionate Frontend Developer based in Biratnagar, Nepal.\n  He specializes in building elegant, high-performance web applications using React, Vite, Tailwind CSS, and Three.js.";
  }
  if (q.includes("skill") || q.includes("stack") || q.includes("tech") || q.includes("language")) {
    return "DATABASE LOOKUP:\n  - Languages: JavaScript (ES6+), TypeScript, HTML5, CSS3\n  - Libraries: React, Framer Motion, GSAP, Three.js (R3F/Rapier)\n  - Backend/DB: Node.js, Express, Supabase, MySQL, MongoDB\n  - Styling: Tailwind CSS v4, Bootstrap";
  }
  if (q.includes("project") || q.includes("work") || q.includes("portfolio")) {
    return "PROJECT INDEX:\n  1. Real-Time Complaint Hub (React, Node, Sockets)\n  2. Chiya Ghar (React, Tailwind, Framer Motion)\n  3. Trekking Nepal (React, Tailwind, Lenis)\n  4. District Score Dashboard (React, TS, Supabase)\n\nType the section name (e.g. 'projects') to scroll there directly!";
  }
  if (q.includes("contact") || q.includes("hire") || q.includes("email") || q.includes("reach")) {
    return "COMMUNICATION NODE:\n  - Email: sabinkhatri.dev@gmail.com (or use the Contact window/form!)\n  - GitHub: github.com/sabin-khatri\n  - LinkedIn: linkedin.com/in/sabin-khatri-25460b26a/";
  }
  if (q.includes("os") || q.includes("system") || q.includes("portfolio")) {
    return "SABIN OS v1.0 STATUS:\n  - Kernel: React 19 + Vite\n  - DE: Custom Framer Motion Window Manager\n  - Active Features: Sound profiles, accent picks, Task Monitor, and Snake Game Arcade!";
  }
  return `Simulated AI: I processed your query: "${query}".\nI don't have a direct answer in my local database for that.\nTry asking: 'who are you', 'skills', 'projects', or 'contact'.`;
};

const Terminal = ({ onMinimize, onClose, isFloating = false, title = "guest@sabin-os:~", defaultCommands = [], dragControls }) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { type: "output", text: "Welcome to SABIN OS v1.0" },
    { type: "output", text: "Type 'help' to see available commands." },
    ...defaultCommands
  ]);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    const el = containerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    let output = "";
    let isValid = true;

    // Check for 'ask' command prefix
    if (trimmed.startsWith("ask ") || trimmed === "ask") {
      const query = trimmed.substring(3).trim();
      if (!query) {
        output = "Usage: ask <question>\n\nExamples:\n  ask who are you?\n  ask skills\n  ask projects\n  ask contact";
      } else {
        output = handleChatbotQuery(query);
      }
      
      setHistory((prev) => [
        ...prev,
        { type: "input", text: `guest@sabin-os:~$ ${cmd.trim()}` },
        { type: "output", text: output },
      ]);
      playSuccessSound();
      return;
    }

    switch (trimmed) {
      case "help":
        output = "Available commands:\n  help     - Show this message\n  ask      - Conversational chatbot (e.g., 'ask skills')\n  about    - Go to About section\n  projects - Go to Projects section\n  skills   - Go to Skills section\n  contact  - Go to Contact section\n  home     - Go to Home section\n  clear    - Clear terminal\n  music    - Open music player\n  timeline - Open career timeline\n  whoami   - Print current user\n  neofetch - System information\n  sudo     - Execute as superuser\n  matrix   - Enter the matrix\n  audit    - Run Lighthouse performance audit";
        break;
      case "home":
        output = "Navigating to Home section...";
        scrollToSection("home");
        break;
      case "about":
        output = "Navigating to About section...";
        scrollToSection("about");
        break;
      case "projects":
        output = "Navigating to Projects section...";
        scrollToSection("projects");
        break;
      case "skills":
        output = "Navigating to Skills section...";
        scrollToSection("skills");
        break;
      case "contact":
        output = "Navigating to Contact section...";
        scrollToSection("contact");
        break;
      case "clear":
        setHistory([]);
        playSuccessSound();
        return;
      case "whoami":
        output = "guest";
        break;
      case "sudo":
        output = `guest is not in the sudoers file.\nThis incident will be reported.`;
        isValid = false;
        break;
      case "neofetch":
        output = `       _,met$$$$$gg.          guest@sabin-os
    ,g$$$$$$$$$$$$$$$P.       -----------------
  ,g$$P"     """Y$$.".        OS: Sabin OS v1.0
 ,$$P'              \`$$$.     Host: Web Browser
',$$P       ,ggs.     \`$$b:   Kernel: React 19
\`d$$'     ,$P"'   .    $$$    Uptime: ${Math.floor(performance.now() / 60000)} mins
 $$P      d$'     ,    $$P    Packages: 42 (npm)
 $$:      $$.   -    ,d$$'    Shell: bash 5.1.16
 $$;      Y$b._   _,d$P'      Resolution: ${window.innerWidth}x${window.innerHeight}
 Y$b       \`"Y$$$$P"'         DE: Sabin Desktop
 \`Y$b                         WM: Framer Motion
  \`Y$b.
    \`"Y$b._
        \`""""`;
        break;
      case "matrix":
        output = Array.from({ length: 15 }).map(() => Array.from({ length: 40 }).map(() => Math.round(Math.random())).join(' ')).join('\n');
        break;
      case "audit":
      case "lighthouse":
        output = "Initializing Lighthouse Audit...";
        setTimeout(() => {
          setHistory(prev => [...prev, { type: "output", text: "Analyzing performance metrics..." }]);
        }, 800);
        setTimeout(() => {
          setHistory(prev => [...prev, { type: "output", text: "Checking accessibility and best practices..." }]);
        }, 1600);
        setTimeout(() => {
          setHistory(prev => [...prev, { type: "output", text: "Generating report...\n\n🚀 LIGHTHOUSE SCORE:\n--------------------\nPerformance   : 100\nAccessibility : 100\nBest Practices: 100\nSEO           : 100\n--------------------\nStatus: PERFECT." }]);
          playSuccessSound();
        }, 2800);
        break;
      case "music":
        output = "Opening music player...";
        window.dispatchEvent(new CustomEvent('open-music'));
        break;
      case "timeline":
        output = "Opening career timeline...";
        window.dispatchEvent(new CustomEvent('open-timeline'));
        break;
      default:
        output = `Command not found: ${cmd.trim()}. Type 'help' for available commands.`;
        isValid = false;
    }

    toast.success(`Opening ${trimmed}...`, { id: 'term-cmd' });

    if (isValid) playSuccessSound();
    else playErrorSound();

    setHistory((prev) => [
      ...prev,
      { type: "input", text: `guest@sabin-os:~$ ${cmd.trim()}` },
      { type: "output", text: output },
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key.length === 1 || e.key === "Backspace") {
      playKeySound();
    }

    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      playKeySound();
      handleCommand(input);
      setInput("");
      
    }
  };

  const handleClose = (e) => {
    e.stopPropagation();
    playCloseSound();
    onClose?.(e);
  };

  const handleMinimize = (e) => {
    e.stopPropagation();
    playMinimizeSound();
    onMinimize?.(e);
  };

  return (
    <div
      className={`flex flex-col border border-slate-700/50 rounded-xl overflow-hidden shadow-2xl ${isFloating ? 'w-[min(600px,92vw)] h-[min(400px,60vh)]' : 'w-full h-full min-h-[280px] sm:min-h-[300px]'}`}
      style={{ background: 'var(--os-terminal)' }}
      onClick={() => inputRef.current?.focus()}
    >
      <div
        className="flex items-center px-4 py-2 border-b border-slate-700/50 cursor-move relative shrink-0"
        style={{ background: 'var(--os-card)' }}
        onPointerDown={(e) => { if (dragControls) dragControls.start(e); }}
      >
        <div className="mx-auto text-xs font-mono text-slate-400 select-none tracking-wider">{title}</div>
        {isFloating && (
          <div className="flex gap-4 absolute right-4">
            <button onClick={handleMinimize} className="text-slate-500 hover:text-white transition-colors">-</button>
            <button className="text-slate-500 hover:text-white transition-colors">□</button>
            <button onClick={handleClose} className="text-slate-500 hover:text-white transition-colors">✕</button>
          </div>
        )}
      </div>

      <div ref={containerRef} className="flex-1 p-4 font-mono text-sm overflow-y-auto text-green-400 custom-scrollbar min-h-0">
        <div className="flex flex-col gap-2">
          {history.map((item, i) => (
            <div key={i} className="whitespace-pre-wrap">
              {item.type === "input"
                ? <span className="text-white">{item.text}</span>
                : <span>{item.text}</span>}
            </div>
          ))}

          <div className="flex items-center gap-2">
            <span className="text-blue-400 font-bold shrink-0">guest@sabin-os:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-green-400 caret-green-400 min-w-0"
              spellCheck="false"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
