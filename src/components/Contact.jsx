/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import Swal from "sweetalert2";
import {
  FaUser, FaEnvelope, FaRegCommentDots,
  FaPaperPlane, FaSpinner, FaGithub, FaLinkedin,
} from "react-icons/fa";
import { HiOutlineArrowRight } from "react-icons/hi";

/* ─── reusable input ─────────────────────────────────────────────────────── */
const Field = ({ id, label, type = "text", placeholder, icon, value, onChange, error }) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={id} className="text-xs font-mono tracking-widest text-slate-500 uppercase">
      {label}
    </label>
    <div className="relative group">
      <span className="absolute inset-y-0 left-4 flex items-center text-slate-600
                       group-focus-within:text-amber-400 transition-colors duration-300 text-sm">
        {icon}
      </span>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className={`w-full bg-white/[0.03] border rounded-xl py-3.5 pl-11 pr-4
                    text-white text-sm placeholder-slate-600
                    focus:outline-none transition-all duration-300
                    ${error
                      ? "border-red-500/60 focus:border-red-400"
                      : "border-white/8 focus:border-amber-400/60 focus:bg-white/[0.05]"
                    }`}
      />
    </div>
    {error && (
      <p className="text-red-400 text-[11px] font-mono pl-1">{error}</p>
    )}
  </div>
);

/* ─── golden line divider ────────────────────────────────────────────────── */
const GoldenLine = () => (
  <div className="flex items-center gap-3 mb-4">
    <span className="block w-10 h-px bg-amber-400" />
    <span className="block w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
  </div>
);

/* ─── left info panel ────────────────────────────────────────────────────── */
const InfoPanel = () => (
  <motion.div
    initial={{ opacity: 0, x: -60 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    className="flex flex-col justify-between h-full gap-12"
  >
    <div>
      <GoldenLine />
      <p className="text-xs font-mono tracking-[0.3em] text-amber-400 uppercase mb-4">
        Get In Touch
      </p>
      <h2 className="text-5xl lg:text-6xl font-black text-white tracking-tighter leading-none mb-6">
        Let's{" "}
        <span className="text-amber-400">Connect</span>
      </h2>
      <p className="text-slate-400 text-base leading-relaxed max-w-sm">
        Have a project in mind or just want to say hello? I'm always open to
        new opportunities and collaborations.
      </p>
    </div>

    {/* contact info cards */}
    <div className="space-y-4">
      {[
        {
          label: "Email",
          value: "sabinkhatri@email.com",
          icon: <FaEnvelope className="text-amber-400" />,
        },
        {
          label: "Location",
          value: "Kathmandu, Nepal",
          icon: (
            <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          ),
        },
        {
          label: "Availability",
          value: "Open to opportunities",
          icon: (
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse block" />
          ),
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 + 0.3 }}
          className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03]
                     border border-white/8 hover:border-amber-400/25 transition-colors"
        >
          <div className="w-9 h-9 rounded-lg bg-amber-400/10 flex items-center justify-center flex-shrink-0">
            {item.icon}
          </div>
          <div>
            <p className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">{item.label}</p>
            <p className="text-sm text-white font-medium mt-0.5">{item.value}</p>
          </div>
        </motion.div>
      ))}
    </div>

    {/* social links */}
    <div className="flex gap-4">
      {[
        { href: "https://github.com/sabin-khatri",                   icon: <FaGithub />,   label: "GitHub"   },
        { href: "https://www.linkedin.com/in/sabin-khatri-25460b26a/", icon: <FaLinkedin />, label: "LinkedIn" },
      ].map((link, i) => (
        <motion.a
          key={i}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium
                     border border-white/10 text-slate-400 hover:border-amber-400/40
                     hover:text-amber-400 transition-all duration-300"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.96 }}
        >
          {link.icon}
          {link.label}
        </motion.a>
      ))}
    </div>
  </motion.div>
);

/* ─── MAIN COMPONENT ─────────────────────────────────────────────────────── */
const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors,   setErrors]   = useState({});
  const [loading,  setLoading]  = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    const errs = { ...errors };
    if (name === "name")    value.trim() ? delete errs.name    : (errs.name    = "Name is required");
    if (name === "email")   /^\S+@\S+\.\S+$/.test(value) ? delete errs.email  : (errs.email   = "Enter a valid email");
    if (name === "subject") value.trim() ? delete errs.subject : (errs.subject = "Subject is required");
    if (name === "message") value.trim() ? delete errs.message : (errs.message = "Message is required");
    setErrors(errs);
  };

  const validate = () => {
    const e = {};
    if (!formData.name.trim())                     e.name    = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(formData.email))   e.email   = "Enter a valid email";
    if (!formData.subject.trim())                  e.subject = "Subject is required";
    if (!formData.message.trim())                  e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      const fd = new FormData(e.target);
      fd.append("access_key", "f6a8b2f4-095d-41c8-8661-42a386854bdf");
      fd.set("subject", `New Message from ${formData.name} via Portfolio`);

      const res    = await fetch("https://api.web3forms.com/submit", {
        method:  "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body:    JSON.stringify(Object.fromEntries(fd)),
      });
      const result = await res.json();

      if (result.success) {
        Swal.fire({
          title:             "Message Sent!",
          text:              "Thank you! I'll get back to you soon.",
          icon:              "success",
          showConfirmButton: false,
          timer:             2500,
          background:        "#0a0a0a",
          color:             "#e2e8f0",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
        setErrors({});
      } else {
        toast.error(result.message || "Failed to send message");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-[#0a0a0a] py-24 lg:py-36 overflow-hidden"
    >
      <Toaster
        position="top-center"
        toastOptions={{ className: "bg-[#141414] text-white border border-white/10" }}
      />

      {/* dot-grid — matches Hero */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#f59e0b 0.6px, transparent 0.6px)",
          backgroundSize:  "55px 55px",
          opacity: 0.05,
        }}
      />

      {/* amber blobs */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full
                      bg-amber-500/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full
                      bg-amber-600/4 blur-[110px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* LEFT — desktop only */}
          <div className="hidden lg:block">
            <InfoPanel />
          </div>

          {/* RIGHT — form */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* mobile-only heading */}
            <div className="lg:hidden mb-8 text-center">
              <p className="text-xs font-mono tracking-[0.3em] text-amber-400 uppercase mb-3">
                Get In Touch
              </p>
              <h2 className="text-4xl font-black text-white tracking-tighter leading-none">
                Let's <span className="text-amber-400">Connect</span>
              </h2>
              <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                Have a project in mind or just want to say hello?
              </p>
            </div>
            {/* form card */}
            <div className="relative p-8 rounded-3xl bg-white/[0.02] border border-white/8
                            overflow-hidden">
              {/* top amber accent line */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r
                              from-transparent via-amber-400/50 to-transparent" />

              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field
                    id="name"
                    label="Your Name"
                    placeholder="Sabin Khatri"
                    icon={<FaUser />}
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                  />
                  <Field
                    id="email"
                    label="Email Address"
                    type="email"
                    placeholder="you@example.com"
                    icon={<FaEnvelope />}
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                  />
                </div>

                <Field
                  id="subject"
                  label="Subject"
                  placeholder="Project Inquiry / Collaboration"
                  icon={<FaRegCommentDots />}
                  value={formData.subject}
                  onChange={handleChange}
                  error={errors.subject}
                />

                {/* textarea */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message"
                    className="text-xs font-mono tracking-widest text-slate-500 uppercase">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or just say hi..."
                    className={`w-full bg-white/[0.03] border rounded-xl py-3.5 px-4
                                text-white text-sm placeholder-slate-600 resize-y min-h-[130px]
                                focus:outline-none transition-all duration-300
                                ${errors.message
                                  ? "border-red-500/60 focus:border-red-400"
                                  : "border-white/8 focus:border-amber-400/60 focus:bg-white/[0.05]"
                                }`}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-[11px] font-mono pl-1">{errors.message}</p>
                  )}
                </div>

                {/* submit */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex items-center justify-center gap-3
                             py-4 rounded-xl font-bold text-sm text-black
                             bg-amber-400 hover:bg-amber-300 transition-colors duration-300
                             disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {/* shine */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent
                                  via-white/30 to-transparent -translate-x-full
                                  group-hover:translate-x-full transition-transform duration-700" />
                  {loading ? (
                    <><FaSpinner className="animate-spin" /> Sending…</>
                  ) : (
                    <>
                      Send Message
                      <FaPaperPlane className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>
              </form>

              {/* bottom amber accent line */}
              <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r
                              from-transparent via-amber-400/30 to-transparent" />
            </div>

            {/* small note */}
            <p className="text-center text-slate-600 text-xs font-mono mt-5">
              Typically replies within{" "}
              <span className="text-amber-400">24 hours</span>
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;