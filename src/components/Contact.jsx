/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import { FaTerminal, FaGithub, FaLinkedin, FaEnvelope, FaPlay, FaCheckCircle, FaRegCopy } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [activeTab, setActiveTab] = useState("contact.js");
  const [focusedField, setFocusedField] = useState(null);
  const [consoleLines, setConsoleLines] = useState([]);

  const infoRef = useRef(null);
  const editorRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  // Cursor-follow spotlight (shared with Projects section signature)
  const handleMouseMove = (ref) => (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const pushLine = (line) =>
    new Promise((resolve) =>
      setTimeout(() => {
        setConsoleLines((p) => [...p, line]);
        resolve();
      }, 260)
    );

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !/^\S+@\S+\.\S+$/.test(formData.email) || !formData.message.trim()) {
      toast.error("Please fill in required fields correctly.");
      return;
    }

    setLoading(true);
    setConsoleLines([]);
    await pushLine("> validating payload...");
    await pushLine("> POST /api/send");

    try {
      const fd = new FormData();
      fd.append("access_key", "f6a8b2f4-095d-41c8-8661-42a386854bdf");
      fd.append("name", formData.name);
      fd.append("email", formData.email);
      fd.append("subject", formData.subject || "New Message from Portfolio");
      fd.append("message", formData.message);

      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd });
      const result = await res.json();

      if (result.success) {
        await pushLine("> 200 OK — message delivered");
        setSent(true);
        toast.success("Message sent! Return code 0.");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => {
          setSent(false);
          setConsoleLines([]);
        }, 4000);
      } else {
        await pushLine("> 500 — execution failed");
        toast.error(result.message || "Execution Failed.");
      }
    } catch {
      await pushLine("> ERR — could not reach host");
      toast.error("Network error. Could not connect to API.");
    } finally {
      setLoading(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard?.writeText("sabink802@email.com");
    toast.success("Email copied to clipboard.");
  };

  const fieldClass = (field) =>
    `rounded px-1 -mx-1 transition-colors duration-200 ${focusedField === field ? "bg-white/[0.04]" : ""}`;

  return (
    <section id="contact" className="relative bg-section py-16 sm:py-24 lg:py-36 overflow-hidden text-os-text font-mono">
      <Toaster position="top-center" />
      <AnimatePresence>
        {sent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[9990] flex items-center justify-center px-4"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <div className="relative bg-os-card border border-green-500/30 rounded-xl p-8 text-center max-w-sm w-full">
              <FaCheckCircle className="text-green-400 text-4xl mx-auto mb-3" />
              <h3 className="text-lg font-bold text-os-text mb-1">Message Sent!</h3>
              <p className="text-sm text-os-muted font-mono">Executed successfully. Return code 0.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 pointer-events-none dot-grid opacity-[0.03]" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(600px,90vw)] h-[600px] blur-[100px] rounded-full pointer-events-none"
        style={{ background: "rgba(var(--accent-rgb), 0.05)", transform: "translate3d(-50%, -50%, 0)", willChange: "transform" }}
      />

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaTerminal className="text-accent text-2xl sm:text-3xl" />
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-black text-os-text tracking-tighter"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Let's <span className="text-accent">Connect</span>
            </h2>
          </div>
          <p className="text-os-muted font-mono text-xs sm:text-sm">Send a post request to my inbox.</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-stretch">
          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/3 flex flex-col gap-6"
          >
            <div
              ref={infoRef}
              onMouseMove={handleMouseMove(infoRef)}
              className="group/info relative bg-os border border-os rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col overflow-hidden"
              style={{ "--mx": "50%", "--my": "50%" }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent/80 to-accent" />
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover/info:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(420px circle at var(--mx) var(--my), rgba(var(--accent-rgb), 0.08), transparent 60%)" }}
              />

              <h3 className="relative text-base sm:text-lg text-os-text font-bold mb-5 sm:mb-6 flex items-center gap-2">
                <FaEnvelope className="text-accent" /> Contact_Info
              </h3>

              <div className="relative space-y-5 sm:space-y-6 flex-1">
                <div>
                  <p className="text-os-muted text-xs uppercase mb-1">Email</p>
                  <div className="flex items-center gap-2">
                    <a href="mailto:sabink802@email.com" className="text-accent text-sm hover:underline break-all">
                      sabink802@email.com
                    </a>
                    <button
                      type="button"
                      onClick={copyEmail}
                      aria-label="Copy email"
                      className="text-slate-500 hover:text-accent transition-colors shrink-0"
                    >
                      <FaRegCopy size={13} />
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-os-muted text-xs uppercase mb-1">Location</p>
                  <p className="text-os-text/80 text-sm">Biratnagar, Nepal</p>
                </div>
                <div>
                  <p className="text-os-muted text-xs uppercase mb-1">Status</p>
                  <div className="flex items-center gap-2">
                    <span className="relative flex w-2 h-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping" />
                      <span className="relative inline-flex w-2 h-2 rounded-full bg-green-500" />
                    </span>
                    <p className="text-green-400 text-sm">Available for work</p>
                  </div>
                </div>
              </div>

              <div className="relative flex gap-3 sm:gap-4 pt-5 sm:pt-6 mt-5 sm:mt-6 border-t border-white/[0.05]">
                <motion.a
                  href="https://github.com/sabin-khatri"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="p-3 bg-white/[0.03] border border-os rounded-lg hover:text-accent hover:border-accent/40 transition-colors"
                >
                  <FaGithub size={20} />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/sabin-khatri-25460b26a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="p-3 bg-white/[0.03] border border-os rounded-lg hover:text-accent hover:border-accent/40 transition-colors"
                >
                  <FaLinkedin size={20} />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* VS Code Editor Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-2/3 min-w-0"
          >
            <div
              ref={editorRef}
              onMouseMove={handleMouseMove(editorRef)}
              className="group/editor relative bg-[#1e1e1e] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden flex flex-col h-full"
              style={{ "--mx": "50%", "--my": "50%" }}
            >
              <div
                className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover/editor:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(520px circle at var(--mx) var(--my), rgba(var(--accent-rgb), 0.06), transparent 60%)" }}
              />

              {/* Title bar */}
              <div className="relative flex items-center justify-between bg-[#2d2d2d] px-3 sm:px-4 py-2 border-b border-black/50 gap-2">
                <div className="flex gap-1.5 shrink-0">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("contact.js")}
                  className={`relative px-2 sm:px-3 py-1 text-[10px] sm:text-xs rounded-t-md truncate ${activeTab === "contact.js" ? "bg-[#1e1e1e] text-accent" : "text-slate-400"}`}
                >
                  contact.js
                  {activeTab === "contact.js" && (
                    <motion.span layoutId="contactTabUnderline" className="absolute left-0 right-0 -bottom-px h-px bg-accent" />
                  )}
                </button>
                <motion.button
                  type="button"
                  onClick={onSubmit}
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.05 }}
                  whileTap={{ scale: loading ? 1 : 0.95 }}
                  className="text-green-400 hover:text-green-300 transition-colors flex items-center gap-1 text-[10px] sm:text-xs px-2 py-1 bg-white/5 rounded shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Running...
                    </>
                  ) : (
                    <>
                      <FaPlay size={10} /> Run
                    </>
                  )}
                </motion.button>
              </div>

              {/* Editor */}
              <form onSubmit={onSubmit} className="relative p-3 sm:p-4 md:p-6 lg:p-8 flex-1 overflow-x-auto text-xs sm:text-sm leading-relaxed">
                <div className="flex min-w-0">
                  <div className="text-slate-600 text-right pr-2 sm:pr-4 select-none flex flex-col shrink-0 text-[10px] sm:text-xs">
                    {[...Array(15)].map((_, i) => <span key={i}>{i + 1}</span>)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-purple-400 break-words">
                      const <span className="text-yellow-200">message</span> <span className="text-white">=</span> <span className="text-white">{"{"}</span>
                    </div>

                    <div className="pl-3 sm:pl-6 py-1">
                      <div className={`mb-2 ${fieldClass("name")}`}>
                        <span className="text-blue-300">name: </span>
                        <span className="text-orange-300">"</span>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("name")}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Your Name"
                          className="bg-transparent border-none outline-none text-orange-300 w-full max-w-[180px] sm:max-w-xs placeholder-slate-600 inline"
                        />
                        <span className="text-orange-300">",</span>
                      </div>

                      <div className={`mb-2 ${fieldClass("email")}`}>
                        <span className="text-blue-300">email: </span>
                        <span className="text-orange-300">"</span>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField(null)}
                          placeholder="your.email@example.com"
                          className="bg-transparent border-none outline-none text-orange-300 w-full max-w-[200px] sm:max-w-sm placeholder-slate-600 inline"
                        />
                        <span className="text-orange-300">",</span>
                      </div>

                      <div className={`mb-2 ${fieldClass("subject")}`}>
                        <span className="text-blue-300">subject: </span>
                        <span className="text-orange-300">"</span>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("subject")}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Job Opportunity"
                          className="bg-transparent border-none outline-none text-orange-300 w-full max-w-[200px] sm:max-w-sm placeholder-slate-600 inline"
                        />
                        <span className="text-orange-300">",</span>
                      </div>

                      <div className={`mb-2 ${fieldClass("message")}`}>
                        <span className="text-blue-300 block sm:inline">message: </span>
                        <span className="text-orange-300">`</span>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("message")}
                          onBlur={() => setFocusedField(null)}
                          placeholder="Hello, I'd like to work with you on..."
                          rows={3}
                          className="bg-transparent border-none outline-none text-orange-300 w-full resize-none placeholder-slate-600 py-1 block sm:inline align-top"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                              onSubmit(e);
                            }
                          }}
                        />
                        <span className="text-orange-300">`,</span>
                      </div>
                    </div>

                    <div className="text-white">{"}"}</div>
                    <div className="mt-3 sm:mt-4 text-slate-500 text-[10px] sm:text-xs">// Hit Run, press Enter in fields, or Ctrl+Enter in message</div>
                    <div className="flex flex-wrap items-center mt-2 text-[10px] sm:text-xs gap-x-1">
                      <span className="text-yellow-200">await</span>
                      <span className="text-purple-400">fetch</span>
                      <span className="text-white">(</span>
                      <span className="text-orange-300">'/api/send'</span>
                      <span className="text-white">,</span>
                      <span className="text-yellow-200">message</span>
                      <span className="text-white">);</span>
                      <motion.span
                        className="inline-block w-[7px] h-3.5 bg-slate-400 ml-1 align-middle"
                        animate={{ opacity: [1, 1, 0, 0] }}
                        transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
                      />
                    </div>

                    {/* Live console output */}
                    <AnimatePresence>
                      {consoleLines.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 pt-3 border-t border-white/5 text-[10px] sm:text-xs space-y-1 overflow-hidden"
                        >
                          {consoleLines.map((line, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.25 }}
                              className={
                                line.includes("200 OK")
                                  ? "text-green-400"
                                  : line.includes("ERR") || line.includes("500")
                                  ? "text-red-400"
                                  : "text-slate-500"
                              }
                            >
                              {line}
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Hidden submit button to allow Enter to submit */}
                    <button type="submit" className="hidden">Submit</button>
                  </div>
                </div>
              </form>

              {/* Status bar */}
              <div className="relative bg-[#007acc] text-white text-[10px] sm:text-xs px-3 sm:px-4 py-1 flex justify-between items-center gap-2">
                <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                  <span>main*</span>
                  <span className="hidden sm:inline">UTF-8</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-4 truncate">
                  <span className="hidden sm:inline">JavaScript React</span>
                  {loading && <span className="animate-pulse truncate">Executing...</span>}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;