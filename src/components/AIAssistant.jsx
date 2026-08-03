import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaRobot, FaUserAlt, FaTerminal } from 'react-icons/fa';

const PERSONALITIES = {
  jarvis: {
    name: 'J.A.R.V.I.S.',
    avatarColor: 'text-cyan-400 border-cyan-400/30',
    greeting: 'Welcome back, operator. I am J.A.R.V.I.S. How may I assist you with Sabin\'s portfolio today?',
    typingSpeed: 25,
  },
  glados: {
    name: 'GLaDOS',
    avatarColor: 'text-amber-400 border-amber-400/30',
    greeting: 'Oh. It\'s you. I was busy conducting tests, but I suppose I can help you look at Sabin\'s files. Don\'t expect cake.',
    typingSpeed: 30,
  },
  hacker: {
    name: 'root@hacker_bot',
    avatarColor: 'text-green-400 border-green-400/30',
    greeting: 'CONNECTING TO SABIN_OS... SUCCESS. TERMINAL IS SECURED. TYPE COMMAND OR ASK FOR SYSTEM SPECIFICATIONS.',
    typingSpeed: 15,
  }
};

const SUGGESTIONS = [
  { text: 'Who is Sabin?', label: 'Who is Sabin?' },
  { text: 'Tell me a dev joke', label: 'Dev Joke' },
  { text: 'What is his tech stack?', label: 'Tech Stack' },
  { text: 'How do I contact him?', label: 'Contact Info' },
];

const BOT_ANSWERS = {
  who: {
    jarvis: "Sabin Khatri is a creative Full Stack Developer and Designer based in Nepal. He specializes in building highly visual, interactive web systems (like this custom OS-themed portfolio) with React, Node.js, and high-performance frontend animations.",
    glados: "Sabin is a human developer who somehow built this web terminal. He claims to be good at React and Tailwind, probably so he can avoid being sent to the testing chambers. His code works, which is surprising for a human.",
    hacker: "SABIN KHATRI // CREATIVE DEVELOPER // PORTFOLIO: REACT, NODE.JS, THREE.JS, TAILWIND // LOCATION: NEPAL // FOCUS: FULL-STACK ARCHITECTURE & HIGH-FIDELITY WEB EXPERIENCES."
  },
  joke: {
    jarvis: "Here is one: Why do programmers wear glasses? Because they can't C#.",
    glados: "I told a joke once. The subject didn't laugh. Probably because they were incinerated. Anyway: What is a programmer's favorite hangout place? Foo Bar.",
    hacker: "ERROR 404: HUMOR MODULE NOT FOUND. REPLACING WITH CORRUPT DATA: 'There are 10 types of people in the world: those who understand binary, and those who don't.'"
  },
  stack: {
    jarvis: "Sabin's stack includes frontend technologies like React, Vite, Framer Motion, and Tailwind CSS. On the backend, he works with Node.js, Express, databases like MongoDB and PostgreSQL, and deploys scalable systems.",
    glados: "He claims to use React and CSS animations. I prefer neurotoxin and mainframe scripts, but I suppose his tools are adequate for simple web interfaces.",
    hacker: "STACK IDENTIFIED: [FRONTEND: REACT.JS, FRAMER-MOTION, TAILWIND] [BACKEND: NODE.JS, EXPRESS, MONGO_DB, REST_APIS] [TOOLS: GIT, VITE, DOCKER]."
  },
  contact: {
    jarvis: "You can reach Sabin by visiting the Contact section on this page, or email him directly. He is currently open to freelance opportunities and full-time positions.",
    glados: "You can find his email and social handles in the Contact form. If you email him, tell him the testing chambers are ready.",
    hacker: "EXTRACTING DATA... EMAIL: sabinkhatri.dev@gmail.com // GITHUB: github.com/sabin-khatri // LINKEDIN: linkedin.com/in/sabin-khatri // USE THE CONTACT WINDOW FOR DIRECT MESSAGE SEND."
  },
  default: {
    jarvis: "That is an interesting question. I am programmed to share information regarding Sabin's projects, technical skills, and experience. Please try one of the quick suggestions!",
    glados: "Your query lacks scientific value. I recommend clicking one of the predefined options, or we will have to restart the test protocols.",
    hacker: "COMMAND NOT RECOGNIZED. STATUS: 400 BAD REQUEST. ACCESS QUICK DATA SECTIONS TO RETRIEVE SYTEM LOGS."
  }
};

const AIAssistant = () => {
  const [personality, setPersonality] = useState('jarvis');
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Initialize with greeting
  useEffect(() => {
    setMessages([
      {
        id: 'greet',
        sender: 'bot',
        text: PERSONALITIES[personality].greeting,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [personality]);

  // Scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const getBotResponse = (input) => {
    const cleanInput = input.toLowerCase();
    let key = 'default';
    if (cleanInput.includes('who') || cleanInput.includes('sabin') || cleanInput.includes('about')) {
      key = 'who';
    } else if (cleanInput.includes('joke') || cleanInput.includes('funny') || cleanInput.includes('humor')) {
      key = 'joke';
    } else if (cleanInput.includes('stack') || cleanInput.includes('skills') || cleanInput.includes('tech') || cleanInput.includes('language')) {
      key = 'stack';
    } else if (cleanInput.includes('contact') || cleanInput.includes('email') || cleanInput.includes('reach') || cleanInput.includes('social')) {
      key = 'contact';
    }

    return BOT_ANSWERS[key][personality] || BOT_ANSWERS.default[personality];
  };

  const handleSend = (text) => {
    if (!text.trim() || isTyping) return;

    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    const responseText = getBotResponse(text);
    const delay = Math.min(1500, responseText.length * PERSONALITIES[personality].typingSpeed);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: responseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, delay);
  };

  return (
    <div className="flex flex-col h-[400px] text-slate-300 font-mono text-xs" style={{ background: 'var(--os-terminal)' }}>
      {/* Personality Selector */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 bg-slate-900/60">
        <span className="text-[10px] text-slate-500 font-bold tracking-wider uppercase">Personality:</span>
        <div className="flex gap-1.5">
          {Object.keys(PERSONALITIES).map(key => (
            <button
              key={key}
              onClick={() => {
                if (!isTyping) setPersonality(key);
              }}
              disabled={isTyping}
              className={`px-2 py-0.5 rounded text-[10px] border transition-colors uppercase ${
                personality === key
                  ? 'bg-accent/15 border-accent text-accent font-bold'
                  : 'bg-transparent border-slate-800 text-slate-500 hover:border-slate-700 hover:text-slate-400'
              }`}
            >
              {PERSONALITIES[key].name.split('@')[0].split('.')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Display */}
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3 custom-scrollbar" data-lenis-prevent="true">
        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}>
            <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${
              msg.sender === 'user' ? 'bg-slate-800 border-slate-700 text-slate-300' : `bg-slate-950 ${PERSONALITIES[personality].avatarColor}`
            }`}>
              {msg.sender === 'user' ? <FaUserAlt className="text-[9px]" /> : <FaRobot className="text-[10px]" />}
            </div>

            <div className={`p-2.5 rounded-lg border leading-normal break-words ${
              msg.sender === 'user'
                ? 'bg-slate-800/40 border-slate-850 text-slate-200'
                : 'bg-slate-900/30 border-slate-800/80 text-slate-300'
            }`}>
              {msg.text}
              <span className="block text-[8px] text-slate-600 mt-1 text-right">{msg.timestamp}</span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-2 max-w-[85%] self-start">
            <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 bg-slate-950 ${PERSONALITIES[personality].avatarColor}`}>
              <FaRobot className="text-[10px]" />
            </div>
            <div className="p-2.5 rounded-lg border bg-slate-900/30 border-slate-800/80 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggested chips */}
      <div className="flex gap-1.5 px-3 py-1.5 overflow-x-auto scrollbar-none border-t border-slate-800/60 bg-slate-950/20">
        {SUGGESTIONS.map((s, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(s.text)}
            disabled={isTyping}
            className="px-2 py-1 rounded-full border border-slate-850 bg-slate-900/40 hover:bg-slate-800/50 hover:border-slate-700 text-[10px] text-slate-400 hover:text-slate-200 transition-all whitespace-nowrap active:scale-95 disabled:opacity-50"
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Input box */}
      <form
        onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }}
        className="flex items-center gap-2 p-2 border-t border-slate-800 bg-slate-900/40"
      >
        <div className="flex-1 flex items-center gap-2 bg-slate-950 px-2.5 py-1.5 rounded-lg border border-slate-800 focus-within:border-accent/40 transition-colors">
          <FaTerminal className="text-[10px] text-slate-600" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isTyping}
            placeholder={isTyping ? 'Waiting for response...' : 'Ask about Sabin...'}
            className="flex-1 bg-transparent text-slate-200 placeholder-slate-650 outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={!inputValue.trim() || isTyping}
          className="p-2 rounded-lg bg-accent text-slate-950 hover:bg-accent/80 transition-colors active:scale-95 disabled:opacity-30 disabled:scale-100"
        >
          <FaPaperPlane className="text-xs" />
        </button>
      </form>
    </div>
  );
};

export default AIAssistant;
