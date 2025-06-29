// src/components/Contact.jsx
import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaRegCommentDots, FaPaperPlane } from 'react-icons/fa';
import contactIllustration from '../assets/contact.webp'; // <-- Add your 3D illustration here

// A reusable input field component to keep the form code DRY and clean
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
                   focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Handle form submission logic here (e.g., send to EmailJS, Formspree, or a backend)
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I will get back to you soon.');
    // Optionally, reset the form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="bg-slate-900 py-20 lg:py-28">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Illustration Column */}
          <div className="hidden lg:flex justify-center">
            <img 
              src={contactIllustration} 
              alt="3D illustration of a person sending a message" 
              className="w-full max-w-md h-auto"
            />
          </div>

          {/* Form Column */}
          <div>
            <header className="mb-10 text-center lg:text-left">
              <h2 className="text-4xl lg:text-5xl font-extrabold">
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Contact Me
                </span>
              </h2>
              <p className="mt-4 text-lg text-slate-400">
                Have a question or want to work together? Let's talk.
              </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField
                id="name"
                label="Name"
                placeholder="Enter your name"
                icon={<FaUser className="text-slate-500" />}
                value={formData.name}
                onChange={handleChange}
              />
              <InputField
                id="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                icon={<FaEnvelope className="text-slate-500" />}
                value={formData.email}
                onChange={handleChange}
              />
              <InputField
                id="subject"
                label="Subject"
                placeholder="Enter the subject"
                icon={<FaRegCommentDots className="text-slate-500" />}
                value={formData.subject}
                onChange={handleChange}
              />
              
              {/* Textarea for the message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message"
                  required
                  className="block w-full bg-slate-800 border border-slate-700 rounded-lg py-3 px-4
                             text-slate-200 placeholder-slate-500 focus:outline-none
                             focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3 font-semibold 
                           text-white bg-indigo-600 rounded-lg shadow-lg
                           transition-all duration-300 hover:bg-indigo-700 hover:-translate-y-1"
              >
                <FaPaperPlane />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;