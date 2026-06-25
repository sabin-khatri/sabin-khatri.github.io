import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import { FaTerminal, FaGithub, FaLinkedin, FaEnvelope, FaPlay, FaCheckCircle } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [activeTab, setActiveTab] = useState("contact.js");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !/^\S+@\S+\.\S+$/.test(formData.email) || !formData.message.trim()) {
      toast.error("Please fill in required fields correctly.");
      return;
    }

    setLoading(true);
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
        setSent(true);
        toast.success("Message sent! Return code 0.");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSent(false), 4000);
      } else {
        toast.error(result.message || "Execution Failed.");
      }
    } catch {
      toast.error("Network error. Could not connect to API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative bg-section py-16 sm:py-24 lg:py-36 overflow-hidden text-os-text font-mono">
      <Toaster position="top-center" toastOptions={{ className: "bg-os-card text-os-text border border-os" }} />

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
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(600px,90vw)] h-[600px] blur-[150px] rounded-full pointer-events-none"
        style={{ background: "rgba(var(--accent-rgb), 0.05)" }}
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
            <div className="bg-os border border-os rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent/80 to-accent" />

              <h3 className="text-base sm:text-lg text-os-text font-bold mb-5 sm:mb-6 flex items-center gap-2">
                <FaEnvelope className="text-accent" /> Contact_Info
              </h3>

              <div className="space-y-5 sm:space-y-6 flex-1">
                <div>
                  <p className="text-os-muted text-xs uppercase mb-1">Email</p>
                  <a href="mailto:sabink802@email.com" className="text-accent text-sm hover:underline break-all">
                    sabink802@email.com
                  </a>
                </div>
                <div>
                  <p className="text-os-muted text-xs uppercase mb-1">Location</p>
                  <p className="text-os-text/80 text-sm">Biratnagar, Nepal</p>
                </div>
                <div>
                  <p className="text-os-muted text-xs uppercase mb-1">Status</p>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-green-400 text-sm">Available for work</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4 pt-5 sm:pt-6 mt-5 sm:mt-6 border-t border-white/[0.05]">
                <a
                  href="https://github.com/sabin-khatri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/[0.03] border border-os rounded-lg hover:text-accent transition-colors"
                >
                  <FaGithub size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/sabin-khatri-25460b26a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/[0.03] border border-os rounded-lg hover:text-accent transition-colors"
                >
                  <FaLinkedin size={20} />
                </a>
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
            <div className="bg-[#1e1e1e] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden flex flex-col h-full">
              {/* Title bar */}
              <div className="flex items-center justify-between bg-[#2d2d2d] px-3 sm:px-4 py-2 border-b border-black/50 gap-2">
                <div className="flex gap-1.5 shrink-0">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("contact.js")}
                  className={`px-2 sm:px-3 py-1 text-[10px] sm:text-xs rounded-t-md truncate ${activeTab === "contact.js" ? "bg-[#1e1e1e] text-accent" : "text-slate-400"}`}
                >
                  contact.js
                </button>
                <button
                  type="button"
                  onClick={onSubmit}
                  disabled={loading}
                  className="text-green-400 hover:text-green-300 transition-colors flex items-center gap-1 text-[10px] sm:text-xs px-2 py-1 bg-white/5 rounded shrink-0"
                >
                  {loading ? "Running..." : <><FaPlay size={10} /> Run</>}
                </button>
              </div>

              {/* Editor */}
              <div className="p-3 sm:p-4 md:p-6 lg:p-8 flex-1 overflow-x-auto text-xs sm:text-sm leading-relaxed">
                <div className="flex min-w-0">
                  <div className="text-slate-600 text-right pr-2 sm:pr-4 select-none flex flex-col shrink-0 text-[10px] sm:text-xs">
                    {[...Array(15)].map((_, i) => <span key={i}>{i + 1}</span>)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-purple-400 break-words">
                      const <span className="text-yellow-200">message</span> <span className="text-white">=</span> <span className="text-white">{"{"}</span>
                    </div>

                    <div className="pl-3 sm:pl-6 py-1">
                      <div className="mb-2">
                        <span className="text-blue-300">name: </span>
                        <span className="text-orange-300">"</span>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your Name"
                          className="bg-transparent border-none outline-none text-orange-300 w-full max-w-[180px] sm:max-w-xs placeholder-slate-600 inline"
                        />
                        <span className="text-orange-300">",</span>
                      </div>

                      <div className="mb-2">
                        <span className="text-blue-300">email: </span>
                        <span className="text-orange-300">"</span>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          className="bg-transparent border-none outline-none text-orange-300 w-full max-w-[200px] sm:max-w-sm placeholder-slate-600 inline"
                        />
                        <span className="text-orange-300">",</span>
                      </div>

                      <div className="mb-2">
                        <span className="text-blue-300">subject: </span>
                        <span className="text-orange-300">"</span>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Job Opportunity"
                          className="bg-transparent border-none outline-none text-orange-300 w-full max-w-[200px] sm:max-w-sm placeholder-slate-600 inline"
                        />
                        <span className="text-orange-300">",</span>
                      </div>

                      <div className="mb-2">
                        <span className="text-blue-300 block sm:inline">message: </span>
                        <span className="text-orange-300">`</span>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Hello, I'd like to work with you on..."
                          rows={3}
                          className="bg-transparent border-none outline-none text-orange-300 w-full resize-none placeholder-slate-600 py-1 block sm:inline align-top"
                        />
                        <span className="text-orange-300">`,</span>
                      </div>
                    </div>

                    <div className="text-white">{"}"}</div>
                    <div className="mt-3 sm:mt-4 text-slate-500 text-[10px] sm:text-xs">// Hit Run or press send()</div>
                    <div className="flex flex-wrap items-center mt-2 text-[10px] sm:text-xs gap-x-1">
                      <span className="text-yellow-200">await</span>
                      <span className="text-purple-400">fetch</span>
                      <span className="text-white">(</span>
                      <span className="text-orange-300">'/api/send'</span>
                      <span className="text-white">,</span>
                      <span className="text-yellow-200">message</span>
                      <span className="text-white">);</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status bar */}
              <div className="bg-[#007acc] text-white text-[10px] sm:text-xs px-3 sm:px-4 py-1 flex justify-between items-center gap-2">
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
