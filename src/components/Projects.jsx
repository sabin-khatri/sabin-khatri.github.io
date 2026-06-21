/* eslint-disable react/prop-types */
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaGithub, FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaBootstrap, FaPhp } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { SiTailwindcss, SiMysql } from "react-icons/si";

import chiyaghar from "../assets/projects/chiyaghar.png";
import trekking  from "../assets/projects/trekking.png";
import driving   from "../assets/projects/travel.png";
import carrental from "../assets/projects/carrental.png";

const TAG_ICONS = {
  HTML:          <FaHtml5     className="text-orange-400" />,
  CSS:           <FaCss3Alt   className="text-blue-400"   />,
  JavaScript:    <FaJsSquare  className="text-amber-400"  />,
  React:         <FaReact     className="text-cyan-400"   />,
  "Tailwind CSS":<SiTailwindcss className="text-sky-400"  />,
  Bootstrap:     <FaBootstrap className="text-purple-400" />,
  PHP:           <FaPhp       className="text-indigo-400" />,
  MySQL:         <SiMysql     className="text-blue-300"   />,
};

const PROJECTS = [
  {
    id: 1, num: "01",
    title: "Chiya Ghar",
    subtitle: "Premium Tea Experience",
    description: "A visually stunning landing page for a Nepali tea café. Featuring smooth parallax effects and a warm, inviting aesthetic that captures the essence of local tea culture.",
    image: chiyaghar,
    tags: ["HTML", "Tailwind CSS", "JavaScript"],
    liveUrl:   "https://bespoke-twilight-0dc185.netlify.app/",
    githubUrl: "https://github.com/sabin-khatri/ChiyaAdda",
    color: "from-amber-900/40 to-[#0a0a0a]",
  },
  {
    id: 2, num: "02",
    title: "Trekking Nepal",
    subtitle: "Adventure Expedition",
    description: "An immersive tourism platform designed to showcase the majestic Himalayas. Built with a focus on high-resolution imagery and fluid storytelling transitions.",
    image: trekking,
    tags: ["HTML", "Tailwind CSS", "JavaScript"],
    liveUrl:   "https://sabintrek.netlify.app/",
    githubUrl: "https://github.com/sabin-khatri/Trekking-Web",
    color: "from-emerald-900/40 to-[#0a0a0a]",
  },
  {
    id: 3, num: "03",
    title: "Travel App",
    subtitle: "Modern Travel Agency",
    description: "A dynamic SPA built for travel enthusiasts. Features advanced filtering, category exploration, and sleek motion components.",
    image: driving,
    tags: ["React", "Tailwind CSS", "JavaScript"],
    liveUrl:   "https://travel-web-zeta-livid.vercel.app/",
    githubUrl: "https://github.com/sabin-khatri/Travel-web",
    color: "from-blue-900/40 to-[#0a0a0a]",
  },
  {
    id: 4, num: "04",
    title: "Gadi Rental",
    subtitle: "Automotive Booking",
    description: "A full-scale car rental solution with a focus on UX. Includes a sophisticated booking flow and a modern, responsive dashboard-style interface.",
    image: carrental,
    tags: ["React", "Tailwind CSS", "JavaScript"],
    liveUrl:   "https://gadi-rental.netlify.app/",
    githubUrl: "https://github.com/sabin-khatri/Car-Rental",
    color: "from-purple-900/40 to-[#0a0a0a]",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="relative bg-[#050505] py-24 lg:py-36 overflow-clip">
      
      {/* Background aesthetic */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
           style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="container mx-auto max-w-6xl px-5 sm:px-6 relative z-10">
        
        {/* Title */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24 lg:mb-32"
        >
          <span className="text-amber-500 font-mono tracking-[0.4em] text-xs font-bold uppercase mb-4 block">
            Selected Works
          </span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-white">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Projects.</span>
          </h2>
        </motion.div>

        {/* Sticky Scroll Container */}
        <div className="relative">
          {PROJECTS.map((project, index) => {
            const topOffset = 100 + (index * 40); // Stacks elegantly
            return (
              <div 
                key={project.id} 
                className="sticky flex items-center justify-center mb-24"
                style={{ top: `${topOffset}px` }}
              >
                <div className={`w-full bg-gradient-to-br ${project.color} border border-white/10 rounded-[2rem] shadow-2xl p-6 lg:p-12 overflow-hidden backdrop-blur-xl transition-transform duration-500 ease-out hover:scale-[1.01]`}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    
                    {/* Text Info */}
                    <div className="order-2 lg:order-1 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-4xl font-black text-white/20">{project.num}</span>
                        <div className="h-[1px] w-12 bg-white/20" />
                        <span className="text-amber-400 font-mono text-sm tracking-widest uppercase">{project.subtitle}</span>
                      </div>
                      
                      <h3 className="text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">{project.title}</h3>
                      <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg">{project.description}</p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-3 mb-10">
                        {project.tags.map(tag => (
                          <span key={tag} className="px-4 py-2 rounded-full bg-black/30 border border-white/5 text-sm font-medium text-slate-200 flex items-center gap-2">
                            {TAG_ICONS[tag]} {tag}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex items-center gap-6">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-amber-400 transition-colors duration-300">
                          Visit Site <FiExternalLink />
                        </a>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white hover:text-amber-400 font-medium transition-colors">
                          <FaGithub size={24} /> Source Code
                        </a>
                      </div>
                    </div>

                    {/* Image Mockup */}
                    <div className="order-1 lg:order-2 relative group perspective-1000">
                      <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 transform-gpu transition-all duration-700 ease-out group-hover:rotate-0 rotate-3">
                        {/* Overlay to darken slightly, removes on hover */}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105" 
                          loading="lazy" 
                        />
                      </div>
                      {/* Ambient Shadow under image */}
                      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-4/5 h-20 bg-black/60 blur-2xl rounded-full -z-10" />
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;