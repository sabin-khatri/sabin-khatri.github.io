/* eslint-disable no-unused-vars */
// src/components/Contact.jsx
import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaRegCommentDots, FaPaperPlane, FaSpinner } from 'react-icons/fa';
import contactIllustration from '../assets/contact.webp';

import { motion } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import Swal from 'sweetalert2'

// A reusable input field component
const InputField = ({ id, label, type = 'text', placeholder, icon, value, onChange }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-2">
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
        className="block w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-10 pr-3 
                   text-slate-200 placeholder-slate-500 focus:outline-none 
                   focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow duration-300"
      />
    </div>
  </div>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const accessKey = "f6a8b2f4-095d-41c8-8661-42a386854bdf"; 

    const formSubmissionData = new FormData(event.target);
    formSubmissionData.append("access_key", accessKey);
    
    // Create a better subject line for the email you will receive
    formSubmissionData.set('subject', `New Message from ${formData.name} via Portfolio`);

    const object = Object.fromEntries(formSubmissionData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });
      const result = await response.json();
      
      if (result.success) {
       Swal.fire({
  title: "Success!!",
  text: "Message sent successfully!",
  icon: "success"
});
 setFormData({ name: '', email: '', subject: '', message: '' });
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
    <section id="contact" className="relative bg-slate-900 py-20 lg:py-28 overflow-hidden">
      <Toaster position="top-center" toastOptions={{
        className: 'bg-slate-800 text-white shadow-lg',
        duration: 4000,
      }} />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-full opacity-10 blur-3xl animate-pulse"></div>

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
            <motion.header variants={itemVariants} className="mb-10 text-center lg:text-left">
              <h2 className="text-4xl lg:text-5xl font-extrabold text-white">
                Let's&nbsp;
                <span className="gap-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
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
                <InputField id="name" label="Name" name="name" placeholder="Enter your name" icon={<FaUser className="text-slate-500" />} value={formData.name} onChange={handleChange}/>
              </motion.div>
              <motion.div variants={itemVariants}>
                <InputField id="email" label="Email" type="email" name="email" placeholder="Enter your email" icon={<FaEnvelope className="text-slate-500" />} value={formData.email} onChange={handleChange}/>
              </motion.div>
              <motion.div variants={itemVariants}>
                <InputField id="subject" label="Subject" name="subject" placeholder="What's this about?" icon={<FaRegCommentDots className="text-slate-500" />} value={formData.subject} onChange={handleChange}/>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                <textarea
                  id="message" name="message" rows="4" value={formData.message} onChange={handleChange}
                  placeholder="Write your message here..." required  
                  className="block w-full bg-slate-800 border border-slate-700 rounded-lg py-3 px-4
                             text-slate-200 placeholder-slate-500 focus:outline-none
                             focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-shadow duration-300"
                ></textarea>
              </motion.div>

              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit" disabled={isLoading}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 font-semibold 
                             text-white bg-indigo-600 rounded-lg shadow-lg
                             transition-all duration-300 ease-in-out
                             hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05, y: -4 }} whileTap={{ scale: 0.95 }}
                >
                  {isLoading ? (
                    <><FaSpinner className="animate-spin" />Sending...</>
                  ) : (
                    <><FaPaperPlane />Send Message</>
                  )}
                </motion.button>
              </motion.div>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;