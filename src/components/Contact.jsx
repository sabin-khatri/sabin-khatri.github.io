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

// A reusable input field component
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
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-slate-300 mb-2"
    >
      {label}
    </label>
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        {icon}
      </span>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className={`block w-full bg-slate-800 border rounded-lg py-3 pl-10 pr-3 
                   text-slate-200 placeholder-slate-500 focus:outline-none 
                   focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow duration-300
                   ${error ? "border-red-500" : "border-slate-700"}`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  </div>
);

const Particle = ({ x, y, size, duration, delay }) => (
  <motion.div
    className="absolute rounded-full bg-cyan-400/20"
    style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
    initial={{ opacity: 0.5, scale: 0 }}
    animate={{ opacity: [0.5, 0], scale: [0, 1.5], y: '-20vh' }}
    transition={{ duration, delay, repeat: Infinity, repeatType: 'loop', ease: 'linear' }}
  />
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
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Real-time validation
    let newErrors = { ...errors };
    if (name === "name" && !value.trim()) newErrors.name = "Name is required";
    else if (name === "name") delete newErrors.name;

    if (name === "email" && !/^\S+@\S+\.\S+$/.test(value)) newErrors.email = "Invalid email format";
    else if (name === "email") delete newErrors.email;

    if (name === "subject" && !value.trim()) newErrors.subject = "Subject is required";
    else if (name === "subject") delete newErrors.subject;

    if (name === "message" && !value.trim()) newErrors.message = "Message is required";
    else if (name === "message") delete newErrors.message;

    setErrors(newErrors);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Final validation before submit
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    const accessKey = "f6a8b2f4-095d-41c8-8661-42a386854bdf";

    const formSubmissionData = new FormData(event.target);
    formSubmissionData.append("access_key", accessKey);
    formSubmissionData.set(
      "subject",
      `New Message from ${formData.name} via Portfolio`
    );

    const object = Object.fromEntries(formSubmissionData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });
      const result = await response.json();

      if (result.success) {
        Swal.fire({
          title: "Success!!",
          text: "Message sent successfully!",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
          customClass: {
            popup: 'animate__animated animate__fadeIn',
          },
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
        setErrors({});
      } else {
        console.error("Submission failed:", result);
        toast.error(result.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-slate-900 py-20 lg:py-28 overflow-hidden"
    >
      <Toaster
        position="top-center"
        toastOptions={{
          className: "bg-slate-800 text-white shadow-lg",
          duration: 4000,
        }}
      />

      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <Particle key={i} x={Math.random() * 100} y={Math.random() * 100} size={Math.random() * 5 + 2} duration={Math.random() * 10 + 10} delay={Math.random() * 5} />
        ))}
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          className="grid lg:grid-cols-2 gap-16 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div
            className="hidden lg:flex justify-center"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src={contactIllustration}
              alt="3D illustration of a person sending a message"
              className="w-full max-w-lg h-auto"
            />
          </motion.div>

          <div>
            <motion.header
              variants={itemVariants}
              className="mb-10 text-center lg:text-left"
            >
              <h2 className="text-4xl lg:text-5xl font-extrabold text-white">
                Let's&nbsp;
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Connect
                </span>
              </h2>
              <p className="mt-4 text-lg text-slate-400">
                Have a question or want to work together? Let's talk.
              </p>
            </motion.header>

            <motion.form
              onSubmit={onSubmit}
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants}>
                <InputField
                  id="name"
                  label="Name"
                  name="name"
                  placeholder="Enter your name"
                  icon={<FaUser className="text-slate-500" />}
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <InputField
                  id="email"
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  icon={<FaEnvelope className="text-slate-500" />}
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <InputField
                  id="subject"
                  label="Subject"
                  name="subject"
                  placeholder="What's this about?"
                  icon={<FaRegCommentDots className="text-slate-500" />}
                  value={formData.subject}
                  onChange={handleChange}
                  error={errors.subject}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  required
                  className="block w-full bg-slate-800 border border-slate-700 rounded-lg py-3 px-4
                             text-slate-200 placeholder-slate-500 focus:outline-none
                             focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow duration-300
                             ${error ? 'border-red-500' : 'border-slate-700'}"
                ></textarea>
                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
              </motion.div>

              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="w-full group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 font-semibold 
               text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg 
               shadow-lg shadow-indigo-500/30
               transition-all duration-300 ease-in-out
               hover:shadow-2xl hover:shadow-indigo-500/50
               disabled:opacity-50 disabled:cursor-not-allowed
               bg-[length:200%_auto] hover:bg-right"
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isLoading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </motion.button>
              </motion.div>
            </motion.form>

            <motion.div
              className="mt-8 flex justify-center gap-6"
              variants={itemVariants}
            >
              <motion.a
                href="https://github.com/sabin-khatri"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-cyan-400"
                whileHover={{ scale: 1.2 }}
              >
                <FaGithub size={24} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/sabin-khatri-25460b26a/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-500"
                whileHover={{ scale: 1.2 }}
              >
                <FaLinkedin size={24} />
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;