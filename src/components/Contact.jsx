/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaRegCommentDots,
  FaPaperPlane,
  FaSpinner,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import contactIllustration from "../assets/contact.webp";

import { motion } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";
import Swal from "sweetalert2";

const InputField = ({
  id,
  label,
  type = "text",
  placeholder,
  icon,
  value,
  onChange,
  error,
}) => (
  <div className="space-y-2">
    <label htmlFor={id} className="block text-sm font-medium text-slate-400">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500 group-focus-within:text-cyan-400 transition-colors">
        {icon}
      </div>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className={`w-full bg-slate-900/70 border border-slate-700 focus:border-cyan-400 
                   rounded-2xl py-4 pl-11 pr-4 text-white placeholder-slate-500 
                   focus:ring-2 focus:ring-cyan-500/30 transition-all duration-300
                   ${error ? "border-red-500 focus:border-red-500" : ""}`}
      />
      {error && <p className="text-red-400 text-xs pl-1">{error}</p>}
    </div>
  </div>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time validation
    const newErrors = { ...errors };

    if (name === "name") {
      value.trim() ? delete newErrors.name : (newErrors.name = "Name is required");
    }
    if (name === "email") {
      /^\S+@\S+\.\S+$/.test(value)
        ? delete newErrors.email
        : (newErrors.email = "Please enter a valid email");
    }
    if (name === "subject") {
      value.trim() ? delete newErrors.subject : (newErrors.subject = "Subject is required");
    }
    if (name === "message") {
      value.trim() ? delete newErrors.message : (newErrors.message = "Message is required");
    }

    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Please enter a valid email";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    const accessKey = "f6a8b2f4-095d-41c8-8661-42a386854bdf";

    try {
      const formSubmissionData = new FormData(e.target);
      formSubmissionData.append("access_key", accessKey);
      formSubmissionData.set("subject", `New Message from ${formData.name} via Portfolio`);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(formSubmissionData)),
      });

      const result = await response.json();

      if (result.success) {
        Swal.fire({
          title: "Message Sent!",
          text: "Thank you for reaching out. I'll get back to you soon.",
          icon: "success",
          showConfirmButton: false,
          timer: 2500,
          background: "#0f172a",
          color: "#e2e8f0",
        });

        setFormData({ name: "", email: "", subject: "", message: "" });
        setErrors({});
      } else {
        toast.error(result.message || "Failed to send message");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="relative bg-gradient-to-br from-slate-950 to-slate-900 py-20 lg:py-32 overflow-hidden">
      <Toaster position="top-center" toastOptions={{ className: "bg-slate-800 text-white" }} />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center max-w-6xl mx-auto">
          
          {/* Left Side - Illustration */}
          <motion.div
            className="hidden lg:flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <div className="absolute -inset-20 bg-gradient-to-br from-cyan-400/10 to-purple-500/10 rounded-full blur-3xl" />
              <motion.img
                src={contactIllustration}
                alt="Contact Illustration"
                className="w-full max-w-md lg:max-w-lg drop-shadow-2xl"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-center lg:text-left mb-10">
              <h2 className="text-5xl lg:text-6xl font-bold tracking-tight text-white">
                Let's <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Connect</span>
              </h2>
              <p className="mt-4 text-slate-400 text-lg">
                Have a project in mind or just want to say hello? I'm always open to new opportunities.
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  id="name"
                  label="Your Name"
                  placeholder="Sabin Khatri"
                  icon={<FaUser />}
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                />
                <InputField
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

              <InputField
                id="subject"
                label="Subject"
                placeholder="Project Inquiry / Collaboration / Others"
                icon={<FaRegCommentDots />}
                value={formData.subject}
                onChange={handleChange}
                error={errors.subject}
              />

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-slate-400">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or just say hi..."
                  className="w-full bg-slate-900/70 border border-slate-700 focus:border-cyan-400 rounded-3xl 
                           py-4 px-5 text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500/30 
                           resize-y min-h-[140px] transition-all"
                />
                {errors.message && <p className="text-red-400 text-xs pl-1">{errors.message}</p>}
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full mt-4 relative overflow-hidden group bg-gradient-to-r from-cyan-500 to-purple-600 
                         hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-semibold py-4 rounded-2xl 
                         flex items-center justify-center gap-3 shadow-xl shadow-cyan-500/30 
                         disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin text-lg" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    Send Message
                    <FaPaperPlane className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start gap-8 mt-10">
              <motion.a
                href="https://github.com/sabin-khatri"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.3, y: -3 }}
                className="text-3xl text-slate-400 hover:text-white transition-colors"
              >
                <FaGithub />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/sabin-khatri-25460b26a/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.3, y: -3 }}
                className="text-3xl text-slate-400 hover:text-blue-400 transition-colors"
              >
                <FaLinkedin />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;